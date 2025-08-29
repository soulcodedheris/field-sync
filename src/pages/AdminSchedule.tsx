import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  Bell,
  Bot
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';
import { JobAssignmentModal } from '../components/JobAssignmentModal';
import { AlertConfigurationModal } from '../components/AlertConfigurationModal';
import { AISuggestionsModal } from '../components/AISuggestionsModal';

export const AdminSchedule: React.FC = () => {
  const { user } = useAuthStore();
  const [selectedView, setSelectedView] = useState('weekly');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [selectedTechDetails, setSelectedTechDetails] = useState<any>(null);
  const [isJobAssignmentModalOpen, setIsJobAssignmentModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isAISuggestionsModalOpen, setIsAISuggestionsModalOpen] = useState(false);

  const technicians = [
    {
      id: '1',
      name: 'John Mitchell',
      role: 'Senior Technician',
      avatar: userAvatar1,
      status: 'Available',
      statusColor: '#2ECC71',
      statusBg: '#DCFBE9',
      jobsToday: 3
    },
    {
      id: '2',
      name: 'Mike Chen',
      role: 'Senior Technician',
      avatar: userAvatar2,
      status: 'Busy',
      statusColor: '#F39C12',
      statusBg: '#FFEFD7',
      jobsToday: 3
    },
    {
      id: '3',
      name: 'John Mitchell',
      role: 'Senior Technician',
      avatar: userAvatar3,
      status: 'On Leave',
      statusColor: '#DC2626',
      statusBg: '#FFDFDF',
      jobsToday: 3
    },
    {
      id: '4',
      name: 'Mike Chen',
      role: 'Senior Technician',
      avatar: userAvatar1,
      status: 'Offline',
      statusColor: '#6C6C6C',
      statusBg: 'rgba(202, 202, 202, 0.8)',
      jobsToday: 3
    }
  ];

  const unassignedJobs = [
    {
      id: '1',
      title: 'HVAC Repair #7890',
      priority: 'High',
      priorityColor: '#DC2626',
      priorityBg: '#FFDFDF',
      location: 'Downtown Office Building',
      dueTime: 'Due: Today 3:00 PM'
    },
    {
      id: '2',
      title: 'HVAC Repair #7890',
      priority: 'Medium',
      priorityColor: '#F39C12',
      priorityBg: '#FFEFD7',
      location: 'Downtown Office Building',
      dueTime: 'Due: Today 3:00 PM'
    },
    {
      id: '3',
      title: 'HVAC Repair #7890',
      priority: 'Low',
      priorityColor: '#0D99FF',
      priorityBg: '#E8F5FF',
      location: 'Downtown Office Building',
      dueTime: 'Due: Today 3:00 PM'
    }
  ];

  const handleTechnicianClick = (tech: any) => {
    setSelectedTechDetails(tech);
  };

  const handleJobClick = (job: any) => {
    setSelectedJob(job);
  };

  const handlePriorityFilter = (priority: string) => {
    console.log('Filtering by priority:', priority);
  };

  const handleNewJobAssignment = () => {
    setIsJobAssignmentModalOpen(true);
  };

  const handleAssignJob = (jobData: any) => {
    console.log('Assign job:', jobData);
  };

  const handleSendAlerts = () => {
    setIsAlertModalOpen(true);
  };

  const handleAISuggestions = () => {
    setIsAISuggestionsModalOpen(true);
  };

  const handleSendAlert = (alertData: any) => {
    console.log('Send alert:', alertData);
  };

  const handleApplyAISuggestion = (suggestion: any) => {
    console.log('Apply AI suggestion:', suggestion);
  };

  const calendarData = [
    {
      technician: 'Mike Chen',
      role: 'Senior Tech',
      sunday: [
        { title: 'Network Troubleshoot', status: 'in-progress', color: '#F39C12' },
        { title: 'Server Maintenance', status: 'assigned', color: '#0D99FF' },
        { title: 'Equipment Installation', status: 'completed', color: '#2ECC71' }
      ],
      monday: [],
      tuesday: [],
      wednesday: [
        { title: 'CONFLICT: Two Jobs', status: 'conflict', color: '#DC2626' },
        { title: 'Equipment Installation', status: 'completed', color: '#2ECC71' }
      ],
      thursday: [],
      friday: [],
      saturday: [
        { title: 'Network Troubleshoot', status: 'in-progress', color: '#F39C12' },
        { title: 'Server Maintenance', status: 'assigned', color: '#0D99FF' },
        { title: 'Equipment Installation', status: 'completed', color: '#2ECC71' }
      ]
    }
  ];

  return (
    <div className="sm:p-6 bg-[#F5F5F5] dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4 lg:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black dark:text-white">Schedule</h1>
            <p className="text-sm sm:text-base lg:text-lg text-black dark:text-white mt-1 sm:mt-2">
              View and manage all job assignments in a single calendar view.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-col xl:flex-row gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
        {/* Left Panel - Technicians */}
        <div className="w-full xl:w-64 bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg">
          {/* Technicians Header */}
          <div className="border-b border-[#EBEBEB] p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-sm sm:text-base lg:text-lg font-medium text-black dark:text-white">Technicians</h3>
              <button className="w-6 h-6 sm:w-8 sm:h-8 bg-[#10BF0A] rounded flex items-center justify-center hover:bg-[#0EA50A] transition-colors">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search technicians..."
                className="w-full pl-8 sm:pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
              />
            </div>
          </div>

          {/* Technicians List */}
          <div className="p-2 max-h-48 sm:max-h-64 lg:max-h-96 overflow-y-auto">
            {technicians.map((tech) => (
              <div 
                key={tech.id} 
                onClick={() => handleTechnicianClick(tech)}
                className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-2 sm:p-3 mb-2 hover:shadow-sm transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm font-medium text-black dark:text-white truncate flex-1 mr-2">{tech.name}</span>
                  <div 
                    className="flex items-center gap-1 px-1 sm:px-2 py-1 rounded text-xs flex-shrink-0"
                    style={{ backgroundColor: tech.statusBg, color: tech.statusColor }}
                  >
                    <div 
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                      style={{ backgroundColor: tech.statusColor }}
                    ></div>
                    <span className="hidden sm:inline">{tech.status}</span>
                    <span className="sm:hidden">{tech.status.slice(0, 1)}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <div className="truncate">{tech.role}</div>
                  <div>{tech.jobsToday} jobs today</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Calendar */}
        <div className="flex-1 bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 sm:p-4 lg:p-6">
          {/* Calendar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <button className="w-6 h-6 sm:w-8 sm:h-8 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <span className="text-xs sm:text-sm lg:text-lg font-medium text-black dark:text-white min-w-0">
                  <span className="hidden sm:inline">Today, Jul 25, 2025</span>
                  <span className="sm:hidden">Jul 25, 2025</span>
                </span>
                <button className="w-6 h-6 sm:w-8 sm:h-8 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-1">
              <button 
                className={`px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm transition-colors ${selectedView === 'daily' ? 'bg-white dark:bg-gray-700 text-[#10BF0A] shadow-sm' : 'text-gray-600 hover:text-gray-800 dark:hover:text-gray-200'}`}
                onClick={() => setSelectedView('daily')}
              >
                <span className="hidden sm:inline">Daily</span>
                <span className="sm:hidden">D</span>
              </button>
              <button 
                className={`px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm transition-colors ${selectedView === 'weekly' ? 'bg-white dark:bg-gray-700 text-[#10BF0A] shadow-sm' : 'text-gray-600 hover:text-gray-800 dark:hover:text-gray-200'}`}
                onClick={() => setSelectedView('weekly')}
              >
                <span className="hidden sm:inline">Weekly</span>
                <span className="sm:hidden">W</span>
              </button>
              <button 
                className={`px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm transition-colors ${selectedView === 'monthly' ? 'bg-white dark:bg-gray-700 text-[#10BF0A] shadow-sm' : 'text-gray-600 hover:text-gray-800 dark:hover:text-gray-200'}`}
                onClick={() => setSelectedView('monthly')}
              >
                <span className="hidden sm:inline">Monthly</span>
                <span className="sm:hidden">M</span>
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-6 mb-3 sm:mb-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#0D99FF] rounded-full"></div>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Assigned</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#F39C12] rounded-full"></div>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">In Progress</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#2ECC71] rounded-full"></div>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Completed</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#DC2626] rounded-full"></div>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Conflict</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg overflow-x-auto">
            {/* Header Row */}
            <div className="flex border-b border-[#EBEBEB] min-w-[600px] sm:min-w-[800px]">
              <div className="w-12 sm:w-16 lg:w-20 xl:w-24 p-1 sm:p-2 lg:p-3 border-r border-[#EBEBEB] dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  <span className="hidden sm:inline">Technician</span>
                  <span className="sm:hidden">Tech</span>
                </span>
              </div>
              <div className="flex-1 grid grid-cols-7">
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                  <div key={day} className="p-1 sm:p-2 lg:p-3 border-r border-[#EBEBEB] dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-center">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      <span className="hidden sm:inline">{day}</span>
                      <span className="sm:hidden">{day.slice(0, 3)}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Rows */}
            {calendarData.map((tech, index) => (
              <div key={index} className="flex border-b border-[#EBEBEB] min-w-[600px] sm:min-w-[800px]">
                <div className="w-12 sm:w-16 lg:w-20 xl:w-24 p-1 sm:p-2 lg:p-3 border-r border-[#EBEBEB] dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
                  <div className="text-xs sm:text-sm font-medium text-black dark:text-white truncate">{tech.technician}</div>
                  <div className="text-xs text-gray-600 truncate">{tech.role}</div>
                </div>
                <div className="flex-1 grid grid-cols-7">
                  {['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((day) => (
                    <div key={day} className="p-1 sm:p-2 lg:p-3 border-r border-[#EBEBEB] dark:border-gray-700 bg-white dark:bg-gray-800 min-h-[32px] sm:min-h-[40px] lg:min-h-[50px] xl:min-h-[57px]">
                      {Array.isArray(tech[day as keyof typeof tech]) && 
                        (tech[day as keyof typeof tech] as any[])?.map((job: any, jobIndex: number) => (
                          <div
                            key={jobIndex}
                            onClick={() => handlePriorityFilter(job.priority)}
                className="px-1 py-0.5 sm:py-1 rounded text-xs text-white mb-0.5 sm:mb-1 truncate cursor-pointer hover:opacity-80 transition-opacity"
                            style={{ backgroundColor: job.color }}
                            title={job.title}
                          >
                            {job.title}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Unassigned Jobs */}
        <div className="w-full xl:w-72 bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg">
          {/* Unassigned Jobs Header */}
          <div className="border-b border-[#EBEBEB] p-3 sm:p-4">
            <h3 className="text-sm sm:text-base lg:text-lg font-medium text-black dark:text-white">Unassigned Jobs</h3>
          </div>

          {/* Unassigned Jobs List */}
          <div className="p-2 sm:p-4 space-y-2 max-h-48 sm:max-h-64 lg:max-h-96 overflow-y-auto">
            {unassignedJobs.map((job) => (
              <div 
                key={job.id} 
                onClick={() => handleJobClick(job)}
                className="bg-gray-50 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-2 sm:p-3 hover:shadow-sm transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm font-medium text-black dark:text-white truncate flex-1 mr-2">{job.title}</span>
                  <div 
                    className="flex items-center gap-1 px-1 sm:px-2 py-1 rounded text-xs flex-shrink-0"
                    style={{ backgroundColor: job.priorityBg, color: job.priorityColor }}
                  >
                    <Flag className="w-2 h-2 sm:w-3 sm:h-3" />
                    <span className="hidden sm:inline">{job.priority}</span>
                    <span className="sm:hidden">{job.priority.slice(0, 1)}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <div className="truncate">{job.location}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
                    <span className="truncate">{job.dueTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-3 sm:p-4 border-t border-[#EBEBEB]">
            <h4 className="text-sm sm:text-base lg:text-lg font-medium text-black dark:text-white mb-3 sm:mb-4">Quick Actions</h4>
            <div className="space-y-2">
              <button 
                onClick={handleNewJobAssignment}
                className="w-full flex items-center justify-center gap-1 px-2 sm:px-3 lg:px-4 py-2 border border-[#EBEBEB] rounded text-xs sm:text-sm text-[#10BF0A] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">New Job Assignment</span>
                <span className="sm:hidden">New Job</span>
              </button>
              <button 
                onClick={handleSendAlerts}
                className="w-full flex items-center justify-center gap-1 px-2 sm:px-3 lg:px-4 py-2 border border-[#EBEBEB] rounded text-xs sm:text-sm text-[#10BF0A] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Send Alerts</span>
                <span className="sm:hidden">Alerts</span>
              </button>
              <button 
                onClick={handleAISuggestions}
                className="w-full flex items-center justify-center gap-1 px-2 sm:px-3 lg:px-4 py-2 border border-[#EBEBEB] rounded text-xs sm:text-sm text-[#10BF0A] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">AI Suggestions</span>
                <span className="sm:hidden">AI</span>
              </button>
            </div>
          </div>

          {/* Today's Summary */}
          <div className="p-3 sm:p-4 border-t border-[#EBEBEB]">
            <h4 className="text-xs sm:text-sm font-medium text-black dark:text-white mb-3 sm:mb-4">Today's Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Total Jobs:</span>
                <span className="text-gray-600 font-medium">14</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Completed:</span>
                <span className="text-[#2ECC71] font-medium">8</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">In Progress:</span>
                <span className="text-[#F39C12] font-medium">3</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Unassigned:</span>
                <span className="text-[#DC2626] font-medium">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-3 sm:space-y-4">
        {/* Mobile Calendar Header */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <span className="text-sm sm:text-base font-medium text-black dark:text-white">Jul 25, 2025</span>
              <button className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-1">
              <button 
                className={`px-2 py-1 rounded text-xs transition-colors ${selectedView === 'daily' ? 'bg-white dark:bg-gray-700 text-[#10BF0A] shadow-sm' : 'text-gray-600 hover:text-gray-800 dark:hover:text-gray-200'}`}
                onClick={() => setSelectedView('daily')}
              >
                D
              </button>
              <button 
                className={`px-2 py-1 rounded text-xs transition-colors ${selectedView === 'weekly' ? 'bg-white dark:bg-gray-700 text-[#10BF0A] shadow-sm' : 'text-gray-600 hover:text-gray-800 dark:hover:text-gray-200'}`}
                onClick={() => setSelectedView('weekly')}
              >
                W
              </button>
              <button 
                className={`px-2 py-1 rounded text-xs transition-colors ${selectedView === 'monthly' ? 'bg-white dark:bg-gray-700 text-[#10BF0A] shadow-sm' : 'text-gray-600 hover:text-gray-800 dark:hover:text-gray-200'}`}
                onClick={() => setSelectedView('monthly')}
              >
                M
              </button>
            </div>
          </div>

          {/* Mobile Legend */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#0D99FF] rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Assigned</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#F39C12] rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">In Progress</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#2ECC71] rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Completed</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#DC2626] rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Conflict</span>
            </div>
          </div>
        </div>

        {/* Mobile Technicians Section */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 sm:p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-medium text-black dark:text-white">Technicians</h3>
            <button className="w-8 h-8 bg-[#10BF0A] rounded flex items-center justify-center hover:bg-[#0EA50A] transition-colors">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search technicians..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
            />
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {technicians.map((tech) => (
              <div 
                key={tech.id} 
                onClick={() => handleTechnicianClick(tech)}
                className="bg-gray-50 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-black dark:text-white text-sm truncate">{tech.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{tech.role}</div>
                  </div>
                  <div 
                    className="flex items-center gap-1 px-2 py-1 rounded text-xs flex-shrink-0"
                    style={{ backgroundColor: tech.statusBg, color: tech.statusColor }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: tech.statusColor }}
                    ></div>
                    {tech.status}
                  </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{tech.jobsToday} jobs today</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Unassigned Jobs Section */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 sm:p-4">
          <h3 className="text-base font-medium text-black dark:text-white mb-3">Unassigned Jobs</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {unassignedJobs.map((job) => (
              <div 
                key={job.id} 
                onClick={() => handleJobClick(job)}
                className="bg-gray-50 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-black dark:text-white truncate flex-1 mr-2">{job.title}</span>
                  <div 
                    className="flex items-center gap-1 px-2 py-1 rounded text-xs flex-shrink-0"
                    style={{ backgroundColor: job.priorityBg, color: job.priorityColor }}
                  >
                    <Flag className="w-3 h-3" />
                    {job.priority}
                  </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <div className="truncate">{job.location}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{job.dueTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Quick Actions */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 sm:p-4">
          <h4 className="text-base font-medium text-black dark:text-white mb-3">Quick Actions</h4>
          <div className="grid grid-cols-1 gap-2">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-[#EBEBEB] rounded text-sm text-[#10BF0A] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Plus className="w-4 h-4" />
              New Job Assignment
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-[#EBEBEB] rounded text-sm text-[#10BF0A] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Bell className="w-4 h-4" />
              Send Alerts
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-[#EBEBEB] rounded text-sm text-[#10BF0A] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Bot className="w-4 h-4" />
              AI Suggestions
            </button>
          </div>
        </div>

        {/* Mobile Today's Summary */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 sm:p-4">
          <h4 className="text-sm font-medium text-black dark:text-white mb-3">Today's Summary</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-lg font-bold text-black dark:text-white">14</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Total Jobs</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-lg font-bold text-[#2ECC71]">8</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-lg font-bold text-[#F39C12]">3</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">In Progress</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded">
              <div className="text-lg font-bold text-[#DC2626]">3</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Unassigned</div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Assignment Modal */}
      <JobAssignmentModal
        isOpen={isJobAssignmentModalOpen}
        onClose={() => setIsJobAssignmentModalOpen(false)}
        onAssign={handleAssignJob}
        technicians={technicians}
      />

      {/* Alert Configuration Modal */}
      <AlertConfigurationModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onSend={handleSendAlert}
      />

      {/* AI Suggestions Modal */}
      <AISuggestionsModal
        isOpen={isAISuggestionsModalOpen}
        onClose={() => setIsAISuggestionsModalOpen(false)}
        onApply={handleApplyAISuggestion}
      />
    </div>
  );
};
