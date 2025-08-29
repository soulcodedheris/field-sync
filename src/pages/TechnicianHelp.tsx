import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronRight,
  Home,
  Briefcase,
  Clock,
  Calendar,
  Clipboard,
  Book,
  Package,
  Bot,
  Settings,
  HelpCircle,
  Play,
  FileText,
  Navigation,
  Check,
  Flag,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Truck,
  User,
  Bell,
  MapPin,
  Download,
  Eye,
  Camera,
  Shield,
  Palette,
  Globe,
  Smartphone,
  Save,
  Edit,
  BookOpen,
  GraduationCap,
  Wrench,
  AlertOctagon
} from 'lucide-react';

// Help categories and their content
const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Home,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I log in to FieldSync?',
        answer: 'Use your company email and password to log in. If you forget your password, contact your administrator to reset it.'
      },
      {
        question: 'How do I navigate between different sections?',
        answer: 'Use the sidebar navigation on the left. Each section has its own icon: Dashboard, Jobs, Clock In/Out, Schedule, Job Log, Resources, Inventory, AI Assistant, and Settings.'
      },
      {
        question: 'How do I update my profile information?',
        answer: 'Go to Settings > Profile Information to update your name, email, phone number, and other personal details.'
      }
    ]
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Home,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'What information is shown on the dashboard?',
        answer: 'The dashboard displays your current job, daily safety checklist, weekly schedule, quick actions, and recent announcements. It gives you an overview of your day.'
      },
      {
        question: 'How do I access quick actions?',
        answer: 'Use the Quick Actions section to Clock In, View Jobs, View Logs, or access the AI Assistant with one click.'
      },
      {
        question: 'How do I complete safety checklist items?',
        answer: 'Click on each checklist item to mark it as completed. High priority items are marked in red and should be completed first.'
      }
    ]
  },
  {
    id: 'jobs',
    title: 'Jobs Management',
    icon: Briefcase,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I view my assigned jobs?',
        answer: 'Go to the Jobs section to see all your current, scheduled, and overdue jobs. Use the search bar to find specific jobs.'
      },
      {
        question: 'What do the job priority levels mean?',
        answer: 'High priority (red) jobs should be completed first, followed by Medium (orange) and Low (blue) priority jobs.'
      },
      {
        question: 'How do I update job status?',
        answer: 'Click on a job card and use the action buttons to update status, add notes, or mark as completed.'
      },
      {
        question: 'How do I get directions to a job site?',
        answer: 'Click the navigation icon on any job card to get directions using your device\'s GPS.'
      }
    ]
  },
  {
    id: 'clock-in-out',
    title: 'Clock In/Out',
    icon: Clock,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I clock in for the day?',
        answer: 'Go to Clock In/Out section and click the green "Clock In" button. The timer will start automatically.'
      },
      {
        question: 'How do I clock out?',
        answer: 'Click the red "Clock Out" button when you finish your work day. The system will record your total hours.'
      },
      {
        question: 'Can I take breaks during the day?',
        answer: 'Yes, you can pause the timer for breaks. Click the pause button and resume when you return to work.'
      },
      {
        question: 'How do I view my time records?',
        answer: 'Your daily summary shows total hours worked. Contact your administrator for detailed time reports.'
      }
    ]
  },
  {
    id: 'schedule',
    title: 'Schedule',
    icon: Calendar,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I view my schedule?',
        answer: 'Go to the Schedule section to see your daily and weekly job assignments in calendar format.'
      },
      {
        question: 'How do I navigate between months?',
        answer: 'Use the arrow buttons to move between months. The current month is highlighted.'
      },
      {
        question: 'What do the job indicators on the calendar mean?',
        answer: 'Different colored dots indicate job priority: red for high, orange for medium, blue for low priority.'
      },
      {
        question: 'How do I see job details for a specific day?',
        answer: 'Click on any day with jobs to see the detailed list of scheduled work for that day.'
      }
    ]
  },
  {
    id: 'job-log',
    title: 'Job Log',
    icon: Clipboard,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'What is the Job Log?',
        answer: 'The Job Log is a record of all your activities, comments, and contributions to jobs. It helps track your work history.'
      },
      {
        question: 'How do I add comments to a job?',
        answer: 'When viewing job details, use the comment section to add notes about your work, issues found, or actions taken.'
      },
      {
        question: 'How do I search through my job history?',
        answer: 'Use the search bar to find specific jobs, or use the filter buttons to view jobs by status or date.'
      },
      {
        question: 'Can I attach photos to job logs?',
        answer: 'Yes, you can attach photos and documents to job logs to document conditions or completed work.'
      }
    ]
  },
  {
    id: 'library',
    title: 'Resources',
    icon: Book,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'What documents are available in the Resources?',
        answer: 'The Resources contains manuals, SOPs, safety procedures, training materials, and technical guides for all equipment and procedures.'
      },
      {
        question: 'How do I find specific documents?',
        answer: 'Use the search bar or filter by category (Emergency Procedures, Equipment Manuals, etc.) and type (Manual, SOP, Guide, Safety).'
      },
      {
        question: 'How do I download documents?',
        answer: 'Click on any document card to view details and download options. Documents are available in PDF, DOC, and PNG formats.'
      },
      {
        question: 'What are the Quick Access categories?',
        answer: 'Quick Access provides fast access to Emergency Procedures, Equipment Manuals, Standard Procedures, and Training Materials.'
      }
    ]
  },
  {
    id: 'inventory',
    title: 'Inventory',
    icon: Package,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I check my truck inventory?',
        answer: 'Go to the Inventory section to see what tools and equipment are currently on your truck and their stock levels.'
      },
      {
        question: 'How do I request more supplies?',
        answer: 'Click "Request More" on any low-stock item. Your request will be sent to the warehouse for processing.'
      },
      {
        question: 'What do the stock status indicators mean?',
        answer: 'Good (green): Sufficient stock. Low (yellow): Running low, consider requesting more. Out (red): No stock available.'
      },
      {
        question: 'How do I track equipment usage?',
        answer: 'The system automatically tracks when you add items to jobs. You can view usage history in the item details.'
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
        question: 'What can I ask the AI Assistant?',
        answer: 'You can ask about procedures, troubleshooting, equipment manuals, safety protocols, and technical questions.'
      },
      {
        question: 'How do I start a conversation with Alex?',
        answer: 'Go to the AI Assistant section and type your question in the chat box. Alex will provide detailed answers.'
      },
      {
        question: 'Can I save important conversations?',
        answer: 'Yes, click the bookmark icon to save important conversations for future reference.'
      },
      {
        question: 'How accurate is the AI Assistant?',
        answer: 'Alex provides information based on company procedures and technical manuals. Always verify critical information with supervisors.'
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I change my notification preferences?',
        answer: 'Go to Settings > Notification Preferences to choose which notifications you receive and how (email, in-app, SMS).'
      },
      {
        question: 'How do I enable two-factor authentication?',
        answer: 'Go to Settings > Security Settings and toggle on Two-Factor Authentication for enhanced account security.'
      },
      {
        question: 'How do I connect third-party apps?',
        answer: 'In Settings > Third-Party Integrations, you can connect Google Drive, Slack, and Microsoft Teams for seamless workflow.'
      },
      {
        question: 'How do I change my password?',
        answer: 'Go to Settings > Security Settings and use the password change form to update your password.'
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
        question: 'What if I can\'t log in?',
        answer: 'Check your internet connection and ensure you\'re using the correct email and password. Contact your administrator if issues persist.'
      },
      {
        question: 'What if the app is slow or not responding?',
        answer: 'Try refreshing the page or closing and reopening the app. Check your internet connection and clear browser cache if needed.'
      },
      {
        question: 'What if I can\'t clock in or out?',
        answer: 'Ensure you have a stable internet connection. If the issue persists, contact your supervisor immediately.'
      },
      {
        question: 'What if I can\'t access certain features?',
        answer: 'Some features may be restricted based on your role. Contact your administrator if you need access to additional features.'
      }
    ]
  }
];

