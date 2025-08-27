import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronRight,
  Home,
  Building,
  Users,
  Wallet,
  ClipboardList,
  Bot,
  Megaphone,
  Settings,
  HelpCircle,
  Mail,
  Phone,
  MessageCircle,
  BarChart3,
  Shield
} from 'lucide-react';

// Help categories and their content for super admin users
const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Home,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I access the super admin dashboard?',
        answer: 'Log in with your super admin credentials and you\'ll be redirected to the super admin dashboard automatically. The dashboard provides an overview of all companies, users, and system-wide metrics.'
      },
      {
        question: 'What are the main super admin functions available?',
        answer: 'As a super admin, you can manage companies, user management, plans & billing, audit logs, AI assistant, announcements, and system settings. Each function is accessible from the sidebar navigation.'
      },
      {
        question: 'How do I navigate between different super admin sections?',
        answer: 'Use the sidebar navigation on the left. Each section has its own icon: Dashboard, Companies, User Management, Plans & Billing, Audit Logs, AI Assistant, Announcements, and Settings.'
      },
      {
        question: 'How do I update my super admin profile information?',
        answer: 'Go to Settings > Platform Information to update your personal details and contact information. Company-specific settings are managed in the Companies section.'
      }
    ]
  },
  {
    id: 'company-management',
    title: 'Company Management',
    icon: Building,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I add a new company to the platform?',
        answer: 'Go to Companies > Add New Company. Fill in the company details including name, industry, contact information, and initial subscription plan. The company will receive an email invitation to set up their account.'
      },
      {
        question: 'How do I manage company subscriptions and plans?',
        answer: 'In the Companies section, select any company to view and modify their subscription plan, billing information, and usage statistics. You can upgrade, downgrade, or cancel plans as needed.'
      },
      {
        question: 'How do I monitor company activity and performance?',
        answer: 'Use the Companies dashboard to view real-time metrics, user activity, job completion rates, and system usage for each company. Detailed analytics are available in the Analytics section.'
      },
      {
        question: 'How do I handle company account suspension?',
        answer: 'In Companies, select the company and use the "Suspend Account" option. This will temporarily disable their access while preserving all data. You can reactivate accounts at any time.'
      },
      {
        question: 'How do I manage company-specific settings and configurations?',
        answer: 'Each company can have custom branding, workflows, and integrations. Access these settings through the company profile in the Companies section.'
      }
    ]
  },
  {
    id: 'user-management',
    title: 'User Management',
    icon: Users,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I manage users across all companies?',
        answer: 'Go to User Management to view all users across the platform. You can filter by company, role, status, and other criteria to manage user accounts effectively.'
      },
      {
        question: 'How do I assign roles and permissions to users?',
        answer: 'In User Management, select any user to edit their role (Super Admin, Admin, Technician), permissions, and access levels. Changes apply immediately across the platform.'
      },
      {
        question: 'How do I track user activity and performance?',
        answer: 'Use the User Management dashboard to view individual and company-wide user metrics, login activity, job completion rates, and system usage patterns.'
      },
      {
        question: 'How do I handle user account deactivation?',
        answer: 'In User Management, select the user and use the "Deactivate" option. This will revoke their access while preserving their work history and data.'
      },
      {
        question: 'How do I manage bulk user operations?',
        answer: 'Use the bulk selection tools in User Management to perform operations on multiple users simultaneously, such as role changes, status updates, or data exports.'
      }
    ]
  },
  {
    id: 'plans-billing',
    title: 'Plans & Billing',
    icon: Wallet,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I create and manage subscription plans?',
        answer: 'Go to Plans & Billing to create custom subscription tiers with different features, user limits, and pricing. Plans can be tailored to different company sizes and needs.'
      },
      {
        question: 'How do I handle billing and payment processing?',
        answer: 'The system automatically processes payments based on subscription plans. You can view billing history, generate invoices, and handle payment issues in the Plans & Billing section.'
      },
      {
        question: 'How do I manage usage limits and overages?',
        answer: 'Set usage limits for each plan and configure automatic notifications when companies approach their limits. Overages can be handled through additional billing or plan upgrades.'
      },
      {
        question: 'How do I generate billing reports and analytics?',
        answer: 'Use the Plans & Billing dashboard to generate detailed reports on revenue, subscription metrics, usage patterns, and billing history across all companies.'
      },
      {
        question: 'How do I handle refunds and billing disputes?',
        answer: 'In Plans & Billing, select the company and use the "Billing History" option to view transactions and process refunds or adjustments as needed.'
      }
    ]
  },
  {
    id: 'audit-logs',
    title: 'Audit Logs',
    icon: ClipboardList,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I access system-wide audit logs?',
        answer: 'Go to Audit Logs to view comprehensive activity logs across all companies. You can filter by date, company, user, action type, and other criteria.'
      },
      {
        question: 'What information is tracked in audit logs?',
        answer: 'Audit logs track user logins, data changes, system configurations, security events, and administrative actions across the entire platform.'
      },
      {
        question: 'How do I export audit log data?',
        answer: 'Use the export functionality in Audit Logs to download log data in various formats for compliance, security audits, or analysis purposes.'
      },
      {
        question: 'How do I set up audit log retention policies?',
        answer: 'Configure log retention periods in Settings > Security Settings. You can set different retention periods for different types of audit data.'
      },
      {
        question: 'How do I monitor for suspicious activity?',
        answer: 'Use the Audit Logs dashboard to set up alerts for unusual patterns, failed login attempts, or unauthorized access attempts across the platform.'
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
        question: 'How do I configure AI assistant settings?',
        answer: 'Go to AI Assistant to configure system-wide AI settings, behavior patterns, and response styles that apply across all companies and users.'
      },
      {
        question: 'How do I monitor AI usage and performance?',
        answer: 'Use the AI Assistant dashboard to track usage metrics, response quality, user satisfaction, and system performance across all companies.'
      },
      {
        question: 'How do I customize AI responses for different companies?',
        answer: 'Configure company-specific AI settings in the Companies section. Each company can have customized AI behavior while maintaining platform-wide standards.'
      },
      {
        question: 'How do I handle AI training and improvements?',
        answer: 'Monitor AI performance metrics and user feedback to identify areas for improvement. Training data can be updated through the AI Assistant settings.'
      },
      {
        question: 'How do I manage AI access permissions?',
        answer: 'Control which users and companies have access to AI features through role-based permissions in User Management and company settings.'
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
        question: 'How do I create platform-wide announcements?',
        answer: 'Go to Announcements > Compose Message to create announcements that will be sent to all companies and users on the platform.'
      },
      {
        question: 'How do I target announcements to specific companies?',
        answer: 'When composing announcements, use the targeting options to send messages to specific companies, user roles, or geographic regions.'
      },
      {
        question: 'How do I schedule announcements for later delivery?',
        answer: 'Use the scheduling feature when composing announcements to set specific delivery times and dates for optimal engagement.'
      },
      {
        question: 'How do I track announcement engagement and delivery?',
        answer: 'View delivery statistics, read receipts, and engagement metrics for all announcements in the Announcements dashboard.'
      },
      {
        question: 'How do I manage announcement templates?',
        answer: 'Create and save announcement templates for common messages like system updates, maintenance notices, or feature releases.'
      }
    ]
  },
  {
    id: 'system-settings',
    title: 'System Settings',
    icon: Settings,
    color: 'bg-[rgba(211,253,210,0.64)]',
    items: [
      {
        question: 'How do I configure platform-wide settings?',
        answer: 'Go to Settings to configure system-wide preferences, security settings, notification preferences, and platform integrations.'
      },
      {
        question: 'How do I manage third-party integrations?',
        answer: 'Configure and manage integrations with Google Drive, Slack, Microsoft Teams, and other third-party services in the Settings section.'
      },
      {
        question: 'How do I set up security and authentication policies?',
        answer: 'Configure password policies, two-factor authentication, session management, and other security settings in Settings > Security Settings.'
      },
      {
        question: 'How do I manage notification preferences?',
        answer: 'Set up system-wide notification rules, email templates, and delivery preferences in Settings > Notification Preferences.'
      },
      {
        question: 'How do I configure backup and data retention policies?',
        answer: 'Set up automated backup schedules, data retention periods, and disaster recovery procedures in Settings > Platform Preferences.'
      }
    ]
  }
];

