import React, { useMemo } from 'react';
import { 
  ResumeType, 
  TemplateNumber
} from '@/types/visualresume';
// Simple types


export interface PhotoData {
  height: number;
  photo: string;
  top: number;
  r?: number;
  marginL?: number;
  marginR?: number;
  marginT?: number;
  marginB?: number;
}

export interface UserPhotoProps {
  fac: number;
  props: PhotoData;
  bg: string;
  font: string;
  template?: TemplateNumber;
  resumeType?: ResumeType;
  id?: string;
  className?: string;
}

// All template configurations in one place
const CONFIG = {

  // Template styles
  templates: {
    1: { height: 53, left: 13, circular: false, wrapper: false, border: false },
    2: { height: 53, left: 13, circular: false, wrapper: true, border: true },
    3: {height: 40,  left: 13, circular: true, wrapper: true, border: true, shadow: true },
    4: { height: 40, left: 2, circular: true, wrapper: false, border: false },
    5: { height: 45, left: 10, circular: true, wrapper: false, border: true }
  }
} as const;

// Simple calculation helper
const calc = (fac: number, photoData: PhotoData, template: TemplateNumber, bg: string, resumeType: ResumeType) => {
  const config = CONFIG.templates[template];
  const size = fac * config.height;
  let borderColor = bg;
  // Adjust border color for template 2 if bg is rgb
  if (template === 2 && config.border) {
    borderColor = 'white'
  }
  if(template == 5 && config.border){
    borderColor = bg.replace('rgb(', 'rgba(').replace(')', ', 0.6)');
  }
  return {
    size: `${size}px`,
    left: `${fac * config.left}px`,
    top: `${fac * photoData.top}px`,
    radius: config.circular ? '50%' : photoData.r ? `${fac * photoData.r}px` : '0px',
    border: config.border ? `${fac}px solid ${borderColor}` : 'none',
    borderImage: config.border ? `${fac*0.5}px solid ${borderColor}` : 'none',
    shadowSize: template === 3 ? `${fac * (photoData.height + 4)}px` : size,
    margins: {
      left: photoData.marginL ? `${-fac * photoData.marginL}px` : '0px',
      right: photoData.marginR ? `${-fac * photoData.marginR}px` : '0px',
      top: photoData.marginT ? `${-fac * photoData.marginT}px` : '0px',
      bottom: photoData.marginB ? `${-fac * photoData.marginB}px` : '0px',
    }
  };
};

// Main component
export const UserPhoto: React.FC<UserPhotoProps> = ({
  fac,
  props: photoData,
  bg,
  font,
  template = 1,
  resumeType = 'fresher',
  id,
  className,
}) => {
  // Validate template
  const t = (template >= 1 && template <= 5) ? template : 1;
  const config = CONFIG.templates[t];
  
  // Calculate dimensions once
  const dims = useMemo(() => calc(fac, photoData, t, bg, resumeType), [fac, photoData, t, bg]);
  
  // No photo fallback
  if (!photoData.photo) {
    return (
      <div
        id={id}
        className={className}
        style={{
          position: 'absolute',
          left: dims.left,
          top: dims.top,
          width: dims.size,
          height: dims.size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: dims.radius,
          fontSize: '10px',
          color: '#666'
        }}
      >
        No Photo
      </div>
    );
  }

  // Common photo element
  const photoElement = (
    <img
      src={photoData.photo}
      alt="User Profile"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />
  );

  // Template rendering with simple if/else
  if (t === 1) {
    // Template 1: Basic photo
    return (
      <div
        id={id}
        className={className}
        style={{
          position: 'absolute',
          left: dims.left,
          top: dims.top,
          width: dims.size,
          height: dims.size,
          borderRadius: dims.radius,
          overflow: 'hidden'
        }}
      >
        {photoElement}
      </div>
    );
  }
  
  if (t === 2) {
    // Template 2: With wrapper and margins
    return (
      <div
        id={id}
        className={className}
        style={{
          position: 'absolute',
          left: dims.left,
          top: dims.top,
          width: dims.size,
          height: dims.size,
          backgroundColor: bg
        }}
      >
        <div id= {`${id}-wrapper`}
          style={{
            position: 'absolute',
            border: dims.border,
            borderRadius: dims.radius,
            overflow: 'hidden'
          }}
        >
          {photoElement}
        </div>
      </div>
    );
  }
  
  if (t === 3) {
    // Template 3: With shadow effect
    return (
      <div
        id={id}
        className={className}
        style={{
          position: 'absolute',
          left: dims.left,
          top: dims.top
        }}
      >
        {/* Shadow */}
        <div
          style={{
            position: 'absolute',
            width: dims.shadowSize,
            height: dims.shadowSize,
            borderRadius: dims.radius,
            border: dims.border,
          }}
        />
        {/* Photo */}
        <div
          style={{
            position: 'absolute',
            left: `${fac * 2}px`,
            top: `${fac * 2}px`,
            width: dims.size,
            height: dims.size,
            border: dims.borderImage,
            borderRadius: dims.radius,
            overflow: 'hidden'
          }}
        >
          {photoElement}
        </div>
      </div>
    );
  }
  
  if (t === 4) {
    // Template 4: Simple circular
    return (
      <div
        id={id}
        className={className}
        style={{
          position: 'absolute',
          left: dims.left,
          top: dims.top,
          width: dims.size,
          height: dims.size,
          borderRadius: dims.radius,
          overflow: 'hidden',
          zIndex: 2
        }}
      >
        {photoElement}
      </div>
    );
  }
  
  if (t === 5) {
    // Template 5: Circular with border
    return (
      <div
        id={id}
        className={className}
        style={{
          position: 'absolute',
          left: dims.left,
          top: dims.top,
          width: dims.size,
          height: dims.size,
          border: dims.border,
          borderRadius: dims.radius,
          overflow: 'hidden'
        }}
      >
        {photoElement}
      </div>
    );
  }

  // Default fallback (Template 1)
  return (
    <div
      id={id}
      className={className}
      style={{
        position: 'absolute',
        left: dims.left,
        top: dims.top,
        width: dims.size,
        height: dims.size,
        borderRadius: dims.radius,
        overflow: 'hidden'
      }}
    >
      {photoElement}
    </div>
  );
};

// Helper functions
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

// Quick presets
export const PhotoPresets = {
  small: (photo: string, top: number = 0) => createPhotoData(40, photo, top),
  medium: (photo: string, top: number = 0) => createPhotoData(80, photo, top),
  large: (photo: string, top: number = 0) => createPhotoData(120, photo, top)
} as const;

// Easy way to add new templates
export const addNewTemplate = (templateNumber: TemplateNumber) => {
  // Just add to CONFIG.templates and add a new if/else case above
  console.log(`To add template ${templateNumber}:`);
  console.log('1. Add config to CONFIG.templates');
  console.log('2. Add new if statement before default fallback');
  console.log('3. Add heights to CONFIG.heights if needed');
};

export default UserPhoto;
