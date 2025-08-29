import React, { useState } from 'react';
import { X, Filter, Calendar, User, Activity } from 'lucide-react';

export interface AuditLogFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export const AuditLogFilterModal: React.FC<AuditLogFilterModalProps> = ({ isOpen, onClose, onApply }) => {
  const [filters, setFilters] = useState({
    dateRange: 'all',
    technician: 'all',
    activity: 'all',
    jobId: '',
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
      technician: 'all',
      activity: 'all',
      jobId: '',
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

          {/* Technician */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technician
            </label>
            <select
              value={filters.technician}
              onChange={(e) => handleInputChange('technician', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Technicians</option>
              <option value="alex">Alex Johnson</option>
              <option value="sarah">Sarah Chen</option>
              <option value="mike">Mike Davis</option>
              <option value="james">James Wilson</option>
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
              <option value="job_start">Job Started</option>
              <option value="job_complete">Job Completed</option>
              <option value="file_upload">File Upload</option>
              <option value="settings_change">Settings Changed</option>
              <option value="user_created">User Created</option>
              <option value="user_updated">User Updated</option>
            </select>
          </div>

          {/* Job ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job ID
            </label>
            <input
              type="text"
              value={filters.jobId}
              onChange={(e) => handleInputChange('jobId', e.target.value)}
              placeholder="Enter job ID..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
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
              <option value="user_profile">User Profile</option>
              <option value="job_details">Job Details</option>
              <option value="inventory">Inventory</option>
              <option value="documents">Documents</option>
              <option value="settings">Settings</option>
              <option value="billing">Billing</option>
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
            className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
