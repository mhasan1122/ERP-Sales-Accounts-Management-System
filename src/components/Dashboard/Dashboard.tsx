import {
  ShoppingCart,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Package
} from 'lucide-react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import { useSales } from '../../contexts/SalesContext';
import { SalesChart } from './SalesChart';
import { RevenueChart } from './RevenueChart';

export function Dashboard() {
  const { dashboardStats, sales } = useSales();

  const recentSales = sales.slice(0, 5);
  const overdueSales = sales.filter(sale => sale.status === 'overdue');

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    change
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    change?: string;
  }) => (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{value}</p>
          {change && (
            <p className="text-xs sm:text-sm text-green-600 mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{change}</span>
            </p>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-full ${color} flex-shrink-0 ml-2`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">Overview of your sales and account metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Revenue"
          value={`৳${dashboardStats.totalRevenue.toLocaleString()}`}
          icon={FaBangladeshiTakaSign}
          color="bg-green-500"
          change="+12.5% from last month"
        />
        <StatCard
          title="Total Sales"
          value={dashboardStats.totalSales}
          icon={ShoppingCart}
          color="bg-blue-500"
          change="+8.2% from last month"
        />
        <StatCard
          title="Pending Deliveries"
          value={dashboardStats.pendingDeliveries}
          icon={Package}
          color="bg-orange-500"
        />
        <StatCard
          title="Overdue Deliveries"
          value={dashboardStats.overdueDeliveries}
          icon={AlertTriangle}
          color="bg-red-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <SalesChart />
        <RevenueChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales</h3>
          <div className="space-y-4">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{sale.productName}</p>
                  <p className="text-sm text-gray-600">{sale.customerName}</p>
                  <p className="text-xs text-gray-500">Qty: {sale.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">৳{sale.totalAmount.toFixed(2)}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    sale.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    sale.status === 'delivered' ? 'bg-blue-100 text-blue-800' :
                    sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {sale.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overdue Deliveries Alert */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            Overdue Deliveries
          </h3>
          {overdueSales.length > 0 ? (
            <div className="space-y-4">
              {overdueSales.map((sale) => (
                <div key={sale.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{sale.productName}</p>
                      <p className="text-sm text-gray-600">{sale.customerName}</p>
                      <p className="text-xs text-red-600 flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        Due: {new Date(sale.deliveryDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">৳{sale.totalAmount.toFixed(2)}</p>
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        {Math.ceil((Date.now() - new Date(sale.deliveryDate).getTime()) / (1000 * 60 * 60 * 24))} days overdue
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No overdue deliveries. Great job!</p>
          )}
        </div>
      </div>
    </div>
  );
}