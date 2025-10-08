import React, { useMemo } from 'react';
import parse from 'html-react-parser';

/**
 * Template configuration types for RightBlockProject component variations
 */
export type TemplateType = 1 | 2 | 3 | 4 | 5;

/**
 * Data structure for project information
 */
export interface ProjectData {
  title: string;
  desc: string;
  designation?: {
    value: string;
    optional: boolean;
  };
  date?: {
    startDate: string;
    endDate: string;
    optional: boolean;
  };
  client?: {
    value: string;
    optional: boolean;
  };
}

/**
 * Props structure for the nested props object
 */
export interface ProjectProps {
  height: number;
  top: number;
  line?: boolean;
  data: ProjectData;
}

/**
 * Main component props interface
 */
export interface RightBlockProjectProps {
  fac: number;
  props: ProjectProps;
  bg: string;
  font: string;
  fontFamily?: string;
  id?: string;
  className?: string;
  template?: number;
}

/**
 * Template configuration interface
 */
interface TemplateConfig {
  mainLeftPosition: number;
  hasLine: boolean;
  lineConfig?: {
    top: number;
    left: number;
    height?: string;
    width?: number;
  };
  hasBorder: boolean;
  borderConfig?: {
    convertToRgba: boolean;
  };
}

/**
 * Template configurations mapping
 */
const TEMPLATE_CONFIGS: Record<TemplateType, TemplateConfig> = {
  1: {
    mainLeftPosition: 17,
    hasLine: false,
    hasBorder: false,
  },
  2: {
    mainLeftPosition: 17,
    hasLine: true,
    lineConfig: {
      top: 8,
      left: -4.5,
      height: 'calculated', // (height - 2)
      width: 0.5,
    },
    hasBorder: false,
  },
  3: {
    mainLeftPosition: 17,
    hasLine: true,
    lineConfig: {
      top: 1.5,
      left: -7,
      height: 'calculated', // (height - 2)
      width: 0.5,
    },
    hasBorder: false,
  },
  4: {
    mainLeftPosition: 17,
    hasLine: true,
    lineConfig: {
      top: 0.5,
      left: -6,
    },
    hasBorder: false,
  },
  5: {
    mainLeftPosition: 6,
    hasLine: true,
    lineConfig: {
      top: 1,
      left: -6,
    },
    hasBorder: true,
    borderConfig: {
      convertToRgba: true,
    },
  },
};

/**
 * Helper function to calculate scaled dimensions
 */
const calculateDimension = (fac: number, value: number, unit: 'px' | 'pt' = 'px'): string => {
  return `${fac * value}${unit}`;
};

/**
 * Helper function to convert RGB to RGBA
 */
const convertRgbToRgba = (rgb: string, opacity: number = 0.6): string => {
  return rgb.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
};

/**
 * RightBlockProject - Consolidated project block component with template variations
 * 
 * Supports 5 different template layouts with configurable positioning, line elements,
 * and border styling while maintaining pixel-perfect visual parity with original templates.
 * 
 * @param fac - Scaling factor for responsive dimensions
 * @param props - Project data and configuration object
 * @param bg - Background color (CSS color string)
 * @param font - Text color (CSS color string) 
 * @param fontFamily - Optional font family override
 * @param id - Optional HTML id attribute
 * @param className - Optional CSS class names
 * @param template - Template variation selector (defaults to 'template1')
 */
