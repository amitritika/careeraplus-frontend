import React, { useMemo } from 'react';
import { textWidth } from '@/lib/visualresume/common';
/**
 * Props interface for nested data structure
 */
interface UserNameData {
  /** User's full name to display */
  name: string;
  /** Component height in base units */
  height: number;
  /** Top position offset in base units */
  top: number;
}

/**
 * Main component props interface
 */
interface UserNameProps {
  /** Scaling factor for responsive sizing */
  fac: number;
  /** Background color in RGB format */
  bg: string;
  /** Font color */
  font: string;
  /** Font family specification */
  fontFamily?: string;
  /** Component identifier */
  id?: string;
  /** CSS class name */
  className?: string;
  /** Template variant (1-5) */
  template: 1 | 2 | 3 | 4 | 5;
  /** User data configuration */
  props: UserNameData;
  /** Resume type */
  resumeType: 'fresher' | 'pro' | 'expert';
}

/**
 * Template configuration interface
 */
interface TemplateConfig {
  width: number;
  leftOffset: number;
  textWidthLimit: number;
  hasNameSplit: boolean;
  hasLineElement: boolean;
  hasBackgroundBlock: boolean;
  hasBorder: boolean;
  fontColorFlip?: boolean;
  fontColorWhite?: boolean;
  backgroundColor?: string;
  textOffset: number;
  textTop: number;
}

/**
 * Mock textWidth function to simulate the external helper
 * In production, this would import from the actual helper

const textWidth = (fontFamily: string, fontWeight: string, fontSize: string, lineHeight: string, text: string): [number, number] => {
  // Mock implementation - returns [height, width]
  const avgCharWidth = parseFloat(fontSize) * 0.6;
  const calculatedWidth = text.length * avgCharWidth;
  return [parseFloat(fontSize), calculatedWidth];
};
 */
/**
 * Template configurations defining unique characteristics
 */
const TEMPLATE_CONFIGS: Record<number, TemplateConfig> = {
  1: {
    width: 120,
    leftOffset: 6,
    textWidthLimit: 120,
    textOffset: 0,
    textTop: 0,
    hasNameSplit: false,
    hasLineElement: false,
    hasBackgroundBlock: false,
    hasBorder: false,
    fontColorFlip: false,
    fontColorWhite: false,
  },
  2: {
    width: 120,
    leftOffset: 6,
    textWidthLimit: 120,
    textOffset: 0,
    textTop: 0,
    hasNameSplit: true,
    hasLineElement: true,
    hasBackgroundBlock: false,
    hasBorder: false,
    fontColorFlip: false,
    fontColorWhite: false,
  },
  3: {
    width: 120,
    leftOffset: 6,
    textWidthLimit: 120,
    textOffset: 0,
    textTop: 0,
    hasNameSplit: false,
    hasLineElement: false,
    hasBackgroundBlock: false,
    hasBorder: false,
    fontColorFlip: true,
    fontColorWhite: false,
  },
  4: {
    width: 210,
    leftOffset: -80,
    textWidthLimit: 140,
    textOffset: 80,
    textTop: 8,
    hasNameSplit: false,
    hasLineElement: false,
    hasBackgroundBlock: true,
    hasBorder: false,
    fontColorFlip: true,
    fontColorWhite: true,
  },
  5: {
    width: 120,
    leftOffset: 0,
    textWidthLimit: 140,
    textOffset: 6,
    textTop: 8,
    hasNameSplit: false,
    hasLineElement: false,
    hasBackgroundBlock: false,
    hasBorder: true,
    fontColorFlip: false,
    fontColorWhite: false,
  },
};

/**
 * UserName Component - Consolidated implementation supporting all template variations
 * 
 * This component renders user names with adaptive font sizing, responsive scaling,
 * and template-specific visual styling. It maintains pixel-perfect compatibility
 * with the original template implementations while providing a unified interface.
 * 
 * @param props - Component configuration and data
 * @returns JSX element with styled user name display
 */
