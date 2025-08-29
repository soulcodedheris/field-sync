import React, { useState } from 'react';
import { X, Filter, FileText, Tag, Calendar } from 'lucide-react';

export interface TechnicianLibraryFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

export const TechnicianLibraryFilterModal: React.FC<TechnicianLibraryFilterModalProps> = ({ isOpen, onClose, onApply }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    fileType: 'all',
    dateRange: 'all',
    tags: [] as string[]
  });

  const handleInputChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      category: 'all',
      type: 'all',
      fileType: 'all',
      dateRange: 'all',
      tags: []
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-[#10BF0A]" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Library</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              <option value="manuals">Manuals</option>
              <option value="procedures">Procedures</option>
              <option value="safety">Safety</option>
              <option value="training">Training</option>
              <option value="forms">Forms</option>
              <option value="templates">Templates</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="document">Document</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
              <option value="audio">Audio</option>
              <option value="link">Link</option>
            </select>
          </div>

          {/* File Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              File Type
            </label>
            <select
              value={filters.fileType}
              onChange={(e) => handleInputChange('fileType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All File Types</option>
              <option value="pdf">PDF</option>
              <option value="doc">DOC</option>
              <option value="docx">DOCX</option>
              <option value="xls">XLS</option>
              <option value="xlsx">XLSX</option>
              <option value="ppt">PPT</option>
              <option value="pptx">PPTX</option>
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
              <option value="mp4">MP4</option>
              <option value="mp3">MP3</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleInputChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Tags
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['urgent', 'important', 'reference', 'training', 'safety', 'maintenance', 'repair', 'installation'].map((tag) => (
                <label key={tag} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.tags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                    className="rounded border-gray-300 dark:border-gray-600 text-[#10BF0A] focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{tag}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
