import React, { useMemo } from 'react';
import parse from 'html-react-parser';

/**
 * Template configuration enum for different RightBlockPub layouts
 */
export enum RightBlockPubTemplate {
  TEMPLATE_1 = 1,
  TEMPLATE_2 = 2,
  TEMPLATE_3 = 3,
  TEMPLATE_4 = 4,
  TEMPLATE_5 = 5,
}

/**
 * Publication data interface
 */
export interface PublicationData {
  /** Publication title */
  title: string;
  /** Author name */
  name: string;
  /** Journal name */
  journal: string;
  /** Publication year */
  year: string;
  /** Page numbers */
  pages: string;
}

/**
 * Nested props interface for component configuration
 */
export interface RightBlockPubProps {
  /** Element height before scaling */
  height: number;
  /** Top position before scaling */
  top: number;
  /** Whether to show line (templates 2,3) */
  line?: boolean;
  /** Publication data */
  data: PublicationData;
}

/**
 * Main component props interface
 */
export interface RightBlockPubComponentProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Template variant to use */
  template: RightBlockPubTemplate;
  /** Background color in rgb format */
  bg: string;
  /** Font color */
  font: string;
  /** Element ID */
  id: string;
  /** Font family */
  fontFamily?: string;
  /** CSS class name */
  className?: string;
  /** Component configuration */
  props: RightBlockPubProps;
}

/**
 * Template-specific configuration interface
 */
interface TemplateConfig {
  leftMultiplier: number;
  hasVerticalLine: boolean;
  hasHorizontalLine: boolean;
  lineConfig?: {
    lineT: number;
    lineL: number;
    lineH?: number;
    hasBorderTransparency?: boolean;
  };
}

/**
 * Template configuration map
 */
const TEMPLATE_CONFIGS: Record<RightBlockPubTemplate, TemplateConfig> = {
  [RightBlockPubTemplate.TEMPLATE_1]: {
    leftMultiplier: 17,
    hasVerticalLine: false,
    hasHorizontalLine: false,
  },
  [RightBlockPubTemplate.TEMPLATE_2]: {
    leftMultiplier: 17,
    hasVerticalLine: true,
    hasHorizontalLine: false,
    lineConfig: {
      lineT: 8,
      lineL: -5,
      lineH: -2,
    },
  },
  [RightBlockPubTemplate.TEMPLATE_3]: {
    leftMultiplier: 17,
    hasVerticalLine: true,
    hasHorizontalLine: false,
    lineConfig: {
      lineT: 1.5,
      lineL: -7,
      lineH: -2,
    },
  },
  [RightBlockPubTemplate.TEMPLATE_4]: {
    leftMultiplier: 17,
    hasVerticalLine: false,
    hasHorizontalLine: true,
    lineConfig: {
      lineT: 0.5,
      lineL: -6,
    },
  },
  [RightBlockPubTemplate.TEMPLATE_5]: {
    leftMultiplier: 6,
    hasVerticalLine: false,
    hasHorizontalLine: true,
    lineConfig: {
      lineT: 0.5,
      lineL: -6,
      hasBorderTransparency: true,
    },
  },
};

/**
 * Helper function to convert RGB to RGBA with transparency
 */
const rgbToRgbaWithOpacity = (rgb: string, opacity: number): string => {
  return rgb.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
};

/**
 * RightBlockPub - A consolidated publication block component supporting 5 template variations
 * 
 * Features:
 * - Scalable dimensions with fac multiplier
 * - Template-specific positioning and line elements
 * - Secure HTML content parsing
 * - TypeScript-safe prop validation
 * - Performance optimizations with useMemo
 * 
 * @param props - Component configuration props
 * @returns JSX element with publication block layout
 */
