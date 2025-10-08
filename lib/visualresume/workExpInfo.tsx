import React from 'react';
import { IconType } from 'react-icons';
import { FaCog } from 'react-icons/fa';
import { textWidth, textWidthL } from './common';
import { 
  RightBlockHeading, 
  RightBlockLogo, 
  RightBlockWorkExp, 
  RightBlockBullet, 
  BlockHeading, 
  BlockBullet, 
  VL 
} from '@/components/molecules/visualresume';
import {
  ComponentSequenceObj
} from '@/components/templates/visualresume/fresher/LegacyResumeHelpers/LegacyResumeHelpers';

// Type definitions
type ResumeType = 'fresher' | 'pro' | 'expert';
type TemplateNumber = 1 | 2 | 3 | 4 | 5;

interface WorkExpData {
  title: string;
  value: WorkExpItem[];
}

interface WorkExpItem {
  org: string;
  type?: string; // For fresher templates
  designation?: string; // For pro/expert templates
  startDate: string;
  endDate: string;
  desc?: string; // For fresher templates
  role?: string[]; // For pro/expert templates
}

interface WorkExpComponentProps {
  top: number;
  height: number;
  org: string;
  type?: string;
  designation?: string;
  startD: string;
  endD: string;
  desc?: string;
  role?: boolean;
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

interface BulletComponentProps {
  top: number;
  name: string;
  height: number;
  line?: boolean;
}

interface VLComponentProps {
  top: number;
  height: number;
}

const workExpInfo = (
  obj: ComponentSequenceObj,
  data: WorkExpData,
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

    // Handle page overflow check - special logic for pro template 3
    const getOverflowThreshold = () => {
      if (resumeType === 'pro' && template === 3) {
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

    // Determine component targets based on count comparison
    const addLogoAndHeading = () => {
      const logoProps: LogoComponentProps = {
        top: rightH + marginSec,
        name: FaCog
      };

      const headingProps: HeadingComponentProps = {
        top: rightH + marginSec,
        name: data.title,
        height: 13
      };

      if (countR > countL) {
        // Add to block (when right page count exceeds left)
        obj.block.components.push(RightBlockLogo);
        obj.block.ids.push("workex-logo");
        obj.block.props.push(logoProps);

        // Use different heading component for fresher templates 2,3,4,5
        if (resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) {
          obj.block.components.push(BlockHeading);
        } else {
          obj.block.components.push(RightBlockHeading);
        }
        obj.block.ids.push("workex");
        obj.block.props.push(headingProps);
      } else {
        // Add to right section
        obj.right.components.push(RightBlockLogo);
        obj.right.ids.push("workex-logo");
        obj.right.props.push(logoProps);

        obj.right.components.push(RightBlockHeading);
        obj.right.ids.push("workex");
        obj.right.props.push(headingProps);
      }
    };

    addLogoAndHeading();

    // Calculate initial rightH adjustment - pro template 5 uses +10 instead of +13
    const headingAdjustment = (resumeType === 'pro' && template === 5) ? 10 : 13;
    rightH = rightH + marginSec + headingAdjustment;

    // Process each work experience item
    data.value.forEach((v: WorkExpItem, i: number) => {
      // Handle work experience entry
      const str = `workex-heading-${i.toString()}`;

      // Prepare work exp props based on resume type
      const getWorkExpProps = (): WorkExpComponentProps => {
        const baseProps: WorkExpComponentProps = {
          top: rightH + marginSec,
          height: resumeType === 'fresher' ? 12 : 14,
          org: v.org,
          startD: v.startDate,
          endD: v.endDate
        };

        if (resumeType === 'fresher') {
          // Calculate description height for fresher templates
          const textWidthFunc = textWidth;
          const arr = textWidthFunc("calibri", "normal", "3.2pt", "113px", v.desc || "");
         // console.log(arr)
          baseProps.height = 12 + arr[0];
          baseProps.type = v.type;
          baseProps.desc = v.desc;

          // Add line property for templates 2,3,4,5
          if ([2, 3, 4, 5].includes(template)) {
            baseProps.line = i !== data.value.length - 1;
          }
        } else {
          // Pro/Expert templates
          baseProps.designation = v.designation;
          baseProps.role = v.role && v.role.length > 0;
        }

        return baseProps;
      };

      const workExpProps = getWorkExpProps();

      // Add work experience component
      if (countR > countL) {
        obj.block.components.push(RightBlockWorkExp);
        obj.block.ids.push(str);
        obj.block.props.push(workExpProps);
      } else {
        obj.right.components.push(RightBlockWorkExp);
        obj.right.ids.push(str);
        obj.right.props.push(workExpProps);
      }

      rightH = rightH + marginSec + workExpProps.height;

      // Handle page overflow for work experience
      if (rightH > getOverflowThreshold()) {
        countR++;
        rightH = 297 * (countR - 1) + marginPage;

        // Complex overflow handling logic
        if (countR > countL) {
          if (countR - 1 === countL) {
            // Remove last component and re-add to block
            obj.right.components.pop();
            obj.right.ids.pop();
            obj.right.props.pop();

            if (countR === 2) {
              obj.page1.right.components = [...obj.right.components];
              obj.page1.right.ids = [...obj.right.ids];
              obj.page1.right.props = [...obj.right.props];
            }

            obj.block.components.push(RightBlockWorkExp);
            obj.block.ids.push(str);
            obj.block.props.push(workExpProps);
            rightH = rightH + marginSec + workExpProps.height;
          } else {
            // Move from block to block (different page)
            obj.block.components.pop();
            obj.block.ids.pop();
            obj.block.props.pop();

            obj.block.components.push(RightBlockWorkExp);
            obj.block.ids.push(str);
            obj.block.props.push(workExpProps);
            rightH = rightH + marginSec + workExpProps.height;
          }
        } else {
          // Move from right to right (different page)
          obj.right.components.pop();
          obj.right.ids.pop();
          obj.right.props.pop();

          if (countR === 2) {
            obj.page1.right.components = [...obj.right.components];
            obj.page1.right.ids = [...obj.right.ids];
            obj.page1.right.props = [...obj.right.props];
          }

          obj.right.components.push(RightBlockWorkExp);
          obj.right.ids.push(str);
          obj.right.props.push(workExpProps);
          rightH = rightH + marginSec + workExpProps.height;
        }
      }

      // Handle roles for pro/expert templates
      if (resumeType !== 'fresher' && v.role && v.role.length > 0) {
        v.role.forEach((r: string, idx: number) => {
          const roleStr = `workex-role-${idx.toString()}`;

          // Calculate text width based on context
          const widthParam = (countR > countL) ? "183px" : "113px";
          const arr = textWidthL("calibri", "normal", "3.2pt", widthParam, r);
          const height = arr[0];

          // Determine line property for templates that support it
          let line: boolean | undefined;
          if ([2, 3].includes(template)) {
            line = idx !== v.role!.length - 1;
          }

          const bulletProps: BulletComponentProps = {
            top: rightH + marginBullet,
            name: r,
            height: height,
            ...(line !== undefined && { line })
          };

          // Add bullet component
          if (countR > countL) {
            obj.block.components.push(BlockBullet);
            obj.block.ids.push(roleStr);
            obj.block.props.push(bulletProps);
          } else {
            obj.right.components.push(RightBlockBullet);
            obj.right.ids.push(roleStr);
            obj.right.props.push(bulletProps);
          }

          rightH = rightH + 2 * marginBullet + height;

          // Handle role overflow
          if (rightH > getOverflowThreshold()) {
            countR++;
            rightH = 297 * (countR - 1) + marginPage;

            // Complex role overflow handling with line adjustment
            if (countR > countL) {
              if (countR - 1 === countL) {
                obj.right.components.pop();
                obj.right.ids.pop();
                obj.right.props.pop();

                // Adjust previous line property
                if ([2, 3].includes(template) && obj.right.props.length > 0) {
                  const lastProp = obj.right.props[obj.right.props.length - 1] as any;
                  if ('line' in lastProp) lastProp.line = false;
                }

                if (countR === 2) {
                  obj.page1.right.components = [...obj.right.components];
                  obj.page1.right.ids = [...obj.right.ids];
                  obj.page1.right.props = [...obj.right.props];
                }

                // Recalculate for block context
                const blockArr = textWidthL("calibri", "normal", "3.2pt", "183px", r);
                bulletProps.height = blockArr[0];

                obj.block.components.push(BlockBullet);
                obj.block.ids.push(roleStr);
                obj.block.props.push(bulletProps);
                rightH = rightH + 2 * marginBullet + blockArr[0];
              } else {
                obj.block.components.pop();
                obj.block.ids.pop();
                obj.block.props.pop();

                if ([2, 3].includes(template) && obj.block.props.length > 0) {
                  const lastProp = obj.block.props[obj.block.props.length - 1] as any;
                  if ('line' in lastProp) lastProp.line = false;
                }

                obj.block.components.push(BlockBullet);
                obj.block.ids.push(roleStr);
                obj.block.props.push(bulletProps);
                rightH = rightH + 2 * marginBullet + height;
              }
            } else {
              obj.right.components.pop();
              obj.right.ids.pop();
              obj.right.props.pop();

              if ([2, 3].includes(template) && obj.right.props.length > 0) {
                const lastProp = obj.right.props[obj.right.props.length - 1] as any;
                if ('line' in lastProp) lastProp.line = false;
              }

              if (countR === 2) {
                obj.page1.right.components = [...obj.right.components];
                obj.page1.right.ids = [...obj.right.ids];
                obj.page1.right.props = [...obj.right.props];
              }

              obj.right.components.push(RightBlockBullet);
              obj.right.ids.push(roleStr);
              obj.right.props.push(bulletProps);
              rightH = rightH + 2 * marginBullet + height;
            }
          }
        });
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

    // Final page1 assignment for non-template1 cases
    if (template !== 1 && countR === 1) {
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
    console.error('Error in workExpInfo function:', error);
    throw error;
  }
};

export default workExpInfo;
export type { ResumeType, TemplateNumber, WorkExpData, WorkExpItem };