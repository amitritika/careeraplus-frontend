import React, { useMemo } from 'react';
import { FaCircle, FaSquare } from 'react-icons/fa';
import parse from 'html-react-parser';

/**
 * Data structure for project information
 */
interface ProjectData {
  title: string;
  desc: string;
  designation: {
    value: string;
    optional: boolean;
  };
  date: {
    startDate: string;
    endDate: string;
    optional: boolean;
  };
  client: {
    value: string;
    optional: boolean;
  };
}

/**
 * Props structure for the project block
 */
interface ProjectProps {
  height: number;
  top: number;
  data: ProjectData;
  line?: boolean;
}

/**
 * Main component props interface
 */
interface BlockProjectProps {
  /** Scaling factor for responsive design */
  fac: number;
  /** Template variant (1-5) */
  template?: 1 | 2 | 3 | 4 | 5;
  /** Project-specific props */
  props: ProjectProps;
  /** Background color */
  bg: string;
  /** Font color */
  font: string;
  /** Font family */
  fontFamily?: string;
  /** Component ID */
  id?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Template configuration for different visual variants
 */
interface TemplateConfig {
  iconComponent: React.ComponentType<{ className?: string }>;
  contentLeft: number;
  hasLine: boolean;
  linePosition: 'before' | 'after' | 'title';
  lineTop: number;
  lineLeft: number;
  lineHeight?: number;
  hasBorder: boolean;
}

/**
 * BlockProject - A consolidated component for displaying project information blocks
 * with multiple template variations for different visual styles.
 * 
 * @component
 * @example
 * ```
 * <BlockProject
 *   fac={1.2}
 *   template={3}
 *   props={{
 *     height: 60,
 *     top: 0,
 *     data: {
 *       title: "E-commerce Platform",
 *       desc: "Built a scalable online shopping platform",
 *       designation: { value: "Lead Developer", optional: true },
 *       date: { startDate: "Jan 2023", endDate: "Dec 2023", optional: true },
 *       client: { value: "Tech Corp", optional: true }
 *     }
 *   }}
 *   bg="rgb(52, 152, 219)"
 *   font="rgb(44, 62, 80)"
 * />
 * ```
 */
const BlockProject: React.FC<BlockProjectProps> = ({
  fac,
  template = 1,
  props: projectProps,
  bg,
  font,
  fontFamily = 'inherit',
  id,
  className = ''
}) => {
  // Template configurations
  const templateConfigs: Record<number, TemplateConfig> = useMemo(() => ({
    1: {
      iconComponent: FaCircle,
      contentLeft: 17,
      hasLine: false,
      linePosition: 'after',
      lineTop: 8,
      lineLeft: -4.5,
      hasBorder: false
    },
    2: {
      iconComponent: FaCircle,
      contentLeft: 17,
      hasLine: true,
      linePosition: 'after',
      lineTop: 8,
      lineLeft: -4.5,
      lineHeight: projectProps.height - 2,
      hasBorder: false
    },
    3: {
      iconComponent: FaCircle,
      contentLeft: 17,
      hasLine: true,
      linePosition: 'before',
      lineTop: 1.5,
      lineLeft: -7,
      lineHeight: projectProps.height - 2,
      hasBorder: false
    },
    4: {
      iconComponent: FaSquare,
      contentLeft: 17,
      hasLine: true,
      linePosition: 'title',
      lineTop: 0.5,
      lineLeft: -6,
      lineHeight: 3,
      hasBorder: false
    },
    5: {
      iconComponent: FaCircle,
      contentLeft: 6,
      hasLine: false,
      linePosition: 'title',
      lineTop: 1,
      lineLeft: -6,
      hasBorder: true
    }
  }), [projectProps.height]);

  // Memoized calculations
  const dimensions = useMemo(() => ({
    height: `${fac * projectProps.height}px`,
    width: `${fac * 180}px`,
    fontSize: `${fac * 3.2}pt`,
    iconSize: `${fac * 19}px`,
    iconHeight: `${fac * 3}px`
  }), [fac, projectProps.height]);

  const positioning = useMemo(() => {
    const config = templateConfigs[template];
    return {
      left: `${fac * config.contentLeft}px`,
      top: `${fac * projectProps.top}px`,
      iconLeft: `${fac * -6}px`,
      // Template-specific positioning
      top1: `${fac * 1}px`,
      top2: `${fac * 5}px`,
      top3: `${fac * 10}px`,
      topD: `${fac * 8}px`,
      top4: `${fac * 3}px`,
      // Line positioning
      lineTop: `${fac * config.lineTop}px`,
      lineLeft: `${fac * config.lineLeft}px`,
      lineHeight: config.lineHeight ? `${fac * config.lineHeight}px` : undefined,
      lineWidth: `${fac * 0.5}px`
    };
  }, [fac, template, templateConfigs, projectProps.top]);

  // Extract data with memoization
  const projectData = useMemo(() => ({
    title: projectProps.data.title,
    desc: projectProps.data.desc,
    designation: projectProps.data.designation.value,
    startDate: projectProps.data.date.startDate,
    endDate: projectProps.data.date.endDate,
    client: projectProps.data.client.value,
    showDesignation: projectProps.data.designation.optional,
    showClient: projectProps.data.client.optional,
    showDate: projectProps.data.date.optional
  }), [projectProps.data]);

  // Border color calculation for template 5
  const borderColor = useMemo(() => {
    if (template !== 5) return undefined;
    return bg.replace('rgb(', 'rgba(').replace(')', ', 0.6)');
  }, [template, bg]);

  const config = templateConfigs[template];
  const IconComponent = config.iconComponent;
  
  const hasMetadata = projectData.showDesignation || projectData.showDate || projectData.showClient;

  return (
    <div
      id={id}
      className={className}
      style={{
        position: 'absolute',
        height: dimensions.height,
        width: dimensions.width,
        left: positioning.left,
        top: positioning.top,
        fontFamily
      }}
    >
      {/* Icon */}
      <div
        style={{
          position: 'absolute',
          left: positioning.iconLeft,
          top: positioning.top4,
          height: positioning.iconHeight,
          fontSize: dimensions.iconSize,
          color: bg
        }}
      >
        <IconComponent />
      </div>

      {/* Vertical Line - Before bullet (Template 3) */}
      {config.hasLine && config.linePosition === 'before' && projectProps.line && (
        <div
          style={{
            position: 'absolute',
            height: positioning.lineHeight,
            width: positioning.lineWidth,
            backgroundColor: bg,
            left: positioning.lineLeft,
            top: positioning.lineTop
          }}
        />
      )}

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: positioning.top1,
          fontSize: dimensions.fontSize,
          color: font,
          fontWeight: 'bold',
          ...(config.hasBorder && {
            borderLeft: `1px solid ${borderColor}`,
            paddingLeft: `${fac * 6}px`
          })
        }}
      >
        {projectData.title}
      </div>

