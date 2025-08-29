import React from 'react';
import { X, Eye } from 'lucide-react';

export interface AnnouncementViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  announcement: {
    id: string | number;
    title: string;
    content: string;
    timestamp?: string;
    company?: string;
    views?: string;
    status?: string;
    priority?: string;
    category?: string;
  } | null;
}

export const AnnouncementViewModal: React.FC<AnnouncementViewModalProps> = ({ isOpen, onClose, announcement }) => {
  if (!isOpen || !announcement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB] dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#10BF0A]" />
            <h2 className="text-lg font-semibold text-black dark:text-white">Announcement</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-semibold text-black dark:text-white break-words">{announcement.title}</h3>
          {announcement.timestamp && (
            <div className="text-sm text-gray-600 dark:text-gray-400">{announcement.timestamp}</div>
          )}
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">{announcement.content}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-6 border-t border-[#EBEBEB] dark:border-gray-700">
          <button onClick={onClose} className="px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


