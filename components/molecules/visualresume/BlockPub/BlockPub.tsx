import React, { useMemo } from 'react';
import parse from 'html-react-parser';

/**
 * Configuration for different BlockPub template variations
 */
export type BlockPubTemplate = 'template1' | 'template2' | 'template3' | 'template4' | 'template5';

/**
 * Publication data structure
 */
export interface PublicationData {
  /** Publication title */
  title: string;
  /** Author or publisher name */
  name: string;
  /** Journal or venue name */
  journal: string;
  /** Publication year */
  year: string;
  /** Page numbers (optional) */
  pages?: string;
}

/**
 * Nested props structure matching original template pattern
 */
export interface BlockPubProps {
  /** Height of the block */
  height: number;
  /** Top position offset */
  top: number;
  /** Publication data */
  data: PublicationData;
  /** Whether to show conditional line (templates 2-3) */
  line?: boolean;
}

/**
 * Main component props interface
 */
export interface BlockPubComponentProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Template variant to use */
  template: BlockPubTemplate;
  /** Background color (RGB string) */
  bg: string;
  /** Font color (RGB string) */
  font: string;
  /** Font family */
  fontFamily: string;
  /** Component ID */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** Nested props structure */
  props: BlockPubProps;
}

/**
 * Template-specific configuration
 */
interface TemplateConfig {
  leftPosition: number;
  hasConditionalLine: boolean;
  hasHorizontalLine: boolean;
  hasBorder: boolean;
  conditionalLineConfig?: {
    top: number;
    left: number;
  };
}

/**
 * Template configurations mapping
 */
const TEMPLATE_CONFIGS: Record<BlockPubTemplate, TemplateConfig> = {
  template1: {
    leftPosition: 17,
    hasConditionalLine: false,
    hasHorizontalLine: false,
    hasBorder: false,
  },
  template2: {
    leftPosition: 17,
    hasConditionalLine: true,
    hasHorizontalLine: false,
    hasBorder: false,
    conditionalLineConfig: {
      top: 8,
      left: -5,
    },
  },
  template3: {
    leftPosition: 17,
    hasConditionalLine: true,
    hasHorizontalLine: false,
    hasBorder: false,
    conditionalLineConfig: {
      top: 1.5,
      left: -7,
    },
  },
  template4: {
    leftPosition: 17,
    hasConditionalLine: false,
    hasHorizontalLine: true,
    hasBorder: false,
  },
  template5: {
    leftPosition: 6,
    hasConditionalLine: false,
    hasHorizontalLine: true,
    hasBorder: true,
  },
};

/**
 * Helper function to create border color with opacity
 */
const createBorderColor = (bgColor: string): string => {
  if (bgColor.startsWith('rgb(')) {
    return bgColor.replace('rgb(', 'rgba(').replace(')', ', 0.6)');
  }
  return bgColor;
};

/**
 * BlockPub - A consolidated publication block component supporting multiple template variations
 * 
 * This component renders publication information in various layouts with configurable styling,
 * lines, and borders based on the selected template.
 * 
 * @example
 * ```tsx
 * <BlockPub
 *   fac={1.0}
 *   template="template1"
 *   bg="rgb(255, 255, 255)"
 *   font="rgb(0, 0, 0)"
 *   fontFamily="Arial, sans-serif"
 *   props={{
 *     height: 20,
 *     top: 0,
 *     data: {
 *       title: "Research Paper",
 *       name: "John Doe",
 *       journal: "Science Journal",
 *       year: "2024",
 *       pages: "123-130"
 *     }
 *   }}
 * />
 * ```
 */
