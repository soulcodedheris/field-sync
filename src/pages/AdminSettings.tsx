import React, { useState } from 'react';
import {
  Plus,
  Upload,
  ChevronDown,
  Trash2,
  UserX,
  Check,
  X,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

// Import images
import companyLogoPlaceholder from '../assets/company-logo-placeholder.png';
import googleDriveIcon from '../assets/google-drive-icon.png';
import slackIcon from '../assets/slack-icon.png';
import microsoftTeamsIcon from '../assets/microsoft-teams-icon.png';
import visaCard from '../assets/visa-card.png';
import mikeDavisAvatar from '../assets/mike-davis-avatar.png';
import sarahJohnsonAvatar from '../assets/sarah-johnson-avatar.png';

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('company');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    newJobAssignments: true,
    teamJobAssignments: true,
    paymentConfirmed: true,
    lowInventoryAlert: false,
    emergencyAlerts: false,
    doNotDisturb: true
  });

  const handleToggleSetting = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log('Download invoice clicked:', invoiceId);
    const blob = new Blob([
      `Invoice ${invoiceId}\nAmount: $99.00\nStatus: PAID\nDate: Dec 15, 2023`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${invoiceId}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="pl-0 sm:pl-4">
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Settings</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white mt-2">Manage your account settings and preferences</p>
          </div>
        </div>
      </div>

      {/* Company Details Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">Company Details</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Basic information about your business</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Company Name</label>
              <input
                type="text"
                defaultValue="TechCorp Solutions"
                className="w-full h-12 sm:h-[50px] px-3 sm:px-4 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base text-black dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Company Type</label>
              <div className="relative">
                <select className="w-full h-12 sm:h-[50px] px-3 sm:px-4 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base text-black dark:text-white appearance-none">
                  <option>Select company type</option>
                  <option>Technology</option>
                  <option>Manufacturing</option>
                  <option>Service</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-black dark:text-white" />
              </div>
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-black dark:text-white mb-2">Company Address</label>
              <input
                type="text"
                defaultValue="123 Main Street, New York, NY 10001"
                className="w-full h-12 sm:h-[50px] px-3 sm:px-4 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base text-black dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Branding Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">Branding</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Upload and manage your company logo</p>
          </div>
          
          <div className="space-y-4">
            <label className="block text-sm sm:text-base font-medium text-black dark:text-white mb-2">Company Logo</label>
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src={companyLogoPlaceholder} alt="Company Logo" className="w-full h-full object-cover" />
              </div>
              <div className="w-full space-y-3 text-center">
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-black rounded-lg text-sm text-black dark:text-white">
                  <Upload className="w-4 h-4" />
                  <span>Upload Logo</span>
                </button>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">PNG, JPG up to 2MB. Recommended size: 200x200px</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Localization Settings */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">Localization Settings</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Configure regional and time zone preferences</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm sm:text-base font-medium text-black dark:text-white mb-2">Country</label>
              <div className="relative">
                <select className="w-full h-12 sm:h-[50px] px-3 sm:px-4 border border-[#D1D5DB] rounded-lg text-sm sm:text-base text-black dark:text-white appearance-none">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                </select>
                <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 text-black dark:text-white" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm sm:text-base font-medium text-black dark:text-white mb-2">Time Zone</label>
              <div className="relative">
                <select className="w-full h-12 sm:h-[50px] px-3 sm:px-4 border border-[#D1D5DB] rounded-lg text-sm sm:text-base text-black dark:text-white appearance-none">
                  <option>EST (UTC-5)</option>
                  <option>PST (UTC-8)</option>
                  <option>CST (UTC-6)</option>
                </select>
                <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 text-black dark:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">Team Members</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage your team members</p>
            </div>
            <button className="w-full sm:w-auto inline-flex items-center justify-center space-x-1 px-4 py-3 bg-[#10BF0A] text-white rounded-lg text-sm font-medium hover:bg-[#0EA509] transition-colors">
              <Plus className="w-4 h-4" />
              <span>Invite User</span>
            </button>
          </div>
          
          <div className="border-b border-[#E5E7EB] pb-4">
            <h3 className="text-base sm:text-lg font-medium text-black dark:text-white mb-4">Team Members</h3>
            <div className="space-y-4">
              <div className="flex flex-col p-4 border border-[#EBEBEB] dark:border-gray-700 rounded-lg gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img src={mikeDavisAvatar} alt="Mike Davis" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-black dark:text-white">Mike Davis</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">mike.davis@company.com</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#FFD6C8] text-[#9A3412] rounded-full text-xs">Technician</span>
                  <button className="text-gray-600 hover:text-red-500 p-2">
                    <UserX className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col p-4 border border-[#EBEBEB] dark:border-gray-700 rounded-lg gap-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img src={sarahJohnsonAvatar} alt="Sarah Johnson" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-black dark:text-white">Sarah Johnson</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">sarah.johnson@company.com</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#FFD6C8] text-[#9A3412] rounded-full text-xs">Technician</span>
                  <button className="text-gray-600 hover:text-red-500 p-2">
                    <UserX className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Safety Checklist Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">Daily Safety Checklist</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage pre-work requirements</p>
          </div>
          
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4 sm:p-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-[#3B82F6] rounded-lg flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-medium text-[#1E40AF] mb-3">Checklist Management Guide</h3>
                <p className="text-xs sm:text-sm text-[#1D4ED8] mb-4">
                  Create a comprehensive safety checklist that all technicians should complete before starting their workday. This ensures consistent safety standards across all field operations.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-[#60A5FA] rounded-full mt-1 flex-shrink-0"></div>
                    <p className="text-xs sm:text-sm text-[#1D4ED8]">Add clear, actionable items (e.g., "Inspect PPE", "Check tool condition", "Log site arrival")</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-[#60A5FA] rounded-full mt-1 flex-shrink-0"></div>
                    <p className="text-xs sm:text-sm text-[#1D4ED8]">Use the priority dropdown to set the order of importance.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-[#60A5FA] rounded-full mt-1 flex-shrink-0"></div>
                    <p className="text-xs sm:text-sm text-[#1D4ED8]">Changes made here will take effect for all technicians starting the next workday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-medium text-black dark:text-white">Add Checklist Item</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter task title (e.g., Initial System Inspection)"
                className="w-full h-[50px] px-3 sm:px-4 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base text-[rgba(0,0,0,0.35)]"
              />
              <textarea
                placeholder="Enter task description (e.g., Check all electrical connections and safety protocols)"
                className="w-full h-[50px] px-3 sm:px-4 py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base text-[rgba(0,0,0,0.35)] resize-none"
              />
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-medium text-black dark:text-white">Priority</label>
                <div className="relative">
                  <select className="w-full h-[50px] px-3 sm:px-4 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base text-black dark:text-white appearance-none">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 text-black dark:text-white" />
                </div>
              </div>
            </div>
            <button className="w-full h-[40px] bg-[#10BF0A] text-white rounded-lg text-sm sm:text-base">
              Add Item to daily safety checklist
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base sm:text-lg font-medium text-black dark:text-white">Checklist Items</h3>
              <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">2 items</span>
            </div>
            <div className="space-y-4">
              <div className="p-4 border border-[#EBEBEB] dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-base sm:text-lg font-medium text-black dark:text-white">Initial System Inspection</h4>
                    <span className="px-2 py-1 bg-[#FFDFDF] text-[#DC2626] rounded text-xs">High</span>
                  </div>
                  <button className="text-[#F44336]">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Check all electrical connections and safety protocols</p>
              </div>
              
              <div className="p-4 border border-[#EBEBEB] dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-base sm:text-lg font-medium text-black dark:text-white">Equipment Calibration</h4>
                    <span className="px-2 py-1 bg-[#FFDFDF] text-[#DC2626] rounded text-xs">High</span>
                  </div>
                  <button className="text-[#F44336]">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Calibrate all measuring instruments and sensors</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">Notification Preferences</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage your notification preferences and delivery methods</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border-b border-[#F3F4F6]">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-medium text-black dark:text-white mb-1">New Job Assignments</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Get notified when a new job is assigned to your account.</p>
              </div>
              <div 
                onClick={() => handleToggleSetting('newJobAssignments')}
                className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${
                  notificationSettings.newJobAssignments ? 'bg-[#10BF0A]' : 'bg-[#E5E7EB]'
                }`}
              >
                <div className={`w-5 h-5 bg-white dark:bg-gray-700 rounded-full absolute top-0.5 transition-transform ${
                  notificationSettings.newJobAssignments ? 'right-0.5' : 'left-0.5'
                }`}></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border-b border-[#F3F4F6]">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white mb-1">Team Job Assignments</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Receive an alert whenever a job is assigned to any of your team members.</p>
              </div>
              <div className="w-11 h-6 bg-[#10BF0A] rounded-full relative">
                <div className="w-5 h-5 bg-white dark:bg-gray-700 rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border-b border-[#F3F4F6]">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white mb-1">Payment Confirmed</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Get a notification when a client's payment is processed and confirmed.</p>
              </div>
              <div className="w-11 h-6 bg-[#10BF0A] rounded-full relative">
                <div className="w-5 h-5 bg-white dark:bg-gray-700 rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border-b border-[#F3F4F6]">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white mb-1">Low Inventory Alert</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Receive a notification when an inventory item falls below its minimum threshold.</p>
              </div>
              <div className="w-11 h-6 bg-[#E5E7EB] rounded-full relative">
                <div className="w-5 h-5 bg-white dark:bg-gray-700 rounded-full absolute top-0.5 left-0.5"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white mb-1">Emergency Alerts</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Get critical alerts for system-wide emergencies or critical events.</p>
              </div>
              <div className="w-11 h-6 bg-[#E5E7EB] rounded-full relative">
                <div className="w-5 h-5 bg-white dark:bg-gray-700 rounded-full absolute top-0.5 left-0.5"></div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#EBEBEB] pt-6">
            <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white mb-4">Notification Methods</h3>
            <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-3 sm:space-y-0">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 border border-black rounded" defaultChecked />
                <span className="text-sm sm:text-base text-black dark:text-white">Email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 border border-black rounded" defaultChecked />
                <span className="text-sm sm:text-base text-black dark:text-white">In-app</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 border border-black rounded" />
                <span className="text-sm sm:text-base text-black dark:text-white">SMS</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-lg sm:text-xl font-medium text-black dark:text-white mb-2">Urgency Filter</label>
              <div className="relative">
                <select className="w-full h-[50px] px-3 sm:px-4 border border-[#D1D5DB] rounded-lg text-sm sm:text-base text-black dark:text-white appearance-none">
                  <option>All notifications</option>
                  <option>High priority only</option>
                  <option>Medium and high</option>
                </select>
                <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 text-black dark:text-white" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white">Do Not Disturb</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Silence notifications during set hours</p>
                </div>
                <div className="w-11 h-6 bg-[#10BF0A] rounded-full relative">
                  <div className="w-5 h-5 bg-white dark:bg-gray-700 rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-black dark:text-white mb-2">Start Time</label>
                  <div className="relative">
                    <select className="w-full h-[50px] px-3 sm:px-4 border border-[#D1D5DB] rounded-lg text-sm sm:text-base text-black dark:text-white appearance-none">
                      <option>22:00</option>
                      <option>21:00</option>
                      <option>23:00</option>
                    </select>
                    <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 text-black dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm sm:text-base font-medium text-black dark:text-white mb-2">End Time</label>
                  <div className="relative">
                    <div className="relative">
                      <select className="w-full h-[50px] px-3 sm:px-4 border border-[#D1D5DB] rounded-lg text-sm sm:text-base text-black dark:text-white appearance-none">
                        <option>12:00</option>
                        <option>08:00</option>
                        <option>09:00</option>
                      </select>
                      <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 text-black dark:text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#E5E7EB] mt-6 pt-6">
          <button className="px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm sm:text-base font-medium">
            Save Preferences
          </button>
        </div>
      </div>

      {/* Third-Party Integrations Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-medium text-black dark:text-white mb-2">Third-Party Integrations</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Connect your favorite tools to streamline your workflow and enhance productivity.</p>
          </div>
          
          <div className="space-y-4">
            {/* Google Drive Integration */}
            <div className="border border-[#E5E7EB] rounded-xl shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[rgba(245,245,245,0.64)] rounded-full flex items-center justify-center">
                      <img src={googleDriveIcon} alt="Google Drive" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white">Google Drive</h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Cloud storage & file sharing</p>
                    </div>
                  </div>
                  <div className="w-11 h-6 bg-[#10BF0A] rounded-full relative">
                    <div className="w-5 h-5 bg-white dark:bg-gray-700 rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#2ECC71] rounded-full"></div>
                    <span className="text-sm sm:text-base font-medium text-[#2ECC71]">Connected</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Last synced: 2 minutes ago</span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button className="px-3 sm:px-4 py-2 bg-[#FFDFDF] text-[#DC2626] rounded-lg text-sm sm:text-base font-medium">
                  Disconnect
                </button>
              </div>
            </div>

            {/* Slack Integration */}
            <div className="border border-[#E5E7EB] rounded-xl shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[rgba(245,245,245,0.64)] rounded-full flex items-center justify-center">
                      <img src={slackIcon} alt="Slack" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white">Slack</h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Team communication</p>
                    </div>
                  </div>
                  <div className="w-11 h-6 bg-[#E5E7EB] rounded-full relative">
                    <div className="w-5 h-5 bg-white dark:bg-gray-700 rounded-full absolute top-0.5 left-0.5"></div>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#9CA3AF] rounded-full"></div>
                    <span className="text-sm sm:text-base font-medium text-[#374151]">Not Connected</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Connect to receive notifications</span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button className="px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm sm:text-base font-medium">
                  Connect
                </button>
              </div>
            </div>

            {/* Microsoft Teams Integration */}
            <div className="border border-[#E5E7EB] rounded-xl shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[rgba(245,245,245,0.64)] rounded-full flex items-center justify-center">
                      <img src={microsoftTeamsIcon} alt="Microsoft Teams" className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white">Microsoft Teams</h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Video calls & collaboration</p>
                    </div>
                  </div>
                  <div className="w-11 h-6 bg-[#10BF0A] rounded-full relative">
                    <div className="w-5 h-5 bg-white dark:bg-gray-700 rounded-full absolute top-0.5 right-0.5"></div>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
                    <span className="text-sm sm:text-base font-medium text-[#15803D]">Connected</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Last synced: 1 hour ago</span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button className="px-3 sm:px-4 py-2 bg-[#FFDFDF] text-[#DC2626] rounded-lg text-sm sm:text-base font-medium">
                  Disconnect
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white">Integration Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg sm:text-xl font-medium text-black dark:text-white">Auto-sync data</h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Automatically synchronize data across all connected services</p>
                </div>
                <div className="w-11 h-6 bg-[#10BF0A] rounded-full relative">
                  <div className="w-5 h-5 bg-white dark:bg-gray-700 rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg sm:text-xl font-medium text-black dark:text-white">Real-time notifications</h4>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Receive instant notifications from connected services</p>
                </div>
                <div className="w-11 h-6 bg-[#10BF0A] rounded-full relative">
                  <div className="w-5 h-5 bg-white dark:bg-gray-700 rounded-full absolute top-0.5 right-0.5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Billing & Invoices Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#111827] mb-2">Billing & Invoices</h2>
            <p className="text-sm sm:text-base text-[#4B5563]">Manage your subscription and payment methods</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Current Plan */}
            <div className="border border-[#E5E7EB] rounded-xl shadow-sm">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white">Current Plan</h3>
                  <span className="px-2 py-1 bg-[#DCFBE9] text-[#2ECC71] rounded text-xs">Active</span>
                </div>
                <div className="text-center mb-6">
                  <h4 className="text-lg sm:text-xl font-medium text-black dark:text-white">Pro Plan</h4>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl sm:text-3xl font-bold text-black dark:text-white">$99</span>
                    <span className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3.5 h-3.5 bg-[#2ECC71] rounded-full"></div>
                    <span className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">Unlimited projects</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3.5 h-3.5 bg-[#2ECC71] rounded-full"></div>
                    <span className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">Advanced analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3.5 h-3.5 bg-[#2ECC71] rounded-full"></div>
                    <span className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">Priority support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3.5 h-3.5 bg-[#2ECC71] rounded-full"></div>
                    <span className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">Custom integrations</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-[#FAFAFA] border border-[#EBEBEB] dark:border-gray-700 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Next renewal</span>
                    <span className="text-sm sm:text-base font-medium text-black dark:text-white">January 15, 2024</span>
                  </div>
                </div>
                <button className="w-full mt-4 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded text-sm sm:text-base font-semibold">
                  Upgrade Plan
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-[#E5E7EB] rounded-xl shadow-sm">
              <div className="p-6">
                <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white mb-6">Payment Method</h3>
                <div className="bg-gradient-to-r from-[#275ED9] to-[#0753AE] rounded-xl p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-8 bg-[rgba(255,255,255,0.2)] rounded flex items-center justify-center">
                        <span className="text-white font-medium">VISA</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-white mb-4">
                    <p className="text-lg sm:text-xl tracking-wider mb-2">**** **** **** 4532</p>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs sm:text-sm opacity-80">CARDHOLDER</p>
                        <p className="text-sm sm:text-base font-medium">John Smith</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm opacity-80">EXPIRES</p>
                        <p className="text-sm sm:text-base font-medium">12/26</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Card Type</span>
                    <span className="text-sm sm:text-base font-medium text-black dark:text-white">Visa Credit Card</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Billing Address</span>
                    <span className="text-sm sm:text-base font-medium text-black dark:text-white">New York, NY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Auto-renewal</span>
                    <span className="text-sm sm:text-base font-medium text-[#2ECC71]">Enabled</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <button className="w-full px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded text-sm sm:text-base font-semibold">
                    Update Payment Method
                  </button>
                  <button className="w-full px-3 sm:px-4 py-2 border border-[#EBEBEB] text-gray-600 rounded text-sm sm:text-base font-semibold">
                    Add New Card
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Invoices */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white">Recent Invoices</h3>
              <span className="text-lg sm:text-xl font-medium text-[#10BF0A]">View All</span>
            </div>
            <div className="space-y-4">
              <div className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <div className="space-y-1">
                          <p className="text-sm sm:text-base font-medium text-black dark:text-white">#INV-2024-001</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Pro Plan - Monthly</p>
                        </div>
                        </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Dec 15, 2023</div>
                    <div className="text-sm sm:text-base font-medium text-black dark:text-white">$99.00</div>
                    <span className="px-2 py-1 bg-[#DCFBE9] text-[#2ECC71] rounded text-xs w-fit">PAID</span>
                    <button 
                      onClick={() => handleDownloadInvoice('INV-2024-001')}
                      className="text-sm sm:text-base font-medium text-[#10BF0A] hover:text-[#0EA509] transition-colors"
                    >
                      Download
                    </button>
                        </div>
              </div>
            </div>
              
              <div className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <div className="space-y-1">
                          <p className="text-sm sm:text-base font-medium text-black dark:text-white">#INV-2024-002</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Pro Plan - Monthly</p>
                        </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Dec 15, 2023</div>
                    <div className="text-sm sm:text-base font-medium text-black dark:text-white">$99.00</div>
                    <span className="px-2 py-1 bg-[#DCFBE9] text-[#2ECC71] rounded text-xs w-fit">PAID</span>
                    <button 
                      onClick={() => handleDownloadInvoice('INV-2024-002')}
                      className="text-sm sm:text-base font-medium text-[#10BF0A] hover:text-[#0EA509] transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <div className="space-y-1">
                          <p className="text-sm sm:text-base font-medium text-black dark:text-white">#INV-2024-003</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Pro Plan - Monthly</p>
                        </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Dec 15, 2023</div>
                    <div className="text-sm sm:text-base font-medium text-black dark:text-white">$99.00</div>
                    <span className="px-2 py-1 bg-[#DCFBE9] text-[#2ECC71] rounded text-xs w-fit">PAID</span>
                    <button 
                      onClick={() => handleDownloadInvoice('INV-2024-003')}
                      className="text-sm sm:text-base font-medium text-[#10BF0A] hover:text-[#0EA509] transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Settings Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-medium text-black dark:text-white mb-2">AI Assistant Settings</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Configure and customize your AI assistant behavior and features</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white">Enable AI Assistant</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Turn on/off the AI assistant functionality</p>
              </div>
              <div className="w-11 h-6 bg-[#10BF0A] rounded-full relative">
                <div className="w-5 h-5 bg-white dark:bg-gray-700 rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white">Behavior Style</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Choose how the AI assistant interacts with users</p>
              <div className="relative">
                <select className="w-full h-[50px] px-3 sm:px-4 border border-[#D1D5DB] rounded-lg text-sm sm:text-base text-black dark:text-white appearance-none">
                  <option>Helpful - Provides detailed assistance</option>
                  <option>Concise - Brief responses</option>
                  <option>Professional - Formal tone</option>
                </select>
                <ChevronDown className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 text-black dark:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-medium text-black dark:text-white mb-2">Security Settings</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage your account security and authentication preferences</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-lg sm:text-xl font-medium text-black dark:text-white mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  className="w-full h-[50px] px-3 sm:px-4 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base text-[rgba(108,108,108,0.5)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-400 dark:text-gray-500" /> : <Eye className="w-5 h-5 text-gray-400 dark:text-gray-500" />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-lg sm:text-xl font-medium text-black dark:text-white mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new current password"
                  className="w-full h-[50px] px-3 sm:px-4 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base text-[rgba(108,108,108,0.5)]"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5 text-gray-400 dark:text-gray-500" /> : <Eye className="w-5 h-5 text-gray-400 dark:text-gray-500" />}
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-lg sm:text-xl font-medium text-black dark:text-white mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new current password"
                  className="w-full h-[50px] px-3 sm:px-4 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm sm:text-base text-[rgba(108,108,108,0.5)]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-400 dark:text-gray-500" /> : <Eye className="w-5 h-5 text-gray-400 dark:text-gray-500" />}
                </button>
              </div>
            </div>
            
            <div className="border-t border-[#E5E7EB] pt-6">
              <button className="px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm sm:text-base font-medium">
                Save Password
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white">Two-Factor Authentication</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
              </div>
              <div className="w-11 h-6 bg-[#10BF0A] rounded-full relative">
                <div className="w-5 h-5 bg-white dark:bg-gray-700 rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </div>
            
            <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4 sm:p-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#3B82F6] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-medium text-[#1E40AF] mb-3">2FA is currently enabled</h4>
                  <p className="text-sm sm:text-base text-[#1D4ED8]">Your account is protected with authenticator app verification</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-medium text-black dark:text-white mb-2">Session History</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Recent login activity on your account</p>
            </div>
            
            <div className="space-y-4">
              <div className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <div className="space-y-1">
                      <p className="text-sm sm:text-base font-medium text-black dark:text-white">Jan 15, 2024 2:30 PM</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">192.168.1.1</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">MacBook Pro</div>
                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">New York, US</div>
                    <span className="px-2 py-1 bg-[#DCFBE9] text-[#2ECC71] rounded text-xs w-fit">Active</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <div className="space-y-1">
                      <p className="text-sm sm:text-base font-medium text-black dark:text-white">Jan 15, 2024 2:30 PM</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">203.45.67.89</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">iPhone 15</div>
                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">San Francisco, US</div>
                    <span className="px-2 py-1 bg-[rgba(202,202,202,0.8)] text-gray-600 rounded text-xs w-fit">Expired</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <div className="space-y-1">
                      <p className="text-sm sm:text-base font-medium text-black dark:text-white">Jan 15, 2024 2:30 PM</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">156.78.90.12</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Windows PC</div>
                    <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">London, UK</div>
                    <span className="px-2 py-1 bg-[rgba(202,202,202,0.8)] text-gray-600 rounded text-xs w-fit">Expired</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-[#E5E7EB] pt-6">
              <button className="px-3 sm:px-4 py-2 bg-[#DC2626] text-white rounded-lg text-sm sm:text-base font-medium">
                Logout All Devices
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-center sm:justify-end">
        <button className="w-full max-w-sm sm:w-auto px-4 py-3 bg-[#10BF0A] text-white rounded-lg text-sm font-medium hover:bg-[#0EA509] transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
