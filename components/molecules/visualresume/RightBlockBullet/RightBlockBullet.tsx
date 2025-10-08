import React, { useMemo } from 'react';
import parse from 'html-react-parser';
import { FaStar, FaMinus } from 'react-icons/fa';

/**
 * Props structure for nested bullet configuration
 */
interface BulletProps {
  /** Height of the bullet container */
  height: number;
  /** HTML content to display */
  name: string;
  /** Top position offset */
  top: number;
  /** Line opacity (used in templates 2 & 3) */
  line?: number;
}

/**
 * Template configuration defining positioning and features
 */
interface TemplateConfig {
  /** Multiplier for bullet top position */
  bulletTopMultiplier: number;
  /** Multiplier for content left position */
  contentLeftMultiplier: number;
  /** Whether template includes vertical line */
  hasLine: boolean;
  /** Whether template includes icon */
  hasIcon: boolean;
  /** Icon type identifier */
  iconType?: 'star' | 'minus';
  /** Icon positioning configuration */
  iconPosition?: {
    leftMultiplier: number;
    topMultiplier: number;
  };
  /** Line positioning configuration */
  linePosition?: {
    topMultiplier: number;
    leftMultiplier: number;
  };
}

/**
 * Main component props interface
 */
interface RightBlockBulletProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Background color */
  bg: string;
  /** Font color */
  font: string;
  /** Font family */
  fontFamily: string;
  /** Component ID */
  id: string;
  /** Template variant (1-5) */
  template?: number;
  /** CSS class name */
  className?: string;
  /** Nested bullet configuration */
  props: BulletProps;
}

/**
 * RightBlockBullet - Consolidated bullet component supporting 5 template variations
 * 
 * @description Renders a styled bullet point with optional vertical line and icons.
 * Supports different positioning, icons (star/minus), and line configurations
 * based on the selected template variant.
 * 
 * @example
 * ```
 * <RightBlockBullet
 *   fac={1.2}
 *   template={3}
 *   bg="#007bff"
 *   font="#333333"
 *   fontFamily="Arial"
 *   id="bullet-1"
 *   props={{
 *     height: 40,
 *     name: "<strong>Bullet Content</strong>",
 *     top: 10,
 *     line: 0.8
 *   }}
 * />
 * ```
 */
const RightBlockBullet: React.FC<RightBlockBulletProps> = ({
  fac,
  bg,
  font,
  fontFamily,
  id,
  template = 1,
  className,
  props: bulletProps
}) => {
  /**
   * Template configurations with memoization for performance
   */
  const templateConfigs = useMemo((): Record<number, TemplateConfig> => ({
    1: {
      bulletTopMultiplier: 1.5,
      contentLeftMultiplier: 17,
      hasLine: false,
      hasIcon: false
    },
    2: {
      bulletTopMultiplier: 1.5,
      contentLeftMultiplier: 17,
      hasLine: true,
      hasIcon: false,
      linePosition: {
        topMultiplier: 6,
        leftMultiplier: -5
      }
    },
    3: {
      bulletTopMultiplier: 3,
      contentLeftMultiplier: 17,
      hasLine: true,
      hasIcon: true,
      iconType: 'star',
      iconPosition: {
        leftMultiplier: -17,
        topMultiplier: 1.8
      },
      linePosition: {
        topMultiplier: -0.5,
        leftMultiplier: -6
      }
    },
    4: {
      bulletTopMultiplier: 3,
      contentLeftMultiplier: 17,
      hasLine: false,
      hasIcon: true,
      iconType: 'star',
      iconPosition: {
        leftMultiplier: -17,
        topMultiplier: -0.5
      }
    },
    5: {
      bulletTopMultiplier: 3,
      contentLeftMultiplier: 8,
      hasLine: false,
      hasIcon: true,
      iconType: 'minus',
      iconPosition: {
        leftMultiplier: -18,
        topMultiplier: 1.5
      }
    }
  }), []);

  /**
   * Memoized calculations for performance optimization
   */
  const calculations = useMemo(() => {
    const config = templateConfigs[template] || templateConfigs[1];
    
    return {
      // Base dimensions
      height: `${fac * bulletProps.height}px`,
      width: `${fac * 113}px`,
      fontSize: `${fac * 3.2}pt`,
      left: `${fac * config.contentLeftMultiplier}px`,
      top: `${fac * bulletProps.top}px`,
      
      // Bullet positioning
      bulletTop: `${fac * config.bulletTopMultiplier}px`,
      bulletHeight: `${fac * 2}px`,
      bulletLeft: `${fac * -5.5}px`,
      
      // Line calculations
      lineHeight: config.hasLine ? `${fac * (bulletProps.height - 4)}px` : '0px',
      lineWidth: config.hasLine ? `${fac * 0.5}px` : '0px',
      lineTop: config.linePosition ? `${fac * config.linePosition.topMultiplier}px` : '0px',
      lineLeft: config.linePosition ? `${fac * config.linePosition.leftMultiplier}px` : '0px',
      
      // Icon positioning
      iconLeft: config.iconPosition ? `${fac * config.iconPosition.leftMultiplier}px` : '0px',
      iconTop: config.iconPosition ? `${fac * config.iconPosition.topMultiplier}px` : '0px',
      iconSize: template === 5 ? `${fac * 1}pt` : `${fac * 4}pt`,
      
      config
    };
  }, [fac, bulletProps, template, templateConfigs]);

  /**
   * Icon renderer with React Icons integration
   */
  const renderIcon = useMemo(() => {
    if (!calculations.config.hasIcon || !calculations.config.iconType) return null;

    const iconStyle: React.CSSProperties = {
      position: 'absolute',
      left: calculations.iconLeft,
      top: calculations.iconTop,
      color: template === 5 ? bg : font,
      fontSize: calculations.iconSize
    };

    switch (calculations.config.iconType) {
      case 'star':
        return <FaStar style={iconStyle} />;
      case 'minus':
        return <FaMinus style={iconStyle} />;
      default:
        return null;
    }
  }, [calculations, template, bg, font]);

  /**
   * Line renderer with conditional visibility
   */
  const renderLine = useMemo(() => {
    if (!calculations.config.hasLine) return null;

    return (
      <div
        style={{
          position: 'absolute',
          top: calculations.lineTop,
          left: calculations.lineLeft,
          height: calculations.lineHeight,
          width: calculations.lineWidth,
          backgroundColor: bg,
          opacity: bulletProps.line || 1
        }}
      />
    );
  }, [calculations, bg, bulletProps.line]);

  /**
   * Secure HTML content parsing
   */
  const parsedContent = useMemo(() => {
    try {
      return parse(bulletProps.name || '');
    } catch (error) {
      console.warn('Failed to parse HTML content:', error);
      return bulletProps.name || '';
    }
  }, [bulletProps.name]);

  return (
    <div className={className}>
      <div
        style={{
          position: 'absolute',
          left: calculations.left,
          top: calculations.top,
          height: calculations.height,
          width: calculations.width,
          backgroundColor: 'transparent',
          fontSize: calculations.fontSize,
          color: font,
          fontFamily
        }}
        id={id}
      >
        {/* Bullet circle */}
        <div
          style={{
            position: 'absolute',
            left: calculations.bulletLeft,
            top: calculations.bulletTop,
            width: calculations.bulletHeight,
            height: calculations.bulletHeight,
            backgroundColor: bg,
            borderRadius: '50px'
          }}
        />
        
        {/* Optional vertical line */}
        {renderLine}
        
        {/* Optional icon */}
        {renderIcon}
        
        {/* Content */}
        {parsedContent}
      </div>
    </div>
  );
};

export default RightBlockBullet;
