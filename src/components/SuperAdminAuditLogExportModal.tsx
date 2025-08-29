import React, { useState } from 'react';
import { X, Download, FileText, FileSpreadsheet } from 'lucide-react';

export interface SuperAdminAuditLogExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (config: any) => void;
}

export const SuperAdminAuditLogExportModal: React.FC<SuperAdminAuditLogExportModalProps> = ({ isOpen, onClose, onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    dateRange: 'all',
    includeColumns: ['date', 'time', 'company', 'user', 'activity', 'severity', 'affectedResource'],
    filters: {
      company: 'all',
      user: 'all',
      activity: 'all',
      severity: 'all',
      affectedResource: 'all'
    }
  });

  const formats = [
    { value: 'csv', label: 'CSV', icon: FileText },
    { value: 'excel', label: 'Excel', icon: FileSpreadsheet },
    { value: 'pdf', label: 'PDF', icon: FileText }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const availableColumns = [
    { value: 'date', label: 'Date' },
    { value: 'time', label: 'Time' },
    { value: 'company', label: 'Company' },
    { value: 'user', label: 'User' },
    { value: 'activity', label: 'Activity' },
    { value: 'severity', label: 'Severity' },
    { value: 'affectedResource', label: 'Affected Resource' },
    { value: 'ipAddress', label: 'IP Address' },
    { value: 'userAgent', label: 'User Agent' },
    { value: 'details', label: 'Details' }
  ];

  const companyOptions = [
    { value: 'all', label: 'All Companies' },
    { value: 'techcorp', label: 'TechCorp Solutions' },
    { value: 'global', label: 'Global Industries' },
    { value: 'startupspace', label: 'StartupSpace' },
    { value: 'innovate', label: 'InnovateTech' }
  ];

  const userOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'admin', label: 'Admin Users' },
    { value: 'superadmin', label: 'Super Admin' },
    { value: 'technician', label: 'Technicians' },
    { value: 'system', label: 'System' }
  ];

  const activityOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'login', label: 'Login' },
    { value: 'logout', label: 'Logout' },
    { value: 'user_created', label: 'User Created' },
    { value: 'user_updated', label: 'User Updated' },
    { value: 'user_deleted', label: 'User Deleted' },
    { value: 'company_created', label: 'Company Created' },
    { value: 'company_updated', label: 'Company Updated' },
    { value: 'company_deleted', label: 'Company Deleted' },
    { value: 'settings_changed', label: 'Settings Changed' },
    { value: 'billing_updated', label: 'Billing Updated' },
    { value: 'plan_changed', label: 'Plan Changed' }
  ];

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  const resourceOptions = [
    { value: 'all', label: 'All Resources' },
    { value: 'user_management', label: 'User Management' },
    { value: 'company_management', label: 'Company Management' },
    { value: 'billing', label: 'Billing' },
    { value: 'settings', label: 'Settings' },
    { value: 'security', label: 'Security' },
    { value: 'system', label: 'System' }
  ];

  const handleColumnToggle = (column: string) => {
    setExportConfig(prev => ({
      ...prev,
      includeColumns: prev.includeColumns.includes(column)
        ? prev.includeColumns.filter(c => c !== column)
        : [...prev.includeColumns, column]
    }));
  };

  const handleFilterToggle = (filterType: string, value: string) => {
    setExportConfig(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: value
      }
    }));
  };

  const handleExport = () => {
    onExport(exportConfig);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Download className="w-5 h-5 text-[#10BF0A]" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Export Audit Log</h2>
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
          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              {formats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => setExportConfig(prev => ({ ...prev, format: format.value }))}
                  className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    exportConfig.format === format.value
                      ? 'border-green-600 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <format.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{format.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Range
            </label>
            <select
              value={exportConfig.dateRange}
              onChange={(e) => setExportConfig(prev => ({ ...prev, dateRange: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>

          {/* Include Columns */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Include Columns
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableColumns.map((column) => (
                <label key={column.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exportConfig.includeColumns.includes(column.value)}
                    onChange={() => handleColumnToggle(column.value)}
                    className="rounded border-gray-300 dark:border-gray-600 text-[#10BF0A] focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{column.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters</h3>
            
            {/* Company Filter */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Company</label>
              <select
                value={exportConfig.filters.company}
                onChange={(e) => handleFilterToggle('company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                {companyOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* User Filter */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">User</label>
              <select
                value={exportConfig.filters.user}
                onChange={(e) => handleFilterToggle('user', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                {userOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Activity Filter */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Activity</label>
              <select
                value={exportConfig.filters.activity}
                onChange={(e) => handleFilterToggle('activity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                {activityOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Severity</label>
              <select
                value={exportConfig.filters.severity}
                onChange={(e) => handleFilterToggle('severity', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                {severityOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Resource Filter */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Affected Resource</label>
              <select
                value={exportConfig.filters.affectedResource}
                onChange={(e) => handleFilterToggle('affectedResource', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                {resourceOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
};
