import React, { useState } from 'react';
import { Camera, ChevronDown } from 'lucide-react';
import userAvatar3 from '../assets/user-avatar-3.png';
import googleDriveIcon from '../assets/google-drive-icon.png';
import slackIcon from '../assets/slack-icon.png';
import microsoftTeamsIcon from '../assets/microsoft-teams-icon.png';
import { ProfileEditModal } from '../components/ProfileEditModal';

// Mock data for settings
const mockSettings = {
  profile: {
    fullName: 'John Doe',
    email: 'johndoe@fieldsync.com',
    role: 'Senior Technician',
    phone: '+1 (555) 123-4567',
    memberSince: 'January 2025'
  },
  notifications: {
    newJobAssignments: true,
    clockInReminders: true,
    urgentJobAlerts: true,
    scheduleChanges: false,
    emergencyAlerts: false,
    notificationMethods: {
      email: true,
      inApp: true,
      sms: true
    },
    urgencyFilter: 'All notifications',
    dndEnabled: true,
    dndStart: '22:00',
    dndEnd: '12:00'
  },
  aiAssistant: {
    enabled: true,
    behaviorStyle: 'Helpful - Provides detailed assistance'
  },
  integrations: {
    googleDrive: {
      connected: true,
      lastSynced: '2 minutes ago'
    },
    slack: {
      connected: false
    },
    microsoftTeams: {
      connected: true,
      lastSynced: '1 hour ago'
    },
    autoSync: true,
    realTimeNotifications: true
  },
  security: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    sessionHistory: [
      { date: 'Jan 15, 2024 2:30 PM', ip: '192.168.1.1', device: 'MacBook Pro', location: 'New York, US', status: 'Active' },
      { date: 'Jan 15, 2024 2:30 PM', ip: '203.45.67.89', device: 'iPhone 15', location: 'San Francisco, US', status: 'Expired' },
      { date: 'Jan 15, 2024 2:30 PM', ip: '156.78.90.12', device: 'Windows PC', location: 'London, UK', status: 'Expired' }
    ]
  }
};