const UserName: React.FC<UserNameProps> = ({
  fac,
  bg,
  font,
  fontFamily = 'calibri',
  id,
  className,
  template,
  resumeType,
  props: userData,
}) => {
  const config = TEMPLATE_CONFIGS[template];
  
  /**
   * Memoized calculations for performance optimization
   */
  const calculations = useMemo(() => {
    const baseHeight = fac * userData.height;
    const baseWidth = fac * config.width;
    const baseFontSize = 9.6;
    
    // Adaptive font sizing calculation
    let adjustedFontSize = baseFontSize;
    const nameToMeasure = userData.name;
    let textWidthResult = textWidth(fontFamily, 'bold', `${adjustedFontSize}pt`, 'auto', nameToMeasure);
    let calculatedWidth = textWidthResult[1];
    
    const decrementStep = 0.1;
    while (config.textWidthLimit < calculatedWidth) {
      adjustedFontSize -= decrementStep;
      textWidthResult = textWidth(fontFamily, 'bold', `${adjustedFontSize}pt`, 'auto', nameToMeasure);
      calculatedWidth = textWidthResult[1];
    }
    const calculatedTextHeight = textWidthResult[0];
    
    // Border color calculation for template 5
    let borderColorAlpha = bg;
    if (config.hasBorder) {
      borderColorAlpha = bg.replace('rgb(', 'rgba(').replace(')', ', 0.6)');
    }

    let fontColor = font;
    if (config.fontColorFlip) {
      fontColor = config.fontColorWhite ? 'white' : bg;
    }
    
    // Line positioning calculations for template 2
    const lineTopOffset = config.hasLineElement ? (userData.height / 2) : 0;
    const lineWidth = config.hasLineElement ? (118 - calculatedWidth) : 0;
    const lineLeft = config.hasLineElement ? (2 + calculatedWidth) : 0;
    return {
      height: `${baseHeight}px`,
      width: `${baseWidth}px`,
      fontSize: `${fac * adjustedFontSize}pt`,
      left: `${fac * config.leftOffset}px`,
      top: `${fac * userData.top}px`,
      borderColorAlpha, fontColor,
      // Background block dimensions
     // backgroundHeight: `${fac * 44}px`,
     /// backgroundLeft: `${fac * (template === 4 ? 80 : 6)}px`,
      //backgroundTop: `${fac * 8}px`,
      // Border thickness
      borderThickness: `${fac * 0.5}px`,
      // Line element dimensions
      lineTop: `${fac * lineTopOffset}px`,
      lineHeight: `${fac*1}px`,
      lineWidth: `${fac * lineWidth}px`,
      lineLeft: `${fac * lineLeft}px`,
      calculatedTextWidth: calculatedWidth,
      calculatedTextHeight,
      textOffset: `${fac * config.textOffset}px`,
      textTop: `${fac * config.textTop}px`,
    };
  }, [fac, userData, config, bg, template]);
  
  /**
   * Memoized name processing for split names
   */
  const processedName = useMemo(() => {
    if (config.hasNameSplit) {
      return userData.name.split(' ');
    }
    return userData.name;
  }, [userData.name, config.hasNameSplit]);
  
  /**
   * Main text container style
   */
  const backgroundBlockStyle: React.CSSProperties = {
    position: 'absolute',
    height: calculations.height,
    width: calculations.width,
    left: calculations.left,
    top: calculations.top,
    backgroundColor: config.hasBackgroundBlock ? bg : 'transparent',
    textAlign: 'left',
    color: calculations.fontColor,
    fontSize: calculations.fontSize,
    fontWeight: 'bold',
    fontFamily: fontFamily,
    lineHeight: calculations.height,
    borderBottom: config.hasBorder ? `${calculations.borderThickness} solid ${calculations.borderColorAlpha}` : 'none',
  };
  
  /**
   * Background block style for templates 4 and 5
   */
  const textBlockStyle: React.CSSProperties = {
    position: 'absolute',
    height: `${fac*calculations.calculatedTextHeight}px`,
    lineHeight: `${fac*calculations.calculatedTextHeight}px`,
    width: `${fac*calculations.calculatedTextWidth}px`,
    left: calculations.textOffset,
    top: calculations.textTop
  };
  
  /**
   * Line element style for template 2
   */
  const lineElementStyle: React.CSSProperties = {
    position: 'absolute',
    height: calculations.lineHeight,
    width: calculations.lineWidth,
    left: calculations.lineLeft,
    top: calculations.lineTop,
    backgroundColor: bg,
  };

  const colors = [bg, font, bg, font, bg];
  
  return (
        <div 
        style={backgroundBlockStyle} 
        id={id}>

      
      {/* Main text container */}
      <div 
        style={textBlockStyle}
        
        className={className}
      >
        {(config.hasNameSplit) ? (
          (processedName as string[]).map((namePart, index) => (
            <span key={index} style = {{color: colors[index]}}>{namePart} </span>
          ))
        ) : (processedName)}
        {/* Decorative line for template 2 */}
      {config.hasLineElement && (
        <div style={lineElementStyle} />
      )}
      </div>
      
      </div>
  );
};

export default UserName;
export type { UserNameProps, UserNameData };