export const SuperAdminHelp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('getting-started');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.items.some(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">Help Center</h1>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 mt-2">Find answers to common questions and learn how to use FieldSync</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Help Categories */}
      <div className="space-y-4 sm:space-y-6">
        {filteredCategories.map((category) => {
          const Icon = category.icon;
          const isExpanded = expandedCategory === category.id;
          
          return (
            <div key={category.id} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#10BF0A]" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white">{category.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{category.items.length} articles</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
              
              {isExpanded && (
                <div className="border-t border-[#EBEBEB]">
                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    {category.items.map((item, index) => {
                      const itemId = `${category.id}-${index}`;
                      const isItemExpanded = expandedItems.has(itemId);
                      
                      return (
                        <div key={itemId} className="border border-[#E5E7EB] rounded-lg">
                          <button
                            onClick={() => toggleItem(itemId)}
                            className="w-full px-3 sm:px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                          >
                            <span className="font-medium text-black dark:text-white pr-4 text-sm sm:text-base break-words">{item.question}</span>
                            <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform ${isItemExpanded ? 'rotate-90' : ''}`} />
                          </button>
                          
                          {isItemExpanded && (
                            <div className="px-3 sm:px-4 pb-4">
                              <div className="pt-2 text-gray-600 leading-relaxed text-sm sm:text-base">
                                {item.answer}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Support */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="text-center">
          <HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[#10BF0A] mx-auto mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">Still need help?</h3>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Our support team is here to help you with any questions or issues</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors text-sm sm:text-base w-full sm:w-auto">
              <Mail className="w-4 h-4" />
              <span>Email Support</span>
            </button>
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-[#E5E7EB] text-black dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm sm:text-base w-full sm:w-auto">
              <Phone className="w-4 h-4" />
              <span>Call Support</span>
            </button>
            <button className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-[#E5E7EB] text-black dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm sm:text-base w-full sm:w-auto">
              <MessageCircle className="w-4 h-4" />
              <span>Live Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
