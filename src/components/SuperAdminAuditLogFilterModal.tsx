import React, { useState } from 'react';
import { X, Filter, Calendar, User, Activity, Building } from 'lucide-react';

export interface SuperAdminAuditLogFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export const SuperAdminAuditLogFilterModal: React.FC<SuperAdminAuditLogFilterModalProps> = ({ isOpen, onClose, onApply }) => {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    company: 'all',
    user: 'all',
    activity: 'all',
    severity: 'all',
    affectedResource: 'all'
  });

  const handleInputChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      dateRange: 'all',
      company: 'all',
      user: 'all',
      activity: 'all',
      severity: 'all',
      affectedResource: 'all'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-[#10BF0A]" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Audit Log</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleInputChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company
            </label>
            <select
              value={filters.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Companies</option>
              <option value="techcorp">TechCorp Solutions</option>
              <option value="global">Global Industries</option>
              <option value="startupspace">StartupSpace</option>
              <option value="innovate">InnovateTech</option>
            </select>
          </div>

          {/* User */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              User
            </label>
            <select
              value={filters.user}
              onChange={(e) => handleInputChange('user', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Users</option>
              <option value="admin">Admin Users</option>
              <option value="superadmin">Super Admin</option>
              <option value="technician">Technicians</option>
              <option value="system">System</option>
            </select>
          </div>

          {/* Activity Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Activity Type
            </label>
            <select
              value={filters.activity}
              onChange={(e) => handleInputChange('activity', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Activities</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="user_created">User Created</option>
              <option value="user_updated">User Updated</option>
              <option value="user_deleted">User Deleted</option>
              <option value="company_created">Company Created</option>
              <option value="company_updated">Company Updated</option>
              <option value="company_deleted">Company Deleted</option>
              <option value="settings_changed">Settings Changed</option>
              <option value="billing_updated">Billing Updated</option>
              <option value="plan_changed">Plan Changed</option>
            </select>
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Severity
            </label>
            <select
              value={filters.severity}
              onChange={(e) => handleInputChange('severity', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {/* Affected Resource */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Affected Resource
            </label>
            <select
              value={filters.affectedResource}
              onChange={(e) => handleInputChange('affectedResource', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Resources</option>
              <option value="user_management">User Management</option>
              <option value="company_management">Company Management</option>
              <option value="billing">Billing</option>
              <option value="settings">Settings</option>
              <option value="security">Security</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
