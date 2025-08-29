import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { JobDetailsModal } from '../components/JobDetailsModal';

// Mock data for scheduled jobs
const mockScheduledJobs = [
  {
    id: 1,
    jobId: '#J-2025-0157',
    title: 'Routine Inspection',
    priority: 'Medium',
    status: 'To-do'
  },
  {
    id: 2,
    jobId: '#J-2025-0157',
    title: 'Routine Inspection',
    priority: 'High',
    status: 'To-do'
  },
  {
    id: 3,
    jobId: '#J-2025-0157',
    title: 'Routine Inspection',
    priority: 'Low',
    status: 'To-do'
  }
];

const getStatusBadge = (priority: string) => {
  switch (priority) {
    case 'High':
      return (
        <div className="flex items-center gap-2 px-2 py-1 bg-[#FFDFDF] rounded text-xs">
          <Flag className="w-3 h-3 text-[#DC2626]" />
          <span className="text-[#DC2626] font-medium">High</span>
        </div>
      );
    case 'Medium':
      return (
        <div className="flex items-center gap-2 px-2 py-1 bg-[#FFEFD7] rounded text-xs">
          <Flag className="w-3 h-3 text-[#F39C12]" />
          <span className="text-[#F39C12] font-medium">Medium</span>
        </div>
      );
    case 'Low':
      return (
        <div className="flex items-center gap-2 px-2 py-1 bg-[#E8F5FF] rounded text-xs">
          <Flag className="w-3 h-3 text-[#0D99FF]" />
          <span className="text-[#0D99FF] font-medium">Low</span>
        </div>
      );
    default:
      return null;
  }
};

const getJobStatusBadge = (status: string) => {
  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-[rgba(202,202,202,0.8)] rounded text-xs">
      <div className="w-2 h-2 bg-[#6C6C6C] rounded-full border border-[#6C6C6C]"></div>
      <span className="text-gray-600 dark:text-gray-400 font-medium">{status}</span>
    </div>
  );
};

const CalendarMonth: React.FC<{ month: string; year: number }> = ({ month, year }) => {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [current, setCurrent] = React.useState(
    new Date(year, new Date(`${month} 1, ${year}`).getMonth(), 1)
  );
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const days = getDaysInMonth(current);

  const handlePreviousMonth = () => {
    setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1));
  };

  // Placeholder for future day-click behavior
  const handleViewDetails = () => {
    console.log('View details clicked');
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-3 sm:p-4 lg:p-6">
      <div className="space-y-3 sm:space-y-4 lg:space-y-6">
        {/* Calendar Header */}
        <div className="flex justify-center items-center gap-2 sm:gap-4">
          <button 
            onClick={handlePreviousMonth}
            className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-600 dark:text-gray-400 min-w-0 text-center">
            <span className="hidden sm:inline">{current.toLocaleString('default', { month: 'long' })} {current.getFullYear()}</span>
            <span className="sm:hidden">{current.toLocaleString('default', { month: 'short' })} {current.getFullYear()}</span>
          </h2>
          <button 
            onClick={handleNextMonth}
            className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center py-1 sm:py-2 text-xs font-medium text-black dark:text-white uppercase">
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.slice(0, 1)}</span>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {days.map((day, index) => (
            <div
              key={index}
              className={`h-8 sm:h-10 lg:h-12 flex items-center justify-center text-xs sm:text-sm font-medium border border-[#EBEBEB] rounded cursor-pointer transition-colors ${
                day === null 
                  ? 'bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-default' 
                  : day === new Date().getDate() && current.getMonth() === new Date().getMonth() && current.getFullYear() === new Date().getFullYear()
                  ? 'bg-[#10BF0A] text-white'
                  : 'bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:bg-gray-800'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const TechnicianSchedule: React.FC = () => {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const handleViewDetails = (job: typeof mockScheduledJobs[number]) => {
    const detailedJob: any = {
      id: job.id,
      title: job.title,
      jobId: job.jobId,
      priority: job.priority,
      status: job.status,
      location: 'On-site',
      address: '1234 Business Ave, Suite 100',
      schedule: 'Today, 2:00 PM',
      duration: '2 hours',
      jobType: 'Maintenance',
      description: 'Standard maintenance visit.',
      assignedTechnicians: [
        { id: 1, name: 'John Doe', avatar: '', role: 'Technician', status: 'active' }
      ]
    };
    setSelectedJob(detailedJob);
    setIsJobModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-[28px] font-medium text-black dark:text-white">Schedule</h1>
          <p className="text-sm sm:text-lg text-black dark:text-white">View your assigned jobs and shifts.</p>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Multiple Calendar Months */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            <CalendarMonth month="August" year={2024} />
            <CalendarMonth month="September" year={2024} />
            <CalendarMonth month="October" year={2024} />
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-[23px] font-medium text-black dark:text-white">Today's Schedule</h2>
          
          <div className="space-y-3 sm:space-y-4">
            {mockScheduledJobs.map((job) => (
              <div key={job.id} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                <div className="space-y-3 sm:space-y-4">
                  {/* Job Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">{job.jobId}</p>
                      <h3 className="text-sm sm:text-base lg:text-lg font-medium text-black dark:text-white truncate">{job.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getStatusBadge(job.priority)}
                      {getJobStatusBadge(job.status)}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="flex justify-start">
                    <button 
                      onClick={() => handleViewDetails(job)}
                      className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm font-medium hover:bg-[#0EA509] transition-colors touch-friendly"
                    >
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isJobModalOpen && selectedJob && (
        <JobDetailsModal
          isOpen={isJobModalOpen}
          onClose={() => setIsJobModalOpen(false)}
          job={selectedJob}
        />
      )}
    </div>
  );
};
