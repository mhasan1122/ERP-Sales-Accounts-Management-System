import React, { useState } from 'react';
import { Plus, Package, DollarSign, Hash } from 'lucide-react';
import { useSales } from '../../contexts/SalesContext';
import { ProductForm } from './ProductForm';
import { ProductTable } from './ProductTable';

export function Products() {
  const [showForm, setShowForm] = useState(false);
  const { products } = useSales();

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const lowStockProducts = products.filter(product => product.stock < 10).length;

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
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600">Manage your product inventory, pricing, and stock levels</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Inventory Value"
          value={`$${totalValue.toLocaleString()}`}
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockProducts}
          icon={Hash}
          color="bg-orange-500"
        />
      </div>

      <ProductTable />

      {showForm && (
        <ProductForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}