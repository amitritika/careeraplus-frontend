import React, { useMemo } from 'react';

/**
 * Props interface for the VL (Vertical Line) component
 */
export interface VLProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Background color in RGB format */
  bg: string;
  /** Font color in RGB format */
  font: string;
  /** Unique identifier for the component */
  id: string;
  /** Template variant (1-5) */
  template?: 1 | 2 | 3 | 4 | 5;
  /** Nested props containing positioning and sizing data */
  props: {
    /** Height multiplier */
    height: number;
    /** Top position multiplier */
    top: number;
  };
  /** Optional CSS class name */
  className?: string;
}

/**
 * Template configuration for different VL variants
 */
interface TemplateConfig {
  leftPosition: number;
  useFixedHeight?: boolean;
  fixedHeight?: number;
  borderVariable: 'bo' | 'thick';
  hasRgbaConversion?: boolean;
  hasExtraVariables?: boolean;
}

/**
 * Helper function to convert RGB to RGBA with opacity
 */
const convertRgbToRgba = (rgb: string, opacity: number = 0.6): string => {
  return rgb.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
};

/**
 * VL (Vertical Line) Component
 * 
 * Renders a vertical line with configurable positioning, sizing, and styling.
 * Supports 5 different template variations with pixel-perfect calculations.
 * 
 * @param props - VLProps configuration object
 * @returns JSX.Element representing the vertical line
 */
export const VL: React.FC<VLProps> = ({
  fac,
  bg,
  font,
  id,
  template = 1,
  props: componentProps,
  className
}) => {
  // Template configurations
  const templateConfigs: Record<number, TemplateConfig> = {
    1: { leftPosition: 12, borderVariable: 'bo' },
    2: { leftPosition: 12, borderVariable: 'bo' },
    3: { 
      leftPosition: 0, 
      useFixedHeight: true, 
      fixedHeight: 267,
      borderVariable: 'bo',
      hasExtraVariables: true 
    },
    4: { leftPosition: 12, borderVariable: 'bo' },
    5: { 
      leftPosition: 0, 
      borderVariable: 'thick',
      hasRgbaConversion: true 
    }
  };

  // Memoized calculations for performance
  const calculations = useMemo(() => {
    const config = templateConfigs[template];

    // Common calculations
    const height = config.useFixedHeight 
      ? `${fac * config.fixedHeight!}px`
      : `${fac * componentProps.height}px`;

    const left = `${fac * config.leftPosition}px`;
    const top = `${fac * componentProps.top}px`;

    // Template-specific calculations
    const borderSize = config.borderVariable === 'thick' 
      ? `${fac * 0.5}px` 
      : `${fac * 1}px`;

    let additionalVars = {left1: `${fac * 1.5}px`,
        bo1: `${fac * 1}px`,
        bo2: `${fac * 0.5}px`};

    // Template 3 specific variables
    if (config.hasExtraVariables) {
      additionalVars = {
        left1: `${fac * 1.5}px`,
        bo1: `${fac * 1}px`,
        bo2: `${fac * 0.5}px`
      };
    }

    // Template 5 specific border color conversion
    let borderColor = bg;
    if (config.hasRgbaConversion) {
      borderColor = convertRgbToRgba(bg, 0.6);
    }

    return {
      height,
      left,
      top,
      borderSize,
      borderColor,
      additionalVars
    };
  }, [fac, bg, template, componentProps.height, componentProps.top]);

  // Render different templates based on configuration
  const renderTemplate = () => {
    const config = templateConfigs[template];

    switch (template) {
      case 1:
      case 2:
      case 4:
        // Basic vertical line templates (identical structure)
        return (
          <div
            id={id}
            className={className}
            style={{
              position: 'absolute',
              left: calculations.left,
              top: calculations.top,
              width: calculations.borderSize,
              height: calculations.height,
              backgroundColor: bg,
              border: 'none'
            }}
          />
        );

      case 3:
        // Extended vertical line with fixed height
        return (
          <div
            id={id}
            className={className}
            style={{
              position: 'absolute',
              left: calculations.left,
              top: calculations.top,
              width: calculations.borderSize,
              height: calculations.height,
              backgroundColor: bg,
              border: 'none'
            }}
          >
            <div style={{
              position: 'absolute',
              left: calculations.additionalVars?.left1,
              width: calculations.additionalVars?.bo2,
              height: calculations.height,
              backgroundColor: bg,
              border: 'none'
            }} />

          </div>
        );

      case 5:
        // Styled vertical line with rgba border
        return (
          <div
            id={id}
            className={className}
            style={{
              position: 'absolute',
              left: calculations.left,
              top: calculations.top,
              width: calculations.borderSize,
              height: calculations.height,
              backgroundColor: bg,
              borderColor: calculations.borderColor,
              border: 'none'
            }}
          />
        );

      default:
        return null;
    }
  };

  return renderTemplate();
};

export default VL;
