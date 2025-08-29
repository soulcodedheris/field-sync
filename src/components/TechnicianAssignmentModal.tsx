import React, { useState } from 'react';
import { X, User, Save } from 'lucide-react';

export interface TechnicianAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (jobId: string, technicianId: string) => void;
  jobId: string;
  technicians: Array<{
    id: string;
    name: string;
    status: string;
    currentJobs: number;
  }>;
}

export const TechnicianAssignmentModal: React.FC<TechnicianAssignmentModalProps> = ({
  isOpen,
  onClose,
  onAssign,
  jobId,
  technicians
}) => {
  const [selectedTechnician, setSelectedTechnician] = useState('');

  if (!isOpen) return null;

  const handleAssign = () => {
    if (selectedTechnician) {
      onAssign(jobId, selectedTechnician);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h3 className="text-lg font-semibold text-black dark:text-white">Assign Technician</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Select Technician
            </label>
            <select
              value={selectedTechnician}
              onChange={(e) => setSelectedTechnician(e.target.value)}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
            >
              <option value="">Choose a technician...</option>
              {technicians.map(tech => (
                <option key={tech.id} value={tech.id}>
                  {tech.name} - {tech.status} ({tech.currentJobs} jobs)
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-[#E5E7EB] text-gray-700 dark:text-gray-300 rounded-lg">
              Cancel
            </button>
            <button 
              onClick={handleAssign}
              disabled={!selectedTechnician}
              className="flex-1 px-4 py-2 bg-[#10BF0A] text-white rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              Assign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
