import React, { useMemo } from 'react';
import { FaGraduationCap } from 'react-icons/fa';

/**
 * Template configuration type for BlockEdu component variations
 */
export type BlockEduTemplate = 1 | 2 | 3 | 4 | 5;

/**
 * Line style configuration
 */
export interface LineConfig {
  type: 'none' | 'vertical' | 'horizontal';
  opacity?: number;
  height?: string;
  width?: string;
}

/**
 * Education data structure
 */
export interface EducationData {
  degree: string;
  college: string;
  year: string;
  cgpa: string;
}

/**
 * Block positioning and sizing configuration
 */
export interface BlockConfig {
  height: number;
  top: number;
  line?: number; // opacity for line (templates 2, 3)
  data: EducationData;
}

/**
 * Props for the BlockEdu component
 */
export interface BlockEduProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Block configuration including height, positioning, and data */
  props: BlockConfig;
  /** Background color */
  bg: string;
  /** Font color */
  font: string;
  /** Unique component ID */
  id: string;
  /** Template variant (1-5) */
  template?: BlockEduTemplate;
  /** Font family override */
  fontFamily?: string;
  /** Custom class name */
  className?: string;
}

/**
 * Template-specific configuration mapping
 */
const TEMPLATE_CONFIGS: Record<BlockEduTemplate, {
  mainLeftMultiplier: number;
  iconLeftMultiplier: number;
  lineConfig: LineConfig;
  iconColorSource: 'font' | 'bg';
}> = {
  1: {
    mainLeftMultiplier: 17,
    iconLeftMultiplier: 3,
    lineConfig: { type: 'none' },
    iconColorSource: 'font',
  },
  2: {
    mainLeftMultiplier: 17,
    iconLeftMultiplier: 3,
    lineConfig: { type: 'vertical' },
    iconColorSource: 'font',
  },
  3: {
    mainLeftMultiplier: 17,
    iconLeftMultiplier: 1.5,
    lineConfig: { type: 'vertical' },
    iconColorSource: 'bg',
  },
  4: {
    mainLeftMultiplier: 17,
    iconLeftMultiplier: 3,
    lineConfig: { type: 'horizontal', height: '1px', width: '4px' },
    iconColorSource: 'bg',
  },
  5: {
    mainLeftMultiplier: 6,
    iconLeftMultiplier: 3,
    lineConfig: { type: 'horizontal', height: '1px', width: '4px' },
    iconColorSource: 'font',
  },
};

/**
 * BlockEdu - A consolidated education block component supporting multiple template variations
 * 
 * This component renders education information including degree, college, year, and CGPA
 * with configurable styling, positioning, and visual elements based on the selected template.
 * 
 * @param props - Component properties
 * @returns JSX.Element representing the education block
 */
export const BlockEdu: React.FC<BlockEduProps> = ({
  fac,
  props: blockProps,
  bg,
  font,
  id,
  template = 1,
  fontFamily = 'arial',
  className,
}) => {
  const templateConfig = TEMPLATE_CONFIGS[template];

  // Memoized calculations for performance
  const calculations = useMemo(() => {
    const baseCalculations = {
      // Main container dimensions and positioning
      height: `${fac * blockProps.height}px`,
      width: `${fac * 180}px`,
      left: `${fac * templateConfig.mainLeftMultiplier}px`,
      top: `${fac * blockProps.top}px`,

      // Font sizes
      size: `${fac * 3.2}pt`,
      size1: `${fac * 4}pt`,

      // Icon positioning
      iconTop: `${fac * 1}px`,
      iconLeft: `${fac * templateConfig.iconLeftMultiplier}px`,
      iconTopOffset: `${fac * 3}px`,

      // Content positioning
      contentTop: `${fac * 5}px`,
      cgpaTop: `${fac * 10}px`,
      degreeLeft: `${fac * 52}px`,
      collegeLeft: `${fac * 100}px`,
      yearLeft: `${fac * 150}px`,
    };

    // Line-specific calculations based on template
    const lineCalculations = (() => {
      switch (templateConfig.lineConfig.type) {
        case 'vertical':
          return {
            lineHeight: `${fac * blockProps.height}px`,
            lineTop: `${-fac * (blockProps.height - 2)}px`,
            lineLeft: `${fac * -5}px`,
            lineWidth: `${fac * 0.5}px`,
            lineOpacity: blockProps.line || 1,
          };
        case 'horizontal':
          return {
            lineHeight: templateConfig.lineConfig.height,
            lineWidth: templateConfig.lineConfig.width,
            lineTop: `${fac * 0.5}px`,
            lineLeft: `${fac * -6}px`,
            lineOpacity: 1,
          };
        default:
          return {};
      }
    })();

    return { ...baseCalculations, ...lineCalculations };
  }, [fac, blockProps, template, templateConfig]);

  // Determine icon color based on template configuration
  const iconColor = templateConfig.iconColorSource === 'bg' ? bg : font;

  // Render line element based on template configuration
  const renderLine = () => {
    if (templateConfig.lineConfig.type === 'none') return null;

    return (
      <div
        style={{
          position: 'absolute',
          height: calculations.lineHeight,
          width: calculations.lineWidth,
          background: font,
          top: calculations.lineTop,
          left: calculations.lineLeft,
          opacity: calculations.lineOpacity,
        }}
      />
    );
  };

  return (
    <div
      key={id}
      className={className}
      style={{
        height: calculations.height,
        width: calculations.width,
        position: 'absolute',
        background: bg,
        top: calculations.top,
        left: calculations.left,
        fontSize: calculations.size,
        color: font,
        fontFamily,
      }}
    >
      {/* Icon */}
      <div
        style={{
          position: 'absolute',
          top: calculations.iconTop,
          left: calculations.iconLeft,
        }}
      >
        <FaGraduationCap
          style={{
            fontSize: calculations.size1,
            top: calculations.iconTopOffset,
            color: iconColor,
          }}
        />
      </div>

      {/* Degree */}
      <div
        style={{
          position: 'absolute',
          top: calculations.contentTop,
          left: calculations.degreeLeft,
        }}
      >
        {blockProps.data.degree}
      </div>

      {/* College */}
      <div
        style={{
          position: 'absolute',
          top: calculations.contentTop,
          left: calculations.collegeLeft,
        }}
      >
        {blockProps.data.college}
      </div>

      {/* Year */}
      <div
        style={{
          position: 'absolute',
          top: calculations.contentTop,
          left: calculations.yearLeft,
        }}
      >
        {blockProps.data.year}
      </div>

      {/* CGPA */}
      <div
        style={{
          position: 'absolute',
          top: calculations.cgpaTop,
          left: calculations.degreeLeft,
        }}
      >
        {blockProps.data.cgpa}
      </div>

      {/* Conditional line element */}
      {renderLine()}
    </div>
  );
};

export default BlockEdu;