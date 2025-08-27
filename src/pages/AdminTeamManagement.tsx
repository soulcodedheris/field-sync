import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  Search,
  Plus,
  Edit,
  Trash,
  Circle
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';

export const AdminTeamManagement: React.FC = () => {
  const { user } = useAuthStore();
  const [selectedTechnicians, setSelectedTechnicians] = useState<string[]>([]);

  const technicians = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Junior Technician',
      avatar: userAvatar1,
      status: 'Active',
      efficiency: '80%',
      jobsCompleted: '20',
      totalHours: '75hrs'
    },
    {
      id: '2',
      name: 'John Doe',
      role: 'Senior Technician',
      avatar: userAvatar2,
      status: 'Offline',
      efficiency: '70%',
      jobsCompleted: '45',
      totalHours: '100hrs'
    },
    {
      id: '3',
      name: 'John Doe',
      role: 'HVAC Specialist',
      avatar: userAvatar3,
      status: 'On Job',
      efficiency: '55%',
      jobsCompleted: '176',
      totalHours: '176hrs'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-[#DCFBE9] text-[#2ECC71]';
      case 'Offline':
        return 'bg-[rgba(202,202,202,0.8)] text-gray-600 dark:text-gray-400';
      case 'On Job':
        return 'bg-[#E8F5FF] text-[#0D99FF]';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
    }
  };

  const handleSelectAll = () => {
    if (selectedTechnicians.length === technicians.length) {
      setSelectedTechnicians([]);
    } else {
      setSelectedTechnicians(technicians.map(tech => tech.id));
    }
  };

  const handleSelectTechnician = (technicianId: string) => {
    if (selectedTechnicians.includes(technicianId)) {
      setSelectedTechnicians(selectedTechnicians.filter(id => id !== technicianId));
    } else {
      setSelectedTechnicians([...selectedTechnicians, technicianId]);
    }
  };

  return (
    <div className=" sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="pl-0 sm:pl-4">
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Team Management</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white mt-2">Manage your team, roles, and responsibilities in one place</p>
          </div>
        </div>
      </div>

      {/* Search and Add User Controls */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h2 className="text-lg sm:text-2xl font-medium text-black dark:text-white">Technicians</h2>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="search...."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button className="flex items-center gap-1 px-3 sm:px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm font-medium hover:bg-[#0EA50A] transition-colors">
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add User</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Team Table */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
        {/* Mobile Technician Cards - Hidden on lg+ screens */}
        <div className="lg:hidden p-4 space-y-4">
          {technicians.map((technician) => (
            <div key={technician.id} className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
              <div className="space-y-4">
                {/* Header Row - Checkbox and Technician Info */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedTechnicians.includes(technician.id)}
                    onChange={() => handleSelectTechnician(technician.id)}
                    className="w-5 h-5 border-2 border-[#EBEBEB] rounded mt-1 flex-shrink-0"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <img
                      src={technician.avatar}
                      alt={`${technician.name} avatar`}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-black dark:text-white text-base">{technician.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{technician.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 border border-[#E5E7EB] rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 border border-[#E5E7EB] rounded hover:bg-red-50 transition-colors">
                      <Trash className="w-4 h-4 text-[#F44336]" />
                    </button>
                  </div>
                </div>

                {/* Status */}
                <div className="border-t border-[#E5E7EB] pt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Status:</span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(technician.status)}`}>
                      <Circle className="w-2 h-2 fill-current" />
                      {technician.status}
                    </span>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-3 border-t border-[#E5E7EB] pt-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Efficiency</p>
                    <p className="text-sm font-medium text-black dark:text-white">{technician.efficiency}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Completed</p>
                    <p className="text-sm font-medium text-black dark:text-white">{technician.jobsCompleted}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Hours</p>
                    <p className="text-sm font-medium text-black dark:text-white">{technician.totalHours}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table - Hidden on mobile */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F9FAFC]">
              <tr>
                <th className="px-4 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedTechnicians.length === technicians.length}
                    onChange={handleSelectAll}
                    className="w-5 h-5 border-2 border-[#EBEBEB] rounded"
                  />
                </th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Names</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Status</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Efficiency</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Completed</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Total Hours</th>
                <th className="px-4 py-4 text-left font-medium text-black dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map((technician) => (
                <tr key={technician.id} className="border-b border-[#E5E7EB]">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedTechnicians.includes(technician.id)}
                      onChange={() => handleSelectTechnician(technician.id)}
                      className="w-5 h-5 border-2 border-[#EBEBEB] rounded"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={technician.avatar}
                        alt={`${technician.name} avatar`}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-black dark:text-white">{technician.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{technician.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(technician.status)}`}>
                      <Circle className="w-2 h-2 fill-current" />
                      {technician.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">{technician.efficiency}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">{technician.jobsCompleted}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">{technician.totalHours}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1 border border-[#E5E7EB] rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                      <button className="p-1 border border-[#E5E7EB] rounded hover:bg-red-50 transition-colors">
                        <Trash className="w-4 h-4 text-[#F44336]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-t border-[#EBEBEB]">
          <span className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">Showing 1 to 3 of 847 results</span>
          <div className="flex items-center justify-center sm:justify-end gap-2">
            <button className="w-8 h-8 bg-[#10BF0A] text-white rounded text-sm font-medium">1</button>
            <button className="w-8 h-8 border border-[#EBEBEB] text-gray-600 dark:text-gray-400 rounded text-sm font-medium">2</button>
            <button className="w-8 h-8 border border-[#EBEBEB] text-gray-600 dark:text-gray-400 rounded text-sm font-medium">3</button>
            <button className="px-3 sm:px-4 h-8 border border-[#EBEBEB] text-gray-600 dark:text-gray-400 rounded text-sm font-medium">
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
