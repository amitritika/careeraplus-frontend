import React, { useMemo } from 'react';
import parse from 'html-react-parser';

/**
 * Data structure for BlockPor content
 */
export interface BlockPorData {
  title: string;
  desc: string;
  date: {
    startDate: string;
    endDate: string;
    optional: boolean;
  };
  event: {
    value: string;
    optional: boolean;
  };
}

/**
 * Props structure for nested component properties
 */
export interface BlockPorNestedProps {
  height: number;
  top: number;
  line?: boolean;
  data: BlockPorData;
}

/**
 * Main props interface for BlockPor component
 */
export interface BlockPorProps {
  /** Scaling factor for responsive sizing */
  fac: number;
  /** Template variant (1-5) */
  template: 1 | 2 | 3 | 4 | 5;
  /** Background color (CSS color string) */
  bg: string;
  /** Font color (CSS color string) */
  font: string;
  /** Font family name */
  fontFamily?: string;
  /** Component ID */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** Nested props containing data and layout properties */
  props: BlockPorNestedProps;
}

/**
 * Configuration for template-specific variations
 */
interface TemplateConfig {
  leftOffset: number;
  hasBorder: boolean;
  hasVerticalLine: boolean;
  usesAlternateDescPosition: boolean;
  verticalLineWidth: string;
  verticalLineLeft: number;
  verticalLineTop: number;
}

/**
 * BlockPor Component - Consolidated template for resume portfolio blocks
 * 
 * Supports 5 different visual templates with varying layouts, borders, and line indicators.
 * Maintains pixel-perfect compatibility with original template implementations.
 * 
 * @param props - Component props including scaling factor, template variant, and content data
 * @returns JSX element representing the portfolio block
 */
const BlockPor: React.FC<BlockPorProps> = ({
  fac,
  template,
  bg,
  font,
  fontFamily = 'Arial, sans-serif',
  id,
  className,
  props: nestedProps
}) => {
  // Template-specific configurations
  const templateConfig: TemplateConfig = useMemo(() => {
    const configs: Record<number, TemplateConfig> = {
      1: {
        leftOffset: 17,
        hasBorder: false,
        hasVerticalLine: false,
        usesAlternateDescPosition: false,
        verticalLineWidth: '0.5px',
        verticalLineLeft: -7,
        verticalLineTop: 1.5
      },
      2: {
        leftOffset: 17,
        hasBorder: false,
        hasVerticalLine: false,
        usesAlternateDescPosition: false,
        verticalLineWidth: '0.5px',
        verticalLineLeft: -7,
        verticalLineTop: 1.5
      },
      3: {
        leftOffset: 17,
        hasBorder: false,
        hasVerticalLine: true,
        usesAlternateDescPosition: true,
        verticalLineWidth: '0.5px',
        verticalLineLeft: -7,
        verticalLineTop: 1.5
      },
      4: {
        leftOffset: 17,
        hasBorder: false,
        hasVerticalLine: true,
        usesAlternateDescPosition: true,
        verticalLineWidth: '2px',
        verticalLineLeft: -6,
        verticalLineTop: 1.5
      },
      5: {
        leftOffset: 6,
        hasBorder: true,
        hasVerticalLine: true,
        usesAlternateDescPosition: true,
        verticalLineWidth: '2px',
        verticalLineLeft: -6,
        verticalLineTop: 1
      }
    };
    return configs[template] || configs[1];
  }, [template]);

  // Memoized calculations for performance
  const calculations = useMemo(() => {
    const config = templateConfig;
    return {
      height: `${fac * nestedProps.height}px`,
      width: `${fac * 183}px`,
      line: `${fac * nestedProps.height}px`,
      size: `${fac * 3.2}pt`,
      left: `${fac * config.leftOffset}px`,
      top: `${fac * nestedProps.top}px`,
      top1: `${fac * 1}px`,
      top2: `${fac * 5}px`,
      top3: `${fac * 10}px`,
      topD: `${fac * 8}px`,
      top4: `${fac * 3}px`,
      height1: `${fac * 3}px`,
      left1: `${fac * -6}px`,
      // Template 3 specific calculations
      lineH: `${fac * (nestedProps.height - 2)}px`,
      lineT: `${fac * config.verticalLineTop}px`,
      lineL: `${fac * config.verticalLineLeft}px`,
      lineW: `${fac * parseFloat(config.verticalLineWidth)}px`
    };
  }, [fac, nestedProps, templateConfig]);

  // Border color with opacity for template 5
  const borderColor = useMemo(() => {
    if (!templateConfig.hasBorder) return '';
    let color = bg.replace('rgb(', 'rgba(');
    color = color.replace(')', ', 0.6)');
    return color;
  }, [bg, templateConfig.hasBorder]);

  // Extract data with defaults
  const { title, desc, date, event } = nestedProps.data;
  const { startDate, endDate } = date;
  const dateShow = date.optional;
  const eventShow = event.optional;
  const eventValue = event.value;

  // Container styles
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    top: calculations.top,
    left: calculations.left,
    ...(templateConfig.hasBorder && {
      border: `2px solid ${borderColor}`,
      borderRadius: '5px',
      padding: '5px'
    })
  };

  return (
    <div 
      id={id} 
      className={className}
      style={containerStyle}
    >
      {/* Horizontal line indicator */}
      <div
        style={{
          position: 'absolute',
          top: calculations.top1,
          left: calculations.left1,
          height: calculations.height1,
          width: calculations.line,
          backgroundColor: bg
        }}
      />

      {/* Vertical line (templates 3, 4, 5) */}
      {templateConfig.hasVerticalLine && (
        <>
          {template === 3 && nestedProps.line && (
            <div
              style={{
                position: 'absolute',
                top: calculations.lineT,
                left: calculations.lineL,
                height: calculations.lineH,
                width: calculations.lineW,
                backgroundColor: bg
              }}
            />
          )}
          {(template === 4 || template === 5) && (
            <div
              style={{
                position: 'absolute',
                top: calculations.lineT,
                left: calculations.lineL,
                height: calculations.line,
                width: templateConfig.verticalLineWidth,
                backgroundColor: bg
              }}
            />
          )}
        </>
      )}

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: calculations.top2,
          fontSize: calculations.size,
          color: font,
          fontFamily
        }}
      >
        {title}
      </div>

      {/* Date and Event */}
      {(dateShow || eventShow) && (
        <div
          style={{
            position: 'absolute',
            top: calculations.top4,
            fontSize: calculations.size,
            color: font,
            fontFamily
          }}
        >
          {eventShow && (
            <span style={{ color: font }}>
              {eventValue} |{' '}
            </span>
          )}
          {dateShow && (
            <span style={{ color: font }}>
              {startDate}-{endDate}
            </span>
          )}
        </div>
      )}

      {/* Description */}
      <div
        style={{
          position: 'absolute',
          top: templateConfig.usesAlternateDescPosition ? calculations.topD : calculations.top3,
          fontSize: calculations.size,
          color: font,
          fontFamily
        }}
      >
        {parse(desc)}
      </div>
    </div>
  );
};

export default BlockPor;
