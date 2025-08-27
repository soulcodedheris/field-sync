import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface AnnouncementComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnnouncementComposeModal: React.FC<AnnouncementComposeModalProps> = ({
  isOpen,
  onClose
}) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'Normal',
    targetAudience: {
      allCompanies: false,
      byPlan: false,
      specificCompany: false
    },
    content: '',
    sendEmail: false,
    scheduleForLater: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTargetAudienceChange = (field: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      targetAudience: {
        ...prev.targetAudience,
        [field]: checked
      }
    }));
  };

  const handleSubmit = (action: 'draft' | 'send') => {
    // Handle form submission
    console.log('Form data:', formData, 'Action:', action);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#EBEBEB]">
          <h2 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Compose System Message</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Title and Priority Row */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Message Title
              </label>
              <input
                type="text"
                placeholder="Enter message title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base text-black dark:text-white placeholder-[rgba(108,108,108,0.5)] focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Priority
              </label>
              <div className="relative">
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base text-black dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                </select>
                <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black dark:text-white pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <h3 className="text-base sm:text-lg font-medium text-black dark:text-white mb-3 sm:mb-4">Target Audience</h3>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-40">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.targetAudience.allCompanies}
                  onChange={(e) => handleTargetAudienceChange('allCompanies', e.target.checked)}
                  className="w-4 h-4 border border-black rounded focus:ring-2 focus:ring-[#10BF0A]"
                />
                <span className="text-sm sm:text-base text-black dark:text-white">All Companies</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.targetAudience.byPlan}
                  onChange={(e) => handleTargetAudienceChange('byPlan', e.target.checked)}
                  className="w-4 h-4 border border-black rounded focus:ring-2 focus:ring-[#10BF0A]"
                />
                <span className="text-sm sm:text-base text-black dark:text-white">By Plan</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.targetAudience.specificCompany}
                  onChange={(e) => handleTargetAudienceChange('specificCompany', e.target.checked)}
                  className="w-4 h-4 border border-black rounded focus:ring-2 focus:ring-[#10BF0A]"
                />
                <span className="text-sm sm:text-base text-black dark:text-white">Specific Company</span>
              </label>
            </div>
          </div>

          {/* Message Content */}
          <div>
            <label className="block text-base sm:text-lg font-medium text-black dark:text-white mb-3 sm:mb-4">
              Message Content
            </label>
            <textarea
              placeholder="Enter your message content here..."
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={6}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base text-black dark:text-white placeholder-[#ADAEBC] focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent resize-none"
            />
          </div>

          {/* Options and Buttons */}
          <div className="border-t border-[#E5E7EB] pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.sendEmail}
                    onChange={(e) => handleInputChange('sendEmail', e.target.checked)}
                    className="w-4 h-4 border border-black rounded focus:ring-2 focus:ring-[#10BF0A]"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Send email notification</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.scheduleForLater}
                    onChange={(e) => handleInputChange('scheduleForLater', e.target.checked)}
                    className="w-4 h-4 border border-black rounded focus:ring-2 focus:ring-[#10BF0A]"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Schedule for later</span>
                </label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleSubmit('draft')}
                  className="px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Save As Draft
                </button>
                <button
                  onClick={() => handleSubmit('send')}
                  className="px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm sm:text-base hover:bg-[#0EA50A] transition-colors"
                >
                  Send Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

