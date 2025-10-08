import React, { useMemo } from 'react';

/**
 * Props interface for the LeftBlock component
 */
export interface LeftBlockProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Base height in pixels */
  height: number;
  /** Background color or CSS background value */
  bg: string;
  /** Font color (currently unused but maintained for compatibility) */
  font?: string;
  /** HTML element ID */
  id?: string;
  /** Template variant (1-5, where 3 uses multi-bar rendering) */
  template?: 1 | 2 | 3 | 4 | 5;
  /** Additional CSS class name */
  className?: string;
  /** Resume type (fresher, pro, expert) */
  resumeType?: 'fresher' | 'pro' | 'expert';
} 

/**
 * LeftBlock Component
 * 
 * A flexible block component that renders either a simple colored block or
 * a complex multi-bar layout with automatic page break handling.
 * 
 * @param props - Component props
 * @returns JSX element representing the styled block
 */
const LeftBlock: React.FC<LeftBlockProps & {children: React.ReactNode }> = ({
  fac,
  height,
  bg,
  font,
  id,
  template,
  resumeType,
  className,
  children
}) => {
  // Memoized basic style calculations (used by all templates)
  const baseStyles = useMemo(() => ({
    height: `${fac * height}px`,
    width: `${fac * 80}px`,
    position: 'absolute' as const,
    background: (template === 3 || template === 5) ? 'transparent' : bg,
    margin: 0
  }), [fac, height, template, bg]);

  // Memoized calculations for Template 3 multi-bar logic
  const multiBarData = useMemo(() => {
    if (template !== 3) return null;

    const barHeight = fac * 10;
    const pageBreakInterval = 297;
    const count = Math.floor((height + 1) / pageBreakInterval);
    let t = 0;

    // Generate array of vertical positions for bars
    const positions: any[] = [];
    for (let i = 0; i < count; i++) {
      let top1 = (fac * (t)).toString() + "px";
    t = 297 * (i + 1);
    let top2 = (fac * (t-10)).toString() + "px";
      positions.push([top1, top2]);
    }

    return {
      barHeight: `${barHeight}px`,
      positions,
      barWidth: `${fac * 80}px`
    };
  }, [template, fac, height]);

  /**
   * Renders multiple bars for Template 3 with page break logic
   */
  const renderMultiBars = () => {
    if (!multiBarData) return null;

    return multiBarData.positions.map((topPosition, index) => (
      <div>
        <div
        key={index+'al'}
        style={{
          position: 'absolute',
          height: multiBarData.barHeight,
          width: multiBarData.barWidth,
          background: bg,
          top: topPosition[0]
        }}
      ></div>
      <div
        key={index+'bl'}
        style={{
          position: 'absolute',
          height: multiBarData.barHeight,
          width: multiBarData.barWidth,
          background: bg,
          top: topPosition[1]
        }}
      ></div>
      </div>
      
    ));
  };

  // Template 3 uses complex multi-bar rendering
  if (template === 3) {
    return (
      <div
        id={id}
        className={className}
        style={baseStyles}
      >
        {renderMultiBars()}
        {children}
      </div>
    );
  }

  // Templates 1, 2, 4, 5 use simple single block rendering
  return (
    <div
      id={id}
      className={className}
      style={baseStyles}
    > {children} </div>
  );
};

export default LeftBlock;
