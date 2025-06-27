import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Sale, Product, Customer } from '../types';

// PDF Export Functions
export const exportSalesToPDF = (sales: Sale[]) => {
  const doc = new jsPDF();
  
  // Add company header
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text('ERP SYSTEM', 20, 20);
  
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text('Sales Report', 20, 30);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 40);
  doc.text(`Total Records: ${sales.length}`, 20, 45);
  
  // Calculate totals
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalQuantity = sales.reduce((sum, sale) => sum + sale.quantity, 0);
  
  doc.text(`Total Revenue: BDT ${totalRevenue.toFixed(2)}`, 120, 40);
  doc.text(`Total Quantity: ${totalQuantity} units`, 120, 45);
  
  // Prepare table data
  const tableData = sales.map(sale => [
    new Date(sale.saleDate).toLocaleDateString(),
    sale.productName,
    sale.customerName,
    sale.quantity.toString(),
    `BDT ${sale.unitPrice.toFixed(2)}`,
    `BDT ${sale.totalAmount.toFixed(2)}`,
    new Date(sale.deliveryDate).toLocaleDateString(),
    sale.status.toUpperCase()
  ]);
  
  // Add table
  autoTable(doc, {
    head: [['Sale Date', 'Product', 'Customer', 'Qty', 'Unit Price (BDT)', 'Total (BDT)', 'Delivery', 'Status']],
    body: tableData,
    startY: 55,
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 30 },
      2: { cellWidth: 25 },
      3: { cellWidth: 15 },
      4: { cellWidth: 20 },
      5: { cellWidth: 20 },
      6: { cellWidth: 20 },
      7: { cellWidth: 20 },
    },
  });
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
    doc.text('ERP System - Sales Report', 20, doc.internal.pageSize.height - 10);
  }
  
  // Save the PDF
  doc.save(`sales-report-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportProductsToPDF = (products: Product[]) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text('ERP SYSTEM', 20, 20);
  
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text('Products Inventory Report', 20, 30);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 40);
  doc.text(`Total Products: ${products.length}`, 20, 45);
  
  // Calculate totals
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  
  doc.text(`Total Inventory Value: BDT ${totalValue.toFixed(2)}`, 120, 40);
  doc.text(`Total Stock: ${totalStock} units`, 120, 45);
  
  // Prepare table data
  const tableData = products.map(product => [
    product.name,
    product.category,
    `BDT ${product.price.toFixed(2)}`,
    product.stock.toString(),
    `BDT ${(product.price * product.stock).toFixed(2)}`,
    product.stock < 10 ? 'LOW STOCK' : 'IN STOCK'
  ]);
  
  // Add table
  autoTable(doc, {
    head: [['Product Name', 'Category', 'Unit Price (BDT)', 'Stock', 'Total Value (BDT)', 'Status']],
    body: tableData,
    startY: 55,
    styles: {
      fontSize: 9,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [46, 125, 50],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 30 },
      2: { cellWidth: 25 },
      3: { cellWidth: 20 },
      4: { cellWidth: 30 },
      5: { cellWidth: 25 },
    },
  });
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
    doc.text('ERP System - Products Report', 20, doc.internal.pageSize.height - 10);
  }
  
  doc.save(`products-report-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const exportCustomersToPDF = (customers: Customer[], sales: Sale[]) => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text('ERP SYSTEM', 20, 20);
  
  doc.setFontSize(14);
  doc.setTextColor(60, 60, 60);
  doc.text('Customers Directory Report', 20, 30);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 40);
  doc.text(`Total Customers: ${customers.length}`, 20, 45);
  
  // Prepare table data with customer stats
  const tableData = customers.map(customer => {
    const customerSales = sales.filter(sale => sale.customerId === customer.id);
    const totalSpent = customerSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalOrders = customerSales.length;

    return [
      customer.name,
      customer.email,
      customer.phone,
      'ACTIVE', // Default status since Customer type doesn't have status
      totalOrders.toString(),
      `BDT ${totalSpent.toFixed(2)}`
    ];
  });
  
  // Add table
  autoTable(doc, {
    head: [['Customer Name', 'Email', 'Phone', 'Status', 'Orders', 'Total Spent (BDT)']],
    body: tableData,
    startY: 55,
    styles: {
      fontSize: 9,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [156, 39, 176],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { cellWidth: 35 },
      1: { cellWidth: 45 },
      2: { cellWidth: 30 },
      3: { cellWidth: 20 },
      4: { cellWidth: 20 },
      5: { cellWidth: 30 },
    },
  });
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
    doc.text('ERP System - Customers Report', 20, doc.internal.pageSize.height - 10);
  }
  
  doc.save(`customers-report-${new Date().toISOString().split('T')[0]}.pdf`);
};

