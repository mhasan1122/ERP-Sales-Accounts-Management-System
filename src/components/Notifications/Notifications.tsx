import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';
import { useSales } from '../../contexts/SalesContext';

export function Notifications() {
  const { sales } = useSales();

  // Generate notifications based on sales data
  const notifications = [
    ...sales
      .filter(sale => sale.status === 'overdue')
      .map(sale => ({
        id: `overdue-${sale.id}`,
        type: 'warning' as const,
        title: 'Overdue Delivery',
        message: `Delivery for ${sale.productName} to ${sale.customerName} is overdue`,
        time: new Date(sale.deliveryDate).toLocaleDateString(),
        action: 'Contact Customer'
      })),
    ...sales
      .filter(sale => {
        const deliveryDate = new Date(sale.deliveryDate);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return sale.status === 'pending' && deliveryDate.toDateString() === tomorrow.toDateString();
      })
      .map(sale => ({
        id: `reminder-${sale.id}`,
        type: 'info' as const,
        title: 'Delivery Reminder',
        message: `${sale.productName} delivery to ${sale.customerName} is scheduled for tomorrow`,
        time: new Date(sale.deliveryDate).toLocaleDateString(),
        action: 'Prepare Shipment'
      })),
    {
      id: 'system-1',
      type: 'success' as const,
      title: 'System Backup Complete',
      message: 'Daily system backup completed successfully',
      time: '2 hours ago',
      action: 'View Details'
    },
    {
      id: 'system-2',
      type: 'info' as const,
      title: 'New User Registration',
      message: 'A new user has requested access to the system',
      time: '4 hours ago',
      action: 'Review Request'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'info': return Bell;
      default: return Clock;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-l-orange-500 bg-orange-50';
      case 'success': return 'border-l-green-500 bg-green-50';
      case 'info': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-orange-500';
      case 'success': return 'text-green-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600">Stay updated with important alerts and reminders</p>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <div className="ml-3">
              <p className="text-lg font-semibold text-gray-900">
                {notifications.filter(n => n.type === 'warning').length}
              </p>
              <p className="text-sm text-gray-600">Warnings</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Bell className="w-6 h-6 text-blue-500" />
            <div className="ml-3">
              <p className="text-lg font-semibold text-gray-900">
                {notifications.filter(n => n.type === 'info').length}
              </p>
              <p className="text-sm text-gray-600">Info</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <div className="ml-3">
              <p className="text-lg font-semibold text-gray-900">
                {notifications.filter(n => n.type === 'success').length}
              </p>
              <p className="text-sm text-gray-600">Success</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Clock className="w-6 h-6 text-gray-500" />
            <div className="ml-3">
              <p className="text-lg font-semibold text-gray-900">{notifications.length}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Notifications</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Mark all as read
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`p-6 border-l-4 ${getNotificationColor(notification.type)} hover:bg-opacity-70 transition-colors`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Icon className={`w-6 h-6 ${getIconColor(notification.type)} mt-1`} />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        <div className="flex items-center space-x-2">
                          <button className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
                            {notification.action}
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {notifications.length === 0 && (
          <div className="p-12 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up! Check back later for new updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}