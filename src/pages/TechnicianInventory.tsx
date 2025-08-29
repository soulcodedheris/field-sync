import React, { useState } from 'react';
import { Search, ChevronDown, Filter, Plus, Download, TrendingDown, TrendingUp, Truck, AlertTriangle, Clock, Check } from 'lucide-react';
import { PartRequestModal } from '../components/PartRequestModal';

// Mock data for inventory items
const mockInventoryItems = [
  {
    id: 1,
    name: 'Professional Drill Set',
    model: 'Model: XR-2000',
    stockCount: '15/20',
    status: 'Good',
    location: 'Warehouse A-12',
    action: 'Add to Job'
  },
  {
    id: 2,
    name: 'Service Van #3',
    model: 'License: ABC-123',
    stockCount: '4/30',
    status: 'Low',
    location: 'Truck #7',
    action: 'Request More'
  },
  {
    id: 3,
    name: 'Diagnostic Software',
    model: 'License expires: 30 days',
    stockCount: '0/100',
    status: 'Out',
    location: 'Warehouse C-23',
    action: 'Request Now'
  }
];

// Mock data for statistics
const mockStats = [
  {
    title: 'On my truck',
    value: '150',
    change: '-20',
    changeType: 'decrease',
    icon: Truck,
    iconColor: 'text-[#10BF0A]',
    bgColor: 'bg-[rgba(211,253,210,0.64)]'
  },
  {
    title: 'Low Stock',
    value: '100',
    change: '+10',
    changeType: 'increase',
    icon: AlertTriangle,
    iconColor: 'text-[#10BF0A]',
    bgColor: 'bg-[rgba(211,253,210,0.64)]'
  },
  {
    title: 'Requests Pending',
    value: '4',
    change: '-10',
    changeType: 'decrease',
    icon: Clock,
    iconColor: 'text-[#10BF0A]',
    bgColor: 'bg-[rgba(211,253,210,0.64)]'
  },
  {
    title: 'Recently Delivered',
    value: '3',
    change: '+1',
    changeType: 'increase',
    icon: Check,
    iconColor: 'text-[#10BF0A]',
    bgColor: 'bg-[rgba(211,253,210,0.64)]'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Good':
      return (
        <div className="flex items-center gap-2 px-2 py-1 bg-[#DCFBE9] rounded text-xs">
          <div className="w-2 h-2 bg-[#2ECC71] rounded-full"></div>
          <span className="text-[#2ECC71] font-medium">Good</span>
        </div>
      );
    case 'Low':
      return (
        <div className="flex items-center gap-2 px-2 py-1 bg-[#FFEFD7] rounded text-xs">
          <div className="w-2 h-2 bg-[#F39C12] rounded-full"></div>
          <span className="text-[#F39C12] font-medium">Low</span>
        </div>
      );
    case 'Out':
      return (
        <div className="flex items-center gap-2 px-2 py-1 bg-[#FFDFDF] rounded text-xs">
          <div className="w-2 h-2 bg-[#DC2626] rounded-full"></div>
          <span className="text-[#DC2626] font-medium">Out</span>
        </div>
      );
    default:
      return null;
  }
};

const getActionButton = (action: string) => {
  switch (action) {
    case 'Add to Job':
      return (
        <button className="text-sm text-[#2ECC71] font-medium">
          Add to Job
        </button>
      );
    case 'Request More':
      return (
        <button className="text-sm text-[#F39C12] font-medium">
          Request More
        </button>
      );
    case 'Request Now':
      return (
        <button className="text-sm text-[#DC2626] font-medium">
          Request Now
        </button>
      );
    default:
      return null;
  }
};

