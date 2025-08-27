import React, { useState } from 'react';
import {
  X,
  Users,
  Trash,
  Edit,
  CheckCircle,
  Clock,
  Flag,
  ChevronDown,
  AlertTriangle,
  Calendar
} from 'lucide-react';

interface BulkActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJobs: string[];
  onApplyBulkAction: (action: string, data?: any) => void;
}

export const BulkActionsModal: React.FC<BulkActionsModalProps> = ({
  isOpen,
  onClose,
  selectedJobs,
  onApplyBulkAction
}) => {
  const [activeAction, setActiveAction] = useState<'assign' | 'status' | 'priority' | 'delete' | 'schedule'>('assign');
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  if (!isOpen) return null;

  const technicians = [
    { id: 1, name: 'John Doe', email: 'john@fieldsync.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@fieldsync.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike@fieldsync.com' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@fieldsync.com' }
  ];

  const statuses = ['To-do', 'In Progress', 'Completed', 'On Hold'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];

  const actions = [
    { 
      id: 'assign', 
      label: 'Assign Technician', 
      icon: Users, 
      description: 'Assign selected jobs to a technician',
      color: 'text-blue-600 bg-blue-50'
    },
    { 
      id: 'status', 
      label: 'Change Status', 
      icon: CheckCircle, 
      description: 'Update status for selected jobs',
      color: 'text-green-600 bg-green-50'
    },
    { 
      id: 'priority', 
      label: 'Set Priority', 
      icon: Flag, 
      description: 'Update priority level for selected jobs',
      color: 'text-orange-600 bg-orange-50'
    },
    { 
      id: 'schedule', 
      label: 'Reschedule', 
      icon: Calendar, 
      description: 'Update schedule for selected jobs',
      color: 'text-purple-600 bg-purple-50'
    },
    { 
      id: 'delete', 
      label: 'Delete Jobs', 
      icon: Trash, 
      description: 'Permanently delete selected jobs',
      color: 'text-red-600 bg-red-50'
    }
  ];

  const handleApplyAction = () => {
    let actionData: any = {};

    switch (activeAction) {
      case 'assign':
        if (!selectedTechnician) {
          alert('Please select a technician');
          return;
        }
        actionData = { technicianId: selectedTechnician };
        break;
      case 'status':
        if (!selectedStatus) {
          alert('Please select a status');
          return;
        }
        actionData = { status: selectedStatus };
        break;
      case 'priority':
        if (!selectedPriority) {
          alert('Please select a priority');
          return;
        }
        actionData = { priority: selectedPriority };
        break;
      case 'schedule':
        if (!scheduleDate || !scheduleTime) {
          alert('Please select both date and time');
          return;
        }
        actionData = { date: scheduleDate, time: scheduleTime };
        break;
      case 'delete':
        if (!confirm(`Are you sure you want to delete ${selectedJobs.length} job(s)? This action cannot be undone.`)) {
          return;
        }
        break;
    }

    onApplyBulkAction(activeAction, actionData);
    onClose();
  };

  const resetForm = () => {
    setSelectedTechnician('');
    setSelectedStatus('');
    setSelectedPriority('');
    setScheduleDate('');
    setScheduleTime('');
  };

  const handleActionChange = (actionId: string) => {
    setActiveAction(actionId as any);
    resetForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E5E7EB]">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white">Bulk Actions</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedJobs.length} job(s) selected</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          <div className="space-y-4 sm:space-y-6">
            {/* Action Selection */}
            <div>
              <h3 className="text-base sm:text-lg font-medium text-black dark:text-white mb-3 sm:mb-4">Select Action</h3>
              <div className="grid grid-cols-1 gap-3">
                {actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleActionChange(action.id)}
                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border rounded-xl text-left transition-all ${
                      activeAction === action.id
                        ? 'border-[#10BF0A] bg-[rgba(16,191,10,0.05)]'
                        : 'border-[#E5E7EB] hover:border-[#10BF0A]'
                    }`}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${action.color}`}>
                      <action.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-black dark:text-white text-sm sm:text-base">{action.label}</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action-specific Forms */}
            <div className="border-t border-[#E5E7EB] pt-6">
              <h3 className="text-lg font-medium text-black dark:text-white mb-4">Action Details</h3>
              
              {activeAction === 'assign' && (
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Assign to Technician
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTechnician}
                      onChange={(e) => setSelectedTechnician(e.target.value)}
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent appearance-none bg-white dark:bg-gray-800"
                    >
                      <option value="">Select a technician...</option>
                      {technicians.map((tech) => (
                        <option key={tech.id} value={tech.id}>
                          {tech.name} - {tech.email}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6C6C6C] pointer-events-none" />
                  </div>
                </div>
              )}

              {activeAction === 'status' && (
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    New Status
                  </label>
                  <div className="relative">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent appearance-none bg-white dark:bg-gray-800"
                    >
                      <option value="">Select status...</option>
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6C6C6C] pointer-events-none" />
                  </div>
                </div>
              )}

              {activeAction === 'priority' && (
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">
                    Priority Level
                  </label>
                  <div className="relative">
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value)}
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent appearance-none bg-white dark:bg-gray-800"
                    >
                      <option value="">Select priority...</option>
                      {priorities.map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6C6C6C] pointer-events-none" />
                  </div>
                </div>
              )}

              {activeAction === 'schedule' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {activeAction === 'delete' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-red-900 mb-2">Warning: Permanent Deletion</h4>
                      <p className="text-sm text-red-700 mb-3">
                        This action will permanently delete {selectedJobs.length} job(s) and cannot be undone. 
                        All associated data including notes, photos, and progress will be lost.
                      </p>
                      <div className="text-sm text-red-700">
                        <p className="font-medium">Jobs that will be deleted:</p>
                        <ul className="list-disc list-inside mt-1">
                          {selectedJobs.slice(0, 3).map((jobId) => (
                            <li key={jobId}>Job {jobId}</li>
                          ))}
                          {selectedJobs.length > 3 && (
                            <li>...and {selectedJobs.length - 3} more jobs</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[#E5E7EB] bg-[#F8F9FA]">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#E5E7EB] text-[#6C6C6C] rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <div className="flex gap-3">
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-[#E5E7EB] text-black dark:text-white rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleApplyAction}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeAction === 'delete'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-[#10BF0A] text-white hover:bg-[#0EA50A]'
              }`}
            >
              {activeAction === 'delete' ? 'Delete Jobs' : 'Apply Action'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
