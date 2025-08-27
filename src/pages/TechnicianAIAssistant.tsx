import React, { useState } from 'react';
import { FileText, Bookmark, Send, Link, Mic } from 'lucide-react';
import alexAvatar from '../assets/alex-avatar.png';
import userAvatarAI from '../assets/user-avatar-ai.png';

// Mock data for chat messages
const mockChatMessages = [
  {
    id: 1,
    type: 'user',
    message: "What's the standard procedure for calibrating a pressure sensor?",
    timestamp: '2 minutes ago'
  },
  {
    id: 2,
    type: 'assistant',
    message: `Calibrating a pressure sensor involves comparing its readings to a highly accurate reference standard. The standard procedure is as follows:

Preparation: Gather the pressure sensor, a more accurate reference standard (e.g., a deadweight tester), and a pressure source. Allow the sensor to acclimate to the environment and "exercise" it by applying and releasing pressure.

Test and Record: Apply pressure from 0% to 100% of the sensor's range and then back down to 0%. At several points (e.g., 0%, 25%, 50%, 75%, 100%), record the readings from both the sensor and the reference standard.

Adjust: If the sensor's readings are outside the acceptable error range, adjust its zero and span points using physical adjustments or a digital communicator.

Verify and Document: Repeat the test to confirm the adjustments were successful. Create a detailed calibration report documenting the "as-found" (before adjustment) and "as-left" (after adjustment) readings, the equipment used, and the date of calibration.`,
    timestamp: '2 minutes ago'
  },
  {
    id: 3,
    type: 'user',
    message: 'How do I troubleshoot a motor that won\'t start?',
    timestamp: '2 minutes ago'
  },
  {
    id: 4,
    type: 'assistant',
    message: `Troubleshooting a motor that won't start involves a systematic check of electrical and mechanical components:

Initial Checks: Verify power is on at the breaker, fuses are intact, and the motor switch is engaged. Visually inspect for any burnt wiring or loose connections. Manually check if the motor's shaft and its connected load can turn freely.

Electrical test: Use a multimeter to confirm the correct voltage is reaching the motor terminals. Check the continuity of the motor's windings for any open circuits. Inspect the overload protection devices and the starter/contactor for proper function.

Mechanical Test: Listen for any unusual noises from the bearings. Check the motor's shaft and the coupling for any signs of damage or misalignment.

Expert Help: Repeat the test to confirm the adjustments were successful. Create a detailed calibration report documenting the "as-found" (before adjustment) and "as-left" (after adjustment) readings, the equipment used, and the date of calibration.`,
    timestamp: '2 minutes ago',
    saved: true
  }
];

export const TechnicianAIAssistant: React.FC = () => {
  const [message, setMessage] = useState('');

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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-[28px] font-medium text-black dark:text-white">Alex, your AI Assistant</h1>
          <p className="text-lg text-black dark:text-white">
            Ask questions about procedures, troubleshooting, and more
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-[rgba(37,99,235,0.1)] rounded-full flex items-center justify-center">
            <img src={alexAvatar} alt="Alex" className="w-8 h-8 rounded-full object-cover" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Welcome, I'm Alex!</h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            I'm here to help you with technical questions, procedures, and troubleshooting. Ask me anything!
          </p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="space-y-6">
        {mockChatMessages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full border-2 border-white flex-shrink-0 overflow-hidden">
              {msg.type === 'assistant' ? (
                <img src={alexAvatar} alt="Alex" className="w-full h-full object-cover" />
              ) : (
                <img src={userAvatarAI} alt="User" className="w-full h-full object-cover" />
              )}
            </div>

            {/* Message Content */}
            <div className="flex-1">
              {msg.type === 'user' ? (
                <div className="bg-[#10BF0A] text-white rounded-lg p-3 ml-auto max-w-[80%]">
                  <p className="text-base">{msg.message}</p>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 max-w-[80%]">
                  <div className="space-y-6">
                    <p className="text-base text-black dark:text-white whitespace-pre-line">{msg.message}</p>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-4 border-t border-[#EBEBEB]">
                      <button className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <FileText className="w-4 h-4" />
                        <span>View SOP Document</span>
                      </button>
                                             <button className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                         <Bookmark className="w-4 h-4" />
                         <span>{msg.saved ? 'Saved' : 'Save'}</span>
                       </button>
                    </div>
                  </div>
                </div>
              )}
              <p className={`text-xs text-gray-600 dark:text-gray-400 mt-1 ${msg.type === 'user' ? 'text-right' : ''}`}>{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4">
        <div className="space-y-4">
          {/* Knowledge Base Categories */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-[rgba(202,202,202,0.8)] rounded text-xs">
              <FileText className="w-3 h-3 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">SOPs</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-[rgba(202,202,202,0.8)] rounded text-xs">
              <span className="text-gray-600 dark:text-gray-400">Manuals</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-[rgba(202,202,202,0.8)] rounded text-xs">
              <span className="text-gray-600 dark:text-gray-400">Equipment</span>
            </div>
          </div>

          {/* Input Area */}
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about procedures, troubleshooting, safety protocols..."
                className="w-full h-11 px-4 py-3 border-2 border-[#EBEBEB] rounded-lg resize-none focus:outline-none focus:border-[#10BF0A] text-sm"
                rows={1}
              />
            </div>
            <button
              onClick={handleSendMessage}
              className="w-11 h-11 bg-[#10BF0A] text-white rounded-lg flex items-center justify-center hover:bg-[#0EA50A] transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600 dark:text-gray-400">Press Enter to send, Shift+Enter for new line</p>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                <Link className="w-3 h-3" />
                <span>Attach</span>
              </button>
              <button className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
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
