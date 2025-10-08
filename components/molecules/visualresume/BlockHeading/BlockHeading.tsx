import React, { useMemo } from 'react';

/**
 * Configuration for different BlockHeading template variations
 */
const TEMPLATE_CONFIGS = {
  '1': {
    baseWidth: 66,
    leftOffset: 30,
    textAlign: 'center' as const,
    colorSource: 'background' as const,
    showLine: false,
    dynamicWidth: false,
  },
  '2': {
    baseWidth: 66,
    leftOffset: 20,
    textAlign: 'left' as const,
    colorSource: 'background' as const,
    showLine: true,
    dynamicWidth: true,
    lineConfig: {
      totalWidth: 190,
      offsetLeft: 5,
      height: 1,
      verticalCenter: true,
    },
  },
  '3': {
    baseWidth: 66,
    leftOffset: 20,
    textAlign: 'left' as const,
    colorSource: 'foreground' as const,
    showLine: false,
    dynamicWidth: true,
  },
  '4': {
    baseWidth: 95,
    leftOffset: 20,
    textAlign: 'left' as const,
    colorSource: 'background' as const,
    showLine: false,
    dynamicWidth: false,
  },
  '5': {
    baseWidth: 90,
    leftOffset: 20,
    textAlign: 'left' as const,
    colorSource: 'background' as const,
    showLine: false,
    dynamicWidth: false,
  },
} as const;

/**
 * Props interface for the BlockHeading component data
 */
export interface BlockHeadingData {
  /** Height of the block in base units */
  height: number;
  /** Display name/text content */
  name: string;
  /** Top position in base units */
  top: number;
}

/**
 * Main props interface for BlockHeading component
 */
export interface BlockHeadingProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Component data containing height, name, and positioning */
  props: BlockHeadingData;
  /** Template variation number (1-5) */
  template?: '1' | '2' | '3' | '4' | '5';
  /** Background color */
  bg?: string;
  /** Font color */
  font?: string;
  /** Font family override */
  fontFamily?: string;
  /** HTML id attribute */
  id?: string;
  /** CSS class name */
  className?: string;
  /** Optional text width calculation function */
  textWidthFn?: (
    fontFamily: string,
    fontWeight: string,
    fontSize: string,
    fontStyle: string,
    text: string
  ) => [number, number];
}

/**
 * Default text width calculation function (fallback)
 * Returns approximate text width based on character count
 */
const defaultTextWidth = (
  fontFamily: string,
  fontWeight: string,
  fontSize: string,
  fontStyle: string,
  text: string
): [number, number] => {
  // Approximate character width for 6pt Calibri bold
  const avgCharWidth = 4.2;
  const textWidth = text.length * avgCharWidth;
  return [0, textWidth];
};

/**
 * BlockHeading - A consolidated heading component supporting 5 template variations
 * 
 * Features:
 * - Template-based styling configurations
 * - Dynamic width calculation for templates 2 & 3
 * - Optional horizontal line rendering for template 2
 * - Configurable color sources (background vs foreground)
 * - Performance optimized with useMemo
 * - Full TypeScript support with proper interfaces
 * 
 * @param props - BlockHeadingProps containing all configuration options
 * @returns JSX.Element - Rendered heading block with optional line element
 */
const BlockHeading: React.FC<BlockHeadingProps> = ({
  fac,
  props: blockProps,
  template = '1',
  bg = '#000000',
  font = '#000000',
  fontFamily = 'calibri',
  id,
  className,
  textWidthFn = defaultTextWidth,
}) => {
  // Get template configuration
  const config = TEMPLATE_CONFIGS[template];

  // Memoize all calculations for performance
  const calculations = useMemo(() => {
    const height = `${fac * blockProps.height}px`;
    const lineHeight = height;
    const fontSize = `${fac * 6}pt`;
    const top = `${fac * blockProps.top}px`;
    
    let width: string;
    let textWidth: number = 0;
    
    if (config.dynamicWidth && (template === '2' || template === '3')) {
      const [, calculatedWidth] = textWidthFn(
        'calibri',
        'bold',
        '6pt',
        'auto',
        blockProps.name
      );
      textWidth = calculatedWidth;
      width = `${fac * calculatedWidth}px`;
    } else {
      width = `${fac * config.baseWidth}px`;
    }
    
    const left = `${fac * config.leftOffset}px`;
    const color = config.colorSource === 'background' ? bg : font;

    // Line calculations for template 2
    let lineProps = null;
    if (config.showLine && config.lineConfig) {
      const lineWidth = `${fac * (config.lineConfig.totalWidth - textWidth)}px`;
      const lineLeft = `${fac * (config.lineConfig.offsetLeft + textWidth)}px`;
      const lineTop = `${fac * (blockProps.height / 2 - 0)}px`;
      const lineHeight = `${fac * config.lineConfig.height}px`;
      
      lineProps = {
        width: lineWidth,
        left: lineLeft,
        top: lineTop,
        height: lineHeight,
        backgroundColor: bg,
      };
    }

    return {
      height,
      width,
      lineHeight,
      fontSize,
      top,
      left,
      color,
      lineProps,
    };
  }, [fac, blockProps, config, template, bg, font, textWidthFn]);

  // Main container styles
  const containerStyles: React.CSSProperties = {
    height: calculations.height,
    width: calculations.width,
    color: calculations.color,
    lineHeight: calculations.lineHeight,
    position: 'absolute',
    top: calculations.top,
    left: calculations.left,
    fontFamily: fontFamily,
    fontSize: calculations.fontSize,
    textAlign: config.textAlign,
    fontWeight: 'bold',
  };

  // Line element styles for template 2
  const lineStyles: React.CSSProperties | undefined = calculations.lineProps ? {
    position: 'absolute',
    top: calculations.lineProps.top,
    left: calculations.lineProps.left,
    width: calculations.lineProps.width,
    margin: '0',
    backgroundColor: calculations.lineProps.backgroundColor,
    height: calculations.lineProps.height,
    border: 'none',
  } : undefined;

  return (
    <div
      id={id}
      className={className}
      style={containerStyles}
    >
      {blockProps.name}
      {config.showLine && lineStyles && (
        <hr style={lineStyles} />
      )}
    </div>
  );
};

export default BlockHeading;
