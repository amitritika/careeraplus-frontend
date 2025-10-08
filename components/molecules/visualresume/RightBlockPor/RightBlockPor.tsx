import React, { useMemo } from 'react';
import parse from 'html-react-parser';

/**
 * Props for the consolidated RightBlockPor component data structure
 */
export interface RightBlockPorData {
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
 * Main props interface for RightBlockPor component
 */
export interface RightBlockPorProps {
  /** Scaling factor for all dimensions and positions */
  fac: number;

  /** Template variant (1-5) controlling layout and styling */
  template: 1 | 2 | 3 | 4 | 5;

  /** Block configuration and data */
  props: {
    height: number;
    top: number;
    data: RightBlockPorData;
    line?: boolean;
  };

  /** Background color (CSS color value) */
  bg: string;

  /** Font color (CSS color value) */
  font: string;

  /** Font family name */
  fontFamily: string;

  /** Element ID for the component */
  id: string;

  /** Additional CSS classes */
  className?: string;
}

/**
 * Template configuration interface
 */
interface TemplateConfig {
  lx: number;
  desc: 'top3' | 'topD';
  line: boolean;
  cond: boolean;
  dot: boolean;
  border: boolean;
}

/**
 * RightBlockPor - A consolidated component for displaying resume block content
 * with support for 5 different template variations.
 * 
 * Features:
 * - Responsive scaling via fac parameter
 * - Template-based layout variations
 * - Conditional date and event display
 * - Secure HTML content rendering
 * - TypeScript type safety
 * 
 * @param props - Component props
 * @returns JSX.Element
 */
const RightBlockPor: React.FC<RightBlockPorProps> = ({
  fac,
  template,
  props: block,
  bg,
  font,
  fontFamily,
  id,
  className
}) => {
  // Template-specific configuration
  const cfg = useMemo((): TemplateConfig => {
    const configs: Record<number, TemplateConfig> = {
      1: { lx: 17, desc: 'top3', line: true,  cond: false, dot: false, border: false },
      2: { lx: 17, desc: 'top3', line: false, cond: false, dot: false, border: false },
      3: { lx: 17, desc: 'topD', line: false, cond: true,  dot: false, border: false },
      4: { lx: 17, desc: 'topD', line: false, cond: false, dot: true,  border: false },
      5: { lx: 6,  desc: 'topD', line: false, cond: false, dot: true,  border: true }
    };
    return configs[template];
  }, [template]);

  // Memoized calculations for performance
  const calc = useMemo(() => {
    const px = (v: number) => `${fac * v}px`;
    const size = `${fac * 3.2}pt`;

    return {
      w: px(113),
      h: px(block.height),
      l: px(cfg.lx),
      t: px(block.top),
      t1: px(1),
      t2: px(5),
      t3: px(10),
      tD: px(8),
      t4: px(3),
      h1: px(3),
      l1: px(-6),
      lineH: px(block.height - 2),
      lineT: px(1.5),
      lineL: px(-7),
      lineW: px(0.5),
      dotT: px(template === 5 ? 1 : 1.5),
      dotL: px(-6),
      size: size,
      border: bg.replace('rgb(', 'rgba(').replace(')', ', 0.6)')
    };
  }, [fac, block.height, block.top, bg, cfg.lx, template]);

  // Container style with conditional border
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: calc.l,
    top: calc.t,
    width: calc.w,
    height: calc.h,
    backgroundColor: bg,
    zIndex: 10,
    ...(cfg.border && {
      border: `1px solid ${calc.border}`
    })
  };

  return (
    <div 
      style={containerStyle}
      id={id}
      className={className}
    >
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          left: '1px',
          top: calc.t1,
          fontSize: calc.size,
          fontFamily,
          fontWeight: 600,
          color: font,
          zIndex: 10
        }}
        id={`${id}title`}
      >
        {block.data.title}
      </div>

      {/* Date and Event */}
      {(block.data.date.optional || block.data.event.optional) && (
        <div
          style={{
            position: 'absolute',
            left: '1px',
            top: calc.t2,
            fontSize: calc.size,
            fontFamily,
            color: font,
            zIndex: 10
          }}
          id={`${id}date`}
        >
          {block.data.event.optional && (
            <>
              <span style={{ color: font }}>{block.data.event.value}</span>
              {block.data.date.optional && ' | '}
            </>
          )}
          {block.data.date.optional && (
            <span style={{ color: font }}>
              {block.data.date.startDate}-{block.data.date.endDate}
            </span>
          )}
        </div>
      )}

      {/* Description */}
      <div
        style={{
          position: 'absolute',
          left: '1px',
          top: cfg.desc === 'top3' ? calc.t3 : calc.tD,
          fontSize: calc.size,
          fontFamily,
          color: font,
          zIndex: 10
        }}
        id={`${id}desc`}
      >
        {typeof block.data.desc === 'string' && block.data.desc.includes('<') 
          ? parse(block.data.desc) 
          : block.data.desc
        }
      </div>

      {/* Template 1: Fixed left line */}
      {cfg.line && (
        <div
          style={{
            position: 'absolute',
            left: calc.l1,
            top: calc.t4,
            width: '3px',
            height: calc.h1,
            backgroundColor: font,
            zIndex: 10
          }}
          id={`${id}line`}
        />
      )}

      {/* Template 3: Conditional left line */}
      {cfg.cond && block.line && (
        <div
          style={{
            position: 'absolute',
            left: calc.lineL,
            top: calc.lineT,
            width: calc.lineW,
            height: calc.lineH,
            backgroundColor: font,
            zIndex: 10
          }}
          id={`${id}leftLine`}
        />
      )}

      {/* Template 4 & 5: Center dot */}
      {cfg.dot && (
        <div
          style={{
            position: 'absolute',
            left: calc.dotL,
            top: calc.dotT,
            width: '1px',
            height: '1px',
            backgroundColor: font,
            zIndex: 10
          }}
          id={`${id}centerDot`}
        />
      )}
    </div>
  );
};

export default React.memo(RightBlockPor);
