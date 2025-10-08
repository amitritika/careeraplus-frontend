import React, { useMemo } from 'react';
import parse from 'html-react-parser';

/**
 * Template configuration enum for different LeftBlockBullet variations
 */
export enum LeftBlockBulletTemplate {
  TEMPLATE1 = 'template1',
  TEMPLATE2 = 'template2', 
  TEMPLATE3 = 'template3',
  TEMPLATE4 = 'template4',
  TEMPLATE5 = 'template5'
}

/**
 * Props interface for the bullet content data
 */
export interface LeftBlockBulletData {
  /** Height of the bullet block */
  height: number;
  /** HTML content to display in the bullet */
  name: string;
  /** Top position offset */
  top: number;
  /** Line display flag (only used in template2) */
  line?: number;
}

/**
 * Main props interface for LeftBlockBullet component
 */
export interface LeftBlockBulletProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Background color */
  bg: string;
  /** Font color */
  font: string;
  /** Optional font family (defaults to 'Calibri') */
  fontFamily?: string;
  /** Optional element ID */
  id?: string;
  /** Optional CSS class name */
  className?: string;
  /** Template variation to use */
  template?: number;
  /** Bullet content and positioning data */
  props: LeftBlockBulletData;
}

/**
 * Template configuration for different bullet variations
 */
const TEMPLATE_CONFIG = {
  1: {
    width: 76,
    leftOffset: 4,
    contentStyles: {},
    hasConditionalLine: false
  },
  2: {
    width: 76,
    leftOffset: 4,
    contentStyles: {},
    hasConditionalLine: true
  },
  3: {
    width: 76,
    leftOffset: 4,
    contentStyles: { },
    hasConditionalLine: false
  },
  4: {
    width: 76,
    leftOffset: 4,
    contentStyles: { },
    hasConditionalLine: false
  },
  5: {
    width: 74,
    leftOffset: 6,
    contentStyles: {},
    hasConditionalLine: false
  }
};

/**
 * Helper function to calculate scaled dimensions
 */
const calculateDimensions = (fac: number, base: number): string => `${fac * base}px`;

/**
 * Helper function to calculate scaled font size
 */
const calculateFontSize = (fac: number): string => `${fac * 3.2}pt`;

/**
 * LeftBlockBullet - A configurable bullet point component for resume templates
 * 
 * @param props - The component props
 * @returns JSX element representing a styled bullet point
 */
const LeftBlockBullet: React.FC<LeftBlockBulletProps> = ({
  fac,
  bg,
  font,
  fontFamily = 'Calibri',
  id,
  className,
  template = LeftBlockBulletTemplate.TEMPLATE1,
  props: bulletProps
}) => {
  const config = TEMPLATE_CONFIG[template as keyof typeof TEMPLATE_CONFIG];
  
  // Memoized calculations for performance optimization
  const calculations = useMemo(() => ({
    // Main container dimensions and positioning
    height: calculateDimensions(fac, bulletProps.height),
    width: calculateDimensions(fac, config.width),
    left: calculateDimensions(fac, config.leftOffset),
    top: calculateDimensions(fac, bulletProps.top),
    fontSize: calculateFontSize(fac),
    
    // Border line positioning and dimensions
    borderTop: calculateDimensions(fac, 3),
    borderHeight: calculateDimensions(fac, 1),
    borderLeft: calculateDimensions(fac, -2),
    
    // Content positioning
    contentTop: calculateDimensions(fac, 8),
    contentPaddingLeft: calculateDimensions(fac, 2),
    contentPaddingRight: calculateDimensions(fac, 2),
    
    // Conditional line dimensions (for template2)
    lineHeight: calculateDimensions(fac, bulletProps.height - 4),
    lineTop: calculateDimensions(fac, 6),
    lineLeft: calculateDimensions(fac, -2),
    lineWidth: calculateDimensions(fac, 0.5)
  }), [fac, bulletProps.height, bulletProps.top, config.width, config.leftOffset]);
  
  // Memoized parsed HTML content for security
  const parsedContent = useMemo(() => parse(bulletProps.name), [bulletProps.name]);

  let color = 'white'
  if(template == 3){
    color = font
  }
  if(template == 5){
    color = bg
  }
  
  // Main container styles
  const containerStyles: React.CSSProperties = {
    position: 'absolute',
    height: calculations.height,
    width: calculations.width,
    top: calculations.top,
    left: calculations.left,
    fontSize: calculations.fontSize,
    color: color,
    fontFamily
  };
  
  // Border line styles
  const borderStyles: React.CSSProperties = {
    position: 'absolute',
    top: calculations.borderTop,
    height: calculations.borderHeight,
    backgroundColor: bg,
    border: `1px solid ${font}`,
    width: '100%',
    left: calculations.borderLeft
  };
  
  // Content styles with template-specific additions
  const contentStyles: React.CSSProperties = {
    position: 'absolute',
    paddingLeft: calculations.contentPaddingLeft,
    paddingRight: calculations.contentPaddingRight,
    lineHeight: 1,
    ...config.contentStyles
  };
  
  // Conditional line styles (only for template2)
  const lineStyles: React.CSSProperties = {
    position: 'absolute',
    top: calculations.lineTop,
    height: calculations.lineHeight,
    backgroundColor: font,
    width: calculations.lineWidth,
    left: calculations.lineLeft
  };
  
  return (
    <div 
      style={containerStyles} 
      id={id}
      className={className}
    >
      {/* Border line element 
      <div style={borderStyles} />*/}
      
      {/* Content container with parsed HTML */}
      <div style={contentStyles}>
        {parsedContent}
      </div>
      
      {/* Conditional vertical line (only for template2) */}
      {config.hasConditionalLine && bulletProps.line === 1 && (
        <div style={lineStyles} />
      )}
    </div>
  );
};

export default LeftBlockBullet;
