import React from 'react';
import { Bot } from 'lucide-react';

interface AIAssistantIconProps {
  className?: string;
  color?: string;
}

export const AIAssistantIcon: React.FC<AIAssistantIconProps> = ({ 
  className = "w-5 h-5", 
  color = "currentColor" 
}) => {
  return <Bot className={className} stroke={color} />;
};
