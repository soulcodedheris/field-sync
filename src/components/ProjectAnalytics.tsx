import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Clock,
  Users,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import type { Job } from '../types';

interface Project {
  id: string;
  name: string;
  totalBudget: number;
  spentBudget: number;
  progress: number;
  status: string;
  startDate: string;
  endDate?: string;
  jobs: Job[];
}

interface ProjectAnalyticsProps {
  project: Project;
}

export const ProjectAnalytics: React.FC<ProjectAnalyticsProps> = ({ project }) => {
  const calculateMetrics = () => {
    const totalJobs = project.jobs.length;
    const completedJobs = project.jobs.filter(job => job.status === 'completed').length;
    const inProgressJobs = project.jobs.filter(job => job.status === 'in_progress').length;
    const pendingJobs = project.jobs.filter(job => job.status === 'to_do').length;
    
    const budgetUtilization = (project.spentBudget / project.totalBudget) * 100;
    const budgetRemaining = project.totalBudget - project.spentBudget;
    const isOverBudget = project.spentBudget > project.totalBudget;
    
    const totalJobBudget = project.jobs.reduce((sum, job) => sum + (job.budget || 0), 0);
    const averageJobBudget = totalJobs > 0 ? totalJobBudget / totalJobs : 0;
    
    const daysRemaining = project.endDate 
      ? Math.max(0, Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
      : null;
    
    const isOnTrack = project.progress >= 50 && !isOverBudget;
    const needsAttention = project.progress < 30 || isOverBudget || (daysRemaining !== null && daysRemaining < 7);

    return {
      totalJobs,
      completedJobs,
      inProgressJobs,
      pendingJobs,
      budgetUtilization,
      budgetRemaining,
      isOverBudget,
      totalJobBudget,
      averageJobBudget,
      daysRemaining,
      isOnTrack,
      needsAttention
    };
  };

  const metrics = calculateMetrics();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'on_hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Project Health Overview */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-black dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#10BF0A]" />
            Project Health Overview
          </h3>
          <div className="flex items-center gap-2">
            {metrics.isOnTrack ? (
              <div className="flex items-center gap-1 text-[#10BF0A]">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">On Track</span>
              </div>
            ) : metrics.needsAttention ? (
              <div className="flex items-center gap-1 text-red-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Needs Attention</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-yellow-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">In Progress</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-black dark:text-white mb-1">
              {project.progress}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all ${
                  project.progress >= 80 ? 'bg-[#10BF0A]' : 
                  project.progress >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                }`}
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-black dark:text-white mb-1">
              {metrics.budgetUtilization.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Budget Used</div>
            <div className={`text-sm font-medium mt-1 ${
              metrics.isOverBudget ? 'text-red-600' : 'text-[#10BF0A]'
            }`}>
              {formatCurrency(project.spentBudget)} / {formatCurrency(project.totalBudget)}
            </div>
          </div>

          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-black dark:text-white mb-1">
              {metrics.completedJobs}/{metrics.totalJobs}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Jobs Completed</div>
            <div className="text-sm text-gray-500 mt-1">
              {metrics.totalJobs > 0 ? ((metrics.completedJobs / metrics.totalJobs) * 100).toFixed(0) : 0}% completion rate
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Jobs</p>
              <p className="text-2xl font-bold text-black dark:text-white">{metrics.totalJobs}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-[#10BF0A] dark:text-[#10BF0A]" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {metrics.inProgressJobs} in progress, {metrics.pendingJobs} pending
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Budget Remaining</p>
              <p className={`text-2xl font-bold ${
                metrics.isOverBudget ? 'text-red-600' : 'text-black dark:text-white'
              }`}>
                {formatCurrency(metrics.budgetRemaining)}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#10BF0A] dark:text-[#10BF0A]" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {metrics.isOverBudget ? 'Over budget' : `${metrics.budgetUtilization.toFixed(1)}% utilized`}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Job Budget</p>
              <p className="text-2xl font-bold text-black dark:text-white">
                {formatCurrency(metrics.averageJobBudget)}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <PieChart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {formatCurrency(metrics.totalJobBudget)} total allocated
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Timeline</p>
              <p className="text-2xl font-bold text-black dark:text-white">
                {metrics.daysRemaining !== null ? metrics.daysRemaining : '—'}
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {metrics.daysRemaining !== null ? 'days remaining' : 'No end date set'}
          </div>
        </div>
      </div>

      {/* Job Status Breakdown */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#10BF0A]" />
          Job Status Breakdown
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-[#10BF0A] dark:text-[#10BF0A]" />
              </div>
              <div>
                <p className="font-medium text-black dark:text-white">Completed</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{metrics.completedJobs} jobs</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-[#10BF0A]">
                {metrics.totalJobs > 0 ? ((metrics.completedJobs / metrics.totalJobs) * 100).toFixed(0) : 0}%
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#10BF0A] dark:text-[#10BF0A]" />
              </div>
              <div>
                <p className="font-medium text-black dark:text-white">In Progress</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{metrics.inProgressJobs} jobs</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-[#10BF0A]">
                {metrics.totalJobs > 0 ? ((metrics.inProgressJobs / metrics.totalJobs) * 100).toFixed(0) : 0}%
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="font-medium text-black dark:text-white">Pending</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{metrics.pendingJobs} jobs</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-600">
                {metrics.totalJobs > 0 ? ((metrics.pendingJobs / metrics.totalJobs) * 100).toFixed(0) : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Information */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          Timeline Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</span>
              <span className="text-sm text-black dark:text-white">{formatDate(project.startDate)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">End Date</span>
              <span className="text-sm text-black dark:text-white">
                {project.endDate ? formatDate(project.endDate) : 'Not set'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</span>
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getStatusColor(project.status)}`}>
                {project.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Days Remaining</span>
              <span className={`text-sm font-medium ${
                metrics.daysRemaining !== null && metrics.daysRemaining < 7 ? 'text-red-600' : 'text-black dark:text-white'
              }`}>
                {metrics.daysRemaining !== null ? `${metrics.daysRemaining} days` : 'No deadline'}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress vs Timeline</span>
              <span className={`text-sm font-medium ${
                project.progress >= 50 ? 'text-[#10BF0A]' : 'text-yellow-600'
              }`}>
                {project.progress >= 50 ? 'On Track' : 'Behind Schedule'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Budget vs Timeline</span>
              <span className={`text-sm font-medium ${
                metrics.isOverBudget ? 'text-red-600' : 'text-[#10BF0A]'
              }`}>
                {metrics.isOverBudget ? 'Over Budget' : 'Within Budget'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
