import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  DollarSign,
  FileText,
  Flag,
  Wrench,
  ChevronDown
} from 'lucide-react';

interface JobEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (jobData: any) => void;
  // Accept a broad shape so we can open this modal from either a Job or a WorkOrder
  job: any | null;
}

export const JobEditModal: React.FC<JobEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  job
}) => {
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    clientAddress: '',
    technicianName: '',
    priority: 'Medium',
    status: 'To-do',
    cost: '',
    date: '',
    duration: '',
    description: '',
    jobType: 'HVAC Maintenance'
  });

  const normalizePriority = (priority: any): string => {
    if (!priority) return 'Medium';
    const value = String(priority).toLowerCase();
    if (value.includes('urgent')) return 'Urgent';
    if (value.includes('high')) return 'High';
    if (value.includes('low')) return 'Low';
    return 'Medium';
  };

  const normalizeStatus = (status: any): string => {
    if (!status) return 'To-do';
    const value = String(status).toLowerCase();
    if (value.includes('in_progress')) return 'In Progress';
    if (value.includes('completed')) return 'Completed';
    if (value.includes('hold')) return 'On Hold';
    return 'To-do';
  };

  const computeDuration = (start?: string, end?: string): string => {
    if (!start || !end) return '';
    const ms = new Date(end).getTime() - new Date(start).getTime();
    if (ms <= 0) return '';
    const minutes = Math.round(ms / 60000);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const rem = minutes % 60;
    return rem ? `${hours}h ${rem}m` : `${hours}h`;
  };

  useEffect(() => {
    if (job) {
      const title = job.title ?? job.name ?? '';
      const clientName = job.client?.name ?? job.clientName ?? '';
      const clientAddress = job.client?.address ?? job.primaryLocation ?? '';
      const technicianName = job.technician?.name ?? job.primaryTechnician?.name ?? '';
      const priority = normalizePriority(job.priority);
      const status = normalizeStatus(job.status);
      const cost = job.cost ?? '';
      const date = job.schedule?.date ?? (job.scheduledStart ? new Date(job.scheduledStart).toLocaleString() : '');
      const duration = job.schedule?.duration ?? computeDuration(job.scheduledStart, job.scheduledEnd) ?? '';

      setFormData({
        title,
        clientName,
        clientAddress,
        technicianName,
        priority,
        status,
        cost,
        date,
        duration,
        description: '',
        jobType: 'HVAC Maintenance'
      });
    }
  }, [job]);

  if (!isOpen || !job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...job,
      title: formData.title,
      client: {
        name: formData.clientName,
        address: formData.clientAddress
      },
      technician: {
        ...job.technician,
        name: formData.technicianName
      },
      priority: formData.priority,
      status: formData.status,
      cost: formData.cost,
      schedule: {
        date: formData.date,
        duration: formData.duration
      }
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
  const statuses = ['To-do', 'In Progress', 'Completed', 'On Hold'];
  const jobTypes = ['HVAC Maintenance', 'Electrical Repair', 'Plumbing', 'General Maintenance', 'Emergency Repair'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E5E7EB]">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white">Edit Job</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{job.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-4 sm:space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                <Wrench className="w-4 h-4 inline mr-2" />
                Job Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
                placeholder="Enter job title"
                required
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Job Type
              </label>
              <div className="relative">
                <select
                  value={formData.jobType}
                  onChange={(e) => handleInputChange('jobType', e.target.value)}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent appearance-none bg-white dark:bg-gray-800"
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6C6C6C] pointer-events-none" />
              </div>
            </div>

            {/* Client Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Client Name
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Address
                </label>
                <input
                  type="text"
                  value={formData.clientAddress}
                  onChange={(e) => handleInputChange('clientAddress', e.target.value)}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
                  placeholder="Enter client address"
                  required
                />
              </div>
            </div>

            {/* Technician */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Assigned Technician
              </label>
              <input
                type="text"
                value={formData.technicianName}
                onChange={(e) => handleInputChange('technicianName', e.target.value)}
                className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
                placeholder="Enter technician name"
                required
              />
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  <Flag className="w-4 h-4 inline mr-2" />
                  Priority
                </label>
                <div className="relative">
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent appearance-none bg-white dark:bg-gray-800"
                  >
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6C6C6C] pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent appearance-none bg-white dark:bg-gray-800"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6C6C6C] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Cost and Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  <DollarSign className="w-4 h-4 inline mr-2" />
                  Cost
                </label>
                <input
                  type="text"
                  value={formData.cost}
                  onChange={(e) => handleInputChange('cost', e.target.value)}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
                  placeholder="$0.00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Schedule
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
                  placeholder="Today, 2:00 PM"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Duration
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
                  placeholder="2 hours"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent resize-none"
                rows={4}
                placeholder="Enter job description and additional details..."
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-6 border-t border-[#E5E7EB] bg-[#F8F9FA]">
          <button
            type="button"
            onClick={onClose}
            className="px-3 sm:px-4 py-2 border border-[#E5E7EB] text-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
          >
            Cancel
          </button>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              type="button"
              className="px-3 sm:px-4 py-2 border border-[#E5E7EB] text-black dark:text-white rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              Save as Draft
            </button>
            <button
              onClick={handleSubmit}
              className="px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors text-sm sm:text-base"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
