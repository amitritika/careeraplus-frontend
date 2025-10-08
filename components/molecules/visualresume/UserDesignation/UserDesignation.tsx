import React, { useMemo } from 'react';

/**
 * Props interface for UserDesignation component data
 */
export interface UserDesignationData {
  /** Height multiplier for scaling */
  height: number;
  /** Display name text */
  name: string;
  /** Top position multiplier for scaling */
  top: number;
}

/**
 * Props interface for UserDesignation component
 */
export interface UserDesignationProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Component data containing height, name, and top position */
  props: UserDesignationData;
  /** Background color */
  bg?: string;
  /** Text color */
  font?: string;
  /** Font family */
  fontFamily?: string;
  /** HTML id attribute */
  id?: string;
  /** CSS class name */
  className?: string;
  /** Template variation (1-5) */
  template?: 1 | 2 | 3 | 4 | 5;
}

/**
 * Template configuration mapping
 */
const TEMPLATE_CONFIG = {
  1: { widthMultiplier: 105, leftMultiplier: 6 },
  2: { widthMultiplier: 105, leftMultiplier: 6 },
  3: { widthMultiplier: 105, leftMultiplier: 6 },
  4: { widthMultiplier: 125, leftMultiplier: 0 },
  5: { widthMultiplier: 125, leftMultiplier: 6 },
} as const;

/**
 * UserDesignation Component
 * 
 * A consolidated React component that renders user designation blocks
 * with configurable dimensions, positioning, and styling across 5 template variations.
 * 
 * Features:
 * - Template-based width and positioning configuration
 * - Scalable dimensions using factor-based calculations
 * - Absolute positioning with customizable styling
 * - TypeScript support with comprehensive interfaces
 * - Performance optimizations with memoized calculations
 * 
 * @param props - Component properties
 * @returns JSX.Element
 */
export const UserDesignation: React.FC<UserDesignationProps> = ({
  fac,
  props: componentProps,
  bg = '#ffffff',
  font = '#000000',
  fontFamily = 'Arial, sans-serif',
  id,
  className,
  template = 1,
}) => {
  // Memoized template configuration
  const templateConfig = useMemo(() => 
    TEMPLATE_CONFIG[template] || TEMPLATE_CONFIG[1], 
    [template]
  );

  // Memoized style calculations
  const containerStyle = useMemo(() => ({
    position: 'absolute' as const,
    height: `${fac * componentProps.height}px`,
    width: `${fac * templateConfig.widthMultiplier}px`,
    color:  template == 4? 'white' : bg,
    left: `${fac * templateConfig.leftMultiplier}px`,
    top: `${fac * componentProps.top}px`,
    fontWeight: 'bold' as const,
    fontSize: `${fac * 6}pt`,
    textAlign: 'left' as const,
    lineHeight: `${fac * componentProps.height}px`
  }), [fac, componentProps.height, componentProps.top, templateConfig, bg]);

  const textStyle = useMemo(() => ({
    position: 'absolute' as const,
    left: '5px',
    top: '0px',
    fontSize: `${fac * 6}pt`,
    fontWeight: 'bold' as const,
    fontFamily: fontFamily,
    color: font,
    width: '100%',
    textAlign: 'left' as const,
  }), [fac, fontFamily, font]);

  return (
    <div id={id} className={className} style={containerStyle}>
        {componentProps.name}
    </div>
  );
};

export default UserDesignation;