      {/* Vertical Line - Before title (Template 4) */}
      {config.hasLine && config.linePosition === 'title' && (
        <div
          style={{
            position: 'absolute',
            height: positioning.lineHeight,
            width: positioning.lineWidth,
            backgroundColor: bg,
            left: positioning.lineLeft,
            top: positioning.lineTop
          }}
        />
      )}

      {/* Metadata Line */}
      {hasMetadata && (
        <div
          style={{
            position: 'absolute',
            top: positioning.top2,
            fontSize: dimensions.fontSize,
            color: font
          }}
        >
          {projectData.showDesignation && (
            <>
              {projectData.designation}
              {(projectData.showDate || projectData.showClient) && ' - '}
            </>
          )}
          {projectData.showDate && (
            <>
              {projectData.startDate}-{projectData.endDate}
              {projectData.showClient && ' | '}
            </>
          )}
          {projectData.showClient && projectData.client}
        </div>
      )}

      {/* Spacing div */}
      {hasMetadata && (
        <div
          style={{
            position: 'absolute',
            top: positioning.topD,
            height: '1px'
          }}
        />
      )}

      {/* Description */}
      <div
        style={{
          position: 'absolute',
          top: positioning.top3,
          fontSize: dimensions.fontSize,
          color: font,
          lineHeight: 1.4
        }}
      >
        {typeof projectData.desc === 'string' && projectData.desc.includes('<') 
          ? parse(projectData.desc)
          : projectData.desc
        }
      </div>

      {/* Vertical Line - After bullet (Template 2) */}
      {config.hasLine && config.linePosition === 'after' && projectProps.line && (
        <div
          style={{
            position: 'absolute',
            height: positioning.lineHeight,
            width: positioning.lineWidth,
            backgroundColor: bg,
            left: positioning.lineLeft,
            top: positioning.lineTop
          }}
        />
      )}
    </div>
  );
};

export default BlockProject;
