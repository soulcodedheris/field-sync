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
  Building,
  Eye,
  X,
  Link as LinkIcon
} from 'lucide-react';
import type { Job } from '../types';
import { ProjectCreateModal } from '../components/ProjectCreateModal';
import { JobLinkingModal } from '../components/JobLinkingModal';
import { ProjectAnalytics } from '../components/ProjectAnalytics';

// Project interface - higher level container
interface Project {
  id: string;
  name: string;
  description: string;
  clientName: string;
  clientContact: string;
  startDate: string;
  endDate?: string;
  totalBudget: number;
  spentBudget: number;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location: string;
  jobs: Job[];
  progress: number; // 0-100
  createdAt: string;
  updatedAt: string;
}

export const AdminProjectManagement: React.FC = () => {
  const { user } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isJobLinkingModalOpen, setIsJobLinkingModalOpen] = useState(false);
  const [selectedProjectForLinking, setSelectedProjectForLinking] = useState<Project | null>(null);

  // Mock project data
  const projectsData: Project[] = [
    {
      id: 'PROJ-2024-001',
      name: 'Acme Corp HVAC System Upgrade',
      description: 'Complete HVAC system upgrade for Acme Corp headquarters',
      clientName: 'Acme Corp',
      clientContact: 'John Smith',
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      totalBudget: 150000,
      spentBudget: 85000,
      status: 'active',
      priority: 'high',
      location: '123 Main St, Downtown',
      progress: 65,
      jobs: [],
      createdAt: '2024-01-10',
      updatedAt: '2024-02-25'
    }
  ];

  const handleViewProject = (project: Project) => {
    setViewingProject(project);
    setIsViewModalOpen(true);
  };

  const handleCreateProject = () => {
    setIsCreateProjectModalOpen(true);
  };

  const handleProjectCreated = (projectData: any) => {
    console.log('New project created:', projectData);
    // In a real app, this would add the project to the projectsData array
    // For now, we'll just log it
  };

  const handleLinkJobs = (project: Project) => {
    setSelectedProjectForLinking(project);
    setIsJobLinkingModalOpen(true);
  };

  const handleJobsLinked = (jobIds: string[]) => {
    console.log('Jobs linked to project:', jobIds);
    // In a real app, this would update the project's jobs array
    setIsJobLinkingModalOpen(false);
    setSelectedProjectForLinking(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-[#10BF0A]/10 text-[#10BF0A] border-[#10BF0A]/20';
      case 'active': return 'bg-[#10BF0A]/10 text-[#10BF0A] border-[#10BF0A]/20';
      case 'on_hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning': return <Calendar className="w-4 h-4" />;
      case 'active': return <Clock className="w-4 h-4" />;
      case 'on_hold': return <Flag className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <Circle className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
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

  const activeCount = projectsData.filter(project => project.status === 'active').length;
  const totalBudget = projectsData.reduce((sum, project) => sum + project.totalBudget, 0);
  const totalSpent = projectsData.reduce((sum, project) => sum + project.spentBudget, 0);

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Project Management</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white">
              Manage client projects, track budgets, and oversee job progress across multiple work sites
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Projects</p>
              <p className="text-2xl font-bold text-black dark:text-white">{activeCount}</p>
            </div>
            <div className="w-12 h-12 bg-[#10BF0A]/10 dark:bg-[#10BF0A]/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#10BF0A] dark:text-[#10BF0A]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Budget</p>
              <p className="text-2xl font-bold text-black dark:text-white">{formatCurrency(totalBudget)}</p>
            </div>
            <div className="w-12 h-12 bg-[#10BF0A]/10 dark:bg-[#10BF0A]/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#10BF0A] dark:text-[#10BF0A]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Spent Budget</p>
              <p className="text-2xl font-bold text-black dark:text-white">{formatCurrency(totalSpent)}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Projects</p>
              <p className="text-2xl font-bold text-black dark:text-white">{projectsData.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white">All Projects</h2>
          <button 
            onClick={handleCreateProject}
            className="flex items-center gap-2 px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </button>
        </div>

        <div className="space-y-4">
          {projectsData.map((project) => (
            <div key={project.id} className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Building className="w-8 h-8 text-[#10BF0A]" />
                  <div>
                    <h3 className="font-medium text-black dark:text-white">{project.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{project.clientName}</p>
                  </div>
                </div>
                                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-black dark:text-white">{formatCurrency(project.totalBudget)}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Budget</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-black dark:text-white">{project.progress}%</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Progress</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${getStatusColor(project.status)}`}>
                      {getStatusIcon(project.status)}
                      {project.status}
                    </span>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleLinkJobs(project)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="Link Jobs"
                      >
                        <LinkIcon className="w-4 h-4 text-[#10BF0A]" />
                      </button>
                      <button 
                        onClick={() => handleViewProject(project)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project View Modal */}
      {isViewModalOpen && viewingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-black dark:text-white">Project Details</h2>
                <button 
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <ProjectAnalytics project={viewingProject} />
            </div>
          </div>
        </div>
      )}

      {/* Project Create Modal */}
      <ProjectCreateModal
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
        onSubmit={handleProjectCreated}
      />

      {/* Job Linking Modal */}
      {selectedProjectForLinking && (
        <JobLinkingModal
          isOpen={isJobLinkingModalOpen}
          onClose={() => {
            setIsJobLinkingModalOpen(false);
            setSelectedProjectForLinking(null);
          }}
          projectId={selectedProjectForLinking.id}
          projectName={selectedProjectForLinking.name}
          existingJobs={selectedProjectForLinking.jobs}
          onLinkJobs={handleJobsLinked}
        />
      )}
    </div>
  );
};
