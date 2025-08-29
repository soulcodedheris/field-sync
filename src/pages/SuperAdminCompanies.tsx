import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  Building,
  Users,
  Briefcase,
  TrendingDown,
  TrendingUp,
  Eye,
  Trash
} from 'lucide-react';
import { CompanyDetailsModal } from '../components/CompanyDetailsModal';
import { CompanyDeleteModal } from '../components/CompanyDeleteModal';
import { CompaniesFilterModal } from '../components/CompaniesFilterModal';
import { CompaniesExportModal } from '../components/CompaniesExportModal';

export const SuperAdminCompanies: React.FC = () => {
  const { user } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState('All Plans');
  
  // Modal states
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<any>(null);

  const handleViewCompany = (company: any) => {
    setSelectedCompany(company);
  };

  const handleEditCompany = (company: any) => {
    console.log('Edit company:', company);
    setSelectedCompany(null);
  };

  const handleDeleteCompany = (companyId: number) => {
    console.log('Delete company:', companyId);
    setCompanyToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleOpenDeleteModal = (company: any) => {
    setCompanyToDelete(company);
    setIsDeleteModalOpen(true);
  };

  const handleSuspendCompany = (companyId: number) => {
    console.log('Suspend company:', companyId);
    setSelectedCompany(null);
  };

  const handleActivateCompany = (companyId: number) => {
    console.log('Activate company:', companyId);
    setSelectedCompany(null);
  };

  const handleFilterApply = (filters: any) => {
    console.log('Applying filters:', filters);
  };

  const handleExport = (config: any) => {
    console.log('Exporting with config:', config);
  };

  const stats = [
    {
      title: 'Total Companies',
      value: '129,000',
      change: '-2',
      changeType: 'decrease',
      icon: Building,
      iconBg: 'bg-[rgba(211,253,210,0.64)]'
    },
    {
      title: 'Active Companies',
      value: '128,997',
      change: '+1',
      changeType: 'increase',
      icon: Building,
      iconBg: 'bg-[rgba(211,253,210,0.64)]'
    },
    {
      title: 'Total Users',
      value: '2,094,891',
      change: '-25',
      changeType: 'decrease',
      icon: Users,
      iconBg: 'bg-[rgba(211,253,210,0.64)]'
    },
    {
      title: 'Total Jobs',
      value: '1,656,329',
      change: '+100',
      changeType: 'increase',
      icon: Briefcase,
      iconBg: 'bg-[rgba(211,253,210,0.64)]'
    }
  ];

  const companies = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      email: 'techcorp@example.com',
      status: 'Active',
      plan: 'Enterprise',
      users: 20,
      jobsPosted: 75,
      avatar: 'TC'
    },
    {
      id: 2,
      name: 'Global Industries',
      email: 'contact@global.com',
      status: 'Pending',
      plan: 'Pro',
      users: 45,
      jobsPosted: 100,
      avatar: 'GI'
    },
    {
      id: 3,
      name: 'StartupSpace',
      email: 'hello@startupspace.io',
      status: 'Cancelled',
      plan: 'Free',
      users: 176,
      jobsPosted: 176,
      avatar: 'SS'
    },
    {
      id: 4,
      name: 'TechCorp Solutions',
      email: 'techcorp@example.com',
      status: 'Suspended',
      plan: 'Enterprise',
      users: 176,
      jobsPosted: 196,
      avatar: 'TC'
    },
    {
      id: 5,
      name: 'Global Industries',
      email: 'contact@global.com',
      status: 'Active',
      plan: 'Pro',
      users: 176,
      jobsPosted: 116,
      avatar: 'GI'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-[#DCFBE9] text-[#2ECC71]';
      case 'Pending':
        return 'bg-[#FFEFD7] text-[#F39C12]';
      case 'Cancelled':
        return 'bg-[#FFDFDF] text-[#DC2626]';
      case 'Suspended':
        return 'bg-[rgba(202,202,202,0.8)] text-gray-600 dark:text-gray-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise':
        return 'bg-[#E6D0F8] text-[#6B21A8]';
      case 'Pro':
        return 'bg-[#FFEDD5] text-[#9A3412]';
      case 'Free':
        return 'bg-[#EBEBEB] text-gray-600 dark:text-gray-400';
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
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Companies</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white mt-2">Manage all registered companies and their activity</p>
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
                  <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">compared to last week</span>
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

            {/* Status Filter */}
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="hidden sm:inline">All Status</span>
              <span className="sm:hidden">Status</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Plan Filter */}
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <span className="hidden sm:inline">All Plans</span>
              <span className="sm:hidden">Plans</span>
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

      {/* Companies List */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          {companies.map((company) => (
            <div 
              key={company.id} 
              className="border border-[#E1E1E1] rounded-lg p-4 sm:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              onClick={() => handleViewCompany(company)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-6">
                {/* Company Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#10BF0A] rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base text-white font-medium">{company.avatar}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm sm:text-base font-medium text-black dark:text-white break-words">{company.name}</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">{company.email}</div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs ${getStatusColor(company.status)}`}>
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                    {company.status}
                  </span>
                </div>

                {/* Plan */}
                <div className="flex items-center">
                  <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs ${getPlanColor(company.plan)}`}>
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                    {company.plan}
                  </span>
                </div>

                {/* Users */}
                <div className="flex items-center">
                  <span className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400">{company.users}</span>
                </div>

                {/* Jobs Posted */}
                <div className="flex items-center">
                  <span className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400">{company.jobsPosted}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewCompany(company);
                    }}
                    className="p-1 sm:p-2 border border-[#E5E7EB] rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDeleteModal(company);
                    }}
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
          <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1 to 5 of 847 results</span>
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

      {/* Company Details Modal */}
      <CompanyDetailsModal
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        company={selectedCompany}
        onEdit={handleEditCompany}
        onDelete={handleDeleteCompany}
        onSuspend={handleSuspendCompany}
        onActivate={handleActivateCompany}
      />

      {/* Additional Modals */}
      <CompaniesFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleFilterApply}
      />

      <CompaniesExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />

      <CompanyDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteCompany}
        company={companyToDelete}
      />
    </div>
  );
};
