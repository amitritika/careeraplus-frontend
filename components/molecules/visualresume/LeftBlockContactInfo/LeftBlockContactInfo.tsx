import React, { useMemo } from 'react';
import { IconContext } from 'react-icons';
import { IconType } from 'react-icons/lib';

/**
 * Template configuration type for LeftBlockContactInfo component
 */
export type TemplateType = 1 | 2 | 3 | 4 | 5;

/**
 * Props interface for the nested props object
 */
export interface LeftBlockContactInfoData {
  /** Contact information text to display */
  name: string;
  /** React icon component or icon identifier */
  icon: IconType;
  /** Top position offset */
  top: number;
  /** Height value (used in templates 2, 3, 4, 5) */
  height: number;
}

/**
 * Main props interface for LeftBlockContactInfo component
 */
export interface LeftBlockContactInfoProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Background color */
  bg?: string;
  /** Font color */
  font?: string;
  /** Font family */
  fontFamily?: string;
  /** Component ID */
  id?: string;
  /** CSS class name */
  className?: string;
  /** Template variant to use */
  template: TemplateType;
  /** Contact information data */
  props: LeftBlockContactInfoData;

  resumeType?: 'fresher' | 'pro' | 'expert';

}

/**
 * Base template configuration interface
 */
interface BaseTemplateConfig {
  textWidth: number;
  textHeight: number | 'dynamic';
  textLine: number | 'dynamic';
  hasContainer: boolean;
  hasBorder: boolean;
  borderWidth: number;
  radiusWidth: number;
  useIconClass: boolean;
  containerWidth: number;
  heightCalculation: 'fixed' | 'props';
  heightMultiplier?: number;
  baseHeight?: number;
  usesCircularBackground?: boolean;
  usesBackgroundColor?: boolean;
  textTop: number;
  textLeft: number;
}

/**
 * Template configuration object defining styling and layout differences
 */
const TEMPLATE_CONFIG: Record<TemplateType, BaseTemplateConfig> = {
  1: {
    textWidth: 62,
    textHeight: 5,
    textLine: 5,
    hasContainer: false,
    hasBorder: false,
    borderWidth: 0,
    radiusWidth: 0,
    useIconClass: false,
    containerWidth: 80,
    heightCalculation: 'fixed',
    heightMultiplier: undefined,
    baseHeight: undefined,
    usesCircularBackground: false,
    usesBackgroundColor: false,
    textLeft: 15,
    textTop: 0,
  },
  2: {
    textWidth: 44,
    textHeight: 'dynamic',
    textLine: 5,
    hasContainer: true,
    hasBorder: true,
    borderWidth: 0.25,
    radiusWidth: 1,
    useIconClass: false,
    containerWidth: 80,
    heightCalculation: 'props',
    heightMultiplier: 0.95,
    baseHeight: 5,
    usesCircularBackground: false,
    usesBackgroundColor: false,
    textLeft: 15,
    textTop: -0.5,
  },
  3: {
    textWidth: 44,
    textHeight: 'dynamic',
    textLine: 5,
    hasContainer: true,
    hasBorder: true,
    borderWidth: 0.5,
    radiusWidth: 1,
    useIconClass: true,
    containerWidth: 80,
    heightCalculation: 'props',
    heightMultiplier: undefined,
    baseHeight: undefined,
    usesCircularBackground: true,
    usesBackgroundColor: false,
    textLeft: 15,
    textTop: -0.5,
  },
  4: {
    textWidth: 44,
    textHeight: 'dynamic',
    textLine: 5,
    hasContainer: false,
    hasBorder: false,
    borderWidth: 0,
    radiusWidth: 0,
    useIconClass: true,
    containerWidth: 80,
    heightCalculation: 'props',
    heightMultiplier: undefined,
    baseHeight: undefined,
    usesCircularBackground: false,
    usesBackgroundColor: false,
    textLeft: 15,
    textTop: 0,
  },
  5: {
    textWidth: 62,
    textHeight: 'dynamic',
    textLine: 5,
    hasContainer: false,
    hasBorder: false,
    borderWidth: 0,
    radiusWidth: 0,
    useIconClass: true,
    containerWidth: 80,
    heightCalculation: 'props',
    heightMultiplier: undefined,
    baseHeight: undefined,
    usesCircularBackground: false,
    usesBackgroundColor: true,
    textLeft: 15,
    textTop: 0,
  },
} as const;

