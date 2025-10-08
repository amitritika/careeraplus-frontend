// Optimized extraInfo.tsx using the new modular system
import React from 'react';
import { IconType } from 'react-icons';
import { FaCertificate, FaAward } from 'react-icons/fa';
import {
  RightBlockHeading,
  RightBlockLogo,
  RightBlockBulletSmall,
  BlockHeading,
  BlockBulletSmall,
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

// Extra Info specific interfaces
interface ExtraInfoData {
  title: string;
  value: string[];
}

interface BulletComponentProps {
  top: number;
  height: number;
  name?: string;
  data?: string;
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
 * Optimized Extra Info Component using the new modular system
 */
const extraInfo = (
  obj: ComponentSequenceObj,
  data: ExtraInfoData,
  marginSec: number,
  marginBullet: number,
  marginPage: number,
  logo: IconType,
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

  // Special marginBullet override for fresher template 1
  if (resumeType === 'fresher' && template === 1) {
    marginBullet = 0;
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
    }
      */
  }

  // ============ DETERMINE LOGO BASED ON TEMPLATE ============
  const getLogoIcon = (): IconType => {
    if (resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) {
      return FaAward;
    }
    return logo;
  };

  const logoIcon = getLogoIcon();

  // ============ LOGO AND HEADING COMPONENTS ============
  const addLogoAndHeading = (): void => {
    const currentPageIndex = obj.currentPage || 0;
    
    const logoProps: LogoProps = {
      top: rightH + marginSec,
      name: logoIcon
    };

    const headingProps: HeadingProps = {
      top: rightH + marginSec,
      name: data.title,
      height: 13
    };

    const section = countR > countL ? 'right' : 'right';
    
    // Add logo
    pageManager.addToPage(obj, currentPageIndex, section, RightBlockLogo, "extra-logo", logoProps);
    
    // Choose heading component based on template config
    const headingComponent = (templateConfig.useBlockHeading && countR > countL) 
      ? BlockHeading 
      : RightBlockHeading;
      
    pageManager.addToPage(obj, currentPageIndex, section, headingComponent, "extra", headingProps);
  };

  addLogoAndHeading();
  rightH += marginSec + 13;

  // ============ HANDLE HEADING OVERFLOW (SELECTIVE) ============
  const shouldHandleHeadingOverflow = (): boolean => {
    if (resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) {
      return false; // Heading overflow logic is disabled for these templates
    }
    return true;
  };

  if (shouldHandleHeadingOverflow() && rightH > getOverflowThreshold()) {
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

  // ============ PROCESS EACH EXTRA INFO ITEM ============
  data.value.forEach((item: string, index: number) => {
    // Special marginSec override for pro template 5
    if (resumeType === 'pro' && template === 5) {
      marginSec = 1;
    }

    const itemId = `extra-item-${index}`;
    
    // Calculate line property for templates that support it
    let line: boolean | undefined;
    if (resumeType !== 'fresher' && template === 2) {
      line = index !== data.value.length - 1; // Last item has no line
    } else if ((resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) ||
               (resumeType !== 'fresher' && template === 3)) {
      line = index !== data.value.length - 1; // Last item has no line
    }

    // Calculate text width and height based on context
    const calculateHeight = (isBlockContext: boolean): number => {
      const widthParam = isBlockContext ? "183px" : "113px";
      
      try {
        const [height] = textWidth("calibri", "normal", "3.2pt", widthParam, item);
        
        // Special height calculation for templates 1 and 4 when in block context
        if (isBlockContext && [1, 4].includes(template)) {
          return (Math.floor(item.length / 100) + 2) * 5;
        }
        
        return height;
      } catch (error) {
        console.error('Error calculating text width for extra info:', error);
        return 15; // fallback height
      }
    };

    const height = calculateHeight(countR > countL);
    
    const bulletProps: BulletComponentProps = {
      top: rightH + marginSec,
      height,
      name: item,
      ...(line !== undefined && { line })
    };

    // Add bullet component
    const bulletComponent = (countR > countL) ? BlockBulletSmall : RightBlockBulletSmall;
    const currentPageIndex = obj.currentPage || 0;
    
    pageManager.addToPage(obj, currentPageIndex, 'right', bulletComponent, itemId, bulletProps);
    rightH += marginSec + height;

    // ============ HANDLE BULLET ITEM OVERFLOW ============
    if (rightH > getOverflowThreshold()) {
      countR++;
      
      // Special line adjustment for templates with line support
      if (line !== undefined && obj.pages[currentPageIndex]) {
        const props = obj.pages[currentPageIndex].right.props;
        if (props.length > 1) {
          const lastProp = props[props.length - 2];
          if (lastProp && typeof lastProp === 'object' && 'line' in lastProp) {
            (lastProp as any).line = false;
          }
        }
      }

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
      
      const newHeight = calculateHeight(countR > countL);
      const newBulletProps: BulletComponentProps = {
        top: rightH + marginSec,
        height: newHeight,
        data: item, // Using 'data' for consistency with original overflow logic
        ...(line !== undefined && { line })
      };

      const newBulletComponent = (countR > countL) ? BlockBulletSmall : RightBlockBulletSmall;
      pageManager.addToPage(obj, obj.currentPage, 'right', newBulletComponent, itemId, newBulletProps);
      rightH += marginSec + newHeight;
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
    
    pageManager.addToPage(obj, vlPageIndex, vlSection, VL, 'vl-extra', vlProps);
/*
    // Handle page1 assignment for template 1
    if (countR === 1 && obj.pages[0]) {
      obj.page1 = {
        left: { ...obj.pages[0].left },
        right: { ...obj.pages[0].right }
      };
    }*/
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

export default extraInfo;
export type { ResumeType, TemplateNumber, ExtraInfoData };
