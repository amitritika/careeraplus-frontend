import React, { useMemo } from 'react';
import parse from 'html-react-parser';

/**
 * Template configuration for visual variations
 */
const TEMPLATE_CONFIGS = {
  1: { indicator: 'none', leftPos: 17, titleSize: 3.2, roleSpacing: 3 },
  2: { indicator: 'line', leftPos: 17, titleSize: 3.2, roleSpacing: 3, lineWidth: 4 },
  3: { indicator: 'dot', leftPos: 17, titleSize: 3.2, roleSpacing: 1.5, dotSize: 5 },
  4: { indicator: 'hollow', leftPos: 17, titleSize: 3.2, roleSpacing: 3, circleSize: 6 },
  5: { indicator: 'border', leftPos: 6, titleSize: 3.6, roleSpacing: 3, borderWidth: 3, padding: 5 }
} as const;

/**
 * Work experience data structure
 */
export interface WorkExpData {
  /** Component height multiplier */
  height: number;
  /** Top position multiplier */
  top: number;
  /** Organization name */
  org: string;
  /** Job designation */
  desg: string;
  /** Start date */
  startD: string;
  /** End date */
  endD: string;
  /** HTML roles and responsibilities content (optional) */
  role?: string;
  type?: string;
  desc?: string | undefined;
}

/**
 * Component props interface
 */
export interface RightBlockWorkExpProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Template variant (1-5) */
  template: 1 | 2 | 3 | 4 | 5;
  /** Background color */
  bg: string;
  /** Text and indicator color */
  font: string;
  /** Font family */
  fontFamily: string;
  /** Component ID */
  id: string;
  /** Work experience data */
  props: WorkExpData;
  /** Optional CSS class */
  className?: string;

  resumeType: 'fresher' | 'pro' | 'expert';

}

/**
 * RightBlockWorkExp - Consolidated work experience component supporting 5 template variations
 * 
 * Features:
 * - Template 1: Clean text-only layout
 * - Template 2: Vertical line indicator
 * - Template 3: Filled circular dot indicator  
 * - Template 4: Hollow circular border indicator
 * - Template 5: Left border stripe with enhanced styling
 * 
 * @param props - Component props
 * @returns JSX.Element
 */
export const RightBlockWorkExp: React.FC<RightBlockWorkExpProps> = React.memo(({
  fac,
  template,
  bg,
  font,
  fontFamily,
  id,
  props: workExpProps,
  className,
  resumeType
}) => {
  const config = TEMPLATE_CONFIGS[template];
  
  // Memoized calculations for performance
  const calculations = useMemo(() => {
    const base = {
      height: `${fac * workExpProps.height}px`,
      width: `${fac * 113}px`,
      left: `${fac * config.leftPos}px`,
      top: `${fac * workExpProps.top}px`,
      fontSize: `${fac * config.titleSize}pt`,
      contentFontSize: `${fac * 3.2}pt`,
      top1: `${fac * 1}px`,
      top2: `${fac * 5}px`,
      top3: `${fac * 9}px`,
      top5: `${fac * config.roleSpacing}px`,
      left1: `${fac * -6}px`,
      height1: `${fac * 3}px`
    };

    // Template-specific calculations
    const specific: any = {};
    
    if (config.indicator === 'line') {
      specific.lineWidth = `${fac * config.lineWidth!}px`;
      specific.lineHeight = base.height;
    }
    
    if (config.indicator === 'dot') {
      specific.dotSize = `${fac * config.dotSize!}px`;
    }
    
    if (config.indicator === 'hollow') {
      specific.circleSize = `${fac * config.circleSize!}px`;
    }
    
    if (config.indicator === 'border') {
      specific.borderWidth = `${config.borderWidth}px`;
      specific.padding = `${fac * config.padding!}px`;
      specific.borderColor = bg.replace('rgb(', 'rgba(').replace(')', ', 0.6)');
    }

    return { ...base, ...specific };
  }, [fac, workExpProps.height, workExpProps.top, config, bg]);

  // Memoized indicator element
  const indicatorElement = useMemo(() => {
    const indicatorStyle = {
      position: 'absolute' as const,
      left: calculations.left1,
      top: calculations.top1
    };

    switch (config.indicator) {
      case 'line':
        return (
          <div 
            style={{
              ...indicatorStyle,
              width: calculations.lineWidth,
              height: calculations.lineHeight,
              backgroundColor: font
            }}
          />
        );
      
      case 'dot':
        return (
          <div 
            style={{
              ...indicatorStyle,
              width: calculations.dotSize,
              height: calculations.dotSize,
              borderRadius: '100%',
              backgroundColor: font
            }}
          />
        );
      
      case 'hollow':
        return (
          <div 
            style={{
              ...indicatorStyle,
              width: calculations.circleSize,
              height: calculations.circleSize,
              borderWidth: calculations.height1,
              borderStyle: 'solid',
              borderColor: font,
              borderRadius: '100%',
              backgroundColor: 'transparent'
            }}
          />
        );
      
      default:
        return null;
    }
  }, [config.indicator, calculations, font]);

  // Base container style
  const containerStyle: React.CSSProperties = {
    height: calculations.height,
    width: calculations.width,
    position: 'absolute',
    left: calculations.left,
    top: calculations.top,
    padding: '0px',
  };

  const textStyle: React.CSSProperties = {
    width: '100%',
    color: font,
    fontFamily,
    textAlign: 'left',
    position: 'relative'
  };
  if(resumeType = 'fresher'){
    return(
      <div id={id} style={containerStyle} className={className}>
        <div style={{ ...textStyle, fontSize: calculations.fontSize }}>
          <span style= {{color: bg, fontStyle: 'italic', fontWeight: 'bold'}}>{workExpProps.type} :</span>  {workExpProps.startD}-{workExpProps.endD}
        </div>
        <div style={{ ...textStyle, fontSize: calculations.contentFontSize, color: bg, fontWeight: 'bold' }}>
        {workExpProps.org}
      </div>
          <div 
            style={{ 
              ...textStyle, 
              fontSize: calculations.contentFontSize, 
              textAlign: 'justify'
            }}
          >
            {parse(workExpProps.desc || '')}
          </div>

      </div>
    )

  }else{
    return (
    <div id={id} style={containerStyle} className={className}>
      {indicatorElement}
      
      {/* Organization and dates */}
      <div style={{ ...textStyle, fontSize: calculations.fontSize, top: calculations.top1 }}>
        <span style= {{color: bg}}>{workExpProps.org}</span> {workExpProps.startD}-{workExpProps.endD}
      </div>
      
      {/* Designation */}
      <div style={{ ...textStyle, fontSize: calculations.contentFontSize, top: calculations.top2 }}>
        {workExpProps.desg}
      </div>
      
      {/* Roles & Responsibilities (conditional) */}
      {workExpProps.role && (
        <div>
          <div 
            id="role" 
            style={{ ...textStyle, fontSize: calculations.contentFontSize, top: calculations.top3 }}
          >
            Roles & Responsibilities
          </div>
          <div 
            style={{ 
              ...textStyle, 
              fontSize: calculations.contentFontSize, 
              textAlign: 'justify', 
              top: calculations.top5 
            }}
          >
            {parse(workExpProps.role)}
          </div>
        </div>
      )}
    </div>
  );
  }
  
});

RightBlockWorkExp.displayName = 'RightBlockWorkExp';

export default RightBlockWorkExp;
