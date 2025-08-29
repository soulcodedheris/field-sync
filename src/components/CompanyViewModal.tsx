import React from 'react';
import { X, Building, Mail, Users, Briefcase, Calendar, CreditCard, MapPin, Phone } from 'lucide-react';

export interface CompanyViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: any;
}

export const CompanyViewModal: React.FC<CompanyViewModalProps> = ({ isOpen, onClose, company }) => {
  if (!isOpen || !company) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Building className="w-5 h-5 text-[#10BF0A]" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Company Details</h2>
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
          {/* Company Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#10BF0A] rounded-full flex items-center justify-center">
              <span className="text-2xl text-white font-bold">{company.avatar}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{company.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{company.email}</p>
            </div>
          </div>

          {/* Status and Plan */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{company.status}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Plan</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{company.plan}</p>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Users</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{company.users}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Jobs Posted</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{company.jobsPosted}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{company.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">123 Business St, City, State 12345</span>
              </div>
            </div>
          </div>

          {/* Billing Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Billing Information</h4>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
                <span className="font-medium text-gray-900 dark:text-white">{company.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Billing Cycle</span>
                <span className="font-medium text-gray-900 dark:text-white">Monthly</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Next Billing Date</span>
                <span className="font-medium text-gray-900 dark:text-white">January 15, 2024</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Amount</span>
                <span className="font-bold text-[#10BF0A]">$299.00</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">Payment processed successfully</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">New user registered</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">Plan upgraded to Enterprise</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
