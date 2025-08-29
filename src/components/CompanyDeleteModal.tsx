import React from 'react';
import { X, AlertTriangle, Building, Users, Briefcase } from 'lucide-react';

export interface CompanyDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (companyId: number) => void;
  company: any;
}

export const CompanyDeleteModal: React.FC<CompanyDeleteModalProps> = ({ isOpen, onClose, onConfirm, company }) => {
  if (!isOpen || !company) return null;

  const handleConfirm = () => {
    onConfirm(company.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Company</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Warning Message */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Warning</h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  This action cannot be undone. Deleting this company will permanently remove all associated data including users, jobs, and billing information.
                </p>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#10BF0A] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{company.avatar}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{company.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{company.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{company.users} users</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{company.jobsPosted} jobs</span>
              </div>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="space-y-3 mb-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">This will delete:</h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                All company data and settings
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                {company.users} user accounts
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                {company.jobsPosted} job postings
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                All billing and payment history
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                All audit logs and activity records
              </li>
            </ul>
          </div>

          {/* Confirmation Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type "DELETE" to confirm
            </label>
            <input
              type="text"
              placeholder="DELETE"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete Company
          </button>
        </div>
      </div>
    </div>
  );
};
