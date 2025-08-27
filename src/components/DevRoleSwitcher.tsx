import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { getDashboardRoute } from '../utils/routing';
import { useNavigate } from 'react-router-dom';
import { Crown, Shield, Wrench } from 'lucide-react';

const DevRoleSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setMockAuth } = useAuthStore();
  const navigate = useNavigate();

  const roles = [
    {
        
      role: 'superadmin' as const,
      label: 'Super Admin',
      icon: Crown,
      color: 'text-purple-600',
      description: 'Full system control'
    },
    {
      role: 'admin' as const,
      label: 'Admin',
      icon: Shield,
      color: 'text-blue-600',
      description: 'Manage jobs & users'
    },
    {
      role: 'technician' as const,
      label: 'Technician',
      icon: Wrench,
      color: 'text-gray-600',
      description: 'Work on jobs'
    }
  ];

  const handleRoleSwitch = (role: 'superadmin' | 'admin' | 'technician') => {
    setMockAuth(role);
    const dashboardRoute = getDashboardRoute({ ...user!, role });
    navigate(dashboardRoute);
    setIsOpen(false);
  };

  const currentRole = roles.find(r => r.role === user?.role);
  const CurrentIcon = currentRole?.icon || Shield;

  // Show in development mode or when explicitly enabled
  if (import.meta.env.PROD && !import.meta.env.VITE_ENABLE_DEV_SWITCHER) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          <CurrentIcon className={`w-4 h-4 ${currentRole?.color}`} />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentRole?.label}
          </span>
          <div className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
            DEV
          </div>
        </button>

        {isOpen && (
          <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl min-w-[200px]">
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Switch Role (Dev Only)
              </div>
            </div>
            {roles.map((roleConfig) => {
              const Icon = roleConfig.icon;
              const isActive = user?.role === roleConfig.role;
              
              return (
                <button
                  key={roleConfig.role}
                  onClick={() => handleRoleSwitch(roleConfig.role)}
                  className={`w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors ${
                    isActive ? 'bg-[#10BF0A] bg-opacity-10' : ''
                  }`}
                >
                  <Icon className={`w-4 h-4 ${roleConfig.color}`} />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {roleConfig.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {roleConfig.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-[#10BF0A] rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DevRoleSwitcher;
