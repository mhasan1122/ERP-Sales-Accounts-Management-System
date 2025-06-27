import React, { useState } from 'react';
import { Users, Settings, Shield, Database, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSales } from '../../contexts/SalesContext';

export function AdminPanel() {
  const { isAdmin } = useAuth();
  const { sales } = useSales();
  const [activeSection, setActiveSection] = useState('overview');

  if (!isAdmin) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-800 mb-2">Access Denied</h2>
          <p className="text-red-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  const adminSections = [
    { id: 'overview', name: 'Overview', icon: Settings },
    { id: 'users', name: 'User Management', icon: Users },
    { id: 'system', name: 'System Settings', icon: Database },
    { id: 'reports', name: 'Advanced Reports', icon: FileText },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">System Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Database Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Records:</span>
              <span className="font-medium">{sales.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Storage Used:</span>
              <span className="font-medium">2.4 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Backup:</span>
              <span className="font-medium">2 hours ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Health</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">API Status:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Database:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Connected</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Performance:</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Optimal</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">SSL Certificate:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Valid</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Firewall:</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Scan:</span>
              <span className="font-medium">1 day ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity Log</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">New sale added</p>
              <p className="text-xs text-gray-500">Admin User added sale for Laptop Pro</p>
            </div>
            <span className="text-xs text-gray-500">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">Sale status updated</p>
              <p className="text-xs text-gray-500">Sale #2 marked as delivered</p>
            </div>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-900">System backup completed</p>
              <p className="text-xs text-gray-500">Automatic backup process finished successfully</p>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
      
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Active Users</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add User
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Admin User</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">admin@erp.com</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Admin</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'users': return renderUserManagement();
      case 'system': return <div className="p-6"><p>System Settings coming soon...</p></div>;
      case 'reports': return <div className="p-6"><p>Advanced Reports coming soon...</p></div>;
      default: return renderOverview();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600">Manage system settings, users, and monitor activity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {adminSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{section.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}