export const RightBlockProject: React.FC<RightBlockProjectProps> = ({
  fac,
  props,
  bg,
  font,
  fontFamily,
  id,
  className,
  template = 'template1',
}) => {
  // Get template configuration
  const config = TEMPLATE_CONFIGS[template as keyof typeof TEMPLATE_CONFIGS];

  // Memoized dimension calculations
  const dimensions = useMemo(() => ({
    height: calculateDimension(fac, props.height),
    width: calculateDimension(fac, 113),
    fontSize: calculateDimension(fac, 3.2, 'pt'),
    mainLeft: calculateDimension(fac, config.mainLeftPosition),
    top: calculateDimension(fac, props.top),
    
    // Common positioning values
    top1: calculateDimension(fac, 1),
    top2: calculateDimension(fac, 5),
    top3: calculateDimension(fac, 10),
    topD: calculateDimension(fac, 8),
    top4: calculateDimension(fac, 3),
    height1: calculateDimension(fac, 3),
    left1: calculateDimension(fac, -6),
  }), [fac, props.height, props.top, config.mainLeftPosition]);

  // Memoized line configuration
  const lineStyles = useMemo(() => {
    if (!config.hasLine || !config.lineConfig) return null;

    const { lineConfig } = config;
    const lineTop = calculateDimension(fac, lineConfig.top);
    const lineLeft = calculateDimension(fac, lineConfig.left);
    
    let lineHeight = '';
    if (lineConfig.height === 'calculated') {
      lineHeight = calculateDimension(fac, props.height - 2);
    }

    const lineWidth = lineConfig.width ? calculateDimension(fac, lineConfig.width) : undefined;

    return {
      top: lineTop,
      left: lineLeft,
      height: lineHeight,
      width: lineWidth,
    };
  }, [config, fac, props.height]);

  // Memoized border color conversion
  const borderColor = useMemo(() => {
    if (!config.hasBorder || !config.borderConfig?.convertToRgba) return bg;
    return convertRgbToRgba(bg, 0.6);
  }, [config, bg]);

  // Extract data properties
  const {
    title,
    desc,
    designation: { value: desg, optional: desgShow } = { value: '', optional: false },
    date: { startDate: startD, endDate: endD, optional: dateShow } = { startDate: '', endDate: '', optional: false },
    client: { value: client, optional: clientShow } = { value: '', optional: false },
  } = props.data;

  // Check if any metadata should be shown
  const hasMetadata = desgShow || dateShow || clientShow;

  return (
    <div
      id={id}
      className={className}
      style={{
        position: 'absolute',
        height: dimensions.height,
        width: dimensions.width,
        left: dimensions.mainLeft,
        top: dimensions.top,
        fontSize: dimensions.fontSize,
        fontFamily: fontFamily,
        color: bg
      }}
    >
      {/* Project Title */}
      <div
        style={{
          position: 'absolute',
          top: dimensions.top1,
          fontWeight: 'bold',
        }}
      >
        {title}
      </div>

      {/* Metadata Section */}
      {hasMetadata && (
        <div
          style={{
            position: 'absolute',
            top: dimensions.top2,
            fontSize: `calc(${dimensions.fontSize} * 0.85)`,
            opacity: 0.8,
          }}
        >
          {desgShow && <span>{desg} - </span>}
          {dateShow && <span>{startD}-{endD} | </span>}
          {clientShow && <span>{client}</span>}
        </div>
      )}

      {/* Separator Line */}
      {hasMetadata && (
        <div
          style={{
            position: 'absolute',
            top: dimensions.top4,
            left: dimensions.left1,
            height: dimensions.height1,
            borderBottom: `1px solid ${font}`,
            opacity: 0.3,
          }}
        />
      )}

      {/* Project Description */}
      <div
        style={{
          position: 'absolute',
          top: dimensions.topD,
        }}
      >
        {parse(desc)}
      </div>

      {/* Template-specific Line Element */}
      {config.hasLine && lineStyles && props.line && (
        <div
          style={{
            position: 'absolute',
            top: lineStyles.top,
            left: lineStyles.left,
            ...(lineStyles.height && { height: lineStyles.height }),
            ...(lineStyles.width && { width: lineStyles.width }),
            backgroundColor: bg,
            borderLeft: lineStyles.width ? `${lineStyles.width} solid ${bg}` : `1px solid ${bg}`,
          }}
        />
      )}
    </div>
  );
};

export default RightBlockProject;
