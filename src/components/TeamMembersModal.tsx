import React from 'react';
import { X } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  status: 'active' | 'busy' | 'offline';
}

interface TeamMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamMembers: TeamMember[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-[#22C55E]';
    case 'busy':
      return 'bg-[#F39C12]';
    case 'offline':
      return 'bg-[#6C6C6C]';
    default:
      return 'bg-[#6C6C6C]';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'Active/On-site';
    case 'busy':
      return 'Busy/Working';
    case 'offline':
      return 'Offline/Off-duty';
    default:
      return 'Unknown';
  }
};

export const TeamMembersModal: React.FC<TeamMembersModalProps> = ({ 
  isOpen, 
  onClose, 
  teamMembers 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6 max-w-4xl w-full">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Assigned Team Members</h3>
            <button
              onClick={onClose}
              className="text-gray-600 text-black dark:text-white hover:text-black dark:hover:text-white dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Team Members List */}
          <div className="space-y-4 sm:space-y-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                {/* Avatar with Status Indicator */}
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                  />
                  <div 
                    className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 ${getStatusColor(member.status)} rounded-full border-2 border-white`}
                  ></div>
                </div>

                {/* Member Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-base sm:text-lg font-medium text-black dark:text-white break-words">{member.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 break-words">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Team Member Status Legend */}
          <div className="border-t border-[#EBEBEB] pt-4">
            <div className="space-y-2">
              <p className="text-xs font-medium text-black dark:text-white">Team Member Status</p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Active/On-site</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#F39C12] rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Busy/Working</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Offline/Off-duty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
