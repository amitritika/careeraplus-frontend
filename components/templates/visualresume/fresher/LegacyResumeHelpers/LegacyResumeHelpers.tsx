import React from 'react';
import { Profile, 
  VisualResumeData, 
  PersonalInformation, 
  EducationalInformation, 
  ProjectInformation, 
  TrainingInformation, 
  Skills,
  AreaOfIntrest, 
  Hobbies,
ExtraCurricular} from '@/types/visualresume/fresher';

import {UserName, UserDesignation, UserPhoto, LeftBlockHeading, LeftBlockContactInfo, 
  LeftBlockBullet, LeftBlockSkill, VL, RightBlockHeading, RightBlockProject, 
  RightBlockWorkExp, RightBlockEdu, RightBlockBullet, RightBlockBulletSmall, 
  RightBlockArea, BlockProject, BlockBullet, BlockBulletSmall, BlockEdu, RightBlockLogo} from '@/components/molecules/visualresume'
import { 
  FaPhone, FaEnvelope, FaHome, FaGraduationCap, FaFolderOpen, 
  FaCog, FaAward, FaBook, FaPassport 
} from 'react-icons/fa';

import { iconList } from '@/lib/visualresume/fresher/fresher';

export interface Page {
  left: {
    components: React.ComponentType<any>[];
    ids: string[];
    props: any[];
  };
  right: {
    components: React.ComponentType<any>[];
    ids: string[];
    props: any[];
  };
  block: {
    components: React.ComponentType<any>[];
    ids: string[];
    props: any[];
  };
}

// Component sequence object interface
export interface ComponentSequenceObj {
  left: {
    components: React.ComponentType<any>[];
    ids: string[];
    props: any[];
  };
  right: {
    components: React.ComponentType<any>[];
    ids: string[];
    props: any[];
  };
  block: {
    components: React.ComponentType<any>[];
    ids: string[];
    props: any[];
  };
  countL: number;
  countR: number;
  leftH: number;
  rightH: number;
  pages: Page[]
    
}

// User Info Section
export const userInfo = (
  obj: ComponentSequenceObj, 
  name: string, 
  email: string, 
  photo: string, 
  data: any, 
  marginSec: number, 
  marginBullet: number, 
  marginPage: number
): ComponentSequenceObj => {
  let leftH = obj.leftH;
  let rightH = obj.rightH;

  // User photo
  if (data?.photoDisplay && photo) {
    obj.left.components.push(UserPhoto);
    obj.left.ids.push('user-photo-dummy');
    obj.left.props.push({ top: 10, photo: photo, height: 53 });
    leftH = 10 + 53;
  }

  // User name
  obj.left.components.push(UserName);
  obj.left.ids.push('user-name-dummy');
  obj.left.props.push({ top: leftH + marginSec, name: name, height: 13 });
  leftH = leftH + marginSec + 13;

  // User designation
  if (data?.designation) {
    
    obj.left.components.push(UserDesignation);
    obj.left.ids.push('user-designation-dummy');
    obj.left.props.push({ top: leftH + 1, name: data.designation, height: 9 });
    leftH = leftH + 1 + 9;
  }

  // Vertical line
  obj.right.components.push(VL);
  obj.right.ids.push('vl-page1');
  obj.right.props.push({ top: 0, height: 297 });

  // Contact section
  obj.left.components.push(LeftBlockHeading);
  obj.left.ids.push('contact-dummy');
  obj.left.props.push({ top: leftH + marginSec + 5, heading: 'CONTACT', height: 9 });
  leftH = leftH + marginSec + 5 + 9;

  // Phone
  if (data?.phone) {
    obj.left.components.push(LeftBlockContactInfo);
    obj.left.ids.push('contact-phone-dummy');
    obj.left.props.push({ 
      top: leftH + marginSec, 
      name: 'phone',
      value: data.phone,
      icon: FaPhone, 
      height: 7 
    });
    leftH = leftH + marginSec + 7;
  }

  // Email
  obj.left.components.push(LeftBlockContactInfo);
  obj.left.ids.push('contact-email-dummy');
  obj.left.props.push({ 
    top: leftH + marginSec, 
    name: 'email',
    value: email,
    icon: FaEnvelope, 
    height: 7 
  });
  leftH = leftH + marginSec + 7;

  // Address
  if (data?.addressDisplay && data?.address) {
    obj.left.components.push(LeftBlockContactInfo);
    obj.left.ids.push('contact-address-dummy');
    obj.left.props.push({ 
      top: leftH + marginSec, 
      name: 'address',
      value: data.address,
      icon: FaHome, 
      height: 7 
    });
    leftH = leftH + marginSec + 7;
  }

  obj.leftH = leftH;
  obj.rightH = rightH;
  return obj;
};

