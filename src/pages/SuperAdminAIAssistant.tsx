import React, { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import {
  Search,
  FileText,
  Bookmark,
  Send,
  Link,
  Mic,
  Bot
} from 'lucide-react';
import userAvatar1 from '../assets/user-avatar-1.png';
import alexAvatar from '../assets/alex-avatar.png';

export const SuperAdminAIAssistant: React.FC = () => {
  const { user } = useAuthStore();

  const handleViewSOPDocument = () => {
    console.log('View SOP document clicked');
  };

  const handleCategoryClick = (category: string) => {
    console.log('Category clicked:', category);
  };

  const handleAttach = () => {
    console.log('Attach clicked');
  };

  const handleVoice = () => {
    console.log('Voice clicked');
  };
  const [message, setMessage] = useState('');
  const [savedMessages, setSavedMessages] = useState<Set<number>>(new Set([2]));

  const messages = [
    {
      id: 1,
      type: 'user',
      content: "What's the standard procedure for calibrating a pressure sensor?",
      timestamp: '2 minutes ago',
      avatar: userAvatar1
    },
    {
      id: 2,
      type: 'ai',
      content: `Calibrating a pressure sensor involves comparing its readings to a highly accurate reference standard. The standard procedure is as follows:

Preparation: Gather the pressure sensor, a more accurate reference standard (e.g., a deadweight tester), and a pressure source. Allow the sensor to acclimate to the environment and "exercise" it by applying and releasing pressure.

Test and Record: Apply pressure from 0% to 100% of the sensor's range and then back down to 0%. At several points (e.g., 0%, 25%, 50%, 75%, 100%), record the readings from both the sensor and the reference standard.

Adjust: If the sensor's readings are outside the acceptable error range, adjust its zero and span points using physical adjustments or a digital communicator.

Verify and Document: Repeat the test to confirm the adjustments were successful. Create a detailed calibration report documenting the "as-found" (before adjustment) and "as-left" (after adjustment) readings, the equipment used, and the date of calibration.`,
      timestamp: '2 minutes ago',
      avatar: alexAvatar
    },
    {
      id: 3,
      type: 'user',
      content: "How do I troubleshoot a motor that won't start?",
      timestamp: '2 minutes ago',
      avatar: userAvatar1
    },
    {
      id: 4,
      type: 'ai',
      content: `Troubleshooting a motor that won't start involves a systematic check of electrical and mechanical components:

Initial Checks: Verify power is on at the breaker, fuses are intact, and the motor switch is engaged. Visually inspect for any burnt wiring or loose connections. Manually check if the motor's shaft and its connected load can turn freely.

Electrical test: Use a multimeter to confirm the correct voltage is reaching the motor terminals. Check the continuity of the motor's windings for any open circuits. Inspect the overload protection devices and the starter/contactor for proper function.

Mechanical Test: Listen for any unusual noises from the bearings. Check the motor's shaft and the coupling for any signs of damage or misalignment.

Expert Help: Repeat the test to confirm the adjustments were successful. Create a detailed calibration report documenting the "as-found" (before adjustment) and "as-left" (after adjustment) readings, the equipment used, and the date of calibration.`,
      timestamp: '2 minutes ago',
      avatar: alexAvatar
    }
  ];

  const handleSaveMessage = (messageId: number) => {
    const newSavedMessages = new Set(savedMessages);
    if (newSavedMessages.has(messageId)) {
      newSavedMessages.delete(messageId);
    } else {
      newSavedMessages.add(messageId);
    }
    setSavedMessages(newSavedMessages);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="pl-0 sm:pl-4">
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Alex, your AI Assistant</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white mt-2">Ask questions about procedures, troubleshooting, and more</p>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 rounded-lg p-4 sm:p-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[rgba(37,99,235,0.1)] rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-[#10BF0A]" />
          </div>
          <h2 className="text-base sm:text-lg font-semibold text-black dark:text-white">Welcome, I'm Alex!</h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md">
            I'm here to help you with technical questions, procedures, and troubleshooting. Ask me anything!
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="space-y-4 sm:space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
            <img
              src={msg.avatar}
              alt={msg.type === 'user' ? 'User' : 'Alex'}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              {msg.type === 'user' ? (
                <div className="bg-[#10BF0A] text-white rounded-lg p-3 sm:p-4 ml-auto max-w-[80%]">
                  <p className="text-sm sm:text-lg break-words">{msg.content}</p>
                  <p className="text-xs text-gray-200 mt-2 text-right">{msg.timestamp}</p>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-3 sm:p-4 max-w-[80%]">
                  <div className="space-y-4 sm:space-y-6">
                    <p className="text-sm sm:text-lg text-black dark:text-white whitespace-pre-line break-words">{msg.content}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-[#EBEBEB]">
                      <button 
                        onClick={handleViewSOPDocument}
                        className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                      >
                        <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>View SOP Document</span>
                      </button>
                      <button 
                        onClick={() => handleSaveMessage(msg.id)}
                        className={`flex items-center gap-1 text-xs sm:text-sm ${
                          savedMessages.has(msg.id) 
                            ? 'text-[#10BF0A]' : 'text-gray-600 hover:text-gray-800 dark:hover:text-gray-200'
                        } transition-colors`}
                      >
                        <Bookmark className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          savedMessages.has(msg.id) ? 'fill-[#10BF0A]' : ''
                        }`} />
                        <span>{savedMessages.has(msg.id) ? 'Saved' : 'Save'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="space-y-4">
          {/* Category Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => handleCategoryClick('SOPs')}
              className="flex items-center gap-2 px-2 py-1 bg-[rgba(202,202,202,0.8)] rounded text-xs text-gray-600 hover:bg-gray-300 transition-colors"
            >
              <FileText className="w-3 h-3" />
              <span>SOPs</span>
            </button>
            <button 
              onClick={() => handleCategoryClick('Manuals')}
              className="flex items-center gap-2 px-2 py-1 bg-[rgba(202,202,202,0.8)] rounded text-xs text-gray-600 hover:bg-gray-300 transition-colors"
            >
              <div className="w-3 h-3 border border-gray-600 rounded-sm"></div>
              <span>Manuals</span>
            </button>
            <button 
              onClick={() => handleCategoryClick('Equipment')}
              className="flex items-center gap-2 px-2 py-1 bg-[rgba(202,202,202,0.8)] rounded text-xs text-gray-600 hover:bg-gray-300 transition-colors"
            >
              <div className="w-3 h-3 border border-gray-600 rounded-sm"></div>
              <span>Equipment</span>
            </button>
          </div>

          {/* Input Area */}
          <div className="flex items-end gap-3 sm:gap-4">
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about procedures, troubleshooting, safety protocols..."
                className="w-full p-3 border-2 border-[#EBEBEB] rounded-lg resize-none focus:outline-none focus:border-[#10BF0A] text-sm sm:text-base"
                rows={2}
              />
            </div>
            <button
              onClick={handleSendMessage}
              className="p-2 sm:p-3 bg-[#10BF0A] text-white rounded-lg hover:bg-[#0EA50A] transition-colors"
            >
              <Send className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Press Enter to send, Shift+Enter for new line
            </span>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleAttach}
                className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <Link className="w-3 h-3" />
                <span>Attach</span>
              </button>
              <button 
                onClick={handleVoice}
                className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <Mic className="w-3 h-3" />
                <span>Voice</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
