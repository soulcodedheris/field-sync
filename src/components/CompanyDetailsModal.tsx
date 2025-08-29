import React, { useState } from 'react';
import {
  X,
  Building,
  Mail,
  Users,
  Briefcase,
  Calendar,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Trash,
  Ban,
  AlertTriangle
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';

interface Company {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Pending' | 'Cancelled' | 'Suspended';
  plan: 'Free' | 'Pro' | 'Enterprise';
  users: number;
  jobsPosted: number;
  avatar: string;
}

interface CompanyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  onEdit: (company: Company) => void;
  onDelete: (companyId: number) => void;
  onSuspend: (companyId: number) => void;
  onActivate: (companyId: number) => void;
}

export const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({
  isOpen,
  onClose,
  company,
  onEdit,
  onDelete,
  onSuspend,
  onActivate
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'billing' | 'activity'>('overview');

  if (!isOpen || !company) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-[rgba(16,191,10,0.1)] text-[#10BF0A] border-[#10BF0A]';
      case 'Pending':
        return 'bg-[rgba(255,193,7,0.1)] text-[#FFC107] border-[#FFC107]';
      case 'Cancelled':
        return 'bg-[rgba(220,53,69,0.1)] text-[#DC3545] border-[#DC3545]';
      case 'Suspended':
        return 'bg-[rgba(108,108,108,0.1)] text-[#6C6C6C] border-[#6C6C6C]';
      default:
        return 'bg-[rgba(108,108,108,0.1)] text-[#6C6C6C] border-[#6C6C6C]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-3 h-3" />;
      case 'Pending':
        return <Clock className="w-3 h-3" />;
      case 'Cancelled':
        return <XCircle className="w-3 h-3" />;
      case 'Suspended':
        return <Ban className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise':
        return 'bg-purple-100 text-purple-800';
      case 'Pro':
        return 'bg-blue-100 text-blue-800';
      case 'Free':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  const handleViewAllUsers = () => {
    console.log('View all users clicked');
  };

  const handleSendMessage = () => {
    console.log('Send message clicked');
  };

  // Mock additional data
  const companyDetails = {
    phone: '+1 (555) 123-4567',
    address: '1234 Business Ave, Suite 100, New York, NY 10001',
    website: 'https://techcorp.com',
    registrationDate: 'January 15, 2024',
    lastActivity: '2 hours ago',
    totalRevenue: '$45,280',
    monthlyRevenue: '$3,840'
  };

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@techcorp.com', role: 'Admin', avatar: userAvatar1, lastActive: '2 mins ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@techcorp.com', role: 'Manager', avatar: userAvatar2, lastActive: '5 mins ago' },
    { id: 3, name: 'Mike Johnson', email: 'mike@techcorp.com', role: 'Technician', avatar: userAvatar3, lastActive: '1 hour ago' }
  ];

  const billingHistory = [
    { id: 1, date: 'Nov 15, 2024', amount: '$99.00', plan: 'Enterprise', status: 'Paid' },
    { id: 2, date: 'Oct 15, 2024', amount: '$99.00', plan: 'Enterprise', status: 'Paid' },
    { id: 3, date: 'Sep 15, 2024', amount: '$99.00', plan: 'Enterprise', status: 'Paid' }
  ];

  const activityLog = [
    { id: 1, action: 'New user registered', user: 'John Doe', time: '2 hours ago' },
    { id: 2, action: 'Job posted', user: 'Jane Smith', time: '4 hours ago' },
    { id: 3, action: 'Payment processed', user: 'System', time: '1 day ago' },
    { id: 4, action: 'Plan upgraded to Enterprise', user: 'John Doe', time: '3 days ago' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border-b border-[#E5E7EB] gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center">
              <span className="text-lg sm:text-xl font-bold text-[#374151]">{company.avatar}</span>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white">{company.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{company.email}</p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(company.status)}`}>
                  {getStatusIcon(company.status)}
                  {company.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(company.plan)}`}>
                  {company.plan} Plan
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(company)}
              className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            {company.status === 'Active' ? (
              <button
                onClick={() => onSuspend(company.id)}
                className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-red-50 transition-colors"
              >
                <Ban className="w-4 h-4 text-[#F59E0B]" />
              </button>
            ) : (
              <button
                onClick={() => onActivate(company.id)}
                className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-green-50 transition-colors"
              >
                <CheckCircle className="w-4 h-4 text-[#10BF0A]" />
              </button>
            )}
            <button
              onClick={() => onDelete(company.id)}
              className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash className="w-4 h-4 text-[#DC3545]" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-[#E5E7EB]">
          <div className="flex px-6">
            {[
              { id: 'overview', label: 'Overview', icon: Building },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'billing', label: 'Billing', icon: CreditCard },
              { id: 'activity', label: 'Activity', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#10BF0A] border-[#10BF0A]'
                    : 'text-[#6C6C6C] border-transparent text-black dark:text-white hover:text-black dark:hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-4 text-center">
                  <Users className="w-8 h-8 text-[#10BF0A] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-black dark:text-white">{company.users}</p>
                  <p className="text-sm text-[#6C6C6C]">Total Users</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-4 text-center">
                  <Briefcase className="w-8 h-8 text-[#10BF0A] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-black dark:text-white">{company.jobsPosted}</p>
                  <p className="text-sm text-[#6C6C6C]">Jobs Posted</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-4 text-center">
                  <CreditCard className="w-8 h-8 text-[#10BF0A] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-black dark:text-white">{companyDetails.totalRevenue}</p>
                  <p className="text-sm text-[#6C6C6C]">Total Revenue</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-4 text-center">
                  <Calendar className="w-8 h-8 text-[#10BF0A] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-black dark:text-white">{companyDetails.monthlyRevenue}</p>
                  <p className="text-sm text-[#6C6C6C]">Monthly Revenue</p>
                </div>
              </div>

              {/* Company Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-black dark:text-white">Company Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#6C6C6C]" />
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Email</p>
                        <p className="text-sm font-medium text-black dark:text-white">{company.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#6C6C6C]" />
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Phone</p>
                        <p className="text-sm font-medium text-black dark:text-white">{companyDetails.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#6C6C6C] mt-0.5" />
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Address</p>
                        <p className="text-sm font-medium text-black dark:text-white">{companyDetails.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-[#6C6C6C]" />
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Website</p>
                        <a href={companyDetails.website} className="text-sm font-medium text-[#10BF0A] hover:underline">
                          {companyDetails.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-black dark:text-white">Account Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#6C6C6C]" />
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Registration Date</p>
                        <p className="text-sm font-medium text-black dark:text-white">{companyDetails.registrationDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#6C6C6C]" />
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Last Activity</p>
                        <p className="text-sm font-medium text-black dark:text-white">{companyDetails.lastActivity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#6C6C6C]" />
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Current Plan</p>
                        <p className="text-sm font-medium text-black dark:text-white">{company.plan}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-black dark:text-white">Company Users</h3>
                <div className="text-sm text-[#6C6C6C]">{company.users} total users</div>
              </div>
              
              <div className="space-y-3">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-xl">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-black dark:text-white">{user.name}</p>
                        <p className="text-sm text-[#6C6C6C]">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-black dark:text-white">{user.role}</p>
                      <p className="text-xs text-[#6C6C6C]">Last active: {user.lastActive}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={handleViewAllUsers}
                className="w-full py-2 border border-[#E5E7EB] text-[#6C6C6C] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                View All Users
              </button>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-4">
                  <p className="text-sm text-[#6C6C6C]">Current Plan</p>
                  <p className="text-lg font-bold text-black dark:text-white">{company.plan}</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-4">
                  <p className="text-sm text-[#6C6C6C]">Monthly Revenue</p>
                  <p className="text-lg font-bold text-black dark:text-white">{companyDetails.monthlyRevenue}</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-4">
                  <p className="text-sm text-[#6C6C6C]">Total Revenue</p>
                  <p className="text-lg font-bold text-black dark:text-white">{companyDetails.totalRevenue}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-black dark:text-white mb-4">Billing History</h3>
                <div className="space-y-3">
                  {billingHistory.map((bill) => (
                    <div key={bill.id} className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-xl">
                      <div>
                        <p className="font-medium text-black dark:text-white">{bill.date}</p>
                        <p className="text-sm text-[#6C6C6C]">{bill.plan} Plan</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-black dark:text-white">{bill.amount}</p>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {bill.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-black dark:text-white">Recent Activity</h3>
              
              <div className="space-y-3">
                {activityLog.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-4 border border-[#E5E7EB] rounded-xl">
                    <div className="w-2 h-2 bg-[#10BF0A] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black dark:text-white">{activity.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#6C6C6C]">by {activity.user}</span>
                        <span className="text-xs text-[#6C6C6C]">•</span>
                        <span className="text-xs text-[#6C6C6C]">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[#E5E7EB] bg-[#F8F9FA]">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#E5E7EB] text-[#6C6C6C] rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
          <div className="flex gap-3">
            <button 
              onClick={handleSendMessage}
              className="px-4 py-2 border border-[#E5E7EB] text-black dark:text-white rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              Send Message
            </button>
            <button
              onClick={() => onEdit(company)}
              className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors"
            >
              Edit Company
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
