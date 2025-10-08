import React from 'react';
import { IconType } from 'react-icons';
import { FaGraduationCap } from 'react-icons/fa';
import { 
  RightBlockHeading, 
  RightBlockLogo, 
  RightBlockEdu, 
  BlockHeading, 
  BlockEdu, 
  VL 
} from '@/components/molecules/visualresume';
import {
  ComponentSequenceObj
} from '@/components/templates/visualresume/fresher/LegacyResumeHelpers/LegacyResumeHelpers';

// Type definitions
type ResumeType = 'fresher' | 'pro' | 'expert';
type TemplateNumber = 1 | 2 | 3 | 4 | 5;

interface EducationData {
  title: string;
  value: EducationItem[];
}

interface EducationItem {
  optional: boolean;
  degree: string;
  college: string;
  year: string;
  cgpa: string;
  toggle: boolean;
  // Additional education fields would be defined here
  // Based on the component props, it appears to contain education details
}

interface EduComponentProps {
  top: number;
  height: number;
  data: EducationItem;
  line?: boolean;
}

interface LogoComponentProps {
  top: number;
  name: IconType;
}

interface HeadingComponentProps {
  top: number;
  name: string;
  height: number;
}

interface VLComponentProps {
  top: number;
  height: number;
}

const educationInfo = (
  obj: ComponentSequenceObj,
  data: EducationData,
  marginSec: number,
  marginBullet: number,
  marginPage: number,
  resumeType: ResumeType = 'fresher',
  template: TemplateNumber = 1
): ComponentSequenceObj => {
  try {
    let countL = obj.countL;
    let countR = obj.countR;
    let leftH = obj.leftH;
    let rightH = obj.rightH;
    const tH = 0; // Consistent across all templates

    // Handle page overflow check - special logic for template 3
    const getOverflowThreshold = () => {
      if (template === 3) {
        return countR * 297 - 10;
      }
      return countR * 297;
    };

    // Initial page overflow handling
    if (rightH > getOverflowThreshold()) {
      countR++;
      rightH = 297 * (countR - 1) + marginPage;

      if (countR === 2) {
        obj.page1.right.components = [...obj.right.components];
        obj.page1.right.ids = [...obj.right.ids];
        obj.page1.right.props = [...obj.right.props];
      }
    }

    // Add logo and heading components
    const addLogoAndHeading = () => {
      const logoProps: LogoComponentProps = {
        top: rightH + marginSec,
        name: FaGraduationCap
      };

      const headingProps: HeadingComponentProps = {
        top: rightH + marginSec,
        name: data.title,
        height: 13
      };

      if (countR > countL) {
        // Add to block
        obj.block.components.push(RightBlockLogo);
        obj.block.ids.push("education-logo");
        obj.block.props.push(logoProps);

        // Use different heading component for fresher templates 2,3,4,5 and pro templates 2,3
        if ((resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) || 
            (resumeType === 'pro' && [2, 3].includes(template))) {
          obj.block.components.push(BlockHeading);
        } else {
          obj.block.components.push(RightBlockHeading);
        }
        obj.block.ids.push("education");
        obj.block.props.push(headingProps);
      } else {
        // Add to right section
        obj.right.components.push(RightBlockLogo);
        obj.right.ids.push("education-logo");
        obj.right.props.push(logoProps);

        obj.right.components.push(RightBlockHeading);
        obj.right.ids.push("education");
        obj.right.props.push(headingProps);
      }
    };

    addLogoAndHeading();

    // Calculate initial rightH adjustment - different for template 5
    const getHeadingAdjustment = (): number => {
      if (resumeType !== 'fresher' && template === 5) {
        return 10; // Pro/Expert template 5 uses +10 instead of +13
      }
      return 13;
    };

    rightH = rightH + marginSec + getHeadingAdjustment();

    // Handle heading overflow
    if (rightH > getOverflowThreshold()) {
      countR++;
      rightH = 297 * (countR - 1) + marginPage;

      // Complex heading overflow handling
      if (countR > countL) {
        if (countR - 1 === countL) {
          // Remove from right and add to block
          obj.right.components.splice(-2, 2);
          obj.right.ids.splice(-2, 2);
          obj.right.props.splice(-2, 2);

          if (countR === 2) {
            obj.page1.right.components = [...obj.right.components];
            obj.page1.right.ids = [...obj.right.ids];
            obj.page1.right.props = [...obj.right.props];
          }

          // Re-add components with corrected IDs (note: original has "project" typo)
          obj.block.components.push(RightBlockLogo);
          obj.block.ids.push("project-logo"); // Preserving original ID pattern
          obj.block.props.push({
            top: rightH + marginSec,
            name: FaGraduationCap
          } as LogoComponentProps);

          obj.block.components.push(RightBlockHeading);
          obj.block.ids.push("project"); // Preserving original ID pattern
          obj.block.props.push({
            top: rightH + marginSec,
            name: data.title,
            height: 13
          } as HeadingComponentProps);

          rightH = rightH + marginSec + getHeadingAdjustment();
        } else {
          // Remove from block and re-add
          obj.block.components.splice(-2, 2);
          obj.block.ids.splice(-2, 2);
          obj.block.props.splice(-2, 2);

          obj.block.components.push(RightBlockLogo);
          obj.block.ids.push("project-logo");
          obj.block.props.push({
            top: rightH + marginSec,
            name: FaGraduationCap
          } as LogoComponentProps);

          obj.block.components.push(RightBlockHeading);
          obj.block.ids.push("project");
          obj.block.props.push({
            top: rightH + marginSec,
            name: data.title,
            height: 13
          } as HeadingComponentProps);

          rightH = rightH + marginSec + getHeadingAdjustment();
        }
      } else {
        // Remove from right and re-add
        obj.right.components.splice(-2, 2);
        obj.right.ids.splice(-2, 2);
        obj.right.props.splice(-2, 2);

        if (countR === 2) {
          obj.page1.right.components = [...obj.right.components];
          obj.page1.right.ids = [...obj.right.ids];
          obj.page1.right.props = [...obj.right.props];
        }

        obj.right.components.push(RightBlockLogo);
        obj.right.ids.push("project-logo");
        obj.right.props.push({
          top: rightH + marginSec,
          name: FaGraduationCap
        } as LogoComponentProps);

        obj.right.components.push(RightBlockHeading);
        obj.right.ids.push("project");
        obj.right.props.push({
          top: rightH + marginSec,
          name: data.title,
          height: 13
        } as HeadingComponentProps);

        rightH = rightH + marginSec + getHeadingAdjustment();
      }
    }

    // Process each education item
    data.value.forEach((v: EducationItem, i: number) => {
      if (v.optional) {
        const str = `education-heading-${i.toString()}`;

        // Calculate line property for templates that support it
        let line: boolean | undefined;
        if ((resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) || 
            (resumeType !== 'fresher' && [2, 3].includes(template))) {
          line = i !== 0; // First item has no line, subsequent items do
        }

        // Get height based on context and resume type
        const getEduHeight = (isBlock: boolean): number => {
          if (isBlock) {
            return 10; // Block components consistently use height 10
          }

          // Right components have different heights based on resume type
          if (resumeType === 'fresher') {
            return 12;
          } else {
            // Pro/Expert templates use height 20, except template 5 which varies
            if (template === 5) {
              return 20; // Pro/Expert template 5 uses different positioning
            }
            return 20;
          }
        };

        const height = getEduHeight(countR > countL);

        const eduProps: EduComponentProps = {
          top: rightH + (template === 5 && resumeType !== 'fresher' ? 0 : marginSec), // Template 5 special case
          height: height,
          data: v,
          ...(line !== undefined && { line })
        };

        // Add education component
        if (countR > countL) {
          obj.block.components.push(BlockEdu);
          obj.block.ids.push(str);
          obj.block.props.push(eduProps);
        } else {
          obj.right.components.push(RightBlockEdu);
          obj.right.ids.push(str);
          obj.right.props.push(eduProps);
        }

        // Calculate height increment
        const heightIncrement = (template === 5 && resumeType !== 'fresher') 
          ? height // Template 5 uses just height without marginSec
          : marginSec + height;

        rightH = rightH + heightIncrement;

        // Handle education item overflow
        if (rightH > getOverflowThreshold()) {
          countR++;
          rightH = 297 * (countR - 1) + marginPage;

          // Complex education overflow handling
          if (countR > countL) {
            if (countR - 1 === countL) {
              obj.right.components.pop();
              obj.right.ids.pop();
              obj.right.props.pop();

              obj.block.components.push(BlockEdu);
              obj.block.ids.push(str);
              obj.block.props.push({
                top: rightH + marginSec,
                height: 10,
                data: v,
                ...(line !== undefined && { line })
              } as EduComponentProps);

              rightH = rightH + marginSec + 10;
            } else {
              obj.block.components.pop();
              obj.block.ids.pop();
              obj.block.props.pop();

              obj.block.components.push(BlockEdu);
              obj.block.ids.push(str);
              obj.block.props.push({
                top: rightH + marginSec,
                height: 10,
                data: v,
                ...(line !== undefined && { line })
              } as EduComponentProps);

              rightH = rightH + marginSec + 10;
            }
          } else {
            obj.right.components.pop();
            obj.right.ids.pop();
            obj.right.props.pop();

            if (countR === 2) {
              obj.page1.right.components = [...obj.right.components];
              obj.page1.right.ids = [...obj.right.ids];
              obj.page1.right.props = [...obj.right.props];
            }

            const newHeight = getEduHeight(false);
            const newProps: EduComponentProps = {
              top: rightH + (template === 5 && resumeType !== 'fresher' ? marginSec : marginSec),
              height: newHeight,
              data: v,
              ...(line !== undefined && { line })
            };

            obj.right.components.push(RightBlockEdu);
            obj.right.ids.push(str);
            obj.right.props.push(newProps);

            rightH = rightH + marginSec + newHeight;
          }
        }
      }
    });

    // Add VL component for template 1 (fresher and pro)
    if (template === 1) {
      const vlProps: VLComponentProps = {
        top: countR > countL 
          ? (297 * (countR - 1)) + marginPage + marginSec 
          : (countR === 1 ? 60 : (297 * (countR - 1)) + marginPage + marginSec),
        height: countR > countL 
          ? 297 - ((297 * countR) - rightH)
          : (countR === 1 ? 230 : 297 - ((297 * countR) - rightH))
      };

      if (countR > countL) {
        obj.block.components.push(VL);
        obj.block.props.push(vlProps);
      } else {
        obj.right.components.push(VL);
        obj.right.props.push(vlProps);

        if (countR === 1) {
          obj.page1.right.components = [...obj.right.components];
          obj.page1.right.ids = [...obj.right.ids];
          obj.page1.right.props = [...obj.right.props];
        }
      }
    }

    // Final page1 assignment for single page cases
    if (countR === 1 && template !== 1) {
      obj.page1.right.components = [...obj.right.components];
      obj.page1.right.ids = [...obj.right.ids];
      obj.page1.right.props = [...obj.right.props];
    }

    // Update counts and heights
    obj.countL = countL;
    obj.countR = countR;
    obj.leftH = leftH;
    obj.rightH = rightH;

    return obj;

  } catch (error) {
    console.error('Error in educationInfo function:', error);
    throw error;
  }
};

export default educationInfo;
export type { ResumeType, TemplateNumber, EducationData, EducationItem };