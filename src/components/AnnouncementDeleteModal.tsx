import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

export interface AnnouncementDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string | number) => void;
  announcement: { id: string | number; title: string } | null;
}

export const AnnouncementDeleteModal: React.FC<AnnouncementDeleteModalProps> = ({ isOpen, onClose, onConfirm, announcement }) => {
  if (!isOpen || !announcement) return null;

  const handleConfirm = () => {
    onConfirm(announcement.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB] dark:border-gray-700">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-black dark:text-white">Delete Announcement</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-6 space-y-3">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Are you sure you want to delete the announcement:
          </p>
          <p className="text-sm font-medium text-black dark:text-white break-words">“{announcement.title}”</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end gap-2 p-6 border-t border-[#EBEBEB] dark:border-gray-700">
          <button onClick={onClose} className="px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
            Cancel
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};