/**
 * Helper function to calculate template-specific dimensions
 */
const calculateDimensions = (
  fac: number,
  template: TemplateType,
  height?: number
) => {
  const config = TEMPLATE_CONFIG[template];
  
  const baseHeight = template === 1 ? 5 : height || 5;
  
  return {
    textWidth: fac * config.textWidth,
    textHeight: config.textHeight === 'dynamic' ? fac * baseHeight : fac * (config.textHeight as number),
    textLine: config.textLine === 'dynamic' ? fac * baseHeight : fac * (config.textLine as number),
    containerWidth: config.hasContainer ? fac * config.containerWidth : 0,
    containerHeight: config.hasContainer ? fac * baseHeight : 0,
    radius: fac * config.radiusWidth,
    border: fac * config.borderWidth,
    heightI: template === 2 && config.heightMultiplier && config.baseHeight
      ? fac * config.baseHeight * config.heightMultiplier
      : fac * baseHeight,
  };
};

/**
 * Helper function to calculate shared positioning values
 */
const calculatePositions = (fac: number, top: number) => ({
  left: fac * 0,
  top: fac * top,
  textLeft: fac * 15,
  textFont: fac * 3.2,
  iconLeft: fac * 6,
  iconFont: fac * 3.2,
  left1: fac * 7,
  left2: fac * 8,
  left3: fac * 15,
  top1: fac * -0.5,
  top2: fac * 0.5,
  size1: fac * 2,
  marginT: fac * 0.5,
});

/**
 * LeftBlockContactInfo - A contact information display component with multiple template variations
 * 
 * This component renders contact information with an icon and text in various layouts depending
 * on the selected template. Templates differ in dimensions, styling, and background treatments.
 * 
 * @param props - The component props
 * @returns JSX element representing the contact info block
 */
