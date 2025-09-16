// components/templates/CalendarSection.tsx
'use client';

import React, { useRef, useState, useCallback } from 'react';
import { H2, H3, BodyText } from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { 
  CalendarIcon, 
  DownloadIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon,
  LoadingSpinner 
} from '@/components/atoms/Icons';
import html2canvas from 'html2canvas';

interface ScheduleDay {
  date: string;
  subject: string;
  topic: string;
  type: string;
  testType?: string;
  color: string;
  isLastDay?: boolean;
}

interface CalendarSectionProps {
  schedule: ScheduleDay[];
  startDate: string;
  endDate: string;
  title?: string;
  description?: string;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({
  schedule,
  startDate,
  endDate,
  title = "Study Calendar",
  description = "Navigate through your monthly study schedule. Click on any day to see detailed information."
}) => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(startDate));
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<ScheduleDay | null>(null);

  // Subject colors mapping
  const subjectColors = {
    'Eng Math': '#3B82F6',
    'Eng Mec': '#10B981', 
    'SOM': '#F59E0B',
    'TOM': '#EF4444',
    'MD': '#8B5CF6',
    'FM': '#06B6D4',
    'HT': '#F97316',
    'Thermo': '#84CC16',
    'RAC': '#EC4899',
    'Manf': '#6366F1',
    'IE': '#14B8A6',
    'VACATION': '#FFC107',
    'BACKUP': '#6B7280',
    'DEFAULT': '#9CA3AF'
  };

  const getSubjectColor = useCallback((subject: string, type: string) => {
    if (type === 'vacation') return subjectColors['VACATION'];
    if (type === 'backup') return subjectColors['BACKUP'];
    if (type === 'test') return '#9C27B0';
    return subjectColors[subject as keyof typeof subjectColors] || subjectColors['DEFAULT'];
  }, []);

  const generateMonthCalendar = useCallback((month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const startCalendar = new Date(firstDay);
    const endCalendar = new Date(lastDay);
    
    // Adjust to start on Sunday
    startCalendar.setDate(startCalendar.getDate() - startCalendar.getDay());
    // Adjust to end on Saturday
    endCalendar.setDate(endCalendar.getDate() + (6 - endCalendar.getDay()));

    const weeks = [];
    const currentDate = new Date(startCalendar);

    while (currentDate <= endCalendar) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const daySchedule = schedule.find(day => {
          const scheduleDate = new Date(day.date);
          return scheduleDate.toDateString() === currentDate.toDateString();
        });

        week.push({
          date: new Date(currentDate),
          schedule: daySchedule,
          isCurrentMonth: currentDate.getMonth() === monthIndex,
          isToday: currentDate.toDateString() === new Date().toDateString()
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(week);
    }

    return weeks;
  }, [schedule]);

  const downloadCalendar = useCallback(async () => {
    if (!calendarRef.current) return;
    
    try {
      setIsDownloading(true);
      
      const canvas = await html2canvas(calendarRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        width: calendarRef.current.scrollWidth,
        height: calendarRef.current.scrollHeight,
        useCORS: true,
        allowTaint: true
      });

      const link = document.createElement('a');
      link.download = `study-calendar-${currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
    } catch (error) {
      console.error('Error downloading calendar:', error);
    } finally {
      setIsDownloading(false);
    }
  }, [currentMonth]);

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  }, []);

  const weeks = generateMonthCalendar(currentMonth);
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 p-8 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <H2 className="text-[color:rgb(var(--neutral-900))] mb-2">{title}</H2>
          <BodyText className="text-[color:rgb(var(--neutral-600))]">{description}</BodyText>
        </div>
        
        <Button
          onClick={downloadCalendar}
          loading={isDownloading}
          loadingText="Downloading..."
          variant="outline-primary"
          leftIcon={<DownloadIcon />}
        >
          Download Calendar
        </Button>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={() => navigateMonth('prev')}
          variant="ghost-primary"
          size="sm"
          leftIcon={<ArrowLeftIcon />}
        >
          Previous
        </Button>
        
        <H3 className="text-[color:rgb(var(--neutral-800))]">{monthName}</H3>
        
        <Button
          onClick={() => navigateMonth('next')}
          variant="ghost-primary"
          size="sm"
          rightIcon={<ArrowRightIcon />}
        >
          Next
        </Button>
      </div>

      {/* Calendar Grid */}
      <div ref={calendarRef} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Days of week header */}
        <div className="grid grid-cols-7 bg-gray-50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center font-semibold text-gray-700 text-sm">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar weeks */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7">
            {week.map((day, dayIndex) => {
              const bgColor = day.schedule 
                ? getSubjectColor(day.schedule.subject, day.schedule.type)
                : 'transparent';
              
              return (
                <div
                  key={dayIndex}
                  className={`
                    relative min-h-[100px] border-r border-b border-gray-200 p-2 cursor-pointer
                    transition-all duration-200 hover:shadow-lg
                    ${!day.isCurrentMonth ? 'bg-gray-50 opacity-50' : 'bg-white'}
                    ${day.isToday ? 'ring-2 ring-blue-500' : ''}
                  `}
                  style={{ 
                    backgroundColor: day.schedule ? `${bgColor}15` : undefined,
                    borderLeft: day.schedule ? `4px solid ${bgColor}` : '4px solid transparent'
                  }}
                  onClick={() => day.schedule && setSelectedDay(day.schedule)}
                >
                  {/* Date number */}
                  <div className={`
                    text-sm font-medium mb-1
                    ${day.isToday ? 'text-blue-600 font-bold' : 'text-gray-700'}
                    ${!day.isCurrentMonth ? 'text-gray-400' : ''}
                  `}>
                    {day.date.getDate()}
                  </div>

                  {/* Schedule content */}
                  {day.schedule && (
                    <div className="space-y-1">
                      {/* Subject name - BIGGER FONT */}
                      <div 
                        className="text-sm font-bold text-white px-2 py-1 rounded text-center truncate"
                        style={{ backgroundColor: bgColor }}
                        title={day.schedule.subject}
                      >
                        {day.schedule.subject}
                      </div>

                      {/* Topic name - BIGGER FONT */}
                      <div className="text-xs font-medium text-gray-700 px-1 truncate leading-tight" title={day.schedule.topic}>
                        {day.schedule.topic}
                      </div>

                      {/* Type badge */}
                      {day.schedule.type !== 'study' && (
                        <div className="text-xs bg-white bg-opacity-80 text-gray-800 px-1 py-0.5 rounded text-center font-medium">
                          {day.schedule.type.toUpperCase()}
                        </div>
                      )}

                      {/* Test indicator */}
                      {day.schedule.type === 'test' && (
                        <div className="text-xs bg-purple-600 text-white px-1 py-0.5 rounded text-center font-medium">
                          TEST
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <H3 className="text-sm font-semibold text-gray-700 mb-3">Subject Legend</H3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Object.entries(subjectColors).map(([subject, color]) => (
            <div key={subject} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-xs text-gray-600 font-medium">{subject}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected day modal */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedDay(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <H3 className="mb-4 text-[color:rgb(var(--neutral-900))]">
              {new Date(selectedDay.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </H3>
            
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-700">Subject: </span>
                <span className="text-gray-600">{selectedDay.subject}</span>
              </div>
              
              <div>
                <span className="font-semibold text-gray-700">Topic: </span>
                <span className="text-gray-600">{selectedDay.topic}</span>
              </div>
              
              <div>
                <span className="font-semibold text-gray-700">Type: </span>
                <span className="text-gray-600 capitalize">{selectedDay.type}</span>
              </div>

              {selectedDay.testType && (
                <div>
                  <span className="font-semibold text-gray-700">Test Type: </span>
                  <span className="text-gray-600">{selectedDay.testType}</span>
                </div>
              )}
            </div>

            <div className="mt-6 text-right">
              <Button onClick={() => setSelectedDay(null)} variant="secondary" size="sm">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarSection;
