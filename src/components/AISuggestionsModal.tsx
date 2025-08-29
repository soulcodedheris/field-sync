import React, { useState } from 'react';
import { X, Bot, Lightbulb, Clock, User, MapPin, Check, ArrowRight } from 'lucide-react';

export interface AISuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (suggestion: any) => void;
}

export const AISuggestionsModal: React.FC<AISuggestionsModalProps> = ({
  isOpen,
  onClose,
  onApply
}) => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);

  if (!isOpen) return null;

  // Mock AI suggestions
  const suggestions = [
    {
      id: 1,
      title: 'Optimize Technician Workload',
      description: 'Reassign 3 jobs to balance workload across technicians',
      impact: 'High',
      estimatedSavings: '2.5 hours',
      type: 'workload',
      details: [
        'Move HVAC Repair #7890 from John to Mike (better location match)',
        'Assign Server Maintenance to Sarah (specialized skills)',
        'Reschedule Equipment Installation to avoid conflicts'
      ]
    },
    {
      id: 2,
      title: 'Reduce Travel Time',
      description: 'Reorganize jobs by location to minimize travel',
      impact: 'Medium',
      estimatedSavings: '1.8 hours',
      type: 'location',
      details: [
        'Group downtown jobs together',
        'Assign nearby jobs to same technician',
        'Optimize route planning for today\'s schedule'
      ]
    },
    {
      id: 3,
      title: 'Skill-Based Assignment',
      description: 'Match jobs to technicians with specialized skills',
      impact: 'High',
      estimatedSavings: '3.2 hours',
      type: 'skills',
      details: [
        'Assign electrical work to certified electricians',
        'Route HVAC jobs to HVAC specialists',
        'Match complex jobs to senior technicians'
      ]
    },
    {
      id: 4,
      title: 'Conflict Resolution',
      description: 'Resolve scheduling conflicts automatically',
      impact: 'Medium',
      estimatedSavings: '1.5 hours',
      type: 'conflicts',
      details: [
        'Resolve double-booking for Mike Chen',
        'Adjust timing to prevent overlaps',
        'Reassign conflicting jobs to available technicians'
      ]
    }
  ];

  const handleApply = () => {
    if (selectedSuggestion) {
      const suggestion = suggestions.find(s => s.id === selectedSuggestion);
      onApply(suggestion);
    }
    onClose();
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Low': return 'text-[#10BF0A] bg-green-100 dark:bg-green-900 dark:text-[#10BF0A]';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white">AI Scheduling Suggestions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Optimize your schedule with AI-powered recommendations</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Suggestions List */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-black dark:text-white">Available Suggestions</h4>
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  onClick={() => setSelectedSuggestion(suggestion.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedSuggestion === suggestion.id
                      ? 'border-[#10BF0A] bg-green-50 dark:bg-green-900/20'
                      : 'border-[#E5E7EB] hover:border-[#10BF0A] hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-600" />
                      <h5 className="font-medium text-black dark:text-white">{suggestion.title}</h5>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(suggestion.impact)}`}>
                      {suggestion.impact}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{suggestion.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Save {suggestion.estimatedSavings}</span>
                      </div>
                    </div>
                    {selectedSuggestion === suggestion.id && (
                      <Check className="w-4 h-4 text-[#10BF0A]" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestion Details */}
            <div className="space-y-4">
              <h4 className="text-md font-medium text-black dark:text-white">Suggestion Details</h4>
              {selectedSuggestion ? (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  {(() => {
                    const suggestion = suggestions.find(s => s.id === selectedSuggestion);
                    if (!suggestion) return null;
                    
                    return (
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-black dark:text-white mb-2">{suggestion.title}</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{suggestion.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">Estimated Savings:</span>
                            <span className="font-medium text-[#10BF0A]">{suggestion.estimatedSavings}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">Impact:</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(suggestion.impact)}`}>
                              {suggestion.impact}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h6 className="font-medium text-black dark:text-white mb-2">Proposed Changes:</h6>
                          <ul className="space-y-2">
                            {suggestion.details.map((detail, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div className="text-sm">
                              <div className="font-medium text-blue-800 dark:text-blue-200 mb-1">AI Analysis</div>
                              <div className="text-blue-700 dark:text-blue-300">
                                This suggestion is based on technician availability, skill sets, location proximity, and current workload distribution.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                  <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Select a suggestion to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-[#E5E7EB] text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!selectedSuggestion}
            className="flex-1 px-4 py-2 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-4 h-4" />
            Apply Suggestion
          </button>
        </div>
      </div>
    </div>
  );
};
