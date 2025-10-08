import React, { useMemo } from 'react';
import parse from 'html-react-parser';

/**
 * Configuration interface for template-specific styling and positioning
 */
interface TemplateConfig {
  leftMultiplier: number;
  top5Multiplier: number;
  hasSize1: boolean;
  size1Multiplier?: number;
  hasBorderColor: boolean;
}

/**
 * Props interface for nested data properties
 */
interface BlockTrainingData {
  height: number;
  top: number;
  org: string;
  type: string;
  desc: string;
  startD: string;
  endD: string;
  role: string;
}

/**
 * Main component props interface
 */
interface BlockTrainingProps {
  /** Scaling factor for all dimensions and positioning */
  fac: number;
  /** Template variation (1-5) */
  template: 1 | 2 | 3 | 4 | 5;
  /** Background color (CSS color value) */
  bg: string;
  /** Font color (CSS color value) */
  font: string;
  /** Font family (optional, defaults to 'Calibri') */
  fontFamily?: string;
  /** Component ID for DOM identification */
  id: string;
  /** Additional CSS classes */
  className?: string;
  /** Data properties for work experience content */
  props: BlockTrainingData;
}

/**
 * Template configuration lookup with performance-optimized calculations
 */
const TEMPLATE_CONFIGS: Record<number, TemplateConfig> = {
  1: { leftMultiplier: 17.0, top5Multiplier: 3.0, hasSize1: false, hasBorderColor: false },
  2: { leftMultiplier: 17.0, top5Multiplier: 3.0, hasSize1: false, hasBorderColor: false },
  3: { leftMultiplier: 17.0, top5Multiplier: -0.5, hasSize1: false, hasBorderColor: false },
  4: { leftMultiplier: 17.0, top5Multiplier: 3.0, hasSize1: false, hasBorderColor: false },
  5: { leftMultiplier: 6.0, top5Multiplier: 3.0, hasSize1: true, size1Multiplier: 3.6, hasBorderColor: true }
} as const;

/**
 * Helper function to convert RGB to RGBA with opacity
 */
const createBorderColor = (bgColor: string): string => {
  if (bgColor.startsWith('rgb(')) {
    return bgColor.replace('rgb(', 'rgba(').replace(')', ', 0.6)');
  }
  return bgColor;
};

/**
 * BlockTraining - Consolidated work experience block component with template variations
 * 
 * Renders a styled work experience block with configurable templates, supporting
 * different layouts, positioning, and styling options for resume/CV templates.
 * 
 * @param props - Component properties including scaling, template, colors, and data
 * @returns JSX element representing the work experience block
 */
const BlockTraining: React.FC<BlockTrainingProps> = ({
  fac,
  template,
  bg,
  font,
  fontFamily = 'Calibri',
  id,
  className,
  props: data
}) => {
  // Get template configuration
  const config = TEMPLATE_CONFIGS[template];

  // Memoized calculations for performance optimization
  const calculations = useMemo(() => {
    const baseCalc = {
      height: `${fac * data.height}px`,
      width: `${fac * 183}px`,
      line: `${fac * data.height}px`,
      size: `${fac * 3.2}pt`,
      left: `${fac * config.leftMultiplier}px`,
      top: `${fac * data.top}px`,
      top1: `${fac * 1}px`,
      top2: `${fac * 5}px`,
      top3: `${fac * 9}px`,
      top5: `${fac * config.top5Multiplier}px`,
      height1: `${fac * 3}px`,
      left1: `${fac * -6}px`
    };

    // Template 5 specific calculations
    if (config.hasSize1 && config.size1Multiplier) {
      return {
        ...baseCalc,
        size1: `${fac * config.size1Multiplier}pt`
      };
    }

    return baseCalc;
  }, [fac, data.height, data.top, config]);

  // Memoized border color for Template 5
  const borderColor = useMemo(() => 
    config.hasBorderColor ? createBorderColor(bg) : bg,
    [bg, config.hasBorderColor]
  );

  // Memoized organization style
  const orgStyle = useMemo(() => ({
    fontWeight: 'bold' as const,
    color: config.hasBorderColor ? borderColor : bg,
    ...(config.hasSize1 && { fontSize: calculations.size1 })
  }), [config.hasBorderColor, config.hasSize1, borderColor, bg, calculations.size1]);

  return (
    <div 
      id={id}
      className={className}
      style={{
        height: calculations.height,
        width: calculations.width,
        position: 'absolute',
        top: calculations.top,
        left: calculations.left,
        color: font,
        fontFamily,
        fontSize: calculations.size,
        textAlign: 'left'
      }}
    >
      {/* Circular bullet point */}
      <div 
        style={{
          top: calculations.top5,
          position: 'absolute',
          height: calculations.height1,
          width: calculations.height1,
          borderRadius: '50%',
          backgroundColor: bg,
          left: calculations.left1
        }}
      />
      
      {/* Type and date range */}
      <p style={{ lineHeight: calculations.size }}>
        <span style={{ fontWeight: 'bold', color: bg, fontStyle: 'italic' }}>
          {data.type}
        </span>
        : <span style={{ fontStyle: 'italic' }}>
          {data.startD}-{data.endD}
        </span>
      </p>
      
      {/* Organization name */}
      <p style={{}}>
        <span style={orgStyle}>
          {data.org}
        </span>
      </p>
      
      {/* Description content with secure HTML parsing */}
      <div style={{ lineHeight: calculations.size }}>
        {parse(data.desc)}
      </div>
    </div>
  );
};

export default BlockTraining;
export type { BlockTrainingProps, BlockTrainingData };