export const BlockPub: React.FC<BlockPubComponentProps> = ({
  fac,
  template,
  bg,
  font,
  fontFamily,
  id,
  className,
  props: blockProps,
}) => {
  // Memoized template configuration
  const templateConfig = useMemo(() => TEMPLATE_CONFIGS[template], [template]);

  // Memoized dimension calculations
  const dimensions = useMemo(() => ({
    height: `${fac * blockProps.height}px`,
    width: `${fac * 180}px`,
    fontSize: `${fac * 3.2}pt`,
    left: `${fac * templateConfig.leftPosition}px`,
    top: `${fac * blockProps.top}px`,
  }), [fac, blockProps.height, blockProps.top, templateConfig.leftPosition]);

  // Memoized text positioning
  const textPositions = useMemo(() => ({
    top1: `${fac * 1}px`,
    top2: `${fac * 5}px`,
    top3: `${fac * 10}px`,
    detailsFontSize: `${fac * 2.5}pt`,
  }), [fac]);

  // Memoized line configurations
  const lineConfig = useMemo(() => ({
    vertical: {
      left: `${fac * -6}px`,
      top: `${fac * 1}px`,
      height: `${fac * 3}px`,
      width: '1px',
    },
    horizontal: templateConfig.hasHorizontalLine ? {
      left: `${fac * -6}px`,
      top: `${fac * 0.5}px`,
      height: `${fac * 0.5}px`,
      width: `${fac * 180}px`,
    } : null,
    conditional: templateConfig.hasConditionalLine && templateConfig.conditionalLineConfig ? {
      left: `${fac * templateConfig.conditionalLineConfig.left}px`,
      top: `${fac * templateConfig.conditionalLineConfig.top}px`,
      height: `${fac * (blockProps.height - 2)}px`,
      width: `${fac * 0.5}px`,
    } : null,
  }), [fac, templateConfig, blockProps.height]);

  // Memoized border style
  const borderStyle = useMemo(() => {
    if (!templateConfig.hasBorder) return undefined;
    return `1px solid ${createBorderColor(bg)}`;
  }, [templateConfig.hasBorder, bg]);

  // Memoized container style
  const containerStyle = useMemo(() => ({
    position: 'absolute' as const,
    height: dimensions.height,
    width: dimensions.width,
    background: bg,
    fontFamily,
    fontSize: dimensions.fontSize,
    color: font,
    left: dimensions.left,
    top: dimensions.top,
    ...(borderStyle && { border: borderStyle }),
  }), [dimensions, bg, fontFamily, font, borderStyle]);

  // Extract data with fallbacks
  const { title = '', name = '', journal = '', year = '', pages = '' } = blockProps.data || {};

  return (
    <div id={id} className={className} style={containerStyle}>
      {/* Vertical line - present in all templates */}
      <div
        style={{
          position: 'absolute',
          left: lineConfig.vertical.left,
          top: lineConfig.vertical.top,
          height: lineConfig.vertical.height,
          width: lineConfig.vertical.width,
          backgroundColor: font,
        }}
      />

      {/* Horizontal line - templates 4 and 5 */}
      {lineConfig.horizontal && (
        <div
          style={{
            position: 'absolute',
            left: lineConfig.horizontal.left,
            top: lineConfig.horizontal.top,
            height: lineConfig.horizontal.height,
            width: lineConfig.horizontal.width,
            backgroundColor: font,
          }}
        />
      )}

      {/* Conditional line - templates 2 and 3 */}
      {lineConfig.conditional && blockProps.line && (
        <div
          style={{
            position: 'absolute',
            left: lineConfig.conditional.left,
            top: lineConfig.conditional.top,
            height: lineConfig.conditional.height,
            width: lineConfig.conditional.width,
            backgroundColor: font,
          }}
        />
      )}

      {/* Author/Publisher name */}
      <div
        style={{
          position: 'absolute',
          top: textPositions.top1,
          fontWeight: 'bold',
        }}
      >
        {name}
      </div>

      {/* Publication title */}
      <div
        style={{
          position: 'absolute',
          top: textPositions.top2,
          fontStyle: 'italic',
          fontWeight: 'bold',
        }}
      >
        {title}
      </div>

      {/* Year, journal, and pages */}
      <div
        style={{
          position: 'absolute',
          top: textPositions.top3,
          fontSize: textPositions.detailsFontSize,
        }}
      >
        {year} - {journal} {pages && ` | p.${pages}`}
      </div>
    </div>
  );
};

export default BlockPub;