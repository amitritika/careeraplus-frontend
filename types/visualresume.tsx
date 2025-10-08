export type ResumeType = 'fresher' | 'pro' | 'expert';

export type TemplateNumber = 1 | 2 | 3 | 4 | 5;

export interface PageStructure {
  left: {
    components: React.ComponentType<any>[];
    ids: string[];
    props: any[];
  };
  right: {
    components: React.ComponentType<any>[];
    ids: string[];
    props: any[];
  };
  block: {
    components: React.ComponentType<any>[];
    ids: string[];
    props: any[];
  };
}

// Component sequence object interface
export interface ComponentSequenceObj {
  left: {
    components: React.ComponentType<any>[];
    ids: string[];
    props: any[];
  };
  right: {
    components: React.ComponentType<any>[];
    ids: string[];
    props: any[];
  };
  block: {
    components: React.ComponentType<any>[];
    ids: string[];
    props: any[];
  };
  countL: number;
  countR: number;
  leftH: number;
  rightH: number;
  pages: PageStructure[];
  currentPage: number;
    
}

// Component props interfaces
export interface BaseComponentProps {
  top: number;
  height?: number;
  resumeType: ResumeType;
  template: TemplateNumber;
}

export interface LogoComponentProps extends BaseComponentProps {
  name: any; // IconType
}

export interface HeadingComponentProps extends BaseComponentProps {
  name: string;
  height: number;
  icon?: any; // Optional icon for specific templates
}

export interface VLComponentProps extends BaseComponentProps {
  height: number;
}

export interface ContactComponentProps extends BaseComponentProps {
  name: string;
  icon: any;
  height: number;
}

// Template configuration
export interface TemplateConfig {
  marginMultiplier: number;
  headingIncrement: number;
  heightAdjustment: number;
  useBlockHeading: boolean;
  hasLineSupport: boolean;
  template3Offset: number;
  photoConfig: {
    height: number;
    top: number;
    marginConfig?: any;
  };
  vlConfig?: {
    position: 'left' | 'right';
    id: string;
    top?: number;
    height?: number;
  };
  contactConfig: {
    headingIcon?: any;
    extraSpacing?: boolean;
  };
}

// Geometric calculations interface
export interface GeometricConfig {
  pageHeight: number;
  pageWidth: number;
  marginPage: number;
  marginSec: number;
  marginBullet: number;
}