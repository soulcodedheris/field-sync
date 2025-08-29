import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  Users,
  Building,
  Lock,
  TrendingDown,
  TrendingUp,
  Eye,
  Trash
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';
import { UserManagementModal } from '../components/UserManagementModal';
import { UserEditModal } from '../components/UserEditModal';
import { UserDeleteModal } from '../components/UserDeleteModal';
import { UserSuspendModal } from '../components/UserSuspendModal';
import { UserActivateModal } from '../components/UserActivateModal';
import { UserResetPasswordModal } from '../components/UserResetPasswordModal';

export const SuperAdminUserManagement: React.FC = () => {
  const { user } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedCompany, setSelectedCompany] = useState('All Company');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  
  // Modal states for user actions
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [userToAction, setUserToAction] = useState<any>(null);

  const stats = [
    {
      title: 'Total Users',
      value: '129,000',
      change: '-2',
      changeType: 'decrease',
      icon: Users,
      iconBg: 'bg-[rgba(211,253,210,0.64)]'
    },
    {
      title: 'Active Users',
      value: '128,997',
      change: '+1',
      changeType: 'increase',
      icon: Users,
      iconBg: 'bg-[rgba(211,253,210,0.64)]'
    },
    {
      title: 'Company',
      value: '209,481',
      change: '-25',
      changeType: 'decrease',
      icon: Building,
      iconBg: 'bg-[rgba(211,253,210,0.64)]'
    },
    {
      title: 'Suspended',
      value: '16',
      change: '+10',
      changeType: 'increase',
      icon: Lock,
      iconBg: 'bg-[rgba(211,253,210,0.64)]'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@techcorp.com',
      status: 'Active',
      company: {
        name: 'TechCorp Solutions',
        email: 'techcorp@example.com',
        avatar: 'TC'
      },
      users: 20,
      jobsPosted: 75,
      avatar: userAvatar1
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@global.com',
      status: 'Suspended',
      company: {
        name: 'Global Industries',
        email: 'contact@global.com',
        avatar: 'GI'
      },
      users: 45,
      jobsPosted: 100,
      avatar: userAvatar2
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@startupspace.io',
      status: 'Suspended',
      company: {
        name: 'StartupSpace',
        email: 'hello@startupspace.io',
        avatar: 'SS'
      },
      users: 176,
      jobsPosted: 176,
      avatar: userAvatar3
    },
    {
      id: 4,
      name: 'Sarah Chen',
      email: 'sarah.chen@techcorp.com',
      status: 'Active',
      company: {
        name: 'TechCorp Solutions',
        email: 'techcorp@example.com',
        avatar: 'TC'
      },
      users: 176,
      jobsPosted: 196,
      avatar: userAvatar1
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.wilson@global.com',
      status: 'Active',
      company: {
        name: 'Global Industries',
        email: 'contact@global.com',
        avatar: 'GI'
      },
      users: 176,
      jobsPosted: 116,
      avatar: userAvatar2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-[#DCFBE9] text-[#2ECC71]';
      case 'Suspended':
        return 'bg-[rgba(202,202,202,0.8)] text-gray-600 dark:text-gray-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user: any) => {
    setUserToAction(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    setUserToAction(user);
    setIsDeleteModalOpen(true);
  };

  const handleSuspendUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    setUserToAction(user);
    setIsSuspendModalOpen(true);
  };

  const handleActivateUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    setUserToAction(user);
    setIsActivateModalOpen(true);
  };

  const handleResetPassword = (userId: number) => {
    const user = users.find(u => u.id === userId);
    setUserToAction(user);
    setIsResetPasswordModalOpen(true);
  };

  const handleSaveUser = (userData: any) => {
    console.log('Save user:', userData);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = (userId: number) => {
    console.log('Confirm delete user:', userId);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmSuspend = (userId: number) => {
    console.log('Confirm suspend user:', userId);
    setIsSuspendModalOpen(false);
  };

  const handleConfirmActivate = (userId: number) => {
    console.log('Confirm activate user:', userId);
    setIsActivateModalOpen(false);
  };

  const handleConfirmResetPassword = (userId: number, newPassword: string) => {
    console.log('Confirm reset password for user:', userId, 'New password:', newPassword);
    setIsResetPasswordModalOpen(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="bg-[rgba(0,0,0,0)] pl-0 sm:pl-4">
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">User Management</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white">Manage all users across the platform</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-lg text-black dark:text-white truncate">{stat.title}</h3>
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
                  <span className="text-xs text-[rgba(0,0,0,0.35)]">compared to last week</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.iconBg}`}>
                <stat.icon className="w-6 h-6 text-[#10BF0A]" />
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

            {/* Role Filter */}
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="hidden sm:inline">All Roles</span>
              <span className="sm:hidden">Roles</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Company Filter */}
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="hidden sm:inline">All Companies</span>
              <span className="sm:hidden">Companies</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Status Filter */}
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="hidden sm:inline">All Status</span>
              <span className="sm:hidden">Status</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Filter Button */}
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm hover:bg-[#0EA50A] transition-colors">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>

            {/* Export Button */}
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {users.map((user) => (
            <div key={user.id} className="border border-[#E1E1E1] rounded-lg p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-6">
                {/* User Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3">
                    {typeof user.avatar === 'string' ? (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#10BF0A] rounded-full flex items-center justify-center">
                        <span className="text-sm sm:text-base text-white font-medium">{user.avatar}</span>
                      </div>
                    ) : (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="text-sm sm:text-base font-medium text-black dark:text-white break-words">{user.name}</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">{user.email}</div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs ${getStatusColor(user.status)}`}>
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                    {user.status}
                  </span>
                </div>

                {/* Company */}
                <div className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#10BF0A] rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base text-white font-medium">{user.company.avatar}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm sm:text-base font-medium text-black dark:text-white break-words">{user.company.name}</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">{user.company.email}</div>
                    </div>
                  </div>
                </div>

                {/* Users */}
                <div className="flex items-center">
                  <span className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400">{user.users}</span>
                </div>

                {/* Jobs Posted */}
                <div className="flex items-center">
                  <span className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400">{user.jobsPosted}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleViewUser(user)}
                    className="p-1 sm:p-2 border border-[#E5E7EB] rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-1 sm:p-2 border border-[#E5E7EB] rounded hover:bg-red-50 transition-colors"
                  >
                    <Trash className="w-4 h-4 text-[#F44336]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 sm:pt-6 border-t border-[#EBEBEB] mt-4 sm:mt-6">
          <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1 to 3 of 847 results</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-[#10BF0A] text-white rounded text-sm hover:bg-[#0EA50A] transition-colors">1</button>
            <button className="px-3 py-1 border border-[#EBEBEB] rounded text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">2</button>
            <button className="px-3 py-1 border border-[#EBEBEB] rounded text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">3</button>
            <button 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-3 py-1 border border-[#EBEBEB] rounded text-sm text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* User Management Modal */}
      <UserManagementModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onSuspend={handleSuspendUser}
        onActivate={handleActivateUser}
        onResetPassword={handleResetPassword}
        user={selectedUser}
      />

      {/* User Action Modals */}
      <UserEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveUser}
        user={userToAction}
      />

      <UserDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        user={userToAction}
      />

      <UserSuspendModal
        isOpen={isSuspendModalOpen}
        onClose={() => setIsSuspendModalOpen(false)}
        onConfirm={handleConfirmSuspend}
        user={userToAction}
      />

      <UserActivateModal
        isOpen={isActivateModalOpen}
        onClose={() => setIsActivateModalOpen(false)}
        onConfirm={handleConfirmActivate}
        user={userToAction}
      />

      <UserResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
        onConfirm={handleConfirmResetPassword}
        user={userToAction}
      />
    </div>
  );
};

