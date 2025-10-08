import React from 'react';
import { IconType } from 'react-icons';
import { FaUserPlus } from 'react-icons/fa';
import { textWidth } from './common';
import { 
  RightBlockHeading, 
  RightBlockLogo, 
  RightBlockComp,
  BlockHeading,
  VL 
} from '@/components/molecules/visualresume';
import {
  ComponentSequenceObj
} from '@/components/templates/visualresume/fresher/LegacyResumeHelpers/LegacyResumeHelpers';

// Type definitions
type ResumeType = 'fresher' | 'pro' | 'expert';
type TemplateNumber = 1 | 2 | 3 | 4 | 5;

interface CompInfoData {
  title: string;
  value: string[];
}

interface CompComponentProps {
  top: number;
  name: string;
  left: number;
  width: number;
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

const compInfo = (
  obj: ComponentSequenceObj,
  data: CompInfoData,
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
    let width = 0; // Width tracking for horizontal component layout

    // Note: compInfo is only available for professional and expert resume types
    if (resumeType === 'fresher') {
      console.warn('compInfo is not available for fresher resume type');
      return obj;
    }

    // Handle page overflow check - special logic for template 3
    const getOverflowThreshold = (): number => {
      if (template === 3) {
        return obj.countR * 297 - 10; // Template 3 uses obj.countR instead of countR
      }
      return countR * 297;
    };

    // Initial page overflow handling
    if (rightH > getOverflowThreshold()) {
      countR++;
      rightH = 297 * (countR - 1) + marginPage;
    }

    // Add logo and heading components
    const addLogoAndHeading = () => {
      const logoProps: LogoComponentProps = {
        top: rightH + marginSec,
        name: FaUserPlus
      };

      const headingProps: HeadingComponentProps = {
        top: rightH + marginSec,
        name: data.title,
        height: 13
      };

      if (countR > countL) {
        // Add to block
        obj.block.components.push(RightBlockLogo);
        obj.block.ids.push("comp-logo");
        obj.block.props.push(logoProps);

        // Use BlockHeading for pro template 2
        if (resumeType === 'pro' && template === 2) {
          obj.block.components.push(BlockHeading);
        } else {
          obj.block.components.push(RightBlockHeading);
        }
        obj.block.ids.push("comp");
        obj.block.props.push(headingProps);
      } else {
        // Add to right section
        obj.right.components.push(RightBlockLogo);
        obj.right.ids.push("comp-logo");
        obj.right.props.push(logoProps);

        obj.right.components.push(RightBlockHeading);
        obj.right.ids.push("comp");
        obj.right.props.push(headingProps);
      }
    };

    addLogoAndHeading();
    rightH = rightH + marginSec + 13;

    // Template-specific layout parameters
    const getLayoutParams = () => {
      if (template === 5) {
        return {
          initialLeft: 6,
          widthThreshold: 124
        };
      }
      return {
        initialLeft: 15,
        widthThreshold: 115
      };
    };

    const { initialLeft, widthThreshold } = getLayoutParams();

    // Process each competency item with horizontal layout
    data.value.forEach((c: string, i: number) => {
      const left = initialLeft + width;
      const arr = textWidth("calibri", "normal", "3.2pt", "auto", c);
      const componentWidth = arr[1] + marginBullet;

      width = width + arr[1] + 2 * marginBullet;

      // Check if current line width exceeds threshold - wrap to new line
      if (width > widthThreshold) {
        // Reset width tracking for new line
        width = 0;
        const newLeft = initialLeft + width;

        // Move to next line
        rightH = rightH + marginBullet + 5 + marginBullet;

        // Add component on new line
        const compProps: CompComponentProps = {
          top: rightH,
          name: c,
          left: newLeft,
          width: componentWidth
        };

        obj.right.components.push(RightBlockComp);
        obj.right.ids.push("comp");
        obj.right.props.push(compProps);

        // Update width tracking for new line
        width = width + arr[1] + 2 * marginBullet;
      } else {
        // Add component on current line
        const compProps: CompComponentProps = {
          top: rightH,
          name: c,
          left: left,
          width: componentWidth
        };

        obj.right.components.push(RightBlockComp);
        obj.right.ids.push("comp");
        obj.right.props.push(compProps);
      }
    });

    // Final spacing adjustment
    rightH = rightH + marginSec + 5;

    // Update heights
    obj.leftH = leftH;
    obj.rightH = rightH;

    return obj;

  } catch (error) {
    console.error('Error in compInfo function:', error);
    throw error;
  }
};

export default compInfo;
export type { ResumeType, TemplateNumber, CompInfoData };