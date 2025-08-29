import React, { useState } from 'react';
import { X, Download, FileText, Calendar, Filter, CheckSquare, Square } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (exportData: any) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onExport
}) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    dateRange: 'all',
    customStartDate: '',
    customEndDate: '',
    includeColumns: [
      'id', 'title', 'status', 'priority', 'client', 'technician', 'startDate', 'estimatedCost'
    ],
    filters: {
      status: [] as string[],
      priority: [] as string[],
      technician: [] as string[]
    }
  });

  const [isExporting, setIsExporting] = useState(false);

  const formats = [
    { id: 'csv', label: 'CSV', description: 'Comma-separated values' },
    { id: 'excel', label: 'Excel', description: 'Microsoft Excel format' },
    { id: 'pdf', label: 'PDF', description: 'Portable Document Format' },
    { id: 'json', label: 'JSON', description: 'JavaScript Object Notation' }
  ];

  const dateRanges = [
    { id: 'all', label: 'All Time' },
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'thisWeek', label: 'This Week' },
    { id: 'lastWeek', label: 'Last Week' },
    { id: 'thisMonth', label: 'This Month' },
    { id: 'lastMonth', label: 'Last Month' },
    { id: 'custom', label: 'Custom Range' }
  ];

  const availableColumns = [
    { id: 'id', label: 'Job ID', description: 'Unique job identifier' },
    { id: 'title', label: 'Job Title', description: 'Job name and description' },
    { id: 'status', label: 'Status', description: 'Current job status' },
    { id: 'priority', label: 'Priority', description: 'Job priority level' },
    { id: 'client', label: 'Client', description: 'Client information' },
    { id: 'technician', label: 'Technician', description: 'Assigned technician' },
    { id: 'startDate', label: 'Start Date', description: 'Job start date' },
    { id: 'endDate', label: 'End Date', description: 'Job end date' },
    { id: 'estimatedCost', label: 'Estimated Cost', description: 'Estimated job cost' },
    { id: 'actualCost', label: 'Actual Cost', description: 'Actual job cost' },
    { id: 'location', label: 'Location', description: 'Job location' },
    { id: 'description', label: 'Description', description: 'Job description' },
    { id: 'notes', label: 'Notes', description: 'Job notes and comments' },
    { id: 'createdAt', label: 'Created Date', description: 'Job creation date' },
    { id: 'updatedAt', label: 'Updated Date', description: 'Last update date' }
  ];

  const statusOptions = ['Pending', 'In Progress', 'Completed', 'Cancelled', 'On Hold'];
  const priorityOptions = ['Low', 'Medium', 'High', 'Critical'];
  const technicianOptions = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'];

  const handleColumnToggle = (columnId: string) => {
    setExportConfig(prev => ({
      ...prev,
      includeColumns: prev.includeColumns.includes(columnId)
        ? prev.includeColumns.filter(id => id !== columnId)
        : [...prev.includeColumns, columnId]
    }));
  };

  const handleFilterToggle = (filterType: string, value: string) => {
    setExportConfig(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: prev.filters[filterType as keyof typeof prev.filters].includes(value)
          ? prev.filters[filterType as keyof typeof prev.filters].filter(v => v !== value)
          : [...prev.filters[filterType as keyof typeof prev.filters], value]
      }
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    onExport(exportConfig);
    handleClose();
    setIsExporting(false);
  };

  const handleClose = () => {
    setExportConfig({
      format: 'csv',
      dateRange: 'all',
      customStartDate: '',
      customEndDate: '',
      includeColumns: [
        'id', 'title', 'status', 'priority', 'client', 'technician', 'startDate', 'estimatedCost'
      ],
      filters: {
        status: [],
        priority: [],
        technician: []
      }
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Download className="w-5 h-5 text-[#10BF0A] dark:text-[#10BF0A]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Export Data</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configure and export job data</p>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Export Format</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {formats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setExportConfig(prev => ({ ...prev, format: format.id }))}
                  className={`p-4 rounded-lg border transition-colors text-left ${
                    exportConfig.format === format.id
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <FileText className={`w-6 h-6 ${
                      exportConfig.format === format.id ? 'text-[#10BF0A] dark:text-[#10BF0A]' : 'text-gray-500'
                    }`} />
                    <div>
                      <p className={`font-medium ${
                        exportConfig.format === format.id ? 'text-[#10BF0A] dark:text-[#10BF0A]' : 'text-gray-900 dark:text-white'
                      }`}>
                        {format.label}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{format.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Date Range</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dateRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setExportConfig(prev => ({ ...prev, dateRange: range.id }))}
                  className={`p-3 rounded-lg border transition-colors ${
                    exportConfig.dateRange === range.id
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-[#10BF0A] dark:text-[#10BF0A]'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
            
            {exportConfig.dateRange === 'custom' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={exportConfig.customStartDate}
                    onChange={(e) => setExportConfig(prev => ({ ...prev, customStartDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={exportConfig.customEndDate}
                    onChange={(e) => setExportConfig(prev => ({ ...prev, customEndDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Columns Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Include Columns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {availableColumns.map((column) => (
                <label
                  key={column.id}
                  className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  {exportConfig.includeColumns.includes(column.id) ? (
                    <CheckSquare className="w-5 h-5 text-[#10BF0A] dark:text-[#10BF0A] mt-0.5 flex-shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{column.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{column.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={exportConfig.includeColumns.includes(column.id)}
                    onChange={() => handleColumnToggle(column.id)}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Status Filter */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Status</h4>
                <div className="space-y-2">
                  {statusOptions.map((status) => (
                    <label key={status} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={exportConfig.filters.status.includes(status)}
                        onChange={() => handleFilterToggle('status', status)}
                        className="w-4 h-4 text-[#10BF0A] border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Priority</h4>
                <div className="space-y-2">
                  {priorityOptions.map((priority) => (
                    <label key={priority} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={exportConfig.filters.priority.includes(priority)}
                        onChange={() => handleFilterToggle('priority', priority)}
                        className="w-4 h-4 text-[#10BF0A] border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Technician Filter */}
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Technician</h4>
                <div className="space-y-2">
                  {technicianOptions.map((technician) => (
                    <label key={technician} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={exportConfig.filters.technician.includes(technician)}
                        onChange={() => handleFilterToggle('technician', technician)}
                        className="w-4 h-4 text-[#10BF0A] border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{technician}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Export Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Export Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Format:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {formats.find(f => f.id === exportConfig.format)?.label}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Date Range:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {dateRanges.find(d => d.id === exportConfig.dateRange)?.label}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Columns:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white">
                  {exportConfig.includeColumns.length} selected
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export Data
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
