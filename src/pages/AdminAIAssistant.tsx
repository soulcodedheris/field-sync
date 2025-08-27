import React, { useState } from 'react';
import { cn } from '../utils/cn';
import alexAvatar from '../assets/alex-avatar.png';
import userAvatar from '../assets/user-avatar-1.png';
import {
  FileText,
  Bookmark,
  Send,
  Link,
  Mic
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  isSaved?: boolean;
}

const AdminAIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'user',
      content: "What's the standard procedure for calibrating a pressure sensor?",
      timestamp: '2 minutes ago'
    },
    {
      id: '2',
      type: 'ai',
      content: `Calibrating a pressure sensor involves comparing its readings to a highly accurate reference standard. The standard procedure is as follows:

Preparation: Gather the pressure sensor, a more accurate reference standard (e.g., a deadweight tester), and a pressure source. Allow the sensor to acclimate to the environment and "exercise" it by applying and releasing pressure.

Test and Record: Apply pressure from 0% to 100% of the sensor's range and then back down to 0%. At several points (e.g., 0%, 25%, 50%, 75%, 100%), record the readings from both the sensor and the reference standard.

Adjust: If the sensor's readings are outside the acceptable error range, adjust its zero and span points using physical adjustments or a digital communicator.

Verify and Document: Repeat the test to confirm the adjustments were successful. Create a detailed calibration report documenting the "as-found" (before adjustment) and "as-left" (after adjustment) readings, the equipment used, and the date of calibration.`,
      timestamp: '2 minutes ago'
    },
    {
      id: '3',
      type: 'user',
      content: "How do I troubleshoot a motor that won't start?",
      timestamp: '2 minutes ago'
    },
    {
      id: '4',
      type: 'ai',
      content: `Troubleshooting a motor that won't start involves a systematic check of electrical and mechanical components:

Initial Checks: Verify power is on at the breaker, fuses are intact, and the motor switch is engaged. Visually inspect for any burnt wiring or loose connections. Manually check if the motor's shaft and its connected load can turn freely.

Electrical test: Use a multimeter to confirm the correct voltage is reaching the motor terminals. Check the continuity of the motor's windings for any open circuits. Inspect the overload protection devices and the starter/contactor for proper function.

Mechanical Test: Listen for any unusual noises from the bearings. Check the motor's shaft and the coupling for any signs of damage or misalignment.

Expert Help: Repeat the test to confirm the adjustments were successful. Create a detailed calibration report documenting the "as-found" (before adjustment) and "as-left" (after adjustment) readings, the equipment used, and the date of calibration.`,
      timestamp: '2 minutes ago',
      isSaved: true
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Thank you for your question. I\'m processing your request and will provide a detailed response shortly.',
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleSave = (messageId: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, isSaved: !msg.isSaved } : msg
      )
    );
  };

  return (
    <div className="sm:p-6 space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex justify-between items-center">
          <div className="pl-0 sm:pl-4">
            <h1 className="text-xl sm:text-2xl font-medium text-black dark:text-white">Alex, your AI Assistant</h1>
            <p className="text-sm sm:text-lg text-black dark:text-white mt-2">Ask questions about procedures, troubleshooting, and more</p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[rgba(37,99,235,0.1)] rounded-full flex items-center justify-center flex-shrink-0">
            <img src={alexAvatar} alt="Alex" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-base sm:text-lg font-semibold text-black dark:text-white">Welcome, I'm Alex!</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md">
              I'm here to help you with technical questions, procedures, and troubleshooting. Ask me anything!
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="space-y-8">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 sm:gap-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
            {message.type === 'user' ? (
              <>
                <img src={userAvatar} alt="User" className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0" />
                <div className="flex-1">
                  <div className="bg-[#10BF0A] text-white rounded-lg p-3 mb-1 ml-auto max-w-[80%]">
                    <p className="text-sm sm:text-lg">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-right">{message.timestamp}</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white flex-shrink-0 overflow-hidden">
                  <img src={alexAvatar} alt="Alex" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-3 sm:p-4 max-w-[80%]">
                    <div className="space-y-4 sm:space-y-6">
                      <p className="text-sm sm:text-lg text-black dark:text-white whitespace-pre-line">{message.content}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-[#EBEBEB]">
                        <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-600 dark:text-gray-400">
                          <FileText className="w-4 h-4" />
                          <span className="text-xs sm:text-sm">View SOP Document</span>
                        </button>
                        <button 
                          className={cn(
                            "flex items-center gap-1 text-xs sm:text-sm",
                            message.isSaved ? "text-[#10BF0A]" : "text-gray-600 dark:text-gray-400 hover:text-gray-600 dark:text-gray-400"
                          )}
                          onClick={() => toggleSave(message.id)}
                        >
                          {message.isSaved ? (
                            <Bookmark className="w-4 h-4 fill-current" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                          <span>{message.isSaved ? 'Saved' : 'Save'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 border border-[#EBEBEB] dark:border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="space-y-4">
          {/* Knowledge Base Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-1 bg-[rgba(202,202,202,0.8)] rounded text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <FileText className="w-3 h-3" />
              <span>SOPs</span>
            </span>
            <span className="px-2 py-1 bg-[rgba(202,202,202,0.8)] rounded text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <div className="w-3 h-3">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span>Manuals</span>
            </span>
            <span className="px-2 py-1 bg-[rgba(202,202,202,0.8)] rounded text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <div className="w-3 h-3">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                </svg>
              </div>
              <span>Equipment</span>
            </span>
          </div>

          {/* Input Field */}
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about procedures, troubleshooting, safety protocols..."
                className="w-full p-3 border-2 border-[#EBEBEB] rounded-lg resize-none focus:outline-none focus:border-[#10BF0A]"
                rows={2}
              />
            </div>
            <button
              onClick={handleSendMessage}
              className="bg-[#10BF0A] text-white p-2 rounded-lg hover:bg-[#0EA50A] transition-colors"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 hover:text-gray-600 dark:text-gray-400">
                <Link className="w-3 h-3" />
                <span>Attach</span>
              </button>
              <button className="flex items-center gap-1 hover:text-gray-600 dark:text-gray-400">
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

export default AdminAIAssistant;
