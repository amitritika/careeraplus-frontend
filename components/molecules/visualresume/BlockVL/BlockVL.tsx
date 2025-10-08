import React, { useMemo } from 'react';

/**
 * Props structure for positioning and dimensions
 */
interface BlockVLProps {
  /** Height value for the vertical line */
  height: number;
  /** Top position offset */
  top: number;
}

/**
 * Main component props interface
 */
interface BlockVLComponentProps {
  /** Scaling factor applied to all dimensions */
  fac: number;
  /** Background color for the vertical line border */
  bg: string;
  /** Font color (currently unused but maintained for compatibility) */
  font?: string;
  /** Optional ID for the element */
  id?: string;
  /** Additional CSS class name */
  className?: string;
  /** Block positioning and dimension properties */
  props: BlockVLProps;
  /** Optional template identifier (for backward compatibility) */
  template?: number;
}

/**
 * BlockVL - Vertical Line Block Component
 * 
 * Renders a vertical line element with absolute positioning, commonly used 
 * in resume templates and document layouts to create visual separators or
 * timeline indicators.
 * 
 * @param props - Component properties
 * @returns JSX element representing a styled vertical line
 * 
 * @example
 * ```
 * <BlockVL
 *   fac={1.2}
 *   bg="#333333"
 *   props={{ height: 50, top: 20 }}
 *   id="timeline-line"
 * />
 * ```
 */
const BlockVL: React.FC<BlockVLComponentProps> = ({
  fac,
  bg,
  font,
  id,
  className,
  props: blockProps,
  template
}) => {
  // Memoized calculations for performance optimization
  const calculations = useMemo(() => ({
    height: `${fac * blockProps.height}px`,
    left: `${fac * 12}px`, // Fixed 12px offset scaled by factor
    top: `${fac * blockProps.top}px`,
    borderWidth: `${fac * 1}px` // 1px border scaled by factor
  }), [fac, blockProps.height, blockProps.top]);

  // Memoized style object
  const divStyle = useMemo(() => ({
    height: calculations.height,
    position: 'absolute' as const,
    top: calculations.top,
    left: calculations.left,
    borderLeft: `${calculations.borderWidth} solid ${bg}`
  }), [calculations, bg]);

  return (
    <div 
      id={id} 
      className={className}
      style={divStyle}
    />
  );
};

export default BlockVL;

/**
 * Export types for external use
 */
export type { BlockVLComponentProps, BlockVLProps };

