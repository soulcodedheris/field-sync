import React, { useState, useEffect } from 'react';
import { X, Link, Search, Check, Plus } from 'lucide-react';
import type { Job } from '../types';

interface JobLinkingModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  existingJobs: Job[];
  onLinkJobs: (jobIds: string[]) => void;
}

export const JobLinkingModal: React.FC<JobLinkingModalProps> = ({
  isOpen,
  onClose,
  projectId,
  projectName,
  existingJobs,
  onLinkJobs
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  // Mock available jobs that can be linked
  const availableJobs: Job[] = [
    {
      id: 'JOB-2024-005',
      name: 'Office C HVAC Installation',
      jobType: 'installation',
      status: 'active',
      clientName: 'Acme Corp',
      clientContact: 'John Smith',
      startDate: '2024-03-01',
      endDate: '2024-03-30',
      budget: 35000,
      primaryLocation: 'Office C, Floor 3',
      jobsites: [],
      workOrders: [],
      checklistTemplates: [],
      createdAt: '2024-02-15',
      updatedAt: '2024-02-15'
    },
    {
      id: 'JOB-2024-006',
      name: 'Server Room Cooling System',
      jobType: 'installation',
      status: 'active',
      clientName: 'Acme Corp',
      clientContact: 'John Smith',
      startDate: '2024-04-01',
      endDate: '2024-04-15',
      budget: 25000,
      primaryLocation: 'Basement Server Room',
      jobsites: [],
      workOrders: [],
      checklistTemplates: [],
      createdAt: '2024-02-20',
      updatedAt: '2024-02-20'
    },
    {
      id: 'JOB-2024-007',
      name: 'Q2 Maintenance Service',
      jobType: 'maintenance',
      status: 'active',
      clientName: 'TechStart Inc',
      clientContact: 'Sarah Johnson',
      startDate: '2024-04-15',
      endDate: '2024-04-15',
      budget: 15000,
      primaryLocation: '456 Innovation Ave',
      jobsites: [],
      workOrders: [],
      checklistTemplates: [],
      createdAt: '2024-03-01',
      updatedAt: '2024-03-01'
    }
  ];

  useEffect(() => {
    // Filter out jobs that are already linked to this project
    const unlinkedJobs = availableJobs.filter(job => 
      !existingJobs.some(existingJob => existingJob.id === job.id)
    );
    
    // Apply search filter
    const filtered = unlinkedJobs.filter(job =>
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.primaryLocation.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredJobs(filtered);
  }, [searchQuery, existingJobs]);

  const handleJobToggle = (jobId: string) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const handleSelectAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map(job => job.id));
    }
  };

  const handleLinkJobs = () => {
    onLinkJobs(selectedJobs);
    setSelectedJobs([]);
    onClose();
  };

  const handleClose = () => {
    setSelectedJobs([]);
    setSearchQuery('');
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#10BF0A]/10 text-[#10BF0A] border-[#10BF0A]/20';
      case 'on_hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-[#10BF0A]/10 text-[#10BF0A] border-[#10BF0A]/20';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#10BF0A]/10 dark:bg-[#10BF0A]/20 rounded-lg flex items-center justify-center">
              <Link className="w-5 h-5 text-[#10BF0A] dark:text-[#10BF0A]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-black dark:text-white">Link Jobs to Project</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Select jobs to link to "{projectName}"
                </p>
              </div>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Search and Selection Controls */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by name, client, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-black dark:text-white"
              />
            </div>

            {/* Select All */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                onChange={handleSelectAll}
                className="w-4 h-4 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Select All</span>
            </div>
          </div>

          {/* Selection Summary */}
          {selectedJobs.length > 0 && (
            <div className="mt-4 p-3 bg-[#10BF0A]/10 dark:bg-[#10BF0A]/20 rounded-lg">
              <p className="text-sm text-[#10BF0A] dark:text-[#10BF0A]">
                {selectedJobs.length} job{selectedJobs.length !== 1 ? 's' : ''} selected for linking
              </p>
            </div>
          )}
        </div>

        {/* Jobs List */}
        <div className="p-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No jobs found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery ? 'Try adjusting your search terms' : 'All available jobs are already linked to this project'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    selectedJobs.includes(job.id)
                      ? 'border-[#10BF0A] bg-[#10BF0A]/10 dark:bg-[#10BF0A]/20'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job.id)}
                      onChange={() => handleJobToggle(job.id)}
                      className="w-5 h-5 border-gray-300 rounded focus:ring-green-500"
                    />

                    {/* Job Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-black dark:text-white truncate">
                          {job.name}
                        </h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(job.status)}`}>
                          {job.status.replace('_', ' ')}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Client:</span>
                          <span className="ml-1 text-black dark:text-white">{job.clientName}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Location:</span>
                          <span className="ml-1 text-black dark:text-white truncate">{job.primaryLocation}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Budget:</span>
                          <span className="ml-1 text-black dark:text-white">{formatCurrency(job.budget || 0)}</span>
                        </div>
                      </div>

                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {job.startDate} - {job.endDate}
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {selectedJobs.includes(job.id) && (
                      <div className="w-6 h-6 bg-[#10BF0A] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-[#E5E7EB]">
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLinkJobs}
              disabled={selectedJobs.length === 0}
                              className="flex-1 px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Link className="w-4 h-4" />
              Link {selectedJobs.length} Job{selectedJobs.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