export const TechnicianHelp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('getting-started');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleItem = (itemId: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(itemId)) {
      newExpandedItems.delete(itemId);
    } else {
      newExpandedItems.add(itemId);
    }
    setExpandedItems(newExpandedItems);
  };

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.items.some(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className=" sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-[28px] font-medium text-black dark:text-white">Help Center</h1>
          <p className="text-sm sm:text-lg text-black dark:text-white">Find answers to common questions and learn how to use FieldSync</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="relative">
          <div className="bg-[#F5F5F5] dark:bg-gray-900 border border-[rgba(108,108,108,0.5)] rounded-[10px] h-10 sm:h-12 px-3 flex items-center gap-2 w-full max-w-md">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[rgba(108,108,108,0.5)] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for help topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-base sm:text-lg text-[rgba(108,108,108,0.5)] placeholder-[rgba(108,108,108,0.5)] flex-1 min-w-0"
            />
          </div>
        </div>
      </div>

      {/* Help Categories */}
      <div className="space-y-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl overflow-hidden">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${category.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#10BF0A]" />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <h3 className="text-base sm:text-[20px] font-medium text-black dark:text-white truncate">{category.title}</h3>
                  <p className="text-xs sm:text-[14px] text-gray-600 dark:text-gray-400">{category.items.length} topics</p>
                </div>
              </div>
              <ChevronDown 
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400 transition-transform flex-shrink-0 ${
                  expandedCategory === category.id ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Category Content */}
            {expandedCategory === category.id && (
              <div className="border-t border-[#EBEBEB] p-4 sm:p-6 space-y-3 sm:space-y-4">
                {category.items.map((item, index) => (
                  <div key={index} className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleItem(`${category.id}-${index}`)}
                      className="w-full p-3 sm:p-4 flex items-start justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors gap-3"
                    >
                      <span className="text-sm sm:text-base font-medium text-black dark:text-white text-left flex-1 min-w-0">{item.question}</span>
                      <ChevronRight 
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 transition-transform flex-shrink-0 mt-0.5 ${
                          expandedItems.has(`${category.id}-${index}`) ? 'rotate-90' : ''
                        }`} 
                      />
                    </button>
                    {expandedItems.has(`${category.id}-${index}`) && (
                      <div className="border-t border-[#EBEBEB] p-3 sm:p-4 bg-gray-50">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[rgba(211,253,210,0.64)] rounded-full flex items-center justify-center mx-auto">
            <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#10BF0A]" />
          </div>
          <h3 className="text-lg sm:text-[20px] font-medium text-black dark:text-white">Still need help?</h3>
          <p className="text-sm sm:text-[14px] text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            If you couldn't find the answer you're looking for, contact your supervisor or administrator for additional support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-[14px] text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <span>📧</span>
              <span 
                className="text-[#10BF0A] cursor-pointer hover:underline"
                onClick={() => window.open('mailto:support@fieldsync.com')}
              >
                Email: support@fieldsync.com
              </span>
            </span>
            <span className="flex items-center gap-1">
              <span>📞</span>
              <span 
                className="text-[#10BF0A] cursor-pointer hover:underline"
                onClick={() => window.open('tel:(555) 123-4567')}
              >
                Phone: (555) 123-4567
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
