import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  ChevronDown,
  Camera,
  Check,
  AlertTriangle,
  HardDrive,
  MessageSquare,
  Video
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import googleDriveIcon from '../assets/google-drive-icon.png';
import slackIcon from '../assets/slack-icon.png';
import microsoftTeamsIcon from '../assets/microsoft-teams-icon.png';

export const SuperAdminSettings: React.FC = () => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'johndoe@fieldsync.com',
    platformName: 'TechCorp Solutions',
    timezone: 'UTC-5 (Eastern Time)',
    dateFormat: 'MM/DD/YYYY',
    language: 'English'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    systemAlerts: true,
    billingReminders: true,
    platformChanges: true,
    scheduleChanges: false,
    emailNotifications: false,
    email: true,
    inApp: true,
    sms: true,
    urgencyFilter: 'All notifications',
    doNotDisturb: true,
    startTime: '22:00',
    endTime: '12:00'
  });

  const [aiSettings, setAiSettings] = useState({
    enableAI: true,
    behaviorStyle: 'Helpful - Provides detailed assistance'
  });

  const [integrations, setIntegrations] = useState({
    googleDrive: { connected: true, lastSync: '2 minutes ago' },
    slack: { connected: false, lastSync: null },
    microsoftTeams: { connected: true, lastSync: '1 hour ago' },
    autoSync: true,
    realTimeNotifications: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: true
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: string, value: boolean | string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIntegrationToggle = (integration: string) => {
    setIntegrations(prev => {
      const integrationData = prev[integration as keyof typeof prev] as { connected: boolean; lastSync: string | null };
      return {
        ...prev,
        [integration]: {
          ...integrationData,
          connected: !integrationData.connected
        }
      };
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Platform Information */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-2xl font-medium text-black dark:text-white">Platform Information</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Update your personal details and contact information</p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={userAvatar1}
                  alt="Profile"
                  className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#10BF0A] rounded-full flex items-center justify-center">
                  <Camera className="w-3 h-3 text-white" />
                </button>
              </div>
              <div className="flex items-end gap-4">
                <div>
                  <div className="text-sm sm:text-base font-semibold text-black dark:text-white">John Doe</div>
                  <div className="text-xs sm:text-sm text-black dark:text-white">Member since January 2025</div>
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[rgba(255,255,255,0)] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base h-12 sm:h-[50px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base h-12 sm:h-[50px]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-[#10BF0A] text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0EA50A] transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Platform Preferences */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-2xl font-semibold text-black dark:text-white">Platform Preferences</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage platform preferences</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Platform Name</label>
              <input
                type="text"
                value={formData.platformName}
                onChange={(e) => handleInputChange('platformName', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base h-12 sm:h-[50px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Default Timezone</label>
              <select
                value={formData.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base h-12 sm:h-[50px]"
              >
                <option value="UTC-5 (Eastern Time)">UTC-5 (Eastern Time)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Date Format</label>
              <select
                value={formData.dateFormat}
                onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base h-12 sm:h-[50px]"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Language</label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base h-12 sm:h-[50px]"
              >
                <option value="English">English</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-[#10BF0A] text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0EA50A] transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-2xl font-medium text-black dark:text-white">Notification Preferences</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage your notification preferences and delivery methods</p>
          </div>
          
          <div className="space-y-4">
            {/* Notification Types */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-3 border-b border-[#F3F4F6]">
                <div>
                  <div className="text-base sm:text-lg font-medium text-black dark:text-white">System Alerts</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Receive notifications about system status and issues</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.systemAlerts}
                    onChange={(e) => handleNotificationChange('systemAlerts', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${notificationSettings.systemAlerts ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'}`}>
                    <div className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full transition-transform ${notificationSettings.systemAlerts ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                  </div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-3 border-b border-[#F3F4F6]">
                <div>
                  <div className="text-base sm:text-lg font-medium text-black dark:text-white">Billing Reminders</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Get notified about upcoming payments and invoices</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.billingReminders}
                    onChange={(e) => handleNotificationChange('billingReminders', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${notificationSettings.billingReminders ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'}`}>
                    <div className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full transition-transform ${notificationSettings.billingReminders ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                  </div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-3 border-b border-[#F3F4F6]">
                <div>
                  <div className="text-base sm:text-lg font-medium text-black dark:text-white">Platform Changes</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Updates about new features and platform changes</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.platformChanges}
                    onChange={(e) => handleNotificationChange('platformChanges', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${notificationSettings.platformChanges ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'}`}>
                    <div className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full transition-transform ${notificationSettings.platformChanges ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                  </div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-3 border-b border-[#F3F4F6]">
                <div>
                  <div className="text-base sm:text-lg font-medium text-black dark:text-white">Schedule Changes</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Updates when your schedule is modified</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.scheduleChanges}
                    onChange={(e) => handleNotificationChange('scheduleChanges', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${notificationSettings.scheduleChanges ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'}`}>
                    <div className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full transition-transform ${notificationSettings.scheduleChanges ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                  </div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 py-3 border-b border-[#E5E7EB]">
                <div>
                  <div className="text-base sm:text-lg font-medium text-black dark:text-white">Email Notifications</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Receive updates via email as well</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${notificationSettings.emailNotifications ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'}`}>
                    <div className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full transition-transform ${notificationSettings.emailNotifications ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                  </div>
                </label>
              </div>
            </div>

            {/* Notification Methods */}
            <div className="border-t border-[#EBEBEB] pt-4">
              <h3 className="text-lg sm:text-2xl font-medium text-black dark:text-white mb-4">Notification Methods</h3>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={notificationSettings.email} onChange={(e) => handleNotificationChange('email', e.target.checked)} className="w-4 h-4" />
                  <span className="text-sm sm:text-lg">Email</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={notificationSettings.inApp} onChange={(e) => handleNotificationChange('inApp', e.target.checked)} className="w-4 h-4" />
                  <span className="text-sm sm:text-lg">In-app</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={notificationSettings.sms} onChange={(e) => handleNotificationChange('sms', e.target.checked)} className="w-4 h-4" />
                  <span className="text-sm sm:text-lg">SMS</span>
                </label>
              </div>

              <div className="mb-6">
                <label className="block text-sm sm:text-lg font-medium text-black dark:text-white mb-2">Urgency Filter</label>
                <select
                  value={notificationSettings.urgencyFilter}
                  onChange={(e) => handleNotificationChange('urgencyFilter', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#D1D5DB] rounded-lg text-sm sm:text-base h-12 sm:h-[50px]"
                >
                  <option value="All notifications">All notifications</option>
                </select>
              </div>
            </div>

            {/* Do Not Disturb */}
            <div className="border-t border-[#EBEBEB] pt-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-black dark:text-white">Do Not Disturb</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Silence notifications during set hours</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.doNotDisturb}
                    onChange={(e) => handleNotificationChange('doNotDisturb', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${notificationSettings.doNotDisturb ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'}`}>
                    <div className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full transition-transform ${notificationSettings.doNotDisturb ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">Start Time</label>
                  <select
                    value={notificationSettings.startTime}
                    onChange={(e) => handleNotificationChange('startTime', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#D1D5DB] rounded-lg text-sm sm:text-base h-12 sm:h-[50px]"
                  >
                    <option value="22:00">22:00</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">End Time</label>
                  <select
                    value={notificationSettings.endTime}
                    onChange={(e) => handleNotificationChange('endTime', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#D1D5DB] rounded-lg text-sm sm:text-base h-12 sm:h-[50px]"
                  >
                    <option value="12:00">12:00</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t border-[#E5E7EB] pt-4">
            <button className="bg-[#10BF0A] text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0EA50A] transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      {/* Role & Permission Settings */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-2xl font-semibold text-black dark:text-white">Role & Permission Settings</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage your role & permission settings</p>
          </div>
          
          <div className="space-y-4">
            <div className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <div className="text-base sm:text-lg font-medium text-black dark:text-white">Admin</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Full platform access and user management</div>
                </div>
                <button className="text-[#10BF0A] font-medium hover:text-[#0EA50A] transition-colors">Edit Permissions</button>
              </div>
            </div>

            <div className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <div className="text-base sm:text-lg font-medium text-black dark:text-white">Technician</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Basic platform access and features</div>
                </div>
                <button className="text-[#10BF0A] font-medium hover:text-[#0EA50A] transition-colors">Edit Permissions</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Settings */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-2xl font-medium text-black dark:text-white">AI Assistant Settings</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Configure and customize your AI assistant behavior and features</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div>
                <div className="text-base sm:text-lg font-medium text-black dark:text-white">Enable AI Assistant</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Turn on/off the AI assistant functionality</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={aiSettings.enableAI}
                  onChange={(e) => setAiSettings(prev => ({ ...prev, enableAI: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className={`w-11 h-6 rounded-full peer ${aiSettings.enableAI ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'}`}>
                  <div className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full transition-transform ${aiSettings.enableAI ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                </div>
              </label>
            </div>

            <div>
              <div className="mb-2">
                <div className="text-base sm:text-lg font-medium text-black dark:text-white">Behavior Style</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Choose how the AI assistant interacts with users</div>
              </div>
              <select
                value={aiSettings.behaviorStyle}
                onChange={(e) => setAiSettings(prev => ({ ...prev, behaviorStyle: e.target.value }))}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#D1D5DB] rounded-lg text-sm sm:text-base h-12 sm:h-[50px]"
              >
                <option value="Helpful - Provides detailed assistance">Helpful - Provides detailed assistance</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Third-Party Integrations */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-2xl font-medium text-black dark:text-white">Third-Party Integrations</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Connect your favorite tools to streamline your workflow and enhance productivity.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Google Drive */}
            <div className="border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[rgba(245,245,245,0.64)] rounded-full flex items-center justify-center">
                    <img src={googleDriveIcon} alt="Google Drive" className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-medium text-black dark:text-white">Google Drive</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Cloud storage & file sharing</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integrations.googleDrive.connected}
                    onChange={() => handleIntegrationToggle('googleDrive')}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${integrations.googleDrive.connected ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'}`}>
                    <div className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full transition-transform ${integrations.googleDrive.connected ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                  </div>
                </label>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${integrations.googleDrive.connected ? 'bg-[#2ECC71]' : 'bg-[#9CA3AF]'}`}></div>
                  <span className={`text-sm font-medium ${integrations.googleDrive.connected ? 'text-[#2ECC71]' : 'text-[#374151]'}`}>
                    {integrations.googleDrive.connected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {integrations.googleDrive.connected ? `Last synced: ${integrations.googleDrive.lastSync}` : 'Connect to receive notifications'}
                </div>
              </div>
              
              <button className={`w-full mt-4 py-2 rounded-lg font-medium text-sm sm:text-base ${integrations.googleDrive.connected ? 'bg-[#FFDFDF] text-[#DC2626] hover:bg-red-100' : 'bg-[#10BF0A] text-white hover:bg-[#0EA50A]'} transition-colors`}>
                {integrations.googleDrive.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>

            {/* Slack */}
            <div className="border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[rgba(245,245,245,0.64)] rounded-full flex items-center justify-center">
                    <img src={slackIcon} alt="Slack" className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-medium text-black dark:text-white">Slack</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Team communication</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integrations.slack.connected}
                    onChange={() => handleIntegrationToggle('slack')}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${integrations.slack.connected ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'}`}>
                    <div className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full transition-transform ${integrations.slack.connected ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                  </div>
                </label>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${integrations.slack.connected ? 'bg-[#22C55E]' : 'bg-[#9CA3AF]'}`}></div>
                  <span className={`text-sm font-medium ${integrations.slack.connected ? 'text-[#15803D]' : 'text-[#374151]'}`}>
                    {integrations.slack.connected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {integrations.slack.connected ? `Last synced: ${integrations.slack.lastSync}` : 'Connect to receive notifications'}
                </div>
              </div>
              
              <button className={`w-full mt-4 py-2 rounded-lg font-medium text-sm sm:text-base ${integrations.slack.connected ? 'bg-[#FFDFDF] text-[#DC2626] hover:bg-red-100' : 'bg-[#10BF0A] text-white hover:bg-[#0EA50A]'} transition-colors`}>
                {integrations.slack.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>

            {/* Microsoft Teams */}
            <div className="border border-[#E5E7EB] rounded-xl p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[rgba(245,245,245,0.64)] rounded-full flex items-center justify-center">
                    <img src={microsoftTeamsIcon} alt="Microsoft Teams" className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-medium text-black dark:text-white">Microsoft Teams</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Video calls & collaboration</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integrations.microsoftTeams.connected}
                    onChange={() => handleIntegrationToggle('microsoftTeams')}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${integrations.microsoftTeams.connected ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'}`}>
                    <div className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full transition-transform ${integrations.microsoftTeams.connected ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                  </div>
                </label>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${integrations.microsoftTeams.connected ? 'bg-[#22C55E]' : 'bg-[#9CA3AF]'}`}></div>
                  <span className={`text-sm font-medium ${integrations.microsoftTeams.connected ? 'text-[#15803D]' : 'text-[#374151]'}`}>
                    {integrations.microsoftTeams.connected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {integrations.microsoftTeams.connected ? `Last synced: ${integrations.microsoftTeams.lastSync}` : 'Connect to receive notifications'}
                </div>
              </div>
              
              <button className={`w-full mt-4 py-2 rounded-lg font-medium text-sm sm:text-base ${integrations.microsoftTeams.connected ? 'bg-[#FFDFDF] text-[#DC2626] hover:bg-red-100' : 'bg-[#10BF0A] text-white hover:bg-[#0EA50A]'} transition-colors`}>
                {integrations.microsoftTeams.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>

          {/* Integration Settings */}
          <div className="border-t border-[#EBEBEB] pt-4">
            <h3 className="text-lg sm:text-2xl font-medium text-black dark:text-white mb-4">Integration Settings</h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <div className="text-base sm:text-lg font-medium text-black dark:text-white">Auto-sync data</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Automatically synchronize data across all connected services</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integrations.autoSync}
                    onChange={(e) => setIntegrations(prev => ({ ...prev, autoSync: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${integrations.autoSync ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'}`}>
                    <div className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full transition-transform ${integrations.autoSync ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                  </div>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <div className="text-base sm:text-lg font-medium text-black dark:text-white">Real-time notifications</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Receive instant notifications from connected services</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integrations.realTimeNotifications}
                    onChange={(e) => setIntegrations(prev => ({ ...prev, realTimeNotifications: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${integrations.realTimeNotifications ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'}`}>
                    <div className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full transition-transform ${integrations.realTimeNotifications ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-2xl font-medium text-black dark:text-white">Security Settings</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage your account security and authentication preferences</p>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {/* Password Change */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm sm:text-lg font-medium text-black dark:text-white mb-2">Current Password</label>
                <input
                  type="password"
                  value={securitySettings.currentPassword}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base h-12 sm:h-[50px]"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-lg font-medium text-black dark:text-white mb-2">New Password</label>
                <input
                  type="password"
                  value={securitySettings.newPassword}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter new current password"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base h-12 sm:h-[50px]"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-lg font-medium text-black dark:text-white mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={securitySettings.confirmPassword}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm new current password"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base h-12 sm:h-[50px]"
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-[#E5E7EB] pt-4">
              <button className="bg-[#10BF0A] text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0EA50A] transition-colors">
                Save Password
              </button>
            </div>

            {/* Two-Factor Authentication */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <div className="text-lg sm:text-2xl font-medium text-black dark:text-white">Two-Factor Authentication</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.twoFactorAuth}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className={`w-11 h-6 rounded-full peer ${securitySettings.twoFactorAuth ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'}`}>
                    <div className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full transition-transform ${securitySettings.twoFactorAuth ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
                  </div>
                </label>
              </div>

              {securitySettings.twoFactorAuth && (
                <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#1E40AF]">2FA is currently enabled</div>
                      <div className="text-xs text-[#1D4ED8]">Your account is protected with authenticator app verification</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Session History */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg sm:text-2xl font-medium text-black dark:text-white">Session History</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Recent login activity on your account</p>
              </div>
              
              <div className="space-y-4">
                <div className="border border-[#E1E1E1] rounded-lg p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">Date & Time</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Jan 15, 2024 2:30 PM</div>
                </div>
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">IP Address</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">192.168.1.1</div>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">Device</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">MacBook Pro</div>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">Location</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">New York, US</div>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">Status</div>
                      <div className="text-sm">
                    <span className="inline-flex items-center gap-2 px-2 py-1 bg-[#DCFBE9] text-[#2ECC71] text-xs rounded">
                      <div className="w-2 h-2 bg-[#2ECC71] rounded-full"></div>
                      Active
                    </span>
                  </div>
                </div>
                  </div>
                </div>

                <div className="border border-[#E1E1E1] rounded-lg p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">Date & Time</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Jan 15, 2024 2:30 PM</div>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">IP Address</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">203.45.67.89</div>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">Device</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">iPhone 15</div>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">Location</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">San Francisco, US</div>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">Status</div>
                      <div className="text-sm">
                        <span className="inline-flex items-center gap-2 px-2 py-1 bg-[rgba(202,202,202,0.8)] text-gray-600 dark:text-gray-400 text-xs rounded">
                      <div className="w-2 h-2 bg-[#6C6C6C] rounded-full"></div>
                      Expired
                    </span>
                  </div>
                </div>
                  </div>
                </div>

                <div className="border border-[#E1E1E1] rounded-lg p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">Date & Time</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Jan 15, 2024 2:30 PM</div>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">IP Address</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">156.78.90.12</div>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">Device</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Windows PC</div>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">Location</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">London, UK</div>
                    </div>
                    <div className="lg:col-span-1">
                      <div className="text-sm font-medium text-black dark:text-white">Status</div>
                      <div className="text-sm">
                        <span className="inline-flex items-center gap-2 px-2 py-1 bg-[rgba(202,202,202,0.8)] text-gray-600 dark:text-gray-400 text-xs rounded">
                      <div className="w-2 h-2 bg-[#6C6C6C] rounded-full"></div>
                      Expired
                    </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-[#E5E7EB] pt-4">
              <button className="bg-[#DC2626] text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                Logout All Devices
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="border-b border-[#FECACA] pb-4">
            <h2 className="text-lg sm:text-2xl font-medium text-[#DC2626]">Danger Zone</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-[#FFDFDF] border border-[#FECACA] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-[#EF4444] rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-[#DC2626]">Warning</span>
              </div>
              <p className="text-xs text-[#DC2626]">
                Deactivating your account will remove all access to the platform. This action cannot be undone.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div>
                <div className="text-base font-medium text-black dark:text-white">Deactivate Account</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Permanently disable your Super Admin account</div>
              </div>
              <button className="bg-[#DC2626] text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
