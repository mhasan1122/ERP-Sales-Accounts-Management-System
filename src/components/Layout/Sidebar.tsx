import React from 'react';
import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  Package, 
  FileText, 
  Settings, 
  Bell,
  Home
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'sales', name: 'Sales', icon: ShoppingCart },
  { id: 'products', name: 'Products', icon: Package },
  { id: 'customers', name: 'Customers', icon: Users },
  { id: 'reports', name: 'Reports', icon: BarChart3 },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'admin', name: 'Admin Panel', icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">ERP System</h1>
        <p className="text-gray-400 text-sm">Sales & Accounts</p>
      </div>
      
      <nav className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}