// Profile Summary Section
export const profileSummary = (
  obj: ComponentSequenceObj, 
  data: string, 
  title: string, 
  marginSec: number, 
  marginBullet: number, 
  marginPage: number
): ComponentSequenceObj => {
  
  let leftH = obj.leftH;
  
  obj.left.components.push(LeftBlockHeading);
  obj.left.ids.push('profile-heading');
  obj.left.props.push({ top: leftH + marginSec + 5, heading: title, height: 9 });
  leftH = leftH + marginSec + 5 + 9;

  if (data) {
    obj.left.components.push(LeftBlockBullet);
    obj.left.ids.push('profile-content');
    obj.left.props.push({ top: leftH + marginBullet, name: data, height: 20 });
    leftH = leftH + marginBullet + 20;
  }

  obj.leftH = leftH;
  
  return obj;
};

// Skills Section
export const skillInfo = (
  obj: ComponentSequenceObj, 
  data: Skills, 
  marginSec: number, 
  marginBullet: number, 
  marginPage: number
): ComponentSequenceObj => {

  let leftH = obj.leftH;
  
  if (data && data.value.length > 0) {
    
    obj.left.components.push(LeftBlockHeading);
    obj.left.ids.push('skills-heading');
    obj.left.props.push({ top: leftH + marginSec + 5, heading: 'TECHNICAL SKILLS', height: 9 });
    leftH = leftH + marginSec + 5 + 9;


    data.value.forEach((skill, index) => {
      obj.left.components.push(LeftBlockSkill);
      obj.left.ids.push(`skill-${index}`);
      obj.left.props.push({ 
        top: leftH + marginBullet, 
        name: skill.value || "Skill", 
        rating: skill.rating || 4,
        height: 7 
      });
      leftH = leftH + marginBullet + 7;
    });
  }

  obj.leftH = leftH;
  return obj;
};

// Work Experience Section
export const workExpInfo = (
  obj: ComponentSequenceObj, 
  data: TrainingInformation, 
  marginSec: number, 
  marginBullet: number, 
  marginPage: number
): ComponentSequenceObj => {
  let rightH = obj.rightH;
  
  if (data && data.value.length > 0) {
    obj.right.components.push(RightBlockHeading);
    obj.right.ids.push('workexp-heading');
    obj.right.props.push({ top: rightH + marginSec, heading: data.title || 'WORK EXPERIENCE', height: 9 });
    rightH = rightH + marginSec + 9;

    data.value.forEach((exp, index) => {
      if (exp.org) {
        obj.right.components.push(RightBlockWorkExp);
        obj.right.ids.push(`workexp-${index}`);
        obj.right.props.push({ 
          top: rightH + marginBullet, 
          position: exp.type || 'Position',
          company: exp.org,
          duration: `${exp.startDate} - ${exp.endDate}`,
          details: exp.desc || '',
          height: 25 
        });
        rightH = rightH + marginBullet + 25;
      }
    });
  }

  obj.rightH = rightH;
  return obj;
};

// Projects Section
export const projectInfo = (
  obj: ComponentSequenceObj, 
  data: ProjectInformation, 
  marginSec: number, 
  marginBullet: number, 
  marginPage: number
): ComponentSequenceObj => {
  let rightH = obj.rightH;
  
  if (data && data.value.length > 0) {
    obj.right.components.push(RightBlockHeading);
    obj.right.ids.push('projects-heading');
    obj.right.props.push({ top: rightH + marginSec, heading: data?.title || 'PROJECTS', height: 9 });
    rightH = rightH + marginSec + 9;

    data.value.forEach((project, index) => {
      if (project.title) {
        obj.right.components.push(RightBlockProject);
        obj.right.ids.push(`project-${index}`);
        obj.right.props.push({ 
          top: rightH + marginBullet, 
          data: project,
          details: project.desc || 'Project Description',
          height: 20 
        });
        rightH = rightH + marginBullet + 20;
      }
    });
  }

  obj.rightH = rightH;
  return obj;
};

// Education Section
export const educationInfo = (
  obj: ComponentSequenceObj, 
  data: EducationalInformation, 
  marginSec: number, 
  marginBullet: number, 
  marginPage: number
): ComponentSequenceObj => {
  let rightH = obj.rightH;
  
  if (data && data.value.length > 0) {
    obj.right.components.push(RightBlockHeading);
    obj.right.ids.push('education-heading');
    obj.right.props.push({ top: rightH + marginSec, heading: data?.title || 'EDUCATION', height: 9 });
    rightH = rightH + marginSec + 9;

    data.value.forEach((edu, index) => {
      if (edu.degree) {
        obj.right.components.push(RightBlockEdu);
        obj.right.ids.push(`education-${index}`);
        obj.right.props.push({ 
          top: rightH + marginBullet, 
          degree: edu.degree,
          institution: edu.college,
          year: edu.year,
          cgpa: edu.cgpa || '',
          height: 25 
        });
        rightH = rightH + marginBullet + 25;
      }
    });
  }

  obj.rightH = rightH;
  return obj;
};

