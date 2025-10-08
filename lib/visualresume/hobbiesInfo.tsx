import React from 'react';
import { IconType } from 'react-icons';
import { FaBookReader } from 'react-icons/fa';
import { hobbiesList } from './fresher/fresher'; // Import for hobby icon mapping
import { 
  LeftBlockContactInfo, 
  LeftBlockHeading,
  VL 
} from '@/components/molecules/visualresume';
import {
  ComponentSequenceObj
} from '@/components/templates/visualresume/fresher/LegacyResumeHelpers/LegacyResumeHelpers';

// Type definitions
type ResumeType = 'fresher' | 'pro' | 'expert';
type TemplateNumber = 1 | 2 | 3 | 4 | 5;

interface HobbiesInfoData {
  title: string;
  value: string[];
}

interface ContactInfoComponentProps {
  top: number;
  name: string;
  icon: IconType;
  height: number;
}

interface HeadingComponentProps {
  top: number;
  name: string;
  height: number;
  icon?: IconType; // Optional icon for templates 2,3,4,5
}

interface VLComponentProps {
  top: number;
  height?: number; // Optional height for template 5
}

const hobbiesInfo = (
  obj: ComponentSequenceObj,
  data: HobbiesInfoData,
  marginSec: number,
  marginBullet: number,
  marginPage: number,
  resumeType: ResumeType = 'fresher',
  template: TemplateNumber = 1
): ComponentSequenceObj => {
  try {
    let leftH = obj.leftH;
    let rightH = obj.rightH;

    // Template-specific overflow threshold
    const getOverflowThreshold = (): number => {
      if (template === 3) {
        return obj.countL * 297 - 10; // Template 3 uses special threshold
      }
      return obj.countL * 297;
    };

    // Special initial VL handling for pro template 3
    if (resumeType === 'pro' && template === 3 && leftH > (obj.countL * 297 - 10)) {
      leftH = (297 * (obj.countL - 1)) + marginPage;

      obj.left.components.push(VL);
      obj.left.ids.push("vert-l-1");
      obj.left.props.push({
        top: (297 * (obj.countL - 1)) + 15
      } as VLComponentProps);
    }

    // Add heading component
    const addHeading = () => {
      const headingProps: HeadingComponentProps = {
        top: leftH + marginSec,
        name: data.title,
        height: 9
      };

      // Templates 2,3,4,5 include icon in heading (except pro template 1,4,5 and expert 1,4)
      const shouldIncludeHeadingIcon = () => {
        if (resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) return true;
        if (resumeType === 'pro' && [2, 3].includes(template)) return true;
        if (resumeType === 'expert' && [2, 3, 5].includes(template)) return true;
        return false;
      };

      if (shouldIncludeHeadingIcon()) {
        headingProps.icon = FaBookReader;
      }

      obj.left.components.push(LeftBlockHeading);
      obj.left.ids.push("hobbies");
      obj.left.props.push(headingProps);
    };

    addHeading();

    leftH = leftH + marginSec + 9;

    // Process each hobby item
    data.value.forEach((p: string, i: number) => {
      const str = `hobbies-${i.toString()}`;

      const contactProps: ContactInfoComponentProps = {
        top: leftH + marginSec,
        name: p,
        icon: hobbiesList[p], // Map from hobbiesList
        height: 5
      };

      obj.left.components.push(LeftBlockContactInfo);
      obj.left.ids.push(str);
      obj.left.props.push(contactProps);

      leftH = leftH + marginSec + 5;

      // Handle overflow
      if (leftH > getOverflowThreshold()) {
        obj.countL = obj.countL + 1;

        // Remove last added component
        obj.left.components.pop();
        obj.left.ids.pop();
        obj.left.props.pop();

        // Handle VL component addition for specific templates
        const shouldAddVLOnOverflow = () => {
          if (resumeType === 'pro' && template === 3) return true;
          if (resumeType === 'pro' && template === 5) return true;
          return false;
        };

        if (shouldAddVLOnOverflow()) {
          obj.left.components.push(VL);
          obj.left.ids.push("vert-l-1");

          if (template === 5) {
            // Pro template 5 includes height
            obj.left.props.push({
              top: (297 * (obj.countL - 1)) + 10,
              height: 287
            } as VLComponentProps);
          } else {
            // Pro template 3 just includes top
            obj.left.props.push({
              top: (297 * (obj.countL - 1)) + 15
            } as VLComponentProps);
          }
        }

        // Recalculate leftH for new page
        leftH = (297 * (obj.countL - 1)) + marginPage;

        // Re-add the component that didn't fit
        obj.left.components.push(LeftBlockContactInfo);
        obj.left.ids.push(str);
        obj.left.props.push({
          top: leftH + marginSec,
          name: p,
          icon: hobbiesList[p],
          height: 5
        } as ContactInfoComponentProps);

        leftH = leftH + marginSec + 5;
      }
    });

    // Update heights
    obj.leftH = leftH;
    obj.rightH = rightH;

    return obj;

  } catch (error) {
    console.error('Error in hobbiesInfo function:', error);
    throw error;
  }
};

export default hobbiesInfo;
export type { ResumeType, TemplateNumber, HobbiesInfoData };