import React, { useState } from 'react';
import {
  X,
  Search,
  Filter,
  User,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Calendar,
  Briefcase
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';
import userAvatarAI from '../assets/user-avatar-ai.png';

interface Technician {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: 'available' | 'busy' | 'offline' | 'on_break';
  location: string;
  rating: number;
  jobsCompleted: number;
  currentJob?: string;
  skills: string[];
  availability: {
    today: boolean;
    tomorrow: boolean;
    thisWeek: boolean;
  };
}

interface TechnicianAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (technicianId: number, jobId: string) => void;
  jobId: string;
  jobTitle: string;
  jobLocation: string;
  jobPriority: string;
  requiredSkills?: string[];
}

export const TechnicianAssignmentModal: React.FC<TechnicianAssignmentModalProps> = ({
  isOpen,
  onClose,
  onAssign,
  jobId,
  jobTitle,
  jobLocation,
  jobPriority,
  requiredSkills = []
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [selectedTechnician, setSelectedTechnician] = useState<number | null>(null);

  const technicians: Technician[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@fieldsync.com',
      avatar: userAvatar1,
      role: 'Lead Technician',
      status: 'available',
      location: 'Downtown',
      rating: 4.8,
      jobsCompleted: 156,
      skills: ['HVAC', 'Electrical', 'Plumbing'],
      availability: { today: true, tomorrow: true, thisWeek: true }
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@fieldsync.com',
      avatar: userAvatar2,
      role: 'Electrical Specialist',
      status: 'busy',
      location: 'Midtown',
      rating: 4.9,
      jobsCompleted: 203,
      currentJob: 'Emergency Repair #JB-2024-001',
      skills: ['Electrical', 'HVAC'],
      availability: { today: false, tomorrow: true, thisWeek: true }
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@fieldsync.com',
      avatar: userAvatar3,
      role: 'Junior Technician',
      status: 'available',
      location: 'Uptown',
      rating: 4.2,
      jobsCompleted: 89,
      skills: ['HVAC', 'General Maintenance'],
      availability: { today: true, tomorrow: true, thisWeek: true }
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@fieldsync.com',
      avatar: userAvatarAI,
      role: 'Safety Inspector',
      status: 'on_break',
      location: 'Downtown',
      rating: 4.7,
      jobsCompleted: 134,
      skills: ['Safety', 'HVAC', 'Electrical'],
      availability: { today: false, tomorrow: true, thisWeek: true }
    }
  ];

  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-orange-100 text-orange-800';
      case 'offline':
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
      case 'on_break':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-3 h-3" />;
      case 'busy':
        return <Clock className="w-3 h-3" />;
      case 'offline':
        return <AlertCircle className="w-3 h-3" />;
      case 'on_break':
        return <Clock className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
    }
  };

  const filteredTechnicians = technicians.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tech.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tech.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || tech.status === statusFilter;
    
    const matchesSkills = skillFilter === 'all' || 
                         tech.skills.some(skill => skill.toLowerCase().includes(skillFilter.toLowerCase()));

    return matchesSearch && matchesStatus && matchesSkills;
  });

  const handleAssign = () => {
    if (selectedTechnician) {
      onAssign(selectedTechnician, jobId);
      onClose();
    }
  };

  const allSkills = Array.from(new Set(technicians.flatMap(tech => tech.skills)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E5E7EB]">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white">Assign Technician</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Select the best technician for this job</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Job Details */}
        <div className="px-4 sm:px-6 py-4 bg-[#F8F9FA] border-b border-[#E5E7EB]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="font-medium text-black dark:text-white">{jobTitle}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Job ID: {jobId}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{jobLocation}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(jobPriority)}`}>
                {jobPriority} Priority
              </span>
            </div>
          </div>
          {requiredSkills.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-1">Required Skills:</p>
              <div className="flex flex-wrap gap-2">
                {requiredSkills.map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="p-4 sm:p-6 border-b border-[#E5E7EB]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6C6C6C]" />
              <input
                type="text"
                placeholder="Search technicians by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent appearance-none bg-white dark:bg-gray-800"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="offline">Offline</option>
                <option value="on_break">On Break</option>
              </select>
            </div>

            {/* Skills Filter */}
            <div className="relative">
              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent appearance-none bg-white dark:bg-gray-800"
              >
                <option value="all">All Skills</option>
                {allSkills.map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Technicians List */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-300px)]">
          <div className="space-y-4">
            {filteredTechnicians.map((tech) => (
              <div
                key={tech.id}
                onClick={() => setSelectedTechnician(tech.id)}
                className={`p-4 border rounded-xl cursor-pointer transition-all ${
                  selectedTechnician === tech.id
                    ? 'border-[#10BF0A] bg-[rgba(16,191,10,0.05)]'
                    : 'border-[#E5E7EB] hover:border-[#10BF0A] hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar and Selection */}
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                      selectedTechnician === tech.id
                        ? 'bg-[#10BF0A] border-[#10BF0A]'
                        : 'border-[#E5E7EB]'
                    }`}>
                      {selectedTechnician === tech.id && (
                        <div className="w-2 h-2 bg-white dark:bg-gray-700 rounded-sm"></div>
                      )}
                    </div>
                    <img src={tech.avatar} alt={tech.name} className="w-12 h-12 rounded-full object-cover" />
                  </div>

                  {/* Technician Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-black dark:text-white">{tech.name}</h4>
                        <p className="text-sm text-[#6C6C6C]">{tech.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tech.status)}`}>
                          {getStatusIcon(tech.status)}
                          {tech.status.replace('_', ' ')}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{tech.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Role</p>
                        <p className="text-sm font-medium text-black dark:text-white">{tech.role}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Location</p>
                        <p className="text-sm font-medium text-black dark:text-white">{tech.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Jobs Completed</p>
                        <p className="text-sm font-medium text-black dark:text-white">{tech.jobsCompleted}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#6C6C6C]">Availability</p>
                        <div className="flex gap-1">
                          {tech.availability.today && (
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          )}
                          {tech.availability.tomorrow && (
                            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          )}
                          {tech.availability.thisWeek && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex gap-2 mb-2">
                      {tech.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 dark:text-gray-300 dark:text-gray-300 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Current Job (if busy) */}
                    {tech.currentJob && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-2">
                        <p className="text-xs text-orange-800">
                          <strong>Current Job:</strong> {tech.currentJob}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTechnicians.length === 0 && (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No technicians found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[#E5E7EB] bg-[#F8F9FA]">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#E5E7EB] text-[#6C6C6C] rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedTechnician(null)}
              className="px-4 py-2 border border-[#E5E7EB] text-black dark:text-white rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              Clear Selection
            </button>
            <button
              onClick={handleAssign}
              disabled={!selectedTechnician}
              className="px-6 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] disabled:bg-[#6C6C6C] disabled:cursor-not-allowed transition-colors"
            >
              Assign Technician
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
