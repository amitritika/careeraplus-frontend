// Optimized profileSummary.tsx using the new modular system
import React from 'react';
import { IconType } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { LeftBlockHeading, LeftBlockBullet, VL } from '@/components/molecules/visualresume';

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

// Profile Summary specific interfaces
interface FresherData {
  data: string;
  title: string;
}

interface ProfessionalData {
  title: string;
  value: string[];
}

interface BulletProps {
  top: number;
  name: string;
  height: number;
  line?: boolean;
}

interface HeadingProps {
  top: number;
  name: string;
  height: number;
  icon?: IconType;
}

/**
 * Optimized Profile Summary Component using the new modular system
 */
const profileSummary = (
  obj: ComponentSequenceObj,
  data: string | ProfessionalData,
  title: string | null,
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

  // Template-specific margin adjustments
  if (resumeType === 'fresher' && template === 4) {
    marginSec = 2;
  }

  // ============ HEADING COMPONENT ============
  const getHeadingTitle = (): string => {
    if (resumeType === 'fresher') {
      return title as string;
    }
    return (data as ProfessionalData).title;
  };

  const shouldIncludeIcon = (): boolean => {
    if (resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) return true;
    if ((resumeType === 'pro' || resumeType === 'expert') && [2, 3].includes(template)) return true;
    return false;
  };

  const headingProps: HeadingProps = {
    top: leftH + marginSec,
    name: getHeadingTitle(),
    height: 9,
    ...(shouldIncludeIcon() && { icon: FaUser })
  };

  pageManager.addToPage(obj, 0, 'left', LeftBlockHeading, 'profile-heading', headingProps);
  leftH += marginSec + 9;

  // ============ CONTENT PROCESSING ============
  if (resumeType === 'fresher') {
    // Handle fresher resume type - single text block
    const fresherData = data as string;
    const widthParam = (template === 1 || template === 3) ? "78px" : "76px";

    try {
      const [height] = textWidth("calibri", "normal", "3.2pt", widthParam, fresherData);

      const bulletProps: BulletProps = {
        top: leftH + marginBullet,
        name: fresherData,
        height,
        ...(template !== 1 && { line: false })
      };

      pageManager.addToPage(obj, 0, 'left', LeftBlockBullet, 'profile-content', bulletProps);

      // Calculate height increment based on template
      const getHeightIncrement = (): number => {
        switch (template) {
          case 3: return 3 * marginSec + height;
          case 4: return 2 * marginSec + height;
          default: return marginSec + height;
        }
      };

      leftH += getHeightIncrement();

    } catch (error) {
      console.error('Error calculating text width for fresher template:', error);
      throw error;
    }

  } else {
    // Handle professional/expert resume types - multiple bullet points
    const professionalData = data as ProfessionalData;
    const widthParam = template === 5 ? "74px" : "76px";

    try {
      professionalData.value.forEach((point: string, index: number) => {
        const [height] = textWidth("calibri", "normal", "3.2pt", widthParam, point);
        const itemId = `profile-point-${index}`;
        const isLastItem = index === professionalData.value.length - 1;

        const bulletProps: BulletProps = {
          top: leftH + marginBullet,
          name: point,
          height
        };

        // Add line property for specific templates (except last item)
        if ([1, 2, 4, 5].includes(template)) {
          bulletProps.line = !isLastItem;
        }

        pageManager.addToPage(obj, 0, 'left', LeftBlockBullet, itemId, bulletProps);
        leftH += 2 * marginBullet + height;

        // Handle page overflow for multi-page support
        const overflowThreshold = geometricCalculator.calculateOverflowThreshold(obj.countL, template);
        
        if (leftH > overflowThreshold) {
          obj.countL++;
          
          // Add VL component for template 5 overflow
          if (template === 5) {
            const vlProps = {
              top: geometricConfig.pageHeight * (obj.countL - 1),
              bottom: leftH - geometricConfig.pageHeight * (obj.countL - 1),
              page: obj.countL - 1
            };
            
            pageManager.addToPage(obj, obj.countL - 1, 'left', VL, 'vl-profile', vlProps);
          }

          // Recalculate height for new page
          leftH = leftH - geometricConfig.pageHeight * (obj.countL - 1);
        }
      });

    } catch (error) {
      console.error('Error processing professional/expert template:', error);
      throw error;
    }
  }

  // ============ FINALIZATION ============
  
  // Update heights
  obj.leftH = leftH;
  obj.rightH = rightH;

  // Ensure page1 compatibility (legacy support)
  if (obj.pages.length > 0) {
    const page1 = {
      left: {
        components: [...obj.pages[0].left.components],
        ids: [...obj.pages[0].left.ids],
        props: [...obj.pages[0].left.props]
      },
      right: {
        components: [...obj.pages[0].right.components],
        ids: [...obj.pages[0].right.ids],
        props: [...obj.pages[0].right.props]
      }
    };

    // Maintain legacy left/right references
    obj.left = page1.left;
    obj.right = page1.right;
  }

  return obj;
};

export default profileSummary;
export type { ResumeType, TemplateNumber, FresherData, ProfessionalData };
