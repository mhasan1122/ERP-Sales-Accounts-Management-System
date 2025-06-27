import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { useSales } from './SalesContext';

interface NotificationContextType {
  dismissedNotifications: string[];
  dismissNotification: (id: string) => void;
  markAllAsRead: () => void;
  restoreDismissed: () => void;
  unreadCount: number;
  notifications: any[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { sales } = useSales();
  const [dismissedNotifications, setDismissedNotifications] = useState<string[]>([]);

  // Generate notifications based on sales data
  const allNotifications = useMemo(() => [
    ...sales
      .filter(sale => sale.status === 'overdue')
      .map(sale => ({
        id: `overdue-${sale.id}`,
        type: 'warning' as const,
        title: 'Overdue Delivery',
        message: `Delivery for ${sale.productName} to ${sale.customerName} is overdue`,
        time: new Date(sale.deliveryDate).toLocaleDateString(),
        action: 'Contact Customer',
        customerName: sale.customerName,
        productName: sale.productName,
        saleId: sale.id
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
        action: 'Prepare Delivery',
        customerName: sale.customerName,
        productName: sale.productName,
        saleId: sale.id
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
  ], [sales]);

  // Filter out dismissed notifications
  const notifications = useMemo(() => 
    allNotifications.filter(n => !dismissedNotifications.includes(n.id)),
    [allNotifications, dismissedNotifications]
  );

  const unreadCount = notifications.length;

  const dismissNotification = (id: string) => {
    setDismissedNotifications(prev => [...prev, id]);
  };

  const markAllAsRead = () => {
    const allNotificationIds = allNotifications.map(n => n.id);
    setDismissedNotifications(allNotificationIds);
  };

  const restoreDismissed = () => {
    setDismissedNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      dismissedNotifications,
      dismissNotification,
      markAllAsRead,
      restoreDismissed,
      unreadCount,
      notifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
