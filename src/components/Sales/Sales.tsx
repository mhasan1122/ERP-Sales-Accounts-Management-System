import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { SalesForm } from './SalesForm';
import { SalesTable } from './SalesTable';

export function Sales() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Management</h1>
          <p className="text-gray-600">Track and manage all your sales transactions</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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