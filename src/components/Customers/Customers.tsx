import React, { useState } from 'react';
import { Plus, Users, ShoppingCart } from 'lucide-react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
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
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{value}</p>
        </div>
        <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage customer information and track their purchase history</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
          value={`৳${totalCustomerValue.toLocaleString()}`}
          icon={FaBangladeshiTakaSign}
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