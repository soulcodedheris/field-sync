import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  FileText,
  Book,
  AlertTriangle,
  Wrench,
  GraduationCap,
  Image
} from 'lucide-react';

export const AdminLibrary: React.FC = () => {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedType, setSelectedType] = useState('All Types');

  const quickAccessItems = [
    {
      icon: AlertTriangle,
      title: 'Emergency Procedures',
      description: 'Safety protocols',
      color: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      icon: Wrench,
      title: 'Equipment Manuals',
      description: 'Technical guides',
      color: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      icon: FileText,
      title: 'Standard Procedures',
      description: 'SOPs & checklists',
      color: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      icon: GraduationCap,
      title: 'Training Materials',
      description: 'Learning resources',
      color: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    }
  ];

  const documents = [
    {
      id: 1,
      title: 'HVAC System Manual',
      description: 'Complete maintenance and troubleshooting guide for HVAC systems',
      type: 'PDF',
      size: '2.4 MB',
      status: 'Published',
      updatedAt: '2 days ago',
      icon: FileText,
      iconColor: 'text-[#DC2626]'
    },
    {
      id: 2,
      title: 'Safety Lockout Procedure',
      description: 'Standard operating procedure for equipment lockout/tagout',
      type: 'DOC',
      size: '2.4 KB',
      status: 'Published',
      updatedAt: '1 week ago',
      icon: FileText,
      iconColor: 'text-[#2563EB]'
    },
    {
      id: 3,
      title: 'Electrical Panel Diagram',
      description: 'Wiring diagrams and component identification guide',
      type: 'PNG',
      size: '1.2 MB',
      status: 'Published',
      updatedAt: '1 month ago',
      icon: Image,
      iconColor: 'text-gray-600 dark:text-gray-400'
    },
    {
      id: 4,
      title: 'Chemical Safety Procedures',
      description: 'Safety procedures for handling hazardous chemicals',
      type: 'PDF',
      size: '2.4 MB',
      status: 'Draft',
      updatedAt: '6 days ago',
      icon: FileText,
      iconColor: 'text-[#DC2626]'
    },
    {
      id: 5,
      title: 'HVAC System Manual',
      description: 'Complete maintenance and troubleshooting guide for HVAC systems',
      type: 'PDF',
      size: '2.4 MB',
      status: 'Draft',
      updatedAt: '8 days ago',
      icon: FileText,
      iconColor: 'text-[#DC2626]'
    },
    {
      id: 6,
      title: 'Chemical Safety Procedures',
      description: 'Safety procedures for handling hazardous chemicals',
      type: 'PDF',
      size: '2.4 MB',
      status: 'Safety',
      updatedAt: '6 days ago',
      icon: FileText,
      iconColor: 'text-[#DC2626]'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-[rgba(211,253,210,0.65)] text-[#10BF0A]';
      case 'Draft':
        return 'bg-[#CACACA] text-gray-600 dark:text-gray-400';
      case 'Safety':
        return 'bg-[rgba(211,253,210,0.65)] text-[#10BF0A]';
      default:
        return 'bg-[#CACACA] text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className=" sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="pl-0 sm:pl-4">
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Resources</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white mt-2">
              Access, manage, and share all project documentation, equipment manuals, and technical specifications.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-medium text-black dark:text-white mb-4 sm:mb-6">Quick Access</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {quickAccessItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-[#EBEBEB] rounded-xl hover:shadow-md transition-shadow">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${item.color} flex items-center justify-center flex-shrink-0`}>
                <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.iconColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-black dark:text-white text-xs sm:text-sm truncate">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs truncate">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
          
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[rgba(108,108,108,0.5)]" />
              <input
                type="text"
                placeholder="search...."
                className="w-full pl-10 pr-3 py-2 border border-[rgba(108,108,108,0.5)] rounded-lg text-base sm:text-lg text-[rgba(108,108,108,0.5)]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white">
                <span className="truncate">{selectedCategory}</span>
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              </button>
              <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white">
                <span className="truncate">{selectedType}</span>
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              </button>
              <button className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm sm:text-lg">
                <Plus className="w-5 h-5" />
                <span>Add Document</span>
              </button>
              <button className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm sm:text-lg">
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* All Documentation */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-medium text-black dark:text-white mb-4 sm:mb-6">All Documentation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[rgba(245,245,245,0.64)] rounded-full flex items-center justify-center flex-shrink-0">
                    <doc.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${doc.iconColor}`} />
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-black dark:text-white text-sm truncate">{doc.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed line-clamp-2">{doc.description}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#EBEBEB]">
                <span className="text-xs font-medium text-black dark:text-white">{doc.type} • {doc.size}</span>
                <span className="text-xs text-black dark:text-white">
                  {doc.status === 'Draft' ? 'Created' : 'Updated'}: {doc.updatedAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminLibrary;
