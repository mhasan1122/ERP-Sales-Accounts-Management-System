import React, { useState } from 'react';
import { Edit3, Trash2, User, Mail, Phone, MapPin, ShoppingCart, Calendar, Users } from 'lucide-react';
import { useSales } from '../../contexts/SalesContext';
import { Customer } from '../../types';
import { EditCustomerForm } from './EditCustomerForm';
import { exportCustomersToPDF, exportCustomersToExcel } from '../../utils/exportUtils';

export function CustomerTable() {
  const { customers, sales, deleteCustomer } = useSales();
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  const getCustomerStats = (customerId: string) => {
    const customerSales = sales.filter(sale => sale.customerId === customerId);
    const totalPurchases = customerSales.length;
    const totalSpent = customerSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const lastPurchase = customerSales.length > 0 
      ? Math.max(...customerSales.map(sale => new Date(sale.saleDate).getTime()))
      : null;
    
    return {
      totalPurchases,
      totalSpent,
      lastPurchase: lastPurchase ? new Date(lastPurchase).toLocaleDateString() : 'Never',
      recentProducts: customerSales.slice(-3).map(sale => sale.productName)
    };
  };

  const sortedCustomers = customers.sort((a, b) => a.name.localeCompare(b.name));



  const toggleExpanded = (customerId: string) => {
    setExpandedCustomer(expandedCustomer === customerId ? null : customerId);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Customer Directory</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => exportCustomersToPDF(customers, sales)}
              className="px-3 py-2 bg-red-600 text-white text-xs sm:text-sm rounded-lg hover:bg-red-700 transition-colors"
              title="Export to PDF"
            >
              PDF
            </button>
            <button
              onClick={() => exportCustomersToExcel(customers, sales)}
              className="px-3 py-2 bg-green-600 text-white text-xs sm:text-sm rounded-lg hover:bg-green-700 transition-colors"
              title="Export to Excel"
            >
              Excel
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purchase Stats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Purchase
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedCustomers.map((customer) => {
              const stats = getCustomerStats(customer.id);
              const isExpanded = expandedCustomer === customer.id;
              
              return (
                <React.Fragment key={customer.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">ID: {customer.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <ShoppingCart className="w-4 h-4 mr-2 text-gray-400" />
                          {stats.totalPurchases} purchases
                        </div>
                        <div className="text-sm font-medium text-green-600">
                          ৳{stats.totalSpent.toFixed(2)} total
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {stats.lastPurchase}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => toggleExpanded(customer.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          {isExpanded ? 'Hide' : 'View'} Details
                        </button>
                        <button
                          onClick={() => setEditingCustomer(customer)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit Customer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteCustomer(customer.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  
                  {isExpanded && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Customer Details</h4>
                            <div className="space-y-2">
                              <div className="flex items-start">
                                <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                                <div>
                                  <p className="text-sm text-gray-600">Address</p>
                                  <p className="text-sm text-gray-900">{customer.address}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Recent Purchases</h4>
                            <div className="space-y-2">
                              {stats.recentProducts.length > 0 ? (
                                stats.recentProducts.map((product, index) => (
                                  <div key={index} className="flex items-center">
                                    <ShoppingCart className="w-4 h-4 mr-2 text-gray-400" />
                                    <span className="text-sm text-gray-900">{product}</span>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500">No recent purchases</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {customers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No customers found</p>
        </div>
      )}

      {editingCustomer && (
        <EditCustomerForm
          customer={editingCustomer}
          onClose={() => setEditingCustomer(null)}
        />
      )}
    </div>
  );
}