// Optimized hobbiesInfo.tsx using the new modular system
import React from 'react';
import { IconType } from 'react-icons';
import { FaBookReader } from 'react-icons/fa';
import { LeftBlockContactInfo, LeftBlockHeading, VL } from '@/components/molecules/visualresume';

// Import the new modular system
import { 
  ComponentSequenceObj, 
  ResumeType, 
  TemplateNumber 
} from '@/types/visualresume';
import { TemplateConfigManager } from '../config/template-config.manager';
import { PageManager } from '../utils/page-manager.utils';
import { GeometricCalculator } from '../utils/geometric-calculator.utils';
import { hobbiesList } from '../fresher/fresher';

// Import hobby icon mapping (you'll need to create this or import from your existing location)
// For now, creating a basic implementation

// Hobbies-specific interfaces
interface HobbiesInfoData {
  title: string;
  value: string[];
}

interface ContactInfoProps {
  top: number;
  name: string;
  icon: IconType;
  height: number;
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
 * Optimized Hobbies Info Component using the new modular system
 */
const hobbiesInfo = (
  obj: ComponentSequenceObj,
  data: HobbiesInfoData,
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

  let leftH = obj.leftH;
  let rightH = obj.rightH;

  // ============ OVERFLOW THRESHOLD CALCULATION ============
  const getOverflowThreshold = (): number => {
    return geometricCalculator.calculateOverflowThreshold(obj.countL, template);
  };

  // ============ INITIAL VL HANDLING ============
  // Special initial VL handling for pro template 3
  if (resumeType === 'pro' && template === 3 && leftH > getOverflowThreshold()) {
    leftH = geometricCalculator.calculatePageHeight(obj.countL, marginPage);
    
    const vlProps: VLProps = {
      top: geometricCalculator.calculatePageHeight(obj.countL, 15)
    };
    pageManager.addToPage(obj, obj.countL - 1, 'left', VL, 'vert-l-1', vlProps);
  }

  // ============ HEADING COMPONENT ============
  const shouldIncludeHeadingIcon = (): boolean => {
    if (resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) return true;
    if (resumeType === 'pro' && [2, 3].includes(template)) return true;
    if (resumeType === 'expert' && [2, 3, 5].includes(template)) return true;
    return false;
  };

  const headingProps: HeadingProps = {
    top: leftH + marginSec,
    name: data.title,
    height: 9,
    ...(shouldIncludeHeadingIcon() && { icon: FaBookReader })
  };

  pageManager.addToPage(obj, obj.currentPage || 0, 'left', LeftBlockHeading, 'hobbies-heading', headingProps);
  leftH += marginSec + 9;

  // ============ HOBBY ITEMS PROCESSING ============
  data.value.forEach((hobby: string, index: number) => {
    const itemId = `hobbies-${index}`;
    
    const contactProps: ContactInfoProps = {
      top: leftH + marginSec,
      name: hobby,
      icon: hobbiesList[hobby] || FaBookReader, // Fallback to default icon
      height: 5
    };

    const currentPageIndex = obj.currentPage || 0;
    pageManager.addToPage(obj, currentPageIndex, 'left', LeftBlockContactInfo, itemId, contactProps);
    leftH += marginSec + 5;

    // ============ OVERFLOW HANDLING ============
    if (leftH > getOverflowThreshold()) {
      obj.countL++;
      
      // Remove the component that didn't fit
      if (obj.pages[currentPageIndex]) {
        obj.pages[currentPageIndex].left.components.pop();
        obj.pages[currentPageIndex].left.ids.pop();
        obj.pages[currentPageIndex].left.props.pop();
      }

      // Add VL component for specific templates when page overflows
      const shouldAddVLOnOverflow = (): boolean => {
        if (resumeType === 'pro' && template === 3) return true;
        if (resumeType === 'pro' && template === 5) return true;
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

      // Recalculate leftH for new page
      leftH = geometricCalculator.calculatePageHeight(obj.countL, marginPage);

      // Re-add the component that didn't fit
      obj.currentPage = obj.countL - 1;
      pageManager.ensurePageExists(obj, obj.currentPage);
      pageManager.addToPage(obj, obj.currentPage, 'left', LeftBlockContactInfo, itemId, contactProps);
      leftH += marginSec + 5;
    }
  });

  // ============ FINALIZATION ============
  
  // Update heights
  obj.leftH = leftH;
  obj.rightH = rightH;

  // Ensure page1 compatibility (legacy support)
  /*
  if (obj.pages.length > 0) {
    if (!obj.page1) obj.page1 = { left: { components: [], ids: [], props: [] }, right: { components: [], ids: [], props: [] } };
    
    obj.page1.left.components = [...obj.pages[0].left.components];
    obj.page1.left.ids = [...obj.pages[0].left.ids];
    obj.page1.left.props = [...obj.pages[0].left.props];

    // Maintain legacy left reference
    obj.left = obj.page1.left;
  }
*/
  return obj;
};


export default hobbiesInfo;
export type { ResumeType, TemplateNumber, HobbiesInfoData };
