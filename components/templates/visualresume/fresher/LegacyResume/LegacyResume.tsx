
import React, { useMemo } from 'react';
import { VisualResumeData } from '@/types/visualresume/fresher';
import {
  MainBlock
} from '@/components/templates/visualresume/fresher/LegacyResumeComponents';
import  { LeftBlock, RightBlock} from '@/components/molecules/visualresume';

import userInfo from '@/lib/visualresume/info/userInfo';
import profileSummary from '@/lib/visualresume/info/profileSummary';
import skillInfo from '@/lib/visualresume/info/skillInfo';
import workExpInfo from '@/lib/visualresume/info/workExpInfo';
import projectInfo from '@/lib/visualresume/info/projectInfo';
import educationInfo from '@/lib/visualresume/info/educationInfo';
import extraInfo from '@/lib/visualresume/info/extraInfo';
import areaInfo from '@/lib/visualresume/info/areaInfo';
import hobbiesInfo from '@/lib/visualresume/info/hobbiesInfo';
import { FaAward } from 'react-icons/fa';
import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';
import {ResumeType, TemplateNumber, ComponentSequenceObj, PageStructure} from '@/types/visualresume'



interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  photoUrl?: string;
  username: string;
}

interface LegacyResumeProps {
  visualResume: VisualResumeData;
  user: User;
  isPreview?: boolean;
  fontFamily?: string;
  template: TemplateNumber;
  resumeType: ResumeType;
  fac : number;
}

// Main component sequence function
export const componentSequence = (
  visualresume: VisualResumeData,
  name: string,
  email: string,
  photo: string,
  resumeType: 'fresher' | 'pro' | 'expert',
  template: 1 | 2 | 3 | 4 | 5 = 1
): ComponentSequenceObj => {
  // Extract layout configuration correctly
  const layout = visualresume.layout;
  const marginSec = 2;
  const marginBullet = 1;
  const marginPage = 5;


  let obj: ComponentSequenceObj = {
    left: {
      components: [],
      ids: [],
      props: [],
    },
    right: {
      components: [],
      ids: [],
      props: [],
    },
    block: {
      components: [],
      ids: [],
      props: [],
    },
    countL: 1,
    countR: 1,
    leftH: 0,
    rightH: 0,
    pages:[],
    currentPage: 0
  };

  // Process components based on your actual layout structure
  // Your layout.listLR has left and right arrays, but we need to use layout.display for visibility
  if (layout?.sequencelr?.left) {
    layout.sequencelr.left.forEach((componentKey: string, index: number) => {
      // Check if component is displayed (using display object)
      const isDisplayed = layout.display?.[componentKey as keyof typeof layout.display];
      
      if (!isDisplayed) {
        console.log(`⏭️ Skipping ${componentKey} - not displayed`);
        return;
      }

      switch (componentKey) {
        case 'personalInfo':

            break;
        case 'userInfo':
            obj = userInfo(obj, name, email, photo, visualresume.personalInformation, marginSec, marginBullet, marginPage, resumeType, template);
            break;
        case 'profileSummaryInfo':
            const aboutMe = visualresume.personalInformation?.aboutMe || '';
            obj = profileSummary(obj, aboutMe, 'PROFILE', marginSec, marginBullet, marginPage, resumeType, template);
            break;
        case 'techSkillsInfo':
       obj = skillInfo(obj, visualresume.skills, marginSec, marginBullet, marginPage,resumeType, template);
          break;
        case 'hobbiesInfo':
          obj = hobbiesInfo(obj, visualresume.hobbies, marginSec, marginBullet, marginPage);
          break;
      }
          
    });
  }

  // Process right side components
  if (layout?.sequencelr?.right) {
    layout.sequencelr.right.forEach((componentKey: string) => {
      // Check if component is displayed
      const isDisplayed = layout.display?.[componentKey as keyof typeof layout.display];
      
      if (!isDisplayed) return;

      switch (componentKey) {
        case 'workexpInfo':
          obj = workExpInfo(obj, visualresume.trainingInformation, marginSec, marginBullet, marginPage, resumeType, template);
          break;
        case 'projectsInfo':
          obj = projectInfo(obj, visualresume.projectInformation, marginSec, marginBullet, marginPage,resumeType, template);
          break;
        case 'educationInfo':
          obj = educationInfo(obj, visualresume.educationalInformation, marginSec, marginBullet, marginPage, resumeType, template);
          break;
        case 'achievmentsInfo':
          obj = extraInfo(obj, visualresume.extraCurricular, marginSec, marginBullet, marginPage, FaAward , resumeType, template);
          break;
        case 'areaOfIntrestInfo':
          obj = areaInfo(obj, visualresume.areaOfIntrest, marginSec, marginBullet, marginPage, resumeType, template);
          break;
      }
    });
  }

 // console.log('Final Component Sequence:', obj);
  return obj;
};

