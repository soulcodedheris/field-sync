import React from 'react';
import { X } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  jobId: string;
  client: string;
  location: string;
  schedule: string;
}

interface JobSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectJob: (jobId: string) => void;
  jobs: Job[];
}

export const JobSelectionModal: React.FC<JobSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectJob,
  jobs 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white">Select Job to Clock In</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="space-y-4">
                    {/* Job Title and ID */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h4 className="text-base sm:text-lg font-medium text-black dark:text-white">{job.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.jobId}</p>
                      </div>
                      <button
                        onClick={() => onSelectJob(job.id)}
                        className="w-full sm:w-auto px-4 py-2 bg-[#10BF0A] text-white rounded-lg font-medium hover:bg-[#0EA509] transition-colors"
                      >
                        Start Job
                      </button>
                    </div>

                    {/* Client and Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300 mb-1">Client</p>
                        <p className="text-sm text-black dark:text-white">{job.client}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300 mb-1">Location</p>
                        <p className="text-sm text-black dark:text-white">{job.location}</p>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300 mb-1">Schedule</p>
                      <p className="text-sm text-black dark:text-white">{job.schedule}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Jobs Available</h3>
              <p className="text-gray-600 dark:text-gray-400">There are no jobs scheduled for today.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
