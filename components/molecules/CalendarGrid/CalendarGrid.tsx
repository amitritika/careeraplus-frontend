// components/molecules/CalendarGrid.tsx
import React from 'react';
import CalendarCell from '@/components/atoms/CalendarCell';
import  { CalendarCellData }  from '@/components/atoms/CalendarCell/CalendarCell';
import { BodyText } from '@/components/atoms/Typography';

interface CalendarGridProps {
  calendarData: CalendarCellData[][];
  onCellClick?: (data: CalendarCellData) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ calendarData, onCellClick }) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Week Days Header */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {weekDays.map((day) => (
          <div key={day} className="p-3 text-center">
            <BodyText className="text-sm font-semibold text-[color:rgb(var(--neutral-700))]">
              {day}
            </BodyText>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {calendarData.flat().map((cellData, index) => (
          <CalendarCell
            key={index}
            data={cellData}
            onClick={() => onCellClick?.(cellData)}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
