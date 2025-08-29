import React, { useState } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';

export interface LiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveChatModal: React.FC<LiveChatModalProps> = ({
  isOpen,
  onClose
}) => {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md h-96 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#10BF0A]" />
            <h3 className="text-lg font-semibold text-black dark:text-white">Live Chat</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Welcome to FieldSync Support! How can we help you today?
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-[#E5E7EB]">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10BF0A]"
            />
            <button 
              onClick={handleSend}
              disabled={!message.trim()}
              className="px-4 py-2 bg-[#10BF0A] text-white rounded-lg disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
