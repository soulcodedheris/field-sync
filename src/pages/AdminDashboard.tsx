import React from 'react';
import { useAuthStore } from '../stores/authStore';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  Wrench,
  DollarSign,
  Rocket,
  Plus,
  Megaphone,
  BarChart3,
  Bot,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  MapPin,
  Flag,
  Circle
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore();

  const statCards = [
    {
      title: 'Active Jobs',
      value: '12',
      change: '+2',
      changeType: 'increase',
      comparison: 'compared to last week',
      icon: Briefcase,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Workers On-Site',
      value: '24',
      change: '+18',
      changeType: 'increase',
      comparison: 'compared to last week',
      icon: Wrench,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Weekly Revenue',
      value: '$120,450',
      change: '-3%',
      changeType: 'decrease',
      comparison: 'compared to last week',
      icon: DollarSign,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Avg Efficiency',
      value: '74%',
      change: '+10%',
      changeType: 'increase',
      comparison: 'compared to last week',
      icon: Rocket,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    }
  ];

  const activeJobs = [
    {
      jobDetails: {
        title: 'AC Maintenance',
        dueTime: 'Due: 2:00 PM'
      },
      technician: {
        name: 'John Doe',
        role: 'Junior Technician',
        avatar: userAvatar1
      },
      client: {
        name: 'Acme Corp',
        address: '123 Main St'
      },
      priority: 'High',
      status: 'In Progress'
    },
    {
      jobDetails: {
        title: 'Electrical Wiring',
        dueTime: 'Due: 4:30 PM'
      },
      technician: {
        name: 'John Doe',
        role: 'Senior Technician',
        avatar: userAvatar2
      },
      client: {
        name: 'Tech Solutions',
        address: '456 Oak Ave'
      },
      priority: 'Medium',
      status: 'Scheduled'
    },
    {
      jobDetails: {
        title: 'HVAC Repair',
        dueTime: 'Due: 6:00 PM'
      },
      technician: {
        name: 'John Doe',
        role: 'Master Technician',
        avatar: userAvatar3
      },
      client: {
        name: 'Global Industries',
        address: '789 Pine Rd'
      },
      priority: 'Low',
      status: 'Pending'
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-[#FFDFDF] rounded text-[#DC2626]">
            <Flag className="w-3 h-3" />
            <span className="text-xs font-medium">High</span>
          </div>
        );
      case 'Medium':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-[#FFEFD7] rounded text-[#F39C12]">
            <Circle className="w-3 h-3" />
            <span className="text-xs font-medium">Medium</span>
          </div>
        );
      case 'Low':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-[#DCFBE9] rounded text-[#2ECC71]">
            <CheckCircle className="w-3 h-3" />
            <span className="text-xs font-medium">Low</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Progress':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-[#FFEFD7] rounded text-[#F39C12]">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-medium">In Progress</span>
          </div>
        );
      case 'Scheduled':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-[#E0F2FE] rounded text-[#0284C7]">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-medium">Scheduled</span>
          </div>
        );
      case 'Pending':
        return (
          <div className="flex items-center gap-1 px-2 py-1 bg-[#F3F4F6] rounded text-[#6B7280]">
            <AlertTriangle className="w-3 h-3" />
            <span className="text-xs font-medium">Pending</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (  
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-2 sm:space-y-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-black dark:text-white">
            Good morning, {user?.firstName || 'John'}!
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Welcome back. Here's what's happening today.
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-sm sm:text-lg text-black dark:text-white">{card.title}</h3>
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${card.iconBg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${card.iconColor}`} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-3 sm:mb-4">{card.value}</div>
                  <div className="flex items-center gap-2 mb-1">
                    {card.changeType === 'increase' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      card.changeType === 'increase' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {card.change}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{card.comparison}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Jobs Table */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white">Active Jobs</h2>
          <button className="flex items-center gap-2 px-3 py-2 bg-[#10BF0A] text-white rounded-lg text-sm font-medium hover:bg-[#0EA509] transition-colors">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Job</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          {activeJobs.map((job, index) => (
            <div key={index} className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Job Details */}
                <div className="lg:col-span-2">
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-lg font-medium text-black dark:text-white">{job.jobDetails.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{job.jobDetails.dueTime}</p>
                  </div>
                </div>

                {/* Technician */}
                <div className="flex items-center gap-3">
                  <img 
                    src={job.technician.avatar} 
                    alt={job.technician.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base font-medium text-black dark:text-white truncate">{job.technician.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{job.technician.role}</p>
                  </div>
                </div>

                {/* Client & Status */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-black dark:text-white truncate">{job.client.name}</p>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{job.client.address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {getPriorityBadge(job.priority)}
                    {getStatusBadge(job.status)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#10BF0A]/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-[#10BF0A]" />
          </div>
          <h3 className="text-sm sm:text-base font-medium text-black dark:text-white mb-1">Create Job</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Add new job assignment</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-sm sm:text-base font-medium text-black dark:text-white mb-1">View Analytics</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Performance insights</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-sm sm:text-base font-medium text-black dark:text-white mb-1">AI Assistant</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Get help & insights</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Megaphone className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-sm sm:text-base font-medium text-black dark:text-white mb-1">Announcements</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Team communications</p>
        </div>
      </div>
    </div>
  );
};
