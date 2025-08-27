import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Crown, Shield, Wrench } from 'lucide-react';

export type Role = 'superadmin' | 'admin' | 'technician';

interface RoleSelectorProps {
  selectedRole: Role;
  onRoleChange: (role: Role) => void;
  disabled?: boolean;
  className?: string;
}

const roleConfig = {
  superadmin: {
    label: 'Super Admin',
    description: 'Full system control, can manage all organizations',
    icon: Crown,
    color: 'text-purple-600'
  },
  admin: {
    label: 'Admin',
    description: 'Can manage jobs, work orders, users',
    icon: Shield,
    color: 'text-blue-600'
  },
  technician: {
    label: 'Technician',
    description: 'Can work on assigned jobs, clock in/out',
    icon: Wrench,
    color: 'text-gray-600'
  }
};

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRole,
  onRoleChange,
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedConfig = roleConfig[selectedRole];
  const IconComponent = selectedConfig.icon;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRoleSelect = (role: Role) => {
    onRoleChange(role);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full h-12 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent transition-all ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400 dark:hover:border-gray-500'
        }`}
      >
        <div className="flex items-center gap-3">
          <IconComponent className={`w-5 h-5 ${selectedConfig.color}`} />
          <div className="text-left">
            <div className="font-medium text-gray-900 dark:text-white">
              {selectedConfig.label}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {selectedConfig.description}
            </div>
          </div>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {Object.entries(roleConfig).map(([role, config]) => {
            const RoleIcon = config.icon;
            return (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelect(role as Role)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors ${
                  selectedRole === role ? 'bg-[#10BF0A] bg-opacity-10' : ''
                }`}
              >
                <RoleIcon className={`w-5 h-5 ${config.color}`} />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {config.label}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {config.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
