// components/atoms/CalendarCell.tsx
import React from 'react';
import { BodyText } from '@/components/atoms/Typography';
import { CheckIcon } from '@/components/atoms/Icons';

export interface CalendarCellData {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
  subject?: string;
  topic?: string;
  type?: string;
  color?: string;
  isLastDay?: boolean;
}

interface CalendarCellProps {
  data: CalendarCellData;
  onClick?: () => void;
}

const CalendarCell: React.FC<CalendarCellProps> = ({ data, onClick }) => {
  const {
    date,
    isCurrentMonth,
    isToday,
    isPast,
    subject,
    topic,
    type,
    color,
    isLastDay
  } = data;

  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'study': return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'Rev1': return 'bg-orange-50 border-orange-200 text-orange-900';
      case 'Rev2': return 'bg-red-50 border-red-200 text-red-900';
      case 'vacation': return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'backup': return 'bg-gray-50 border-gray-200 text-gray-900';
      case 'test': return 'bg-purple-50 border-purple-200 text-purple-900';
      default: return 'bg-white border-gray-100 text-gray-600';
    }
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'test': return <CheckIcon className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div
      className={`
        relative h-24 border cursor-pointer transition-all duration-200 hover:shadow-md
        ${isCurrentMonth ? 'opacity-100' : 'opacity-40'}
        ${isToday ? 'ring-2 ring-blue-500' : ''}
        ${isPast ? 'opacity-75' : ''}
        ${getTypeColor(type)}
      `}
      onClick={onClick}
      style={color ? { backgroundColor: `${color}15`, borderColor: `${color}40` } : {}}
    >
      {/* Date Number */}
      <div className={`absolute top-1 left-1 text-xs font-semibold ${isToday ? 'text-blue-600' : ''}`}>
        {date}
      </div>

      {/* Type Icon */}
      {getTypeIcon(type) && (
        <div className="absolute top-1 right-1">
          {getTypeIcon(type)}
        </div>
      )}

      {/* Subject & Topic */}
      {subject && isCurrentMonth && (
        <div className="absolute inset-0 pt-6 px-1">
          <BodyText className="text-[8px] font-medium leading-tight truncate">
            {subject}
          </BodyText>
          {topic && (
            <BodyText className="text-[7px] leading-tight truncate opacity-75">
              {topic}
            </BodyText>
          )}
        </div>
      )}

      {/* Completion Indicator */}
      {isPast && isCurrentMonth && type !== 'vacation' && (
        <div className="absolute bottom-1 right-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      )}

      {/* Last Day Indicator */}
      {isLastDay && (
        <div className="absolute bottom-1 left-1">
          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default CalendarCell;
