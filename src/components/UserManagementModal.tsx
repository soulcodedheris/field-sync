import React, { useState } from 'react';
import {
  X,
  Search,
  Filter,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit,
  Trash,
  Ban,
  CheckCircle,
  AlertCircle,
  Clock,
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  Unlock
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';

interface UserAccount {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'technician' | 'superadmin';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  company: string;
  location: string;
  avatar: string;
  lastActive: string;
  joinDate: string;
  permissions: string[];
  jobsCompleted?: number;
  rating?: number;
}

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (user: UserAccount) => void;
  onDelete: (userId: number) => void;
  onSuspend: (userId: number) => void;
  onActivate: (userId: number) => void;
  onResetPassword: (userId: number) => void;
  user: UserAccount | null;
}

export const UserManagementModal: React.FC<UserManagementModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onSuspend,
  onActivate,
  onResetPassword,
  user
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'permissions' | 'security'>('overview');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen || !user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-3 h-3" />;
      case 'inactive':
        return <Clock className="w-3 h-3" />;
      case 'suspended':
        return <Ban className="w-3 h-3" />;
      case 'pending':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-blue-100 text-blue-800';
      case 'technician':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  // Mock data for activity and permissions
  const userActivity = [
    { id: 1, action: 'Logged in', time: '2 hours ago', ip: '192.168.1.100' },
    { id: 2, action: 'Updated job status', time: '4 hours ago', ip: '192.168.1.100' },
    { id: 3, action: 'Completed job #JB-2024-001', time: '1 day ago', ip: '192.168.1.100' },
    { id: 4, action: 'Password changed', time: '3 days ago', ip: '192.168.1.100' }
  ];

  const availablePermissions = [
    'View Jobs', 'Edit Jobs', 'Delete Jobs', 'Assign Jobs',
    'View Users', 'Edit Users', 'Delete Users', 'Create Users',
    'View Reports', 'Export Data', 'Manage Settings', 'View Analytics'
  ];

  const userPermissions = user.permissions;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 border-b border-[#E5E7EB] gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <img src={user.avatar} alt={user.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover" />
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white">{user.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                  {getStatusIcon(user.status)}
                  {user.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(user)}
              className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            {user.status === 'active' ? (
              <button
                onClick={() => onSuspend(user.id)}
                className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-red-50 transition-colors"
              >
                <Ban className="w-4 h-4 text-[#F59E0B]" />
              </button>
            ) : (
              <button
                onClick={() => onActivate(user.id)}
                className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-green-50 transition-colors"
              >
                <CheckCircle className="w-4 h-4 text-[#10BF0A]" />
              </button>
            )}
            <button
              onClick={() => onDelete(user.id)}
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
          <div className="flex overflow-x-auto px-4 sm:px-6">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'activity', label: 'Activity', icon: Clock },
              { id: 'permissions', label: 'Permissions', icon: Shield },
              { id: 'security', label: 'Security', icon: Lock }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#10BF0A] border-[#10BF0A]'
                    : 'text-gray-600 border-transparent text-black dark:text-white hover:text-black dark:hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* User Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-4 text-center">
                  <User className="w-8 h-8 text-[#10BF0A] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-black dark:text-white">{user.jobsCompleted || 0}</p>
                  <p className="text-sm text-[#6C6C6C]">Jobs Completed</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-4 text-center">
                  <Shield className="w-8 h-8 text-[#10BF0A] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-black dark:text-white">{userPermissions.length}</p>
                  <p className="text-sm text-[#6C6C6C]">Permissions</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-4 text-center">
                  <Calendar className="w-8 h-8 text-[#10BF0A] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-black dark:text-white">{user.joinDate}</p>
                  <p className="text-sm text-[#6C6C6C]">Member Since</p>
                </div>
              </div>

              {/* User Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-black dark:text-white">Personal Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#6C6C6C]" />
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Email</p>
                        <p className="text-sm font-medium text-black dark:text-white">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#6C6C6C]" />
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Phone</p>
                        <p className="text-sm font-medium text-black dark:text-white">{user.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[#6C6C6C]" />
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Location</p>
                        <p className="text-sm font-medium text-black dark:text-white">{user.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-black dark:text-white">Account Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-[#6C6C6C]" />
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Company</p>
                        <p className="text-sm font-medium text-black dark:text-white">{user.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#6C6C6C]" />
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Last Active</p>
                        <p className="text-sm font-medium text-black dark:text-white">{user.lastActive}</p>
                      </div>
                    </div>
                    {user.rating && (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 text-[#6C6C6C]">★</div>
                        <div>
                          <p className="text-sm text-[#6C6C6C]">Rating</p>
                          <p className="text-sm font-medium text-black dark:text-white">{user.rating}/5.0</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-black dark:text-white">Recent Activity</h3>
              
              <div className="space-y-3">
                {userActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-4 border border-[#E5E7EB] rounded-xl">
                    <div className="w-2 h-2 bg-[#10BF0A] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black dark:text-white">{activity.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#6C6C6C]">{activity.time}</span>
                        <span className="text-xs text-[#6C6C6C]">•</span>
                        <span className="text-xs text-[#6C6C6C]">IP: {activity.ip}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-black dark:text-white">User Permissions</h3>
                <button className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors">
                  Edit Permissions
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {availablePermissions.map((permission) => (
                  <div
                    key={permission}
                    className={`p-3 border rounded-lg flex items-center justify-between ${
                      userPermissions.includes(permission)
                        ? 'border-[#10BF0A] bg-[rgba(16,191,10,0.05)]'
                        : 'border-[#E5E7EB] bg-gray-50'
                    }`}
                  >
                    <span className={`text-sm ${
                      userPermissions.includes(permission) ? 'text-black dark:text-white' : 'text-[#6C6C6C]'
                    }`}>
                      {permission}
                    </span>
                    {userPermissions.includes(permission) ? (
                      <CheckCircle className="w-4 h-4 text-[#10BF0A]" />
                    ) : (
                      <div className="w-4 h-4 border border-[#E5E7EB] rounded"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-black dark:text-white">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-black dark:text-white">Password</h4>
                      <p className="text-sm text-[#6C6C6C]">Last changed 3 days ago</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border border-[#E5E7EB] text-[#6C6C6C] rounded text-sm hover:bg-white dark:hover:bg-gray-700 transition-colors">
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                      <button
                        onClick={() => onResetPassword(user.id)}
                        className="px-3 py-1 bg-[#10BF0A] text-white rounded text-sm hover:bg-[#0EA50A] transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-black dark:text-white">Two-Factor Authentication</h4>
                      <p className="text-sm text-[#6C6C6C]">Add an extra layer of security</p>
                    </div>
                    <button className="px-3 py-1 border border-[#E5E7EB] text-[#6C6C6C] rounded text-sm hover:bg-white dark:hover:bg-gray-700 transition-colors">
                      Enable
                    </button>
                  </div>
                </div>

                <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-black dark:text-white">Session Management</h4>
                      <p className="text-sm text-[#6C6C6C]">Manage active sessions</p>
                    </div>
                    <button className="px-3 py-1 border border-[#E5E7EB] text-[#6C6C6C] rounded text-sm hover:bg-white dark:hover:bg-gray-700 transition-colors">
                      View Sessions
                    </button>
                  </div>
                </div>
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
              onClick={() => onResetPassword(user.id)}
              className="px-4 py-2 border border-[#E5E7EB] text-black dark:text-white rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              Reset Password
            </button>
            <button
              onClick={() => onEdit(user)}
              className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors"
            >
              Edit User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