const RightBlockPub: React.FC<RightBlockPubComponentProps> = ({
  fac,
  template,
  bg,
  font,
  id,
  fontFamily = 'Arial, sans-serif',
  className = '',
  props: componentProps,
}) => {
  // Get template configuration
  const config = TEMPLATE_CONFIGS[template];

  // Memoize common calculations
  const dimensions = useMemo(() => ({
    height: `${fac * componentProps.height}px`,
    width: `${fac * 113}px`,
    line: `${fac * componentProps.height}px`,
    size: `${fac * 3.2}pt`,
    left: `${fac * config.leftMultiplier}px`,
    top: `${fac * componentProps.top}px`,
    top1: `${fac * 1}px`,
    top2: `${fac * 5}px`,
    top3: `${fac * 10}px`,
    top4: `${fac * 3}px`,
    height1: `${fac * 3}px`,
    left1: `${fac * -6}px`,
  }), [fac, componentProps.height, componentProps.top, config.leftMultiplier]);

  // Memoize line calculations
  const lineStyles = useMemo(() => {
    if (!config.lineConfig) return null;

    const lineConfig = config.lineConfig;
    const styles: React.CSSProperties = {
      position: 'absolute',
      top: `${fac * lineConfig.lineT}px`,
      left: `${fac * lineConfig.lineL}px`,
      width: `${fac * 0.5}px`,
      backgroundColor: bg,
    };

    if (config.hasVerticalLine) {
      styles.height = `${fac * (componentProps.height + (lineConfig.lineH || 0))}px`;
    } else if (config.hasHorizontalLine) {
      styles.height = `${fac * 0.5}px`;
      styles.width = `${fac * 10}px`;
    }

    if (lineConfig.hasBorderTransparency) {
      styles.backgroundColor = rgbToRgbaWithOpacity(bg, 0.6);
    }

    return styles;
  }, [config, fac, componentProps.height, bg]);

  // Memoize publication data
  const publicationData = useMemo(() => componentProps.data, [componentProps.data]);

  // Memoize pages display
  const pagesDisplay = useMemo(() => {
    return publicationData.pages !== '' ? ` | p.${publicationData.pages}` : '';
  }, [publicationData.pages]);

  // Base container styles
  const containerStyles: React.CSSProperties = {
    position: 'absolute',
    height: dimensions.height,
    width: dimensions.width,
    left: dimensions.left,
    top: dimensions.top,
    fontFamily,
  };

  // Name styles
  const nameStyles: React.CSSProperties = {
    position: 'absolute',
    left: dimensions.left1,
    top: dimensions.top1,
    height: dimensions.height1,
    fontSize: dimensions.size,
    color: font,
    fontWeight: 'bold',
  };

  // Title styles
  const titleStyles: React.CSSProperties = {
    position: 'absolute',
    left: dimensions.left1,
    top: dimensions.top2,
    fontSize: dimensions.size,
    color: font,
  };

  // Journal styles
  const journalStyles: React.CSSProperties = {
    position: 'absolute',
    left: dimensions.left1,
    top: dimensions.top3,
    fontSize: dimensions.size,
    color: font,
  };

  // Render line element if configured
  const renderLineElement = () => {
    if (!lineStyles) return null;

    // Template 2 and 3 have conditional vertical lines
    if (config.hasVerticalLine && componentProps.line === false) {
      return null;
    }

    return <div style={lineStyles} />;
  };

  return (
    <div
      id={id}
      className={`right-block-pub ${className}`}
      style={containerStyles}
    >
      <div style={nameStyles}>
        {typeof publicationData.name === 'string' ? 
          publicationData.name : 
          parse(publicationData.name)
        }
      </div>
      
      <div style={titleStyles}>
        {typeof publicationData.title === 'string' ? 
          publicationData.title : 
          parse(publicationData.title)
        }
      </div>
      
      <div style={journalStyles}>
        {publicationData.year} - {publicationData.journal}{pagesDisplay}
      </div>

      {renderLineElement()}
    </div>
  );
};

export default RightBlockPub;
