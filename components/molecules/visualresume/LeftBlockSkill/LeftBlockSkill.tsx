import React, { useMemo } from 'react';
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar 
} from 'react-icons/fa';

/**
 * Configuration for different LeftBlockSkill template styles
 */
export interface TemplateConfig {
  /** Template identifier */
  id: 1 | 2 | 3 | 4 | 5;
  /** Display type */
  displayType: 'progress' | 'stars';
  /** Rating input format */
  ratingFormat: 'percentage' | 'normalized';
  /** Width multiplier */
  widthMultiplier: number;
  /** Has rounded corners */
  hasRoundedCorners: boolean;
  /** Progress bar style */
  progressStyle: 'simple' | 'bordered' | 'transparent';
  /** Star icon color source */
  starColorSource: 'bg' | 'font';
}

/**
 * Skill data structure
 */
export interface SkillData {
  /** Skill name to display */
  name: string;
  /** Rating value (0-100) */
  rating: number;
  /** Vertical position offset multiplier */
  top: number;
}

/**
 * LeftBlockSkill component props
 */
export interface LeftBlockSkillProps {
  /** Scaling factor for all dimensions */
  fac: number;
  /** Template configuration (1-5) or custom config */
  template: 1 | 2 | 3 | 4 | 5 | TemplateConfig;
  /** Skill data */
  props: SkillData;
  /** Background/accent color */
  bg: string;
  /** Font/text color */
  font: string;
  /** Component ID */
  id: string;
  /** Optional font family override */
  fontFamily?: string;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Predefined template configurations
 */
const TEMPLATE_CONFIGS: Record<number, TemplateConfig> = {
  1: {
    id: 1,
    displayType: 'progress',
    ratingFormat: 'percentage',
    widthMultiplier: 76,
    hasRoundedCorners: false,
    progressStyle: 'simple',
    starColorSource: 'bg'
  },
  2: {
    id: 2,
    displayType: 'progress',
    ratingFormat: 'percentage',
    widthMultiplier: 76,
    hasRoundedCorners: true,
    progressStyle: 'bordered',
    starColorSource: 'bg'
  },
  3: {
    id: 3,
    displayType: 'stars',
    ratingFormat: 'normalized',
    widthMultiplier: 76,
    hasRoundedCorners: false,
    progressStyle: 'simple',
    starColorSource: 'bg'
  },
  4: {
    id: 4,
    displayType: 'stars',
    ratingFormat: 'normalized',
    widthMultiplier: 76,
    hasRoundedCorners: false,
    progressStyle: 'simple',
    starColorSource: 'font'
  },
  5: {
    id: 5,
    displayType: 'progress',
    ratingFormat: 'percentage',
    widthMultiplier: 70,
    hasRoundedCorners: false,
    progressStyle: 'transparent',
    starColorSource: 'font'
  }
};

/**
 * LeftBlockSkill - A consolidated skill display component supporting multiple template styles
 * 
 * @param props - Component properties
 * @returns JSX element representing the skill block
 */
const LeftBlockSkill: React.FC<LeftBlockSkillProps> = ({
  fac,
  template,
  props: skillData,
  bg,
  font,
  id,
  fontFamily = 'calibri',
  className
}) => {
  // Resolve template configuration
  const config = useMemo((): TemplateConfig => {
    if (typeof template === 'number') {
      return TEMPLATE_CONFIGS[template];
    }
    return template;
  }, [template]);

  // Memoized calculations
  const dimensions = useMemo(() => ({
    height: `${fac * 15}px`,
    width: `${fac * config.widthMultiplier}px`,
    fontSize: `${fac * 3.2}pt`,
    left: `${fac * (config.id === 5 ? 6 : 2)}px`,
    top: `${fac * skillData.top}px`,
    padding: `${fac * (config.id === 5 ? 0 : config.displayType === 'stars' ? 4 : 2)}px`
  }), [fac, config, skillData.top]);

  // Normalize rating based on template format
  const normalizedRating = useMemo(() => {
    if (config.ratingFormat === 'normalized') {
      return skillData.rating / 20; // Convert 0-100 to 0-5 scale
    }
    return skillData.rating; // Keep as percentage
  }, [skillData.rating, config.ratingFormat]);

  // Star rendering logic
  const renderStars = useMemo(() => {
    if (config.displayType !== 'stars') return null;

    const starRating = normalizedRating;
    const fullStars = Math.floor(starRating);
    const hasHalfStar = (starRating - fullStars) > 0.01 && (starRating - fullStars) < 0.9;
    const stars = [];

    let leftPosition = 4;

    for (let i = 1; i <= 5; i++) {
      const starLeft = `${fac * leftPosition}px`;
      const starColor = config.starColorSource === 'bg' ? bg : 'white';
      
      let StarIcon;
      if (i <= fullStars) {
        StarIcon = FaStar;
      } else if (i === fullStars + 1 && hasHalfStar) {
        StarIcon = FaStarHalfAlt;
      } else {
        StarIcon = FaRegStar;
      }

      stars.push(
        <div
          key={i}
          style={{
            position: 'absolute',
            left: starLeft,
            color: starColor
          }}
        >
          <StarIcon />
        </div>
      );

      leftPosition += 6;
    }

    return stars;
  }, [config, normalizedRating, fac, bg]);

  // Progress bar styling
  const progressBarStyles = useMemo(() => {
    if (config.displayType !== 'progress') return null;

    const baseHeight = config.id === 5 ? `${fac * 2}px` : `${fac * 4}px`;
    const borderRadius = config.hasRoundedCorners ? `${fac * 7.5}px` : '0px';
    const borderWidth = config.hasRoundedCorners ? `${fac * 0.5}px` : '0px';
    
    let backgroundStyle = {};
    let fillStyle = {};

    switch (config.progressStyle) {
      case 'simple':
        backgroundStyle = {
          position: 'absolute' as const,
          width: '100%',
          height: baseHeight,
          backgroundColor: 'white'
        };
        fillStyle = {
          position: 'absolute' as const,
          width: `${normalizedRating}%`,
          height: baseHeight,
          zIndex: 2,
          backgroundColor: font
        };
        break;
        
      case 'bordered':
        const containerWidth = `${fac * 65}px`;
        const containerLeft = `${fac * 4}px`;
        
        return (
          <div style={{
            position: 'absolute',
            width: containerWidth,
            left: containerLeft
          }}>
            <div style={{
              position: 'absolute',
              width: '100%',
              height: baseHeight,
              border: `${borderWidth} white solid`,
              borderRadius
            }} />
            <div style={{
              position: 'absolute',
              width: `${normalizedRating}%`,
              height: baseHeight,
              zIndex: 2,
              backgroundColor: 'white',
              borderRadius
            }} />
          </div>
        );
        
      case 'transparent':
        const transparentBg = bg.replace('rgb(', 'rgba(').replace(')', ', 0.4)');
        backgroundStyle = {
          position: 'absolute' as const,
          width: '100%',
          height: baseHeight,
          backgroundColor: transparentBg
        };
        fillStyle = {
          position: 'absolute' as const,
          width: `${normalizedRating}%`,
          height: baseHeight,
          zIndex: 2,
          backgroundColor: bg
        };
        break;
    }

    return (
      <>
        <div style={backgroundStyle} />
        <div style={fillStyle} />
      </>
    );
  }, [config, fac, normalizedRating, bg, font]);

  // Main container styling
  const containerStyle = useMemo(() => ({
    height: dimensions.height,
    width: dimensions.width,
    position: 'absolute' as const,
    top: dimensions.top,
    left: dimensions.left,
    color: (template === 5) ? bg : (template === 3) ? font : 'white',
    fontFamily,
    fontSize: dimensions.fontSize,
    textAlign: 'left' as const
  }), [dimensions, config, font, fontFamily]);

  // Star container positioning - Fixed: return undefined instead of null
  const starContainerStyle = useMemo(() => {
    if (config.displayType !== 'stars') return undefined;
    
    return {
      position: 'absolute' as const,
      width: `${fac * 65}px`,
      top: `${fac * 8}px`
    };
  }, [config, fac]);

  return (
    <div id={id} className={className} style={containerStyle}>
      <p style={{
        margin: '0px',
        padding: config.displayType === 'stars' 
          ? `0 ${dimensions.padding}` 
          : dimensions.padding
      }}>
        {skillData.name}
      </p>
      
      {config.displayType === 'progress' && progressBarStyles}
      
      {config.displayType === 'stars' && (
        <div style={starContainerStyle}>
          {renderStars}
        </div>
      )}
    </div>
  );
};

export default LeftBlockSkill;
