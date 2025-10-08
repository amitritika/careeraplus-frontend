import React, { Children, useMemo } from 'react';

/**
 * Props interface for the RightBlock component
 */
export interface RightBlockProps {
  /** Scaling factor applied to all dimensions */
  fac: number;
  /** Height of the component in pixels */
  height: number;
  /** Background color */
  bg: string;
  /** Font color (preserved for compatibility) */
  font: string;
  /** Element ID */
  id: string;
  /** Template variant (1-5) */
  template?: 1 | 2 | 3 | 4 | 5;
  /** Additional CSS classes */
  className?: string;
  /** Font family */
  fontFamily?: string;
  /** Resume type (fresher, pro, expert) */
  resumeType?: 'fresher' | 'pro' | 'expert';
}

/**
 * Configuration for different template variants
 */
interface TemplateConfig {
  isMultiBar: boolean;
  segmentHeight: number;
}

/**
 * RightBlock component that renders a centered block or multiple bars
 * based on the selected template variant.
 * 
 * Templates 1, 2, 4, 5: Single centered block
 * Template 3: Multiple bars based on height segmentation
 * 
 * @param props - RightBlock component props
 * @returns JSX element representing the right block
 */
const RightBlock: React.FC<RightBlockProps & {children: React.ReactNode;}> = ({
  fac,
  height,
  bg,
  font,
  id,
  template,
  className = '',
  fontFamily,
  resumeType,
  children
}) => {
  /**
   * Template configurations cached for performance
   */
  const templateConfigs: Record<number, TemplateConfig> = useMemo(() => ({
    1: { isMultiBar: false, segmentHeight: 297 },
    2: { isMultiBar: false, segmentHeight: 297 },
    3: { isMultiBar: true, segmentHeight: 297 },
    4: { isMultiBar: false, segmentHeight: 297 },
    5: { isMultiBar: false, segmentHeight: 297 }
  }), []);

  /**
   * Memoized calculations for performance optimization
   */
  const calculations = useMemo(() => {
    const scaledHeight = fac * height;
    const scaledWidth = fac * 130;
    const scaledMarginLeft = fac * 80;
    
    return {
      height: `${scaledHeight}px`,
      width: `${scaledWidth}px`,
      marginLeft: `${scaledMarginLeft}px`,
      scaledHeight,
      scaledWidth,
      scaledMarginLeft
    };
  }, [fac, height]);

  /**
   * Generate bar segments for Template 3
   */
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
        barWidth: `${fac * 140}px`
      };
    }, [template, fac, height]);

  /**
   * Common styles for all elements
   */
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    background: 'transparent',
    width: calculations.width
  };

  /**
   * Render single block (Templates 1, 2, 4, 5)
   */
  const renderSingleBlock = () => (
    <div
      id={id}
      className={className}
      style={{
        ...baseStyles,
        height: calculations.height,
        marginLeft: calculations.marginLeft,
        ...(fontFamily && { fontFamily })
      }}
    >{children} </div>
  );

  /**
   * Render multiple bars (Template 3)
   */
  const renderMultiBars = () => {
    if (!multiBarData) return null;

    return multiBarData.positions.map((topPosition, index) => (
      <div
      className={className}
      style={{
        ...baseStyles,
        height: calculations.height,
        marginLeft: calculations.marginLeft,
        ...(fontFamily && { fontFamily })
      }}>
        <div
        key={index+`ar`}
        style={{
          position: 'absolute',
          height: multiBarData.barHeight,
          width: multiBarData.barWidth,
          background: bg,
          top: topPosition[0]
        }}
      ></div>
      <div
        key={index+`br`}
        style={{
          position: 'absolute',
          height: multiBarData.barHeight,
          width: multiBarData.barWidth,
          background: bg,
          top: topPosition[1]
        }}
      ></div>
      {children}
      </div>
      
    ));
  };

  // Determine which rendering method to use based on template
  const config = templateConfigs[template || 1];
  
  return config?.isMultiBar ? renderMultiBars() : renderSingleBlock();
};

export default RightBlock;
