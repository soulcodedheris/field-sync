import React from 'react';

export interface SafetyChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const SafetyChecklistModal: React.FC<SafetyChecklistModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full">
        <h2 className="text-lg sm:text-xl font-medium text-black dark:text-white mb-3 sm:mb-4">Safety Checklist</h2>
        <p className="text-sm text-gray-600 mb-4 sm:mb-6">Complete your daily safety checklist</p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input type="checkbox" id="ppe" className="w-4 h-4" />
            <label htmlFor="ppe" className="text-sm text-black dark:text-white">Personal Protective Equipment (PPE)</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="tools" className="w-4 h-4" />
            <label htmlFor="tools" className="text-sm text-black dark:text-white">Tools and equipment checked</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="area" className="w-4 h-4" />
            <label htmlFor="area" className="text-sm text-black dark:text-white">Work area safety assessment</label>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onComplete}
            className="flex-1 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm font-medium hover:bg-[#0EA509] transition-colors"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};
