import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Plus,
  Download,
  ChevronDown,
  UserPlus,
  Edit,
  Circle,
  Grid3X3,
  CheckCircle,
  Settings,
  Wrench
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';

export const AdminInventory: React.FC = () => {
  const { user } = useAuthStore();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const statCards = [
    {
      title: 'Total Item',
      value: '150',
      change: '20',
      changeType: 'decrease',
      comparison: 'compared to last week',
      icon: Grid3X3,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Available',
      value: '100',
      change: '10',
      changeType: 'increase',
      comparison: 'compared to last week',
      icon: CheckCircle,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'In Use',
      value: '650',
      change: '10',
      changeType: 'decrease',
      comparison: 'compared to last week',
      icon: Settings,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    },
    {
      title: 'Maintenance',
      value: '50%',
      change: '10%',
      changeType: 'increase',
      comparison: 'compared to last week',
      icon: Wrench,
      iconBg: 'bg-[rgba(211,253,210,0.64)]',
      iconColor: 'text-[#10BF0A]'
    }
  ];

  const inventoryItems = [
    {
      id: '1',
      itemName: 'Professional Drill Set',
      model: 'Model: XR-2000',
      assignedTo: {
        name: 'John Doe',
        avatar: userAvatar1
      },
      location: 'Warehouse A-12',
      status: 'Active',
      statusColor: '#2ECC71',
      statusBg: '#DCFBE9',
      quantity: '500/10000'
    },
    {
      id: '2',
      itemName: 'Service Van #3',
      model: 'License: ABC-123',
      assignedTo: null,
      location: 'Warehouse C-23',
      status: null,
      statusColor: null,
      statusBg: null,
      quantity: '500/10000'
    },
    {
      id: '3',
      itemName: 'Diagnostic Software',
      model: 'License expires: 30 days',
      assignedTo: {
        name: 'Multiple Users',
        avatars: [userAvatar1, userAvatar2, userAvatar3]
      },
      location: 'Warehouse A-12',
      status: 'On Job',
      statusColor: '#0D99FF',
      statusBg: '#E8F5FF',
      quantity: '500/10000'
    }
  ];

  return (
    <div className=" sm:p-6 bg-[#F5F5F5] dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-medium text-black dark:text-white">Inventory</h1>
            <p className="text-sm sm:text-base lg:text-lg text-black dark:text-white mt-1 sm:mt-2">
              Manage equipment, parts inventory, vehicles, and tools for your operations.
            </p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm lg:text-lg text-black dark:text-white truncate">{card.title}</span>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center ${card.iconBg} flex-shrink-0`}>
                    <card.icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${card.iconColor}`} />
                  </div>
                </div>
                <div className="text-lg sm:text-xl lg:text-3xl font-bold text-black dark:text-white mb-1 sm:mb-2">{card.value}</div>
                <div className="flex items-center gap-1 sm:gap-2">
                  {card.changeType === 'increase' ? (
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#2ECC71]" />
                  ) : (
                    <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-[#DC2626]" />
                  )}
                  <span className={`text-xs sm:text-sm font-medium ${
                    card.changeType === 'increase' ? 'text-[#2ECC71]' : 'text-[#DC2626]'
                  }`}>
                    {card.change}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">{card.comparison}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm sm:text-base"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button className="flex items-center gap-1 px-2 sm:px-3 lg:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-xs sm:text-sm whitespace-nowrap">
              All Status
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button className="flex items-center gap-1 px-2 sm:px-3 lg:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-xs sm:text-sm whitespace-nowrap">
              All Location
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button className="flex items-center gap-1 px-2 sm:px-3 lg:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-xs sm:text-sm whitespace-nowrap">
              <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              Filter
            </button>
            <button className="flex items-center gap-1 px-2 sm:px-3 lg:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-xs sm:text-sm whitespace-nowrap">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              Add Item
            </button>
            <button className="flex items-center gap-1 px-2 sm:px-3 lg:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-xs sm:text-sm whitespace-nowrap">
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Table - Desktop */}
      <div className="hidden lg:block bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F9FAFC] border-b border-[#E5E7EB]">
                <th className="p-4 text-left">
                  <input type="checkbox" className="w-5 h-5 border-2 border-gray-300 rounded" />
                </th>
                <th className="p-4 text-left font-medium text-black dark:text-white">Item & Part Number</th>
                <th className="p-4 text-left font-medium text-black dark:text-white">Assigned To</th>
                <th className="p-4 text-left font-medium text-black dark:text-white">Location</th>
                <th className="p-4 text-left font-medium text-black dark:text-white">Status</th>
                <th className="p-4 text-left font-medium text-black dark:text-white">Quantity</th>
                <th className="p-4 text-left font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.id} className="border-b border-[#E5E7EB]">
                  <td className="p-4">
                    <input type="checkbox" className="w-5 h-5 border-2 border-gray-300 rounded" />
                  </td>
                  <td className="p-4">
                    <div className="bg-gray-50 border border-[#E5E7EB] rounded p-2">
                      <div className="font-medium text-black dark:text-white">{item.itemName}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{item.model}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    {item.assignedTo ? (
                      item.assignedTo.avatars ? (
                        <div className="flex items-center gap-1">
                          {item.assignedTo.avatars.map((avatar, index) => (
                            <img
                              key={index}
                              src={avatar}
                              alt="User avatar"
                              className="w-8 h-8 rounded-full border-2 border-white"
                              style={{ marginLeft: index > 0 ? '-8px' : '0' }}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <img
                            src={item.assignedTo.avatar}
                            alt={`${item.assignedTo.name} avatar`}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm text-black dark:text-white">{item.assignedTo.name}</span>
                        </div>
                      )
                    ) : (
                      <span className="text-sm text-gray-600 dark:text-gray-400">Unassigned</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-black dark:text-white">{item.location}</span>
                  </td>
                  <td className="p-4">
                    {item.status ? (
                      <div 
                        className="inline-flex items-center gap-2 px-2 py-1 rounded text-xs"
                        style={{ backgroundColor: item.statusBg, color: item.statusColor }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: item.statusColor }}
                        ></div>
                        {item.status}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-600 dark:text-gray-400">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-black dark:text-white">{item.quantity}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-600 hover:text-gray-800 dark:hover:text-gray-200">
                        <UserPlus className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-gray-800 dark:hover:text-gray-200">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border-t border-[#EBEBEB] gap-3">
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Showing 1 to 3 of 847 results</span>
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="w-7 h-7 sm:w-8 sm:h-8 bg-[#10BF0A] text-white rounded text-xs sm:text-sm font-medium">1</button>
            <button className="w-7 h-7 sm:w-8 sm:h-8 border border-[#EBEBEB] text-gray-600 rounded text-xs sm:text-sm">2</button>
            <button className="w-7 h-7 sm:w-8 sm:h-8 border border-[#EBEBEB] text-gray-600 rounded text-xs sm:text-sm">3</button>
            <button className="px-2 sm:px-4 py-1 border border-[#EBEBEB] text-gray-600 rounded text-xs sm:text-sm">Next</button>
          </div>
        </div>
      </div>

      {/* Inventory Cards - Mobile */}
      <div className="lg:hidden space-y-3 sm:space-y-4">
        {inventoryItems.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-3 sm:p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 border border-[#E5E7EB] rounded p-2 mb-3">
                  <div className="font-medium text-black dark:text-white text-sm sm:text-base">{item.itemName}</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{item.model}</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Assigned To:</span>
                    <div className="flex-1 ml-2">
                      {item.assignedTo ? (
                        item.assignedTo.avatars ? (
                          <div className="flex items-center gap-1">
                            {item.assignedTo.avatars.map((avatar, index) => (
                              <img
                                key={index}
                                src={avatar}
                                alt="User avatar"
                                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white"
                                style={{ marginLeft: index > 0 ? '-6px' : '0' }}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <img
                              src={item.assignedTo.avatar}
                              alt={`${item.assignedTo.name} avatar`}
                              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                            />
                            <span className="text-xs sm:text-sm text-black dark:text-white truncate">{item.assignedTo.name}</span>
                          </div>
                        )
                      ) : (
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Unassigned</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Location:</span>
                    <span className="text-xs sm:text-sm text-black dark:text-white">{item.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Status:</span>
                    <div className="flex-1 ml-2">
                      {item.status ? (
                        <div 
                          className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs"
                          style={{ backgroundColor: item.statusBg, color: item.statusColor }}
                        >
                          <div 
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: item.statusColor }}
                          ></div>
                          {item.status}
                        </div>
                      ) : (
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">-</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Quantity:</span>
                    <span className="text-xs sm:text-sm text-black dark:text-white">{item.quantity}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 ml-3">
                <button className="p-1 text-gray-600 hover:text-gray-800 dark:hover:text-gray-200">
                  <UserPlus className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-600 hover:text-gray-800 dark:hover:text-gray-200">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <input type="checkbox" className="w-4 h-4 border-2 border-gray-300 rounded" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Select item</span>
            </div>
          </div>
        ))}
        
        {/* Mobile Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl gap-3">
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Showing 1 to 3 of 847 results</span>
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="w-7 h-7 sm:w-8 sm:h-8 bg-[#10BF0A] text-white rounded text-xs sm:text-sm font-medium">1</button>
            <button className="w-7 h-7 sm:w-8 sm:h-8 border border-[#EBEBEB] text-gray-600 rounded text-xs sm:text-sm">2</button>
            <button className="w-7 h-7 sm:w-8 sm:h-8 border border-[#EBEBEB] text-gray-600 rounded text-xs sm:text-sm">3</button>
            <button className="px-2 sm:px-4 py-1 border border-[#EBEBEB] text-gray-600 rounded text-xs sm:text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
