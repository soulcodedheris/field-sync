import React from 'react';

interface InventoryIconProps {
  className?: string;
  color?: string;
}

export const InventoryIcon: React.FC<InventoryIconProps> = ({ 
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
      <path d="M3 7h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M7 11h10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 15h6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};
