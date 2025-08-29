import React from 'react';
import { X, CheckCircle, UserCheck } from 'lucide-react';

export interface UserActivateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userId: number) => void;
  user: {
    id: number;
    name: string;
    email: string;
    company: {
      name: string;
    };
  } | null;
}

export const UserActivateModal: React.FC<UserActivateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  user
}) => {
  if (!isOpen || !user) return null;

  const handleConfirm = () => {
    onConfirm(user.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h3 className="text-lg font-semibold text-black dark:text-white">Activate User</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-[#10BF0A]/10 dark:bg-[#10BF0A]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-[#10BF0A] dark:text-[#10BF0A]" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-black dark:text-white mb-2">
                Are you sure you want to activate this user?
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The user will be reactivated and able to access the system again.
              </p>
            </div>
          </div>

          {/* User Details */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Name:</span>
                <span className="text-sm text-black dark:text-white ml-2">{user.name}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Email:</span>
                <span className="text-sm text-black dark:text-white ml-2">{user.email}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Company:</span>
                <span className="text-sm text-black dark:text-white ml-2">{user.company.name}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-[#E5E7EB] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              Activate User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