const LeftBlockContactInfo: React.FC<LeftBlockContactInfoProps> = ({
  fac,
  bg = '#000000',
  font = '#ffffff',
  fontFamily = 'Calibri',
  id,
  className,
  template,
  props: contactProps,
}) => {
  const config = TEMPLATE_CONFIG[template];
  
  // Memoize calculations for performance
  const dimensions = useMemo(
    () => calculateDimensions(fac, template, contactProps.height),
    [fac, template, contactProps.height]
  );
  
  const positions = useMemo(
    () => calculatePositions(fac, contactProps.top),
    [fac, contactProps.top]
  );
  
  // Memoize styles to prevent unnecessary re-renders
  const mainStyle = useMemo(() => ({
    height: `${contactProps.height * fac}px`,
    width: `${config.containerWidth * fac}px`,
    color: (template === 3 || template === 5) ? ((template === 5) ? bg : font) : 'white',
    position: 'absolute' as const,
    top: `${contactProps.top  * fac}px`,
    left: `${positions.left}px`,
    fontFamily: fontFamily,
    textAlign: 'center' as const,
    fontWeight: 'bold' as const,
    fontSize: `${3.2  * fac}pt`,
  }), [dimensions, positions, config.hasContainer, fontFamily]);
  
  const iconContextColor = useMemo(() => {
    if (template === 5) return bg;
    if (template === 3 && config.usesCircularBackground) return 'white';
    return 'white';
  }, [template, bg, config.usesCircularBackground]);
  
  const textColor = useMemo(() => {
    if (template === 3) return font;
    if (template === 5) return bg;
    return 'white';
  }, [template, font, bg]);
  
  const textStyle = useMemo(() => ({
    width: `${config.textWidth* fac}px`,
    position: 'absolute' as const,
    left: `${config.textLeft* fac}px`,
    top: `${config.textTop* fac}px`,
    fontFamily: fontFamily,
    textAlign: 'left' as const,
    fontWeight: 'bold' as const,
  }), [dimensions, positions, textColor, fontFamily]);
  
  const iconStyle = useMemo(() => ({
    position: 'absolute' as const,
    left: `${positions.iconLeft}px`,
    fontSize: `${positions.iconFont}pt`,
    lineHeight: `${dimensions.textLine}px`,
  }), [positions, dimensions]);

  // Render container background for templates 2 and 3
  const renderBackgroundContainer = () => {
    if (!config.hasContainer) return null;
    
    if (template === 2) {
      return (
        <div
          style={{
            height: `${dimensions.heightI}px`,
            width: `${dimensions.heightI}px`,
            position: 'absolute',
            border: `${dimensions.border}px solid white`,
            transform: 'rotate(0deg)',
            borderRadius: `${dimensions.radius}px`,
            left: `${positions.left1}px`,
          }}
        />
      );
    }
    
    if (template === 3 && config.usesCircularBackground) {
      return (
        <div
          className="template2-icon-heading"
          style={{
            height: `${dimensions.heightI}px`,
            width: `${dimensions.heightI}px`,
            position: 'absolute',
            lineHeight: `${dimensions.heightI}px`,
            textAlign: 'center',
            color: 'white',
            fontSize: `${positions.size1}pt`,
            top: `${positions.top2}px`,
            left: `${positions.left2}px`,
            borderRadius: '50%',
            backgroundColor: bg,
          }}
        >
          <IconContext.Provider value={{ color: 'white' }}>
            <contactProps.icon />
          </IconContext.Provider>
        </div>
      );
    }
    
    return null;
  };
  
  // Render icon for templates that don't use the circular background approach
  const renderIcon = () => {
    if(template == 2 || template == 3){
        return (
          <div style = {iconContainerStyles()} id = {`${id}-icon-container`}>
            <div style = {iconStyles()} id = {`${id}-icon`}>
              <contactProps.icon />
            </div>
          </div>
    )
    }
    else{
        return (
      <div style = {iconStyles()} id = {`${id}-icon`}>
              <contactProps.icon />
            </div>
    )
    }
  };

const iconStyles = (): React.CSSProperties => {
  if (template === 1) {
    return {
      fontSize: `${fac *3.2}pt`,
      position: 'absolute',
      lineHeight: `${contactProps.height*fac}px`,
      left: `${fac * 6}px`,
      top: `${fac * 0}px`,
      color: 'white'
    };
  } else if (template === 2) {
    return {
      fontSize: `${fac *2}pt`,
      position: 'absolute',
      left: `${fac * 0.5}px`,
      top: `${fac * 0.5}px`,
      color: 'white'
    };
  } else if (template === 3) {
    return {
      fontSize: `${fac *2}pt`,
      position: 'absolute',
      left: `${fac * 0.5}px`,
      top: `${fac * 0.5}px`,
      color: 'white'
    };
    
  }else if (template === 4) {
    return {
      fontSize: `${fac *3.2}pt`,
      position: 'absolute',
      lineHeight: `${contactProps.height*fac}px`,
      left: `${fac * 6}px`,
      top: `${fac * 0}px`,
      color: 'white'
    };
}else{
  return {
      fontSize: `${fac *3.2}pt`,
      position: 'absolute',
      lineHeight: `${contactProps.height*fac}px`,
      left: `${fac * 6}px`,
      top: `${fac * 0}px`,
      color: bg
    };
}
}
const iconContainerStyles = (): React.CSSProperties => {
  if (template === 2) {
    return {
      width: `${contactProps.height *fac *0.95}px`,
      height: `${contactProps.height *fac *0.95}px`,
      borderRadius: `${fac * 0.5}px`,
      border: `${fac * 0.25}px solid white`,
      fontSize: `${fac *2}pt`,
      position: 'absolute',
      left: `${fac * 7}px`,
      top: `${fac * 0}px`,
      backgroundColor: bg
    };
  } else if (template === 3) {
    return {
      width: `${contactProps.height *fac *0.95}px`,
      height: `${contactProps.height *fac *0.95}px`,
      borderRadius: '50%',
      fontSize: `${fac *2}pt`,
      position: 'absolute',
      left: `${fac * 8}px`,
      top: `${fac * 0}px`,
      backgroundColor: bg
    };
  } else {
    return {
      width: `${contactProps.height *fac *0.95}px`,
      height: `${contactProps.height *fac *0.95}px`,
      borderRadius: `${fac * 0.5}px`,
      border: `${fac * 0.25}px solid white`,
      fontSize: `${fac *2}pt`,
      position: 'absolute',
      left: `${fac * 7}px`,
      top: `${fac * 0}px`,
      backgroundColor: bg
    };
  }
};

  return (
    <div id={id} className={className} style={mainStyle}>
      {renderIcon()}
      <div 
        style={
          textStyle
        }
      >
        {contactProps.name}
      </div>
    </div>
  );
};

export default LeftBlockContactInfo;