// Excel Export Functions
export const exportSalesToExcel = (sales: Sale[]) => {
  // Create workbook
  const wb = XLSX.utils.book_new();

  // Prepare sales data
  const salesData = sales.map(sale => ({
    'Sale Date': new Date(sale.saleDate).toLocaleDateString(),
    'Product Name': sale.productName,
    'Customer Name': sale.customerName,
    'Quantity': sale.quantity,
    'Unit Price (৳)': sale.unitPrice,
    'Total Amount (৳)': sale.totalAmount,
    'Delivery Date': new Date(sale.deliveryDate).toLocaleDateString(),
    'Status': sale.status.toUpperCase()
  }));

  // Create sales worksheet
  const salesWS = XLSX.utils.json_to_sheet(salesData);

  // Set column widths
  salesWS['!cols'] = [
    { width: 12 }, // Sale Date
    { width: 25 }, // Product Name
    { width: 20 }, // Customer Name
    { width: 10 }, // Quantity
    { width: 15 }, // Unit Price
    { width: 15 }, // Total Amount
    { width: 12 }, // Delivery Date
    { width: 12 }  // Status
  ];

  // Add sales sheet
  XLSX.utils.book_append_sheet(wb, salesWS, 'Sales Data');

  // Create summary data
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalQuantity = sales.reduce((sum, sale) => sum + sale.quantity, 0);
  const statusCounts = sales.reduce((acc, sale) => {
    acc[sale.status] = (acc[sale.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const summaryData = [
    { Metric: 'Total Sales', Value: sales.length },
    { Metric: 'Total Revenue (৳)', Value: totalRevenue },
    { Metric: 'Total Quantity', Value: totalQuantity },
    { Metric: 'Average Order Value (৳)', Value: sales.length > 0 ? totalRevenue / sales.length : 0 },
    { Metric: '', Value: '' },
    { Metric: 'Status Breakdown', Value: '' },
    ...Object.entries(statusCounts).map(([status, count]) => ({
      Metric: `${status.toUpperCase()} Orders`,
      Value: count
    }))
  ];

  const summaryWS = XLSX.utils.json_to_sheet(summaryData);
  summaryWS['!cols'] = [{ width: 25 }, { width: 20 }];

  // Add summary sheet
  XLSX.utils.book_append_sheet(wb, summaryWS, 'Summary');

  // Save file
  XLSX.writeFile(wb, `sales-report-${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const exportProductsToExcel = (products: Product[]) => {
  const wb = XLSX.utils.book_new();

  // Prepare products data
  const productsData = products.map(product => ({
    'Product Name': product.name,
    'Category': product.category,
    'Unit Price (৳)': product.price,
    'Stock Quantity': product.stock,
    'Total Value (৳)': product.price * product.stock,
    'Stock Status': product.stock < 10 ? 'LOW STOCK' : 'IN STOCK'
  }));

  const productsWS = XLSX.utils.json_to_sheet(productsData);
  productsWS['!cols'] = [
    { width: 30 }, // Product Name
    { width: 15 }, // Category
    { width: 15 }, // Unit Price
    { width: 12 }, // Stock Quantity
    { width: 15 }, // Total Value
    { width: 12 }  // Stock Status
  ];

  XLSX.utils.book_append_sheet(wb, productsWS, 'Products');

  // Create summary
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStockCount = products.filter(product => product.stock < 10).length;
  const categories = [...new Set(products.map(p => p.category))];

  const summaryData = [
    { Metric: 'Total Products', Value: products.length },
    { Metric: 'Total Inventory Value (৳)', Value: totalValue },
    { Metric: 'Total Stock Units', Value: totalStock },
    { Metric: 'Low Stock Items', Value: lowStockCount },
    { Metric: 'Categories', Value: categories.length },
    { Metric: '', Value: '' },
    { Metric: 'Category Breakdown', Value: '' },
    ...categories.map(category => ({
      Metric: `${category} Products`,
      Value: products.filter(p => p.category === category).length
    }))
  ];

  const summaryWS = XLSX.utils.json_to_sheet(summaryData);
  summaryWS['!cols'] = [{ width: 25 }, { width: 20 }];

  XLSX.utils.book_append_sheet(wb, summaryWS, 'Summary');

  XLSX.writeFile(wb, `products-report-${new Date().toISOString().split('T')[0]}.xlsx`);
};

export const exportCustomersToExcel = (customers: Customer[], sales: Sale[]) => {
  const wb = XLSX.utils.book_new();

  // Prepare customers data with stats
  const customersData = customers.map(customer => {
    const customerSales = sales.filter(sale => sale.customerId === customer.id);
    const totalSpent = customerSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalOrders = customerSales.length;
    const lastOrder = customerSales.length > 0
      ? Math.max(...customerSales.map(sale => new Date(sale.saleDate).getTime()))
      : null;

    return {
      'Customer Name': customer.name,
      'Email': customer.email,
      'Phone': customer.phone,
      'Address': customer.address,
      'Status': 'ACTIVE', // Default status since Customer type doesn't have status
      'Total Orders': totalOrders,
      'Total Spent (৳)': totalSpent,
      'Average Order (৳)': totalOrders > 0 ? totalSpent / totalOrders : 0,
      'Last Order Date': lastOrder ? new Date(lastOrder).toLocaleDateString() : 'Never'
    };
  });

  const customersWS = XLSX.utils.json_to_sheet(customersData);
  customersWS['!cols'] = [
    { width: 25 }, // Customer Name
    { width: 30 }, // Email
    { width: 15 }, // Phone
    { width: 40 }, // Address
    { width: 10 }, // Status
    { width: 12 }, // Total Orders
    { width: 15 }, // Total Spent
    { width: 15 }, // Average Order
    { width: 15 }  // Last Order Date
  ];

  XLSX.utils.book_append_sheet(wb, customersWS, 'Customers');

  // Create summary
  const totalCustomers = customers.length;
  const activeCustomers = customers.length; // All customers are considered active since no status field
  const totalRevenue = customers.reduce((sum, customer) => {
    const customerSales = sales.filter(sale => sale.customerId === customer.id);
    return sum + customerSales.reduce((customerSum, sale) => customerSum + sale.totalAmount, 0);
  }, 0);

  const summaryData = [
    { Metric: 'Total Customers', Value: totalCustomers },
    { Metric: 'Active Customers', Value: activeCustomers },
    { Metric: 'Total Customer Revenue (৳)', Value: totalRevenue },
    { Metric: 'Average Customer Value (৳)', Value: totalCustomers > 0 ? totalRevenue / totalCustomers : 0 }
  ];

  const summaryWS = XLSX.utils.json_to_sheet(summaryData);
  summaryWS['!cols'] = [{ width: 25 }, { width: 20 }];

  XLSX.utils.book_append_sheet(wb, summaryWS, 'Summary');

  XLSX.writeFile(wb, `customers-report-${new Date().toISOString().split('T')[0]}.xlsx`);
};
