import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronRight,
  Home,
  Briefcase,
  Users,
  BarChart3,
  Calendar,
  ClipboardList,
  Book,
  Package,
  Bot,
  Settings,
  HelpCircle,
  Megaphone,
  Mail,
  Phone,
  MessageCircle
} from 'lucide-react';

// Help categories and their content for admin users
const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Home,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I access the admin dashboard?',
        answer: 'Log in with your admin credentials and you\'ll be redirected to the admin dashboard automatically. The dashboard provides an overview of all system activities and key metrics.'
      },
      {
        question: 'What are the main admin functions available?',
        answer: 'As an admin, you can manage jobs, teams, analytics, schedules, inventory, audit logs, resources, AI assistant, announcements, and system settings. Each function is accessible from the sidebar navigation.'
      },
      {
        question: 'How do I navigate between different admin sections?',
        answer: 'Use the sidebar navigation on the left. Each section has its own icon: Dashboard, Job Management, Team Management, Analytics & Reports, Schedule, Inventory, Audit Log, Resources, AI Assistant, Announcements, and Settings.'
      },
      {
        question: 'How do I update my admin profile information?',
        answer: 'Go to Settings > Company Details to update your organization\'s information, branding, and contact details. Personal profile updates can be made in the user profile section.'
      }
    ]
  },
  {
    id: 'job-management',
    title: 'Job Management',
    icon: Briefcase,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I create a new job?',
        answer: 'Go to Job Management > Create New Job. Fill in the job details including title, description, location, priority level, assigned technicians, and estimated completion time.'
      },
      {
        question: 'How do I assign jobs to technicians?',
        answer: 'When creating or editing a job, use the "Assign Technicians" section to select team members based on their skills, availability, and current workload.'
      },
      {
        question: 'How do I track job progress in real-time?',
        answer: 'Use the Job Management dashboard to view real-time updates, status changes, completion rates, and any issues reported by technicians. The system automatically updates as technicians log their progress.'
      },
      {
        question: 'How do I set job priorities?',
        answer: 'Jobs can be set as High (red), Medium (orange), or Low (blue) priority. High priority jobs appear first in technician queues and should be completed urgently.'
      },
      {
        question: 'How do I handle job cancellations or rescheduling?',
        answer: 'In Job Management, select the job and use the "Edit" option to change the schedule or "Cancel" to remove it. Cancelled jobs are logged in the audit trail.'
      }
    ]
  },
  {
    id: 'team-management',
    title: 'Team Management',
    icon: Users,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I add new team members?',
        answer: 'Go to Team Management > Add Member. Enter their personal details, work information, skills, and assign appropriate roles and permissions. They\'ll receive an email invitation to set up their account.'
      },
      {
        question: 'How do I manage team permissions and roles?',
        answer: 'In Team Management, click on any team member to edit their role, permissions, and access levels. You can assign roles like Technician, Supervisor, or Admin with different access rights.'
      },
      {
        question: 'How do I track team performance?',
        answer: 'Use the Team Management dashboard to view individual and team performance metrics, job completion rates, attendance records, and productivity analytics.'
      },
      {
        question: 'How do I handle team member deactivation?',
        answer: 'In Team Management, select the team member and use the "Deactivate" option. This will revoke their access while preserving their work history and data.'
      },
      {
        question: 'How do I manage team schedules and availability?',
        answer: 'Use the Schedule section to view and manage team member availability, assign work shifts, and coordinate coverage for different time periods.'
      }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics & Reports',
    icon: BarChart3,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'What analytics and reports are available?',
        answer: 'View comprehensive performance metrics including job completion rates, team productivity, inventory usage, financial reports, customer satisfaction scores, and system utilization statistics.'
      },
      {
        question: 'How do I export reports for external use?',
        answer: 'In the Analytics section, select your desired metrics, date range, and format. Click the Export button to download reports as PDF, Excel, or CSV files.'
      },
      {
        question: 'How do I set up automated report delivery?',
        answer: 'Go to Settings > Notification Preferences to configure automated report delivery via email. You can schedule daily, weekly, or monthly reports.'
      },
      {
        question: 'How do I create custom dashboards?',
        answer: 'Use the Analytics dashboard builder to create custom views with your preferred metrics, charts, and data visualizations. Save these as personal or shared dashboards.'
      },
      {
        question: 'How do I track key performance indicators (KPIs)?',
        answer: 'The Analytics dashboard displays real-time KPIs including job completion rates, response times, customer satisfaction, and operational efficiency metrics.'
      }
    ]
  },
  {
    id: 'schedule',
    title: 'Schedule Management',
    icon: Calendar,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I create and manage team schedules?',
        answer: 'Go to Schedule to view the calendar interface. Click on time slots to create new assignments, drag and drop to reschedule, and use the bulk scheduling tools for efficiency.'
      },
      {
        question: 'How do I handle schedule conflicts?',
        answer: 'The system automatically detects schedule conflicts and highlights them. Use the conflict resolution tools to reassign jobs or adjust schedules as needed.'
      },
      {
        question: 'How do I set up recurring schedules?',
        answer: 'When creating a schedule, use the "Recurring" option to set up daily, weekly, or monthly patterns. This is useful for maintenance jobs and regular service calls.'
      },
      {
        question: 'How do I manage emergency scheduling?',
        answer: 'Use the "Emergency Schedule" feature to quickly assign urgent jobs. The system will automatically notify available technicians and update their schedules.'
      }
    ]
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    icon: Package,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I add new inventory items?',
        answer: 'Go to Inventory > Add Item. Enter item details including name, description, category, stock levels, minimum thresholds, and assign to specific trucks or locations.'
      },
      {
        question: 'How do I track inventory usage and consumption?',
        answer: 'The system automatically tracks when items are used in jobs. View usage history, consumption patterns, and reorder recommendations in the item details.'
      },
      {
        question: 'How do I set up automatic reorder notifications?',
        answer: 'In Inventory settings, configure minimum stock levels for each item. The system will automatically notify you when items need to be reordered.'
      },
      {
        question: 'How do I manage inventory across multiple locations?',
        answer: 'Use the location management feature to track inventory across different warehouses, trucks, and service centers. Transfer items between locations as needed.'
      },
      {
        question: 'How do I handle inventory discrepancies?',
        answer: 'Use the Audit Log to track inventory changes and identify discrepancies. Contact technicians for clarification on usage reports and update stock levels accordingly.'
      }
    ]
  },
  {
    id: 'audit-log',
    title: 'Audit Log',
    icon: ClipboardList,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'What activities are tracked in the audit log?',
        answer: 'All system activities including user logins, job changes, inventory updates, permission modifications, data exports, and security events are automatically logged with timestamps and user information.'
      },
      {
        question: 'How do I filter and search audit entries?',
        answer: 'Use the search bar and filters to find specific events by user, date range, activity type, or affected records. Export audit logs for compliance reporting.'
      },
      {
        question: 'How long are audit logs retained?',
        answer: 'Audit logs are retained according to your organization\'s data retention policy. Configure retention periods in Settings > Security Settings.'
      },
      {
        question: 'How do I investigate suspicious activities?',
        answer: 'Use the audit log filters to identify unusual patterns, multiple failed login attempts, or unauthorized access attempts. Contact security if suspicious activity is detected.'
      }
    ]
  },
  {
    id: 'library',
    title: 'Resources Management',
    icon: Book,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I upload documents to the resources?',
        answer: 'Go to Resources > Upload Document. Select the file, add metadata including title, description, category, and tags. Choose appropriate access permissions for team members.'
      },
      {
        question: 'How do I organize resources content effectively?',
        answer: 'Use categories, tags, and folders to organize documents. Create a logical structure with main categories like Procedures, Manuals, Training, and Safety documents.'
      },
      {
        question: 'How do I manage document versions?',
        answer: 'When uploading updated documents, the system automatically creates version history. Previous versions remain accessible for reference and compliance purposes.'
      },
      {
        question: 'How do I control access to sensitive documents?',
        answer: 'Set document permissions to restrict access to specific roles or individuals. Use the permission matrix to ensure only authorized personnel can view sensitive information.'
      },
      {
        question: 'How do I track document usage and downloads?',
        answer: 'The resources section tracks document views, downloads, and usage patterns. Use this data to identify popular resources and training needs.'
      }
    ]
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    icon: Bot,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'What can the AI assistant help me with?',
        answer: 'Alex can help with technical questions, troubleshooting procedures, equipment manuals, safety protocols, administrative tasks, and data analysis. Ask anything related to your operations.'
      },
      {
        question: 'How do I customize AI assistant behavior?',
        answer: 'Go to Settings > AI Assistant Settings to configure behavior style, response preferences, and access levels for different user roles.'
      },
      {
        question: 'How do I train the AI on company-specific procedures?',
        answer: 'Upload company documents to the Resources and the AI will learn from your specific procedures, manuals, and best practices to provide more relevant assistance.'
      },
      {
        question: 'How do I monitor AI usage and effectiveness?',
        answer: 'View AI interaction logs in the Analytics section to track usage patterns, popular questions, and user satisfaction with AI responses.'
      },
      {
        question: 'What if the AI assistant isn\'t responding correctly?',
        answer: 'Check your internet connection and AI Assistant settings. If issues persist, contact support. You can also provide feedback on responses to improve accuracy.'
      }
    ]
  },
  {
    id: 'announcements',
    title: 'Announcements',
    icon: Megaphone,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I create a new announcement?',
        answer: 'Go to Announcements > Create New Announcement. Write your message, select recipients (all users, specific teams, or individuals), and choose delivery options.'
      },
      {
        question: 'How do I schedule announcements for later delivery?',
        answer: 'Use the Schedule feature to set specific dates and times for announcement delivery. This is useful for planned updates, training reminders, or policy changes.'
      },
      {
        question: 'How do I track announcement read receipts?',
        answer: 'The system tracks when announcements are read by recipients. View read status and follow up with users who haven\'t acknowledged important messages.'
      },
      {
        question: 'How do I manage announcement categories?',
        answer: 'Use categories like Safety, Training, Equipment Updates, and General to organize announcements. This helps users quickly find relevant information.'
      },
      {
        question: 'How do I send urgent announcements?',
        answer: 'Use the "Urgent" flag for critical announcements. These will appear prominently in user dashboards and may trigger additional notifications.'
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings & Configuration',
    icon: Settings,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I update company information and branding?',
        answer: 'Go to Settings > Company Details to update your organization\'s information, logo, contact details, and branding elements that appear throughout the system.'
      },
      {
        question: 'How do I manage third-party integrations?',
        answer: 'In Settings > Third-Party Integrations, connect Google Drive, Slack, Microsoft Teams, and other services for seamless workflow integration.'
      },
      {
        question: 'How do I configure notification preferences?',
        answer: 'Go to Settings > Notification Preferences to customize email, SMS, and in-app notifications for different events and user roles.'
      },
      {
        question: 'How do I manage security settings and access controls?',
        answer: 'In Settings > Security Settings, configure password policies, two-factor authentication, session timeouts, and access restrictions.'
      },
      {
        question: 'How do I set up billing and subscription management?',
        answer: 'Go to Settings > Billing & Invoices to view your current plan, payment methods, usage statistics, and manage subscription changes.'
      },
      {
        question: 'How do I configure system localization and time zones?',
        answer: 'In Settings > Localization Settings, set your organization\'s time zone, date formats, language preferences, and regional settings.'
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: HelpCircle,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'What if a technician can\'t access the system?',
        answer: 'Check their account status in Team Management. Ensure they have proper permissions, their account is active, and they\'re using correct login credentials. Reset their password if needed.'
      },
      {
        question: 'How do I resolve inventory discrepancies?',
        answer: 'Use the Audit Log to track inventory changes and identify discrepancies. Contact technicians for clarification on usage reports and update stock levels accordingly.'
      },
      {
        question: 'What if the AI assistant isn\'t responding?',
        answer: 'Check your internet connection and AI Assistant settings. Verify that the service is enabled and properly configured. Contact support if issues persist.'
      },
      {
        question: 'How do I handle system performance issues?',
        answer: 'Monitor system performance in Analytics. If experiencing slow response times, check server status, clear browser cache, or contact technical support.'
      },
      {
        question: 'What if data isn\'t syncing properly?',
        answer: 'Check your internet connection and ensure all devices are properly connected. Use the sync status indicators to verify data consistency across the system.'
      },
      {
        question: 'How do I recover from data loss or corruption?',
        answer: 'Contact support immediately for data recovery assistance. The system maintains regular backups, but early intervention is crucial for successful recovery.'
      }
    ]
  }
];

