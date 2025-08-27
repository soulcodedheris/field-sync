import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  FileText, 
  AlertOctagon, 
  Wrench, 
  GraduationCap,
  File,
  Image as ImageIcon,
  Download,
  Heart,
  Clock
} from 'lucide-react';
import type { LibraryDocument, LibraryCategory, LibraryFilter } from '../types';

const TechnicianLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedType, setSelectedType] = useState('All Types');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for categories
  const categories: LibraryCategory[] = [
    {
      id: 'emergency_procedures',
      name: 'Emergency Procedures',
      description: 'Safety protocols',
      icon: 'AlertOctagon',
      color: '#D3FDD2',
      documentCount: 12
    },
    {
      id: 'equipment_manuals',
      name: 'Equipment Manuals',
      description: 'Technical guides',
      icon: 'Wrench',
      color: '#D3FDD2',
      documentCount: 8
    },
    {
      id: 'standard_procedures',
      name: 'Standard Procedures',
      description: 'SOPs & checklists',
      icon: 'FileText',
      color: '#D3FDD2',
      documentCount: 15
    },
    {
      id: 'training_materials',
      name: 'Training Materials',
      description: 'Learning resources',
      icon: 'GraduationCap',
      color: '#D3FDD2',
      documentCount: 6
    }
  ];

  // Mock data for documents
  const documents: LibraryDocument[] = [
    {
      id: '1',
      title: 'HVAC System Manual',
      description: 'Complete maintenance and troubleshooting guide for HVAC systems',
      type: 'manual',
      fileType: 'pdf',
      fileSize: '2.4 MB',
      category: 'equipment_manuals',
      updatedAt: '2 days ago',
      createdAt: '2024-01-15',
      tags: ['HVAC', 'maintenance', 'troubleshooting'],
      downloads: 45,
      isFavorite: false
    },
    {
      id: '2',
      title: 'Safety Lockout Procedure',
      description: 'Standard operating procedure for equipment lockout/tagout',
      type: 'sop',
      fileType: 'doc',
      fileSize: '2.4 KB',
      category: 'standard_procedures',
      updatedAt: '1 week ago',
      createdAt: '2024-01-10',
      tags: ['safety', 'lockout', 'tagout'],
      downloads: 23,
      isFavorite: true
    },
    {
      id: '3',
      title: 'Electrical Panel Diagram',
      description: 'Wiring diagrams and component identification guide',
      type: 'guide',
      fileType: 'png',
      fileSize: '1.2 MB',
      category: 'equipment_manuals',
      updatedAt: '1 month ago',
      createdAt: '2023-12-15',
      tags: ['electrical', 'wiring', 'diagram'],
      downloads: 67,
      isFavorite: false
    },
    {
      id: '4',
      title: 'Chemical Safety Procedures',
      description: 'Safety procedures for handling hazardous chemicals',
      type: 'safety',
      fileType: 'pdf',
      fileSize: '2.4 MB',
      category: 'emergency_procedures',
      updatedAt: '6 days ago',
      createdAt: '2024-01-08',
      tags: ['chemical', 'safety', 'hazardous'],
      downloads: 34,
      isFavorite: false
    }
  ];

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <File className="w-4 h-4 text-red-600" />;
      case 'doc':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'png':
      case 'jpg':
        return <ImageIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeColors = {
      manual: 'bg-green-100 text-green-800',
      sop: 'bg-green-100 text-green-800',
      guide: 'bg-green-100 text-green-800',
      safety: 'bg-green-100 text-green-800',
      training: 'bg-green-100 text-green-800'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-normal ${typeColors[type as keyof typeof typeColors]}`}>
        {type.toUpperCase()}
      </span>
    );
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertOctagon':
        return <AlertOctagon className="w-5 h-5 text-green-600" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-green-600" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-green-600" />;
      default:
        return <FileText className="w-5 h-5 text-green-600" />;
    }
  };

  return (
    <div className=" sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Resources</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white">
              Access manuals, SOPs, guides, and technical documentation
            </p>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-2xl font-medium text-black dark:text-white mb-4 sm:mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: category.color }}
              >
                {getCategoryIcon(category.icon)}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm font-medium text-black dark:text-white truncate">{category.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="bg-white dark:bg-gray-800 border border-[rgba(108,108,108,0.5)] dark:border-gray-600 rounded-[10px] h-10 px-3 flex items-center gap-2">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[rgba(108,108,108,0.5)]" />
              <input
                type="text"
                placeholder="search...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-base sm:text-lg text-[rgba(108,108,108,0.5)] placeholder-[rgba(108,108,108,0.5)] w-full"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white">
              <span className="truncate">{selectedCategory}</span>
              <ChevronDown className="w-3 h-3 flex-shrink-0" />
            </button>
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white">
              <span className="truncate">{selectedType}</span>
              <ChevronDown className="w-3 h-3 flex-shrink-0" />
            </button>
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg text-sm sm:text-lg">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* All Documentation Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-2xl font-medium text-black dark:text-white mb-4 sm:mb-6">All Documentation</h2>
        
        {/* Document Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {documents.concat(documents).map((doc, index) => (
            <div
              key={`${doc.id}-${index}`}
              className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 sm:p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              {/* Document Header */}
              <div className="flex justify-between items-start mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[rgba(245,245,245,0.64)] flex items-center justify-center flex-shrink-0">
                  {getFileIcon(doc.fileType)}
                </div>
                {getTypeBadge(doc.type)}
              </div>

              {/* Document Content */}
              <div className="space-y-1 mb-3 sm:mb-4">
                <h3 className="text-sm font-medium text-black dark:text-white truncate">{doc.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 h-10 sm:h-12 overflow-hidden line-clamp-2">{doc.description}</p>
              </div>

              {/* Document Footer */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2 text-xs text-black dark:text-white">
                <span className="font-medium truncate">{doc.fileType.toUpperCase()} • {doc.fileSize}</span>
                <span className="flex items-center gap-1 text-xs">
                  <Clock className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">Updated: {doc.updatedAt}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnicianLibrary;
