// Optimized skillInfo.tsx using the new modular system
import React from 'react';
import { IconType } from 'react-icons';
import { FaTools } from 'react-icons/fa';
import { LeftBlockHeading, LeftBlockSkill, VL } from '@/components/molecules/visualresume';

// Import the new modular system
import { 
  ComponentSequenceObj, 
  ResumeType, 
  TemplateNumber 
} from '@/types/visualresume';
import { TemplateConfigManager } from '../config/template-config.manager';
import { PageManager } from '../utils/page-manager.utils';
import { GeometricCalculator } from '../utils/geometric-calculator.utils';

// Skill-specific interfaces
interface SkillData {
  title: string;
  value: SkillItem[];
}

interface SkillItem {
  value: string;
  rating: string;
}

interface SkillComponentProps {
  top: number;
  name: string;
  rating: number;
}

interface HeadingProps {
  top: number;
  name: string;
  height: number;
  icon?: IconType;
}

interface VLProps {
  top: number;
  height?: number;
}

/**
 * Optimized Skill Info Component using the new modular system
 */
const skillInfo = (
  obj: ComponentSequenceObj,
  data: SkillData,
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
  const geometricConfig = geometricCalculator.getGeometricConfig(template);

  // Initialize pages structure
  pageManager.initializePages(obj);

  let leftH = obj.leftH;
  let rightH = obj.rightH;

  // ============ PAGE OVERFLOW CHECK ============
  const pageOverflowThreshold = geometricCalculator.calculateOverflowThreshold(obj.countL, template);
  
  if (leftH > pageOverflowThreshold) {
    leftH = geometricCalculator.calculatePageHeight(obj.countL, marginPage);
    
    // Add VL component for pro template 3 when starting new page
    if (resumeType === 'pro' && template === 3) {
      const vlProps: VLProps = {
        top: geometricCalculator.calculatePageHeight(obj.countL, 15)
      };
      pageManager.addToPage(obj, obj.countL - 1, 'left', VL, 'vert-l-1', vlProps);
    }
  }

  // ============ HEADING COMPONENT ============
  const shouldIncludeIcon = (): boolean => {
    if (resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) return true;
    if (resumeType === 'pro' && [2, 3].includes(template)) return true;
    return false; // Expert templates don't use icons
  };

  const headingProps: HeadingProps = {
    top: leftH + marginSec,
    name: data.title,
    height: 9,
    ...(shouldIncludeIcon() && { icon: FaTools })
  };

  pageManager.addToPage(obj, obj.currentPage || 0, 'left', LeftBlockHeading, 'skill-heading', headingProps);
  leftH += marginSec + 9;

  // ============ SKILL ITEMS PROCESSING ============
  const getHeightIncrement = (resumeType: ResumeType, template: TemplateNumber): number => {
    if (resumeType === 'fresher') {
      switch (template) {
        case 1: return 2 * marginSec + 15;
        case 2:
        case 5: return marginSec + 17;
        case 3: return marginSec + 18;
        case 4: return marginSec + 20;
        default: return marginSec + 15;
      }
    }
    // Pro and expert templates consistently use marginSec + 15
    return marginSec + 15;
  };

  data.value.forEach((skill: SkillItem, index: number) => {
    // Convert rating to percentage (0-100)
    let rating = (parseInt(skill.rating) / 5) * 100;
    if (rating > 100) rating = 100;

    const skillProps: SkillComponentProps = {
      top: leftH + marginSec,
      name: skill.value,
      rating
    };

    const currentPageIndex = obj.currentPage || 0;
    pageManager.addToPage(obj, currentPageIndex, 'left', LeftBlockSkill, `skill-${index}`, skillProps);

    const heightIncrement = getHeightIncrement(resumeType, template);
    leftH += heightIncrement;

    // ============ OVERFLOW HANDLING ============
    const currentPageThreshold = geometricCalculator.calculateOverflowThreshold(obj.countL, template);

    if (leftH > currentPageThreshold) {
      obj.countL++;
      leftH = geometricCalculator.calculatePageHeight(obj.countL, marginPage);

      // Remove the component that didn't fit
      if (obj.pages[currentPageIndex]) {
        obj.pages[currentPageIndex].left.components.pop();
        obj.pages[currentPageIndex].left.ids.pop();
        obj.pages[currentPageIndex].left.props.pop();
      }

      // Add VL component for specific templates when page overflows
      const shouldAddVLOnOverflow = (): boolean => {
        if (resumeType === 'pro' && [3, 5].includes(template)) return true;
        if (resumeType === 'expert' && template === 5) return true;
        return false;
      };

      if (shouldAddVLOnOverflow()) {
        const vlProps: VLProps = template === 5 
          ? { 
              top: geometricCalculator.calculatePageHeight(obj.countL, 10), 
              height: 287 
            }
          : { 
              top: geometricCalculator.calculatePageHeight(obj.countL, 15) 
            };

        pageManager.addToPage(obj, obj.countL - 1, 'left', VL, 'vert-l-1', vlProps);
      }

      // Handle page1 assignment when moving to second page 
      /*
      if (obj.countL === 2 && obj.pages.length > 0) {
        if (!obj.page1) obj.page1 = { left: { components: [], ids: [], props: [] }, right: { components: [], ids: [], props: [] } };
        
        obj.page1.left.components = [...obj.pages[0].left.components];
        obj.page1.left.ids = [...obj.pages[0].left.ids];
        obj.page1.left.props = [...obj.pages[0].left.props];
      }*/

      // Re-add the skill component to the new page
      obj.currentPage = obj.countL - 1;
      pageManager.ensurePageExists(obj, obj.currentPage);
      pageManager.addToPage(obj, obj.currentPage, 'left', LeftBlockSkill, `skill-${index}`, skillProps);
      leftH += heightIncrement;
    }
  });

  // ============ FINALIZATION ============
  
  // Save components to page1 if still on first page
  /*
  if (obj.countL === 1 && obj.pages.length > 0) {
    if (!obj.page1) obj.page1 = { left: { components: [], ids: [], props: [] }, right: { components: [], ids: [], props: [] } };
    
    obj.page1.left.components = [...obj.pages[0].left.components];
    obj.page1.left.ids = [...obj.pages[0].left.ids];
    obj.page1.left.props = [...obj.pages[0].left.props];

    // Maintain legacy left reference
    obj.left = obj.page1.left;
  }*/

  // Update heights
  obj.leftH = leftH;

  return obj;
};

export default skillInfo;
export type { ResumeType, TemplateNumber, SkillData, SkillItem };
