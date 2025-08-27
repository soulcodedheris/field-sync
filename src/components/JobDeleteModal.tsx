import React from 'react';
import { X, AlertTriangle, Trash } from 'lucide-react';

interface JobDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  job: {
    id: string;
    title: string;
    client: {
      name: string;
    };
  } | null;
}

export const JobDeleteModal: React.FC<JobDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  job
}) => {
  if (!isOpen || !job) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-black dark:text-white">Delete Job</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="mb-4">
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 dark:text-gray-300 mb-2">
              Are you sure you want to delete this job? This action cannot be undone.
            </p>
            
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3 sm:p-4 mt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Job ID:</span>
                  <span className="text-xs sm:text-sm font-medium text-black dark:text-white break-words">{job.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Title:</span>
                  <span className="text-xs sm:text-sm font-medium text-black dark:text-white break-words">{job.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Client:</span>
                  <span className="text-xs sm:text-sm font-medium text-black dark:text-white break-words">{job.client.name}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs sm:text-sm text-red-700">
                <p className="font-medium">Warning:</p>
                <p>Deleting this job will also remove all associated:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Job notes and comments</li>
                  <li>Uploaded photos and documents</li>
                  <li>Checklist progress</li>
                  <li>Time tracking records</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 p-4 sm:p-6 border-t border-[#E5E7EB] bg-[#F8F9FA]">
          <button
            onClick={onClose}
            className="px-3 sm:px-4 py-2 border border-[#E5E7EB] text-gray-600 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
          >
            <Trash className="w-4 h-4" />
            Delete Job
          </button>
        </div>
      </div>
    </div>
  );
};
