import React, { useMemo } from 'react';
import { IconContext } from 'react-icons';

/**
 * Props interface for LeftBlockHeading component
 */
export interface LeftBlockHeadingProps {
  /** Scaling factor for responsive design */
  fac: number;
  /** Background/border color */
  bg: string;
  /** Text color */
  font: string;
  /** Font family for the heading text */
  fontFamily?: string;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS class names */
  className?: string;
  /** Template variant (1-5) */
  template?: 1 | 2 | 3 | 4 | 5;
  /** Nested props containing component-specific data */
  props: {
    /** Height multiplier for the component */
    height: number;
    /** Heading text content */
    name: string;
    /** Top position offset multiplier */
    top: number;
    /** Optional React icon component - undefined when not needed */
    icon?: React.ComponentType<any>;
  };
  resumeType?: 'fresher' | 'pro' | 'expert';
}

/**
 * Template configuration interface
 */
interface TemplateConfig {
  widthMultiplier: number;
  leftMultiplier: number;
  lineHeightType: 'height' | 'fixed';
  hasIcon: boolean;
  iconPosition: 'before' | 'after';
  textAlign?: 'right' | 'justify' | 'left' | 'center';
}

/**
 * LeftBlockHeading - Consolidated component supporting 5 template variations
 * 
 * Features:
 * - Responsive scaling with fac multiplier
 * - Template-specific positioning and styling
 * - Optional React Icons integration
 * - TypeScript-safe prop handling
 * - Performance optimized with useMemo
 * 
 * @param props - LeftBlockHeadingProps
 * @returns JSX.Element
 */
