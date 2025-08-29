import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  ListChecks,
  AlertOctagon,
  UserPlus,
  Shield,
  TrendingDown,
  TrendingUp,
  Calendar
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';
import { SuperAdminAuditLogFilterModal } from '../components/SuperAdminAuditLogFilterModal';
import { SuperAdminAuditLogExportModal } from '../components/SuperAdminAuditLogExportModal';

export const SuperAdminAuditLogs: React.FC = () => {
  const { user } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('All Actions');
  const [selectedDate, setSelectedDate] = useState('mm/dd/yyyy');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  
  // Modal states
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleFilterApply = (filters: any) => {
    console.log('Applying filters:', filters);
  };

  const handleExport = (config: any) => {
    console.log('Exporting with config:', config);
  };

  const stats = [
    {
      title: 'Log Events',
      value: '5,421',
      change: '+100',
      changeType: 'increase',
      icon: ListChecks,
      iconBg: 'bg-[rgba(211,253,210,0.64)]'
    },
    {
      title: 'Failed Actions',
      value: '12',
      change: '-5',
      changeType: 'decrease',
      icon: AlertOctagon,
      iconBg: 'bg-[rgba(211,253,210,0.64)]'
    },
    {
      title: 'New Accounts',
      value: '27',
      change: '+10',
      changeType: 'increase',
      icon: UserPlus,
      iconBg: 'bg-[rgba(211,253,210,0.64)]'
    },
    {
      title: 'Login Failures',
      value: '1',
      change: '+0',
      changeType: 'increase',
      icon: Shield,
      iconBg: 'bg-[rgba(211,253,210,0.64)]'
    }
  ];

  const auditLogs = [
    {
      id: 1,
      date: 'Jan 15, 2024',
      time: '2:34 PM',
      actionType: 'User Deleted',
      doneBy: {
        name: 'John Doe',
        role: 'Admin',
        avatar: 'JD'
      },
      company: 'TechCorp Solutions',
      affectedResource: 'User: sarah.wilson@techcorp.com',
      status: 'Success'
    },
    {
      id: 2,
      date: 'Jan 15, 2024',
      time: '2:34 PM',
      actionType: 'Org Added',
      doneBy: {
        name: 'John Doe',
        role: 'Senior Technician',
        avatar: userAvatar1
      },
      company: 'Global Industries',
      affectedResource: 'Company: DigitalWorks',
      status: 'Success'
    },
    {
      id: 3,
      date: 'Jan 15, 2024',
      time: '2:34 PM',
      actionType: 'Project Created',
      doneBy: {
        name: 'John Doe',
        role: 'HVAC Specialist',
        avatar: userAvatar2
      },
      company: 'TechCorp Solutions',
      affectedResource: 'Project: Office Renovation',
      status: 'Failed'
    },
    {
      id: 4,
      date: 'Jan 15, 2024',
      time: '2:34 PM',
      actionType: 'Settings Changed',
      doneBy: {
        name: 'John Doe',
        role: 'HVAC Specialist',
        avatar: userAvatar3
      },
      company: 'Global Industries',
      affectedResource: 'Billing Settings',
      status: 'Success'
    },
    {
      id: 5,
      date: 'Jan 15, 2024',
      time: '2:34 PM',
      actionType: 'User Created',
      doneBy: {
        name: 'John Doe',
        role: 'HVAC Specialist',
        avatar: userAvatar1
      },
      company: 'StartupSpace',
      affectedResource: 'User: robert.brown@techcorp.com',
      status: 'Failed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-[#DCFBE9] text-[#2ECC71]';
      case 'Failed':
        return 'bg-[#FFDFDF] text-[#DC2626]';
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
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Audit Logs</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white mt-2">Monitor all system activities and changes across companies</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                    {stat.changeType === 'increase' ? (
                      <TrendingUp className="w-4 h-4 text-[#2ECC71]" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-[#DC2626]" />
                    )}
                    <span className={`text-xs font-medium ${
                      stat.changeType === 'increase' ? 'text-[#2ECC71]' : 'text-[#DC2626]'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
                    {index === 2 ? 'this week' : index === 3 ? 'in the last 24 hours' : 'compared to last week'}
                  </span>
                </div>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${stat.iconBg}`}>
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#10BF0A]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="search...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full text-sm sm:text-base text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Action Filter */}
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="hidden sm:inline">All Actions</span>
              <span className="sm:hidden">Actions</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Date Filter */}
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="hidden sm:inline">mm/dd/yyyy</span>
              <span className="sm:hidden">Date</span>
              <Calendar className="w-4 h-4" />
            </button>

            {/* Status Filter */}
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="hidden sm:inline">All Status</span>
              <span className="sm:hidden">Status</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Filter Button */}
            <button 
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm hover:bg-[#0EA50A] transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>

            {/* Export Button */}
            <button 
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Audit Log List */}
      <div className="bg-white dark:bg-gray-800 border border-[#84ABF8] dark:border-blue-600 rounded-xl p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {auditLogs.map((log) => (
            <div key={log.id} className="border border-[#E1E1E1] rounded-lg p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-6">
                {/* Date & Time */}
                <div className="lg:col-span-1">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-black dark:text-white">Date & Time</div>
                    <div className="text-sm text-black dark:text-white">{log.date}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{log.time}</div>
                  </div>
                </div>

                {/* Action Type */}
                <div className="lg:col-span-1">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-black dark:text-white">Action Type</div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white dark:bg-gray-700 text-[#10BF0A] font-medium">
                      {log.actionType}
                    </span>
                  </div>
                </div>

                {/* Done By */}
                <div className="lg:col-span-1">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-black dark:text-white">Done By</div>
                    <div className="flex items-center gap-3">
                      {typeof log.doneBy.avatar === 'string' ? (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#10BF0A] rounded-full flex items-center justify-center">
                          <span className="text-sm sm:text-base text-white font-medium">{log.doneBy.avatar}</span>
                        </div>
                      ) : (
                        <img
                          src={log.doneBy.avatar}
                          alt={log.doneBy.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="text-sm sm:text-base font-medium text-black dark:text-white break-words">{log.doneBy.name}</div>
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">{log.doneBy.role}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company */}
                <div className="lg:col-span-1">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-black dark:text-white">Company</div>
                    <span className="text-sm sm:text-base text-black dark:text-white break-words">{log.company}</span>
                  </div>
                </div>

                {/* Affected Resource */}
                <div className="lg:col-span-2">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-black dark:text-white">Affected Resource</div>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white dark:bg-gray-700 text-black dark:text-white break-words">
                      {log.affectedResource}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="lg:col-span-1">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-black dark:text-white">Status</div>
                    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs ${getStatusColor(log.status)}`}>
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      {log.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 sm:pt-6 border-t border-[#EBEBEB] mt-4 sm:mt-6">
          <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1 to 3 of 847 results</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-3 py-1 border border-[#D1D5DB] rounded text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Previous
            </button>
            <button className="px-3 py-1 bg-[#10BF0A] text-white rounded text-sm hover:bg-[#0EA50A] transition-colors">1</button>
            <button className="px-3 py-1 border border-[#D1D5DB] rounded text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">2</button>
            <button className="px-3 py-1 border border-[#D1D5DB] rounded text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">3</button>
            <button 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-3 py-1 border border-[#D1D5DB] rounded text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SuperAdminAuditLogFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleFilterApply}
      />

      <SuperAdminAuditLogExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
};
