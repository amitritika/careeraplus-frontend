import React, { useMemo, CSSProperties } from 'react';

/**
 * Template types for UserPhoto component styling variations
 */
export type UserPhotoTemplate = 1 | 2 | 3 | 4 | 5;

/**
 * Photo data structure containing dimensions and source
 */
export interface PhotoData {
  /** Base height of the photo in pixels */
  height: number;
  /** Photo source URL or base64 string */
  photo: string;
  /** Top position offset in pixels */
  top: number;
  /** Border radius for templates 2 and 3 (optional) */
  r?: number;
  /** Left margin for template 2 (optional) */
  marginL?: number;
  /** Right margin for template 2 (optional) */
  marginR?: number;
  /** Top margin for template 2 (optional) */
  marginT?: number;
  /** Bottom margin for template 2 (optional) */
  marginB?: number;
}

/**
 * Main props interface for the UserPhoto component
 */
export interface UserPhotoProps {
  /** Scaling factor for all dimensions and positioning */
  fac: number;
  /** Photo configuration object */
  props: PhotoData;
  /** Background color for borders and containers (CSS color string) */
  bg: string;
  /** Font color - maintained for API compatibility */
  font: string;
  /** Template variant to render (1-5) */
  template?: UserPhotoTemplate;
  /** Optional HTML element ID */
  id?: string;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Template configuration interface
 */
interface TemplateConfig {
  /** Left offset multiplier for positioning */
  leftOffset: number;
  /** Whether the photo should be circular */
  isCircular: boolean;
  /** Whether the template uses a wrapper container */
  hasWrapper: boolean;
  /** Whether the template includes borders */
  hasBorder: boolean;
  /** Template description for debugging */
  description: string;
}

/**
 * Template configuration mapping with all styling rules
 */
const TEMPLATE_CONFIG: Record<UserPhotoTemplate, TemplateConfig> = {
  1: { 
    leftOffset: 13, 
    isCircular: true, 
    hasWrapper: false, 
    hasBorder: false,
    description: 'Basic rectangular photo'
  },
  2: { 
    leftOffset: 13, 
    isCircular: false, 
    hasWrapper: true, 
    hasBorder: true,
    description: 'Container with margins and background'
  },
  3: { 
    leftOffset: 13, 
    isCircular: true, 
    hasWrapper: true, 
    hasBorder: true,
    description: 'Photo with shadow/background effect'
  },
  4: { 
    leftOffset: 2, 
    isCircular: true, 
    hasWrapper: false, 
    hasBorder: false,
    description: 'Circular photo'
  },
  5: { 
    leftOffset: 10, 
    isCircular: true, 
    hasWrapper: false, 
    hasBorder: true,
    description: 'Circular photo with semi-transparent border'
  },
} as const;

/**
 * Helper function to calculate dimensions and styles
 */
const calculateDimensions = (fac: number, photoData: PhotoData, config: TemplateConfig, bg: string) => {
  const baseSize = fac * photoData.height;

  return {
    // Base photo dimensions (always square)
    photoSize: `${baseSize}px`,

    // Container positioning
    left: `${fac * config.leftOffset}px`,
    top: `${fac * photoData.top}px`,

    // Template 2 specific - enlarged wrapper
    wrapperSize: `${fac * photoData.height}px`,

    // Template 3 specific - shadow container
    shadowSize: `${fac * (photoData.height + 4)}px`,

    // Border radius calculations
    borderRadius: config.isCircular 
      ? '50%' 
      : photoData.r 
        ? `${fac * photoData.r}px` 
        : '0px',

    // Border styling
    borderWidth: `${fac * 1}px`,
    borderColor: config.hasBorder 
      ? (config.isCircular && bg.includes('rgb('))
        ? bg.replace('rgb(', 'rgba(').replace(')', ', 0.6)')
        : bg
      : 'transparent',

    // Template 2 margin calculations
    margins: {
      left: photoData.marginL ? `${-fac * photoData.marginL}px` : '0px',
      right: photoData.marginR ? `${-fac * photoData.marginR}px` : '0px',
      top: photoData.marginT ? `${-fac * photoData.marginT}px` : '0px',
      bottom: photoData.marginB ? `${-fac * photoData.marginB}px` : '0px',
    },

    // Template 3 positioning offsets
    shadowOffset: `${fac * 1}px`,
    innerOffset: `${fac * 0.5}px`,
  };
};

/**
 * Template 1 Renderer - Basic rectangular photo
 */
const Template1: React.FC<{ 
  photoData: PhotoData; 
  dimensions: ReturnType<typeof calculateDimensions>; 
  id?: string; 
  className?: string; 
}> = ({ photoData, dimensions, id, className }) => (
  <div 
    id={id}
    className={className}
    style={{
      position: 'absolute',
      left: dimensions.left,
      top: dimensions.top,
      borderRadius: dimensions.borderRadius
    }}
  >
    <img
      src={photoData.photo}
      alt="User profile photo"
      style={{
        height: dimensions.photoSize,
        width: dimensions.photoSize,
        borderRadius: dimensions.borderRadius,
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
      }}
    />
  </div>
);

/**
 * Template 2 Renderer - Container with margins and background
 */
const Template2: React.FC<{ 
  photoData: PhotoData; 
  dimensions: ReturnType<typeof calculateDimensions>; 
  bg: string;
  id?: string; 
  className?: string; 
}> = ({ photoData, dimensions, bg, id, className }) => (
  <div
    id={id}
    className={className}
    style={{
      position: 'absolute',
      left: dimensions.left,
      top: dimensions.top,
    }}
  >
    <div
      style={{
        width: dimensions.wrapperSize,
        height: dimensions.wrapperSize,
        background: bg,
        borderRadius: dimensions.borderRadius,
        border: `${dimensions.borderWidth} solid white`,
        overflow: 'hidden',
      }}
    >
      <img
        src={photoData.photo}
        alt="User profile photo"
        style={{
          height: dimensions.photoSize,
          width: dimensions.photoSize,
          objectFit: 'cover',
          objectPosition: 'center',
          borderRadius: dimensions.borderRadius,
          display: 'block',
        }}
      />
    </div>
  </div>
);

/**
 * Template 3 Renderer - Photo with shadow/background effect
 */
const Template3: React.FC<{ 
  photoData: PhotoData; 
  dimensions: ReturnType<typeof calculateDimensions>; 
  bg: string;
  id?: string; 
  className?: string; 
}> = ({ photoData, dimensions, bg, id, className }) => (
  <div
    id={id}
    className={className}
    style={{
      position: 'absolute',
      left: dimensions.left,
      top: dimensions.top,
      borderRadius: dimensions.borderRadius,
      width: dimensions.shadowSize,
      height: dimensions.shadowSize,
      border: dimensions.borderWidth + ` solid ${bg}`,
      overflow: 'hidden',
    }}
  >
    
      <img
        src={photoData.photo}
        alt="User profile photo"
        style={{
          height: dimensions.photoSize,
          width: dimensions.photoSize,
          objectFit: 'cover',
          objectPosition: 'center',
          borderRadius: dimensions.borderRadius,
          top: dimensions.shadowOffset,
          left: dimensions.shadowOffset,
          position: 'absolute',
          zIndex: 1,
          display: 'block' 
          }}/>

  </div>
);

/**
 * Template 4 Renderer - Circular photo
 */
const Template4: React.FC<{ 
  photoData: PhotoData; 
  dimensions: ReturnType<typeof calculateDimensions>; 
  id?: string; 
  className?: string; 
}> = ({ photoData, dimensions, id, className }) => (
  <div
    id={id}
    className={className}
    style={{
      position: 'absolute',
      left: dimensions.left,
      top: dimensions.top,
      zIndex: 2
    }}
  >
    <img
      src={photoData.photo}
      alt="User profile photo"
      style={{
        height: dimensions.photoSize,
        width: dimensions.photoSize,
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '50%',
        display: 'block',
      }}
    />
  </div>
);

/**
 * Template 5 Renderer - Circular photo with semi-transparent border
 */
const Template5: React.FC<{ 
  photoData: PhotoData; 
  dimensions: ReturnType<typeof calculateDimensions>; 
  id?: string; 
  className?: string; 
}> = ({ photoData, dimensions, id, className }) => (
  <div
    id={id}
    className={className}
    style={{
      position: 'absolute',
      left: dimensions.left,
      top: dimensions.top,
    }}
  >
    <img
      src={photoData.photo}
      alt="User profile photo"
      style={{
        height: dimensions.photoSize,
        width: dimensions.photoSize,
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '50%',
        border: `${dimensions.borderWidth} solid ${dimensions.borderColor}`,
        display: 'block',
      }}
    />
  </div>
);

/**
 * UserPhoto Component
 * 
 * A consolidated, high-performance component for rendering user profile photos
 * with 5 distinct visual templates. Features optimized calculations, template-based
 * rendering, and full TypeScript support.
 * 
 * @param props - UserPhotoProps interface
 * @returns JSX.Element - Rendered user photo component
 * 
 * @example
 * ```tsx
 * <UserPhoto
 *   fac={1.2}
 *   template={3}
 *   props={{
 *     height: 80,
 *     photo: "https://example.com/photo.jpg",
 *     top: 10,
 *     r: 8
 *   }}
 *   bg="rgb(66, 139, 202)"
 *   font="#333333"
 *   id="user-photo-1"
 * />
 * ```
 */
export const UserPhoto: React.FC<UserPhotoProps> = ({
  fac,
  props: photoData,
  bg,
  font,
  template = 1,
  id,
  className,
}) => {
  // Validate template value
  const validTemplate = (template >= 1 && template <= 5) ? template : 1;
  const config = TEMPLATE_CONFIG[validTemplate];

  // Memoize expensive calculations
  const dimensions = useMemo(
    () => calculateDimensions(fac, photoData, config, bg),
    [fac, photoData, config, bg]
  );

  // Handle missing or invalid photo
  if (!photoData.photo) {
    return (
      <div
        id={id}
        className={className}
        style={{
          position: 'absolute',
          left: dimensions.left,
          top: dimensions.top,
          width: dimensions.photoSize,
          height: dimensions.photoSize,
          backgroundColor: '#f0f0f0',
          border: '1px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${fac * 12}px`,
          color: '#666',
          borderRadius: config.isCircular ? '50%' : dimensions.borderRadius,
        }}
        title="No photo available"
      >
        No Photo
      </div>
    );
  }

  // Render appropriate template
  switch (validTemplate) {
    case 1:
      return <Template1 photoData={photoData} dimensions={dimensions} id={id} className={className} />;

    case 2:
      return <Template2 photoData={photoData} dimensions={dimensions} bg={bg} id={id} className={className} />;

    case 3:
      return <Template3 photoData={photoData} dimensions={dimensions} bg={bg} id={id} className={className} />;

    case 4:
      return <Template4 photoData={photoData} dimensions={dimensions} id={id} className={className} />;

    case 5:
      return <Template5 photoData={photoData} dimensions={dimensions} id={id} className={className} />;

    default:
      return <Template1 photoData={photoData} dimensions={dimensions} id={id} className={className} />;
  }
};

/**
 * Default export for convenience
 */
export default UserPhoto;

/**
 * Helper function to create photo data objects
 */
export const createPhotoData = (
  height: number,
  photo: string,
  top: number,
  options?: Partial<Omit<PhotoData, 'height' | 'photo' | 'top'>>
): PhotoData => ({
  height,
  photo,
  top,
  ...options,
});

/**
 * Predefined photo configurations for common use cases
 */
export const PhotoPresets = {
  small: (photo: string, top: number = 0) => createPhotoData(40, photo, top),
  medium: (photo: string, top: number = 0) => createPhotoData(80, photo, top),
  large: (photo: string, top: number = 0) => createPhotoData(120, photo, top),
  withBorder: (photo: string, top: number = 0, radius: number = 8) => 
    createPhotoData(80, photo, top, { r: radius }),
  withMargins: (photo: string, top: number = 0, margin: number = 5) => 
    createPhotoData(80, photo, top, { 
      marginL: margin, 
      marginR: margin, 
      marginT: margin, 
      marginB: margin 
    }),
} as const;