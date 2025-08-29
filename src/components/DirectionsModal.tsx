import React, { useState } from 'react';
import { X, Navigation, MapPin, Clock, Car, Footprints, Bike, Share2, Copy } from 'lucide-react';

interface DirectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: any;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  isOpen,
  onClose,
  job
}) => {
  const [selectedMode, setSelectedMode] = useState<'driving' | 'walking' | 'biking'>('driving');
  const [copied, setCopied] = useState(false);

  const travelModes = [
    { id: 'driving', label: 'Driving', icon: Car, time: '15 min', distance: '3.2 miles' },
    { id: 'walking', label: 'Walking', icon: Footprints, time: '45 min', distance: '3.2 miles' },
    { id: 'biking', label: 'Biking', icon: Bike, time: '20 min', distance: '3.2 miles' }
  ];

  const steps = [
    { instruction: 'Head north on Main St toward Oak Ave', distance: '0.2 miles' },
    { instruction: 'Turn right onto Oak Ave', distance: '0.1 miles' },
    { instruction: 'Continue straight for 2.5 miles', distance: '2.5 miles' },
    { instruction: 'Turn left onto Business Blvd', distance: '0.3 miles' },
    { instruction: 'Destination will be on your right', distance: '0.1 miles' }
  ];

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(job?.address || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Directions to ${job?.title}`,
        text: `Get directions to ${job?.location}: ${job?.address}`,
        url: `https://maps.google.com/?q=${encodeURIComponent(job?.address || '')}`
      });
    } else {
      handleCopyAddress();
    }
  };

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Navigation className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Get Directions</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Navigate to job location</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Job Info */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-[#10BF0A] dark:text-[#10BF0A]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{job.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{job.location}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{job.address}</p>
              
              <div className="flex items-center gap-4 mt-3">
                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy Address'}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Modes */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Travel Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {travelModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id as any)}
                className={`p-4 rounded-lg border transition-colors ${
                  selectedMode === mode.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <mode.icon className={`w-6 h-6 ${
                    selectedMode === mode.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'
                  }`} />
                  <div className="text-left">
                    <p className={`font-medium ${
                      selectedMode === mode.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      {mode.label}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{mode.time}</p>
                    <p className="text-xs text-gray-500">{mode.distance}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Directions */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Step-by-Step Directions</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{travelModes.find(m => m.id === selectedMode)?.time}</span>
              <span>•</span>
              <span>{travelModes.find(m => m.id === selectedMode)?.distance}</span>
            </div>
          </div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">{step.instruction}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{step.distance}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map Preview */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 dark:text-white">Map Preview</h4>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(job.address || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Open in Maps
              </a>
            </div>
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Map preview</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Click "Open in Maps" for full view</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(job.address || '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            Open in Maps
          </a>
        </div>
      </div>
    </div>
  );
};
