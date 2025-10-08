import React from 'react';
import { IconType } from 'react-icons';
import { FaTools } from 'react-icons/fa';
import { LeftBlockHeading, LeftBlockSkill, VL } from '@/components/molecules/visualresume';
import {
  ComponentSequenceObj
} from '@/components/templates/visualresume/fresher/LegacyResumeHelpers/LegacyResumeHelpers';

// Type definitions
type ResumeType = 'fresher' | 'pro' | 'expert';
type TemplateNumber = 1 | 2 | 3 | 4 | 5;

interface SkillData {
  title: string;
  value: SkillItem[];
}

interface SkillItem {
  value: string;
  rating: string;
}

interface SkillComponentProps {
  top: number;
  name: string;
  rating: number;
}

interface HeadingComponentProps {
  top: number;
  name: string;
  height: number;
  icon?: IconType;
}

interface VLProps {
  top: number;
  height?: number;
}

const skillInfo = (
  obj: ComponentSequenceObj,
  data: SkillData,
  marginSec: number,
  marginBullet: number,
  marginPage: number,
  resumeType: ResumeType = 'fresher',
  template: TemplateNumber = 1
): ComponentSequenceObj => {
  try {
    let leftH = obj.leftH;
    let rightH = obj.rightH;

    // Handle page overflow check - different logic for template 3
    const pageOverflowThreshold = template === 3 
      ? (obj.countL * 297 - 10) 
      : (obj.countL * 297);

    if (leftH > pageOverflowThreshold) {
      leftH = (297 * (obj.countL - 1)) + marginPage;

      // Add VL component for pro template 3 when starting new page
      if (resumeType === 'pro' && template === 3) {
        obj.left.components.push(VL);
        obj.left.ids.push("vert-l-1");
        obj.left.props.push({
          top: (297 * (obj.countL - 1)) + 15
        } as VLProps);
      }
    }

    // Configure heading properties based on template and resume type
    const getHeadingProps = (): HeadingComponentProps => {
      const baseProps: HeadingComponentProps = {
        top: leftH + marginSec,
        name: data.title,
        height: 9
      };

      // Add icon for specific templates - fresher templates 2,3,4,5 and pro template 2,3
      if (resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) {
        baseProps.icon = FaTools;
      } else if (resumeType === 'pro' && [2, 3].includes(template)) {
        baseProps.icon = FaTools;
      }
      // Expert templates don't use icons based on the patterns observed

      return baseProps;
    };

    // Add heading component
    obj.left.components.push(LeftBlockHeading);
    obj.left.ids.push("skill");
    obj.left.props.push(getHeadingProps());

    leftH = leftH + marginSec + 9;

    // Process each skill item
    data.value.forEach((s: SkillItem, i: number) => {
      let rating = (parseInt(s.rating) / 5) * 100;
      if (rating > 100) {
        rating = 100;
      }

      // Add skill component
      obj.left.components.push(LeftBlockSkill);
      obj.left.ids.push("skill");
      obj.left.props.push({
        top: leftH + marginSec,
        name: s.value,
        rating: rating
      } as SkillComponentProps);

      // Calculate height increment based on template and resume type
      const getHeightIncrement = (): number => {
        if (resumeType === 'fresher') {
          switch (template) {
            case 1:
              return 2 * marginSec + 15;
            case 2:
            case 5:
              return marginSec + 17;
            case 3:
              return marginSec + 18; // Note: template 3 uses different calculation in overflow
            case 4:
              return marginSec + 20;
            default:
              return marginSec + 15;
          }
        } else {
          // Pro and expert templates consistently use marginSec + 15
          return marginSec + 15;
        }
      };

      const heightIncrement = getHeightIncrement();
      leftH = leftH + heightIncrement;

      // Handle page overflow
      const currentPageThreshold = template === 3 
        ? (obj.countL * 297 - 10) 
        : (obj.countL * 297);

      if (leftH > currentPageThreshold) {
        obj.countL = obj.countL + 1;
        leftH = (297 * (obj.countL - 1)) + marginPage;

        // Remove the last added components as they won't fit
        obj.left.components.pop();
        obj.left.ids.pop();
        obj.left.props.pop();

        // Add VL component for specific templates when page overflows
        if ((resumeType === 'pro' && [3, 5].includes(template)) || 
            (resumeType === 'expert' && template === 5)) {
          obj.left.components.push(VL);
          obj.left.ids.push("vert-l-1");

          const vlProps: VLProps = template === 5
            ? { top: (297 * (obj.countL - 1)) + 10, height: 287 }
            : { top: (297 * (obj.countL - 1)) + 15 };

          obj.left.props.push(vlProps);
        }

        // Save components to page1 when moving to second page
        if (obj.countL === 2) {
          console.log(obj.countL, leftH);
          obj.page1.left.components = [...obj.left.components];
          obj.page1.left.ids = [...obj.left.ids];
          obj.page1.left.props = [...obj.left.props];
          console.log(obj.page1.left.props[obj.page1.left.props.length - 1]);
        }

        // Re-add the skill component to the new page
        obj.left.components.push(LeftBlockSkill);
        obj.left.props.push({
          top: leftH + marginSec,
          name: s.value,
          rating: rating
        } as SkillComponentProps);

        leftH = leftH + heightIncrement;
      }
    });

    // Save components to page1 if still on first page
    if (obj.countL === 1) {
      obj.page1.left.components = [...obj.left.components];
      obj.page1.left.ids = [...obj.left.ids];
      obj.page1.left.props = [...obj.left.props];
    }

    obj.leftH = leftH;
    return obj;

  } catch (error) {
    console.error('Error in skillInfo function:', error);
    throw error;
  }
};

export default skillInfo;
export type { ResumeType, TemplateNumber, SkillData, SkillItem };