export const AdminHelp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Filter categories and items based on search term
  const filteredCategories = helpCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleItem = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="pl-0 sm:pl-4">
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Help & Support</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white mt-2">Find answers to common questions and learn how to use FieldSync effectively</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search for help topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-[#EBEBEB] dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#396ED8] focus:border-transparent"
          />
        </div>
        {searchTerm && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Found {filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0)} results
          </p>
        )}
      </div>

      {/* Help Categories */}
      <div className="space-y-4">
        {filteredCategories.map((category) => {
          const Icon = category.icon;
          const isExpanded = expandedCategories.includes(category.id);
          
          return (
            <div key={category.id} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#10BF0A]" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-medium text-black dark:text-white truncate">{category.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{category.items.length} topics</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
              
              {isExpanded && (
                <div className="border-t border-[#EBEBEB] p-4 space-y-3">
                  {category.items.map((item, index) => {
                    const itemId = `${category.id}-${index}`;
                    const isItemExpanded = expandedItems.includes(itemId);
                    
                    return (
                      <div key={itemId} className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg">
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                        >
                          <span className="font-medium text-black dark:text-white">{item.question}</span>
                          {isItemExpanded ? (
                            <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        {isItemExpanded && (
                          <div className="border-t border-[#EBEBEB] p-3 bg-gray-50">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Support */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[rgba(211,253,210,0.64)] rounded-full flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#10BF0A]" />
          </div>
          <h3 className="text-lg sm:text-[20px] font-medium text-black dark:text-white">Still need help?</h3>
          <p className="text-sm sm:text-[14px] text-gray-600 dark:text-gray-400">
            If you couldn't find the answer you're looking for, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm sm:text-[14px] text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span 
                className="text-[#10BF0A] cursor-pointer hover:underline"
                onClick={() => window.open('mailto:support@fieldsync.com')}
              >
                support@fieldsync.com
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span 
                className="text-[#10BF0A] cursor-pointer hover:underline"
                onClick={() => window.open('tel:(555) 123-4567')}
              >
                (555) 123-4567
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span 
                className="text-[#10BF0A] cursor-pointer hover:underline"
                onClick={() => console.log('Live chat clicked')}
              >
                Live Chat
              </span>
            </div>
          </div>
          <p className="text-[12px] text-gray-600 dark:text-gray-400">
            Support hours: Monday - Friday, 8:00 AM - 6:00 PM EST
          </p>
        </div>
      </div>
    </div>
  );
};