// Hobbies Section
export const hobbiesInfo = (
  obj: ComponentSequenceObj, 
  data: Hobbies, 
  marginSec: number, 
  marginBullet: number, 
  marginPage: number
): ComponentSequenceObj => {
  let leftH = obj.leftH;
  
  if (data && data.value.length > 0) {
    obj.left.components.push(LeftBlockHeading);
    obj.left.ids.push('hobbies-heading');
    obj.left.props.push({ top: leftH + marginSec + 5, heading: 'HOBBIES', height: 9 });
    leftH = leftH + marginSec + 5 + 9;

    data.value.forEach((hobby, index) => {
      obj.left.components.push(LeftBlockBullet);
      obj.left.ids.push(`hobby-${index}`);
      obj.left.props.push({ 
        top: leftH + marginBullet, 
        name: hobby || "Hobby",
        height: 7 
      });
      leftH = leftH + marginBullet + 7;
    });
  }

  obj.leftH = leftH;
  return obj;
};

// Extra Curricular/Achievements Section
export const extraInfo = (
  obj: ComponentSequenceObj, 
  data: ExtraCurricular, 
  marginSec: number, 
  marginBullet: number, 
  marginPage: number,
  icon: React.ComponentType
): ComponentSequenceObj => {
  let rightH = obj.rightH;
  
  if (data && data.value.length > 0) {
    obj.right.components.push(RightBlockHeading);
    obj.right.ids.push('achievements-heading');
    obj.right.props.push({ top: rightH + marginSec, heading: data?.title || 'ACHIEVEMENTS', height: 9 });
    rightH = rightH + marginSec + 9;

    data.value.forEach((item, index) => {
      obj.right.components.push(RightBlockBullet);
      obj.right.ids.push(`achievement-${index}`);
      obj.right.props.push({ 
        top: rightH + marginBullet, 
        name: item || "Achievement",
        height: 7 
      });
      rightH = rightH + marginBullet + 7;
    });
  }

  obj.rightH = rightH;
  return obj;
};

