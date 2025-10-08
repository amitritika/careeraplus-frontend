// Optimized projectInfo.tsx using the new modular system
import React from 'react';
import { IconType } from 'react-icons';
import { FaFolderOpen } from 'react-icons/fa';
import {
  RightBlockHeading,
  RightBlockLogo,
  RightBlockProject,
  BlockHeading,
  BlockProject,
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
import { textWidth } from '../utils/text-measurement.utils';

// Project specific interfaces
interface ProjectData {
  title: string;
  value: ProjectItem[];
}

interface ProjectItem {
  title: string; // Note: keeping original naming for compatibility
  desc: string;
  designation?: OptionalField; // For pro/expert templates
  client?: OptionalField; // For pro/expert templates
  date?: OptionalField; // For pro/expert templates
}

interface OptionalField {
  optional: boolean;
  value?: string;
}

interface ProjectComponentProps {
  top: number;
  height: number;
  data: ProjectItem;
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
 * Optimized Project Info Component using the new modular system
 */
const projectInfo = (
  obj: ComponentSequenceObj,
  data: ProjectData,
  marginSec: number,
  marginBullet: number,
  marginPage: number,
  resumeType: ResumeType = 'fresher',
  template: TemplateNumber
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
  
  // Template-specific variables
  const tH = (resumeType !== 'fresher') ? 2 : 0;

  // Override marginSec for fresher template 4 only
  if (resumeType === 'fresher' && template === 4) {
    marginSec = 0;
  }

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
      name: FaFolderOpen
    };

    const headingProps: HeadingProps = {
      top: rightH + marginSec,
      name: data.title,
      height: 13
    };

    const section = countR > countL ? 'right' : 'right';
    
    // Add logo
    pageManager.addToPage(obj, currentPageIndex, section, RightBlockLogo, "project-logo", logoProps);
    
    // Choose heading component based on template config
    const headingComponent = (templateConfig.useBlockHeading && countR > countL) 
      ? BlockHeading 
      : RightBlockHeading;
      
    pageManager.addToPage(obj, currentPageIndex, section, headingComponent, "project", headingProps);
  };

  addLogoAndHeading();

  // Calculate heading adjustment
  const getHeadingAdjustment = (): number => {
    if (resumeType === 'pro' && template === 5) {
      return 10; // Pro template 5 uses +10 instead of +13
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
    }*/

    // Re-add logo and heading to new page
    obj.currentPage = countR - 1;
    pageManager.ensurePageExists(obj, obj.currentPage);
    addLogoAndHeading();
    rightH += marginSec + getHeadingAdjustment();
  }

  // ============ PROCESS EACH PROJECT ITEM ============
  data.value.forEach((project: ProjectItem, index: number) => {
    const itemId = `project-heading-${index}`;
    
    // Calculate line property for templates that support it
    let line: boolean | undefined;
    if ((resumeType === 'fresher' && templateConfig.hasLineSupport) ||
        (resumeType !== 'fresher' && [2, 3].includes(template))) {
      line = index !== data.value.length - 1;
    }

    // Height calculation function
    const calculateHeight = (isBlockContext: boolean): number => {
      const widthParam = isBlockContext ? "183px" : "113px";
      
      try {
        let descHeight: number, titleHeight: number;

        if (resumeType === 'fresher') {
          // Fresher templates calculation
          const [descResult] = textWidth("calibri", "normal", "3.2pt", widthParam, project.desc);
          const [titleResult] = textWidth("calibri", "normal", "3.2pt", widthParam, project.title);
          descHeight = descResult;
          titleHeight = titleResult;
          return descHeight + titleHeight + 1;
        } else {
          // Pro/Expert templates calculation
          const [descResult] = textWidth("calibri", "normal", "3.2pt", widthParam, project.desc);
          descHeight = descResult;

          if (template === 5) {
            const [titleResult] = textWidth("calibri", "bold", "3.2pt", widthParam, project.title);
            titleHeight = titleResult;
          } else {
            const [titleResult] = textWidth("calibri", "normal", "3.2pt", widthParam, project.title);
            titleHeight = titleResult;
          }
          
          return descHeight + titleHeight;
        }
      } catch (error) {
        console.error('Error calculating project height:', error);
        return 30; // fallback height
      }
    };

    const height = calculateHeight(countR > countL);
    
    const projectProps: ProjectComponentProps = {
      top: rightH + marginSec,
      height,
      data: project,
      ...(line !== undefined && { line })
    };

    // Add project component
    const projectComponent = (countR > countL) ? BlockProject : RightBlockProject;
    const currentPageIndex = obj.currentPage || 0;
    
    pageManager.addToPage(obj, currentPageIndex, 'right', projectComponent, itemId, projectProps);

    // Calculate height increment
    const calculateHeightIncrement = (): number => {
      let baseIncrement = marginSec + height;
      
      if (resumeType !== 'fresher') {
        baseIncrement += tH;
        
        // Handle optional fields (both branches currently do the same)
        if (project.designation?.optional || project.client?.optional || project.date?.optional) {
          // No additional increment needed as both branches are identical
        }
      }
      
      return baseIncrement;
    };

    rightH += calculateHeightIncrement();

    // ============ HANDLE PROJECT OVERFLOW ============
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
      // Update current page and recalculate height for new context
      obj.currentPage = countR - 1;
      pageManager.ensurePageExists(obj, obj.currentPage);
      
      const newHeight = calculateHeight(countR > countL);
      const newProjectProps: ProjectComponentProps = {
        top: rightH + marginSec,
        height: newHeight,
        data: project,
        ...(line !== undefined && { line })
      };

      pageManager.addToPage(obj, obj.currentPage, 'right', projectComponent, itemId, newProjectProps);
      rightH += marginSec + newHeight + (resumeType !== 'fresher' ? tH : 0);
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
    
    pageManager.addToPage(obj, vlPageIndex, vlSection, VL, 'vl-project', vlProps);
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

  // Final page1 assignment for pro/expert templates 2 and 5 when countR === 2
  if (resumeType !== 'fresher' && [2, 5].includes(template) && countR === 2 && obj.pages[0]) {
    obj.page1 = {
      left: { ...obj.pages[0].left },
      right: { ...obj.pages[0].right }
    };
  }
*/
  // Add final spacing for pro/expert templates
  if (resumeType !== 'fresher') {
    rightH += 4;
  }
/*
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

export default projectInfo;
export type { ResumeType, TemplateNumber, ProjectData, ProjectItem };
