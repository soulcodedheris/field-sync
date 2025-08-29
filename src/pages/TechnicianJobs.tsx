import React, { useState } from 'react';
import {
  Search,
  Calendar,
  ChevronDown,
  MapPin,
  Calendar as CalendarIcon,
  Wrench as PipeWrench,
  Navigation,
  Flag,
  User,
  Filter
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';
import userAvatarAI from '../assets/user-avatar-ai.png';
import { TeamMembersModal } from '../components/TeamMembersModal';
import { JobDetailsModal } from '../components/JobDetailsModal';
import { DirectionsModal } from '../components/DirectionsModal';

// Mock data for jobs
const mockJobs = [
  {
    id: 1,
    type: 'Current Job',
    title: 'Quarterly Maintenance',
    jobId: '#JB-2024-0856',
    priority: 'High',
    status: 'In Progress',
    assignedTechnicians: [
      { id: 1, name: 'John Doe', avatar: userAvatar1, role: 'Lead Technician', status: 'active' },
      { id: 2, name: 'Jane Smith', avatar: userAvatar2, role: 'Electrical Specialist', status: 'busy' },
      { id: 3, name: 'Mike Johnson', avatar: userAvatar3, role: 'Junior Technician', status: 'active' },
      { id: 4, name: 'Sarah Wilson', avatar: userAvatarAI, role: 'Safety Inspector', status: 'offline' }
    ],
    location: 'Downtown Office Complex',
    address: '1234 Business Ave, Suite 100',
    schedule: 'Today, 2:00 PM',
    duration: 'Estimated 3 hours',
    jobType: 'HVAC Maintenance',
    description: 'Routine inspection'
  },
  {
    id: 2,
    type: 'Scheduled Job',
    title: 'Emergency Electrical Repair',
    jobId: '#JB-2025-0157',
    priority: 'Medium',
    status: 'To-do',
    assignedTechnicians: [
      { id: 1, name: 'John Doe', avatar: userAvatar1, role: 'Lead Technician', status: 'active' },
      { id: 2, name: 'Jane Smith', avatar: userAvatar2, role: 'Electrical Specialist', status: 'busy' }
    ],
    location: 'Bayside Warehouse',
    address: '789 Coastal Rd, Unit B',
    schedule: 'Today, 4:30 PM',
    duration: 'Estimated 2.5 hours',
    jobType: 'Electrical Repair',
    description: 'Emergency repair'
  },
  {
    id: 3,
    type: 'Overdue Job',
    title: 'Routine Inspection',
    jobId: '#JB-2025-0157',
    priority: 'Medium',
    status: 'Overdue',
    assignedTechnicians: [
      { id: 1, name: 'John Doe', avatar: userAvatar1, role: 'Lead Technician', status: 'active' },
      { id: 2, name: 'Jane Smith', avatar: userAvatar2, role: 'Electrical Specialist', status: 'busy' }
    ],
    location: 'Downtown Office Complex',
    address: '1234 Business Ave, Suite 100',
    schedule: 'Today, 2:00 PM',
    duration: 'Estimated 3 hours',
    jobType: 'HVAC Maintenance',
    description: 'Routine inspection'
  },
  {
    id: 4,
    type: 'Completed Job',
    title: 'Electrical Panel Inspection',
    jobId: '#JB-2025-0057',
    priority: 'High',
    status: 'Completed',
    assignedTechnicians: [
      { id: 1, name: 'John Doe', avatar: userAvatar1, role: 'Lead Technician', status: 'active' }
    ],
    location: 'Downtown Office Complex',
    address: '1234 Business Ave, Suite 100',
    schedule: 'Today, 2:00 PM',
    duration: 'Estimated 3 hours',
    jobType: 'Electrical Maintenance',
    description: 'Panel inspection'
  }
];

export const TechnicianJobs: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [isTeamMembersOpen, setIsTeamMembersOpen] = useState(false);
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All Jobs');

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'High':
      return (
          <div className="flex items-center gap-1 px-2 py-1 bg-[#FFDFDF] rounded text-[#DC2626]">
            <Flag className="w-3 h-3" />
            <span className="text-xs font-medium">High</span>
        </div>
      );
    case 'Medium':
      return (
          <div className="flex items-center gap-1 px-2 py-1 bg-[#FFEFD7] rounded text-[#F39C12]">
            <Flag className="w-3 h-3" />
            <span className="text-xs font-medium">Medium</span>
        </div>
      );
    case 'Low':
      return (
          <div className="flex items-center gap-1 px-2 py-1 bg-[#DCFBE9] rounded text-[#2ECC71]">
            <Flag className="w-3 h-3" />
            <span className="text-xs font-medium">Low</span>
        </div>
      );
    default:
      return null;
  }
};

