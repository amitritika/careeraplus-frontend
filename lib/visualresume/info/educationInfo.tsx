// Optimized educationInfo.tsx using the new modular system
import React from 'react';
import { IconType } from 'react-icons';
import { FaGraduationCap } from 'react-icons/fa';
import {
  RightBlockHeading,
  RightBlockLogo,
  RightBlockEdu,
  BlockHeading,
  BlockEdu,
  VL
} from '@/components/molecules/visualresume';

// Import the new modular system
import { 
  ComponentSequenceObj, 
  ResumeType, 
  TemplateNumber 
} from '@/types/visualresume';
import { TemplateConfigManager } from '../config/template-config.manager';
import { PageManager } from '../utils/page-manager.utils';
import { GeometricCalculator } from '../utils/geometric-calculator.utils';

// Education specific interfaces
interface EducationData {
  title: string;
  value: EducationItem[];
}

interface EducationItem {
  optional: boolean;
  degree: string;
  college: string;
  year: string;
  cgpa: string;
  toggle: boolean;
}

interface EduComponentProps {
  top: number;
  height: number;
  data: EducationItem;
  line?: boolean;
}

interface LogoProps {
  top: number;
  name: IconType;
}

interface HeadingProps {
  top: number;
  name: string;
  height: number;
}

interface VLProps {
  top: number;
  height: number;
}

/**
 * Optimized Education Info Component using the new modular system
 */
