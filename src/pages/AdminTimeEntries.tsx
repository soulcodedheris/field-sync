import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  Search,
  Filter,
  ChevronDown,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  User,
  MapPin,
  Calendar,
  AlertCircle,
  Eye,
  Edit,
  MoreHorizontal,
  Plus,
  RefreshCw,
  X
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';
import type { TimeEntry } from '../types';

export const AdminTimeEntries: React.FC = () => {
  const { user } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState('pending');
  const [selectedTimeEntries, setSelectedTimeEntries] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedTechnician, setSelectedTechnician] = useState('All Technicians');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isBulkActionsOpen, setIsBulkActionsOpen] = useState(false);
  const [viewingTimeEntry, setViewingTimeEntry] = useState<TimeEntry | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Mock time entries data
  const timeEntries: TimeEntry[] = [
    {
      id: '1',
      workOrderId: 'WO-001',
      technicianId: 'tech-1',
      technician: {
        id: 'tech-1',
        name: 'John Doe',
        avatar: userAvatar1
      },
      clockIn: '2024-01-15T08:00:00Z',
      clockOut: '2024-01-15T17:00:00Z',
      duration: 540, // 9 hours in minutes
      status: 'pending',
      notes: 'Completed HVAC maintenance at downtown office. Replaced air filters and cleaned ducts.',
      approvedBy: undefined,
      approvedAt: undefined,
      location: {
        lat: 40.7128,
        lng: -74.0060
      },
      createdAt: '2024-01-15T17:05:00Z',
      updatedAt: '2024-01-15T17:05:00Z'
    },
    {
      id: '2',
      workOrderId: 'WO-002',
      technicianId: 'tech-2',
      technician: {
        id: 'tech-2',
        name: 'Sarah Chen',
        avatar: userAvatar2
      },
      clockIn: '2024-01-15T07:30:00Z',
      clockOut: '2024-01-15T16:30:00Z',
      duration: 540, // 9 hours in minutes
      status: 'approved',
      notes: 'Electrical repair at warehouse. Fixed faulty wiring and installed new circuit breaker.',
      approvedBy: 'admin-1',
      approvedAt: '2024-01-15T18:00:00Z',
      location: {
        lat: 40.7589,
        lng: -73.9851
      },
      createdAt: '2024-01-15T16:35:00Z',
      updatedAt: '2024-01-15T18:00:00Z'
    },
    {
      id: '3',
      workOrderId: 'WO-003',
      technicianId: 'tech-3',
      technician: {
        id: 'tech-3',
        name: 'Mike Johnson',
        avatar: userAvatar3
      },
      clockIn: '2024-01-15T08:15:00Z',
      clockOut: undefined,
      duration: undefined,
      status: 'active',
      notes: 'Currently working on plumbing repair at residential complex.',
      approvedBy: undefined,
      approvedAt: undefined,
      location: {
        lat: 40.7505,
        lng: -73.9934
      },
      createdAt: '2024-01-15T08:20:00Z',
      updatedAt: '2024-01-15T08:20:00Z'
    },
    {
      id: '4',
      workOrderId: 'WO-004',
      technicianId: 'tech-1',
      technician: {
        id: 'tech-1',
        name: 'John Doe',
        avatar: userAvatar1
      },
      clockIn: '2024-01-14T08:00:00Z',
      clockOut: '2024-01-14T17:00:00Z',
      duration: 540,
      status: 'rejected',
      notes: 'HVAC installation at new office building.',
      approvedBy: 'admin-1',
      approvedAt: '2024-01-14T18:30:00Z',
      location: {
        lat: 40.7128,
        lng: -74.0060
      },
      createdAt: '2024-01-14T17:10:00Z',
      updatedAt: '2024-01-14T18:30:00Z'
    }
  ];

  const handleSelectTimeEntry = (timeEntryId: string) => {
    setSelectedTimeEntries(prev => 
      prev.includes(timeEntryId) 
        ? prev.filter(id => id !== timeEntryId)
        : [...prev, timeEntryId]
    );
  };

  const handleSelectAll = () => {
    const filteredEntries = getFilteredTimeEntries();
    if (selectedTimeEntries.length === filteredEntries.length) {
      setSelectedTimeEntries([]);
    } else {
      setSelectedTimeEntries(filteredEntries.map(entry => entry.id));
    }
  };

  const handleApproveTimeEntry = (timeEntryId: string) => {
    console.log('Approving time entry:', timeEntryId);
    // In real implementation, this would call an API
  };

  const handleRejectTimeEntry = (timeEntryId: string) => {
    console.log('Rejecting time entry:', timeEntryId);
    // In real implementation, this would call an API
  };

  const handleBulkApprove = () => {
    console.log('Bulk approving time entries:', selectedTimeEntries);
    setSelectedTimeEntries([]);
    setIsBulkActionsOpen(false);
  };

  const handleBulkReject = () => {
    console.log('Bulk rejecting time entries:', selectedTimeEntries);
    setSelectedTimeEntries([]);
    setIsBulkActionsOpen(false);
  };

  const handleViewTimeEntry = (timeEntry: TimeEntry) => {
    setViewingTimeEntry(timeEntry);
    setIsViewModalOpen(true);
  };

  const handleExport = () => {
    console.log('Exporting time entries');
    setIsExportModalOpen(false);
  };

  const getFilteredTimeEntries = () => {
    return timeEntries.filter(entry => {
      const matchesTab = selectedTab === 'all' || entry.status === selectedTab;
      const matchesSearch = entry.technician.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           entry.workOrderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           entry.notes?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = selectedStatus === 'All Status' || entry.status === selectedStatus.toLowerCase();
      const matchesTechnician = selectedTechnician === 'All Technicians' || entry.technician.name === selectedTechnician;
      
      return matchesTab && matchesSearch && matchesStatus && matchesTechnician;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-[#10BF0A]/10 text-[#10BF0A] border-[#10BF0A]/20';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'active':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return '—';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const filteredTimeEntries = getFilteredTimeEntries();
  const pendingCount = timeEntries.filter(entry => entry.status === 'pending').length;
  const approvedCount = timeEntries.filter(entry => entry.status === 'approved').length;
  const rejectedCount = timeEntries.filter(entry => entry.status === 'rejected').length;
  const activeCount = timeEntries.filter(entry => entry.status === 'active').length;

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900  sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Time Entries</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white">
              Review and approve technician time entries, clock in/out records, and manage payroll data
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Approval</p>
              <p className="text-2xl font-bold text-black dark:text-white">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Approved Today</p>
              <p className="text-2xl font-bold text-black dark:text-white">{approvedCount}</p>
            </div>
            <div className="w-12 h-12 bg-[#10BF0A]/10 dark:bg-[#10BF0A]/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-[#10BF0A] dark:text-[#10BF0A]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Currently Active</p>
              <p className="text-2xl font-bold text-black dark:text-white">{activeCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
              <p className="text-2xl font-bold text-black dark:text-white">{rejectedCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="bg-white dark:bg-gray-800 border border-[rgba(108,108,108,0.5)] dark:border-gray-600 rounded-[10px] h-10 px-3 flex items-center gap-2">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[rgba(108,108,108,0.5)]" />
              <input
                type="text"
                placeholder="Search by technician, work order, or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-base sm:text-lg text-[rgba(108,108,108,0.5)] placeholder-[rgba(108,108,108,0.5)] w-full"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white">
              <span className="truncate">{selectedStatus}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white">
              <span className="truncate">{selectedTechnician}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm sm:text-lg"
            >
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredTimeEntries.length} time entries
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {selectedTimeEntries.length > 0 && (
              <button 
                onClick={() => setIsBulkActionsOpen(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span className="hidden sm:inline">
                  Bulk Actions ({selectedTimeEntries.length})
                </span>
                <span className="sm:hidden">
                  Bulk ({selectedTimeEntries.length})
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
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm font-medium hover:bg-[#0EA50A] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Time Entries Table */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
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
              <span className="hidden sm:inline">All Entries</span>
              <span className="sm:hidden">All</span>
            </button>
            <button
              onClick={() => setSelectedTab('pending')}
              className={`px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap ${
                selectedTab === 'pending'
                  ? 'text-[#10BF0A] border-b-2 border-[#10BF0A]'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span className="hidden sm:inline">Pending Approval</span>
              <span className="sm:hidden">Pending</span>
            </button>
            <button
              onClick={() => setSelectedTab('active')}
              className={`px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap ${
                selectedTab === 'active'
                  ? 'text-[#10BF0A] border-b-2 border-[#10BF0A]'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span className="hidden sm:inline">Active Sessions</span>
              <span className="sm:hidden">Active</span>
            </button>
            <button
              onClick={() => setSelectedTab('approved')}
              className={`px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap ${
                selectedTab === 'approved'
                  ? 'text-[#10BF0A] border-b-2 border-[#10BF0A]'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <span className="hidden sm:inline">Approved</span>
              <span className="sm:hidden">Approved</span>
            </button>
          </div>
        </div>

        {/* Mobile Cards - Hidden on lg+ screens */}
        <div className="lg:hidden p-4 space-y-4">
          {filteredTimeEntries.map((timeEntry) => (
            <div key={timeEntry.id} className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
              <div className="space-y-4">
                {/* Header Row - Checkbox and Technician */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedTimeEntries.includes(timeEntry.id)}
                    onChange={() => handleSelectTimeEntry(timeEntry.id)}
                    className="w-5 h-5 border-2 border-[#EBEBEB] rounded mt-1 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        src={timeEntry.technician.avatar}
                        alt={`${timeEntry.technician.name} avatar`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <h3 className="font-medium text-black dark:text-white text-base">{timeEntry.technician.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{timeEntry.workOrderId}</p>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleViewTimeEntry(timeEntry)}
                      className="p-2 border border-[#E5E7EB] rounded hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    {timeEntry.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleApproveTimeEntry(timeEntry.id)}
                          className="p-2 border border-[#E5E7EB] rounded hover:bg-green-50 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 text-[#10BF0A]" />
                        </button>
                        <button 
                          onClick={() => handleRejectTimeEntry(timeEntry.id)}
                          className="p-2 border border-[#E5E7EB] rounded hover:bg-red-50 transition-colors"
                        >
                          <XCircle className="w-4 h-4 text-red-600" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Time Details */}
                <div className="grid grid-cols-2 gap-3 border-t border-[#E5E7EB] pt-3">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Clock In</p>
                    <p className="text-sm font-medium text-black dark:text-white">{formatDateTime(timeEntry.clockIn)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Clock Out</p>
                    <p className="text-sm font-medium text-black dark:text-white">
                      {timeEntry.clockOut ? formatDateTime(timeEntry.clockOut) : 'Active'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Duration</p>
                    <p className="text-sm font-medium text-black dark:text-white">{formatDuration(timeEntry.duration)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Status</p>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(timeEntry.status)}`}>
                      {getStatusIcon(timeEntry.status)}
                      {timeEntry.status}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                {timeEntry.notes && (
                  <div className="border-t border-[#E5E7EB] pt-3">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Notes</p>
                    <p className="text-sm text-black dark:text-white">{timeEntry.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table - Hidden on mobile */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFC]">
              <tr>
                <th className="px-4 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedTimeEntries.length === filteredTimeEntries.length}
                    onChange={handleSelectAll}
                    className="w-5 h-5 border-2 border-[#EBEBEB] rounded"
                  />
                </th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Technician</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Work Order</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Clock In</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Clock Out</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Duration</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Status</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTimeEntries.map((timeEntry) => (
                <tr key={timeEntry.id} className="border-b border-[#E5E7EB]">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedTimeEntries.includes(timeEntry.id)}
                      onChange={() => handleSelectTimeEntry(timeEntry.id)}
                      className="w-5 h-5 border-2 border-[#EBEBEB] rounded"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={timeEntry.technician.avatar}
                        alt={`${timeEntry.technician.name} avatar`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="text-sm text-black dark:text-white">{timeEntry.technician.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-black dark:text-white">{timeEntry.workOrderId}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-black dark:text-white">{formatDateTime(timeEntry.clockIn)}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-black dark:text-white">
                      {timeEntry.clockOut ? formatDateTime(timeEntry.clockOut) : 'Active'}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-black dark:text-white">{formatDuration(timeEntry.duration)}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(timeEntry.status)}`}>
                      {getStatusIcon(timeEntry.status)}
                      {timeEntry.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewTimeEntry(timeEntry)}
                        className="p-1 border border-[#E5E7EB] rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      {timeEntry.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleApproveTimeEntry(timeEntry.id)}
                            className="p-1 border border-[#E5E7EB] rounded hover:bg-green-50 transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4 text-[#10BF0A]" />
                          </button>
                          <button 
                            onClick={() => handleRejectTimeEntry(timeEntry.id)}
                            className="p-1 border border-[#E5E7EB] rounded hover:bg-red-50 transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4 text-red-600" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-[#E5E7EB] px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredTimeEntries.length} of {timeEntries.length} time entries
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm border border-[#EBEBEB] rounded hover:bg-gray-50 transition-colors">
                Previous
              </button>
                              <button className="px-3 py-1 text-sm bg-[#10BF0A] text-white rounded">1</button>
              <button className="px-3 py-1 text-sm border border-[#EBEBEB] rounded hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Time Entry View Modal */}
      {isViewModalOpen && viewingTimeEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-black dark:text-white">Time Entry Details</h2>
                <button 
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Technician Info */}
              <div className="flex items-center gap-4">
                <img
                  src={viewingTimeEntry.technician.avatar}
                  alt={`${viewingTimeEntry.technician.name} avatar`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white">{viewingTimeEntry.technician.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Technician ID: {viewingTimeEntry.technicianId}</p>
                </div>
              </div>

              {/* Time Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Work Order</p>
                  <p className="text-lg font-medium text-black dark:text-white">{viewingTimeEntry.workOrderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</p>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium border ${getStatusColor(viewingTimeEntry.status)}`}>
                    {getStatusIcon(viewingTimeEntry.status)}
                    {viewingTimeEntry.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Clock In</p>
                  <p className="text-lg font-medium text-black dark:text-white">{formatDateTime(viewingTimeEntry.clockIn)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Clock Out</p>
                  <p className="text-lg font-medium text-black dark:text-white">
                    {viewingTimeEntry.clockOut ? formatDateTime(viewingTimeEntry.clockOut) : 'Active Session'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</p>
                  <p className="text-lg font-medium text-black dark:text-white">{formatDuration(viewingTimeEntry.duration)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</p>
                  <p className="text-lg font-medium text-black dark:text-white">
                    {viewingTimeEntry.location ? `${viewingTimeEntry.location.lat.toFixed(4)}, ${viewingTimeEntry.location.lng.toFixed(4)}` : 'Not available'}
                  </p>
                </div>
              </div>

              {/* Notes */}
              {viewingTimeEntry.notes && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Notes</p>
                  <p className="text-black dark:text-white bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    {viewingTimeEntry.notes}
                  </p>
                </div>
              )}

              {/* Approval Info */}
              {viewingTimeEntry.approvedBy && (
                <div className="border-t border-[#E5E7EB] pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Approval Information</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Approved By</p>
                      <p className="text-black dark:text-white">{viewingTimeEntry.approvedBy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Approved At</p>
                      <p className="text-black dark:text-white">{viewingTimeEntry.approvedAt ? formatDateTime(viewingTimeEntry.approvedAt) : '—'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              {viewingTimeEntry.status === 'pending' && (
                <div className="border-t border-[#E5E7EB] pt-4 flex gap-3">
                  <button 
                    onClick={() => {
                      handleApproveTimeEntry(viewingTimeEntry.id);
                      setIsViewModalOpen(false);
                    }}
                    className="flex-1 bg-[#10BF0A] text-white py-2 px-4 rounded-lg hover:bg-[#0EA50A] transition-colors"
                  >
                    Approve Time Entry
                  </button>
                  <button 
                    onClick={() => {
                      handleRejectTimeEntry(viewingTimeEntry.id);
                      setIsViewModalOpen(false);
                    }}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject Time Entry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bulk Actions Modal */}
      {isBulkActionsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-[#E5E7EB]">
              <h2 className="text-xl font-semibold text-black dark:text-white">Bulk Actions</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {selectedTimeEntries.length} time entries selected
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <button 
                onClick={handleBulkApprove}
                className="w-full bg-[#10BF0A] text-white py-3 px-4 rounded-lg hover:bg-[#0EA50A] transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Approve All Selected
              </button>
              <button 
                onClick={handleBulkReject}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                Reject All Selected
              </button>
              <button 
                onClick={() => setIsBulkActionsOpen(false)}
                className="w-full border border-[#EBEBEB] text-black dark:text-white py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-[#E5E7EB]">
              <h2 className="text-xl font-semibold text-black dark:text-white">Export Time Entries</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Export Format</p>
                <select className="w-full border border-[#EBEBEB] rounded-lg px-3 py-2">
                  <option>CSV</option>
                  <option>Excel</option>
                  <option>PDF</option>
                </select>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Date Range</p>
                <select className="w-full border border-[#EBEBEB] rounded-lg px-3 py-2">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Custom range</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleExport}
                  className="flex-1 bg-[#10BF0A] text-white py-2 px-4 rounded-lg hover:bg-[#0EA50A] transition-colors"
                >
                  Export
                </button>
                <button 
                  onClick={() => setIsExportModalOpen(false)}
                  className="flex-1 border border-[#EBEBEB] text-black dark:text-white py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
