import React, { useMemo } from 'react';

/**
 * Props interface for the Block component
 */
interface BlockProps {
  /** Scale factor for all dimensions */
  fac: number;
  /** Height of the block in base units */
  height: number;
  /** Top position offset in base units */
  top: number;
  /** Unique identifier for the block */
  id?: string;
  /** Background color (Template 3 only) */
  bg?: string;
  /** Font/text color (Template 3 only) */
  font?: string;
  /** Template variation to render (1-5) */
  template?: number;
  /** Additional CSS class names */
  className?: string;
  /** Font family override */
  fontFamily?: string;
}

/**
 * Block component with consolidated template variations
 * Supports 5 different template modes with optimized rendering
 * 
 * @param props - BlockProps configuration
 * @returns JSX.Element - Rendered block component
 */
const Block: React.FC<BlockProps & {children: React.ReactNode}> = ({
  fac,
  height,
  top,
  id,
  bg,
  font,
  template = 1,
  className,
  fontFamily,
  children
}) => {
  // Memoized calculations for performance optimization
  const dimensions = useMemo(() => ({
    height: `${fac * height}px`,
    width: `${fac * 210}px`,
    top: `${fac * top}px`
  }), [fac, height, top]);

  // Complex template calculations (Template 3)
  const complexDimensions = useMemo(() => {
    if (template !== 3) return null;
    
    return {
      height1: `${fac * 10}px`,
      top1: `${fac * (height - 10)}px`,
      count: Math.floor((height + 1) / 297)
    };
  }, [fac, height, template]);

  // Multi-bar rendering function for Template 3
  const renderMultiBars = useMemo(() => {
    if (template !== 3 || !complexDimensions) return null;

    const arr: number[] = [];
    let t = 0;
    
    for (let i = 0; i < complexDimensions.count; i++) {
      t = 297 * i;
      arr.push(t);
    }

    return arr.map((barTop, index) => (
      <div
        key={`bar-${index}`}
        style={{
          position: 'absolute',
          height: complexDimensions.height1,
          width: dimensions.width,
          backgroundColor: bg || '#000000',
          color: font || '#ffffff',
          top: `${fac * barTop}px`,
          fontFamily: fontFamily || 'inherit'
        }}
      />
    ));
  }, [template, complexDimensions, dimensions, bg, font, fac, fontFamily]);

  // Basic template styles
  const basicBlockStyle: React.CSSProperties = useMemo(() => ({
    position: 'absolute',
    height: dimensions.height,
    width: dimensions.width,
    top: dimensions.top,
    backgroundColor: bg || 'transparent',
    color: font || 'inherit',
    fontFamily: fontFamily || 'inherit'
  }), [dimensions, bg, font, fontFamily]);

  // Template 3 container styles
  const complexContainerStyle: React.CSSProperties = useMemo(() => ({
    position: 'absolute',
    height: dimensions.height,
    width: dimensions.width,
    top: dimensions.top,
    overflow: 'hidden'
  }), [dimensions]);

  // Render based on template type
  if (template === 3) {
    return (
      <div
        id={id}
        className={className}
        style={complexContainerStyle}
      >
        {renderMultiBars}
        {children}
      </div>
    );
  }

  // Basic templates (1, 2, 4, 5) - identical rendering
  return (
    <div
      id={id}
      className={className}
      style={basicBlockStyle}
    > {children} </div>
  );
};

export default Block;
