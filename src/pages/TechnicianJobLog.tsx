import React, { useState } from 'react';
import { Search, ChevronDown, Filter } from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';
import attachment1 from '../assets/attachment-1.png';
import attachment2 from '../assets/attachment-2.png';
import attachment3 from '../assets/attachment-3.png';

// Mock data for job log entries
const mockJobLogEntries = [
  {
    id: 1,
    user: {
      name: 'Tunde Johnson',
      avatar: userAvatar1,
      jobId: 'Job #10243'
    },
    timestamp: '30 mins ago',
    action: "Changed the job's status from 'To Do' to 'In Progress'.",
    type: 'user'
  },
  {
    id: 2,
    user: {
      name: 'Sarah Chen',
      avatar: userAvatar2,
      jobId: 'Job #10243'
    },
    timestamp: '1hr ago',
    action: 'Added a note: "Found a faulty compressor during inspection. Ordering replacement part #AC-4567."',
    type: 'user'
  },
  {
    id: 3,
    user: {
      name: 'John Doe',
      avatar: userAvatar3,
      jobId: 'Job #10243'
    },
    timestamp: '2 hrs ago',
    action: 'Calibrated all measuring instruments and sensors',
    type: 'user'
  },
  {
    id: 4,
    user: {
      name: 'David Smith',
      avatar: userAvatar1,
      jobId: 'Job #10243'
    },
    timestamp: '12 hrs ago',
    action: 'Added a note: "Found a faulty compressor during inspection. Ordering replacement part #AC-4567."',
    type: 'user',
    attachments: [attachment1, attachment2, attachment3]
  },
  {
    id: 5,
    user: {
      name: 'System Log',
      avatar: null,
      jobId: null
    },
    timestamp: '23 hrs ago',
    action: 'Job #10243 assigned to team members: John Doe, Sarah Mitchell, Mike Johnson',
    type: 'system'
  }
];

export const TechnicianJobLog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-[28px] font-medium text-black dark:text-white">Job Log</h1>
          <p className="text-sm sm:text-lg text-black dark:text-white">
            A record of all your activities, comments, and contributions to past and present jobs.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="bg-white dark:bg-gray-800 border border-[rgba(108,108,108,0.5)] dark:border-gray-600 rounded-[10px] h-10 px-3 flex items-center gap-2">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[rgba(108,108,108,0.5)]" />
              <input
                type="text"
                placeholder="search...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-base sm:text-lg text-[rgba(108,108,108,0.5)] placeholder-[rgba(108,108,108,0.5)] flex-1"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white">
              <span>All Jobs</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Job Log Timeline */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="space-y-6">
          {/* Today Section */}
          <div className="space-y-4">
            <h2 className="text-base sm:text-lg font-semibold text-black dark:text-white">Today</h2>
            <div className="space-y-3 sm:space-y-2">
              {mockJobLogEntries.slice(0, 4).map((entry) => (
                <div key={entry.id} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white flex-shrink-0 overflow-hidden">
                      {entry.type === 'system' ? (
                        <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">S</span>
                        </div>
                      ) : entry.user.avatar ? (
                        <img src={entry.user.avatar} alt={entry.user.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-300 rounded-full"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm sm:text-base font-medium text-black dark:text-white">{entry.user.name}</span>
                          {entry.user.jobId && (
                            <span className="text-sm sm:text-base font-semibold text-[#10BF0A]">{entry.user.jobId}</span>
                          )}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{entry.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{entry.action}</p>
                      
                      {/* Attachments */}
                      {entry.attachments && (
                        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-6">
                          {entry.attachments.map((attachment, index) => (
                            <img 
                              key={index} 
                              src={attachment} 
                              alt={`Attachment ${index + 1}`}
                              className="w-full sm:w-80 h-48 sm:h-52 object-cover rounded-lg border border-[#E5E7EB]" 
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Yesterday Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-black dark:text-white">Yesterday</h2>
            <div className="space-y-2">
              {mockJobLogEntries.slice(0, 2).map((entry, index) => (
                <div key={`yesterday-${index}`} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full border-2 border-white flex-shrink-0 overflow-hidden">
                      {entry.type === 'system' ? (
                        <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-medium">S</span>
                        </div>
                      ) : entry.user.avatar ? (
                        <img src={entry.user.avatar} alt={entry.user.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-300 rounded-full"></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-medium text-black dark:text-white">{entry.user.name}</span>
                          {entry.user.jobId && (
                            <span className="text-base font-semibold text-[#10BF0A]">{entry.user.jobId}</span>
                          )}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{entry.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{entry.action}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
