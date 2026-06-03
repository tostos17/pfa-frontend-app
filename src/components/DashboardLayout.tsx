import React from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white antialiased">
      {/* Permanent Structural Desktop Sidebar */}
      <Sidebar />

      {/* Main Workspace Frame */}
      <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;