// components/organisms/CalendarCarousel.tsx
import React, { useState, useEffect, useMemo } from 'react';
import CalendarGrid from '@/components/molecules/CalendarGrid';
import CalendarNavigation from '@/components/molecules/CalendarNavigation';
import { CalendarCellData } from '@/components/atoms/CalendarCell/CalendarCell';

interface ScheduleDay {
  date: string;
  subject: string;
  topic: string;
  type: string;
  testType?: string;
  color: string;
  isLastDay?: boolean;
}

interface CalendarCarouselProps {
  schedule: ScheduleDay[];
  startDate: string;
  endDate: string;
  onCellClick?: (data: CalendarCellData) => void;
}

interface MonthData {
  name: string;
  year: number;
  calendarData: CalendarCellData[][];
}

const CalendarCarousel: React.FC<CalendarCarouselProps> = ({
  schedule,
  startDate,
  endDate,
  onCellClick
}) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  // Generate month data from schedule
  const monthsData = useMemo((): MonthData[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months: MonthData[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Create a map of schedule by date
    const scheduleMap = new Map<string, ScheduleDay>();
    schedule.forEach(day => {
      const dateKey = new Date(day.date).toDateString();
      scheduleMap.set(dateKey, day);
    });

    // Generate months between start and end date
    const currentDate = new Date(start.getFullYear(), start.getMonth(), 1);
    
    while (currentDate <= end) {
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const monthName = currentDate.toLocaleString('default', { month: 'long' });

      // Create calendar grid for this month
      const calendarData: CalendarCellData[][] = [];
      
      // Get first day of month and last day of month
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const firstDayOfWeek = firstDay.getDay();
      
      // Calculate dates to show (including prev/next month dates)
      const startCalendarDate = new Date(firstDay);
      startCalendarDate.setDate(1 - firstDayOfWeek);
      
      // Create 6 weeks (42 days) of calendar
      for (let week = 0; week < 6; week++) {
        const weekData: CalendarCellData[] = [];
        
        for (let day = 0; day < 7; day++) {
          const cellDate = new Date(startCalendarDate);
          cellDate.setDate(startCalendarDate.getDate() + (week * 7) + day);
          
          const isCurrentMonth = cellDate.getMonth() === month;
          const dateKey = cellDate.toDateString();
          const scheduleDay = scheduleMap.get(dateKey);
          
          const cellData: CalendarCellData = {
            date: cellDate.getDate(),
            isCurrentMonth,
            isToday: cellDate.getTime() === today.getTime(),
            isPast: cellDate < today,
            subject: scheduleDay?.subject,
            topic: scheduleDay?.topic,
            type: scheduleDay?.type,
            color: scheduleDay?.color,
            isLastDay: scheduleDay?.isLastDay
          };
          
          weekData.push(cellData);
        }
        
        calendarData.push(weekData);
      }

      months.push({
        name: monthName,
        year,
        calendarData
      });

      // Move to next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return months;
  }, [schedule, startDate, endDate]);

  const handlePrevMonth = () => {
    setCurrentMonthIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex(prev => Math.min(monthsData.length - 1, prev + 1));
  };

  const handleMonthSelect = (index: number) => {
    setCurrentMonthIndex(index);
  };

  if (monthsData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No calendar data available
      </div>
    );
  }

  const currentMonth = monthsData[currentMonthIndex];

  return (
    <div className="w-full">
      <CalendarNavigation
        currentMonth={currentMonth.name}
        currentYear={currentMonth.year}
        currentIndex={currentMonthIndex}
        totalMonths={monthsData.length}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        onMonthSelect={handleMonthSelect}
        monthNames={monthsData.map(m => `${m.name} ${m.year}`)}
      />
      
      <CalendarGrid
        calendarData={currentMonth.calendarData}
        onCellClick={onCellClick}
      />
    </div>
  );
};

export default CalendarCarousel;
