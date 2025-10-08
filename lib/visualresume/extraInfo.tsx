import React from 'react';
import { IconType } from 'react-icons';
import { FaCertificate, FaAward } from 'react-icons/fa';
import { textWidth } from './common';
import { 
  RightBlockHeading, 
  RightBlockLogo, 
  RightBlockBulletSmall, 
  BlockHeading, 
  BlockBulletSmall, 
  VL 
} from '@/components/molecules/visualresume';
import {
  ComponentSequenceObj
} from '@/components/templates/visualresume/fresher/LegacyResumeHelpers/LegacyResumeHelpers';

// Type definitions
type ResumeType = 'fresher' | 'pro' | 'expert';
type TemplateNumber = 1 | 2 | 3 | 4 | 5;

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
  try {
    let countL = obj.countL;
    let countR = obj.countR;
    let leftH = obj.leftH;
    let rightH = obj.rightH;
    const tH = 0; // Consistent across all templates

    // Special marginBullet override for fresher template 1
    if (resumeType === 'fresher' && template === 1) {
      marginBullet = 0;
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

    // Determine logo to use - different for fresher templates 2-5
    const getLogoIcon = (): IconType => {
      if (resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) {
        return FaAward;
      }
      return logo;
    };

    const logoIcon = getLogoIcon();

    // Add logo and heading components
    const addLogoAndHeading = () => {
      const logoProps: LogoComponentProps = {
        top: rightH + marginSec,
        name: logoIcon
      };

      const headingProps: HeadingComponentProps = {
        top: rightH + marginSec,
        name: data.title,
        height: 13
      };

      if (countR > countL) {
        // Add to block
        obj.block.components.push(RightBlockLogo);
        obj.block.ids.push("extra-logo");
        obj.block.props.push(logoProps);

        // Use different heading component for certain templates
        if ((resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) || 
            (resumeType !== 'fresher' && [2, 3].includes(template))) {
          obj.block.components.push(BlockHeading);
        } else {
          obj.block.components.push(RightBlockHeading);
        }
        obj.block.ids.push("extra");
        obj.block.props.push(headingProps);
      } else {
        // Add to right section
        obj.right.components.push(RightBlockLogo);
        obj.right.ids.push("extra-logo");
        obj.right.props.push(logoProps);

        obj.right.components.push(RightBlockHeading);
        obj.right.ids.push("extra");
        obj.right.props.push(headingProps);
      }
    };

    addLogoAndHeading();

    rightH = rightH + marginSec + 13;

    // Handle heading overflow - fresher templates 2,3,4,5 have commented out logic
    const shouldHandleHeadingOverflow = () => {
      if (resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) {
        return false; // Heading overflow logic is commented out in these templates
      }
      return true;
    };

    if (shouldHandleHeadingOverflow() && rightH > getOverflowThreshold()) {
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

          // Re-add with preserved IDs (note: original uses "project" ID pattern)
          obj.block.components.push(RightBlockLogo);
          obj.block.ids.push("project-logo");
          obj.block.props.push({
            top: rightH + marginSec,
            name: logoIcon
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
            name: logoIcon
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
          name: logoIcon
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

    // Process each extra info item
    data.value.forEach((v: string, i: number) => {
      // Special marginSec override for pro template 5
      if (resumeType === 'pro' && template === 5) {
        marginSec = 1;
      }

      // Calculate line property for templates that support it
      let line: boolean | undefined;
      if (resumeType !== 'fresher' && template === 2) {
        line = i !== data.value.length - 1; // Last item has no line
      } else if ((resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) || 
                 (resumeType !== 'fresher' && template === 3)) {
        line = i !== data.value.length - 1; // Last item has no line
      }

      const str = `project-heading-${i.toString()}`;

      // Calculate text width and height based on context
      const calculateHeight = (isBlock: boolean): number => {
        const widthParam = isBlock ? "183px" : "113px";
        const arr = textWidth("calibri", "normal", "3.2pt", widthParam, v);
        let height = arr[0];

        // Special height calculation for templates 1 and 4 when in block context
        if (isBlock && [1, 4].includes(template)) {
          height = (Math.floor(v.length / 100) + 2) * 5;
        }

        return height;
      };

      const height = calculateHeight(countR > countL);

      const bulletProps: BulletComponentProps = {
        top: rightH + marginSec,
        height: height,
        name: v,
        ...(line !== undefined && { line })
      };

      // Add bullet component
      if (countR > countL) {
        obj.block.components.push(BlockBulletSmall);
        obj.block.ids.push(str);
        obj.block.props.push(bulletProps);
      } else {
        obj.right.components.push(RightBlockBulletSmall);
        obj.right.ids.push(str);
        obj.right.props.push(bulletProps);
      }

      rightH = rightH + marginSec + height;

      // Handle bullet item overflow
      if (rightH > getOverflowThreshold()) {
        countR++;

        // Special line adjustment for templates with line support
        if (line !== undefined && obj.right.props.length > 1) {
          const lastProp = obj.right.props[obj.right.props.length - 2];
          if (lastProp && typeof lastProp === 'object' && 'line' in lastProp) {
            (lastProp as any).line = false;
          }
        }

        rightH = 297 * (countR - 1) + marginPage;

        // Complex bullet overflow handling
        if (countR > countL) {
          if (countR - 1 === countL) {
            obj.right.components.pop();
            obj.right.ids.pop();
            obj.right.props.pop();

            const newHeight = calculateHeight(true);
            const newProps: BulletComponentProps = {
              top: rightH + marginSec,
              height: newHeight,
              name: v,
              ...(line !== undefined && { line })
            };

            obj.block.components.push(BlockBulletSmall);
            obj.block.ids.push(str);
            obj.block.props.push(newProps);
            rightH = rightH + marginSec + newHeight;
          } else {
            obj.block.components.pop();
            obj.block.ids.pop();
            obj.block.props.pop();

            const newHeight = calculateHeight(true);
            // Use 'data' instead of 'name' in some contexts (preserved from original)
            const newProps: BulletComponentProps = {
              top: rightH + marginSec,
              height: newHeight,
              data: v, // Using 'data' for consistency with original overflow logic
              ...(line !== undefined && { line })
            };

            obj.block.components.push(BlockBulletSmall);
            obj.block.ids.push(str);
            obj.block.props.push(newProps);
            rightH = rightH + marginSec + newHeight;
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
          const newProps: BulletComponentProps = {
            top: rightH + marginSec,
            height: newHeight,
            data: v, // Using 'data' for consistency with original overflow logic
            ...(line !== undefined && { line })
          };

          obj.right.components.push(RightBlockBulletSmall);
          obj.right.ids.push(str);
          obj.right.props.push(newProps);
          rightH = rightH + marginSec + newHeight;
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
    console.error('Error in extraInfo function:', error);
    throw error;
  }
};

export default extraInfo;
export type { ResumeType, TemplateNumber, ExtraInfoData };