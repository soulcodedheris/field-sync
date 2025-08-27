import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  Megaphone,
  Clock,
  TrendingDown,
  TrendingUp,
  Plus,
  Calendar,
  Eye,
  Trash,
  Flag
} from 'lucide-react';
import { AnnouncementComposeModal } from '../components/AnnouncementComposeModal';

export const SuperAdminAnnouncements: React.FC = () => {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('All Company');
  const [selectedPriority, setSelectedPriority] = useState('All Priority');
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);

  const stats = [
    {
      title: 'Total Announcements',
      value: '150',
      change: '20 (-11.8%)',
      changeType: 'decrease',
      icon: Megaphone,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      period: 'compared to last week'
    },
    {
      title: 'Scheduled Messages',
      value: '15',
      change: 'Next: Today 3:00 PM',
      changeType: 'neutral',
      icon: Clock,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      period: ''
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'New Feature Release: Advanced Analytics',
      content: "We're excited to announce the release of our new Advanced Analytics dashboard, providing deeper insights into your project performance...",
      timestamp: '15 min ago',
      company: 'All Companies',
      views: '1,247 views',
      status: 'Success',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Upcoming overlapping jobs detected',
      content: 'Scheduled maintenance window on Sunday, March 15th from 2:00 AM to 4:00 AM EST. All services will be temporarily unavailable...',
      timestamp: '15 min ago',
      company: 'All Companies',
      scheduled: 'Scheduled for tomorrow 9:00 AM',
      status: 'Normal',
      priority: 'Normal'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-[#DCFBE9] text-[#2ECC71]';
      case 'Normal':
        return 'bg-[rgba(202,202,202,0.8)] text-gray-600 dark:text-gray-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-[#FFDFDF] text-[#DC2626]';
      case 'Normal':
        return 'bg-[rgba(202,202,202,0.8)] text-gray-600 dark:text-gray-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="pl-0 sm:pl-4">
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Announcements</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white mt-2">Manage and send system-wide messages to users across all companies</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-lg text-black dark:text-white">{stat.title}</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{stat.value}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {stat.changeType === 'decrease' ? (
                      <TrendingDown className="w-4 h-4 text-[#DC2626]" />
                    ) : stat.changeType === 'increase' ? (
                      <TrendingUp className="w-4 h-4 text-[#2ECC71]" />
                    ) : null}
                    <span className={`text-xs font-medium ${
                      stat.changeType === 'decrease' ? 'text-[#DC2626]' : 
                      stat.changeType === 'increase' ? 'text-[#2ECC71]' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  {stat.period && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
                      {stat.period}
                    </span>
                  )}
                </div>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${stat.iconBg}`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#10BF0A]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Announcement Card */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-medium text-black dark:text-white">Create New Announcement</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Compose and schedule system message</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <button 
              onClick={() => setIsComposeModalOpen(true)}
              className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Compose Message</span>
            </button>
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span>Schedule</span>
              <Calendar className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Messages Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-[#EBEBEB]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Recent Messages</h2>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span className="hidden sm:inline">All Company</span>
                <span className="sm:hidden">Company</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <span className="hidden sm:inline">All Priority</span>
                <span className="sm:hidden">Priority</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#EBEBEB]">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-medium text-black dark:text-white break-words">{announcement.title}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{announcement.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed break-words">{announcement.content}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#10BF0A] rounded-full"></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{announcement.company}</span>
                    </div>
                    {announcement.views && (
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{announcement.views}</span>
                      </div>
                    )}
                    {announcement.scheduled && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#10BF0A] rounded-full"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{announcement.scheduled}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs ${getStatusColor(announcement.status)}`}>
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      {announcement.status}
                    </span>
                    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs ${getPriorityColor(announcement.priority)}`}>
                      <Flag className="w-3 h-3" />
                      {announcement.priority}
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="p-1 border border-[#EBEBEB] rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button className="p-1 border border-[#EBEBEB] rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Trash className="w-4 h-4 text-[#F44336]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 sm:pt-6 border-t border-[#EBEBEB] p-4 sm:p-6">
          <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1 to 2 of 7 results</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-[#10BF0A] text-white rounded text-sm hover:bg-[#0EA50A] transition-colors">1</button>
            <button className="px-3 py-1 border border-[#D1D5DB] rounded text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">2</button>
            <button className="px-3 py-1 border border-[#D1D5DB] rounded text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">3</button>
            <button className="px-3 py-1 border border-[#D1D5DB] rounded text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Compose Message Modal */}
      <AnnouncementComposeModal
        isOpen={isComposeModalOpen}
        onClose={() => setIsComposeModalOpen(false)}
      />
    </div>
  );
};
