import React, { useState } from 'react';
import { 
  MapPin,
  Calendar as CalendarIcon,
  Wrench as PipeWrench,
  Play,
  FileText,
  Navigation,
  Check,
  Flag,
  Clock3,
  Rocket,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Briefcase,
  Bot,
  Package,
  Clock as ClockIcon
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';
import userAvatarAI from '../assets/user-avatar-ai.png';
import { SafetyChecklistModal } from '../components/SafetyChecklistModal';

// Mock data for the technician dashboard
const mockStats = {
  jobsCompleted: 12,
  urgentTasks: 2,
  hoursToday: 6.5,
  efficiency: 74,
};

const mockCurrentJob = {
  title: 'Quarterly Maintenance',
  jobId: '#JB-2024-0856',
  priority: 'High',
  status: 'In Progress',
  location: 'Downtown Office Complex',
  address: '1234 Business Ave, Suite 100',
  schedule: 'Today, 2:00 PM',
  duration: 'Estimated 3 hours',
  type: 'HVAC Maintenance',
  description: 'Routine inspection',
  assignedTechnicians: [
    { id: 1, name: 'John Doe', avatar: userAvatar1 },
    { id: 2, name: 'Jane Smith', avatar: userAvatar2 },
    { id: 3, name: 'Mike Johnson', avatar: userAvatar3 },
    { id: 4, name: 'Sarah Wilson', avatar: userAvatarAI },
  ]
};

const mockSafetyChecklist = [
  { id: 1, title: 'Initial equipment inspection', completed: true, priority: 'completed' },
  { id: 2, title: 'Personal Protective Equipment (PPE) Check', completed: true, priority: 'completed' },
  { id: 3, title: 'Test thermostat calibration', completed: false, priority: 'high' },
  { id: 4, title: 'Emergency procedures', completed: false, priority: 'high' },
  { id: 5, title: 'Site hazard assessment', completed: true, priority: 'completed' },
];

const mockWeeklySchedule = [
  { day: 'Mon', date: '14', jobs: 3, active: false },
  { day: 'Tue', date: '15', jobs: 2, active: false },
  { day: 'Wed', date: '16', jobs: 3, active: true },
  { day: 'Thu', date: '17', jobs: 4, active: false },
  { day: 'Fri', date: '18', jobs: 1, active: false },
  { day: 'Sat', date: '19', jobs: 0, active: false },
  { day: 'Sun', date: '20', jobs: 0, active: false },
];

const mockNotifications = [
  {
    id: 1,
    type: 'urgent',
    title: 'Urgent: Job Rescheduled',
    message: 'Apartment 3C moved to 2:00 PM today',
    time: '1hr ago',
    icon: 'flag'
  },
  {
    id: 2,
    type: 'info',
    title: 'New Parts Available',
    message: 'HVAC filters restocked in warehouse',
    time: '1hr ago',
    icon: 'package'
  },
  {
    id: 3,
    type: 'success',
    title: 'Training Completed',
    message: 'Safety certification updated successfully',
    time: '1hr ago',
    icon: 'check'
  }
];

const mockAnnouncements = [
  {
    id: 1,
    type: 'announcement',
    title: 'New Safety Protocol Implementation',
    content: 'Effective immediately, all technicians must complete the updated safety checklist before starting any electrical work.',
    posted: '3 days ago'
  },
  {
    id: 2,
    type: 'equipment',
    title: 'New Diagnostic Tools Available',
    content: 'The latest thermal imaging cameras are now available for checkout from the equipment room.',
    posted: '1 week ago'
  },
  {
    id: 3,
    type: 'training',
    title: 'Quarterly Training Session',
    content: 'Mandatory training on new HVAC systems scheduled for next Friday at 2:00 PM in Conference Room A.',
    posted: '2 weeks ago'
  }
];

export const TechnicianDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [isSafetyChecklistOpen, setIsSafetyChecklistOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'High':
        return (
          <div className="flex items-center gap-2 px-2 py-1 bg-[#FFDFDF] rounded text-[#DC2626]">
            <Flag className="w-3 h-3" />
            <span className="text-xs font-normal">High</span>
          </div>
        );
      case 'In Progress':
        return (
          <div className="flex items-center gap-2 px-2 py-1 bg-[#FFEFD7] rounded text-[#F39C12]">
            <div className="w-2 h-2 bg-[#F39C12] rounded-full"></div>
            <span className="text-xs font-normal">In Progress</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getChecklistStatus = (priority: string) => {
    switch (priority) {
      case 'completed':
        return (
          <div className="flex items-center gap-2 px-2 py-1 bg-[#DCFBE9] rounded text-[#2ECC71]">
            <div className="w-2 h-2 bg-[#2ECC71] rounded-full"></div>
            <span className="text-xs font-normal">Completed</span>
          </div>
        );
      case 'high':
        return (
          <div className="flex items-center gap-2 px-2 py-1 bg-[#FFDFDF] rounded text-[#DC2626]">
            <Flag className="w-3 h-3" />
            <span className="text-xs font-normal">High</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#F02020] rounded-full flex items-center justify-center">
          <Flag className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </div>;
      case 'info':
        return <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3B82F6] rounded-full flex items-center justify-center">
          <Package className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </div>;
      case 'success':
        return <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#2ECC71] rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </div>;
      default:
        return null;
    }
  };

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return <div className="w-5 h-5 sm:w-6 sm:h-6 text-[#10BF0A]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 11l19-7-7 19-2-9-9-2z"/>
          </svg>
        </div>;
      case 'equipment':
        return <PipeWrench className="w-5 h-5 sm:w-6 sm:h-6 text-[#10BF0A]" />;
      case 'training':
        return <div className="w-5 h-5 sm:w-6 sm:h-6 text-[#10BF0A]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-2 sm:space-y-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-black dark:text-white">
            Good morning, {user?.firstName || 'John'}!
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Welcome back. Here's what's happening today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2 sm:space-y-4">
              <h3 className="text-sm sm:text-lg text-black dark:text-white">Jobs Completed</h3>
              <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">{mockStats.jobsCompleted}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#10BF0A]/10 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 sm:w-6 sm:h-6 text-[#10BF0A]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2 sm:space-y-4">
              <h3 className="text-sm sm:text-lg text-black dark:text-white">Urgent Tasks</h3>
              <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">{mockStats.urgentTasks}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#DC2626]/10 rounded-full flex items-center justify-center">
              <Flag className="w-5 h-5 sm:w-6 sm:h-6 text-[#DC2626]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2 sm:space-y-4">
              <h3 className="text-sm sm:text-lg text-black dark:text-white">Hours Today</h3>
              <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">{mockStats.hoursToday}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#3B82F6]/10 rounded-full flex items-center justify-center">
              <Clock3 className="w-5 h-5 sm:w-6 sm:h-6 text-[#3B82F6]" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2 sm:space-y-4">
              <h3 className="text-sm sm:text-lg text-black dark:text-white">Efficiency</h3>
              <p className="text-xl sm:text-2xl font-bold text-black dark:text-white">{mockStats.efficiency}%</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2ECC71]/10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ECC71]" />
            </div>
          </div>
        </div>
      </div>

      {/* Current Job and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      {/* Current Job */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white">Current Job</h2>
              {getStatusBadge(mockCurrentJob.status)}
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-medium text-black dark:text-white">{mockCurrentJob.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Job ID: {mockCurrentJob.jobId}</p>
          </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{mockCurrentJob.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{mockCurrentJob.schedule}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{mockCurrentJob.duration}</span>
            </div>
          </div>

            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 px-3 py-2 bg-[#10BF0A] text-white rounded-lg text-sm font-medium hover:bg-[#0EA509] transition-colors">
                <Play className="w-4 h-4" />
                Start Job
              </button>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <FileText className="w-4 h-4" />
                View Details
              </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-4 sm:mb-6">Quick Actions</h2>
          <div className="space-y-3 sm:space-y-4">
            <button className="w-full flex items-center gap-3 p-3 sm:p-4 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA509] transition-colors">
              <ClockIcon className="w-5 h-5" />
              <span className="font-medium">Clock In</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 sm:p-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Briefcase className="w-5 h-5" />
              <span className="font-medium">View Jobs</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 sm:p-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Navigation className="w-5 h-5" />
              <span className="font-medium">Navigation</span>
            </button>
            <button 
              onClick={() => setIsSafetyChecklistOpen(true)}
              className="w-full flex items-center gap-3 p-3 sm:p-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Check className="w-5 h-5" />
              <span className="font-medium">Safety Checklist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Safety Checklist and Weekly Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Safety Checklist */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white">Daily Safety Checklist</h2>
            <button 
              onClick={() => setIsSafetyChecklistOpen(true)}
              className="text-[#10BF0A] text-sm font-medium hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {mockSafetyChecklist.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:text-gray-300">{item.title}</span>
                {getChecklistStatus(item.priority)}
              </div>
            ))}
        </div>
      </div>

        {/* Weekly Schedule */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-4 sm:mb-6">Weekly Schedule</h2>
          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {mockWeeklySchedule.map((day, index) => (
              <div key={index} className={`text-center p-2 sm:p-3 rounded-lg ${
                day.active ? 'bg-[#10BF0A]/10 border border-[#10BF0A]' : 'bg-gray-50'
              }`}>
                <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">{day.day}</div>
                <div className="text-lg sm:text-xl font-bold text-black dark:text-white">{day.date}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{day.jobs} jobs</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      {/* Notifications and Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Notifications */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-4 sm:mb-6">Recent Notifications</h2>
          <div className="space-y-4 sm:space-y-6">
            {mockNotifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 sm:gap-4">
                  {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-medium text-black dark:text-white truncate">{notification.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

        {/* Announcements */}
        <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-4 sm:mb-6">Announcements</h2>
          <div className="space-y-4 sm:space-y-6">
          {mockAnnouncements.map((announcement) => (
              <div key={announcement.id} className="flex items-start gap-3 sm:gap-4">
                {getAnnouncementIcon(announcement.type)}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-medium text-black dark:text-white truncate">{announcement.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{announcement.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{announcement.posted}</p>
                </div>
              </div>
            ))}
            </div>
        </div>
      </div>

      {/* Safety Checklist Modal */}
      <SafetyChecklistModal
        isOpen={isSafetyChecklistOpen}
        onClose={() => setIsSafetyChecklistOpen(false)}
        onComplete={(completedItems) => {
          console.log('Safety checklist completed:', completedItems);
          // TODO: Update safety status in the dashboard
        }}
      />
    </div>
  );
};
