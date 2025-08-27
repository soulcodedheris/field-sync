import React from 'react';

interface JobLogIconProps {
  className?: string;
  color?: string;
}

export const JobLogIcon: React.FC<JobLogIconProps> = ({ 
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
      <path 
        d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" 
        fill={color}
      />
    </svg>
  );
};
