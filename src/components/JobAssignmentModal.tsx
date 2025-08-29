import React, { useState } from 'react';
import { X, User, Calendar, MapPin, Clock, Save } from 'lucide-react';

export interface JobAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (jobData: any) => void;
  technicians: Array<{
    id: number;
    name: string;
    avatar: string;
    status: string;
    currentJob?: string;
  }>;
}

export const JobAssignmentModal: React.FC<JobAssignmentModalProps> = ({
  isOpen,
  onClose,
  onAssign,
  technicians
}) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    priority: 'medium',
    assignedTechnician: '',
    scheduledDate: '',
    scheduledTime: '',
    location: '',
    estimatedDuration: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAssign(formData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      jobTitle: '',
      description: '',
      priority: 'medium',
      assignedTechnician: '',
      scheduledDate: '',
      scheduledTime: '',
      location: '',
      estimatedDuration: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h3 className="text-lg font-semibold text-black dark:text-white">Assign New Job</h3>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Job Details */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-black dark:text-white">Job Information</h4>
            
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
                placeholder="Enter job title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
                rows={3}
                placeholder="Enter job description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Priority *
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Assignment Details */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-black dark:text-white">Assignment Details</h4>
            
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Assign to Technician *
              </label>
              <select
                value={formData.assignedTechnician}
                onChange={(e) => setFormData({ ...formData, assignedTechnician: e.target.value })}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
                required
              >
                <option value="">Select technician</option>
                {technicians.map((tech) => (
                  <option key={tech.id} value={tech.id}>
                    {tech.name} {tech.currentJob ? `(Currently on: ${tech.currentJob})` : '(Available)'}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Scheduled Date *
                </label>
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Scheduled Time *
                </label>
                <input
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
                placeholder="Enter job location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Estimated Duration
              </label>
              <input
                type="text"
                value={formData.estimatedDuration}
                onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
                placeholder="e.g., 2 hours, 1 day"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-[#E5E7EB] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Assign Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
