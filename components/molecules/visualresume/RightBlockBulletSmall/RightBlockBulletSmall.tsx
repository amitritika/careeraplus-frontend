import React, { useMemo } from 'react';
import parse from 'html-react-parser';

/**
 * Props for individual bullet data
 */
interface BulletProps {
  /** Height of the bullet block */
  height: number;
  /** Top position offset */
  top: number;
  /** HTML content to render */
  name: string;
  /** Line visibility flag (for templates 2 & 3) */
  line?: boolean;
}

/**
 * Configuration for template-specific styling
 */
interface TemplateConfig {
  hasLineElement: boolean;
  leftOffset: number;
  lineTop?: number;
  lineLeft?: number;
  lineWidth?: number;
  secondarySize?: number;
  conditionalLine: boolean;
}

/**
 * Main component props interface
 */
interface RightBlockBulletSmallProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Template number (1-5) */
  template?: 1 | 2 | 3 | 4 | 5;
  /** Bullet data properties */
  props: BulletProps;
  /** Background color */
  bg: string;
  /** Font color */
  font: string;
  /** Font family */
  fontFamily?: string;
  /** Element ID */
  id?: string;
  /** Additional CSS classes */
  className?: string;

  resumeType: 'fresher' | 'pro' | 'expert'
}

/**
 * Template configurations mapping
 */
const TEMPLATE_CONFIGS: Record<number, TemplateConfig> = {
  1: {
    hasLineElement: false,
    leftOffset: 17,
    conditionalLine: false,
  },
  2: {
    hasLineElement: true,
    leftOffset: 17,
    lineTop: 6,
    lineLeft: -5,
    lineWidth: 0.5,
    conditionalLine: true,
  },
  3: {
    hasLineElement: true,
    leftOffset: 17,
    lineTop: 0.5,
    lineLeft: -6,
    secondarySize: 2.5,
    conditionalLine: true,
  },
  4: {
    hasLineElement: true,
    leftOffset: 17,
    lineTop: 0.5,
    lineLeft: -6,
    secondarySize: 2.5,
    conditionalLine: false,
  },
  5: {
    hasLineElement: true,
    leftOffset: 8,
    lineTop: 2,
    lineLeft: -2,
    secondarySize: 1,
    conditionalLine: false,
  },
};

/**
 * RightBlockBulletSmall - Consolidated bullet point component with template variations
 * 
 * Supports 5 different template configurations with varying line elements,
 * positioning, and conditional rendering capabilities.
 * 
 * @param props - Component properties
 * @returns JSX element representing the styled bullet block
 */
const RightBlockBulletSmall: React.FC<RightBlockBulletSmallProps> = ({
  fac,
  template = 1,
  props: bulletProps,
  bg,
  font,
  fontFamily,
  id,
  className,
}) => {
  const config = TEMPLATE_CONFIGS[template];

  // Memoized calculations for performance
  const calculations = useMemo(() => {
    return {
      height: `${fac * bulletProps.height}px`,
      width: `${fac * 113}px`,
      line: `${fac * bulletProps.height}px`,
      size: `${fac * 3.2}pt`,
      left: `${fac * config.leftOffset}px`,
      top: `${fac * bulletProps.top}px`,
      top1: `${fac * 3}px`,
      height1: `${fac * 2}px`,
      left1: `${fac * -5.5}px`,
      // Template-specific calculations
      lineT: config.lineTop ? `${fac * config.lineTop}px` : undefined,
      lineL: config.lineLeft ? `${fac * config.lineLeft}px` : undefined,
      lineW: config.lineWidth ? `${fac * config.lineWidth}px` : undefined,
      lineH: config.hasLineElement ? `${fac * bulletProps.height}px` : undefined,
      size1: config.secondarySize ? `${fac * config.secondarySize}pt` : undefined,
    };
  }, [fac, bulletProps.height, bulletProps.top, config]);

  // Memoized parsed content for performance
  const parsedContent = useMemo(() => {
    return parse(bulletProps.name);
  }, [bulletProps.name]);

  // Helper function to render line element based on template
  const renderLineElement = () => {
    if (!config.hasLineElement) return null;

    const shouldShowLine = config.conditionalLine ? bulletProps.line : true;
    if (!shouldShowLine) return null;

    const lineStyle: React.CSSProperties = {
      position: 'absolute',
      backgroundColor: bg,
      height: calculations.lineH,
      top: calculations.lineT,
      left: calculations.lineL,
      ...(calculations.lineW && { width: calculations.lineW }),
    };

    return <div style={lineStyle} />;
  };

  // Main container styles
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    height: calculations.height,
    width: calculations.width,
    left: calculations.left,
    top: calculations.top,
    fontFamily: fontFamily,
  };

  // Bullet dot styles
  const bulletStyle: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: bg,
    borderRadius: '50%',
    height: calculations.height1,
    width: calculations.height1,
    left: calculations.left1,
    top: calculations.top1,
  };

  // Content text styles
  const contentStyle: React.CSSProperties = {
    color: font,
    fontSize: calculations.size,
    lineHeight: calculations.line,
  };

  return (
    <div 
      id={id}
      className={className}
      style={containerStyle}
    >
      <div style={bulletStyle} />
      {renderLineElement()}
      <div style={contentStyle}>
        {parsedContent}
      </div>
    </div>
  );
};

export default RightBlockBulletSmall;
export type { RightBlockBulletSmallProps, BulletProps, TemplateConfig };
