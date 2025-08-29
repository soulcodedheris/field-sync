import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  CheckCircle,
  DollarSign,
  Search,
  Filter,
  ChevronDown,
  Download,
  Edit,
  Trash,
  Flag,
  Circle,
  Plus,
  ChevronRight,
  ChevronDown as ChevronDownIcon
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';
import { JobIcon, WorkOrderIcon } from '../assets/icons';
import AssignmentPopup from '../components/AssignmentPopup';
import { JobEditModal } from '../components/JobEditModal';
import { JobDeleteModal } from '../components/JobDeleteModal';
import { BulkActionsModal } from '../components/BulkActionsModal';
import { TechnicianAssignmentModal } from '../components/TechnicianAssignmentModal';
import { ExportModal } from '../components/ExportModal';
import { JobStatusFilterModal } from '../components/JobStatusFilterModal';
import type { Job, WorkOrder } from '../types';

export const AdminJobManagement: React.FC = () => {
  const { user } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [selectedWorkOrders, setSelectedWorkOrders] = useState<string[]>([]);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);
  const [deletingJob, setDeletingJob] = useState<any>(null);
  const [isBulkActionsOpen, setIsBulkActionsOpen] = useState(false);
  const [isTechnicianAssignmentOpen, setIsTechnicianAssignmentOpen] = useState(false);
  const [selectedJobForAssignment, setSelectedJobForAssignment] = useState<any>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isStatusFilterModalOpen, setIsStatusFilterModalOpen] = useState(false);
  
  // New state for hierarchy toggle
  const [isHierarchicalView, setIsHierarchicalView] = useState(false);
  const [expandedJobs, setExpandedJobs] = useState<string[]>([]);

  const handleEditJob = (job: any) => {
    setEditingJob(job);
  };

  const handleDeleteJob = (job: any) => {
    setDeletingJob(job);
  };

  const handleSaveJob = (updatedJob: any) => {
    console.log('Saving job:', updatedJob);
    setEditingJob(null);
  };

  const handleConfirmDelete = () => {
    if (deletingJob) {
      console.log('Deleting job:', deletingJob.id);
      setDeletingJob(null);
    }
  };

  const handleBulkAction = (action: string, data?: any) => {
    console.log('Bulk action:', action, 'for jobs:', selectedJobs, 'with data:', data);
    setSelectedJobs([]);
    setIsBulkActionsOpen(false);
  };

  const handleAssignTechnician = (job: any) => {
    setSelectedJobForAssignment(job);
    setIsTechnicianAssignmentOpen(true);
  };

  const handleTechnicianAssignment = (jobId: string, technicianId: string) => {
    console.log('Assigning technician', technicianId, 'to job', jobId);
    setIsTechnicianAssignmentOpen(false);
    setSelectedJobForAssignment(null);
  };

  const handleExport = (exportData: any) => {
    console.log('Exporting data:', exportData);
  };

  const handleStatusFilter = () => {
    setIsStatusFilterModalOpen(true);
  };

  const handlePriorityFilter = () => {
    setIsStatusFilterModalOpen(true);
  };

  const handleApplyFilters = (filters: any) => {
    console.log('Applying filters:', filters);
  };

  const statCards = [
    {
      title: 'Scheduled',
      value: '12',
      change: '-2',
      changeType: 'decrease',
      comparison: 'compared to last week',
      icon: Calendar,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'In Progress',
      value: '200',
      change: '+1',
      changeType: 'increase',
      comparison: 'compared to last week',
      icon: Clock,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Completed',
      value: '65',
      change: '2.5hrs',
      changeType: 'decrease',
      comparison: 'compared to last week',
      icon: CheckCircle,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Revenue',
      value: '$48.2K',
      change: '10%',
      changeType: 'increase',
      comparison: 'compared to last week',
      icon: DollarSign,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    }
  ];

  // Sample data with proper Job/WorkOrder hierarchy
  const jobsData: Job[] = [
    {
      id: 'JOB-2024-001',
      name: 'HVAC System Installation',
      jobType: 'installation',
      status: 'active',
      clientName: 'Acme Corp',
      clientContact: 'John Smith',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      budget: 15000,
      primaryLocation: '123 Main St, Downtown',
      jobsites: [],
      checklistTemplates: [],
      workOrders: [
        {
          id: 'WO-2024-001-01',
          jobId: 'JOB-2024-001',
          title: 'Ductwork Installation',
          description: 'Install main ductwork system',
          type: 'install',
          priority: 'high',
          status: 'in_progress',
          scheduledStart: '2024-01-15T14:00:00Z',
          scheduledEnd: '2024-01-15T16:00:00Z',
          estimatedMinutes: 120,
          primaryTechnician: {
            id: 'tech-001',
            name: 'John Doe',
            avatar: userAvatar1
          },
          additionalTechnicians: [],
          timeEntries: [],
          evidence: [],
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        },
        {
          id: 'WO-2024-001-02',
          jobId: 'JOB-2024-001',
          title: 'Electrical Wiring',
          description: 'Install electrical components and wiring',
          type: 'install',
          priority: 'medium',
          status: 'to_do',
          scheduledStart: '2024-01-16T09:00:00Z',
          scheduledEnd: '2024-01-16T10:30:00Z',
          estimatedMinutes: 90,
          primaryTechnician: {
            id: 'tech-002',
            name: 'Sarah Johnson',
            avatar: userAvatar2
          },
          additionalTechnicians: [],
          timeEntries: [],
          evidence: [],
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15'
        }
      ],
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15'
    },
    {
      id: 'JOB-2024-002',
      name: 'Office Renovation',
      jobType: 'maintenance',
      status: 'active',
      clientName: 'TechStart Inc',
      clientContact: 'Lisa Chen',
      startDate: '2024-02-01',
      budget: 25000,
      primaryLocation: '456 Innovation Ave, Tech District',
      jobsites: [],
      checklistTemplates: [],
      workOrders: [
        {
          id: 'WO-2024-002-01',
          jobId: 'JOB-2024-002',
          title: 'Demolition Work',
          description: 'Remove existing walls and fixtures',
          type: 'maintenance',
          priority: 'medium',
          status: 'to_do',
          scheduledStart: '2024-01-27T08:00:00Z',
          scheduledEnd: '2024-01-27T12:00:00Z',
          estimatedMinutes: 240,
          primaryTechnician: {
            id: 'tech-003',
            name: 'Mike Davis',
            avatar: userAvatar3
          },
          additionalTechnicians: [],
          timeEntries: [],
          evidence: [],
          createdAt: '2024-01-20',
          updatedAt: '2024-01-20'
        }
      ],
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20'
    }
  ];

  // Flatten work orders for flat view
  const allWorkOrders: WorkOrder[] = jobsData.flatMap(job => job.workOrders);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
      case 'High':
      case 'urgent':
      case 'Urgent':
        return 'bg-[#FFDFDF] text-[#DC2626]';
      case 'medium':
      case 'Medium':
        return 'bg-[#FFEFD7] text-[#F39C12]';
      case 'low':
      case 'Low':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-[#FFEFD7] text-[#F39C12] border-[#F39C12]';
      case 'To-do':
        return 'bg-[rgba(202,202,202,0.8)] text-gray-600 dark:text-gray-400 border-[#6C6C6C]';
      case 'Completed':
        return 'bg-[#DCFBE9] text-[#2ECC71] border-[#2ECC71]';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  const handleSelectAll = () => {
    if (isHierarchicalView) {
      if (selectedJobs.length === jobsData.length) {
        setSelectedJobs([]);
      } else {
        setSelectedJobs(jobsData.map(job => job.id));
      }
    } else {
      if (selectedWorkOrders.length === allWorkOrders.length) {
        setSelectedWorkOrders([]);
      } else {
        setSelectedWorkOrders(allWorkOrders.map(wo => wo.id));
      }
    }
  };

  const handleSelectJob = (jobId: string) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    } else {
      setSelectedJobs([...selectedJobs, jobId]);
    }
  };

  const handleSelectWorkOrder = (workOrderId: string) => {
    if (selectedWorkOrders.includes(workOrderId)) {
      setSelectedWorkOrders(selectedWorkOrders.filter(id => id !== workOrderId));
    } else {
      setSelectedWorkOrders([...selectedWorkOrders, workOrderId]);
    }
  };

  const toggleJobExpansion = (jobId: string) => {
    if (expandedJobs.includes(jobId)) {
      setExpandedJobs(expandedJobs.filter(id => id !== jobId));
    } else {
      setExpandedJobs([...expandedJobs, jobId]);
    }
  };

  const isJobExpanded = (jobId: string) => expandedJobs.includes(jobId);

  return (
    <div className="sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="pl-0 sm:pl-4">
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Job Management</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white mt-2">Manage work orders, schedule jobs, and track progress</p>
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

      {/* Search and Filter Controls */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="space-y-4">
          {/* Search and Filters Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="search...."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button 
                onClick={handleStatusFilter}
                className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="hidden sm:inline">All Status</span>
                <span className="sm:hidden">Status</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button 
                onClick={handlePriorityFilter}
                className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="hidden sm:inline">All Priority</span>
                <span className="sm:hidden">Priority</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm hover:bg-[#0EA50A] transition-colors">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {isHierarchicalView ? jobsData.length : allWorkOrders.length} {isHierarchicalView ? 'jobs' : 'work orders'}
              </div>
              {/* Hierarchy Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
                <button
                  onClick={() => setIsHierarchicalView(false)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    !isHierarchicalView
                      ? 'bg-[#10BF0A] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Flat
                </button>
                <button
                  onClick={() => setIsHierarchicalView(true)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    isHierarchicalView
                      ? 'bg-[#10BF0A] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Hierarchy
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {(selectedJobs.length > 0 || selectedWorkOrders.length > 0) && (
                <button 
                  onClick={() => setIsBulkActionsOpen(true)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    Bulk Actions ({isHierarchicalView ? selectedJobs.length : selectedWorkOrders.length})
                  </span>
                  <span className="sm:hidden">
                    Bulk ({isHierarchicalView ? selectedJobs.length : selectedWorkOrders.length})
                  </span>
                </button>
              )}
              <button 
                onClick={() => setIsExportModalOpen(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button 
                onClick={() => setIsAssignmentModalOpen(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm font-medium hover:bg-[#0EA50A] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Assign Job</span>
                <span className="sm:hidden">Assign</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Table */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
        {/* Table Tabs */}
        <div className="border-b border-[#E5E7EB]">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setSelectedTab('all')}
              className={`px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap ${
                selectedTab === 'all'
                  ? 'text-[#10BF0A] border-b-2 border-[#10BF0A]'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span className="hidden sm:inline">All Jobs</span>
              <span className="sm:hidden">All</span>
            </button>
            <button
              onClick={() => setSelectedTab('urgent')}
              className={`px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap ${
                selectedTab === 'urgent'
                  ? 'text-[#10BF0A] border-b-2 border-[#10BF0A]'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span className="hidden sm:inline">Urgent Only</span>
              <span className="sm:hidden">Urgent</span>
            </button>
            <button
              onClick={() => setSelectedTab('completed')}
              className={`px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap ${
                selectedTab === 'completed'
                  ? 'text-[#10BF0A] border-b-2 border-[#10BF0A]'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span className="hidden sm:inline">Completed Jobs</span>
              <span className="sm:hidden">Completed</span>
            </button>
          </div>
        </div>

        {/* Mobile Cards - Hidden on lg+ screens */}
        <div className="lg:hidden p-4 space-y-4">
          {isHierarchicalView ? (
            // Hierarchical Mobile View
            jobsData.map((job) => (
              <div key={job.id} className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg overflow-hidden">
                {/* Job Header */}
                <div className="p-4 border-b border-[#E5E7EB]">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job.id)}
                      onChange={() => handleSelectJob(job.id)}
                      className="w-5 h-5 border-2 border-[#EBEBEB] rounded mt-1 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <JobIcon className="w-5 h-5 text-blue-600" />
                        <h3 className="font-medium text-black dark:text-white text-base">{job.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{job.id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{job.clientName}</p>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => toggleJobExpansion(job.id)}
                        className="p-2 border border-[#E5E7EB] rounded hover:bg-gray-50 transition-colors"
                      >
                        {isJobExpanded(job.id) ? (
                          <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                      <button 
                        onClick={() => handleEditJob(job)}
                        className="p-2 border border-[#E5E7EB] rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Job Status and Priority */}
                  <div className="flex items-center gap-3 mt-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getPriorityColor('medium')}`}>
                      <Flag className="w-3 h-3" />
                      Medium
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(job.status)}`}>
                      <Circle className="w-2 h-2 fill-current" />
                      {job.status}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {job.workOrders.length} work orders
                    </span>
                  </div>
                </div>

                {/* Work Orders (if expanded) */}
                {isJobExpanded(job.id) && (
                  <div className="bg-gray-50 dark:bg-gray-900">
                    {job.workOrders.map((workOrder) => (
                      <div key={workOrder.id} className="p-4 border-b border-[#E5E7EB] last:border-b-0">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={selectedWorkOrders.includes(workOrder.id)}
                            onChange={() => handleSelectWorkOrder(workOrder.id)}
                            className="w-4 h-4 border-2 border-[#EBEBEB] rounded mt-1 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <WorkOrderIcon className="w-4 h-4 text-[#10BF0A]" />
                              <h4 className="font-medium text-black dark:text-white text-sm">{workOrder.title}</h4>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{workOrder.id}</p>
                          </div>
                          <div className="flex gap-1">
                            <button 
                              onClick={() => handleAssignTechnician(workOrder)}
                              className="p-1 border border-[#E5E7EB] rounded hover:bg-blue-50 transition-colors"
                            >
                              <Plus className="w-3 h-3 text-[#3B82F6]" />
                            </button>
                            <button 
                              onClick={() => handleEditJob(workOrder)}
                              className="p-1 border border-[#E5E7EB] rounded hover:bg-gray-50 transition-colors"
                            >
                              <Edit className="w-3 h-3 text-gray-600" />
                            </button>
                          </div>
                        </div>

                        {/* Work Order Details */}
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={workOrder.primaryTechnician.avatar}
                              alt={`${workOrder.primaryTechnician.name} avatar`}
                              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                            <div>
                              <p className="text-sm font-medium text-black dark:text-white">{workOrder.primaryTechnician.name}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">Technician</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getPriorityColor(workOrder.priority)}`}>
                              <Flag className="w-2 h-2" />
                              {workOrder.priority}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(workOrder.status)}`}>
                              <Circle className="w-2 h-2 fill-current" />
                              {workOrder.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            // Flat Mobile View (Work Orders)
            allWorkOrders.map((workOrder) => (
              <div key={workOrder.id} className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
                <div className="space-y-4">
                  {/* Header Row - Checkbox and Work Order Title */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={selectedWorkOrders.includes(workOrder.id)}
                      onChange={() => handleSelectWorkOrder(workOrder.id)}
                      className="w-5 h-5 border-2 border-[#EBEBEB] rounded mt-1 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <WorkOrderIcon className="w-4 h-4 text-[#10BF0A]" />
                        <h3 className="font-medium text-black dark:text-white text-base">{workOrder.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{workOrder.id}</p>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleAssignTechnician(workOrder)}
                        className="p-2 border border-[#E5E7EB] rounded hover:bg-blue-50 transition-colors"
                        title="Assign Technician"
                      >
                        <Plus className="w-4 h-4 text-[#3B82F6]" />
                      </button>
                      <button 
                        onClick={() => handleEditJob(workOrder)}
                        className="p-2 border border-[#E5E7EB] rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button 
                        onClick={() => handleDeleteJob(workOrder)}
                        className="p-2 border border-[#E5E7EB] rounded hover:bg-red-50 transition-colors"
                      >
                        <Trash className="w-4 h-4 text-[#F44336]" />
                      </button>
                    </div>
                  </div>

                  {/* Technician Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={workOrder.primaryTechnician.avatar}
                      alt={`${workOrder.primaryTechnician.name} avatar`}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-black dark:text-white">{workOrder.primaryTechnician.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Technician</p>
                    </div>
                  </div>

                  {/* Job Info */}
                  <div className="border-t border-[#E5E7EB] pt-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-black dark:text-white">
                          {jobsData.find(job => job.id === workOrder.jobId)?.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {jobsData.find(job => job.id === workOrder.jobId)?.clientName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status, Priority, Cost, Schedule */}
                  <div className="grid grid-cols-2 gap-3 border-t border-[#E5E7EB] pt-3">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Priority</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getPriorityColor(workOrder.priority)}`}>
                        <Flag className="w-3 h-3" />
                        {workOrder.priority}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Status</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(workOrder.status)}`}>
                        <Circle className="w-2 h-2 fill-current" />
                        {workOrder.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Cost</p>
                      <p className="text-sm font-medium text-black dark:text-white">—</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Schedule</p>
                      <div>
                        <p className="text-sm text-black dark:text-white">{new Date(workOrder.scheduledStart).toLocaleString()}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{new Date(workOrder.scheduledEnd).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table - Hidden on mobile */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFC]">
              <tr>
                <th className="px-4 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={
                      isHierarchicalView 
                        ? selectedJobs.length === jobsData.length
                        : selectedWorkOrders.length === allWorkOrders.length
                    }
                    onChange={handleSelectAll}
                    className="w-5 h-5 border-2 border-[#EBEBEB] rounded"
                  />
                </th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">
                  {isHierarchicalView ? 'Job Details' : 'Work Order Details'}
                </th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Technician</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Client</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Priority</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Status</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Cost</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Schedule</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isHierarchicalView ? (
                // Hierarchical Desktop View
                jobsData.map((job) => (
                  <React.Fragment key={job.id}>
                    {/* Job Row */}
                    <tr className="border-b border-[#E5E7EB] bg-gray-50 dark:bg-gray-900">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedJobs.includes(job.id)}
                          onChange={() => handleSelectJob(job.id)}
                          className="w-5 h-5 border-2 border-[#EBEBEB] rounded"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleJobExpansion(job.id)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                          >
                            {isJobExpanded(job.id) ? (
                              <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-600" />
                            )}
                          </button>
                          <JobIcon className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-medium text-black dark:text-white">{job.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{job.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {job.workOrders.length} technicians
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium text-black dark:text-white">{job.clientName}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{job.primaryLocation}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">—</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(job.status)}`}>
                          <Circle className="w-2 h-2 fill-current" />
                          {job.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-black dark:text-white">
                        —
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-sm text-black dark:text-white">
                            {job.startDate ? new Date(job.startDate).toLocaleDateString() : 'TBD'}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {job.workOrders.length} work orders
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleEditJob(job)}
                            className="p-1 border border-[#E5E7EB] rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Work Order Rows (if expanded) */}
                    {isJobExpanded(job.id) && job.workOrders.map((workOrder) => (
                      <tr key={workOrder.id} className="border-b border-[#E5E7EB] bg-white dark:bg-gray-800">
                        <td className="px-4 py-4 pl-12">
                          <input
                            type="checkbox"
                            checked={selectedWorkOrders.includes(workOrder.id)}
                            onChange={() => handleSelectWorkOrder(workOrder.id)}
                            className="w-4 h-4 border-2 border-[#EBEBEB] rounded"
                          />
                        </td>
                        <td className="px-4 py-4 pl-12">
                          <div className="flex items-center gap-3">
                            <WorkOrderIcon className="w-4 h-4 text-[#10BF0A]" />
                            <div>
                              <div className="font-medium text-black dark:text-white">{workOrder.title}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{workOrder.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={workOrder.primaryTechnician.avatar}
                              alt={`${workOrder.primaryTechnician.name} avatar`}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div className="text-sm text-black dark:text-white">{workOrder.primaryTechnician.name}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {job.clientName}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-medium ${getPriorityColor(workOrder.priority)}`}>
                            <Flag className="w-3 h-3" />
                            {workOrder.priority}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(workOrder.status)}`}>
                            <Circle className="w-2 h-2 fill-current" />
                            {workOrder.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-black dark:text-white">
                          —
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <div className="text-sm text-black dark:text-white">{new Date(workOrder.scheduledStart).toLocaleString()}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{new Date(workOrder.scheduledEnd).toLocaleString()}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleAssignTechnician(workOrder)}
                              className="p-1 border border-[#E5E7EB] rounded hover:bg-blue-50 transition-colors"
                              title="Assign Technician"
                            >
                              <Plus className="w-4 h-4 text-[#3B82F6]" />
                            </button>
                            <button 
                              onClick={() => handleEditJob(workOrder)}
                              className="p-1 border border-[#E5E7EB] rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button 
                              onClick={() => handleDeleteJob(workOrder)}
                              className="p-1 border border-[#E5E7EB] rounded hover:bg-red-50 transition-colors"
                            >
                              <Trash className="w-4 h-4 text-[#F44336]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                // Flat Desktop View (Work Orders)
                allWorkOrders.map((workOrder) => {
                  const parentJob = jobsData.find(job => job.id === workOrder.jobId);
                  return (
                    <tr key={workOrder.id} className="border-b border-[#E5E7EB]">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedWorkOrders.includes(workOrder.id)}
                          onChange={() => handleSelectWorkOrder(workOrder.id)}
                          className="w-5 h-5 border-2 border-[#EBEBEB] rounded"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <WorkOrderIcon className="w-4 h-4 text-[#10BF0A]" />
                          <div>
                            <div className="font-medium text-black dark:text-white">{workOrder.title}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{workOrder.id}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              Job: {parentJob?.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={workOrder.primaryTechnician.avatar}
                            alt={`${workOrder.primaryTechnician.name} avatar`}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="text-sm text-black dark:text-white">{workOrder.primaryTechnician.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium text-black dark:text-white">{parentJob?.clientName}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{parentJob?.primaryLocation}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-medium ${getPriorityColor(workOrder.priority)}`}>
                          <Flag className="w-3 h-3" />
                          {workOrder.priority}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(workOrder.status)}`}>
                          <Circle className="w-2 h-2 fill-current" />
                          {workOrder.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-black dark:text-white">
                        —
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="text-sm text-black dark:text-white">{new Date(workOrder.scheduledStart).toLocaleString()}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{new Date(workOrder.scheduledEnd).toLocaleString()}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleAssignTechnician(workOrder)}
                            className="p-1 border border-[#E5E7EB] rounded hover:bg-blue-50 transition-colors"
                            title="Assign Technician"
                          >
                            <Plus className="w-4 h-4 text-[#3B82F6]" />
                          </button>
                          <button 
                            onClick={() => handleEditJob(workOrder)}
                            className="p-1 border border-[#E5E7EB] rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                          <button 
                            onClick={() => handleDeleteJob(workOrder)}
                            className="p-1 border border-[#E5E7EB] rounded hover:bg-red-50 transition-colors"
                          >
                            <Trash className="w-4 h-4 text-[#F44336]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
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
            <button 
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-3 sm:px-4 h-8 border border-[#EBEBEB] text-gray-600 dark:text-gray-400 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Assignment Popup Modal */}
      <AssignmentPopup 
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
      />

      {/* Job Edit Modal */}
      <JobEditModal
        isOpen={!!editingJob}
        onClose={() => setEditingJob(null)}
        onSave={handleSaveJob}
        job={editingJob}
      />

      {/* Job Delete Modal */}
      <JobDeleteModal
        isOpen={!!deletingJob}
        onClose={() => setDeletingJob(null)}
        onConfirm={handleConfirmDelete}
        job={deletingJob}
      />

      {/* Bulk Actions Modal */}
      <BulkActionsModal
        isOpen={isBulkActionsOpen}
        onClose={() => setIsBulkActionsOpen(false)}
        selectedJobs={selectedJobs}
        onApplyBulkAction={handleBulkAction}
      />

      {/* Technician Assignment Modal */}
      <TechnicianAssignmentModal
        isOpen={isTechnicianAssignmentOpen}
        onClose={() => setIsTechnicianAssignmentOpen(false)}
        onAssign={handleTechnicianAssignment}
        jobId={selectedJobForAssignment?.id || ''}
        technicians={[
          { id: '1', name: 'John Doe', status: 'Available', currentJobs: 2 },
          { id: '2', name: 'Jane Smith', status: 'Busy', currentJobs: 3 },
          { id: '3', name: 'Mike Johnson', status: 'Available', currentJobs: 1 }
        ]}
      />

      {/* Job Status Filter Modal */}
      <JobStatusFilterModal
        isOpen={isStatusFilterModalOpen}
        onClose={() => setIsStatusFilterModalOpen(false)}
        onApply={handleApplyFilters}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  );
};

