// Optimized porInfo.tsx using the new modular system
import React from 'react';
import { IconType } from 'react-icons';
import { FaUserCog } from 'react-icons/fa';
import {
  RightBlockHeading,
  RightBlockLogo,
  RightBlockPor,
  BlockHeading,
  BlockPor,
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

// Portfolio specific interfaces
interface PorInfoData {
  title: string;
  value: PorInfoItem[];
}

interface PorInfoItem {
  title: string;
  desc: string;
  event?: { optional: boolean };
  date?: { optional: boolean };
}

interface PorComponentProps {
  top: number;
  height: number;
  data: PorInfoItem;
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
 * Optimized Portfolio Info Component using the new modular system
 * Note: Only available for professional resume types
 */
const porInfo = (
  obj: ComponentSequenceObj,
  data: PorInfoData,
  marginSec: number,
  marginBullet: number,
  marginPage: number,
  resumeType: ResumeType = 'pro',
  template: TemplateNumber = 1
): ComponentSequenceObj => {
  
  // Restrict to professional resume types only
  if (resumeType === 'fresher' || resumeType === 'expert') {
    console.warn('porInfo is only available for professional resume types');
    return obj;
  }

  // Initialize the modular system
  const templateConfigManager = TemplateConfigManager.getInstance();
  const pageManager = PageManager.getInstance();
  const geometricCalculator = GeometricCalculator.getInstance();

  // Get configurations
  const templateConfig = templateConfigManager.getTemplateConfig(resumeType, template);

  // Initialize pages structure
  pageManager.initializePages(obj);

  let { countL, countR, leftH, rightH } = obj;
  const tH = 2; // Fixed text height spacing

  // ============ OVERFLOW THRESHOLD CALCULATOR ============
  const getOverflowThreshold = (): number => {
    if (template === 3) {
      return countR * 297 - 10; // Template 3 uses special threshold
    }
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
    }
*/
  }

  // ============ LOGO AND HEADING COMPONENTS ============
  const addLogoAndHeading = (): void => {
    const currentPageIndex = obj.currentPage || 0;
    
    const logoProps: LogoProps = {
      top: rightH + marginSec,
      name: FaUserCog
    };

    const headingProps: HeadingProps = {
      top: rightH + marginSec,
      name: data.title,
      height: 13
    };

    const section = countR > countL ? 'right' : 'right';
    
    // Add logo
    pageManager.addToPage(obj, currentPageIndex, section, RightBlockLogo, "por-logo", logoProps);
    
    // Use BlockHeading for templates 2,3,4,5 in block context
    const headingComponent = (countR > countL && [2, 3, 4, 5].includes(template)) 
      ? BlockHeading 
      : RightBlockHeading;
      
    pageManager.addToPage(obj, currentPageIndex, section, headingComponent, "por", headingProps);
  };

  addLogoAndHeading();

  // Template-specific height increment
  const getHeightIncrement = (): number => {
    if (template === 5) {
      return 10; // Template 5 uses 10px increment
    }
    return 13; // Templates 1,2,3,4 use 13px increment
  };

  rightH += marginSec + getHeightIncrement();

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
    rightH += marginSec + 13; // Always use 13 for re-added heading
  }

  // ============ PROCESS EACH PORTFOLIO ITEM ============
  data.value.forEach((portfolioItem: PorInfoItem, index: number) => {
    const itemId = `por-item-${index}`;
    
    // Calculate height based on context and text content
    const calculateHeight = (isBlockContext: boolean): number => {
      const widthParam = isBlockContext ? "183px" : "113px";
      
      try {
        const [descHeight] = textWidthL("calibri", "normal", "3.2pt", widthParam, portfolioItem.desc);
        const [titleHeight] = textWidth("calibri", "normal", "3.2pt", widthParam, portfolioItem.title);
        return descHeight + titleHeight;
      } catch (error) {
        console.error('Error calculating portfolio item height:', error);
        return 30; // fallback height
      }
    };

    const height = calculateHeight(countR > countL);
    
    const porProps: PorComponentProps = {
      top: rightH + marginSec,
      height,
      data: portfolioItem
    };

    // Add portfolio component
    const porComponent = (countR > countL) ? BlockPor : RightBlockPor;
    const currentPageIndex = obj.currentPage || 0;
    
    pageManager.addToPage(obj, currentPageIndex, 'right', porComponent, itemId, porProps);

    // Update rightH with consistent spacing
    rightH += marginSec + height + tH;

    // ============ HANDLE PORTFOLIO ITEM OVERFLOW ============
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
      const newPorProps: PorComponentProps = {
        top: rightH + marginSec,
        height: newHeight,
        data: portfolioItem
      };

      const newPorComponent = (countR > countL) ? BlockPor : RightBlockPor;
      pageManager.addToPage(obj, obj.currentPage, 'right', newPorComponent, itemId, newPorProps);
      rightH += marginSec + newHeight + tH;
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
    
    if (countR === 1) {
      // Special case for first page
      const specialVLProps: VLProps = { top: 60, height: 230 };
      pageManager.addToPage(obj, vlPageIndex, vlSection, VL, 'vl-por', specialVLProps);
    } else {
      pageManager.addToPage(obj, vlPageIndex, vlSection, VL, 'vl-por', vlProps);
    }
  }

  // ============ FINALIZATION ============
  
  // Final spacing adjustment
  rightH += 4;
/*
  // Final page1 assignment for single page cases
  if (countR === 1 && obj.pages[0]) {
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

export default porInfo;
export type { ResumeType, TemplateNumber, PorInfoData, PorInfoItem };
