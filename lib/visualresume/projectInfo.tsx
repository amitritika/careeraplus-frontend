import React from 'react';
import { IconType } from 'react-icons';
import { FaFolderOpen } from 'react-icons/fa';
import { textWidth, textWidthL } from './common';
import { 
  RightBlockHeading, 
  RightBlockLogo, 
  RightBlockProject, 
  BlockHeading, 
  BlockProject, 
  VL 
} from '@/components/molecules/visualresume';
import {
  ComponentSequenceObj
} from '@/components/templates/visualresume/fresher/LegacyResumeHelpers/LegacyResumeHelpers';

// Type definitions
type ResumeType = 'fresher' | 'pro' | 'expert';
type TemplateNumber = 1 | 2 | 3 | 4 | 5;

interface ProjectData {
  title: string;
  value: ProjectItem[];
}

interface ProjectItem {
  title: string; // Note: keeping original typo for compatibility
  desc: string;
  designation?: OptionalField; // For pro/expert templates
  client?: OptionalField; // For pro/expert templates  
  date?: OptionalField; // For pro/expert templates
}

interface OptionalField {
  optional: boolean;
  value?: string;
}

interface ProjectComponentProps {
  top: number;
  height: number;
  data: ProjectItem;
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

const projectInfo = (
  obj: ComponentSequenceObj,
  data: ProjectData,
  marginSec: number,
  marginBullet: number,
  marginPage: number,
  resumeType: ResumeType = 'fresher',
  template: TemplateNumber
): ComponentSequenceObj => {
  try {
    let countL = obj.countL;
    let countR = obj.countR;
    let leftH = obj.leftH;
    let rightH = obj.rightH;

    // Template-specific variables
    const tH = (resumeType !== 'fresher') ? 2 : 0;

    // Override marginSec for fresher template 4 only
    if (resumeType === 'fresher' && template === 4) {
      marginSec = 0;
    }

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
        name: FaFolderOpen
      };

      const headingProps: HeadingComponentProps = {
        top: rightH + marginSec,
        name: data.title,
        height: 13
      };

      if (countR > countL) {
        // Add to block
        obj.block.components.push(RightBlockLogo);
        obj.block.ids.push("project-logo");
        obj.block.props.push(logoProps);

        // Use different heading component for fresher templates 2,3,4,5
        if (resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) {
          obj.block.components.push(BlockHeading);
        } else {
          obj.block.components.push(RightBlockHeading);
        }
        obj.block.ids.push("project");
        obj.block.props.push(headingProps);
      } else {
        // Add to right section
        obj.right.components.push(RightBlockLogo);
        obj.right.ids.push("project-logo");
        obj.right.props.push(logoProps);

        obj.right.components.push(RightBlockHeading);
        obj.right.ids.push("project");
        obj.right.props.push(headingProps);
      }
    };

    addLogoAndHeading();