export const TechnicianInventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPartRequestModalOpen, setIsPartRequestModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className=" sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="space-y-2">
          <h1 className="text-xl sm:text-[28px] font-medium text-black dark:text-white">Inventory</h1>
          <p className="text-sm sm:text-lg text-black dark:text-white">
            Manage equipment, parts inventory, vehicles, and tools for your operations.
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
        {mockStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="space-y-1 flex-1 min-w-0">
                  <p className="text-sm sm:text-lg text-black dark:text-white truncate">{stat.title}</p>
                  <p className="text-xl sm:text-[28px] font-bold text-black dark:text-white">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                {stat.changeType === 'increase' ? (
                  <TrendingUp className="w-4 h-4 text-[#2ECC71]" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-[#DC2626]" />
                )}
                <span className={`text-xs font-medium ${
                  stat.changeType === 'increase' ? 'text-[#2ECC71]' : 'text-[#DC2626]'
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-[rgba(0,0,0,0.35)] hidden sm:inline">compared to last week</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Actions */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <div className="bg-white dark:bg-gray-800 border border-[rgba(108,108,108,0.5)] dark:border-gray-600 rounded-[10px] h-10 px-3 flex items-center gap-2">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[rgba(108,108,108,0.5)]" />
              <input
                type="text"
                placeholder="search...."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-base sm:text-lg text-[rgba(108,108,108,0.5)] placeholder-[rgba(108,108,108,0.5)] w-full"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white">
              <span className="truncate">All Status</span>
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            </button>
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button 
              onClick={() => setIsPartRequestModalOpen(true)}
              className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Request New Part</span>
              <span className="sm:hidden">Request</span>
            </button>
            <button className="flex items-center gap-1 px-3 sm:px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-sm text-black dark:text-white">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl overflow-hidden">
        {/* Table Header - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block bg-[#F9FAFC] border-b border-[#E5E7EB] p-4">
          <div className="grid grid-cols-6 gap-4">
            <div className="flex items-center">
              <input type="checkbox" className="w-5 h-5 border-2 border-[#E4E4E4] rounded" />
            </div>
            <div className="col-span-2">
              <h3 className="text-lg font-medium text-black dark:text-white">Item & Part Number</h3>
            </div>
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white">Stock Count</h3>
            </div>
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white">Status</h3>
            </div>
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white">Location</h3>
            </div>
            <div>
              <h3 className="text-lg font-medium text-black dark:text-white">Actions</h3>
            </div>
          </div>
        </div>

        {/* Desktop Table Body */}
        <div className="hidden lg:block divide-y divide-[#E5E7EB]">
          {mockInventoryItems.map((item) => (
            <div key={item.id} className="p-4">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="flex items-center">
                  <input type="checkbox" className="w-5 h-5 border-2 border-[#E4E4E4] rounded" />
                </div>
                <div className="col-span-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-black dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.model}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-black dark:text-white">{item.stockCount}</p>
                </div>
                <div>
                  {getStatusBadge(item.status)}
                </div>
                <div>
                  <p className="text-sm text-black dark:text-white">{item.location}</p>
                </div>
                <div>
                  {getActionButton(item.action)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Card Layout */}
        <div className="lg:hidden divide-y divide-[#E5E7EB]">
          {mockInventoryItems.map((item) => (
            <div key={item.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center pt-1">
                  <input type="checkbox" className="w-4 h-4 border-2 border-[#E4E4E4] rounded" />
                </div>
                <div className="flex-1 space-y-3">
                  {/* Item Info */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-black dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{item.model}</p>
                  </div>
                  
                  {/* Status and Stock Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Stock</p>
                        <p className="text-sm text-black dark:text-white">{item.stockCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Status</p>
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                    <div>
                      {getActionButton(item.action)}
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Location</p>
                    <p className="text-sm text-black dark:text-white">{item.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Table Footer */}
        <div className="bg-white dark:bg-gray-800 border-t border-[#EBEBEB] dark:border-gray-700 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Showing 1 to 3 of 6 results</p>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 bg-[#10BF0A] text-white rounded-lg flex items-center justify-center text-sm font-medium">
                1
              </button>
              <button className="w-8 h-8 border border-[#EBEBEB] text-gray-600 dark:text-gray-400 rounded-lg flex items-center justify-center text-sm font-medium">
                2
              </button>
              <button className="w-8 h-8 border border-[#EBEBEB] text-gray-600 dark:text-gray-400 rounded-lg flex items-center justify-center text-sm font-medium">
                3
              </button>
              <button 
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-4 py-2 border border-[#EBEBEB] text-gray-600 dark:text-gray-400 rounded-lg flex items-center justify-center text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PartRequestModal
        isOpen={isPartRequestModalOpen}
        onClose={() => setIsPartRequestModalOpen(false)}
        onSubmit={(requestData) => {
          console.log('Part request submitted:', requestData);
          setIsPartRequestModalOpen(false);
        }}
      />
    </div>
  );
};
