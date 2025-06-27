export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'sales';
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  deliveryDate: string;
  saleDate: string;
  status: 'pending' | 'delivered' | 'confirmed' | 'overdue';
  customerId: string;
  customerName: string;
  salesPersonId: string;
  salesPersonName: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface DashboardStats {
  totalSales: number;
  totalRevenue: number;
  pendingDeliveries: number;
  overdueDeliveries: number;
  monthlyGrowth: number;
}