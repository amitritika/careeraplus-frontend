// Optimized compInfo.tsx using the new modular system
import React from 'react';
import { IconType } from 'react-icons';
import { FaUserPlus } from 'react-icons/fa';
import {
  RightBlockHeading,
  RightBlockLogo,
  RightBlockComp,
  BlockHeading,
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

// Competency specific interfaces
interface CompInfoData {
  title: string;
  value: string[];
}

interface CompComponentProps {
  top: number;
  name: string;
  left: number;
  width: number;
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

/**
 * Optimized Competency Info Component using the new modular system
 * Note: Only available for professional and expert resume types
 */
const compInfo = (
  obj: ComponentSequenceObj,
  data: CompInfoData,
  marginSec: number,
  marginBullet: number,
  marginPage: number,
  resumeType: ResumeType = 'pro',
  template: TemplateNumber = 1
): ComponentSequenceObj => {
  
  // Restrict to pro and expert resume types only
  if (resumeType === 'fresher') {
    console.warn('compInfo is not available for fresher resume type');
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
  let width = 0; // Width tracking for horizontal component layout

  // ============ OVERFLOW THRESHOLD CALCULATOR ============
  const getOverflowThreshold = (): number => {
    if (template === 3) {
      return obj.countR * 297 - 10; // Template 3 uses obj.countR instead of countR
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
      name: FaUserPlus
    };

    const headingProps: HeadingProps = {
      top: rightH + marginSec,
      name: data.title,
      height: 13
    };

    const section = countR > countL ? 'right' : 'right';
    
    // Add logo
    pageManager.addToPage(obj, currentPageIndex, section, RightBlockLogo, "comp-logo", logoProps);
    
    // Choose heading component - only use BlockHeading for pro template 2
    const headingComponent = (resumeType === 'pro' && template === 2 && countR > countL) 
      ? BlockHeading 
      : RightBlockHeading;
      
    pageManager.addToPage(obj, currentPageIndex, section, headingComponent, "comp", headingProps);
  };

  addLogoAndHeading();
  rightH += marginSec + 13;

  // ============ TEMPLATE-SPECIFIC LAYOUT PARAMETERS ============
  const getLayoutParams = () => {
    if (template === 5) {
      return {
        initialLeft: 6,
        widthThreshold: 124
      };
    }

    return {
      initialLeft: 15,
      widthThreshold: 115
    };
  };

  const { initialLeft, widthThreshold } = getLayoutParams();

  // ============ PROCESS EACH COMPETENCY ITEM ============
  data.value.forEach((competency: string, index: number) => {
    const itemId = `comp-${index}`;
    const left = initialLeft + width;
    
    try {
      // Calculate text width for horizontal layout
      const [, measuredTextWidth] = textWidth("calibri", "normal", "3.2pt", "auto", competency);
      const componentWidth = measuredTextWidth + marginBullet;
      
      // Check if current line width exceeds threshold - wrap to new line
      const newWidth = width + measuredTextWidth + 2 * marginBullet;
      
      if (newWidth > widthThreshold) {
        // Reset width tracking for new line
        width = 0;
        const newLeft = initialLeft + width;
        
        // Move to next line
        rightH += marginBullet + 5 + marginBullet;
        
        // Add component on new line
        const compProps: CompComponentProps = {
          top: rightH,
          name: competency,
          left: newLeft,
          width: componentWidth
        };

        const currentPageIndex = obj.currentPage || 0;
        pageManager.addToPage(obj, currentPageIndex, 'right', RightBlockComp, itemId, compProps);
        
        // Update width tracking for new line
        width = measuredTextWidth + 2 * marginBullet;
        
      } else {
        // Add component on current line
        const compProps: CompComponentProps = {
          top: rightH,
          name: competency,
          left: left,
          width: componentWidth
        };

        const currentPageIndex = obj.currentPage || 0;
        pageManager.addToPage(obj, currentPageIndex, 'right', RightBlockComp, itemId, compProps);
        
        // Update width tracking
        width = newWidth;
      }

      // ============ HANDLE PAGE OVERFLOW ============
      const overflowThreshold = getOverflowThreshold();
      
      if (rightH + 20 > overflowThreshold) { // Add some buffer for component height
        countR++;
        rightH = geometricCalculator.calculatePageHeight(countR, marginPage);
        
        // Handle page overflow by moving component to new page
        const currentPageIndex = obj.currentPage || 0;
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
        // Reset width for new page and re-add component
        width = 0;
        obj.currentPage = countR - 1;
        pageManager.ensurePageExists(obj, obj.currentPage);
        
        const newCompProps: CompComponentProps = {
          top: rightH,
          name: competency,
          left: initialLeft,
          width: componentWidth
        };

        pageManager.addToPage(obj, obj.currentPage, 'right', RightBlockComp, itemId, newCompProps);
        width = measuredTextWidth + 2 * marginBullet;
      }

    } catch (error) {
      console.error('Error calculating text width for competency:', error);
      
      // Fallback: Add component with estimated width
      const fallbackProps: CompComponentProps = {
        top: rightH,
        name: competency,
        left: left,
        width: competency.length * 4 + marginBullet // Simple estimation
      };

      const currentPageIndex = obj.currentPage || 0;
      pageManager.addToPage(obj, currentPageIndex, 'right', RightBlockComp, itemId, fallbackProps);
      width += competency.length * 4 + 2 * marginBullet;
    }
  });

  // ============ FINALIZATION ============
  
  // Final spacing adjustment
  rightH += marginSec + 5;
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

export default compInfo;
export type { ResumeType, TemplateNumber, CompInfoData };