    // Calculate initial rightH adjustment
    const getHeadingAdjustment = () => {
      if (resumeType === 'pro' && template === 5) {
        return 10; // Pro template 5 uses +10 instead of +13
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

          addLogoAndHeading();
          rightH = rightH + marginSec + getHeadingAdjustment();
        } else {
          // Remove from block and re-add
          obj.block.components.splice(-2, 2);
          obj.block.ids.splice(-2, 2);
          obj.block.props.splice(-2, 2);

          addLogoAndHeading();
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
          name: FaFolderOpen
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

    // Process each project item
    data.value.forEach((v: ProjectItem, i: number) => {
      // Calculate line property for templates that support it
      let line: boolean | undefined;
      if ((resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) || 
          (resumeType !== 'fresher' && [2, 3].includes(template))) {
        line = i !== data.value.length - 1;
      }

      const str = `project-heading-${i.toString()}`;

      // Calculate text widths and height based on context
      const calculateHeight = (isBlock: boolean): number => {
        const widthParam = isBlock ? "183px" : "113px";

        let arrd: number[], arrt: number[];

        if (resumeType === 'fresher') {
          // Fresher templates use different text calculation
          if (template === 3) {
            arrd = textWidth("calibri", "normal", "3.2pt", widthParam, v.desc);
          } else {
            arrd = textWidth("calibri", "normal", "3.2pt", widthParam, v.desc);
          }
          arrt = textWidth("calibri", "normal", "3.2pt", widthParam, v.title);
          return arrd[0] + arrt[0] + 1;
        } else {
          // Pro/Expert templates
          arrd = textWidth("calibri", "normal", "3.2pt", widthParam, v.desc);

          if (template === 5) {
            arrt = textWidth("calibri", "bold", "3.2pt", widthParam, v.title);
          } else {
            arrt = textWidth("calibri", "normal", "3.2pt", widthParam, v.title);
          }
          return arrd[0] + arrt[0];
        }
      };

      const height = calculateHeight(countR > countL);

      const projectProps: ProjectComponentProps = {
        top: rightH + marginSec,
        height: height,
        data: v,
        ...(line !== undefined && { line })
      };

      // Add project component
      if (countR > countL) {
        obj.block.components.push(BlockProject);
        obj.block.ids.push(str);
        obj.block.props.push(projectProps);
        
      } else {
        obj.right.components.push(RightBlockProject);
        obj.right.ids.push(str);
        obj.right.props.push(projectProps);
        console.log(height)
      }

      // Calculate height increment
      const calculateHeightIncrement = (): number => {
        let baseIncrement = marginSec + height;

        if (resumeType !== 'fresher') {
          // Pro/Expert templates add tH
          baseIncrement += tH;

          // Additional logic for optional fields (though both branches are the same)
          if (v.designation?.optional || v.client?.optional || v.date?.optional) {
            // No additional increment needed as both branches do the same
          }
        }

        return baseIncrement;
      };

      rightH = rightH + calculateHeightIncrement();

      // Handle project overflow
      if (rightH > getOverflowThreshold()) {
        countR++;
        rightH = 297 * (countR - 1) + marginPage;

        // Complex project overflow handling
        if (countR > countL) {
          if (countR - 1 === countL) {
            obj.right.components.pop();
            obj.right.ids.pop();
            obj.right.props.pop();

            if (countR === 2) {
              obj.page1.right.components = [...obj.right.components];
              obj.page1.right.ids = [...obj.right.ids];
              obj.page1.right.props = [...obj.right.props];
            }

            // Recalculate for block context
            const newHeight = calculateHeight(true);
            const newProps: ProjectComponentProps = {
              top: rightH + marginSec,
              height: newHeight,
              data: v,
              ...(line !== undefined && { line })
            };

            obj.block.components.push(BlockProject);
            obj.block.ids.push(str);
            obj.block.props.push(newProps);
            rightH = rightH + marginSec + newHeight + (resumeType !== 'fresher' ? tH : 0);
          } else {
            obj.block.components.pop();
            obj.block.ids.pop();
            obj.block.props.pop();

            const newHeight = calculateHeight(true);
            const newProps: ProjectComponentProps = {
              top: rightH + marginSec,
              height: newHeight,
              data: v,
              ...(line !== undefined && { line })
            };

            obj.block.components.push(BlockProject);
            obj.block.ids.push(str);
            obj.block.props.push(newProps);
            rightH = rightH + marginSec + newHeight + (resumeType !== 'fresher' ? tH : 0);
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

          const newHeight = calculateHeight(false);
          
          const newProps: ProjectComponentProps = {
            top: rightH + marginSec,
            height: newHeight,
            data: v,
            ...(line !== undefined && { line })
          };

          obj.right.components.push(RightBlockProject);
          obj.right.ids.push(str);
          obj.right.props.push(newProps);
          rightH = rightH + marginSec + newHeight + (resumeType !== 'fresher' ? tH : 0);
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

    // Final page1 assignment for pro/expert template 2 and 5 when countR === 2
    if (resumeType !== 'fresher' && [2, 5].includes(template) && countR === 2) {
      obj.page1.right.components = [...obj.right.components];
      obj.page1.right.ids = [...obj.right.ids];
      obj.page1.right.props = [...obj.right.props];
    }

    // Add final spacing for pro/expert templates
    if (resumeType !== 'fresher') {
      rightH = rightH + 4;
    }

    // Update counts and heights
    obj.countL = countL;
    obj.countR = countR;
    obj.leftH = leftH;
    obj.rightH = rightH;

    return obj;

  } catch (error) {
    console.error('Error in projectInfo function:', error);
    throw error;
  }
};

export default projectInfo;
export type { ResumeType, TemplateNumber, ProjectData, ProjectItem };