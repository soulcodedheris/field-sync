import React, { useState } from 'react';
import {
  Megaphone,
  Clock,
  Plus,
  CalendarDays,
  ChevronDown,
  Filter,
  Trash2,
  Edit3,
  TrendingDown
} from 'lucide-react';
import { AnnouncementComposeModal } from '../components/AnnouncementComposeModal';

interface Announcement {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  category: string;
  isPublished: boolean;
}

const AdminAnnouncement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Category');
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [announcements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'New Safety Protocol Implementation',
      content: 'Effective immediately, all technicians must complete the updated safety checklist before starting any electrical work.',
      timestamp: '15 min ago',
      category: 'Announcements',
      isPublished: true
    },
    {
      id: '2',
      title: 'New Diagnostic Tools Available',
      content: 'Effective immediately, all technicians must complete the updated safety checklist before starting any electrical work.',
      timestamp: '15 min ago',
      category: 'EQUIPMENT UPDATE',
      isPublished: true
    },
    {
      id: '3',
      title: 'Quarterly Training Session',
      content: 'Mandatory training on new HVAC systems scheduled for next Friday at 2:00 PM in Conference Room A.',
      timestamp: '15 min ago',
      category: 'Training',
      isPublished: true
    }
  ]);

  const handleDelete = (id: string) => {
    console.log('Delete announcement:', id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit announcement:', id);
  };

  return (
    <div className="sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="pl-0 sm:pl-4">
          <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Announcements</h1>
          <p className="text-sm sm:text-lg text-black dark:text-white mt-2">Manage and send announcements to users within your organization.</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Total Announcements */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-sm sm:text-lg text-black dark:text-white">Total Announcements</p>
                <p className="text-lg sm:text-2xl font-bold text-black dark:text-white">150</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <TrendingDown className="w-4 h-4 text-[#DC2626]" />
                  <span className="text-xs sm:text-sm font-medium text-[#DC2626]">20 (-11.8%)</span>
                </div>
                <span className="text-xs sm:text-sm text-[rgba(0,0,0,0.35)] hidden sm:block">compared to last week</span>
              </div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[rgba(211,253,210,0.64)] rounded-full flex items-center justify-center flex-shrink-0">
              <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-[#10BF0A]" />
            </div>
          </div>
        </div>

        {/* Scheduled Messages */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-sm sm:text-lg text-black dark:text-white">Scheduled Messages</p>
                <p className="text-lg sm:text-2xl font-bold text-black dark:text-white">15</p>
              </div>
              <div>
                <span className="text-xs sm:text-sm text-[rgba(0,0,0,0.35)]">Next: Today 3:00 PM</span>
              </div>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[rgba(211,253,210,0.64)] rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#10BF0A]" />
            </div>
          </div>
        </div>
      </div>

      {/* Create New Announcement */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-medium text-black dark:text-white">Create New Announcement</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Compose and schedule messages for your team</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button 
              onClick={() => setIsComposeModalOpen(true)}
              className="flex items-center justify-center gap-1 bg-[#10BF0A] text-white px-4 py-2 rounded-lg hover:bg-[#0EA50A] transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Compose Message</span>
            </button>
            <button className="flex items-center justify-center gap-1 bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <CalendarDays className="w-4 h-4" />
              <span>Schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl">
        {/* Header */}
        <div className="sm:p-6 border-b border-[#EBEBEB]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg sm:text-xl font-medium text-black dark:text-white">Recent Messages</h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-auto appearance-none bg-white dark:bg-gray-800 dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 text-black dark:text-white px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-[#10BF0A]"
                >
                  <option value="All Category">All Category</option>
                  <option value="Announcements">Announcements</option>
                  <option value="Equipment Update">Equipment Update</option>
                  <option value="Training">Training</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <button className="flex items-center justify-center gap-1 bg-[#10BF0A] text-white px-4 py-2 rounded-lg hover:bg-[#0EA50A] transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="divide-y divide-[#EBEBEB]">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="p-4 sm:p-6">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-medium text-black dark:text-white">{announcement.title}</h3>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{announcement.timestamp}</span>
                </div>
                
                {/* Content */}
                <p className="text-sm text-gray-600 dark:text-gray-400">{announcement.content}</p>
                
                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#10BF0A] rounded-full"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 uppercase">{announcement.category}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(announcement.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                    >
                      <Edit3 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-[#F44336]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[#EBEBEB]">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1 to 2 of 7 results</span>
            <div className="flex gap-1">
              <button className="w-8 h-8 bg-[#10BF0A] text-white rounded-md flex items-center justify-center text-sm font-medium">
                1
              </button>
              <button className="w-8 h-8 border border-[#D1D5DB] text-gray-600 dark:text-gray-400 rounded-md flex items-center justify-center text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                2
              </button>
              <button className="w-8 h-8 border border-[#D1D5DB] text-gray-600 dark:text-gray-400 rounded-md flex items-center justify-center text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                3
              </button>
              <button className="px-3 h-8 border border-[#D1D5DB] text-gray-600 dark:text-gray-400 rounded-md flex items-center justify-center text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Announcement Compose Modal */}
      <AnnouncementComposeModal 
        isOpen={isComposeModalOpen}
        onClose={() => setIsComposeModalOpen(false)}
      />
    </div>
  );
};

export default AdminAnnouncement;
