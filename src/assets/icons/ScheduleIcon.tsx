import React from 'react';

interface ScheduleIconProps {
  className?: string;
  color?: string;
}

export const ScheduleIcon: React.FC<ScheduleIconProps> = ({ 
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
        d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" 
        fill={color}
      />
    </svg>
  );
};
