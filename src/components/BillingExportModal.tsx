import React, { useState } from 'react';
import { X, Download, FileText, FileSpreadsheet } from 'lucide-react';

export interface BillingExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (config: any) => void;
}

export const BillingExportModal: React.FC<BillingExportModalProps> = ({ isOpen, onClose, onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    dateRange: 'all',
    includeColumns: ['company', 'status', 'plan', 'paymentMethod', 'amount', 'date'],
    filters: {
      status: 'all',
      plan: 'all',
      paymentMethod: 'all'
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
    { value: 'company', label: 'Company Name' },
    { value: 'status', label: 'Status' },
    { value: 'plan', label: 'Plan' },
    { value: 'paymentMethod', label: 'Payment Method' },
    { value: 'amount', label: 'Amount' },
    { value: 'date', label: 'Date' },
    { value: 'users', label: 'Users' },
    { value: 'jobsPosted', label: 'Jobs Posted' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const planOptions = [
    { value: 'all', label: 'All Plans' },
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise' }
  ];

  const paymentMethodOptions = [
    { value: 'all', label: 'All Methods' },
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'stripe', label: 'Stripe' }
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
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Export Billing Data</h2>
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
            
            {/* Status Filter */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Status</label>
              <select
                value={exportConfig.filters.status}
                onChange={(e) => handleFilterToggle('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Plan Filter */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Plan</label>
              <select
                value={exportConfig.filters.plan}
                onChange={(e) => handleFilterToggle('plan', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                {planOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Payment Method Filter */}
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Payment Method</label>
              <select
                value={exportConfig.filters.paymentMethod}
                onChange={(e) => handleFilterToggle('paymentMethod', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                {paymentMethodOptions.map((option) => (
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
