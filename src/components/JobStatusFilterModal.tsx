import React, { useState } from 'react';
import { X, Filter, Check } from 'lucide-react';

export interface JobStatusFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export const JobStatusFilterModal: React.FC<JobStatusFilterModalProps> = ({
  isOpen,
  onClose,
  onApply
}) => {
  const [filters, setFilters] = useState({
    status: [] as string[],
    priority: [] as string[],
    dateRange: 'all',
    technician: 'all'
  });

  if (!isOpen) return null;

  const statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled', 'On Hold'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h3 className="text-lg font-semibold text-black dark:text-white">Filter Jobs</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">Status</label>
            <div className="space-y-2">
              {statuses.map(status => (
                <label key={status} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters(prev => ({ ...prev, status: [...prev.status, status] }));
                      } else {
                        setFilters(prev => ({ ...prev, status: prev.status.filter(s => s !== status) }));
                      }
                    }}
                    className="w-4 h-4 text-[#10BF0A]"
                  />
                  <span className="text-sm text-black dark:text-white">{status}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">Priority</label>
            <div className="space-y-2">
              {priorities.map(priority => (
                <label key={priority} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.priority.includes(priority)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters(prev => ({ ...prev, priority: [...prev.priority, priority] }));
                      } else {
                        setFilters(prev => ({ ...prev, priority: prev.priority.filter(p => p !== priority) }));
                      }
                    }}
                    className="w-4 h-4 text-[#10BF0A]"
                  />
                  <span className="text-sm text-black dark:text-white">{priority}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-[#E5E7EB] text-gray-700 dark:text-gray-300 rounded-lg">
              Cancel
            </button>
            <button onClick={handleApply} className="flex-1 px-4 py-2 bg-[#10BF0A] text-white rounded-lg flex items-center justify-center gap-2">
              <Filter className="w-4 h-4" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
