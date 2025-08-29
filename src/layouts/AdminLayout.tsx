import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import fieldsyncLogo from '../assets/fieldsync-logo.png';
import { useTheme } from '../contexts/ThemeContext';
import userAvatar3 from '../assets/user-avatar-3.png';
import NotificationDropdown from '../components/NotificationDropdown';
import { ThemeToggle } from '../components/ThemeToggle';
import {
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  BarChart3,
  ClipboardList,
  Megaphone,
  Settings,
  Menu,
  X,
  ChevronDown as ArrowDown,
  Clock,
  Building
} from 'lucide-react';
import {
  DashboardIcon,
  JobsIcon,
  ScheduleIcon,
  LibraryIcon,
  InventoryIcon,
  AIAssistantIcon,
  SettingsIcon,
  HelpIcon,
  LogoutIcon
} from '../assets/icons';

export const AdminLayout: React.FC = () => {
  const { user } = useAuthStore();
  const { theme } = useTheme();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: DashboardIcon },
    { name: 'Project Management', href: '/admin/project-management', icon: Building },
    { name: 'Job Management', href: '/admin/job-management', icon: JobsIcon },
    { name: 'Team Management', href: '/admin/team-management', icon: Users },
    { name: 'Time Entries', href: '/admin/time-entries', icon: Clock },
    { name: 'Analytics & Reports', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Schedule', href: '/admin/schedule', icon: ScheduleIcon },
    { name: 'Inventory', href: '/admin/inventory', icon: InventoryIcon },
    { name: 'Audit Log', href: '/admin/audit-log', icon: ClipboardList },
    { name: 'Resources', href: '/admin/library', icon: LibraryIcon },
    { name: 'AI Assistant', href: '/admin/ai-assistant', icon: AIAssistantIcon },
    { name: 'Announcement', href: '/admin/announcement', icon: Megaphone },
    { name: 'Settings', href: '/admin/settings', icon: SettingsIcon },
  ];

  const bottomNavigation = [
    { name: 'Help', href: '/admin/help', icon: HelpIcon },
    { name: 'Logout', href: '/logout', icon: LogoutIcon },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 flex">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-[#EBEBEB] dark:border-gray-700 h-16 md:h-20 flex items-center justify-between px-4 md:px-10">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Logo */}
        <div className="flex items-center">
          <img 
            src={theme === 'dark' ? '/FIELDSYNC-text-white.png' : fieldsyncLogo} 
            alt="FieldSync" 
            className="h-8 w-32 md:h-11 md:w-40" 
          />
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 border border-[rgba(108,108,108,0.5)] dark:border-gray-600 rounded-[10px] h-10 px-3 flex items-center gap-2">
              <Search className="w-6 h-6 text-[rgba(108,108,108,0.5)] dark:text-gray-400" />
              <input
                type="text"
                placeholder="search...."
                className="bg-transparent border-none outline-none text-lg text-[rgba(108,108,108,0.5)] dark:text-gray-300 placeholder-[rgba(108,108,108,0.5)] dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Bell className="w-6 h-6 text-[#656565] dark:text-gray-400" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#10BF0A] rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-[5px] px-3 py-2">
              <img 
                src={userAvatar3} 
                alt="User Avatar" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700"
              />
              <span className="text-lg font-medium text-black dark:text-white">Hi, {user?.firstName || 'John'}</span>
              <ChevronDown className="w-5 h-5 text-[#6C6C6C] dark:text-gray-400" />
            </div>
          </div>
        </div>

        {/* Mobile User Profile */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-[#656565] dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#10BF0A] rounded-full"></span>
          </button>
          <img 
            src={userAvatar3} 
            alt="User Avatar" 
            className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-700"
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed left-0 top-16 bottom-0 bg-white dark:bg-gray-900 shadow-lg z-50 w-64 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>

        
        <div className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={toggleMobileMenu}
                className={`flex items-center gap-3 py-3 rounded-xl transition-all duration-200 ${
                  sidebarCollapsed ? 'px-4' : 'px-3'
                } ${
                  active
                    ? 'bg-[#10BF0A]/8 border-l-4 border-[#10BF0A] shadow-sm'
                    : 'border-l-4 border-transparent'
                }`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                  active 
                    ? 'bg-[#10BF0A]/10 text-[#10BF0A]' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-700 group-hover:text-gray-200'
                }`}>
                  <Icon className="w-10 h-5" />
                </div>
                <span 
                  className={`font-medium transition-colors duration-200 ${
                    active ? 'text-[#10BF0A]' : 'text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:text-gray-300'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bouncing scroll indicator */}
        <div className="flex justify-center py-3 flex-shrink-0">
          <div className="animate-bounce">
            <ArrowDown className="w-4 h-4 text-gray-400 dark:text-gray-500 dark:text-gray-500" />
          </div>
        </div>

        <div className="px-3 py-4 space-y-1 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
          {bottomNavigation.map((item) => {
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={toggleMobileMenu}
                className={`flex items-center gap-3 py-3 rounded-xl transition-all duration-200 ${
                  sidebarCollapsed ? 'px-4' : 'px-3'
                }`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-700 group-hover:text-gray-200">
                  <Icon className="w-10 h-5" />
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:text-gray-300">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden md:flex fixed left-0 top-20 bottom-0 bg-white dark:bg-gray-900 shadow-lg flex-col transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'w-20' : 'w-80'
      }`}>
        {/* Main Navigation */}
        <div className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 py-3 rounded-xl transition-all duration-200 group relative ${
                  sidebarCollapsed ? 'px-4' : 'px-3'
                } ${
                  active
                    ? 'bg-[#10BF0A]/8 border-l-4 border-[#10BF0A] shadow-sm'
                    : 'border-l-4 border-transparent'
                }`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 ${
                  active 
                    ? 'bg-[#10BF0A]/10 text-[#10BF0A]' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-700 group-hover:text-gray-200'
                }`}>
                  <Icon className="w-10 h-5" />
                </div>
                {!sidebarCollapsed && (
                  <span 
                    className={`font-medium transition-colors duration-200 ${
                      active ? 'text-[#10BF0A]' : 'text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100'
                    }`}
                  >
                    {item.name}
                  </span>
                )}
                {/* Tooltip for collapsed state */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
                    {item.name}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="px-4 py-4 space-y-2 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
          {bottomNavigation.map((item) => {
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 py-3 rounded-xl transition-all duration-200 group relative ${
                  sidebarCollapsed ? 'px-4' : 'px-3'
                }`}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-700 group-hover:text-gray-200 transition-all duration-200">
                  <Icon className="w-10 h-5" />
                </div>
                {!sidebarCollapsed && (
                  <span className="font-medium text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-200">
                    {item.name}
                  </span>
                )}
                {/* Tooltip for collapsed state */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
                    {item.name}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Floating Collapse Button - Desktop only */}
      <button
        onClick={toggleSidebar}
        className={`hidden md:block fixed top-24 z-40 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:border-gray-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group ${
          sidebarCollapsed ? 'left-16' : 'left-72'
        }`}
        title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <div className="relative">
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:hover:text-gray-200 dark:group-hover:text-gray-200 transition-colors" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:hover:text-gray-200 dark:group-hover:text-gray-200 transition-colors" />
          )}
        </div>
      </button>

      {/* Main Content */}
      <div className={`pt-16 md:pt-20 flex-1 transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'md:ml-20' : 'md:ml-80'
      }`}>
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </div>

      {/* Notification Dropdown */}
      <NotificationDropdown 
        isOpen={notificationDropdownOpen}
        onClose={() => setNotificationDropdownOpen(false)}
      />
    </div>
  );
};
