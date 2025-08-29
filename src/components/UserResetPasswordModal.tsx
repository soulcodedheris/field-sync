import React, { useState } from 'react';
import { X, Lock, Eye, EyeOff, Save } from 'lucide-react';

export interface UserResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userId: number, newPassword: string) => void;
  user: {
    id: number;
    name: string;
    email: string;
    company: {
      name: string;
    };
  } | null;
}

export const UserResetPasswordModal: React.FC<UserResetPasswordModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  user
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setError('');
    onConfirm(user.id, newPassword);
    onClose();
  };

  const handleClose = () => {
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h3 className="text-lg font-semibold text-black dark:text-white">Reset Password</h3>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-black dark:text-white mb-2">
                Reset password for {user.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter a new password for this user. They will be required to change it on their next login.
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="text-xs text-gray-600 dark:text-gray-400">
              Password must be at least 8 characters long and contain a mix of letters, numbers, and special characters.
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-[#E5E7EB] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
