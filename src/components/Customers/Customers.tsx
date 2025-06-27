import React, { useState } from 'react';
import { Plus, Users, ShoppingCart, DollarSign } from 'lucide-react';
import { useSales } from '../../contexts/SalesContext';
import { CustomerForm } from './CustomerForm';
import { CustomerTable } from './CustomerTable';

export function Customers() {
  const [showForm, setShowForm] = useState(false);
  const { customers, sales } = useSales();

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(customer => 
    sales.some(sale => sale.customerId === customer.id)
  ).length;
  const totalCustomerValue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color 
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
  }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Manage customer information and track their purchase history</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Customers"
          value={totalCustomers}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Customers"
          value={activeCustomers}
          icon={ShoppingCart}
          color="bg-green-500"
        />
        <StatCard
          title="Total Customer Value"
          value={`$${totalCustomerValue.toLocaleString()}`}
          icon={DollarSign}
          color="bg-purple-500"
        />
      </div>

      <CustomerTable />

      {showForm && (
        <CustomerForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}