const educationInfo = (
  obj: ComponentSequenceObj,
  data: EducationData,
  marginSec: number,
  marginBullet: number,
  marginPage: number,
  resumeType: ResumeType = 'fresher',
  template: TemplateNumber = 1
): ComponentSequenceObj => {
  
  // Initialize the modular system
  const templateConfigManager = TemplateConfigManager.getInstance();
  const pageManager = PageManager.getInstance();
  const geometricCalculator = GeometricCalculator.getInstance();

  // Get configurations
  const templateConfig = templateConfigManager.getTemplateConfig(resumeType, template);

  // Initialize pages structure
  pageManager.initializePages(obj);

  let { countL, countR, leftH, rightH } = obj;

  // ============ OVERFLOW THRESHOLD CALCULATOR ============
  const getOverflowThreshold = (): number => {
    return geometricCalculator.calculateOverflowThreshold(countR, template);
  };

  // ============ INITIAL PAGE OVERFLOW CHECK ============
  if (rightH > getOverflowThreshold()) {
    countR++;
    rightH = geometricCalculator.calculatePageHeight(countR, marginPage);
    /*
    if (countR === 2 && obj.pages[0]) {
      obj.page1 = {
        left: { ...obj.pages[0].left },
        right: { ...obj.pages[0].right }
      };
    }*/
  }

  // ============ LOGO AND HEADING COMPONENTS ============
  const addLogoAndHeading = (): void => {
    const currentPageIndex = obj.currentPage || 0;
    
    const logoProps: LogoProps = {
      top: rightH + marginSec,
      name: FaGraduationCap
    };

    const headingProps: HeadingProps = {
      top: rightH + marginSec,
      name: data.title,
      height: 13
    };

    const section = countR > countL ? 'right' : 'right';
    
    // Add logo
    pageManager.addToPage(obj, currentPageIndex, section, RightBlockLogo, "education-logo", logoProps);
    
    // Choose heading component based on template config
    const headingComponent = (templateConfig.useBlockHeading && countR > countL) 
      ? BlockHeading 
      : RightBlockHeading;
      
    pageManager.addToPage(obj, currentPageIndex, section, headingComponent, "education", headingProps);
  };

  addLogoAndHeading();

  // Calculate heading adjustment based on resume type and template
  const getHeadingAdjustment = (): number => {
    if (resumeType !== 'fresher' && template === 5) {
      return 10; // Pro/Expert template 5 uses +10 instead of +13
    }
    return 13;
  };

  rightH += marginSec + getHeadingAdjustment();

  // ============ HANDLE HEADING OVERFLOW ============
  if (rightH > getOverflowThreshold()) {
    countR++;
    rightH = geometricCalculator.calculatePageHeight(countR, marginPage);
    
    // Remove components that didn't fit and re-add
    const currentPageIndex = obj.currentPage || 0;
    if (obj.pages[currentPageIndex]) {
      obj.pages[currentPageIndex].right.components.splice(-2, 2);
      obj.pages[currentPageIndex].right.ids.splice(-2, 2);
      obj.pages[currentPageIndex].right.props.splice(-2, 2);
    }
/*
    if (countR === 2 && obj.pages[0]) {
      obj.page1 = {
        left: { ...obj.pages[0].left },
        right: { ...obj.pages[0].right }
      };
    }
*/
    // Re-add logo and heading to new page
    obj.currentPage = countR - 1;
    pageManager.ensurePageExists(obj, obj.currentPage);
    addLogoAndHeading();
    rightH += marginSec + getHeadingAdjustment();
  }

  // ============ PROCESS EACH EDUCATION ITEM ============
  data.value.forEach((educationItem: EducationItem, index: number) => {
    if (!educationItem.optional) return; // Skip non-optional items

    const itemId = `education-heading-${index}`;
    
    // Calculate line property for templates that support it
    let line: boolean | undefined;
    if (templateConfig.hasLineSupport) {
      line = index !== 0; // First item has no line, subsequent items do
    }

    // Get height based on context and resume type
    const getEduHeight = (isBlockContext: boolean): number => {
      if (isBlockContext) {
        return 10; // Block components consistently use height 10
      }

      // Right components have different heights based on resume type
      if (resumeType === 'fresher') {
        return 12;
      } else {
        // Pro/Expert templates use height 20
        return 20;
      }
    };

    const height = getEduHeight(countR > countL);
    
    const eduProps: EduComponentProps = {
      top: rightH + (template === 5 && resumeType !== 'fresher' ? 0 : marginSec),
      height,
      data: educationItem,
      ...(line !== undefined && { line })
    };

    // Add education component
    const eduComponent = (countR > countL) ? BlockEdu : RightBlockEdu;
    const currentPageIndex = obj.currentPage || 0;
    
    pageManager.addToPage(obj, currentPageIndex, 'right', eduComponent, itemId, eduProps);

    // Calculate height increment
    const heightIncrement = (template === 5 && resumeType !== 'fresher')
      ? height // Template 5 uses just height without marginSec
      : marginSec + height;

    rightH += heightIncrement;

    // ============ HANDLE EDUCATION ITEM OVERFLOW ============
    if (rightH > getOverflowThreshold()) {
      countR++;
      rightH = geometricCalculator.calculatePageHeight(countR, marginPage);
      
      // Handle overflow by moving component to new page
      if (obj.pages[currentPageIndex]) {
        obj.pages[currentPageIndex].right.components.pop();
        obj.pages[currentPageIndex].right.ids.pop();
        obj.pages[currentPageIndex].right.props.pop();
      }
/*
      if (countR === 2 && obj.pages[0]) {
        obj.page1 = {
          left: { ...obj.pages[0].left },
          right: { ...obj.pages[0].right }
        };
      }
*/
      // Update current page and recalculate for new context
      obj.currentPage = countR - 1;
      pageManager.ensurePageExists(obj, obj.currentPage);
      
      const newHeight = getEduHeight(countR > countL);
      const newEduProps: EduComponentProps = {
        top: rightH + (template === 5 && resumeType !== 'fresher' ? 0 : marginSec),
        height: newHeight,
        data: educationItem,
        ...(line !== undefined && { line })
      };

      const newEduComponent = (countR > countL) ? BlockEdu : RightBlockEdu;
      pageManager.addToPage(obj, obj.currentPage, 'right', newEduComponent, itemId, newEduProps);
      
      const newHeightIncrement = (template === 5 && resumeType !== 'fresher')
        ? newHeight
        : marginSec + newHeight;
      
      rightH += newHeightIncrement;
    }
  });

  // ============ ADD VL COMPONENT FOR TEMPLATE 1 ============
  if (template === 1) {
    const vlDimensions = geometricCalculator.calculateVLDimensions(
      countR, rightH, template, marginPage, marginSec
    );

    const vlProps: VLProps = {
      top: vlDimensions.top,
      height: vlDimensions.height
    };

    const vlSection = countR > countL ? 'right' : 'right';
    const vlPageIndex = obj.currentPage || 0;
    
    pageManager.addToPage(obj, vlPageIndex, vlSection, VL, 'vl-education', vlProps);
/*
    // Handle page1 assignment for template 1
    if (countR === 1 && obj.pages[0]) {
      obj.page1 = {
        left: { ...obj.pages[0].left },
        right: { ...obj.pages[0].right }
      };
    }
      */
  }

  // ============ FINALIZATION ============
  /*
  // Final page1 assignment for single page cases
  if (countR === 1 && template !== 1 && obj.pages[0]) {
    obj.page1 = {
      left: { ...obj.pages[0].left },
      right: { ...obj.pages[0].right }
    };
  }

  // Maintain legacy references
  if (obj.page1) {
    obj.left = obj.page1.left;
    obj.right = obj.page1.right;
  }
*/
  // Update counts and heights
  Object.assign(obj, { countL, countR, leftH, rightH });

  return obj;
};

export default educationInfo;
export type { ResumeType, TemplateNumber, EducationData, EducationItem };