const getJobStatusBadge = (status: string) => {
  switch (status) {
    case 'In Progress':
      return (
          <div className="flex items-center gap-1 px-2 py-1 bg-[#FFEFD7] rounded text-[#F39C12]">
          <div className="w-2 h-2 bg-[#F39C12] rounded-full"></div>
            <span className="text-xs font-medium">In Progress</span>
        </div>
      );
    case 'To-do':
      return (
          <div className="flex items-center gap-1 px-2 py-1 bg-[#F3F4F6] rounded text-[#6B7280]">
            <div className="w-2 h-2 bg-[#6B7280] rounded-full"></div>
            <span className="text-xs font-medium">To-do</span>
        </div>
      );
    case 'Overdue':
      return (
          <div className="flex items-center gap-1 px-2 py-1 bg-[#FFDFDF] rounded text-[#DC2626]">
            <Flag className="w-3 h-3" />
            <span className="text-xs font-medium">Overdue</span>
        </div>
      );
    case 'Completed':
      return (
          <div className="flex items-center gap-1 px-2 py-1 bg-[#DCFBE9] rounded text-[#2ECC71]">
            <div className="w-2 h-2 bg-[#2ECC71] rounded-full"></div>
            <span className="text-xs font-medium">Completed</span>
        </div>
      );
    default:
      return null;
  }
};

  const getTechnicianStatus = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#2ECC71]';
      case 'busy':
        return 'bg-[#F39C12]';
      case 'offline':
        return 'bg-[#6B7280]';
      default:
        return 'bg-[#6B7280]';
    }
  };

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'All Jobs' || 
                         job.type.toLowerCase().includes(selectedFilter.toLowerCase().replace(' ', ''));
    
    return matchesSearch && matchesFilter;
  });

  const handleJobClick = (jobId: number) => {
    setSelectedJob(jobId);
    setIsJobDetailsOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-black dark:text-white">Jobs</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Manage and track your assigned jobs
            </p>
      </div>

      {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
              />
          </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors"
              >
                <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:text-gray-300">{selectedFilter}</span>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredJobs.map((job) => (
          <div 
            key={job.id} 
            onClick={() => handleJobClick(job.id)}
            className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="space-y-4 sm:space-y-6">
              {/* Job Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-semibold text-black dark:text-white truncate">{job.title}</h3>
                    {getStatusBadge(job.priority)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{job.jobId}</p>
                </div>
                {getJobStatusBadge(job.status)}
              </div>

              {/* Job Details */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-black dark:text-white truncate">{job.location}</p>
                    <p className="text-xs text-gray-600 truncate">{job.address}</p>
                  </div>
                  </div>

                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-black dark:text-white">{job.schedule}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{job.duration}</p>
                  </div>
                    </div>

                <div className="flex items-center gap-2">
                  <PipeWrench className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <div>
                    <p className="text-sm font-medium text-black dark:text-white">{job.jobType}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{job.description}</p>
                  </div>
                    </div>
                  </div>

              {/* Assigned Technicians */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-black dark:text-white">Assigned Technicians</h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTeamMembersOpen(true);
                    }}
                    className="text-xs text-[#10BF0A] hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="flex -space-x-2">
                  {job.assignedTechnicians.slice(0, 4).map((technician) => (
                    <div key={technician.id} className="relative">
                      <img
                        src={technician.avatar}
                        alt={technician.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getTechnicianStatus(technician.status)}`}></div>
                    </div>
                  ))}
                  {job.assignedTechnicians.length > 4 && (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-600 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">+{job.assignedTechnicians.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDirectionsOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-[#10BF0A] text-white rounded-lg text-sm font-medium hover:bg-[#0EA509] transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span className="hidden sm:inline">Get Directions</span>
                  <span className="sm:hidden">Directions</span>
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleJobClick(job.id);
                  }}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">View Details</span>
                  <span className="sm:hidden">Details</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <JobDetailsModal
        isOpen={isJobDetailsOpen}
        onClose={() => setIsJobDetailsOpen(false)}
        job={mockJobs.find(job => job.id === selectedJob) || mockJobs[0]}
      />
      
      <TeamMembersModal
        isOpen={isTeamMembersOpen}
        onClose={() => setIsTeamMembersOpen(false)}
        teamMembers={mockJobs.find(job => job.id === selectedJob)?.assignedTechnicians.map(tech => ({
          ...tech,
          status: tech.status as "active" | "busy" | "offline"
        })) || []}
      />

      <DirectionsModal
        isOpen={isDirectionsOpen}
        onClose={() => setIsDirectionsOpen(false)}
        job={mockJobs.find(job => job.id === selectedJob) || mockJobs[0]}
      />
    </div>
  );
};