export const TechnicianSettings: React.FC = () => {
  const [settings, setSettings] = useState(mockSettings);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleToggle = (section: string, field: string) => {
    setSettings(prev => {
      const sectionData = prev[section as keyof typeof prev];
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: !(sectionData as any)[field]
        }
      };
    });
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSaveProfile = (profile: any) => {
    console.log('Saving profile:', profile);
    // TODO: Implement profile save logic
    setIsProfileModalOpen(false);
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div 
      onClick={onChange}
      className={`w-11 h-6 rounded-full cursor-pointer transition-colors duration-200 ${
        checked ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'
      }`}
    >
      <div 
        className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full border-2 border-white dark:border-gray-600 transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        } mt-0.5`}
      />
    </div>
  );

  const StatusBadge = ({ status }: { status: string }) => (
    <div className={`flex items-center gap-2 px-2 py-1 rounded ${
      status === 'Active' 
        ? 'bg-[#DCFBE9] text-[#2ECC71]' 
        : 'bg-[rgba(202,202,202,0.8)] text-gray-600 dark:text-gray-400'
    }`}>
      <div className={`w-2 h-2 rounded-full ${
        status === 'Active' ? 'bg-[#2ECC71]' : 'bg-[#6C6C6C]'
      }`} />
      <span className="text-xs font-medium">{status}</span>
    </div>
  );

  return (
    <div className=" sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-[28px] font-medium text-black dark:text-white">Settings</h1>
          <p className="text-sm sm:text-lg text-black dark:text-white">Manage your profile and preferences</p>
        </div>
      </div>

      {/* Profile Information Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-6">
          <div className="border-b border-[#EBEBEB] pb-4">
            <h2 className="text-lg sm:text-[23px] font-medium text-black dark:text-white">Profile Information</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update your personal details and contact information</p>
          </div>

          {/* Profile Photo and Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <img 
                src={userAvatar3} 
                alt="Profile" 
                className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full object-cover border-2 border-[#E5E7EB]"
              />
              <button className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#10BF0A] rounded-full flex items-center justify-center border-2 border-white">
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-sm font-semibold text-black dark:text-white truncate">{settings.profile.fullName}</h3>
                <div className="w-6 h-6 bg-transparent rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-4 h-4">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-xs text-black dark:text-white">Member since {settings.profile.memberSince}</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Full Name</label>
                <input
                  type="text"
                  value={settings.profile.fullName}
                  onChange={(e) => handleInputChange('profile', 'fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-base sm:text-lg text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Email Address</label>
                <input
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                  className="w-full px-4 py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-base sm:text-lg text-black dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Role</label>
                <div className="relative">
                  <select
                    value={settings.profile.role}
                    onChange={(e) => handleInputChange('profile', 'role', e.target.value)}
                    className="w-full px-4 py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-base sm:text-lg text-black dark:text-white appearance-none pr-10"
                  >
                    <option value="Senior Technician">Senior Technician</option>
                    <option value="Technician">Technician</option>
                    <option value="Junior Technician">Junior Technician</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black dark:text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black dark:text-white mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={settings.profile.phone}
                  onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                  className="w-full px-4 py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-base sm:text-lg text-black dark:text-white"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button 
                onClick={() => setIsProfileModalOpen(true)}
                className="px-4 py-2 border border-[#E5E7EB] text-black dark:text-white rounded-lg text-sm sm:text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm sm:text-base font-medium">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-6">
          <div className="border-b border-[#EBEBEB] pb-4">
            <h2 className="text-lg sm:text-[23px] font-medium text-black dark:text-white">Notification Preferences</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage your notification preferences and delivery methods</p>
          </div>

          {/* Notification Types */}
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-[#F3F4F6] gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-medium text-black dark:text-white">New Job Assignments</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when new jobs are assigned to you</p>
              </div>
              <ToggleSwitch 
                checked={settings.notifications.newJobAssignments}
                onChange={() => handleToggle('notifications', 'newJobAssignments')}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-[#F3F4F6] gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-medium text-black dark:text-white">Clock-in Reminders</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Remind me to clock in at the start of my shift</p>
              </div>
              <ToggleSwitch 
                checked={settings.notifications.clockInReminders}
                onChange={() => handleToggle('notifications', 'clockInReminders')}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-[#F3F4F6] gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-medium text-black dark:text-white">Urgent Job Alerts</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Immediate notifications for high-priority jobs</p>
              </div>
              <ToggleSwitch 
                checked={settings.notifications.urgentJobAlerts}
                onChange={() => handleToggle('notifications', 'urgentJobAlerts')}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-[#F3F4F6] gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-medium text-black dark:text-white">Schedule Changes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Updates when your schedule is modified</p>
              </div>
              <ToggleSwitch 
                checked={settings.notifications.scheduleChanges}
                onChange={() => handleToggle('notifications', 'scheduleChanges')}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-[#E5E7EB] gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-medium text-black dark:text-white">Emergency Alerts</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Critical system alerts and emergencies</p>
              </div>
              <ToggleSwitch 
                checked={settings.notifications.emergencyAlerts}
                onChange={() => handleToggle('notifications', 'emergencyAlerts')}
              />
            </div>
          </div>

          {/* Notification Methods */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-[23px] font-medium text-black dark:text-white">Notification Methods</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={settings.notifications.notificationMethods.email}
                  className="w-5 h-5 border border-black rounded"
                />
                <span className="text-base sm:text-lg text-black dark:text-white">Email</span>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={settings.notifications.notificationMethods.inApp}
                  className="w-5 h-5 border border-black rounded"
                />
                <span className="text-base sm:text-lg text-black dark:text-white">In-app</span>
              </div>
              <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-1">
                <input 
                  type="checkbox" 
                  checked={settings.notifications.notificationMethods.sms}
                  className="w-5 h-5 border border-black rounded"
                />
                <span className="text-base sm:text-lg text-black dark:text-white">SMS</span>
              </div>
            </div>

            <div>
              <label className="block text-base sm:text-lg font-medium text-black dark:text-white mb-2">Urgency Filter</label>
              <div className="relative">
                <select
                  value={settings.notifications.urgencyFilter}
                  onChange={(e) => handleInputChange('notifications', 'urgencyFilter', e.target.value)}
                  className="w-full px-4 py-3 border border-[#D1D5DB] rounded-lg text-sm text-black dark:text-white appearance-none pr-10"
                >
                  <option value="All notifications">All notifications</option>
                  <option value="High priority only">High priority only</option>
                  <option value="Medium and high">Medium and high</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black dark:text-white" />
              </div>
            </div>

            {/* Do Not Disturb */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-medium text-black dark:text-white">Do Not Disturb</h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-black dark:text-white">Enable DND</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Silence notifications during set hours</p>
                </div>
                <ToggleSwitch 
                  checked={settings.notifications.dndEnabled}
                  onChange={() => handleToggle('notifications', 'dndEnabled')}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">Start Time</label>
                  <div className="relative">
                    <select
                      value={settings.notifications.dndStart}
                      onChange={(e) => handleInputChange('notifications', 'dndStart', e.target.value)}
                      className="w-full px-4 py-3 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-sm text-black dark:text-white appearance-none"
                    >
                      <option value="22:00">22:00</option>
                      <option value="23:00">23:00</option>
                      <option value="00:00">00:00</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black dark:text-white mb-2">End Time</label>
                  <div className="relative">
                    <select
                      value={settings.notifications.dndEnd}
                      onChange={(e) => handleInputChange('notifications', 'dndEnd', e.target.value)}
                      className="w-full px-4 py-3 border border-[#D1D5DB] dark:border-gray-600 rounded-lg text-sm text-black dark:text-white appearance-none"
                    >
                      <option value="12:00">12:00</option>
                      <option value="06:00">06:00</option>
                      <option value="08:00">08:00</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t border-[#E5E7EB] pt-4">
            <button className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-base font-medium">
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      {/* AI Assistant Settings Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
        <div className="space-y-6">
          <div className="border-b border-[#EBEBEB] pb-4">
            <h2 className="text-[23px] font-medium text-black dark:text-white">AI Assistant Settings</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Configure and customize your AI assistant behavior and features</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white">Enable AI Assistant</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Turn on/off the AI assistant functionality</p>
            </div>
            <ToggleSwitch 
              checked={settings.aiAssistant.enabled}
              onChange={() => handleToggle('aiAssistant', 'enabled')}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-black dark:text-white">Behavior Style</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Choose how the AI assistant interacts with users</p>
            <div className="relative">
              <select
                value={settings.aiAssistant.behaviorStyle}
                onChange={(e) => handleInputChange('aiAssistant', 'behaviorStyle', e.target.value)}
                className="w-full px-4 py-3 border border-[#D1D5DB] rounded-lg text-sm text-black dark:text-white appearance-none pr-10"
              >
                <option value="Helpful - Provides detailed assistance">Helpful - Provides detailed assistance</option>
                <option value="Concise - Brief responses">Concise - Brief responses</option>
                <option value="Professional - Formal tone">Professional - Formal tone</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black dark:text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Third-Party Integrations Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
        <div className="space-y-6">
          <div className="border-b border-[#EBEBEB] pb-4">
            <h2 className="text-[23px] font-medium text-black dark:text-white">Third-Party Integrations</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Connect your favorite tools to streamline your workflow and enhance productivity.</p>
          </div>

          {/* Integration Cards */}
          <div className="space-y-4">
            {/* Google Drive */}
            <div className="border border-[#E5E7EB] rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[rgba(245,245,245,0.64)] rounded-full flex items-center justify-center flex-shrink-0">
                      <img src={googleDriveIcon} alt="Google Drive" className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg font-medium text-black dark:text-white truncate">Google Drive</h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Cloud storage & file sharing</p>
                    </div>
                  </div>
                  <ToggleSwitch 
                    checked={settings.integrations.googleDrive.connected}
                    onChange={() => handleToggle('integrations.googleDrive', 'connected')}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#2ECC71] rounded-full"></div>
                      <span className="text-xs font-medium text-[#2ECC71]">Connected</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Last synced: {settings.integrations.googleDrive.lastSynced}</p>
                  </div>
                  <button className="px-3 sm:px-4 py-2 bg-[#FFDFDF] text-[#DC2626] rounded-lg text-sm sm:text-lg font-medium">
                    Disconnect
                  </button>
                </div>
              </div>
            </div>

            {/* Slack */}
            <div className="border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[rgba(245,245,245,0.64)] rounded-full flex items-center justify-center">
                      <img src={slackIcon} alt="Slack" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-black dark:text-white">Slack</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Team communication</p>
                    </div>
                  </div>
                  <ToggleSwitch 
                    checked={settings.integrations.slack.connected}
                    onChange={() => handleToggle('integrations.slack', 'connected')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#9CA3AF] rounded-full"></div>
                      <span className="text-sm font-medium text-[#374151]">Not Connected</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Connect to receive notifications</p>
                  </div>
                  <button className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-lg font-medium">
                    Connect
                  </button>
                </div>
              </div>
            </div>

            {/* Microsoft Teams */}
            <div className="border border-[#E5E7EB] rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[rgba(245,245,245,0.64)] rounded-full flex items-center justify-center">
                      <img src={microsoftTeamsIcon} alt="Microsoft Teams" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-black dark:text-white">Microsoft Teams</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Video calls & collaboration</p>
                    </div>
                  </div>
                  <ToggleSwitch 
                    checked={settings.integrations.microsoftTeams.connected}
                    onChange={() => handleToggle('integrations.microsoftTeams', 'connected')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
                      <span className="text-sm font-medium text-[#15803D]">Connected</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Last synced: {settings.integrations.microsoftTeams.lastSynced}</p>
                  </div>
                  <button className="px-4 py-2 bg-[#FFDFDF] text-[#DC2626] rounded-lg text-lg font-medium">
                    Disconnect
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Settings */}
          <div className="space-y-4">
            <h3 className="text-[23px] font-medium text-black dark:text-white">Integration Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-black dark:text-white">Auto-sync data</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatically synchronize data across all connected services</p>
                </div>
                <ToggleSwitch 
                  checked={settings.integrations.autoSync}
                  onChange={() => handleToggle('integrations', 'autoSync')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium text-black dark:text-white">Real-time notifications</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive instant notifications from connected services</p>
                </div>
                <ToggleSwitch 
                  checked={settings.integrations.realTimeNotifications}
                  onChange={() => handleToggle('integrations', 'realTimeNotifications')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
        <div className="space-y-6">
          <div className="border-b border-[#EBEBEB] pb-4">
            <h2 className="text-[23px] font-medium text-black dark:text-white">Security Settings</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account security and authentication preferences</p>
          </div>

          {/* Password Change */}
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-black dark:text-white mb-2">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                value={settings.security.currentPassword}
                onChange={(e) => handleInputChange('security', 'currentPassword', e.target.value)}
                className="w-full px-4 py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-base text-[rgba(108,108,108,0.5)] placeholder-[rgba(108,108,108,0.5)]"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-black dark:text-white mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new current password"
                value={settings.security.newPassword}
                onChange={(e) => handleInputChange('security', 'newPassword', e.target.value)}
                className="w-full px-4 py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-base text-[rgba(108,108,108,0.5)] placeholder-[rgba(108,108,108,0.5)]"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-black dark:text-white mb-2">Confirm New Password</label>
              <input
                type="password"
                placeholder="Confirm new current password"
                value={settings.security.confirmPassword}
                onChange={(e) => handleInputChange('security', 'confirmPassword', e.target.value)}
                className="w-full px-4 py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-base text-[rgba(108,108,108,0.5)] placeholder-[rgba(108,108,108,0.5)]"
              />
            </div>
            <div className="flex justify-end border-t border-[#E5E7EB] pt-4">
              <button className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-base font-medium">
                Save Password
              </button>
            </div>
          </div>

          {/* Two-Factor Authentication */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[23px] font-medium text-black dark:text-white">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
              </div>
              <ToggleSwitch 
                checked={settings.security.twoFactorEnabled}
                onChange={() => handleToggle('security', 'twoFactorEnabled')}
              />
            </div>

            <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1E40AF]">2FA is currently enabled</p>
                  <p className="text-xs text-[#1D4ED8]">Your account is protected with authenticator app verification</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session History */}
          <div className="space-y-4">
            <div>
              <h3 className="text-[23px] font-medium text-black dark:text-white">Session History</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Recent login activity on your account</p>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 text-lg font-medium text-black dark:text-white">Date & Time</th>
                    <th className="text-left py-4 px-4 text-lg font-medium text-black dark:text-white">IP Address</th>
                    <th className="text-left py-4 px-4 text-lg font-medium text-black dark:text-white">Device</th>
                    <th className="text-left py-4 px-4 text-lg font-medium text-black dark:text-white">Location</th>
                    <th className="text-center py-4 px-4 text-lg font-medium text-black dark:text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {settings.security.sessionHistory.map((session, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-4 px-4 text-sm text-black dark:text-white">{session.date}</td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{session.ip}</td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{session.device}</td>
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{session.location}</td>
                      <td className="py-4 px-4 text-center">
                        <StatusBadge status={session.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-3">
              {settings.security.sessionHistory.map((session, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-sm font-medium text-black dark:text-white">{session.date}</span>
                    </div>
                    <StatusBadge status={session.status} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600 dark:text-gray-400">IP Address:</span>
                      <span className="text-sm text-black dark:text-white">{session.ip}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Device:</span>
                      <span className="text-sm text-black dark:text-white">{session.device}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Location:</span>
                      <span className="text-sm text-black dark:text-white">{session.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end border-t border-[#E5E7EB] pt-4">
              <button className="px-4 py-2 bg-[#DC2626] text-white rounded-lg text-base font-medium">
                Logout All Devices
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSave={handleSaveProfile}
        profile={{
          id: 1,
          name: settings.profile.fullName,
          email: settings.profile.email,
          phone: settings.profile.phone,
          avatar: userAvatar3,
          role: settings.profile.role as any,
          company: 'FieldSync',
          location: 'New York',
          bio: 'Experienced technician with 5+ years in HVAC systems',
          joinDate: settings.profile.memberSince,
          preferences: {
            notifications: {
              email: settings.notifications.notificationMethods.email,
              push: settings.notifications.notificationMethods.inApp,
              sms: settings.notifications.notificationMethods.sms
            },
            privacy: {
              profileVisible: true,
              showLocation: true,
              showContact: true
            }
          }
        }}
        isOwnProfile={true}
      />
    </div>
  );
};