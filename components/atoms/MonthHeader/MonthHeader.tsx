// components/atoms/MonthHeader.tsx
import React from 'react';
import { H3 } from '@/components/atoms/Typography';

interface MonthHeaderProps {
  month: string;
  year: number;
  className?: string;
}

const MonthHeader: React.FC<MonthHeaderProps> = ({ month, year, className = '' }) => {
  return (
    <div className={`text-center py-4 ${className}`}>
      <H3 className="text-[color:rgb(var(--neutral-900))] font-bold">
        {month} {year}
      </H3>
    </div>
  );
};

export default MonthHeader;