// Area of Interest Section
export const areaInfo = (
  obj: ComponentSequenceObj, 
  data: AreaOfIntrest, 
  marginSec: number, 
  marginBullet: number, 
  marginPage: number
): ComponentSequenceObj => {
  
  let countL = obj.countL;
  let countR = obj.countR;
  let leftH = obj.leftH;
  let rightH = obj.rightH;
  let list = ["area1", "area2", "area3"];
  let left = 15;
  let tH = 0;
  
  if(rightH > countR * 297){
    countR++;
    rightH = 297 * (countR - 1) + marginPage;
    if(countR == 2){
        obj.page1.right.components = obj.right.components;
        obj.page1.right.ids = obj.right.ids;
        obj.page1.right.props = obj.right.props;
      }
  }
  if(countR > countL){
    obj.block.components.push(RightBlockLogo);
    obj.block.ids.push("education-logo");
    obj.block.props.push({top: rightH + marginSec, name: "book"});
    
    obj.block.components.push(RightBlockHeading);
    obj.block.ids.push("education");
    obj.block.props.push({top: rightH + marginSec, name: data.title , height: 13});
    
    
  }else{
    obj.right.components.push(RightBlockLogo);
    obj.right.ids.push("education-logo");
    obj.right.props.push({top: rightH + marginSec, name: FaBook});
    
    obj.right.components.push(RightBlockHeading);
    obj.right.ids.push("education");
    obj.right.props.push({top: rightH + marginSec, name: data.title , height: 13});
  }
  
  
  rightH = rightH + marginSec + 13;
  
  if(rightH > countR * 297){
      countR++;
      
      rightH = 297 * (countR -1) + marginPage;
        if(countR > countL) {
          if(countR - 1 == countL){
            obj.right.components.pop();
            obj.right.ids.pop();
            obj.right.props.pop();
            
            obj.right.components.pop();
            obj.right.ids.pop();
            obj.right.props.pop();
            
            if(countR == 2){
              obj.page1.right.components = obj.right.components;
              obj.page1.right.ids = obj.right.ids;
              obj.page1.right.props = obj.right.props;
            }
            
            obj.block.components.push(RightBlockLogo);
            obj.block.ids.push("project-logo");
            obj.block.props.push({top: rightH + marginSec, name: FaBook});

            obj.block.components.push(RightBlockHeading);
            obj.block.ids.push("project");
            obj.block.props.push({top: rightH + marginSec, name: data.title , height: 13});
            
            rightH = rightH + marginSec + 13;
    
          }else{
            obj.block.components.pop();
            obj.block.ids.pop();
            obj.block.props.pop();
            
            obj.block.components.pop();
            obj.block.ids.pop();
            obj.block.props.pop();
           
            obj.block.components.push(RightBlockLogo);
            obj.block.ids.push("project-logo");
            obj.block.props.push({top: rightH + marginSec, name: FaBook});

            obj.block.components.push(RightBlockHeading);
            obj.block.ids.push("project");
            obj.block.props.push({top: rightH + marginSec, name: data.title , height: 13});
            
            rightH = rightH + marginSec + 13;
          }
        }else{
          obj.right.components.pop();
          obj.right.ids.pop();
          obj.right.props.pop();
          
          obj.right.components.pop();
          obj.right.ids.pop();
          obj.right.props.pop();
          
          if(countR == 2){
            obj.page1.right.components = obj.right.components;
            obj.page1.right.ids = obj.right.ids;
            obj.page1.right.props = obj.right.props;
          }
          
          
          obj.right.components.push(RightBlockLogo);
          obj.right.ids.push("project-logo");
          obj.right.props.push({top: rightH + marginSec, name: FaBook});

          obj.right.components.push(RightBlockHeading);
          obj.right.ids.push("project");
          obj.right.props.push({top: rightH + marginSec, name: data.title , height: 13});
          
          rightH = rightH + marginSec + 13;
        
        }
    }
 
  list.map((v, i)=>{
    
    
    
    let str = "area-heading-" + i.toString();
    let areaT = v + "Topic"
    
    if(countR > countL){
      
      obj.block.components.push(RightBlockArea);
      obj.block.ids.push(str);
      obj.block.props.push({top: rightH + marginSec, height: 10, data: v});
      
      rightH = rightH + marginSec +  10
      
    }else{
      obj.right.components.push(RightBlockArea);
      obj.right.ids.push(str);
      const areaValue = data[areaT as keyof AreaOfIntrest];
      obj.right.props.push({
        top: rightH + marginSec,
        name: typeof areaValue === "string" ? areaValue : "",
        logo: typeof areaValue === "string" ? iconList[areaValue as keyof typeof iconList] : undefined,
        left: left
      });
      
     
      
    }
    
    
    
    if(rightH > countR * 297){
      countR++;
      
      rightH = 297 * (countR -1) + marginPage;
        if(countR > countL) {
          if(countR - 1 == countL){
            obj.right.components.pop();
            obj.right.ids.pop();
            obj.right.props.pop();
            
            obj.block.components.push(RightBlockArea);
            obj.block.ids.push(str);
            obj.block.props.push({top: rightH + marginSec, height: 10, data: v});
    
            rightH = rightH + marginSec +  10
          }else{
            obj.block.components.pop();
            obj.block.ids.pop();
            obj.block.props.pop();
            
            
            
            obj.block.components.push(RightBlockArea);
            obj.block.ids.push(str);
            obj.block.props.push({top: rightH + marginSec, height: 10, data: v});
    
            rightH = rightH + marginSec +  10
            
          }
        }else{
          obj.right.components.pop();
          obj.right.ids.pop();
          obj.right.props.pop();
          
          if(countR == 2){
            obj.page1.right.components = obj.right.components;
            obj.page1.right.ids = obj.right.ids;
            obj.page1.right.props = obj.right.props;
          }

          obj.right.components.push(RightBlockArea);
          obj.right.ids.push(str);
          const areaValue = data[areaT as keyof AreaOfIntrest];
          obj.right.props.push({top: rightH + marginSec, 
          name: typeof areaValue === "string" ? areaValue : "",
        logo: typeof areaValue === "string" ? iconList[areaValue as keyof typeof iconList] : undefined,
          left: left});
          
        }
    }
    
    left = left + 32;
  })
  
  rightH = rightH + marginSec +  15
  if(countR > countL){
    obj.block.components.push(VL);
    obj.block.props.push({top: (297 * (countR-1))  + marginPage + marginSec, height: 297 - ((297 * countR) - rightH)});
  }else{
    if(countR == 1){
      obj.right.components.push(VL);
      obj.right.props.push({top: 60, height: 230});
      
      obj.page1.right.components = obj.right.components;
      obj.page1.right.ids = obj.right.ids;
      obj.page1.right.props = obj.right.props;
    }else{
      obj.right.components.push(VL);
      obj.right.props.push({top: (297 * (countR-1)) + marginPage + marginSec, height: 297 - ((297 * countR) - rightH)});
    }
    
  }
  
  
  obj.countL = countL;
  obj.countR = countR;
  obj.leftH = leftH;
  obj.rightH = rightH;
  
  return obj;
};
