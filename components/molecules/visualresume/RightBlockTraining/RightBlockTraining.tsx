import React, { useMemo } from 'react';
import parse from 'html-react-parser';

/**
 * Template configuration type for RightBlockTraining component
 */
export type RightBlockTrainingTemplate = 1 | 2 | 3 | 4 | 5;

/**
 * Props for work experience data
 */
export interface WorkExperienceData {
  /** Height scaling factor for the block */
  height: number;
  /** Organization/Company name */
  org: string;
  /** Experience type/category */
  type: string;
  /** Job description (HTML content) */
  desc: string;
  /** Start date */
  startD: string;
  /** End date */
  endD: string;
  /** Top positioning offset */
  top: number;
  /** Role/Position title */
  role: string;
}

/**
 * Main props interface for RightBlockTraining component
 */
export interface RightBlockTrainingProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Background color (CSS color value) */
  bg: string;
  /** Font color (CSS color value) */
  font: string;
  /** Component ID */
  id: string;
  /** Template variation (1-5) */
  template: RightBlockTrainingTemplate;
  /** Work experience data */
  props: WorkExperienceData;
  /** Optional CSS class name */
  className?: string;
  /** Optional font family */
  fontFamily?: string;
}

/**
 * Template-specific configuration for positioning and styling
 */
interface TemplateConfig {
  top5Factor: number;
  leftFactor: number;
  hasSize1?: boolean;
  size1Factor?: number;
  hasBorderColor?: boolean;
}

/**
 * RightBlockTraining - A consolidated training/work experience block component
 * 
 * Supports 5 different template variations with template-specific styling and positioning.
 * Displays work experience information including dates, organization, role, and description.
 * 
 * @param props - Component props
 * @returns JSX element representing the training block
 */
export const RightBlockTraining: React.FC<RightBlockTrainingProps> = ({
  fac,
  bg,
  font,
  id,
  template,
  props: workData,
  className,
  fontFamily
}) => {
  // Template-specific configurations
  const templateConfigs: Record<RightBlockTrainingTemplate, TemplateConfig> = useMemo(() => ({
    1: { top5Factor: 3, leftFactor: 17 },
    2: { top5Factor: 3, leftFactor: 17 },
    3: { top5Factor: -0.5, leftFactor: 17 }, // Unique negative top5
    4: { top5Factor: 3, leftFactor: 17 },
    5: { 
      top5Factor: 3, 
      leftFactor: 6, // Unique left positioning
      hasSize1: true, 
      size1Factor: 3.6,
      hasBorderColor: true 
    }
  }), []);

  // Get current template configuration
  const config = templateConfigs[template];

  // Memoized calculations for performance
  const calculations = useMemo(() => {
    const base = {
      height: `${fac * workData.height}px`,
      width: `${fac * 113}px`,
      line: `${fac * workData.height}px`,
      size: `${fac * 3.2}pt`,
      left: `${fac * config.leftFactor}px`,
      top: `${fac * workData.top}px`,
      top1: `${fac * 1}px`,
      top2: `${fac * 5}px`, 
      top3: `${fac * 9}px`,
      top5: `${fac * config.top5Factor}px`,
      height1: `${fac * 3}px`,
      left1: `${fac * -6}px`
    };

    // Template 5 specific calculations
    if (config.hasSize1 && config.size1Factor) {
      (base as any).size1 = `${fac * config.size1Factor}pt`;
    }

    if (config.hasBorderColor) {
      (base as any).borderColor = bg.replace('rgb(', 'rgba(').replace(')', ', 0.6)');
    }

    return base;
  }, [fac, workData, config, bg]);

  // Base styles
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: calculations.width,
    height: calculations.height,
    fontFamily: fontFamily || 'inherit'
  };

  const dateStyle: React.CSSProperties = {
    position: 'absolute',
    top: calculations.top1,
    left: calculations.left,
    fontSize: calculations.size,
    color: font,
    fontWeight: 'normal'
  };

  const orgStyle: React.CSSProperties = {
    position: 'absolute',
    top: calculations.top2,
    left: calculations.left,
    fontSize: template === 5 && 'size1' in calculations ? (calculations as any).size1 : calculations.size,
    color: font,
    fontWeight: 'bold'
  };

  const roleStyle: React.CSSProperties = {
    position: 'absolute',
    top: calculations.top3,
    left: calculations.left,
    fontSize: calculations.size,
    color: font,
    fontStyle: 'italic'
  };

  const descStyle: React.CSSProperties = {
    position: 'absolute',
    top: calculations.top5,
    left: calculations.left1,
    fontSize: calculations.size,
    color: font,
    width: calculations.width,
    lineHeight: '1.2'
  };

  // Template 5 specific border styling
  const borderStyle: React.CSSProperties = template === 5 && 'borderColor' in calculations ? {
    borderLeft: `2px solid ${(calculations as any).borderColor}`,
    paddingLeft: `${fac * 4}px`
  } : {};

  return (
    <div 
      id={id}
      className={className}
      style={{
        ...containerStyle,
        ...borderStyle
      }}
    >
      {/* Date range */}
      <div style={dateStyle}>
        {workData.type}: {workData.startD}-{workData.endD}
      </div>
      
      {/* Organization */}
      <div style={orgStyle}>
        {workData.org}
      </div>
      
      {/* Role */}
      <div style={roleStyle}>
        {workData.role}
      </div>
      
      {/* Description */}
      <div style={descStyle}>
        {typeof workData.desc === 'string' && workData.desc.includes('<') 
          ? parse(workData.desc)
          : workData.desc
        }
      </div>
      
      {/* Vertical line indicator */}
      <div 
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '2px',
          height: calculations.line,
          backgroundColor: bg,
          opacity: 0.7
        }}
      />
    </div>
  );
};

export default RightBlockTraining;
