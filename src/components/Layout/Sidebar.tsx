import {
  BarChart3,
  ShoppingCart,
  Users,
  Package,
  Settings,
  Bell,
  Home,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
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

export function Sidebar({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) {
  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    onClose(); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
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
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-xl font-bold text-blue-400">ERP System</h1>
              <p className="text-gray-400 text-xs">Sales & Accounts</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}