import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { SalesProvider } from './contexts/SalesContext';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Sales } from './components/Sales/Sales';
import { Products } from './components/Products/Products';
import { Customers } from './components/Customers/Customers';
import { AdminPanel } from './components/Admin/AdminPanel';
import { Reports } from './components/Reports/Reports';
import { Notifications } from './components/Notifications/Notifications';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'sales': return <Sales />;
      case 'products': return <Products />;
      case 'customers': return <Customers />;
      case 'reports': return <Reports />;
      case 'notifications': return <Notifications />;
      case 'admin': return <AdminPanel />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <SalesProvider>
        <AppContent />
      </SalesProvider>
    </AuthProvider>
  );
}

export default App;