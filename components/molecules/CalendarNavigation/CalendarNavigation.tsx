// components/molecules/CalendarNavigation.tsx
import React from 'react';
import CalendarNavigationButton from '@/components/atoms/CalendarNavigationButton';
import MonthHeader from '@/components/atoms/MonthHeader';
import { BodyText } from '@/components/atoms/Typography';

interface CalendarNavigationProps {
  currentMonth: string;
  currentYear: number;
  currentIndex: number;
  totalMonths: number;
  onPrev: () => void;
  onNext: () => void;
  onMonthSelect?: (index: number) => void;
  monthNames?: string[];
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  currentMonth,
  currentYear,
  currentIndex,
  totalMonths,
  onPrev,
  onNext,
  onMonthSelect,
  monthNames = []
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Previous Button */}
      <CalendarNavigationButton
        direction="prev"
        onClick={onPrev}
        disabled={currentIndex === 0}
      />

      {/* Month Header */}
      <div className="flex-1">
        <MonthHeader month={currentMonth} year={currentYear} />
        
        {/* Month Progress */}
        <div className="flex justify-center space-x-1 mt-2">
          {Array.from({ length: totalMonths }).map((_, index) => (
            <button
              key={index}
              onClick={() => onMonthSelect?.(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-500' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              title={monthNames[index] || `Month ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Text */}
        <BodyText className="text-center text-sm text-[color:rgb(var(--neutral-600))] mt-1">
          {currentIndex + 1} of {totalMonths} months
        </BodyText>
      </div>

      {/* Next Button */}
      <CalendarNavigationButton
        direction="next"
        onClick={onNext}
        disabled={currentIndex === totalMonths - 1}
      />
    </div>
  );
};

export default CalendarNavigation;
