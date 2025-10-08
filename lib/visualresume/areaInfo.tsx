import React from 'react';
import { IconType } from 'react-icons';
import { FaBook } from 'react-icons/fa';
import { topicIconsList as  iconList } from './fresher/fresher'; // Import for icon mapping
import { 
  RightBlockHeading, 
  RightBlockLogo, 
  RightBlockArea, 
  VL 
} from '@/components/molecules/visualresume';
import {
  ComponentSequenceObj
} from '@/components/templates/visualresume/fresher/LegacyResumeHelpers/LegacyResumeHelpers';

// Type definitions
type ResumeType = 'fresher' | 'pro' | 'expert';
type TemplateNumber = 1 | 2 | 3 | 4 | 5;

interface AreaInfoData {
  title: string;
  area1Topic: string;
  area2Topic: string;
  area3Topic: string;
}

interface AreaComponentProps {
  top: number;
  height?: number;
  data?: string;
  name?: string;
  logo?: IconType;
  left?: number;
}

interface LogoComponentProps {
  top: number;
  name: IconType | string;
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

const areaInfo = (
  obj: ComponentSequenceObj,
  data: AreaInfoData,
  marginSec: number,
  marginBullet: number,
  marginPage: number,
  resumeType: ResumeType,
  template: TemplateNumber,
): ComponentSequenceObj => {
  try {
    let countL = obj.countL;
    let countR = obj.countR;
    let leftH = obj.leftH;
    let rightH = obj.rightH;
    const tH = 0; // Consistent across all templates

    // Fixed area list (area1, area2, area3)
    const list = ["area1", "area2", "area3"];

    // Template-specific left positioning
    const getLeftPosition = (): number => {
      if (template === 5) {
        return 6; // Template 5 uses left = 6
      }
      return 15; // Templates 1,2,3,4 use left = 15
    };

    let left = getLeftPosition();

    // Handle page overflow check - special logic for template 3
    const getOverflowThreshold = (): number => {
      if (template === 3) {
        return countR * 297 - 10; // Template 3 has special threshold
      }
      return countR * 297;
    };

    // Special initial overflow check for template 3
    const getInitialOverflowThreshold = (): number => {
      if (template === 3) {
        return (countR * 297 - 10) - 10; // Template 3 has double offset for initial check
      }
      return countR * 297;
    };

    // Initial page overflow handling
    if (rightH > getInitialOverflowThreshold()) {
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
        name: countR > countL ? "book" : FaBook // Different logo handling based on context
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

        obj.block.components.push(RightBlockHeading);
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

    rightH = rightH + marginSec + 13;

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

          // Re-add with preserved IDs (note: uses "project" pattern)
          obj.block.components.push(RightBlockLogo);
          obj.block.ids.push("project-logo");
          obj.block.props.push({
            top: rightH + marginSec,
            name: FaBook
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
            name: FaBook
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
          name: FaBook
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

    // Process each area item (area1, area2, area3)
    list.forEach((v: string, i: number) => {
      const str = `area-heading-${i.toString()}`;
      const areaT = `${v}Topic` as keyof AreaInfoData;

      if (countR > countL) {
        // Block context - simplified props
        const areaProps: AreaComponentProps = {
          top: rightH + marginSec,
          height: 10,
          data: v
        };

        obj.block.components.push(RightBlockArea);
        obj.block.ids.push(str);
        obj.block.props.push(areaProps);

        rightH = rightH + marginSec + 10;
      } else {
        // Right context - complex props with icon mapping
        const areaProps: AreaComponentProps = {
          top: rightH + marginSec,
          name: data[areaT],
          logo: iconList[data[areaT]], // Map from iconList
          left: left
        };

        obj.right.components.push(RightBlockArea);
        obj.right.ids.push(str);
        obj.right.props.push(areaProps);

        // Handle area item overflow
        if (rightH > getOverflowThreshold()) {
          countR++;
          rightH = 297 * (countR - 1) + marginPage;

          // Complex area overflow handling
          if (countR > countL) {
            if (countR - 1 === countL) {
              obj.right.components.pop();
              obj.right.ids.pop();
              obj.right.props.pop();

              const blockProps: AreaComponentProps = {
                top: rightH + marginSec,
                height: 10,
                data: v
              };

              obj.block.components.push(RightBlockArea);
              obj.block.ids.push(str);
              obj.block.props.push(blockProps);

              rightH = rightH + marginSec + 10;
            } else {
              obj.block.components.pop();
              obj.block.ids.pop();
              obj.block.props.pop();

              const blockProps: AreaComponentProps = {
                top: rightH + marginSec,
                height: 10,
                data: v
              };

              obj.block.components.push(RightBlockArea);
              obj.block.ids.push(str);
              obj.block.props.push(blockProps);

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

            const rightProps: AreaComponentProps = {
              top: rightH + marginSec,
              name: data[areaT],
              logo: iconList[data[areaT]],
              left: left
            };

            obj.right.components.push(RightBlockArea);
            obj.right.ids.push(str);
            obj.right.props.push(rightProps);
          }
        }

        // Template-specific left increment
        const getLeftIncrement = (): number => {
          if (template === 5) {
            return 36; // Template 5 uses increment of 36
          }
          return 32; // Templates 1,2,3,4 use increment of 32
        };

        left = left + getLeftIncrement();
      }
    });

    // Add final spacing
    rightH = rightH + marginSec + 15;

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

          obj.page1.right.components = [...obj.right.components];
          obj.page1.right.ids = [...obj.right.ids];
          obj.page1.right.props = [...obj.right.props];
        } else {
          obj.right.components.push(VL);
          obj.right.props.push(vlProps);
        }
      }
    } else {
      // Non-template1 handling
      if (countR > countL) {
        // Add height props for block context in non-template1 cases
        obj.block.props.push({
          top: (297 * (countR - 1)) + marginPage + marginSec,
          height: 297 - ((297 * countR) - rightH)
        });
      } else {
        if (countR === 1) {
          obj.page1.right.components = [...obj.right.components];
          obj.page1.right.ids = [...obj.right.ids];
          obj.page1.right.props = [...obj.right.props];
        } else {
          // Add height props for right context in non-template1 cases
          obj.right.props.push({
            top: (297 * (countR - 1)) + marginPage + marginSec,
            height: 297 - ((297 * countR) - rightH)
          });
        }
      }
    }

    // Update counts and heights
    obj.countL = countL;
    obj.countR = countR;
    obj.leftH = leftH;
    obj.rightH = rightH;

    return obj;

  } catch (error) {
    console.error('Error in areaInfo function:', error);
    throw error;
  }
};

export default areaInfo;
export type { ResumeType, TemplateNumber, AreaInfoData };