const LeftBlockHeading: React.FC<LeftBlockHeadingProps> = ({
  fac,
  bg,
  font,
  fontFamily,
  id,
  className,
  template = 1,
  props: componentProps,
  resumeType
}) => {
  // Template configurations
  const templateConfigs: Record<number, TemplateConfig> = useMemo(() => ({
    1: { widthMultiplier: 76, leftMultiplier: 2, lineHeightType: 'height', hasIcon: false, iconPosition: 'after', textAlign: "center" },
    2: { widthMultiplier: 76, leftMultiplier: 0, lineHeightType: 'height', hasIcon: true, iconPosition: 'after' , textAlign: "center"},
    3: { widthMultiplier: 76, leftMultiplier: 0, lineHeightType: 'fixed', hasIcon: true, iconPosition: 'before' , textAlign: "center"},
    4: { widthMultiplier: 76, leftMultiplier: 4, lineHeightType: 'height', hasIcon: false, iconPosition: 'after' , textAlign: "left"},
    5: { widthMultiplier: 74, leftMultiplier: 6, lineHeightType: 'height', hasIcon: false, iconPosition: 'after' , textAlign: "left"}
  }), []);

  // Memoized calculations for performance
  const calculations = useMemo(() => {
    const config = templateConfigs[template];
    const height = `${fac * componentProps.height}px`;
    const width = `${fac * config.widthMultiplier}px`;
    const lineHeight = config.lineHeightType === 'height' 
      ? `${fac * componentProps.height}px` 
      : `${fac * 6}px`;
    const fontSize = `${fac * 6}pt`;
    const iconSize = `${fac * 3}pt`;
    const left = `${fac * config.leftMultiplier}px`;
    const top = `${fac * componentProps.top}px`;
    const textAlign = config.textAlign;

    // Template-specific positioning for icons and elements
    const positioning = {
      radius: `${fac * 1}px`,
      border: `${fac * 0.5}px`,
      left1: `${fac * 4}px`,
      marginL: `${-fac * 1.5}px`,
      marginT: `${fac * 1}px`,
      iconHeight: `${fac * componentProps.height * 0.8}px`,
      left2: template === 3 ? `${fac * 5}px` : `${fac * 5.5}px`,
      top2: template === 3 ? `${fac * 0}px` : `${fac * 1}px`
    };

    return {
      height,
      width,
      lineHeight,
      fontSize,
      iconSize,
      left,
      top,
      textAlign,
      ...positioning
    };
  }, [fac, template, componentProps.height, componentProps.top, templateConfigs]);

  // Get current template configuration
  const currentConfig = templateConfigs[template];
  const { name, icon: IconComponent } = componentProps;

  // Base container styles
  const containerStyles: React.CSSProperties = {
    fontSize: calculations.fontSize,
    color: (template === 5) ? bg : 'white',
    position: 'absolute',
    top: calculations.top,
    left: calculations.left,
    width: calculations.width,
    height: calculations.height,
    lineHeight: calculations.lineHeight,
    fontFamily: fontFamily,
    textAlign: calculations.textAlign,
    fontWeight: 'bold'

  };

  // Heading text styles
  const headingStyles: React.CSSProperties = {
    fontFamily: fontFamily,
    fontSize: calculations.fontSize,
    color: font,
    fontWeight: 'bold'
  };

  // Line element styles
  const lineStyles: React.CSSProperties = {
    borderLeft: `${calculations.lineHeight} solid ${bg}`,
    height: calculations.lineHeight,
    display: 'block'
  };

  // Icon container styles (for templates 2 and 3)
  const iconContainerStyles = (): React.CSSProperties => {
  if (template === 2) {
    return {
      width: calculations.iconHeight,
      height: calculations.iconHeight,
      borderRadius: `${fac * 1}px`,
      border: `${fac * 0.5}px solid white`,
      fontSize: calculations.iconSize,
      position: 'absolute',
      marginLeft: `${fac * 4}px`,
      marginTop: `${fac * 1}px`,
      backgroundColor: bg
    };
  } else if (template === 3) {
    return {
      width: calculations.iconHeight,
      height: calculations.iconHeight,
      borderRadius: '50%',
      fontSize: calculations.iconSize,
      position: 'absolute',
      marginLeft: `${fac * 5}px`,
      marginTop: `${fac * 0}px`,
      backgroundColor: bg
    };
  } else {
    return {
      width: calculations.iconHeight,
      height: calculations.iconHeight,
      color: bg,
      borderRadius: calculations.radius,
      border: `${calculations.border} solid ${bg}`,
      fontSize: calculations.iconSize,
      position: 'relative',
      marginLeft: calculations.marginL,
      marginTop: calculations.marginT,
      backgroundColor: bg
    };
  }
};


  // Icon styles
  const iconStyles = (): React.CSSProperties => {
    if (template == 2){
      return {
        position: 'absolute',
        fontSize: `${fac * 3}pt`,
        color: 'white',
        left : `${fac * 1}px`,
        top: `${fac * 1}px`
    }
    }else if(template == 3){
      return {
        position: 'absolute',
        fontSize: `${fac * 3}pt`,
        color: 'white',
        left : `${fac * 1}px`,
        top: `${fac * 1}px`
      }
    }else {
      return { 
        position: 'absolute',
        fontSize: `${fac * 3}pt`,
        color: 'white',
        left : `${fac * 1}px`,
        top: `${fac * 1}px`
      }
    }
  
  };

  const headingStylesWithIcon = (): React.CSSProperties => {
    if (template == 2){
      return {
        position: 'absolute',
        color: 'white',
        left : `${fac * 15}px`,
        top: `${fac * 0}px`
    }
    }else if(template == 3){
      return {
        position: 'absolute',
        color: font,
        left : `${fac * 15}px`,
        top: `${fac * 1}px`
      }
    }else {
      return { 
        position: 'absolute',
        fontSize: `${fac * 3}pt`,
        color: 'white',
        left : `${fac * 1}px`,
        top: `${fac * 1}px`
      }
    }
  
  };

  // Template-specific positioning styles
  const getPositionedStyles = (baseStyles: React.CSSProperties, leftOffset: string, topOffset: string = '0px') => ({
    ...baseStyles,
    position: 'relative' as const,
    left: leftOffset,
    top: topOffset
  });

  // Render icon component if present and template supports it
  const renderIcon = () => {
    if (!IconComponent || !currentConfig.hasIcon) return null;

    return (
      <div style={iconContainerStyles()} id = {`${id}-icon-container`}>
        <div id = {`${id}-icon`} style = {iconStyles()}>
          <IconComponent />
        </div>
      </div>
    );
  };



  // Template-specific rendering logic
  const renderContent = () => {
    switch (template) {
      case 1:
      case 4:
      case 5:
        // Simple templates: line + heading
        return (
          <>
            {name}
          </>
        );

      case 2:
        // Template 2: line (positioned) + heading (positioned) + icon
        return (
          <>
            {renderIcon()}
            <div id = {`${id}-heading`}
            style = {headingStylesWithIcon()}
            >
              {name}
            </div>
          </>
        );

      case 3:
        // Template 3: icon + line (positioned) + heading (positioned)
        return (
          <>
            {renderIcon()}
            <div id = {`${id}-heading`}
            style = {headingStylesWithIcon()}
            >
              {name}
            </div>
          </>
        );

      default:
        return renderContent(); // Fallback to template 1
    }
  };

  return (
    <div 
      style={containerStyles}
      id={id}
      className={className}
    >
      {renderContent()}
    </div>
  );
};

export default LeftBlockHeading;
