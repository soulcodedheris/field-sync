import React from 'react';

interface ClockIconProps {
  className?: string;
  color?: string;
}

export const ClockIcon: React.FC<ClockIconProps> = ({ 
  className = "w-5 h-5", 
  color = "currentColor" 
}) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
};
