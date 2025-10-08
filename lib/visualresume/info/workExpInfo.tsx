// Optimized workExpInfo.tsx using the new modular system
import React from 'react';
import { IconType } from 'react-icons';
import { FaCog } from 'react-icons/fa';
import {
  RightBlockHeading,
  RightBlockLogo,
  RightBlockWorkExp,
  RightBlockBullet,
  BlockHeading,
  BlockBullet,
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
import { textWidth, textWidthL } from '../utils/text-measurement.utils';

// Work Experience specific interfaces
interface WorkExpData {
  title: string;
  value: WorkExpItem[];
}

interface WorkExpItem {
  org: string;
  type?: string; // For fresher templates
  designation?: string; // For pro/expert templates
  startDate: string;
  endDate: string;
  desc?: string; // For fresher templates
  role?: string[]; // For pro/expert templates
}

interface WorkExpComponentProps {
  top: number;
  height: number;
  org: string;
  type?: string;
  designation?: string;
  startD: string;
  endD: string;
  desc?: string;
  role?: boolean;
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

interface BulletProps {
  top: number;
  name: string;
  height: number;
  line?: boolean;
}

interface VLProps {
  top: number;
  height: number;
}

/**
 * Optimized Work Experience Component using the new modular system
 */
const workExpInfo = (
  obj: ComponentSequenceObj,
  data: WorkExpData,
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
      // Create page1 compatibility
      obj.page1 = {
        left: { ...obj.pages[0].left },
        right: { ...obj.pages[0].right }
      };
    } */
  }
   

  // ============ LOGO AND HEADING COMPONENTS ============
  const addLogoAndHeading = (): void => {
    const currentPageIndex = obj.currentPage || 0;
    
    const logoProps: LogoProps = {
      top: rightH + marginSec,
      name: FaCog
    };

    const headingProps: HeadingProps = {
      top: rightH + marginSec,
      name: data.title,
      height: 13
    };

    const section = countR > countL ? 'right' : 'right'; // Always use right for work experience
    
    // Add logo
    pageManager.addToPage(obj, currentPageIndex, section, RightBlockLogo, "workex-logo", logoProps);
    
    // Choose heading component based on template config
    const headingComponent = (templateConfig.useBlockHeading && countR > countL) 
      ? BlockHeading 
      : RightBlockHeading;
      
    pageManager.addToPage(obj, currentPageIndex, section, headingComponent, "workex", headingProps);
  };

  addLogoAndHeading();

  // Calculate heading adjustment
  const headingAdjustment = templateConfig.heightAdjustment;
  rightH += marginSec + headingAdjustment;

  // ============ PROCESS EACH WORK EXPERIENCE ITEM ============
  data.value.forEach((workExp: WorkExpItem, index: number) => {
    const itemId = `workex-heading-${index}`;
    
    // Calculate work experience props based on resume type
    const getWorkExpProps = (): WorkExpComponentProps => {
      const baseProps: WorkExpComponentProps = {
        top: rightH + marginSec,
        height: resumeType === 'fresher' ? 12 : 14,
        org: workExp.org,
        startD: workExp.startDate,
        endD: workExp.endDate
      };

      if (resumeType === 'fresher') {
        // Calculate description height for fresher templates
        try {
          const [height] = textWidth("calibri", "normal", "3.2pt", "113px", workExp.desc || "");
          baseProps.height = 12 + height;
          baseProps.type = workExp.type;
          baseProps.desc = workExp.desc;
          
          // Add line property for specific templates
          if (templateConfig.hasLineSupport) {
            baseProps.line = index !== data.value.length - 1;
          }
        } catch (error) {
          console.error('Error calculating text width for fresher work experience:', error);
          baseProps.height = 20; // fallback
        }
      } else {
        // Pro/Expert templates
        baseProps.designation = workExp.designation;
        baseProps.role = workExp.role && workExp.role.length > 0;
      }

      return baseProps;
    };

    const workExpProps = getWorkExpProps();
    const currentPageIndex = obj.currentPage || 0;
    const section = countR > countL ? 'right' : 'right';

    // Add work experience component
    pageManager.addToPage(obj, currentPageIndex, section, RightBlockWorkExp, itemId, workExpProps);
    rightH += marginSec + workExpProps.height;

    // ============ HANDLE PAGE OVERFLOW FOR WORK EXPERIENCE ============
    if (rightH > getOverflowThreshold()) {
      countR++;
      rightH = geometricCalculator.calculatePageHeight(countR, marginPage);
      
      // Handle page overflow by moving component to new page
      if (obj.pages[currentPageIndex]) {
        // Remove the component that didn't fit
        obj.pages[currentPageIndex].right.components.pop();
        obj.pages[currentPageIndex].right.ids.pop();
        obj.pages[currentPageIndex].right.props.pop();
      }

      // Update current page and re-add component
      obj.currentPage = countR - 1;
      pageManager.ensurePageExists(obj, obj.currentPage);
      pageManager.addToPage(obj, obj.currentPage, 'right', RightBlockWorkExp, itemId, workExpProps);
      rightH += marginSec + workExpProps.height;

      // Handle page1 assignment
      /*
      if (countR === 2 && obj.pages[0]) {
        obj.page1 = {
          left: { ...obj.pages[0].left },
          right: { ...obj.pages[0].right }
        };
      }*/
    }

    // ============ HANDLE ROLES FOR PRO/EXPERT TEMPLATES ============
    if (resumeType !== 'fresher' && workExp.role && workExp.role.length > 0) {
      workExp.role.forEach((roleText: string, roleIndex: number) => {
        const roleId = `workex-role-${roleIndex}`;
        
        try {
          // Calculate text width based on context
          const widthParam = (countR > countL) ? "183px" : "113px";
          const [roleHeight] = textWidthL("calibri", "normal", "3.2pt", widthParam, roleText);

          // Determine line property for templates that support it
          let line: boolean | undefined;
          if ([2, 3].includes(template)) {
            line = roleIndex !== workExp.role!.length - 1;
          }

          const bulletProps: BulletProps = {
            top: rightH + marginBullet,
            name: roleText,
            height: roleHeight,
            ...(line !== undefined && { line })
          };

          const bulletComponent = (countR > countL) ? BlockBullet : RightBlockBullet;
          const currentPage = obj.currentPage || 0;
          
          pageManager.addToPage(obj, currentPage, 'right', bulletComponent, roleId, bulletProps);
          rightH += 2 * marginBullet + roleHeight;

          // Handle role overflow
          if (rightH > getOverflowThreshold()) {
            countR++;
            rightH = geometricCalculator.calculatePageHeight(countR, marginPage);
            
            // Remove component that didn't fit and re-add to new page
            if (obj.pages[currentPage]) {
              obj.pages[currentPage].right.components.pop();
              obj.pages[currentPage].right.ids.pop();
              obj.pages[currentPage].right.props.pop();
            }

            // Adjust line property of previous component if needed
            if ([2, 3].includes(template) && obj.pages[currentPage]?.right.props.length > 0) {
              const lastProp = obj.pages[currentPage].right.props[obj.pages[currentPage].right.props.length - 1] as any;
              if ('line' in lastProp) lastProp.line = false;
            }

            obj.currentPage = countR - 1;
            pageManager.ensurePageExists(obj, obj.currentPage);
            
            // Recalculate for new context if needed
            const newWidthParam = (countR > countL) ? "183px" : "113px";
            if (newWidthParam !== widthParam) {
              const [newHeight] = textWidthL("calibri", "normal", "3.2pt", newWidthParam, roleText);
              bulletProps.height = newHeight;
            }
            
            pageManager.addToPage(obj, obj.currentPage, 'right', bulletComponent, roleId, bulletProps);
            rightH += 2 * marginBullet + bulletProps.height;
          }

        } catch (error) {
          console.error('Error processing role text:', error);
          // Add fallback role with estimated height
          const fallbackProps: BulletProps = {
            top: rightH + marginBullet,
            name: roleText,
            height: 15 // fallback height
          };
          
          const currentPage = obj.currentPage || 0;
          pageManager.addToPage(obj, currentPage, 'right', RightBlockBullet, roleId, fallbackProps);
          rightH += 2 * marginBullet + 15;
        }
      });
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
    
    pageManager.addToPage(obj, vlPageIndex, vlSection, VL, 'vl-workexp', vlProps);
  }

  // ============ FINALIZATION ============
  /*
  // Final page1 assignment for non-template1 cases
  if (template !== 1 && countR === 1 && obj.pages[0]) {
    obj.page1 = {
      left: { ...obj.pages[0].left },
      right: { ...obj.pages[0].right }
    };
    
    // Maintain legacy references
    obj.left = obj.page1.left;
    obj.right = obj.page1.right;
  }*/

  // Update counts and heights
  Object.assign(obj, { countL, countR, leftH, rightH });

  return obj;
};

export default workExpInfo;
export type { ResumeType, TemplateNumber, WorkExpData, WorkExpItem };
