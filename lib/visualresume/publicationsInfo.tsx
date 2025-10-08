import React from 'react';
import { IconType } from 'react-icons';
import { FaBook } from 'react-icons/fa';
import { textWidth } from './common';
import { 
  RightBlockHeading, 
  RightBlockLogo, 
  RightBlockPub,
  BlockHeading,
  BlockPub,
  VL 
} from '@/components/molecules/visualresume';
import {
  ComponentSequenceObj
} from '@/components/templates/visualresume/fresher/LegacyResumeHelpers/LegacyResumeHelpers';

// Type definitions
type ResumeType = 'fresher' | 'pro' | 'expert';
type TemplateNumber = 1 | 2 | 3 | 4 | 5;

interface PublicationsInfoData {
  title: string;
  value: PublicationItem[];
}

interface PublicationItem {
  title: string; // Note: original code uses "titile" typo
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

const publicationsInfo = (
  obj: ComponentSequenceObj,
  data: PublicationsInfoData,
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

    // Note: publicationsInfo is only available for professional and expert resume types
    if (resumeType === 'fresher') {
      console.warn('publicationsInfo is not available for fresher resume types');
      return obj;
    }

    // Template-specific text height (tH) values
    const getTH = (): number => {
      if (template === 5) {
        return 2; // Template 5 uses tH = 2
      }
      return 0; // Templates 1,2,3,4 use tH = 0
    };

    const tH = getTH();

    // Handle page overflow check - special logic for template 3
    const getOverflowThreshold = (): number => {
      if (resumeType === 'expert' && template === 3) {
        return countR * 297 - 10; // Expert template 3 uses special threshold
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

    // Template-specific margin calculations
    const getMarginMultiplier = (): number => {
      if (template === 5) {
        return 1; // Template 5 uses rightH directly
      }
      return 2; // Templates 1,2,3,4 use 2*marginSec
    };

    const marginMultiplier = getMarginMultiplier();

    // Template-specific height increment after heading
    const getHeadingHeightIncrement = (): number => {
      if (template === 5) {
        return 3; // Template 5 uses 3px increment
      }
      return 13; // Templates 1,2,3,4 use 13px increment
    };

    const headingIncrement = getHeadingHeightIncrement();

    // Add logo and heading components
    const addLogoAndHeading = () => {
      const logoProps: LogoComponentProps = {
        top: rightH + marginMultiplier * marginSec,
        name: FaBook
      };

      const headingProps: HeadingComponentProps = {
        top: rightH + marginMultiplier * marginSec,
        name: data.title,
        height: 13
      };

      if (countR > countL) {
        // Add to block
        obj.block.components.push(RightBlockLogo);
        obj.block.ids.push("pub-logo");
        obj.block.props.push(logoProps);

        // Use BlockHeading for pro template 2&3 and expert template 2&3 in block context
        if ((resumeType === 'pro' && [2, 3].includes(template)) || 
            (resumeType === 'expert' && [2, 3].includes(template))) {
          obj.block.components.push(BlockHeading);
        } else {
          obj.block.components.push(RightBlockHeading);
        }
        obj.block.ids.push("pub");
        obj.block.props.push(headingProps);
      } else {
        // Add to right section
        obj.right.components.push(RightBlockLogo);
        obj.right.ids.push("pub-logo");
        obj.right.props.push(logoProps);

        obj.right.components.push(RightBlockHeading);
        obj.right.ids.push("pub");
        obj.right.props.push(headingProps);
      }
    };

    addLogoAndHeading();
    rightH = rightH + marginMultiplier * marginSec + headingIncrement;

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
            top: rightH + marginMultiplier * marginSec,
            name: FaBook
          } as LogoComponentProps);

          obj.block.components.push(RightBlockHeading);
          obj.block.ids.push("project");
          obj.block.props.push({
            top: rightH + marginMultiplier * marginSec,
            name: data.title,
            height: 13
          } as HeadingComponentProps);

          rightH = rightH + marginMultiplier * marginSec + headingIncrement;
        } else {
          // Remove from block and re-add
          obj.block.components.splice(-2, 2);
          obj.block.ids.splice(-2, 2);
          obj.block.props.splice(-2, 2);

          obj.block.components.push(RightBlockLogo);
          obj.block.ids.push("project-logo");
          obj.block.props.push({
            top: rightH + marginMultiplier * marginSec,
            name: FaBook
          } as LogoComponentProps);

          obj.block.components.push(RightBlockHeading);
          obj.block.ids.push("project");
          obj.block.props.push({
            top: rightH + marginMultiplier * marginSec,
            name: data.title,
            height: 13
          } as HeadingComponentProps);

          rightH = rightH + marginMultiplier * marginSec + headingIncrement;
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
          top: rightH + marginMultiplier * marginSec,
          name: FaBook
        } as LogoComponentProps);

        obj.right.components.push(RightBlockHeading);
        obj.right.ids.push("project");
        obj.right.props.push({
          top: rightH + marginMultiplier * marginSec,
          name: data.title,
          height: 13
        } as HeadingComponentProps);

        rightH = rightH + marginMultiplier * marginSec + headingIncrement;
      }
    }

    // Process each publication item with dynamic height calculation
    data.value.forEach((v: PublicationItem, i: number) => {
      const str = `project-heading-${i.toString()}`;

      // Template 2&3 specific line logic
      let line = true;
      if ([2, 3].includes(template) && i === data.value.length - 1) {
        line = false;
      }

      // Context-specific width calculations
      let arrj: [number, number];
      let arrt: [number, number];
      let height: number;

      if (countR > countL) {
        // Block context - wider width (183px)
        arrj = textWidth("calibri", "normal", "3.2pt", "183px", v.journal);
        arrt = textWidth("calibri", "normal", "3.2pt", "183px", (v as any).titile || v.title);
        height = arrj[0] + arrt[0];

        const pubProps: PubComponentProps = {
          top: template === 5 ? rightH + marginMultiplier * marginSec + tH : rightH + marginMultiplier * marginSec,
          height: height,
          data: v,
          ...(([2, 3].includes(template)) && { line })
        };

        obj.block.components.push(BlockPub);
        obj.block.ids.push(str);
        obj.block.props.push(pubProps);
      } else {
        // Right context - narrower width (113px)
        arrj = textWidth("calibri", "normal", "3.2pt", "113px", v.journal);
        arrt = textWidth("calibri", "normal", "3.2pt", "113px", (v as any).titile || v.title);
        height = arrj[0] + arrt[0];

        const pubProps: PubComponentProps = {
          top: template === 5 ? rightH + marginMultiplier * marginSec + tH : rightH + marginMultiplier * marginSec,
          height: height,
          data: v,
          ...(([2, 3].includes(template)) && { line })
        };

        obj.right.components.push(RightBlockPub);
        obj.right.ids.push(str);
        obj.right.props.push(pubProps);
      }

      // Update rightH with template-specific spacing
      rightH = template === 5 
        ? rightH + marginMultiplier * marginSec + tH + height
        : rightH + marginMultiplier * marginSec + height;

      // Handle publication item overflow
      if (rightH > getOverflowThreshold()) {
        countR++;
        rightH = 297 * (countR - 1) + marginPage;

        // Complex publication overflow handling
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
            const newArrj = textWidth("calibri", "normal", "3.2pt", "183px", v.journal);
            const newArrt = textWidth("calibri", "normal", "3.2pt", "183px", (v as any).titile || v.title);
            const newHeight = newArrj[0] + newArrt[0];

            obj.block.components.push(BlockPub);
            obj.block.ids.push(str);
            obj.block.props.push({
              top: template === 5 ? rightH + marginMultiplier * marginSec + tH : rightH + marginMultiplier * marginSec,
              height: newHeight,
              data: v,
              ...(([2, 3].includes(template)) && { line })
            } as PubComponentProps);

            rightH = template === 5 
              ? rightH + marginMultiplier * marginSec + tH + newHeight
              : rightH + marginMultiplier * marginSec + newHeight;
          } else {
            obj.block.components.pop();
            obj.block.ids.pop();
            obj.block.props.pop();

            // Recalculate for block context (183px width)
            const newArrj = textWidth("calibri", "normal", "3.2pt", "183px", v.journal);
            const newArrt = textWidth("calibri", "normal", "3.2pt", "183px", (v as any).titile || v.title);
            const newHeight = newArrj[0] + newArrt[0];

            obj.block.components.push(BlockPub);
            obj.block.ids.push(str);
            obj.block.props.push({
              top: template === 5 ? rightH + marginMultiplier * marginSec + tH : rightH + marginMultiplier * marginSec,
              height: newHeight,
              data: v,
              ...(([2, 3].includes(template)) && { line })
            } as PubComponentProps);

            rightH = template === 5 
              ? rightH + marginMultiplier * marginSec + tH + newHeight
              : rightH + marginMultiplier * marginSec + newHeight;
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
          const newArrj = textWidth("calibri", "normal", "3.2pt", "113px", v.journal);
          const newArrt = textWidth("calibri", "normal", "3.2pt", "113px", (v as any).titile || v.title);
          const newHeight = newArrj[0] + newArrt[0];

          obj.right.components.push(RightBlockPub);
          obj.right.ids.push(str);
          obj.right.props.push({
            top: template === 5 ? rightH + marginMultiplier * marginSec + tH : rightH + marginMultiplier * marginSec,
            height: newHeight,
            data: v,
            ...(([2, 3].includes(template)) && { line })
          } as PubComponentProps);

          rightH = template === 5 
            ? rightH + marginMultiplier * marginSec + tH + newHeight
            : rightH + marginMultiplier * marginSec + newHeight;
        }
      }
    });

    // Add VL component for templates 1 (pro and expert)
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

          obj.page1.right.components = [...obj.right.components];
          obj.page1.right.ids = [...obj.right.ids];
          obj.page1.right.props = [...obj.right.props];
        } else {
          obj.right.components.push(VL);
          obj.right.props.push(vlProps);
        }
      }
    }

    // Ensure page1 is properly set for single-page layouts
    if (countR === 1) {
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
    console.error('Error in publicationsInfo function:', error);
    throw error;
  }
};

export default publicationsInfo;
export type { ResumeType, TemplateNumber, PublicationsInfoData, PublicationItem };