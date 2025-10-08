import React, { useMemo } from 'react';

/**
 * Template configuration enum for different border styles
 */
export enum RightBlockTemplate {
  TEMPLATE_1 = 'template1',
  TEMPLATE_2 = 'template2', 
  TEMPLATE_3 = 'template3',
  TEMPLATE_4 = 'template4',
  TEMPLATE_5 = 'template5'
}

/**
 * Props interface for nested component properties
 */
export interface RightBlockProps {
  /** Display name/text content */
  name: string;
  /** Component width multiplier */
  width: number;
  /** Left position multiplier */
  left: number;
  /** Top position multiplier */
  top: number;
}

/**
 * Main component props interface
 */
export interface RightBlockCompProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Nested component properties */
  props: RightBlockProps;
  /** Background color */
  bg?: string;
  /** Font/text color */
  font?: string;
  /** Font family */
  fontFamily?: string;
  /** Component ID */
  id?: string;
  /** Template variation */
  template?: RightBlockTemplate;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Template configuration mapping
 */
const TEMPLATE_CONFIG = {
  [RightBlockTemplate.TEMPLATE_1]: { 
    borderStyle: 'full', 
    requiresImport: false 
  },
  [RightBlockTemplate.TEMPLATE_2]: { 
    borderStyle: 'right', 
    requiresImport: true 
  },
  [RightBlockTemplate.TEMPLATE_3]: { 
    borderStyle: 'full', 
    requiresImport: true 
  },
  [RightBlockTemplate.TEMPLATE_4]: { 
    borderStyle: 'none', 
    requiresImport: false 
  },
  [RightBlockTemplate.TEMPLATE_5]: { 
    borderStyle: 'none', 
    requiresImport: false 
  }
} as const;

/**
 * RightBlockComp - A scalable, positioned block component with configurable borders
 * 
 * Supports 5 template variations with different border styles:
 * - Template 1 & 3: Full border around component
 * - Template 2: Right border only  
 * - Template 4 & 5: No border
 * 
 * @param props - Component configuration props
 * @returns JSX element representing the styled block
 */
const RightBlockComp: React.FC<RightBlockCompProps> = ({
  fac,
  props: componentProps,
  bg = 'transparent',
  font = '#000000',
  fontFamily = 'Arial, sans-serif',
  id,
  template = RightBlockTemplate.TEMPLATE_1,
  className
}) => {
  /**
   * Memoized style calculations for optimal performance
   */
  const calculatedStyles = useMemo(() => {
    const baseUnit = fac;
    return {
      height: `${baseUnit * 5}px`,
      width: `${baseUnit * componentProps.width}px`,
      lineHeight: `${baseUnit * 5}px`,
      fontSize: `${baseUnit * 3.2}pt`,
      left: `${baseUnit * componentProps.left}px`,
      top: `${baseUnit * componentProps.top}px`,
      borderWidth: `${baseUnit * 1}px`
    };
  }, [fac, componentProps.width, componentProps.left, componentProps.top]);

  /**
   * Generate border styles based on template configuration
   */
  const getBorderStyles = useMemo(() => {
    const config = TEMPLATE_CONFIG[template];
    const borderValue = `solid ${calculatedStyles.borderWidth} ${font}`;
    
    switch (config.borderStyle) {
      case 'full':
        return { border: borderValue };
      case 'right':
        return { borderRight: borderValue };
      case 'none':
      default:
        return {};
    }
  }, [template, calculatedStyles.borderWidth, font]);

  /**
   * Combined inline styles with performance optimization
   */
  const combinedStyles = useMemo(() => ({
    position: 'absolute' as const,
    top: calculatedStyles.top,
    left: calculatedStyles.left,
    height: calculatedStyles.height,
    width: calculatedStyles.width,
    color: font,
    fontSize: calculatedStyles.fontSize,
    fontFamily,
    backgroundColor: bg,
    lineHeight: calculatedStyles.lineHeight,
    cursor: 'move' as const,
    ...getBorderStyles
  }), [calculatedStyles, font, fontFamily, bg, getBorderStyles]);

  return (
    <div
      id={id}
      className={className}
      style={combinedStyles}
      data-template={template}
    >
      {componentProps.name}
    </div>
  );
};

export default RightBlockComp;
