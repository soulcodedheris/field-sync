import React, { useState } from 'react';
import { 
  Search,
  ChevronDown,
  X,
  Plus,
  Camera,
  Video,
  Upload
} from 'lucide-react';

// Import avatar images
import userAvatar3 from '../assets/user-avatar-3.png';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';

interface AssignmentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssignmentPopup: React.FC<AssignmentPopupProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedTechnician, setSelectedTechnician] = useState('John Doe');
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, title: 'Initial System Inspection', description: 'Check all electrical connections and safety protocols', completed: false, notes: '' },
    { id: 2, title: 'Equipment Calibration', description: 'Calibrate all measuring instruments and sensors', completed: true, notes: 'All instruments calibrated successfully. Readings within normal parameters.' },
    { id: 3, title: 'Performance Testing', description: 'Run comprehensive performance tests on all systems', completed: false, notes: '' }
  ]);
  const [activities, setActivities] = useState([
    { id: 1, user: 'Tunde Johnson', avatar: userAvatar1, time: '1hr ago', message: 'Arrived on site and began initial inspection. Air filter is severely clogged and needs immediate replacement.' },
    { id: 2, user: 'Gigi Angelo', avatar: userAvatar2, time: '1hr ago', message: 'Arrived on site and began initial inspection. Air filter is severely clogged and needs immediate replacement.' },
    { id: 3, user: 'Mike Rodriguez', avatar: userAvatar3, time: '1hr ago', message: 'Calibrated all measuring instruments and sensors' },
    { id: 4, user: 'Sarah Johnson', avatar: userAvatar1, time: '1hr ago', message: 'Changed the job\'s status from \'To Do\' to \'In Progress\'.' },
    { id: 5, user: 'System', avatar: null, time: '1hr ago', message: 'Job created and scheduled for January 15, 2024. Priority level set to Medium.' }
  ]);

  if (!isOpen) return null;

  const toggleChecklistItem = (id: number) => {
    setChecklistItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addNote = (id: number) => {
    console.log('Add note for item:', id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-[23px] font-medium text-black dark:text-white">Assign Job</h2>
            <button 
              onClick={onClose}
              className="text-[#6C6C6C] text-black dark:text-white hover:text-black dark:hover:text-white dark:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-[#E5E7EB]">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-4 px-4 text-[23px] font-normal transition-colors ${
                  activeTab === 'details' 
                    ? 'text-black dark:text-white border-b-2 border-[#10BF0A]' 
                    : 'text-black dark:text-white'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('checklist')}
                className={`pb-4 px-4 text-[23px] font-normal transition-colors ${
                  activeTab === 'checklist' 
                    ? 'text-black dark:text-white border-b-2 border-[#10BF0A]' 
                    : 'text-black dark:text-white'
                }`}
              >
                Checklist
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'details' ? (
            <div className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="block text-[14px] font-medium text-black dark:text-white mb-2">Job Title</label>
                <div className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
                  <input
                    type="text"
                    placeholder="e.g., Quarterly Maintenance"
                    className="w-full text-[14px] text-black dark:text-white placeholder-[rgba(0,0,0,0.35)] focus:outline-none"
                  />
                </div>
              </div>

            {/* Job Type and Sub-type */}
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-medium text-black dark:text-white mb-2">Job Type</label>
                <select className="w-full border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 text-[14px] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#396ED8] focus:border-transparent">
                  <option>Select Type</option>
                  <option>Maintenance</option>
                  <option>Repair</option>
                  <option>Installation</option>
                  <option>Inspection</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Sub-type/Description"
                  className="w-full border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 text-[14px] text-black dark:text-white placeholder-[rgba(0,0,0,0.35)] focus:outline-none focus:ring-2 focus:ring-[#396ED8] focus:border-transparent"
                />
              </div>
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] font-medium text-black dark:text-white mb-2">Priority</label>
                <select className="w-full border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 text-[14px] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#396ED8] focus:border-transparent">
                  <option>Medium</option>
                  <option>High</option>
                  <option>Low</option>
                </select>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-black dark:text-white mb-2">Initial Status</label>
                <select className="w-full border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 text-[14px] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#396ED8] focus:border-transparent">
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>

            {/* Assigned To */}
            <div>
              <label className="block text-[14px] font-medium text-black dark:text-white mb-2">Assigned To</label>
              <div className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="w-5 h-5 text-[rgba(108,108,108,0.5)]" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 text-[14px] text-black dark:text-white placeholder-[rgba(0,0,0,0.35)] focus:outline-none"
                  />
                </div>
                {/* Selected Technician */}
                <div className="inline-flex items-center gap-2 bg-[#E4FFE3] px-2 py-1 rounded-full">
                  <img 
                    src={userAvatar3} 
                    alt="John Doe"
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-[14px] text-black dark:text-white">John Doe</span>
                  <button className="text-black dark:text-white hover:text-gray-600 dark:text-gray-400">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[14px] font-medium text-black dark:text-white mb-2">Location</label>
              <div className="border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-[rgba(108,108,108,0.5)]" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 text-[14px] text-black dark:text-white placeholder-[rgba(0,0,0,0.35)] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Date, Time, and Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] font-medium text-black dark:text-white mb-2">Date</label>
                <select className="w-full border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 text-[14px] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#396ED8] focus:border-transparent">
                  <option>mm/dd/yyyy</option>
                  <option>12/25/2024</option>
                  <option>12/26/2024</option>
                </select>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-black dark:text-white mb-2">Time</label>
                <select className="w-full border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 text-[14px] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#396ED8] focus:border-transparent">
                  <option>--:-- --</option>
                  <option>09:00 AM</option>
                  <option>10:00 AM</option>
                  <option>02:00 PM</option>
                </select>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-3">
              <select className="w-20 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3 text-[14px] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#396ED8] focus:border-transparent">
                <option>3</option>
                <option>1</option>
                <option>2</option>
                <option>4</option>
                <option>6</option>
              </select>
              <span className="text-[14px] text-black dark:text-white">hours (estimated duration)</span>
            </div>
          </div>
          ) : (
            <div className="space-y-6">
              {/* Checklist and Activities Tabs */}
              <div className="border-b border-[#E5E7EB]">
                <div className="flex space-x-4">
                  <button className="pb-4 px-4 text-[23px] font-normal text-black dark:text-white border-b-2 border-[#10BF0A]">
                    Checklist
                  </button>
                  <button className="pb-4 px-4 text-[23px] font-normal text-black dark:text-white">
                    Notes & Activities
                  </button>
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-6">
                {checklistItems.map((item) => (
                  <div key={item.id} className={`border border-[#EBEBEB] rounded-xl p-4 ${item.completed ? 'bg-[#EBEBEB]' : 'bg-white'}`}>
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => toggleChecklistItem(item.id)}
                        className={`w-4 h-4 border border-black rounded flex items-center justify-center mt-1 ${
                          item.completed ? 'bg-[#10BF0A] border-[#10BF0A]' : 'bg-white'
                        }`}
                      >
                        {item.completed && (
                          <div className="w-2 h-2 bg-white dark:bg-gray-700 rounded-sm"></div>
                        )}
                      </button>
                      
                      <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-medium text-black dark:text-white">{item.title}</h3>
                        <p className="text-sm text-[#4B5563]">{item.description}</p>
                        
                        {item.completed && item.notes && (
                          <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-3">
                            <p className="text-sm text-[#374151]">{item.notes}</p>
                          </div>
                        )}
                        
                        {!item.completed && (
                          <button
                            onClick={() => addNote(item.id)}
                            className="flex items-center gap-1 px-4 py-1 border border-[#E5E7EB] rounded text-sm text-[#10BF0A] hover:bg-[#10BF0A] hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Note</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Attachments */}
              <div className="space-y-4">
                <h3 className="text-[23px] font-medium text-black dark:text-white">Attachments</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <button className="flex flex-col items-center gap-1 px-4 py-6 border-2 border-dashed border-[#6C6C6C] rounded-xl text-[#6C6C6C] hover:border-[#10BF0A] hover:text-[#10BF0A] transition-colors">
                      <Camera className="w-6 h-6" />
                      <span className="text-lg font-medium">Take Photo</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 px-4 py-6 border-2 border-dashed border-[#6C6C6C] rounded-xl text-[#6C6C6C] hover:border-[#10BF0A] hover:text-[#10BF0A] transition-colors">
                      <Video className="w-6 h-6" />
                      <span className="text-lg font-medium">Record Video</span>
                    </button>
                  </div>
                  
                  <div className="bg-[#F9FAFB] border border-[#EBEBEB] rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-[#6C6C6C] rounded flex items-center justify-center">
                          <Upload className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-[#6C6C6C]">equipment_inspection_1.jpg</span>
                      </div>
                      <Upload className="w-6 h-6 text-[#10BF0A]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-[18px] text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-[#EBEBEB] dark:border-gray-700 rounded-lg text-[18px] text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Save As Draft
              </button>
              <button className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-[18px] hover:bg-[#0EA50A] transition-colors">
                Assign Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentPopup;