const LegacyResume: React.FC<LegacyResumeProps> = ({ visualResume, user, isPreview = false, fontFamily, fac, template, resumeType }) => {
  const currentColors = visualResume.colors || { bg: '#2563eb', font: '#ffffff' };
  //const fac = isPreview ? 0.8 : 2.0; // Scaling factor
    const seq = useMemo(() => {
    return componentSequence(visualResume, user?.name || '', user?.email || '', `http://localhost:8000/api/user/photo/${user.username}` || '', resumeType || 'fresher', template || 1);
  }, [
    // minimal, focused deps:
    visualResume?.layout?.sequencelr?.left && visualResume.layout.sequencelr.left.join(','),
    visualResume?.layout?.sequencelr?.right && visualResume.layout.sequencelr.right.join(','),
    visualResume?.layout?.display && JSON.stringify(Object.keys(visualResume.layout.display).filter(k => visualResume.layout.display[k as keyof typeof visualResume.layout.display])),
    // content that changes rendering:
    visualResume?.personalInformation?.aboutMe,
    visualResume?.personalInformation?.phone,
    visualResume?.skills,
    visualResume?.projectInformation && visualResume.projectInformation.value.length,
  ]);
  // Get the component sequence based on layout configuration
  const resumeData = seq

  // Render components dynamically
  const renderComponents = (components: React.ComponentType<any>[], ids: string[], props: any[]) => {
    return components.map((Component, index) => (
      <Component
        key={index}
        fac={fac}
        bg={currentColors.bg}
        font={currentColors.font}
        id={ids[index]}
        props={props[index]}
        fontFamily={fontFamily || "Calibri, sans-serif"}
        template={template || 1}
        resumeType={resumeType || 'fresher'}
      />
    ));
  };

  return (

    <MainBlock fac={fac} height={297} bg="#7a1515ff" fontFamily={fontFamily} id="main-resume">
      {(resumeData.pages.length > 0) ? (<div className="" id = "resume-page1">
      {/* Left Block */}
      { (resumeData.left.components.length > 0) ?
        (<LeftBlock fac={fac} height={297} bg={currentColors.bg} font="calibri" id="left-block" resumeType={resumeType || 'fresher'} template = {template || 1} >
          {renderComponents(resumeData.pages[0].left.components, resumeData.pages[0].left.ids, resumeData.pages[0].left.props)}
        </LeftBlock>) : null
      }

      {/* Right Block */}
      {
        (resumeData.left.components.length > 0) ? 
          (<RightBlock fac={fac} height={297} bg={currentColors.bg} font="calibri" id="right-block" resumeType={resumeType || 'fresher'} template = {template || 1}  >
            {renderComponents(resumeData.pages[0].right.components, resumeData.pages[0].right.ids, resumeData.pages[0].right.props)}
            </RightBlock>): null
      }

      {/* Block components (for multi-page support) 
      {resumeData.block.components.map((Component, index) => (
        <Component
          key={resumeData.block.ids[index]}
          fac={fac}
          bg={currentColors.bg}
          font="calibri"
          id={resumeData.block.ids[index]}
          props={resumeData.block.props[index]}
        />
      ))}*/}
          </div>) : null}
    </MainBlock>

  );
};

export default LegacyResume;
