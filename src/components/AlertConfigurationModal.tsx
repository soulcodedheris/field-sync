import React, { useState } from 'react';
import { X, Bell, Users, Clock, Save, ToggleLeft, ToggleRight } from 'lucide-react';

export interface AlertConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (alertData: any) => void;
}

export const AlertConfigurationModal: React.FC<AlertConfigurationModalProps> = ({
  isOpen,
  onClose,
  onSend
}) => {
  const [formData, setFormData] = useState({
    message: '',
    priority: 'medium',
    recipients: [] as string[],
    sendImmediately: false,
    scheduledTime: '',
    includeTechnicians: true,
    includeAdmins: false,
    includeClients: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(formData);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      message: '',
      priority: 'medium',
      recipients: [],
      sendImmediately: false,
      scheduledTime: '',
      includeTechnicians: true,
      includeAdmins: false,
      includeClients: false
    });
    onClose();
  };

  const toggleRecipient = (recipient: string) => {
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.includes(recipient)
        ? prev.recipients.filter(r => r !== recipient)
        : [...prev.recipients, recipient]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h3 className="text-lg font-semibold text-black dark:text-white">Configure Alert</h3>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              <Bell className="w-4 h-4 inline mr-2" />
              Alert Message *
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
              rows={4}
              placeholder="Enter your alert message..."
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Priority Level
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Recipients */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-3">
              <Users className="w-4 h-4 inline mr-2" />
              Recipients
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeTechnicians}
                  onChange={(e) => setFormData({ ...formData, includeTechnicians: e.target.checked })}
                  className="w-4 h-4 text-[#10BF0A] border-gray-300 rounded focus:ring-[#10BF0A]"
                />
                <div>
                  <div className="font-medium text-black dark:text-white">All Technicians</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Send to all active technicians</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeAdmins}
                  onChange={(e) => setFormData({ ...formData, includeAdmins: e.target.checked })}
                  className="w-4 h-4 text-[#10BF0A] border-gray-300 rounded focus:ring-[#10BF0A]"
                />
                <div>
                  <div className="font-medium text-black dark:text-white">Administrators</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Send to all admin users</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeClients}
                  onChange={(e) => setFormData({ ...formData, includeClients: e.target.checked })}
                  className="w-4 h-4 text-[#10BF0A] border-gray-300 rounded focus:ring-[#10BF0A]"
                />
                <div>
                  <div className="font-medium text-black dark:text-white">Clients</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Send to relevant clients</div>
                </div>
              </label>
            </div>
          </div>

          {/* Timing */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-3">
              <Clock className="w-4 h-4 inline mr-2" />
              Send Timing
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="timing"
                  checked={formData.sendImmediately}
                  onChange={() => setFormData({ ...formData, sendImmediately: true })}
                  className="w-4 h-4 text-[#10BF0A] border-gray-300 focus:ring-[#10BF0A]"
                />
                <div>
                  <div className="font-medium text-black dark:text-white">Send Immediately</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Send alert right away</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="timing"
                  checked={!formData.sendImmediately}
                  onChange={() => setFormData({ ...formData, sendImmediately: false })}
                  className="w-4 h-4 text-[#10BF0A] border-gray-300 focus:ring-[#10BF0A]"
                />
                <div>
                  <div className="font-medium text-black dark:text-white">Schedule for Later</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Send at a specific time</div>
                </div>
              </label>

              {!formData.sendImmediately && (
                <div className="ml-7">
                  <input
                    type="datetime-local"
                    value={formData.scheduledTime}
                    onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
                    required={!formData.sendImmediately}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-[#E5E7EB] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Send Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
