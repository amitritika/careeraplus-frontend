// components/atoms/CalendarNavigationButton.tsx
import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/atoms/Icons';

interface CalendarNavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled?: boolean;
}

const CalendarNavigationButton: React.FC<CalendarNavigationButtonProps> = ({
  direction,
  onClick,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        p-2 rounded-lg transition-all duration-200
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:bg-blue-50 hover:text-blue-600 text-gray-600'
        }
      `}
    >
      {direction === 'prev' ? (
        <ArrowLeftIcon className="w-5 h-5" />
      ) : (
        <ArrowRightIcon className="w-5 h-5" />
      )}
    </button>
  );
};

export default CalendarNavigationButton;
