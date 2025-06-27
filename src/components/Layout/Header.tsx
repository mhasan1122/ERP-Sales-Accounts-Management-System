import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSales } from '../../contexts/SalesContext';

export function Header() {
  const { user, logout } = useAuth();
  const { dashboardStats } = useSales();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Welcome back, {user?.name}
          </h2>
          <p className="text-sm text-gray-600">
            Manage your sales and accounts efficiently
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
            {dashboardStats.overdueDeliveries > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {dashboardStats.overdueDeliveries}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">{user?.name}</span>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}