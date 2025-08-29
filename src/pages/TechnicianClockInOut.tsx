import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { ClockInModal } from '../components/ClockInModal';

// Mock data for available jobs
const availableJobs = [
  {
    id: '1',
    title: 'Quarterly Maintenance',
    jobId: '#JB-2024-0856',
    client: 'Downtown Office Complex',
    location: '1234 Business Ave, Suite 100',
    schedule: 'Today, 2:00 PM'
  },
  {
    id: '2',
    title: 'Emergency Electrical Repair',
    jobId: '#JB-2024-0856',
    client: 'Bayside Warehouse',
    location: '1234 Business Ave, Suite 100',
    schedule: 'Today, 2:00 PM'
  },
  {
    id: '3',
    title: 'Routine Inspection',
    jobId: '#JB-2024-0856',
    client: 'Downtown Office Complex',
    location: '1234 Business Ave, Suite 100',
    schedule: 'Today, 2:00 PM'
  }
];

export const TechnicianClockInOut: React.FC = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [timer, setTimer] = useState('0:00:00');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showClockInModal, setShowClockInModal] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isClockedIn && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - startTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimer(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isClockedIn, startTime]);

  const handleClockIn = () => {
    setShowClockInModal(true);
  };

  const handleClockInToHQ = () => {
    setIsClockedIn(true);
    setStartTime(new Date());
    setShowClockInModal(false);
  };

  const handleClockInToJob = (jobId: string) => {
    setIsClockedIn(true);
    setStartTime(new Date());
    setShowClockInModal(false);
    console.log(`Clocked in to job: ${jobId}`);
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    setStartTime(null);
    setTimer('0:00:00');
  };

  return (
    <div className=" sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6 flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-[28px] font-medium text-black dark:text-white">Clock In/Out</h1>
          <p className="text-sm sm:text-lg text-black dark:text-white">Manage your daily work hours and breaks.</p>
        </div>
      </div>

      {/* Clock In/Out Interface */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          {/* Timer Display */}
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className="text-2xl sm:text-[44px] font-medium text-black dark:text-white">
              {isClockedIn ? timer : '0:00:00'}
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="text-lg sm:text-[23px] font-medium text-black dark:text-white">
                {isClockedIn ? 'Currently Clocked In' : 'Currently Clocked Out'}
              </div>
              <div className="text-sm sm:text-lg text-gray-600 dark:text-gray-400">
                {isClockedIn ? 'Keep up the great work!' : "Start your work day when you're ready"}
              </div>
            </div>
          </div>

          {/* Clock In/Out Button */}
          <button
            onClick={isClockedIn ? handleClockOut : handleClockIn}
            className={`flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg ${
              isClockedIn 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-[#10BF0A] text-white hover:bg-[#0EA50A]'
            }`}
          >
            <Play className="w-5 h-5" />
            <span>{isClockedIn ? 'Clock Out' : 'Clock In'}</span>
          </button>
        </div>
      </div>

      {/* Today's Summary */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-[23px] font-medium text-black dark:text-white">Today's Summary</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
            {/* Total Hours */}
            <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-3 sm:p-4 flex flex-col items-center gap-2">
              <div className="text-lg sm:text-[28px] font-bold text-[#10BF0A]">7.45</div>
              <div className="text-sm sm:text-lg text-[#10BF0A] text-center">Total Hours</div>
            </div>

            {/* First Clock In */}
            <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-3 sm:p-4 flex flex-col items-center gap-2">
              <div className="text-lg sm:text-[28px] font-bold text-[#10BF0A]">8:00 AM</div>
              <div className="text-sm sm:text-lg text-[#10BF0A] text-center">First Clock In</div>
            </div>

            {/* Last Clock Out */}
            <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-3 sm:p-4 flex flex-col items-center gap-2">
              <div className="text-lg sm:text-[28px] font-bold text-[#10BF0A]">3:45 PM</div>
              <div className="text-sm sm:text-lg text-[#10BF0A] text-center">Last Clock Out</div>
            </div>

            {/* Jobs Completed */}
            <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-3 sm:p-4 flex flex-col items-center gap-2">
              <div className="text-lg sm:text-[28px] font-bold text-[#10BF0A]">3</div>
              <div className="text-sm sm:text-lg text-[#10BF0A] text-center">Jobs Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Clock In Modal */}
      <ClockInModal
        isOpen={showClockInModal}
        onClose={() => setShowClockInModal(false)}
        onClockInToHQ={handleClockInToHQ}
        onClockInToJob={handleClockInToJob}
        availableJobs={availableJobs}
      />
    </div>
  );
};
