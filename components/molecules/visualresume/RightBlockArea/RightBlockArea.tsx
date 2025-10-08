import React, { useMemo } from 'react';
import { IconContext } from 'react-icons';
import { IconType } from 'react-icons';
/**
 * Props for nested logo and positioning data
 */
interface RightBlockAreaData {
  /** FontAwesome icon className (e.g., 'fa fa-user') */
  logo: IconType;
  /** Display name text */
  name: string;
  /** Left positioning multiplier */
  left: number;
  /** Top positioning multiplier */
  top: number;
}

/**
 * Configuration for template-specific styling
 */
interface TemplateConfig {
  /** Icon size multiplier */
  iconSizeMultiplier: number;
  /** Text color source */
  textColorSource: 'font' | 'bg';
  /** Icon color source */
  iconColorSource: 'white' | 'bg';
  /** Whether to show background circle */
  showBackgroundCircle: boolean;
}

/**
 * Props for the RightBlockArea component
 */
export interface RightBlockAreaProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Template variant (1-4 = standard, 5 = minimalist) */
  template?: 1 | 2 | 3 | 4 | 5;
  /** Background/theme color */
  bg: string;
  /** Font color */
  font: string;
  /** Font family (optional) */
  fontFamily?: string;
  /** Element ID (optional) */
  id?: string;
  /** Additional CSS classes (optional) */
  className?: string;
  /** Logo and positioning data */
  props: RightBlockAreaData;
}

/**
 * Template configurations mapping
 */
const TEMPLATE_CONFIGS: Record<number, TemplateConfig> = {
  1: {
    iconSizeMultiplier: 3.2,
    textColorSource: 'font',
    iconColorSource: 'white',
    showBackgroundCircle: true,
  },
  2: {
    iconSizeMultiplier: 3.2,
    textColorSource: 'font',
    iconColorSource: 'white',
    showBackgroundCircle: true,
  },
  3: {
    iconSizeMultiplier: 3.2,
    textColorSource: 'font',
    iconColorSource: 'white',
    showBackgroundCircle: true,
  },
  4: {
    iconSizeMultiplier: 3.2,
    textColorSource: 'font',
    iconColorSource: 'white',
    showBackgroundCircle: true,
  },
  5: {
    iconSizeMultiplier: 4,
    textColorSource: 'bg',
    iconColorSource: 'bg',
    showBackgroundCircle: false,
  },
};

/**
 * Calculates all dimensional and positioning values
 * @param fac - Scaling factor
 * @param left - Left positioning multiplier
 * @param top - Top positioning multiplier
 * @param config - Template configuration
 */
const calculateDimensions = (
  fac: number,
  left: number,
  top: number,
  config: TemplateConfig
) => ({
  // Icon dimensions
  iconHeight: `${fac * 8}px`,
  iconWidth: `${fac * 8}px`,
  
  // Container dimensions
  containerHeight: `${fac * 15}px`,
  containerWidth: `${fac * 32}px`,
  
  // Positioning
  containerLeft: `${fac * left}px`,
  containerTop: `${fac * top}px`,
  iconLeft: `${fac * 11}px`,
  textTop: `${fac * 11}px`,
  
  // Typography
  iconSize: `${fac * config.iconSizeMultiplier}pt`,
  textSize: `${fac * 2}pt`,
  iconLineHeight: `${fac * 8}px`,
});

/**
 * RightBlockArea - Consolidated logo block component with template variations
 * 
 * Renders a positioned logo block with scalable dimensions, supporting both
 * standard (templates 1-4) and minimalist (template 5) design patterns.
 * 
 * @param props - Component props
 * @returns JSX element representing the logo block
 */
const RightBlockArea: React.FC<RightBlockAreaProps> = ({
  fac,
  template = 1,
  bg,
  font,
  fontFamily,
  id,
  className,
  props: logoData,
}) => {
  // Get template configuration
  const config = TEMPLATE_CONFIGS[template] || TEMPLATE_CONFIGS[1];
  
  // Memoize dimensional calculations for performance
  const dimensions = useMemo(
    () => calculateDimensions(fac, logoData.left, logoData.top, config),
    [fac, logoData.left, logoData.top, config]
  );
  
  // Determine colors based on template configuration
  const textColor = config.textColorSource === 'font' ? font : bg;
  const iconColor = config.iconColorSource === 'white' ? 'white' : bg;
  const Icon = logoData.logo;
  // Container styles
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    top: dimensions.containerTop,
    left: dimensions.containerLeft,
    textAlign: 'center',
    fontSize: dimensions.textSize,
    color: textColor,
    height: dimensions.containerHeight,
    width: dimensions.containerWidth,
    fontFamily,
  };
  
  // Icon container styles
  const iconContainerStyle: React.CSSProperties = {
    position: 'absolute',
    left: dimensions.iconLeft,
    textAlign: 'center',
    zIndex: 2,
    borderRadius: '50%',
    backgroundColor: bg,
   height: `${fac*8}px`,
   width: `${fac*8}px`,
   fontSize: `${fac*3.2}pt`
  };
  
  // Icon styles
  const iconStyle: React.CSSProperties = {
    height: dimensions.iconHeight,
    width: dimensions.iconWidth,
    color: 'white',
    lineHeight: dimensions.iconLineHeight,
    fontSize: dimensions.iconSize,
    zIndex: 3,
    position: 'absolute',
    top: `${fac*1.5}px`,
    left: `${fac*1.5}px`,
  };
  
  // Text container styles
  const textContainerStyle: React.CSSProperties = {
    position: 'absolute',
    top: dimensions.textTop,
    width: '100%',
    textAlign: 'center',
    fontSize: `${fac*2.5}pt`
  };
  
  return (
    <div id={id} className={className} style={containerStyle}>
      <div style={iconContainerStyle} id = {`${id}-container`}>
        <div style={iconStyle}><Icon /></div>
      </div>
      <div style={textContainerStyle}>
        {logoData.name}
      </div>
    </div>
  );
};

export default RightBlockArea;
