import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';

export function Notifications() {
  const {
    notifications,
    dismissNotification,
    markAllAsRead,
    restoreDismissed,
    dismissedNotifications
  } = useNotifications();

  // Notification interaction handlers
  const handleNotificationAction = (notification: any) => {
    switch (notification.action) {
      case 'Contact Customer':
        alert(`Contacting ${notification.customerName} about overdue delivery of ${notification.productName}`);
        break;
      case 'Prepare Delivery':
        alert(`Preparing delivery for ${notification.productName} to ${notification.customerName}`);
        break;
      case 'View Details':
        alert(`Viewing details for ${notification.productName || 'system'}`);
        break;
      case 'Review Request':
        alert('Reviewing user registration request');
        break;
      default:
        alert('Action completed');
    }
  };

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
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Stay updated with important alerts and reminders</p>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0" />
            <div className="ml-3 min-w-0">
              <p className="text-lg font-semibold text-gray-900">
                {notifications.filter(n => n.type === 'warning').length}
              </p>
              <p className="text-sm text-gray-600">Warnings</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Bell className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <div className="ml-3 min-w-0">
              <p className="text-lg font-semibold text-gray-900">
                {notifications.filter(n => n.type === 'info').length}
              </p>
              <p className="text-sm text-gray-600">Info</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            <div className="ml-3 min-w-0">
              <p className="text-lg font-semibold text-gray-900">
                {notifications.filter(n => n.type === 'success').length}
              </p>
              <p className="text-sm text-gray-600">Success</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Clock className="w-6 h-6 text-gray-500 flex-shrink-0" />
            <div className="ml-3 min-w-0">
              <p className="text-lg font-semibold text-gray-900">{notifications.length}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Notifications</h2>
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
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
                className={`p-4 sm:p-6 border-l-4 ${getNotificationColor(notification.type)} hover:bg-opacity-70 transition-colors cursor-pointer`}
                onClick={() => handleNotificationAction(notification)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${getIconColor(notification.type)} mt-1 flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 space-y-2 sm:space-y-0">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNotificationAction(notification);
                            }}
                            className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                          >
                            {notification.action}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              dismissNotification(notification.id);
                            }}
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
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
          <div className="p-8 sm:p-12 text-center">
            <Bell className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-sm sm:text-base text-gray-600">You're all caught up! Check back later for new updates.</p>
            {dismissedNotifications.length > 0 && (
              <button
                onClick={restoreDismissed}
                className="mt-4 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Show dismissed notifications
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}