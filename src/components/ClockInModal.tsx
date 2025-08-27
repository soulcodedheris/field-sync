import React, { useState, useEffect } from 'react';
import { X, Clock, Play } from 'lucide-react';
import { JobSelectionModal } from './JobSelectionModal';

interface Job {
  id: string;
  title: string;
  jobId: string;
  client: string;
  location: string;
  schedule: string;
}

interface ClockInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClockInToHQ: () => void;
  onClockInToJob: (jobId: string) => void;
  availableJobs: Job[];
}

export const ClockInModal: React.FC<ClockInModalProps> = ({ 
  isOpen, 
  onClose, 
  onClockInToHQ, 
  onClockInToJob,
  availableJobs
}) => {
  const [currentTime, setCurrentTime] = useState('');
  const [showJobSelection, setShowJobSelection] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handleClockInToJob = () => {
    setShowJobSelection(true);
  };

  const handleJobSelection = (jobId: string) => {
    onClockInToJob(jobId);
    setShowJobSelection(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#10BF0A]/10 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#10BF0A]" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white">Clock In</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="text-center space-y-6">
            {/* Current Time */}
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl font-medium text-black dark:text-white">
                {currentTime}
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Ready to start your work day?
              </p>
            </div>

            {/* Clock In Options */}
            <div className="space-y-4">
              <button
                onClick={onClockInToHQ}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#10BF0A] text-white rounded-lg font-medium hover:bg-[#0EA509] transition-colors"
              >
                <Play className="w-5 h-5" />
                <span className="text-base sm:text-lg">Clock In to HQ</span>
              </button>

              <button
                onClick={handleClockInToJob}
                disabled={availableJobs.length === 0}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-[#10BF0A] text-[#10BF0A] rounded-lg font-medium hover:bg-[#10BF0A] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Clock className="w-5 h-5" />
                <span className="text-base sm:text-lg">
                  {availableJobs.length > 0 ? 'Clock In to Job' : 'No Jobs Available'}
                </span>
              </button>
            </div>

            {/* Available Jobs Count */}
            {availableJobs.length > 0 && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {availableJobs.length} job{availableJobs.length !== 1 ? 's' : ''} available today
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Selection Modal */}
      {showJobSelection && (
        <JobSelectionModal
          isOpen={showJobSelection}
          onClose={() => setShowJobSelection(false)}
          onSelectJob={handleJobSelection}
          jobs={availableJobs}
        />
      )}
    </div>
  );
};
