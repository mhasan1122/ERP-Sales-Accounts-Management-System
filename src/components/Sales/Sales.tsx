import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { SalesForm } from './SalesForm';
import { SalesTable } from './SalesTable';

export function Sales() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Sales Management</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Track and manage all your sales transactions</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Add Sale</span>
        </button>
      </div>

      <SalesTable />

      {showForm && (
        <SalesForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}