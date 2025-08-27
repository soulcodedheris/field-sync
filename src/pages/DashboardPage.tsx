import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { TechnicianDashboard } from './TechnicianDashboard';

// Role-based dashboard router
export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();

  // Route to appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (user?.role) {
      case 'technician':
        return <TechnicianDashboard />;
      case 'admin':
        return (
          <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Coming soon... This will be the admin management dashboard.</p>
            </div>
          </div>
        );
      case 'superadmin':
        return (
          <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Super Admin Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Coming soon... This will be the super admin system dashboard.</p>
            </div>
          </div>
        );
      default:
        return <TechnicianDashboard />; // Fallback to technician dashboard
    }
  };

  return renderDashboard();
};
