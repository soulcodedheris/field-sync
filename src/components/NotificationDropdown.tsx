import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Filter,
  ChevronDown,
  Bot,
  AlertTriangle,
  Package,
  GraduationCap,
  X
} from 'lucide-react';

// Import avatar images
import sarahChenAvatar from '../assets/sarah-chen-avatar.png';
import davidSmithAvatar from '../assets/david-smith-avatar.png';
import jamesWilsonAvatar from '../assets/james-wilson-avatar.png';

interface Notification {
  id: string;
  type: 'ai-recommendation' | 'job-update' | 'urgent' | 'inventory' | 'training' | 'system';
  title: string;
  message: string;
  timestamp: string;
  user?: {
    name: string;
    avatar: string;
    jobId?: string;
  };
  icon?: React.ReactNode;
  iconBgColor?: string;
  isRead?: boolean;
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sample notification data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'ai-recommendation',
      title: 'AI Recommendation: Optimize route for Team Alpha',
      message: 'Suggested route changes could save 45 minutes daily',
      timestamp: '15 min ago',
      icon: <Bot className="w-4 h-4 text-white" />,
      iconBgColor: 'bg-[#10BF0A]',
      isRead: false
    },
    {
      id: '2',
      type: 'job-update',
      title: 'Sarah Chen',
      message: 'Added a note: "Found a faulty compressor during inspection. Ordering replacement part #AC-4567."',
      timestamp: '2 hrs ago',
      user: {
        name: 'Sarah Chen',
        avatar: sarahChenAvatar,
        jobId: 'Job #10243'
      },
      isRead: false
    },
    {
      id: '3',
      type: 'urgent',
      title: 'Urgent: Job Rescheduled',
      message: 'Apartment 3C moved to 2:00 PM today',
      timestamp: '2 min ago',
      icon: <AlertTriangle className="w-4 h-4 text-white" />,
      iconBgColor: 'bg-[#DC2626]',
      isRead: false
    },
    {
      id: '4',
      type: 'job-update',
      title: 'David Smith',
      message: 'Added a note: "Found a faulty compressor during inspection. Ordering replacement part #AC-4567."',
      timestamp: '2 hrs ago',
      user: {
        name: 'David Smith',
        avatar: davidSmithAvatar,
        jobId: 'Job #10243'
      },
      isRead: true
    },
    {
      id: '5',
      type: 'inventory',
      title: 'New Parts Available',
      message: 'HVAC filters restocked in warehouse',
      timestamp: '2 hour ago',
      icon: <Package className="w-4 h-4 text-white" />,
      iconBgColor: 'bg-[#3B82F6]',
      isRead: true
    },
    {
      id: '6',
      type: 'training',
      title: 'New Training Available',
      message: 'Safety protocol training module is now available',
      timestamp: '1 day ago',
      icon: <GraduationCap className="w-4 h-4 text-white" />,
      iconBgColor: 'bg-[#8B5CF6]',
      isRead: true
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || notification.type === selectedFilter.toLowerCase().replace(' ', '-');
    return matchesSearch && matchesFilter;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'ai-recommendation':
        return <Bot className="w-4 h-4 text-white" />;
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-white" />;
      case 'inventory':
        return <Package className="w-4 h-4 text-white" />;
      case 'training':
        return <GraduationCap className="w-4 h-4 text-white" />;
      default:
        return null;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'ai-recommendation':
        return 'bg-[#10BF0A]';
      case 'urgent':
        return 'bg-[#DC2626]';
      case 'inventory':
        return 'bg-[#3B82F6]';
      case 'training':
        return 'bg-[#8B5CF6]';
      default:
        return 'bg-gray-500';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] md:relative">
      {/* Mobile overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden" onClick={onClose} />
      
      {/* Slide-out panel */}
      <div 
        ref={dropdownRef}
        className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-white dark:bg-gray-800 shadow-2xl border-l border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col z-[9999] transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-black dark:text-white">Notifications</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Search and Filter */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-4">
            {/* Search */}
            <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Filter */}
          <div className="flex gap-2 overflow-x-auto overscroll-contain scroll-smooth pb-2">
            {['All', 'AI Recommendation', 'Job Update', 'Urgent', 'Inventory', 'Training'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors relative z-10 flex-shrink-0 ${
                  selectedFilter === filter
                    ? 'bg-[#10BF0A] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb:hover]:bg-gray-500">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-100 dark:divide-gray-700 pb-2">
              {filteredNotifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${
                    !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  } ${index === 0 ? 'pt-2' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notification.iconBgColor || getNotificationBgColor(notification.type)
                    }`}>
                      {notification.icon || getNotificationIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-black dark:text-white truncate">
                            {notification.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          {notification.user && (
                            <div className="flex items-center gap-2 mt-2">
                              <img
                                src={notification.user.avatar}
                                alt={notification.user.name}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {notification.user.jobId}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {notification.timestamp}
                          </span>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-[#10BF0A] rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-center">No notifications found</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 text-center mt-1">
                Try adjusting your search or filter
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <button className="w-full px-4 py-2 text-sm font-medium text-[#10BF0A] hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;

