// Optimized publicationsInfo.tsx using the new modular system
import React from 'react';
import { IconType } from 'react-icons';
import { FaBook } from 'react-icons/fa';
import {
  RightBlockHeading,
  RightBlockLogo,
  RightBlockPub,
  BlockHeading,
  BlockPub,
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

// Publications specific interfaces
interface PublicationsInfoData {
  title: string;
  value: PublicationItem[];
}

interface PublicationItem {
  title: string; // Note: original code uses "titile" typo - keeping for compatibility
  journal: string;
  event?: { optional: boolean };
  date?: { optional: boolean };
}

interface PubComponentProps {
  top: number;
  height: number;
  data: PublicationItem;
  line?: boolean; // Template 2 and 3 specific
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
 * Optimized Publications Info Component using the new modular system
 * Note: Only available for professional and expert resume types
 */
const publicationsInfo = (
  obj: ComponentSequenceObj,
  data: PublicationsInfoData,
  marginSec: number,
  marginBullet: number,
  marginPage: number,
  resumeType: ResumeType = 'pro',
  template: TemplateNumber = 1
): ComponentSequenceObj => {
  
  // Restrict to pro and expert resume types only
  if (resumeType === 'fresher') {
    console.warn('publicationsInfo is not available for fresher resume types');
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

  // ============ TEMPLATE-SPECIFIC CONFIGURATIONS ============
  const getTH = (): number => {
    if (template === 5) {
      return 2; // Template 5 uses tH = 2
    }
    return 0; // Templates 1,2,3,4 use tH = 0
  };

  const getMarginMultiplier = (): number => {
    if (template === 5) {
      return 1; // Template 5 uses marginSec directly
    }
    return 2; // Templates 1,2,3,4 use 2*marginSec
  };

  const getHeadingHeightIncrement = (): number => {
    if (template === 5) {
      return 3; // Template 5 uses 3px increment
    }
    return 13; // Templates 1,2,3,4 use 13px increment
  };

  const tH = getTH();
  const marginMultiplier = getMarginMultiplier();
  const headingIncrement = getHeadingHeightIncrement();

  // ============ OVERFLOW THRESHOLD CALCULATOR ============
  const getOverflowThreshold = (): number => {
    if (resumeType === 'expert' && template === 3) {
      return countR * 297 - 10; // Expert template 3 uses special threshold
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
      top: rightH + marginMultiplier * marginSec,
      name: FaBook
    };

    const headingProps: HeadingProps = {
      top: rightH + marginMultiplier * marginSec,
      name: data.title,
      height: 13
    };

    const section = countR > countL ? 'right' : 'right';
    
    // Add logo
    pageManager.addToPage(obj, currentPageIndex, section, RightBlockLogo, "pub-logo", logoProps);
    
    // Use BlockHeading for pro template 2&3 and expert template 2&3 in block context
    const shouldUseBlockHeading = countR > countL && 
      ((resumeType === 'pro' && [2, 3].includes(template)) ||
       (resumeType === 'expert' && [2, 3].includes(template)));
    
    const headingComponent = shouldUseBlockHeading ? BlockHeading : RightBlockHeading;
    pageManager.addToPage(obj, currentPageIndex, section, headingComponent, "pub", headingProps);
  };

  addLogoAndHeading();
  rightH += marginMultiplier * marginSec + headingIncrement;

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
    rightH += marginMultiplier * marginSec + headingIncrement;
  }

  // ============ PROCESS EACH PUBLICATION ITEM ============
  data.value.forEach((publication: PublicationItem, index: number) => {
    const itemId = `pub-item-${index}`;
    
    // Template 2&3 specific line logic
    let line: boolean | undefined;
    if ([2, 3].includes(template)) {
      line = index !== data.value.length - 1; // Last item has no line
    }

    // Calculate height based on context and text content
    const calculateHeight = (isBlockContext: boolean): number => {
      const widthParam = isBlockContext ? "183px" : "113px";
      
      try {
        // Note: Preserving original typo "titile" for compatibility
        const titleText = (publication as any).titile || publication.title;
        const [journalHeight] = textWidth("calibri", "normal", "3.2pt", widthParam, publication.journal);
        const [titleHeight] = textWidth("calibri", "normal", "3.2pt", widthParam, titleText);
        return journalHeight + titleHeight;
      } catch (error) {
        console.error('Error calculating publication height:', error);
        return 35; // fallback height
      }
    };

    const height = calculateHeight(countR > countL);
    
    const pubProps: PubComponentProps = {
      top: template === 5 ? rightH + marginMultiplier * marginSec + tH : rightH + marginMultiplier * marginSec,
      height,
      data: publication,
      ...(line !== undefined && { line })
    };

    // Add publication component
    const pubComponent = (countR > countL) ? BlockPub : RightBlockPub;
    const currentPageIndex = obj.currentPage || 0;
    
    pageManager.addToPage(obj, currentPageIndex, 'right', pubComponent, itemId, pubProps);

    // Update rightH with template-specific spacing
    const heightIncrement = template === 5
      ? marginMultiplier * marginSec + tH + height
      : marginMultiplier * marginSec + height;
    
    rightH += heightIncrement;

    // ============ HANDLE PUBLICATION ITEM OVERFLOW ============
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
      const newPubProps: PubComponentProps = {
        top: template === 5 ? rightH + marginMultiplier * marginSec + tH : rightH + marginMultiplier * marginSec,
        height: newHeight,
        data: publication,
        ...(line !== undefined && { line })
      };

      const newPubComponent = (countR > countL) ? BlockPub : RightBlockPub;
      pageManager.addToPage(obj, obj.currentPage, 'right', newPubComponent, itemId, newPubProps);
      
      const newHeightIncrement = template === 5
        ? marginMultiplier * marginSec + tH + newHeight
        : marginMultiplier * marginSec + newHeight;
      
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
    
    if (countR === 1) {
      // Special case for first page
      const specialVLProps: VLProps = { top: 60, height: 230 };
      pageManager.addToPage(obj, vlPageIndex, vlSection, VL, 'vl-pub', specialVLProps);
      /*
      if (obj.pages[0]) {
        obj.page1 = {
          left: { ...obj.pages[0].left },
          right: { ...obj.pages[0].right }
        };
      }
      */
    } else {
      pageManager.addToPage(obj, vlPageIndex, vlSection, VL, 'vl-pub', vlProps);
    }
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

export default publicationsInfo;
export type { ResumeType, TemplateNumber, PublicationsInfoData, PublicationItem };
