import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Sale, Product, Customer, DashboardStats } from '../types';

interface SalesContextType {
  sales: Sale[];
  products: Product[];
  customers: Customer[];
  dashboardStats: DashboardStats;
  addSale: (sale: Omit<Sale, 'id' | 'status'>) => void;
  updateSale: (sale: Sale) => void;
  updateSaleStatus: (saleId: string, status: Sale['status']) => void;
  deleteSale: (saleId: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (customerId: string) => void;
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);

// Mock data
const mockProducts: Product[] = [
  { id: '1', name: 'Laptop Pro', category: 'Electronics', price: 1299.99, stock: 50 },
  { id: '2', name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 200 },
  { id: '3', name: 'Office Chair', category: 'Furniture', price: 299.99, stock: 25 },
  { id: '4', name: 'Monitor 27"', category: 'Electronics', price: 399.99, stock: 30 },
  { id: '5', name: 'Mechanical Keyboard', category: 'Electronics', price: 149.99, stock: 75 },
  { id: '6', name: 'Standing Desk', category: 'Furniture', price: 599.99, stock: 15 },
];

const mockCustomers: Customer[] = [
  { id: '1', name: 'Acme Corp', email: 'contact@acme.com', phone: '+1-555-0101', address: '123 Business St, New York, NY 10001' },
  { id: '2', name: 'Tech Solutions', email: 'info@techsol.com', phone: '+1-555-0102', address: '456 Innovation Ave, San Francisco, CA 94102' },
  { id: '3', name: 'Global Enterprises', email: 'sales@global.com', phone: '+1-555-0103', address: '789 Commerce Blvd, Chicago, IL 60601' },
  { id: '4', name: 'StartupXYZ', email: 'hello@startupxyz.com', phone: '+1-555-0104', address: '321 Venture Way, Austin, TX 78701' },
];

const mockSales: Sale[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Laptop Pro',
    quantity: 2,
    unitPrice: 1299.99,
    totalAmount: 2599.98,
    deliveryDate: '2024-12-20',
    saleDate: '2024-12-15',
    status: 'pending',
    customerId: '1',
    customerName: 'Acme Corp',
    salesPersonId: '1',
    salesPersonName: 'Admin User'
  },
  {
    id: '2',
    productId: '2',
    productName: 'Wireless Mouse',
    quantity: 10,
    unitPrice: 29.99,
    totalAmount: 299.90,
    deliveryDate: '2024-12-18',
    saleDate: '2024-12-14',
    status: 'delivered',
    customerId: '2',
    customerName: 'Tech Solutions',
    salesPersonId: '1',
    salesPersonName: 'Admin User'
  },
  {
    id: '3',
    productId: '3',
    productName: 'Office Chair',
    quantity: 5,
    unitPrice: 299.99,
    totalAmount: 1499.95,
    deliveryDate: '2024-12-10',
    saleDate: '2024-12-05',
    status: 'overdue',
    customerId: '3',
    customerName: 'Global Enterprises',
    salesPersonId: '1',
    salesPersonName: 'Admin User'
  },
  {
    id: '4',
    productId: '4',
    productName: 'Monitor 27"',
    quantity: 3,
    unitPrice: 399.99,
    totalAmount: 1199.97,
    deliveryDate: '2024-12-22',
    saleDate: '2024-12-16',
    status: 'confirmed',
    customerId: '4',
    customerName: 'StartupXYZ',
    salesPersonId: '1',
    salesPersonName: 'Admin User'
  },
  {
    id: '5',
    productId: '5',
    productName: 'Mechanical Keyboard',
    quantity: 8,
    unitPrice: 149.99,
    totalAmount: 1199.92,
    deliveryDate: '2024-12-19',
    saleDate: '2024-12-13',
    status: 'delivered',
    customerId: '1',
    customerName: 'Acme Corp',
    salesPersonId: '1',
    salesPersonName: 'Admin User'
  },
];

export function SalesProvider({ children }: { children: ReactNode }) {
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalSales: 0,
    totalRevenue: 0,
    pendingDeliveries: 0,
    overdueDeliveries: 0,
    monthlyGrowth: 0
  });

  // Update dashboard stats when sales change
  useEffect(() => {
    const stats: DashboardStats = {
      totalSales: sales.length,
      totalRevenue: sales.reduce((sum, sale) => sum + sale.totalAmount, 0),
      pendingDeliveries: sales.filter(sale => sale.status === 'pending').length,
      overdueDeliveries: sales.filter(sale => sale.status === 'overdue').length,
      monthlyGrowth: 12.5 // Mock growth percentage
    };
    setDashboardStats(stats);
  }, [sales]);

  // Auto-update sale status based on delivery date
  useEffect(() => {
    const checkDeliveryDates = () => {
      const today = new Date();
      setSales(currentSales => 
        currentSales.map(sale => {
          const deliveryDate = new Date(sale.deliveryDate);
          if (sale.status === 'pending' && deliveryDate < today) {
            return { ...sale, status: 'overdue' as const };
          }
          return sale;
        })
      );
    };

    const interval = setInterval(checkDeliveryDates, 60000); // Check every minute
    checkDeliveryDates(); // Check immediately

    return () => clearInterval(interval);
  }, []);

  const addSale = (saleData: Omit<Sale, 'id' | 'status'>) => {
    const newSale: Sale = {
      ...saleData,
      id: Date.now().toString(),
      status: 'pending'
    };
    setSales(prev => [...prev, newSale]);
  };

  const updateSaleStatus = (saleId: string, status: Sale['status']) => {
    setSales(prev => 
      prev.map(sale => 
        sale.id === saleId ? { ...sale, status } : sale
      )
    );
  };

  const updateSale = (updatedSale: Sale) => {
    setSales(prev => prev.map(sale =>
      sale.id === updatedSale.id ? updatedSale : sale
    ));
  };

  const deleteSale = (saleId: string) => {
    setSales(prev => prev.filter(sale => sale.id !== saleId));
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const addCustomer = (customerData: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString()
    };
    setCustomers(prev => [...prev, newCustomer]);
  };

  const updateCustomer = (updatedCustomer: Customer) => {
    setCustomers(prev => prev.map(customer =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    ));
  };

  const deleteCustomer = (customerId: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== customerId));
  };

  return (
    <SalesContext.Provider value={{
      sales,
      products,
      customers,
      dashboardStats,
      addSale,
      updateSale,
      updateSaleStatus,
      deleteSale,
      addProduct,
      updateProduct,
      deleteProduct,
      addCustomer,
      updateCustomer,
      deleteCustomer
    }}>
      {children}
    </SalesContext.Provider>
  );
}

export function useSales() {
  const context = useContext(SalesContext);
  if (context === undefined) {
    throw new Error('useSales must be used within a SalesProvider');
  }
  return context;
}