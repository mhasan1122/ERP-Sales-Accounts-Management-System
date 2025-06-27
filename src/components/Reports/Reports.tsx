import React, { useState } from 'react';
import { Download, FileText, BarChart3, Calendar } from 'lucide-react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { useSales } from '../../contexts/SalesContext';

export function Reports() {
  const { sales, dashboardStats } = useSales();
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('month');

  const generateReport = (format: 'pdf' | 'excel') => {
    // Mock report generation
    const reportData = {
      type: reportType,
      dateRange,
      generatedAt: new Date().toISOString(),
      data: sales
    };
    
    console.log(`Generating ${format.toUpperCase()} report:`, reportData);
    
    // In a real application, this would trigger the actual report generation
    alert(`${format.toUpperCase()} report generation started. You'll receive a download link shortly.`);
  };

  const reportTypes = [
    { id: 'sales', name: 'Sales Report', description: 'Comprehensive sales data and analytics' },
    { id: 'revenue', name: 'Revenue Report', description: 'Revenue trends and financial metrics' },
    { id: 'products', name: 'Product Performance', description: 'Best and worst performing products' },
    { id: 'customers', name: 'Customer Analysis', description: 'Customer behavior and purchase patterns' },
  ];

  const getSalesAnalytics = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlySales = sales.filter(sale => {
      const saleDate = new Date(sale.saleDate);
      return saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear;
    });

    const topProducts = sales.reduce((acc, sale) => {
      if (!acc[sale.productName]) {
        acc[sale.productName] = { quantity: 0, revenue: 0 };
      }
      acc[sale.productName].quantity += sale.quantity;
      acc[sale.productName].revenue += sale.totalAmount;
      return acc;
    }, {} as Record<string, { quantity: number; revenue: number }>);

    return {
      monthlySales: monthlySales.length,
      monthlyRevenue: monthlySales.reduce((sum, sale) => sum + sale.totalAmount, 0),
      topProducts: Object.entries(topProducts)
        .sort(([,a], [,b]) => b.revenue - a.revenue)
        .slice(0, 5)
    };
  };

  const analytics = getSalesAnalytics();

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Generate comprehensive reports and analyze your business data</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{analytics.monthlySales}</p>
              <p className="text-xs sm:text-sm text-gray-600">Sales This Month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">৳{analytics.monthlyRevenue.toFixed(0)}</p>
              <p className="text-xs sm:text-sm text-gray-600">Revenue This Month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{dashboardStats.pendingDeliveries}</p>
              <p className="text-xs sm:text-sm text-gray-600">Pending Deliveries</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Download className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xl sm:text-2xl font-bold text-gray-900">24</p>
              <p className="text-xs sm:text-sm text-gray-600">Reports Generated</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Generator */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Generate Reports</h2>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Report Configuration</h3>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Report Type</label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                >
                  {reportTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {reportTypes.find(t => t.id === reportType)?.description}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                >
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="quarter">Last 3 Months</option>
                  <option value="year">Last 12 Months</option>
                  <option value="all">All Time</option>
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button 
                  onClick={() => generateReport('pdf')}
                  className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Export PDF</span>
                </button>
                <button 
                  onClick={() => generateReport('excel')}
                  className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Export Excel</span>
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Products</h3>
            <div className="space-y-3">
              {analytics.topProducts.map(([productName, data], index) => (
                <div key={productName} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center mr-3">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{productName}</p>
                      <p className="text-sm text-gray-600">{data.quantity} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">৳{data.revenue.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Reports</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Monthly Sales Report</h4>
                <p className="text-sm text-gray-600">Generated on December 15, 2024</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">Revenue Analysis Q4</h4>
                <p className="text-sm text-gray-600">Generated on December 10, 2024</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}