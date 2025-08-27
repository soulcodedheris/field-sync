import React from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  TrendingUp,
  TrendingDown,
  Building,
  Users,
  DollarSign,
  Rocket,
  Flag,
  CheckCircle,
  AlertTriangle,
  CreditCard,
  Plus,
  Megaphone,
  ClipboardList
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';

export const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuthStore();

  const statCards = [
    {
      title: 'Active Companies',
      value: '1,247',
      change: '52',
      changeType: 'increase',
      comparison: 'compared to last week',
      icon: Building,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Total Users',
      value: '45,892',
      change: '133',
      changeType: 'increase',
      comparison: 'compared to last week',
      icon: Users,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Monthly Revenue',
      value: '$847K',
      change: '2.5hrs',
      changeType: 'decrease',
      comparison: 'compared to last week',
      icon: DollarSign,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'System Uptime',
      value: '99.9%',
      change: 'Healthy',
      changeType: 'healthy',
      comparison: 'compared to last week',
      icon: Rocket,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    }
  ];

  const criticalAlerts = [
    {
      id: '1',
      title: 'High Server Load Detected',
      description: 'CPU usage at 89% on production server',
      time: '1hr ago',
      icon: AlertTriangle,
      iconColor: 'text-[#DC2626]'
    },
    {
      id: '2',
      title: 'Payment Gateway Timeout',
      description: 'Stripe API response time increased',
      time: '1hr ago',
      icon: CreditCard,
      iconColor: 'text-[#DC2626]'
    }
  ];

  const quickActions = [
    { name: 'Manage Users', icon: Users, href: '/superadmin/user-management' },
    { name: 'View Companies', icon: Building, href: '/superadmin/companies' },
    { name: 'Send Announcement', icon: Megaphone, href: '/superadmin/announcements' },
    { name: 'View Audit Logs', icon: ClipboardList, href: '/superadmin/audit-logs' }
  ];

  const recentActivity = [
    {
      id: '1',
      user: {
        name: 'Sarah Johnson',
        avatar: userAvatar1
      },
      action: 'Created new company account',
      company: 'TechCorp Solutions',
      time: '2 hrs ago'
    },
    {
      id: '2',
      user: {
        name: 'Mike Davis',
        avatar: userAvatar2
      },
      action: 'Updated billing information',
      company: 'Global Industries',
      time: '3 hrs ago'
    },
    {
      id: '3',
      user: {
        name: 'Alex Chen',
        avatar: userAvatar3
      },
      action: 'Added new user to system',
      company: 'Innovation Labs',
      time: '4 hrs ago'
    }
  ];

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
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-lg text-black dark:text-white">{stat.title}</h3>
                    <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{stat.value}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {stat.changeType === 'increase' ? (
                        <TrendingUp className="w-4 h-4 text-[#2ECC71]" />
                      ) : stat.changeType === 'healthy' ? (
                        <CheckCircle className="w-4 h-4 text-[#2ECC71]" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-[#DC2626]" />
                      )}
                      <span className={`text-xs font-medium ${
                        stat.changeType === 'increase' || stat.changeType === 'healthy' ? 'text-[#2ECC71]' : 'text-[#DC2626]'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    <span className="text-xs text-[rgba(0,0,0,0.35)]">{stat.comparison}</span>
                  </div>
                </div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${stat.iconBg}`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Critical Alerts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Critical Alerts */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white">Critical Alerts</h2>
            <div className="flex items-center gap-2">
              <Flag className="w-4 h-4 text-[#DC2626]" />
              <span className="text-sm font-medium text-[#DC2626]">{criticalAlerts.length} Active</span>
            </div>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {criticalAlerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <div key={alert.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border border-red-200 rounded-lg bg-red-50">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center ${alert.iconColor}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-black dark:text-white mb-1">{alert.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{alert.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-4 sm:mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-[#EBEBEB] dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#10BF0A]/10 rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#10BF0A]" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-black dark:text-white">{action.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-4 sm:mb-6">Recent Activity</h2>
        <div className="space-y-4 sm:space-y-6">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border border-[#EBEBEB] dark:border-gray-700 rounded-lg">
              <img 
                src={activity.user.avatar} 
                alt={activity.user.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                  <div>
                    <p className="text-sm sm:text-base font-medium text-black dark:text-white">{activity.user.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1">
                    <p className="text-xs sm:text-sm font-medium text-black dark:text-white">{activity.company}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
