import React from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle,
  Star,
  Search
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';

export const AdminAnalytics: React.FC = () => {
  const { user } = useAuthStore();

  const statCards = [
    {
      title: 'Revenue',
      value: '$48.2K',
      change: '10.6%',
      changeType: 'increase',
      comparison: 'compared to last week',
      icon: DollarSign,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Total Hour Logged',
      value: '1,247',
      change: '1',
      changeType: 'increase',
      comparison: 'compared to last week',
      icon: Clock,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Jobs Completed',
      value: '65',
      change: '25',
      changeType: 'decrease',
      comparison: 'compared to last week',
      icon: CheckCircle,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Avg. Rating',
      value: '1,247',
      change: '2',
      changeType: 'decrease',
      comparison: 'compared to last week',
      icon: Star,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    }
  ];

  const technicians = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Junior Technician',
      avatar: userAvatar1,
      jobsCompleted: '176',
      hoursLogged: '75hrs',
      compliance: '80%',
      rating: '4.9'
    },
    {
      id: '2',
      name: 'John Doe',
      role: 'Senior Technician',
      avatar: userAvatar2,
      jobsCompleted: '45',
      hoursLogged: '100hrs',
      compliance: '70%',
      rating: '4.9'
    },
    {
      id: '3',
      name: 'John Doe',
      role: 'HVAC Specialist',
      avatar: userAvatar3,
      jobsCompleted: '20',
      hoursLogged: '176hrs',
      compliance: '55%',
      rating: '4.9'
    }
  ];

  return (
    <div className=" sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="pl-0 sm:pl-4">
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Analytics & Reports</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white mt-2">Track performance metrics and generate reports.</p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3 sm:space-y-4 flex-1 min-w-0">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-lg text-black dark:text-white truncate">{stat.title}</h3>
                  <p className="text-lg sm:text-2xl font-bold text-black dark:text-white">{stat.value}</p>
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
                  <span className="text-xs text-[rgba(0,0,0,0.35)] hidden sm:inline">{stat.comparison}</span>
                </div>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${stat.iconBg} flex-shrink-0`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Monthly Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-2xl font-medium text-black dark:text-white mb-4 sm:mb-6">Monthly Revenue</h3>
          <div className="relative h-64 sm:h-80">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs sm:text-lg text-gray-600 dark:text-gray-400">
              <span>400k</span>
              <span>300k</span>
              <span>200k</span>
              <span>100k</span>
            </div>
            
            {/* Grid lines */}
            <div className="absolute left-8 sm:left-12 top-0 w-full h-full">
              <div className="h-full flex flex-col justify-between">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="border-t border-[#EBEBEB] border-dashed"></div>
                ))}
              </div>
            </div>
            
            {/* Bars */}
            <div className="absolute left-8 sm:left-12 top-0 w-full h-full flex items-end justify-between px-2 sm:px-8">
              <div className="flex flex-col items-center">
                <div className="w-4 sm:w-8 bg-[#10BF0A] rounded-t" style={{ height: '60%' }}></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 sm:w-8 bg-[#10BF0A] rounded-t" style={{ height: '75%' }}></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 sm:w-8 bg-[#10BF0A] rounded-t" style={{ height: '35%' }}></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 sm:w-8 bg-[#10BF0A] rounded-t" style={{ height: '65%' }}></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 sm:w-8 bg-[#10BF0A] rounded-t" style={{ height: '85%' }}></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 sm:w-8 bg-[#10BF0A] rounded-t" style={{ height: '50%' }}></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-4 sm:w-8 bg-[#10BF0A] rounded-t" style={{ height: '70%' }}></div>
              </div>
            </div>
            
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-8 sm:left-12 w-full flex justify-between px-2 sm:px-8">
              <span className="text-xs sm:text-lg text-black dark:text-white">Jan</span>
              <span className="text-xs sm:text-lg text-black dark:text-white">Feb</span>
              <span className="text-xs sm:text-lg text-black dark:text-white">Mar</span>
              <span className="text-xs sm:text-lg text-black dark:text-white">Apr</span>
              <span className="text-xs sm:text-lg text-black dark:text-white">Jun</span>
              <span className="text-xs sm:text-lg text-black dark:text-white">Jul</span>
              <span className="text-xs sm:text-lg text-black dark:text-white">Aug</span>
            </div>
            
            {/* X-axis line */}
            <div className="absolute bottom-6 sm:bottom-8 left-8 sm:left-12 w-full border-t border-black"></div>
          </div>
        </div>

        {/* Service Breakdown Chart */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-2xl font-medium text-black dark:text-white mb-4 sm:mb-6">Service Breakdown</h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 h-auto sm:h-80">
            {/* Pie Chart */}
            <div className="relative w-48 h-48 sm:w-72 sm:h-72 mx-auto sm:mx-0 flex-shrink-0">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* AC Repair: 40% - Blue */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="20"
                  strokeDasharray={`${2 * Math.PI * 40 * 0.4} ${2 * Math.PI * 40}`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
                {/* Maintenance: 30% - Orange */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="20"
                  strokeDasharray={`${2 * Math.PI * 40 * 0.3} ${2 * Math.PI * 40}`}
                  strokeDashoffset={`-${2 * Math.PI * 40 * 0.4}`}
                  transform="rotate(-90 50 50)"
                />
                {/* Emergency: 15% - Red */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#DC2626"
                  strokeWidth="20"
                  strokeDasharray={`${2 * Math.PI * 40 * 0.15} ${2 * Math.PI * 40}`}
                  strokeDashoffset={`-${2 * Math.PI * 40 * 0.7}`}
                  transform="rotate(-90 50 50)"
                />
                {/* Inspections: 15% - Green */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#2ECC71"
                  strokeWidth="20"
                  strokeDasharray={`${2 * Math.PI * 40 * 0.15} ${2 * Math.PI * 40}`}
                  strokeDashoffset={`-${2 * Math.PI * 40 * 0.85}`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
            </div>
            
            {/* Legend */}
            <div className="space-y-3 sm:space-y-4 flex-1">
              <div className="flex items-center justify-center sm:justify-start">
                <div className="w-4 h-4 bg-[#2563EB] rounded mr-3 flex-shrink-0"></div>
                <span className="text-sm font-semibold">AC Repair: 40%</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <div className="w-4 h-4 bg-[#F59E0B] rounded mr-3 flex-shrink-0"></div>
                <span className="text-sm font-semibold">Maintenance: 30%</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <div className="w-4 h-4 bg-[#2ECC71] rounded mr-3 flex-shrink-0"></div>
                <span className="text-sm font-semibold">Inspections: 15%</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start">
                <div className="w-4 h-4 bg-[#DC2626] rounded mr-3 flex-shrink-0"></div>
                <span className="text-sm font-semibold">Emergency: 15%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Technicians */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 border-b border-[#EBEBEB]">
          <h3 className="text-lg sm:text-2xl font-medium text-black dark:text-white">Top Performing Technicians</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="search...."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Mobile Technician Cards - Hidden on lg+ screens */}
        <div className="lg:hidden p-4 space-y-4">
          {technicians.map((technician) => (
            <div key={technician.id} className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
              <div className="space-y-4">
                {/* Header Row - Technician Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={technician.avatar}
                    alt={`${technician.name} avatar`}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-black dark:text-white text-base">{technician.name}</h3>
                    <p className="text-sm text-[#6B7280]">{technician.role}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#FACC15]" />
                    <span className="text-sm font-medium text-black dark:text-white">{technician.rating}</span>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-3 border-t border-[#E5E7EB] pt-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Jobs</p>
                    <p className="text-sm font-medium text-black dark:text-white">{technician.jobsCompleted}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Hours</p>
                    <p className="text-sm font-medium text-black dark:text-white">{technician.hoursLogged}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Compliance</p>
                    <p className="text-sm font-medium text-black dark:text-white">{technician.compliance}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table - Hidden on mobile */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFC]">
              <tr>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Names</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Jobs Completed</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Hours Logged</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Compliance</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Rating</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map((technician) => (
                <tr key={technician.id} className="border-b border-[#E5E7EB]">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={technician.avatar}
                        alt={`${technician.name} avatar`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-black dark:text-white">{technician.name}</div>
                        <div className="text-sm text-[#6B7280]">{technician.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-lg font-medium text-gray-600 dark:text-gray-400">{technician.jobsCompleted}</td>
                  <td className="px-4 py-4 text-lg font-medium text-gray-600 dark:text-gray-400">{technician.hoursLogged}</td>
                  <td className="px-4 py-4 text-lg font-medium text-gray-600 dark:text-gray-400">{technician.compliance}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-[#FACC15]" />
                      <span className="text-lg font-medium text-black dark:text-white">{technician.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-t border-[#EBEBEB]">
          <span className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">Showing 1 to 3 of 847 results</span>
          <div className="flex items-center justify-center sm:justify-end gap-2">
            <button className="w-8 h-8 bg-[#10BF0A] text-white rounded text-sm font-medium">1</button>
            <button className="w-8 h-8 border border-[#EBEBEB] text-gray-600 dark:text-gray-400 rounded text-sm font-medium">2</button>
            <button className="w-8 h-8 border border-[#EBEBEB] text-gray-600 dark:text-gray-400 rounded text-sm font-medium">3</button>
            <button className="px-3 sm:px-4 h-8 border border-[#EBEBEB] text-gray-600 dark:text-gray-400 rounded text-sm font-medium">
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
