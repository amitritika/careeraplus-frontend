import React, { useMemo } from 'react';
import { IconContext } from 'react-icons';
import { IconType } from 'react-icons';

/**
 * Template-specific configuration interface
 */
interface TemplateConfig {
  heightMultiplier: number;
  widthMultiplier: number;
  lineHeightMultiplier: number;
  topModifier: number;
  hasBackground: boolean;
  hasBorder: boolean;
  borderRadius: string;
  iconColor: 'white' | 'bg' | 'font';
  isVisible: boolean;
}

/**
 * Props structure for nested icon data
 */
interface IconProps {
  /** React icon component to render */
  name: IconType;
  /** Vertical positioning offset */
  top: number;
}

/**
 * Main component props interface
 */
interface RightBlockLogoProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Background/accent color */
  bg: string;
  /** Font/text color */
  font: string;
  /** Component identifier */
  id?: string;
  /** Icon configuration object */
  props: IconProps;
  /** Template variant (1-5) */
  template?: 1 | 2 | 3 | 4 | 5;
  /** Additional CSS class name */
  className?: string;
  resumeTpe: 'fresher' | 'pro' | 'expert';
}

/**
 * Template configurations mapping
 */
const TEMPLATE_CONFIGS: Record<number, TemplateConfig> = {
  1: {
    heightMultiplier: 13,
    widthMultiplier: 13,
    lineHeightMultiplier: 8,
    topModifier: 0,
    hasBackground: true,
    hasBorder: false,
    borderRadius: '50%',
    iconColor: 'white',
    isVisible: true,
  },
  2: {
    heightMultiplier: 9,
    widthMultiplier: 9,
    lineHeightMultiplier: 13,
    topModifier: 3,
    hasBackground: false,
    hasBorder: true,
    borderRadius: '1px',
    iconColor: 'bg',
    isVisible: true,
  },
  3: {
    heightMultiplier: 9,
    widthMultiplier: 9,
    lineHeightMultiplier: 6,
    topModifier: 3,
    hasBackground: true,
    hasBorder: false,
    borderRadius: '50%',
    iconColor: 'white',
    isVisible: true,
  },
  4: {
    heightMultiplier: 13,
    widthMultiplier: 13,
    lineHeightMultiplier: 7,
    topModifier: 0,
    hasBackground: false,
    hasBorder: false,
    borderRadius: '50%',
    iconColor: 'font',
    isVisible: true,
  },
  5: {
    heightMultiplier: 0,
    widthMultiplier: 0,
    lineHeightMultiplier: 7,
    topModifier: 0,
    hasBackground: false,
    hasBorder: false,
    borderRadius: '50%',
    iconColor: 'white',
    isVisible: false,
  },
};

/**
 * RightBlockLogo - A consolidated template-based logo component
 * 
 * Supports 5 different template variations with configurable styling:
 * - Template 1: Large circular background with white icon
 * - Template 2: Diamond border with colored icon
 * - Template 3: Small circular background with white icon
 * - Template 4: No background with font-colored icon
 * - Template 5: Hidden/empty template
 * 
 * @param props - Component configuration props
 * @returns JSX.Element - Rendered logo component
 */
const RightBlockLogo: React.FC<RightBlockLogoProps> = ({
  fac,
  bg,
  font,
  id,
  props: iconProps,
  template = 1,
  className = '',
}) => {
  const config = TEMPLATE_CONFIGS[template];
  
  /**
   * Memoized style calculations for performance optimization
   */
  const styles = useMemo(() => {
    const baseHeight = fac * config.heightMultiplier;
    const baseWidth = fac * config.widthMultiplier;
    
    return {
      container: {
        height: `${baseHeight}px`,
        width: `${baseWidth}px`,
        position: 'absolute' as const,
        top: `${fac * (iconProps.top + config.topModifier)}px`,
        left: `${fac * 6}px`,
        textAlign: 'center' as const,
        borderRadius: config.borderRadius === '50%' ? '50%' : `${fac * parseFloat(config.borderRadius)}px`,
        backgroundColor: config.hasBackground ? bg : 'transparent',
        zIndex: 2,
      },
      icon: {
        fontSize: `${fac * 6}pt`,
        zIndex: 3,
        lineHeight: `${fac * config.lineHeightMultiplier}px`,
        position: 'absolute' as const,
        top: `${fac * 2.5}px`,
        left: `${fac * 2.5}px`
      },
      // Template 2 & 3 specific styles
      borderContainer: {
        height: `${fac * 9 * 0.8}px`,
        width: `${fac * 9 * 0.8}px`,
        position: 'absolute' as const,
        border: `${fac * 0.5}px solid ${bg}`,
        borderRadius: `${fac * 1}px`,
        left: `${fac * 4}px`,
        top: '0px',
      },
      iconContainer2: {
        position: 'absolute' as const,
        color: bg,
        fontSize: `${fac * 3}pt`,
        top: `${fac * 1.5}px`,
        left: `${fac * 5.5}px`,
        zIndex: 3,
      },
      iconContainer3: {
        height: `${fac * 9 * 0.8}px`,
        width: `${fac * 9 * 0.8}px`,
        position: 'absolute' as const,
        lineHeight: `${fac * 6}px`,
        textAlign: 'center' as const,
        color: 'white',
        fontSize: `${fac * 3}pt`,
        top: '0px',
        left: `${fac * 2}px`,
        borderRadius: '50%',
        backgroundColor: bg,
      },
    };
  }, [fac, bg, config, iconProps.top]);

  /**
   * Get icon color based on template configuration
   */
  const getIconColor = useMemo(() => {
    switch (config.iconColor) {
      case 'white':
        return 'white';
      case 'bg':
        return bg;
      case 'font':
        return font;
      default:
        return 'white';
    }
  }, [config.iconColor, bg, font]);

  const Icon = iconProps.name;

  // Template 5 renders empty component
  if (!config.isVisible) {
    return (
      <div
        className={`template5-logo-right ${className}`}
        id={id}
        style={styles.container}
      />
    );
  }

  // Template 2 - Diamond border with separate icon positioning
  if (template === 2) {
    return (
      <div
        className={`template2-logo-right ${className}`}
        id={id}
        style={{
          position: 'absolute',
          top: styles.container.top,
          left: styles.container.left,
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <div style={styles.borderContainer} />
        <div style={styles.iconContainer2}>
          <IconContext.Provider value={{ color: getIconColor }}>
            <div style={{ zIndex: 3 }}>
              <Icon />
            </div>
          </IconContext.Provider>
        </div>
      </div>
    );
  }

  // Template 3 - Circular background with custom positioning
  if (template === 3) {
    return (
      <div
        className={`template3-logo-right ${className}`}
        id={id}
        style={{
          position: 'absolute',
          top: styles.container.top,
          left: styles.container.left,
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <div className="template3-icon-heading" style={styles.iconContainer3}>
          <IconContext.Provider value={{ color: getIconColor }}>
            <div style={{ 
              fontSize: `${fac * 3}pt`,
              position: 'absolute',
              top: `${fac * 1.5}px`,
              left: `${fac * 1.5}px`,
               }}>
              <Icon />
            </div>
          </IconContext.Provider>
        </div>
      </div>
    );
  }

  // Templates 1 & 4 - Standard circular container
  return (
    <div
      className={`template${template}-logo-right ${className}`}
      id={id}
      style={styles.container}
    >
      <IconContext.Provider value={{ color: getIconColor }}>
        <div style={styles.icon}>
          <Icon />
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default RightBlockLogo;
export type { RightBlockLogoProps, IconProps };
