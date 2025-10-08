// Optimized areaInfo.tsx using the new modular system
import React from 'react';
import { IconType } from 'react-icons';
import { FaBook } from 'react-icons/fa';
import {
  RightBlockHeading,
  RightBlockLogo,
  RightBlockArea,
  VL
} from '@/components/molecules/visualresume';
import { topicIconsList } from '../fresher/fresher'; // Import for icon mapping
// Import the new modular system
import { 
  ComponentSequenceObj, 
  ResumeType, 
  TemplateNumber 
} from '@/types/visualresume';
import { TemplateConfigManager } from '../config/template-config.manager';
import { PageManager } from '../utils/page-manager.utils';
import { GeometricCalculator } from '../utils/geometric-calculator.utils';

// Import topic icons mapping (you'll need to create this or import from your existing location)
// For now, creating a basic implementation


// Area Info specific interfaces
interface AreaInfoData {
  title: string;
  area1Topic: string;
  area2Topic: string;
  area3Topic: string;
}

interface AreaComponentProps {
  top: number;
  height?: number;
  data?: string;
  name?: string;
  logo?: IconType;
  left?: number;
}

interface LogoProps {
  top: number;
  name: IconType | string;
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
 * Optimized Area Info Component using the new modular system
 */
const areaInfo = (
  obj: ComponentSequenceObj,
  data: AreaInfoData,
  marginSec: number,
  marginBullet: number,
  marginPage: number,
  resumeType: ResumeType,
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

  // Fixed area list (area1, area2, area3)
  const areaList = ["area1", "area2", "area3"];

  // Template-specific left positioning
  const getLeftPosition = (): number => {
    if (template === 5) {
      return 6; // Template 5 uses left = 6
    }
    return 15; // Templates 1,2,3,4 use left = 15
  };

  let leftPosition = getLeftPosition();

  // ============ OVERFLOW THRESHOLD CALCULATORS ============
  const getOverflowThreshold = (): number => {
    return geometricCalculator.calculateOverflowThreshold(countR, template);
  };

  // Special initial overflow check for template 3
  const getInitialOverflowThreshold = (): number => {
    if (template === 3) {
      return (countR * 297 - 10) - 10; // Template 3 has double offset for initial check
    }
    return countR * 297;
  };

  // ============ INITIAL PAGE OVERFLOW CHECK ============
  if (rightH > getInitialOverflowThreshold()) {
    countR++;
    rightH = geometricCalculator.calculatePageHeight(countR, marginPage);
 /*   
    if (countR === 2 && obj.pages[0]) {
      obj.page1 = {
        left: { ...obj.pages[0].left },
        right: { ...obj.pages[0].right }
      };
    }
*/
  }

  // ============ LOGO AND HEADING COMPONENTS ============
  const addLogoAndHeading = (): void => {
    const currentPageIndex = obj.currentPage || 0;
    
    const logoProps: LogoProps = {
      top: rightH + marginSec,
      name: countR > countL ? "book" : FaBook // Different logo handling based on context
    };

    const headingProps: HeadingProps = {
      top: rightH + marginSec,
      name: data.title,
      height: 13
    };

    const section = countR > countL ? 'right' : 'right';
    
    // Add logo
    pageManager.addToPage(obj, currentPageIndex, section, RightBlockLogo, "area-logo", logoProps);
    
    // Add heading (area info always uses RightBlockHeading)
    pageManager.addToPage(obj, currentPageIndex, section, RightBlockHeading, "area-heading", headingProps);
  };

  addLogoAndHeading();
  rightH += marginSec + 13;

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
    rightH += marginSec + 13;
  }

  // ============ PROCESS EACH AREA ITEM ============
  areaList.forEach((areaKey: string, index: number) => {
    const itemId = `area-item-${index}`;
    const topicKey = `${areaKey}Topic` as keyof AreaInfoData;
    const topicValue = data[topicKey];

    if (countR > countL) {
      // Block context - simplified props
      const areaProps: AreaComponentProps = {
        top: rightH + marginSec,
        height: 10,
        data: areaKey
      };

      const currentPageIndex = obj.currentPage || 0;
      pageManager.addToPage(obj, currentPageIndex, 'right', RightBlockArea, itemId, areaProps);
      rightH += marginSec + 10;

    } else {
      // Right context - complex props with icon mapping
      const areaProps: AreaComponentProps = {
        top: rightH + marginSec,
        name: topicValue,
        logo: topicIconsList[topicValue] || FaBook, // Map from topicIconsList with fallback
        left: leftPosition
      };

      const currentPageIndex = obj.currentPage || 0;
      pageManager.addToPage(obj, currentPageIndex, 'right', RightBlockArea, itemId, areaProps);

      // ============ HANDLE AREA ITEM OVERFLOW ============
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
        
        // Determine new props based on context
        const newAreaProps: AreaComponentProps = (countR > countL) ? {
          top: rightH + marginSec,
          height: 10,
          data: areaKey
        } : {
          top: rightH + marginSec,
          name: topicValue,
          logo: topicIconsList[topicValue] || FaBook,
          left: leftPosition
        };

        pageManager.addToPage(obj, obj.currentPage, 'right', RightBlockArea, itemId, newAreaProps);
        rightH += marginSec + (countR > countL ? 10 : 0);
      }

      // Template-specific left increment
      const getLeftIncrement = (): number => {
        if (template === 5) {
          return 36; // Template 5 uses increment of 36
        }
        return 32; // Templates 1,2,3,4 use increment of 32
      };

      leftPosition += getLeftIncrement();
    }
  });

  // ============ ADD FINAL SPACING ============
  rightH += marginSec + 15;

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
    
    if (countR === 1) {
      // Special case for first page
      const specialVLProps: VLProps = { top: 60, height: 230 };
      pageManager.addToPage(obj, vlPageIndex, vlSection, VL, 'vl-area', specialVLProps);
      /*
      if (obj.pages[0]) {
        obj.page1 = {
          left: { ...obj.pages[0].left },
          right: { ...obj.pages[0].right }
        };
      }
        */
    } else {
      pageManager.addToPage(obj, vlPageIndex, vlSection, VL, 'vl-area', vlProps);
    }
  } else {
    // Non-template1 handling - add height props
    /*
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

export default areaInfo;
export type { ResumeType, TemplateNumber, AreaInfoData };
