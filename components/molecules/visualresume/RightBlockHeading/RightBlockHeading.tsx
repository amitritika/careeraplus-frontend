import React, { useMemo } from 'react';
import { textWidth, textWidthL } from '@/lib/visualresume/common';
/**
 * Props for the nested data object
 */
interface RightBlockHeadingData {
  /** Height multiplier for the component */
  height: number;
  /** Top position multiplier */
  top: number;
  /** Display name/text content */
  name: string;
}

/**
 * Configuration for text width calculation
 */
interface TextWidthCalculation {
  /** Calculated text width array [width, value] */
  textWidth: number[];
}

/**
 * Template configuration options
 */
export type TemplateType = 1 | 2 | 3 | 4 | 5;
type ResumeType = 'fresher' | 'pro' | 'expert';
/**
 * Props for RightBlockHeading component
 */
interface RightBlockHeadingProps {
  /** Scaling factor for responsive sizing */
  fac: number;
  /** Template variation to render (1-5) */
  template: TemplateType;
  /** Component data object */
  props: RightBlockHeadingData;
  /** Background/theme color */
  bg: string;
  /** Font color (used in template 3, defaults to bg for others) */
  font?: string;
  /** Font family (defaults to 'Calibri') */
  fontFamily?: string;
  /** Element ID */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  resumeType: ResumeType;
}

/**
 * Template configuration mapping
 */
const TEMPLATE_CONFIGS = {
  1: { width: 100, left: 30, textAlign: 'center' as const, hasLine: false, useTextWidth: false, colorSource: 'bg' as const },
  2: { width: 66, left: 20, textAlign: 'left' as const, hasLine: true, useTextWidth: true, colorSource: 'bg' as const },
  3: { width: 66, left: 20, textAlign: 'left' as const, hasLine: false, useTextWidth: true, colorSource: 'font' as const },
  4: { width: 90, left: 20, textAlign: 'left' as const, hasLine: false, useTextWidth: false, colorSource: 'bg' as const },
  5: { width: 90, left: 6, textAlign: 'left' as const, hasLine: false, useTextWidth: false, colorSource: 'bg' as const },
} as const;

/**
 * RightBlockHeading - A responsive heading component for resume templates
 * 
 * Supports 5 different template variations with configurable styling,
 * positioning, and optional line decorations. Templates 2 & 3 support
 * dynamic width calculation based on text content.
 * 
 * @param props - Component props
 * @returns JSX.Element
 */
const RightBlockHeading: React.FC<RightBlockHeadingProps> = ({
  fac,
  template,
  props: componentProps,
  bg,
  font,
  fontFamily = 'Calibri',
  id,
  className
}) => {
  // Get template configuration
  const config = TEMPLATE_CONFIGS[template];
  
  // Memoized calculations for performance
  const calculations = useMemo(() => {
    const baseHeight = fac * componentProps.height;
    const baseWidth = fac * config.width;
    const baseLeft = fac * config.left;
    const baseTop = fac * componentProps.top;
    const fontSize = fac * 6;
    
    let finalWidth = baseWidth;
    let lineProps = null;
    
    // Handle text width calculation for templates 2 & 3
    if (config.useTextWidth && textWidth) {
      try {
        const textWidthResult = textWidth('calibri', 'bold', '6pt', 'auto', componentProps.name);
        if (textWidthResult && Array.isArray(textWidthResult) && textWidthResult.length >= 2) {
          finalWidth = fac * textWidthResult[1];
          
          // Calculate line properties for template 2
          if (config.hasLine) {
            lineProps = {
              width: fac * (100 - textWidthResult[1]),
              left: fac * (5 + textWidthResult[1]),
              top: fac * ((componentProps.height / 2) - 0),
              height: fac * 1
            };
          }
        }
      } catch (error) {
        console.warn('TextWidth calculation failed, using default width:', error);
      }
    }
    
    return {
      height: baseHeight,
      width: finalWidth,
      left: baseLeft,
      top: baseTop,
      fontSize,
      lineProps
    };
  }, [fac, componentProps.height, componentProps.top, componentProps.name, config, textWidth]);
  
  // Determine color source
  const textColor = config.colorSource === 'font' ? (font || bg) : bg;
  
  // Main container styles
  const containerStyles: React.CSSProperties = {
    height: `${calculations.height}px`,
    width: `${calculations.width}px`,
    color: textColor,
    lineHeight: `${calculations.height}px`,
    position: 'absolute',
    top: `${calculations.top}px`,
    left: `${calculations.left}px`,
    fontFamily,
    fontSize: `${calculations.fontSize}pt`,
    textAlign: config.textAlign,
    fontWeight: 'bold'
  };
  
  // Line element styles for template 2
  const lineStyles: React.CSSProperties | undefined = calculations.lineProps ? {
    position: 'absolute',
    top: `${calculations.lineProps.top}px`,
    left: `${calculations.lineProps.left}px`,
    width: `${calculations.lineProps.width}px`,
    margin: '0',
    backgroundColor: bg,
    height: `${calculations.lineProps.height}px`
  } : undefined;
  
  return (
    <div 
      id={id} 
      className={className}
      style={containerStyles}
    >
      {componentProps.name}
      {config.hasLine && lineStyles && (
        <hr style={lineStyles} />
      )}
    </div>
  );
};

export default RightBlockHeading;
