import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  Search,
  Filter,
  Download,
  Calendar,
  ChevronDown,
  ListChecks,
  Rocket,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';


import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';

export const AdminAuditLog: React.FC = () => {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('mm/dd/yyyy');
  const [selectedTechnician, setSelectedTechnician] = useState('All Technicians');
  const [selectedActivity, setSelectedActivity] = useState('All Activity');
  const [currentPage, setCurrentPage] = useState(1);

  const auditLogData = [
    {
      id: 1,
      date: 'Jan 15, 2024',
      time: '2:34 PM',
      jobId: '#JB-2024-0856',
      technician: {
        name: 'John Doe',
        role: 'Admin',
        avatar: userAvatar1
      },
      activity: 'Status Updated',
      details: "Updated from 'In Progress' to 'Completed'"
    },
    {
      id: 2,
      date: 'Jan 15, 2024',
      time: '2:34 PM',
      jobId: '#JB-2024-0856',
      technician: {
        name: 'John Doe',
        role: 'Senior Technician',
        avatar: userAvatar2
      },
      activity: 'Note Added',
      details: 'Found issue with main circuit breaker, requesting...'
    },
    {
      id: 3,
      date: 'Jan 15, 2024',
      time: '2:34 PM',
      jobId: '#JB-2024-0856',
      technician: {
        name: 'John Doe',
        role: 'HVAC Specialist',
        avatar: userAvatar3
      },
      activity: 'Photo Added',
      details: 'before_repair_panel_room.jpg'
    },
    {
      id: 4,
      date: 'Jan 15, 2024',
      time: '2:34 PM',
      jobId: '#JB-2024-0856',
      technician: {
        name: 'John Doe',
        role: 'HVAC Specialist',
        avatar: userAvatar1
      },
      activity: 'Status Updated',
      details: "Updated from 'To Do' to 'In Progress'"
    },
    {
      id: 5,
      date: 'Jan 15, 2024',
      time: '2:34 PM',
      jobId: '#JB-2024-0856',
      technician: {
        name: 'John Doe',
        role: 'HVAC Specialist',
        avatar: userAvatar2
      },
      activity: 'Status Updated',
      details: "Updated from 'In Progress' to 'Completed'"
    }
  ];

  const stats = [
    {
      title: 'Log Events',
      value: '5,421',
      change: '+100',
      changeType: 'positive',
      subtitle: 'compared to last week',
      icon: ListChecks,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Active Technicians',
      value: '120',
      change: '+10%',
      changeType: 'positive',
      subtitle: 'compared to last week',
      icon: Rocket,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Recent Activity',
      value: '2 mins ago',
      subtitle: 'Last logged event',
      icon: Clock,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Most Active User',
      value: 'Mike Chen',
      subtitle: '80 actions this week',
      icon: Star,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    }
  ];

  return (
    <div className="sm:p-6 space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-black dark:text-white">Audit Logs</h1>
            <p className="text-sm sm:text-base lg:text-lg text-black dark:text-white mt-2 max-w-2xl">
              Comprehensive audit log of all technician activities across all jobs
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-base lg:text-lg text-black dark:text-white truncate">{stat.title}</h3>
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white mb-2 sm:mb-3 lg:mb-4">{stat.value}</div>
                {stat.change && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4">
                      <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                        <path d="M3.33 3L9.33 9L15.33 3" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>n
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-[#2ECC71]">{stat.change}</span>
                  </div>
                )}
                <p className="text-xs sm:text-sm text-[rgba(0,0,0,0.35)]">{stat.subtitle}</p>
              </div>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center ${stat.iconBg} flex-shrink-0`}>
                <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[rgba(108,108,108,0.5)]" />
            <input
              type="text"
              placeholder="Search audit logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 sm:py-3 border border-[rgba(108,108,108,0.5)] rounded-lg text-sm sm:text-base text-[rgba(108,108,108,0.5)]"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {/* Date Filter */}
              <button className="flex items-center gap-1 px-3 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-xs sm:text-sm text-black dark:text-white whitespace-nowrap">
                <span className="truncate max-w-20 sm:max-w-none">{selectedDate}</span>
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              </button>

              {/* Technician Filter */}
              <button className="flex items-center gap-1 px-3 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-xs sm:text-sm text-black dark:text-white whitespace-nowrap">
                <span className="truncate max-w-24 sm:max-w-none">{selectedTechnician}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              </button>

              {/* Activity Filter */}
              <button className="flex items-center gap-1 px-3 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-xs sm:text-sm text-black dark:text-white whitespace-nowrap">
                <span className="truncate max-w-20 sm:max-w-none">{selectedActivity}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {/* Filter Button */}
              <button className="flex items-center gap-1 px-3 py-2 bg-[#10BF0A] text-white rounded-lg text-xs sm:text-sm font-medium">
                <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Filter</span>
              </button>

              {/* Export Button */}
              <button className="flex items-center gap-1 px-3 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-xs sm:text-sm text-black dark:text-white">
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl overflow-hidden">
        {/* Mobile Card View */}
        <div className="block lg:hidden">
          {auditLogData.map((log) => (
            <div key={log.id} className="border-b border-[#E1E1E1] p-4">
              <div className="space-y-3">
                {/* Date & Time */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-medium text-black dark:text-white">{log.date}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">{log.time}</span>
                  </div>
                  <div className="inline-block bg-[rgba(0,0,0,0.05)] border border-[#84ABF8] rounded px-2 py-1">
                    <span className="text-xs text-[#10BF0A]">{log.jobId}</span>
                  </div>
                </div>

                {/* Technician */}
                <div className="flex items-center gap-3">
                  <img 
                    src={log.technician.avatar} 
                    alt={log.technician.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-black dark:text-white">{log.technician.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{log.technician.role}</div>
                  </div>
                </div>

                {/* Activity */}
                <div>
                  <span className="text-sm font-medium text-[#10BF0A]">{log.activity}</span>
                </div>

                {/* Details */}
                <div>
                  <span className="text-sm text-black dark:text-white">{log.details}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F9FAFC] border-b border-[#E1E1E1]">
                <th className="text-left p-4 font-medium text-black dark:text-white">Date & Time</th>
                <th className="text-left p-4 font-medium text-black dark:text-white">Job ID</th>
                <th className="text-left p-4 font-medium text-black dark:text-white">Technician</th>
                <th className="text-left p-4 font-medium text-black dark:text-white">Activity</th>
                <th className="text-left p-4 font-medium text-black dark:text-white">Affected Resource</th>
              </tr>
            </thead>
            <tbody>
              {auditLogData.map((log) => (
                <tr key={log.id} className="border-b border-[#E1E1E1] hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-black dark:text-white">{log.date}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{log.time}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="inline-block bg-[rgba(0,0,0,0.05)] border border-[#84ABF8] rounded px-2 py-1">
                      <span className="text-sm text-[#10BF0A]">{log.jobId}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={log.technician.avatar} 
                        alt={log.technician.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-black dark:text-white">{log.technician.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{log.technician.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-[#10BF0A]">{log.activity}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-black dark:text-white">{log.details}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-[#EBEBEB] gap-4">
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
            Showing 1 to 3 of 847 results
          </span>
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="px-2 sm:px-3 py-1 sm:py-2 border border-[#D1D5DB] rounded text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              Previous
            </button>
            <button className="px-2 sm:px-3 py-1 sm:py-2 bg-[#10BF0A] text-white rounded text-xs sm:text-sm">1</button>
            <button className="px-2 sm:px-3 py-1 sm:py-2 border border-[#D1D5DB] rounded text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">2</button>
            <button className="px-2 sm:px-3 py-1 sm:py-2 border border-[#D1D5DB] rounded text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">3</button>
            <button className="px-2 sm:px-3 py-1 sm:py-2 border border-[#D1D5DB] rounded text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
