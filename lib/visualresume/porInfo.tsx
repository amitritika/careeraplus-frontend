import React from 'react';
import { IconType } from 'react-icons';
import { FaUserCog } from 'react-icons/fa';
import { textWidth, textWidthL } from './common';
import { 
  RightBlockHeading, 
  RightBlockLogo, 
  RightBlockPor,
  BlockHeading,
  BlockPor,
  VL 
} from '@/components/molecules/visualresume';
import {
  ComponentSequenceObj
} from '@/components/templates/visualresume/fresher/LegacyResumeHelpers/LegacyResumeHelpers';

// Type definitions
type ResumeType = 'fresher' | 'pro' | 'expert';
type TemplateNumber = 1 | 2 | 3 | 4 | 5;

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

const porInfo = (
  obj: ComponentSequenceObj,
  data: PorInfoData,
  marginSec: number,
  marginBullet: number,
  marginPage: number,
  resumeType: ResumeType = 'pro',
  template: TemplateNumber = 1
): ComponentSequenceObj => {
  try {
    let countL = obj.countL;
    let countR = obj.countR;
    let leftH = obj.leftH;
    let rightH = obj.rightH;
    const tH = 2; // Fixed text height spacing

    // Note: porInfo is only available for professional resume types
    if (resumeType === 'fresher' || resumeType === 'expert') {
      console.warn('porInfo is only available for professional resume types');
      return obj;
    }

    // Handle page overflow check - special logic for template 3
    const getOverflowThreshold = (): number => {
      if (template === 3) {
        return countR * 297 - 10; // Template 3 uses special threshold
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
        name: FaUserCog
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

        // Use BlockHeading for templates 2,3,4,5 in block context
        if ([2, 3, 4, 5].includes(template)) {
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

    // Template-specific height increment
    const getHeightIncrement = (): number => {
      if (template === 5) {
        return 10; // Template 5 uses 10px increment
      }
      return 13; // Templates 1,2,3,4 use 13px increment
    };

    rightH = rightH + marginSec + getHeightIncrement();

    // Handle heading overflow with complex logic
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

          obj.block.components.push(RightBlockLogo);
          obj.block.ids.push("project-logo");
          obj.block.props.push({
            top: rightH + marginSec,
            name: FaUserCog
          } as LogoComponentProps);

          obj.block.components.push(RightBlockHeading);
          obj.block.ids.push("project");
          obj.block.props.push({
            top: rightH + marginSec,
            name: data.title,
            height: 13
          } as HeadingComponentProps);

          rightH = rightH + marginSec + 13;
        } else {
          // Remove from block and re-add
          obj.block.components.splice(-2, 2);
          obj.block.ids.splice(-2, 2);
          obj.block.props.splice(-2, 2);

          obj.block.components.push(RightBlockLogo);
          obj.block.ids.push("project-logo");
          obj.block.props.push({
            top: rightH + marginSec,
            name: FaUserCog
          } as LogoComponentProps);

          obj.block.components.push(RightBlockHeading);
          obj.block.ids.push("project");
          obj.block.props.push({
            top: rightH + marginSec,
            name: data.title,
            height: 13
          } as HeadingComponentProps);

          rightH = rightH + marginSec + 13;
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
          name: FaUserCog
        } as LogoComponentProps);

        obj.right.components.push(RightBlockHeading);
        obj.right.ids.push("project");
        obj.right.props.push({
          top: rightH + marginSec,
          name: data.title,
          height: 13
        } as HeadingComponentProps);

        rightH = rightH + marginSec + 13;
      }
    }

    // Process each portfolio item with dynamic height calculation
    data.value.forEach((v: PorInfoItem, i: number) => {
      const str = `project-heading-${i.toString()}`;

      // Context-specific width calculations
      let arrd: [number, number];
      let arrt: [number, number];
      let height: number;

      if (countR > countL) {
        // Block context - wider width (183px)
        arrd = textWidthL("calibri", "normal", "3.2pt", "183px", v.desc);
        arrt = textWidth("calibri", "normal", "3.2pt", "183px", v.title);
        height = arrd[0] + arrt[0];

        const porProps: PorComponentProps = {
          top: rightH + marginSec,
          height: height,
          data: v
        };

        obj.block.components.push(BlockPor);
        obj.block.ids.push(str);
        obj.block.props.push(porProps);
      } else {
        // Right context - narrower width (113px)
        arrd = textWidthL("calibri", "normal", "3.2pt", "113px", v.desc);
        arrt = textWidth("calibri", "normal", "3.2pt", "113px", v.title);
        height = arrd[0] + arrt[0];

        const porProps: PorComponentProps = {
          top: rightH + marginSec,
          height: height,
          data: v
        };

        obj.right.components.push(RightBlockPor);
        obj.right.ids.push(str);
        obj.right.props.push(porProps);
      }

      // Update rightH with consistent spacing regardless of optional fields
      // Note: Original code has identical logic for both optional branches
      rightH = rightH + marginSec + height + tH;

      // Handle portfolio item overflow
      if (rightH > getOverflowThreshold()) {
        countR++;
        rightH = 297 * (countR - 1) + marginPage;

        // Complex portfolio overflow handling
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

            // Recalculate for block context (183px width)
            // Note: Original has typo "v.titile" - preserving for compatibility
            const newArrd = textWidthL("calibri", "normal", "3.2pt", "183px", v.desc);
            const newArrt = textWidth("calibri", "normal", "3.2pt", "183px", (v as any).titile || v.title);
            const newHeight = newArrd[0] + newArrt[0];

            obj.block.components.push(BlockPor);
            obj.block.ids.push(str);
            obj.block.props.push({
              top: rightH + marginSec,
              height: newHeight,
              data: v
            } as PorComponentProps);

            rightH = rightH + marginSec + newHeight + tH;
          } else {
            obj.block.components.pop();
            obj.block.ids.pop();
            obj.block.props.pop();

            // Recalculate for block context (183px width)
            const newArrd = textWidthL("calibri", "normal", "3.2pt", "183px", v.desc);
            const newArrt = textWidth("calibri", "normal", "3.2pt", "183px", (v as any).titile || v.title);
            const newHeight = newArrd[0] + newArrt[0];

            obj.block.components.push(BlockPor);
            obj.block.ids.push(str);
            obj.block.props.push({
              top: rightH + marginSec,
              height: newHeight,
              data: v
            } as PorComponentProps);

            rightH = rightH + marginSec + newHeight + tH;
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

          // Recalculate for right context (113px width)
          const newArrd = textWidthL("calibri", "normal", "3.2pt", "113px", v.desc);
          const newArrt = textWidth("calibri", "normal", "3.2pt", "113px", (v as any).titile || v.title);
          const newHeight = newArrd[0] + newArrt[0];

          obj.right.components.push(RightBlockPor);
          obj.right.ids.push(str);
          obj.right.props.push({
            top: rightH + marginSec,
            height: newHeight,
            data: v
          } as PorComponentProps);

          rightH = rightH + marginSec + newHeight + tH;
        }
      }
    });

    // Add VL component for template 1
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
        if (countR === 1) {
          obj.right.components.push(VL);
          obj.right.props.push({ top: 60, height: 230 } as VLComponentProps);
{/* 
          if (countR === 2) {
            obj.page1.right.components = [...obj.right.components];
            obj.page1.right.ids = [...obj.right.ids];
            obj.page1.right.props = [...obj.right.props];
          }*/}
        } else {
          obj.right.components.push(VL);
          obj.right.props.push(vlProps);
        }
      }
    }

    // Final spacing adjustment
    rightH = rightH + 4;

    // Update counts and heights
    obj.countL = countL;
    obj.countR = countR;
    obj.leftH = leftH;
    obj.rightH = rightH;

    return obj;

  } catch (error) {
    console.error('Error in porInfo function:', error);
    throw error;
  }
};

export default porInfo;
export type { ResumeType, TemplateNumber, PorInfoData, PorInfoItem };