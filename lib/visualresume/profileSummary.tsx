import React from 'react';
import { IconType } from 'react-icons';
import { FaUser } from 'react-icons/fa';
import { textWidth, textWidthL } from './common';
import { LeftBlockHeading, LeftBlockBullet, VL } from '@/components/molecules/visualresume';
import {
  ComponentSequenceObj
} from '@/components/templates/visualresume/fresher/LegacyResumeHelpers/LegacyResumeHelpers';

// Type definitions
type ResumeType = 'fresher' | 'pro' | 'expert';
type TemplateNumber = 1 | 2 | 3 | 4 | 5;

interface FresherData {
    data: string;
    title: string;
}

interface ProfessionalData {
    title: string;
    value: string[];
}

interface ComponentProps {
    top: number;
    name: string;
    height: number;
    icon?: IconType;
    line?: boolean;
}

interface VLProps {
    top: number;
    bottom: number;
    page: number;
}

interface LeftBlock {
    components: React.ComponentType<any>[];
    ids: string[];
    props: (ComponentProps | VLProps)[];
}

interface ResumeObject {
    leftH: number;
    rightH: number;
    countL: number;
    left: LeftBlock;
}

interface TextWidthResult {
    0: number; // height
    1?: number; // additional properties if any
}

interface TextWidthFunction {
    (font: string, weight: string, size: string, width: string, text: string): TextWidthResult;
}

interface TemplateModule {
    textWidth?: TextWidthFunction;
    textWidthN?: TextWidthFunction;
    textWidthL?: TextWidthFunction;
}

interface ComponentModule {
    default: React.ComponentType<any>;
}

// Main profileSummary function
const profileSummary =  (
    obj: ComponentSequenceObj,
    data: string | ProfessionalData,
    title: string | null,
    marginSec: number,
    marginBullet: number,
    marginPage: number,
    resumeType: ResumeType = 'fresher',
    template: TemplateNumber = 1
): ComponentSequenceObj => {
    let leftH = obj.leftH;
    let rightH = obj.rightH;

    // Load components and text width function



    // Handle template-specific margin adjustments
    if (resumeType === 'fresher' && template === 4) {
        marginSec = 2;
    }

    // Configure heading properties based on template
    const getHeadingProps = (resumeType: ResumeType, template: TemplateNumber): ComponentProps => {
        const headingTitle = resumeType === 'fresher' 
            ? (title as string) 
            : (data as ProfessionalData).title;

        const baseProps: ComponentProps = {
            top: leftH + marginSec,
            name: headingTitle,
            height: 9
        };

        // Add icon for specific templates
        if (resumeType === 'fresher' && [2, 3, 4, 5].includes(template)) {
            baseProps.icon = FaUser;
        } else if ((resumeType === 'pro' || resumeType === 'expert') && [2, 3].includes(template)) {
            baseProps.icon = FaUser;
        }

        return baseProps;
    };

    // Add heading component
    obj.left.components.push(LeftBlockHeading);
    obj.left.ids.push("profile");
    obj.left.props.push(getHeadingProps(resumeType, template));

    leftH = leftH + marginSec + 9;

    // Handle data processing based on resume type
    if (resumeType === 'fresher') {
        // Fresher templates handle simple string data
        const fresherData = data as string;
        const widthParam = template === 1 || template === 3 ? "78px" : "76px";

        try {
            const arr = textWidth("calibri", "normal", "3.2pt", widthParam, fresherData);
            const height = arr[0];
            const line = template === 1 ? undefined : false;

            obj.left.components.push(LeftBlockBullet);
            obj.left.ids.push("profile");

            const bulletProps: ComponentProps = {
                top: leftH + marginBullet,
                name: fresherData,
                height: height
            };

            if (line !== undefined) {
                bulletProps.line = line;
            }

            obj.left.props.push(bulletProps);

            // Calculate final height based on template
            if (template === 3) {
                leftH = leftH + 3 * marginSec + height;
            } else if (template === 4) {
                leftH = leftH + 2 * marginSec + height;
            } else {
                leftH = leftH + marginSec + height;
            }
        } catch (error) {
            console.error('Error calculating text width for fresher template:', error);
            throw error;
        }

    } else {
        // Pro and Expert templates handle structured data with multiple points
        const professionalData = data as ProfessionalData;
        const widthParam = template === 5 ? "74px" : "76px";

        try {
            professionalData.value.forEach((p: string, i: number) => {
                const arr = textWidth("calibri", "normal", "3.2pt", widthParam, p);
                const height = arr[0];
                const str = `profile-point-${i.toString()}`;

                // Handle line styling
                let line = true;
                if (i === professionalData.value.length - 1) {
                    line = false;
                }

                obj.left.components.push(LeftBlockBullet);
                obj.left.ids.push(str);

                const bulletProps: ComponentProps = {
                    top: leftH + marginBullet,
                    name: p,
                    height: height
                };

                // Add line property based on template
                if ([1, 2, 4, 5].includes(template)) {
                    bulletProps.line = line;
                }

                obj.left.props.push(bulletProps);

                leftH = leftH + 2 * marginBullet + height;

                // Handle page overflow for multi-page support
                if (leftH > obj.countL * 297) {
                    obj.countL++;

                    // Add vertical line component for template 5
                    if (template === 5 && VL) {
                        obj.left.components.push(VL);
                        obj.left.ids.push("vl-profile");
                        obj.left.props.push({
                            top: (obj.countL - 1) * 297,
                            bottom: leftH - (obj.countL - 1) * 297,
                            page: obj.countL - 1
                        } as VLProps);
                    }

                    leftH = leftH - (obj.countL - 1) * 297;
                }
            });
        } catch (error) {
            console.error('Error processing professional/expert template:', error);
            throw error;
        }
    }

    obj.leftH = leftH;
    obj.rightH = rightH;

    return obj;
};


export default profileSummary;