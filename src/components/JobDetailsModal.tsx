import React, { useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  User,
  Wrench,
  Flag,
  CheckCircle,
  Circle,
  Camera,
  FileText,
  Plus,
  Upload
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import userAvatar2 from '../assets/user-avatar-2.png';
import userAvatar3 from '../assets/user-avatar-3.png';
import { PhotoVideoUploadModal } from './PhotoVideoUploadModal';

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    id: number;
    title: string;
    jobId: string;
    priority: string;
    status: string;
    location: string;
    address: string;
    schedule: string;
    duration: string;
    jobType: string;
    description: string;
    assignedTechnicians: Array<{
      id: number;
      name: string;
      avatar: string;
      role: string;
      status: string;
    }>;
  };
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  isOpen,
  onClose,
  job
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'checklist' | 'notes' | 'photos'>('overview');
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, title: 'Initial equipment inspection', description: 'Check all HVAC units for visible damage', completed: true, notes: 'All units checked - Unit 3 has minor dust buildup' },
    { id: 2, title: 'Test thermostat calibration', description: 'Verify temperature readings and calibration', completed: false, notes: '' },
    { id: 3, title: 'Clean air filters', description: 'Replace or clean all air filters', completed: false, notes: '' },
    { id: 4, title: 'Check electrical connections', description: 'Inspect all electrical connections and wiring', completed: false, notes: '' },
    { id: 5, title: 'Final system test', description: 'Run complete system test and document results', completed: false, notes: '' }
  ]);
  const [jobNotes, setJobNotes] = useState([
    { id: 1, text: 'Customer reported unusual noise from Unit 2', time: '10:30 AM', author: 'John Doe', avatar: userAvatar1 },
    { id: 2, text: 'Replaced air filter in main unit', time: '11:15 AM', author: 'Jane Smith', avatar: userAvatar2 }
  ]);
  const [newNote, setNewNote] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  if (!isOpen) return null;

  const toggleChecklistItem = (id: number) => {
    setChecklistItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: jobNotes.length + 1,
        text: newNote,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        author: 'Current User',
        avatar: userAvatar3
      };
      setJobNotes([...jobNotes, note]);
      setNewNote('');
    }
  };

  const handleFileUpload = (files: any[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
    console.log('Files uploaded:', files);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-[rgba(16,191,10,0.1)] text-[#10BF0A] border-[#10BF0A]';
      case 'Completed':
        return 'bg-[rgba(46,204,113,0.1)] text-[#2ECC71] border-[#2ECC71]';
      case 'Pending':
        return 'bg-[rgba(243,156,18,0.1)] text-[#F39C12] border-[#F39C12]';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-600 border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-600 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-600 border-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300';
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        {/* Modal Container */}
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white truncate">{job.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{job.jobId}</p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'checklist', label: 'Checklist', icon: CheckCircle },
                { id: 'notes', label: 'Notes', icon: FileText },
                { id: 'photos', label: 'Photos', icon: Camera }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 border-b-2 whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#10BF0A] text-[#10BF0A]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm sm:text-base font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6 sm:space-y-8">
                {/* Job Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-black dark:text-white">{job.location}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-black dark:text-white">{job.schedule}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Wrench className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-black dark:text-white">{job.jobType}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{job.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Flag className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-black dark:text-white">Priority</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(job.priority)}`}>
                          {job.priority}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Circle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-black dark:text-white">Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Assigned Technicians */}
                <div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Assigned Technicians</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {job.assignedTechnicians.map((technician) => (
                      <div key={technician.id} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <img
                          src={technician.avatar}
                          alt={technician.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-black dark:text-white truncate">{technician.name}</p>
                          <p className="text-xs text-gray-600 truncate">{technician.role}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          technician.status === 'active' ? 'bg-green-500' :
                          technician.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'checklist' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-black dark:text-white">Job Checklist</h3>
                  <button className="flex items-center gap-2 px-3 py-2 bg-[#10BF0A] text-white rounded-lg text-sm font-medium hover:bg-[#0EA509] transition-colors">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Item</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {checklistItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleChecklistItem(item.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            item.completed
                              ? 'bg-[#10BF0A] border-[#10BF0A]'
                              : 'border-gray-300 hover:border-[#10BF0A]'
                          }`}
                        >
                          {item.completed && <CheckCircle className="w-3 h-3 text-white" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-medium ${item.completed ? 'text-gray-500 line-through' : 'text-black dark:text-white'}`}>
                            {item.title}
                          </h4>
                          <p className={`text-xs mt-1 ${item.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                            {item.description}
                          </p>
                          {item.notes && (
                            <p className="text-xs text-blue-600 mt-2 italic">"{item.notes}"</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-black dark:text-white">Job Notes</h3>
                  <button className="flex items-center gap-2 px-3 py-2 bg-[#10BF0A] text-white rounded-lg text-sm font-medium hover:bg-[#0EA509] transition-colors">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Note</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>
                
                {/* Add Note */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full h-20 p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#10BF0A] focus:border-transparent"
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={addNote}
                      disabled={!newNote.trim()}
                      className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg text-sm font-medium hover:bg-[#0EA509] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Note
                    </button>
                  </div>
                </div>

                {/* Notes List */}
                <div className="space-y-4">
                  {jobNotes.map((note) => (
                    <div key={note.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={note.avatar}
                          alt={note.author}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium text-black dark:text-white">{note.author}</p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{note.time}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 dark:text-gray-300 dark:text-gray-300">{note.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-black dark:text-white">Job Photos</h3>
                  <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-[#10BF0A] text-white rounded-lg text-sm font-medium hover:bg-[#0EA509] transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span className="hidden sm:inline">Upload Photos</span>
                    <span className="sm:hidden">Upload</span>
                  </button>
                </div>
                
                {uploadedFiles.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Photo {index + 1}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No photos uploaded yet</p>
                    <button
                      onClick={() => setIsUploadModalOpen(true)}
                      className="mt-4 text-[#10BF0A] hover:underline"
                    >
                      Upload your first photo
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
              <button className="flex-1 px-4 py-2 bg-[#10BF0A] text-white rounded-lg font-medium hover:bg-[#0EA509] transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <PhotoVideoUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleFileUpload}
      />
    </>
  );
};
