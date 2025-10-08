// @/components/organisms/visualresume/fresher/ResumeComponents/ResumeComp.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { H2, BodyText } from "@/components/atoms/Typography";
import {
  ShareIcon, DownloadIcon, SaveIcon, CheckIcon,
  AlertIcon, LoadingSpinner, PlusIcon, MinusIcon,
  EditIcon, DeleteIcon, ArrowRightIcon, ArrowLeftIcon,
  ArrowUpIcon, ArrowDownIcon, EyeIcon, EyeSlashIcon,
  UserIcon, DocumentIcon, BookIcon, CodeIcon,
  BriefcaseIcon, StarIcon, TargetIcon, HeartIcon,
  LayoutIcon, GridIcon
} from '@/components/atoms/Icons';
import Button from '@/components/atoms/Button';
import { 
  Profile, 
  VisualResumeData, 
  PersonalInformation, 
  Education, 
  Project, 
  Training, 
  Skill,
  AreaOfIntrest
} from '@/types/visualresume/fresher';

// Types remain the same...
type ComponentKey = 
  | 'userInfo'
  | 'personalInfo' 
  | 'profileSummaryInfo'
  | 'techSkillsInfo'
  | 'educationInfo'
  | 'projectsInfo'
  | 'workexpInfo'
  | 'areaOfIntrestInfo'
  | 'achievmentsInfo'
  | 'hobbiesInfo';

type DisplayType = Record<ComponentKey, boolean>;

interface ClassesType {
  userInfoClass: string;
  personalInfoClass: string;
  profileSummaryInfoClass: string;
  educationInfoClass: string;
  projectsInfoClass: string;
  workexpInfoClass: string;
  techSkillsInfoClass: string;
  areaOfIntrestInfoClass: string;
  achievmentsInfoClass: string;
  hobbiesInfoClass: string;
}

type SequenceType = ComponentKey[];
type SequenceLRType = {
  left: ComponentKey[];
  right: ComponentKey[];
};

type ListType = string[];
type ListLRType = {
  left: string[];
  right: string[];
};

interface LayoutInfoProps {
  visualresume: VisualResumeData;
  onUpdateResume: (data: VisualResumeData) => void;
  onEditClick: (section: string) => void;
}

export const LayoutInfo: React.FC<LayoutInfoProps> = ({ 
  visualresume, 
  onUpdateResume, 
  onEditClick 
}) => {
  // State initialization with proper typing - EXACTLY as original
  const [values, setValues] = useState<DisplayType>(
    visualresume.layout?.display as DisplayType || {} as DisplayType
  );
  const [classes, setClasses] = useState<ClassesType>(
    visualresume.layout?.classes || {
      userInfoClass: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-blue-50 to-blue-100 rounded-[var(--radius-2xl)] p-4 border-2 border-blue-200 text-blue-900 font-semibold shadow-sm hover:shadow-lg",
      personalInfoClass: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-green-50 to-green-100 rounded-[var(--radius-2xl)] p-4 border-2 border-green-200 text-green-900 font-semibold shadow-sm hover:shadow-lg",
      profileSummaryInfoClass: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-orange-50 to-orange-100 rounded-[var(--radius-2xl)] p-4 border-2 border-orange-200 text-orange-900 font-semibold shadow-sm hover:shadow-lg",
      educationInfoClass: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-purple-50 to-purple-100 rounded-[var(--radius-2xl)] p-4 border-2 border-purple-200 text-purple-900 font-semibold shadow-sm hover:shadow-lg",
      projectsInfoClass: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-green-50 to-green-100 rounded-[var(--radius-2xl)] p-4 border-2 border-green-200 text-green-900 font-semibold shadow-sm hover:shadow-lg",
      workexpInfoClass: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-orange-50 to-orange-100 rounded-[var(--radius-2xl)] p-4 border-2 border-orange-200 text-orange-900 font-semibold shadow-sm hover:shadow-lg",
      techSkillsInfoClass: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-blue-50 to-blue-100 rounded-[var(--radius-2xl)] p-4 border-2 border-blue-200 text-blue-900 font-semibold shadow-sm hover:shadow-lg",
      areaOfIntrestInfoClass: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-purple-50 to-purple-100 rounded-[var(--radius-2xl)] p-4 border-2 border-purple-200 text-purple-900 font-semibold shadow-sm hover:shadow-lg",
      achievmentsInfoClass: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-blue-50 to-blue-100 rounded-[var(--radius-2xl)] p-4 border-2 border-blue-200 text-blue-900 font-semibold shadow-sm hover:shadow-lg",
      hobbiesInfoClass: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-green-50 to-green-100 rounded-[var(--radius-2xl)] p-4 border-2 border-green-200 text-green-900 font-semibold shadow-sm hover:shadow-lg"
    }
  );
  const [sequence, setSequence] = useState<SequenceType>(
    visualresume.layout?.sequence as SequenceType || []
  );
  const [sequencelr, setSequencelr] = useState<SequenceLRType>(
    visualresume.layout?.sequencelr as SequenceLRType || { left: [], right: [] }
  );
  const [list, setList] = useState<ListType>(
    visualresume.layout?.list || []
  );
  const [listLR, setListLR] = useState<ListLRType>(
    visualresume.layout?.listLR as ListLRType || { left: [], right: [] }
  );

  // Component names mapping with proper typing - EXACTLY as original
  const componentNames: Record<ComponentKey, string> = {
    userInfo: "User Information",
    personalInfo: "Personal Information", 
    profileSummaryInfo: "Profile Summary",
    techSkillsInfo: "Technical Skills",
    educationInfo: "Education",
    projectsInfo: "Projects",
    workexpInfo: "Industrial Exposure",
    areaOfIntrestInfo: "Area of Interests",
    achievmentsInfo: "Extra Curricular",
    hobbiesInfo: "Hobbies"
  };

  // CSS classes for selected/unselected states - MODERNIZED
  const selectedClassMap: Record<ComponentKey, string> = {
    userInfo: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-blue-50 to-blue-100 rounded-[var(--radius-2xl)] p-3 border-2 border-blue-200 text-blue-900 font-semibold shadow-sm hover:shadow-lg",
    personalInfo: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-green-50 to-green-100 rounded-[var(--radius-2xl)] p-3 border-2 border-green-200 text-green-900 font-semibold shadow-sm hover:shadow-lg",
    profileSummaryInfo: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-orange-50 to-orange-100 rounded-[var(--radius-2xl)] p-3 border-2 border-orange-200 text-orange-900 font-semibold shadow-sm hover:shadow-lg",
    techSkillsInfo: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-blue-50 to-blue-100 rounded-[var(--radius-2xl)] p-3 border-2 border-blue-200 text-blue-900 font-semibold shadow-sm hover:shadow-lg",
    educationInfo: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-purple-50 to-purple-100 rounded-[var(--radius-2xl)] p-3 border-2 border-purple-200 text-purple-900 font-semibold shadow-sm hover:shadow-lg",
    projectsInfo: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-green-50 to-green-100 rounded-[var(--radius-2xl)] p-3 border-2 border-green-200 text-green-900 font-semibold shadow-sm hover:shadow-lg",
    workexpInfo: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-orange-50 to-orange-100 rounded-[var(--radius-2xl)] p-3 border-2 border-orange-200 text-orange-900 font-semibold shadow-sm hover:shadow-lg",
    areaOfIntrestInfo: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-purple-50 to-purple-100 rounded-[var(--radius-2xl)] p-3 border-2 border-purple-200 text-purple-900 font-semibold shadow-sm hover:shadow-lg",
    achievmentsInfo: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-blue-50 to-blue-100 rounded-[var(--radius-2xl)] p-3 border-2 border-blue-200 text-blue-900 font-semibold shadow-sm hover:shadow-lg",
    hobbiesInfo: "relative group transition-all duration-300 hover:scale-102 bg-gradient-to-br from-green-50 to-green-100 rounded-[var(--radius-2xl)] p-3 border-2 border-green-200 text-green-900 font-semibold shadow-sm hover:shadow-lg"
  };

  const unselectedClass = "relative group transition-all duration-300 opacity-50 grayscale bg-gradient-to-br from-gray-50 to-gray-100 rounded-[var(--radius-2xl)] p-3 border-2 border-gray-200 text-gray-500 font-medium shadow-sm";

  // Map component keys to class keys - EXACTLY as original
  const getClassKey = (componentName: ComponentKey): keyof ClassesType => {
    return `${componentName}Class` as keyof ClassesType;
  };

  // Toggle component display on/off with proper typing - RESTORE ORIGINAL LOGIC
  const handleToggleDisplay = (componentName: ComponentKey) => {
    const classKey = getClassKey(componentName);
    
    let updatedValues: DisplayType = { ...values };
    let updatedClasses: ClassesType = { ...classes };
    
    // Toggle the display state using proper key typing - EXACTLY as original
    if (values[componentName]) {
      updatedValues[componentName] = false;
      updatedClasses[classKey] = unselectedClass;
    } else {
      updatedValues[componentName] = true;
      updatedClasses[classKey] = selectedClassMap[componentName];
    }

    // Rebuild lists based on current sequence and display states - EXACTLY as original
    const updatedList: ListType = [];
    const updatedListLR: ListLRType = { left: [], right: [] };

    // Update main sequence list
    sequence.forEach((item: ComponentKey) => {
      if (updatedValues[item]) {
        updatedList.push(`${item}Display`);
      }
    });

    // Update left side list
    sequencelr.left.forEach((item: ComponentKey) => {
      if (updatedValues[item]) {
        updatedListLR.left.push(`${item}Display`);
      }
    });

    // Update right side list  
    sequencelr.right.forEach((item: ComponentKey) => {
      if (updatedValues[item]) {
        updatedListLR.right.push(`${item}Display`);
      }
    });

    // Update state
    setValues(updatedValues);
    setClasses(updatedClasses);
    setList(updatedList);
    setListLR(updatedListLR);

    // Update visualresume - ensure proper typing - EXACTLY as original
    const updatedResume: VisualResumeData = {
      ...visualresume,
      layout: {
        ...visualresume.layout,
        sequence: sequence,
        sequencelr: sequencelr,
        list: updatedList,
        listLR: updatedListLR,
        display: updatedValues,
        classes: updatedClasses
      }
    };

    onUpdateResume(updatedResume);
  };

  // Move component up/down in left side sequence - EXACTLY as original
  const handleMoveLeft = (componentName: ComponentKey, direction: 'up' | 'down') => {
    const newSequencelr: SequenceLRType = { 
      left: [...sequencelr.left], 
      right: [...sequencelr.right] 
    };
    const newSequence: SequenceType = [...sequence];

    const leftIndex = newSequencelr.left.findIndex(item => item === componentName);
    const mainIndex = newSequence.findIndex(item => item === componentName);

    if (direction === 'up' && leftIndex > 0) {
      // Swap in left sequence
      [newSequencelr.left[leftIndex], newSequencelr.left[leftIndex - 1]] = 
      [newSequencelr.left[leftIndex - 1], newSequencelr.left[leftIndex]];
      
      // Swap in main sequence
      if (mainIndex > 0) {
        [newSequence[mainIndex], newSequence[mainIndex - 1]] = 
        [newSequence[mainIndex - 1], newSequence[mainIndex]];
      }
    } else if (direction === 'down' && leftIndex < newSequencelr.left.length - 1) {
      // Swap in left sequence
      [newSequencelr.left[leftIndex], newSequencelr.left[leftIndex + 1]] = 
      [newSequencelr.left[leftIndex + 1], newSequencelr.left[leftIndex]];
      
      // Swap in main sequence
      if (mainIndex < newSequence.length - 1) {
        [newSequence[mainIndex], newSequence[mainIndex + 1]] = 
        [newSequence[mainIndex + 1], newSequence[mainIndex]];
      }
    }

    updateSequences(newSequence, newSequencelr);
  };

  // Move component up/down in right side sequence - EXACTLY as original
  const handleMoveRight = (componentName: ComponentKey, direction: 'up' | 'down') => {
    const newSequencelr: SequenceLRType = { 
      left: [...sequencelr.left], 
      right: [...sequencelr.right] 
    };
    const newSequence: SequenceType = [...sequence];

    const rightIndex = newSequencelr.right.findIndex(item => item === componentName);
    const mainIndex = newSequence.findIndex(item => item === componentName);

    if (direction === 'up' && rightIndex > 0) {
      // Swap in right sequence
      [newSequencelr.right[rightIndex], newSequencelr.right[rightIndex - 1]] = 
      [newSequencelr.right[rightIndex - 1], newSequencelr.right[rightIndex]];
      
      // Swap in main sequence
      if (mainIndex > 0) {
        [newSequence[mainIndex], newSequence[mainIndex - 1]] = 
        [newSequence[mainIndex - 1], newSequence[mainIndex]];
      }
    } else if (direction === 'down' && rightIndex < newSequencelr.right.length - 1) {
      // Swap in right sequence
      [newSequencelr.right[rightIndex], newSequencelr.right[rightIndex + 1]] = 
      [newSequencelr.right[rightIndex + 1], newSequencelr.right[rightIndex]];
      
      // Swap in main sequence
      if (mainIndex < newSequence.length - 1) {
        [newSequence[mainIndex], newSequence[mainIndex + 1]] = 
        [newSequence[mainIndex + 1], newSequence[mainIndex]];
      }
    }

    updateSequences(newSequence, newSequencelr);
  };

  // Update sequences and lists after reordering - EXACTLY as original
  const updateSequences = (newSequence: SequenceType, newSequencelr: SequenceLRType) => {
    // Rebuild lists based on new sequences
    const updatedList: ListType = [];
    const updatedListLR: ListLRType = { left: [], right: [] };

    newSequence.forEach((item: ComponentKey) => {
      if (values[item]) {
        updatedList.push(`${item}Display`);
      }
    });

    newSequencelr.left.forEach((item: ComponentKey) => {
      if (values[item]) {
        updatedListLR.left.push(`${item}Display`);
      }
    });

    newSequencelr.right.forEach((item: ComponentKey) => {
      if (values[item]) {
        updatedListLR.right.push(`${item}Display`);
      }
    });

    // Update state
    setSequence(newSequence);
    setSequencelr(newSequencelr);
    setList(updatedList);
    setListLR(updatedListLR);

    // Update visualresume - ensure proper typing
    const updatedResume: VisualResumeData = {
      ...visualresume,
      layout: {
        ...visualresume.layout,
        sequence: newSequence,
        sequencelr: newSequencelr,
        list: updatedList,
        listLR: updatedListLR,
        display: values,
        classes: classes
      }
    };

    onUpdateResume(updatedResume);
  };

  // Component icons mapping
  const componentIcons: Record<ComponentKey, React.ReactNode> = {
    userInfo: <UserIcon className="w-4 h-4" />,
    personalInfo: <UserIcon className="w-4 h-4" />,
    profileSummaryInfo: <DocumentIcon className="w-4 h-4" />,
    techSkillsInfo: <CodeIcon className="w-4 h-4" />,
    educationInfo: <BookIcon className="w-4 h-4" />,
    projectsInfo: <StarIcon className="w-4 h-4" />,
    workexpInfo: <BriefcaseIcon className="w-4 h-4" />,
    areaOfIntrestInfo: <TargetIcon className="w-4 h-4" />,
    achievmentsInfo: <StarIcon className="w-4 h-4" />,
    hobbiesInfo: <HeartIcon className="w-4 h-4" />
  };

  // Render left side components (editable only) - MODERNIZED UI but EXACT LOGIC
  const renderLeftComponents = () => {
    return sequencelr.left.map((component: ComponentKey, index: number) => (
      <div key={component} className="mb-3">
        <div className={`
          flex items-center justify-between p-4 rounded-[var(--radius-xl)] border-2 transition-all duration-300 hover:scale-102
          ${values[component] 
            ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-900' 
            : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 text-gray-500 opacity-60'
          }
        `}>
          <div className="flex items-center gap-3">
            <div className={`
              w-10 h-10 rounded-[var(--radius-lg)] bg-white flex items-center justify-center
              ${values[component] ? 'text-blue-600' : 'text-gray-400'}
            `}>
              {componentIcons[component]}
            </div>
            
            <button
              onClick={() => handleToggleDisplay(component)}
              className="flex items-center gap-3 text-left"
            >
              <div>
                <span className="font-semibold block">
                  {componentNames[component]}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  {values[component] ? (
                    <>
                      <EyeIcon className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">Visible</span>
                    </>
                  ) : (
                    <>
                      <EyeSlashIcon className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400 font-medium">Hidden</span>
                    </>
                  )}
                </div>
              </div>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost-primary"
              size="sm"
              onClick={() => onEditClick(component)}
              className="w-8 h-8 p-0"
            >
              <EditIcon className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost-primary"
              size="sm"
              onClick={() => handleMoveLeft(component, 'up')}
              disabled={index === 0}
              className="w-8 h-8 p-0"
            >
              <ArrowUpIcon className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost-primary"
              size="sm"
              onClick={() => handleMoveLeft(component, 'down')}
              disabled={index === sequencelr.left.length - 1}
              className="w-8 h-8 p-0"
            >
              <ArrowDownIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    ));
  };

  // Render right side components (editable and sortable) - MODERNIZED UI but EXACT LOGIC
  const renderRightComponents = () => {
    return sequencelr.right.map((component: ComponentKey, index: number) => (
      <div key={component} className="mb-3">
        <div className={`
          flex items-center justify-between p-4 rounded-[var(--radius-xl)] border-2 transition-all duration-300 hover:scale-102
          ${values[component] 
            ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-purple-900' 
            : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 text-gray-500 opacity-60'
          }
        `}>
          <div className="flex items-center gap-3">
            <div className={`
              w-10 h-10 rounded-[var(--radius-lg)] bg-white flex items-center justify-center
              ${values[component] ? 'text-purple-600' : 'text-gray-400'}
            `}>
              {componentIcons[component]}
            </div>
            
            <button
              onClick={() => handleToggleDisplay(component)}
              className="flex items-center gap-3 text-left"
            >
              <div>
                <span className="font-semibold block">
                  {componentNames[component]}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  {values[component] ? (
                    <>
                      <EyeIcon className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">Visible</span>
                    </>
                  ) : (
                    <>
                      <EyeSlashIcon className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400 font-medium">Hidden</span>
                    </>
                  )}
                </div>
              </div>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost-primary"
              size="sm"
              onClick={() => onEditClick(component)}
              className="w-8 h-8 p-0"
            >
              <EditIcon className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost-primary"
              size="sm"
              onClick={() => handleMoveRight(component, 'up')}
              disabled={index === 0}
              className="w-8 h-8 p-0"
            >
              <ArrowUpIcon className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost-primary"
              size="sm"
              onClick={() => handleMoveRight(component, 'down')}
              disabled={index === sequencelr.right.length - 1}
              className="w-8 h-8 p-0"
            >
              <ArrowDownIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header - MODERNIZED */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-[var(--radius-xl)] bg-gradient-primary flex items-center justify-center">
          <LayoutIcon className="w-8 h-8 text-white" />
        </div>
        <H2 className="text-2xl font-bold gradient-text mb-2">
          Resume Layout Configuration
        </H2>
        <BodyText className="text-[color:rgb(var(--neutral-600))] max-w-2xl mx-auto">
          Customize your resume layout by toggling sections and reordering components. 
          Changes will be reflected in your final resume.
        </BodyText>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-[var(--radius-xl)] border border-blue-200">
          <div className="text-2xl font-bold text-blue-900 mb-1">
            {Object.values(values).filter(Boolean).length}
          </div>
          <div className="text-sm text-blue-600 font-medium">Active Sections</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-[var(--radius-xl)] border border-green-200">
          <div className="text-2xl font-bold text-green-900 mb-1">
            {sequencelr.left.filter(item => values[item]).length}
          </div>
          <div className="text-sm text-green-600 font-medium">Left Column</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-[var(--radius-xl)] border border-purple-200">
          <div className="text-2xl font-bold text-purple-900 mb-1">
            {sequencelr.right.filter(item => values[item]).length}
          </div>
          <div className="text-sm text-purple-600 font-medium">Right Column</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side Components */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center">
              <GridIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <H2 className="text-lg font-bold text-[color:rgb(var(--neutral-900))]">Left Side Components</H2>
              <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">(Editable Only)</BodyText>
            </div>
          </div>
          <div className="space-y-2">
            {renderLeftComponents()}
          </div>
        </div>

        {/* Right Side Components */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 flex items-center justify-center">
              <GridIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <H2 className="text-lg font-bold text-[color:rgb(var(--neutral-900))]">Right Side Components</H2>
              <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">(Editable & Sortable)</BodyText>
            </div>
          </div>
          <div className="space-y-2">
            {renderRightComponents()}
          </div>
        </div>
      </div>

      {/* Layout Info - MODERNIZED */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-[var(--radius-2xl)] p-6 border-2 border-gray-200">
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-gradient-primary flex items-center justify-center shrink-0">
      <AlertIcon className="w-6 h-6 text-white" />
    </div>
    <div>
      <H2 className="text-lg font-bold text-[color:rgb(var(--neutral-900))] mb-2">Layout Information</H2>
      <div className="text-sm text-[color:rgb(var(--neutral-600))] space-y-1">
        {/* FIXED: Changed <p> to <div> to avoid nesting block elements inside paragraphs */}
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-500 rounded block flex-shrink-0"></span>
          <span><strong>Left Side:</strong> Personal information components (editable only)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-purple-500 rounded block flex-shrink-0"></span>
          <span><strong>Right Side:</strong> Professional components (editable and sortable)</span>
        </div>
        <div className="flex items-center gap-2">
          <EyeIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
          <span><strong>Eye Icon:</strong> Toggle component visibility</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpIcon className="w-4 h-4 text-purple-600 flex-shrink-0" />
          <span><strong>Arrows:</strong> Reorder components (affects resume layout)</span>
        </div>
        <div className="flex items-center gap-2">
          <EditIcon className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span><strong>Edit Icon:</strong> Jump to component editor</span>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

// ====================== USER INFO COMPONENT ======================
interface UserInfoProps {
  user: User;  // Changed from 'profile' to 'user'
  visualresume: VisualResumeData;
  onUpdateResume: (data: VisualResumeData) => void;
}

// Define User interface to match AuthProtected
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  photoUrl?: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user, visualresume, onUpdateResume }) => {
  const handlePhotoDisplayToggle = (checked: boolean) => {
    const updated = {
      ...visualresume,
      personalInformation: {
        ...visualresume.personalInformation,
        photoDisplay: checked
      }
    };
    onUpdateResume(updated);
  };

  return (
    <div className="bg-[color:rgb(var(--surface-1))] rounded-lg border border-[color:rgb(var(--neutral-200))] p-6">
      <h3 className="text-lg font-semibold text-[color:rgb(var(--neutral-900))] mb-6">User Information</h3>
      
      <div className="flex items-center gap-4 mb-6">
        {user?.photoUrl ? (  // Added optional chaining
          <img 
            src={user.photoUrl} 
            alt={user.name || 'User'} 
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-[color:rgb(var(--neutral-300))] rounded-full flex items-center justify-center text-[color:rgb(var(--neutral-600))] text-lg font-medium">
            {user?.name?.[0]?.toUpperCase() || user?.firstName?.[0]?.toUpperCase() || 'U'}
          </div>
        )}
        
        <div>
          <h4 className="text-lg font-medium text-[color:rgb(var(--neutral-900))]">
            {user?.name || `${user?.firstName || ''} ${user?.lastName || ''}`.trim()}
          </h4>
          <p className="text-[color:rgb(var(--neutral-600))]">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={visualresume.personalInformation?.photoDisplay || false}
            onChange={(e) => handlePhotoDisplayToggle(e.target.checked)}
            className="w-4 h-4 text-[color:rgb(var(--primary-600))] bg-[color:rgb(var(--neutral-100))] border-[color:rgb(var(--neutral-300))] rounded focus:ring-[color:rgb(var(--primary-500))]"
          />
          <label className="ml-2 text-sm text-[color:rgb(var(--neutral-700))]">Display photo in resume</label>
        </div>

        {/* Additional user info display */}
        <div className="pt-4 border-t border-[color:rgb(var(--neutral-200))]">
          <h5 className="font-medium text-[color:rgb(var(--neutral-900))] mb-2">Account Information</h5>
          <div className="space-y-2 text-sm text-[color:rgb(var(--neutral-600))]">
            <p><strong>User ID:</strong> {user?.id}</p>
            <p><strong>Full Name:</strong> {user?.firstName} {user?.lastName}</p>
            <p><strong>Display Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// ====================== PERSONAL INFO COMPONENT ======================
interface PersonalInfoProps {
  visualresume: VisualResumeData;
  onUpdateResume: (data: VisualResumeData) => void;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ visualresume, onUpdateResume }) => {
  const handleChange = (field: keyof PersonalInformation) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updated = {
      ...visualresume,
      personalInformation: {
        ...visualresume.personalInformation,
        [field]: e.target.value
      }
    };
    onUpdateResume(updated);
  };

  const handleToggle = (field: 'addressFull' | 'phone2') => (checked: boolean) => {
    const updated = {
      ...visualresume,
      personalInformation: {
        ...visualresume.personalInformation,
        [field]: {...visualresume.personalInformation[field], optional: checked }
      }
    };
    onUpdateResume(updated);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={visualresume.personalInformation?.phone || ''}
            onChange={handleChange('phone')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
          <input
            type="text"
            value={visualresume.personalInformation?.designation || ''}
            onChange={handleChange('designation')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Software Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            value={visualresume.personalInformation?.address || ''}
            onChange={handleChange('address')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
          <textarea
            value={visualresume.personalInformation?.aboutMe || ''}
            onChange={handleChange('aboutMe')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us about yourself"
          />
        </div>
      {/*}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={visualresume.personalInformation?.addressFull.optional || false}
            onChange={(e) => handleToggle('addressFull')(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-700">Display full address in resume</label>
        </div>*/}
      </div>
    </div>
  );
};

// ====================== PROFILE SUMMARY WITH TIPTAP ======================
interface ProfileSummaryInfoProps {
  visualresume: VisualResumeData;
  onUpdateResume: (data: VisualResumeData) => void;
}

export const ProfileSummaryInfo: React.FC<ProfileSummaryInfoProps> = ({ 
  visualresume, 
  onUpdateResume 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(visualresume.personalInformation?.aboutMe || '');
  const [mounted, setMounted] = useState(false);

  // Only initialize editor after component mounts (client-side)
  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: content,
    immediatelyRender: false, // ✅ This fixes the SSR issue
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setContent(html);
      
      const updatedResume = {
        ...visualresume,
        personalInformation: {
          ...visualresume.personalInformation,
          aboutMe: html
        }
      };
      onUpdateResume(updatedResume);
    },
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && editor && mounted) {
      // When entering edit mode, set the editor content
      editor.commands.setContent(visualresume.personalInformation?.aboutMe || '');
    }
  };

  // Update content when visualresume changes
  useEffect(() => {
    const newContent = visualresume.personalInformation?.aboutMe || '';
    if (newContent !== content && mounted) {
      setContent(newContent);
      if (editor && !isEditing) {
        editor.commands.setContent(newContent);
      }
    }
  }, [visualresume.personalInformation?.aboutMe, editor, isEditing, content, mounted]);

  // Don't render editor until mounted (prevents SSR issues)
  if (!mounted) {
    return (
      <div className="bg-[color:rgb(var(--surface-1))] rounded-lg border border-[color:rgb(var(--neutral-200))] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[color:rgb(var(--neutral-900))]">Profile Summary</h3>
          <Button variant="outline-primary" size="sm" disabled>
            <EditIcon className="w-4 h-4" />
          </Button>
        </div>
        <div className="prose prose-sm max-w-none">
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <p className="text-[color:rgb(var(--neutral-500))] italic">Loading editor...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[color:rgb(var(--surface-1))] rounded-lg border border-[color:rgb(var(--neutral-200))] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-[color:rgb(var(--neutral-900))]">Profile Summary</h3>
        <Button variant="outline-primary" size="sm" onClick={handleEditToggle}>
          <EditIcon className="w-4 h-4" />
        </Button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          {/* Editor Toolbar */}
          <div className="flex gap-2 p-2 border border-[color:rgb(var(--neutral-300))] rounded-t-md bg-[color:rgb(var(--neutral-50))]">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className={editor?.isActive('bold') ? 'bg-[color:rgb(var(--neutral-200))]' : ''}
            >
              <strong>B</strong>
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className={editor?.isActive('italic') ? 'bg-[color:rgb(var(--neutral-200))]' : ''}
            >
              <em>I</em>
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              className={editor?.isActive('underline') ? 'bg-[color:rgb(var(--neutral-200))]' : ''}
            >
              <u>U</u>
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={editor?.isActive('bulletList') ? 'bg-[color:rgb(var(--neutral-200))]' : ''}
            >
              • List
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              className={editor?.isActive('orderedList') ? 'bg-[color:rgb(var(--neutral-200))]' : ''}
            >
              1. List
            </Button>
          </div>

          {/* Editor Content */}
          <div className="border border-[color:rgb(var(--neutral-300))] rounded-b-md">
            <EditorContent 
              editor={editor} 
              className="prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <div className="prose prose-sm max-w-none">
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <p className="text-[color:rgb(var(--neutral-500))] italic">Click edit to add your profile summary</p>
          )}
        </div>
      )}
    </div>
  );
};



// ====================== SKILLS COMPONENT ======================
interface SkillsInfoProps {
  visualresume: VisualResumeData;
  onUpdateResume: (data: VisualResumeData) => void;
}

export const SkillsInfo: React.FC<SkillsInfoProps> = ({ visualresume, onUpdateResume }) => {
  const [skills, setSkills] = useState<Skill[]>(visualresume.skills?.value || []);

  const handleAdd = () => {
    const newSkill: Skill = {
      value: `Skill ${skills.length + 1}`,
      rating: "4"
    };
    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    updateResume(updatedSkills);
  };

  const handleSkillChange = (index: number, field: keyof Skill, value: string) => {
    const updatedSkills = skills.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    );
    setSkills(updatedSkills);
    updateResume(updatedSkills);
  };

  const handleDelete = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    updateResume(updatedSkills);
  };

  const updateResume = (updatedSkills: Skill[]) => {
    const updatedResume = {
      ...visualresume,
      skills: {
        ...visualresume.skills,
        value: updatedSkills
      }
    };
    onUpdateResume(updatedResume);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Technical Skills</h3>
        <Button variant="outline-primary" onClick={handleAdd} leftIcon={<PlusIcon />}>
          Add Skill
        </Button>
      </div>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
            <input
              type="text"
              value={skill.value}
              onChange={(e) => handleSkillChange(index, 'value', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Skill name"
            />
            <select
              value={skill.rating}
              onChange={(e) => handleSkillChange(index, 'rating', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1 - Beginner</option>
              <option value="2">2 - Basic</option>
              <option value="3">3 - Intermediate</option>
              <option value="4">4 - Advanced</option>
              <option value="5">5 - Expert</option>
            </select>
            <Button
              variant="ghost-red"
              size="sm"
              onClick={() => handleDelete(index)}
              leftIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ====================== EDUCATION COMPONENT ======================
interface EducationInfoProps {
  visualresume: VisualResumeData;
  onUpdateResume: (data: VisualResumeData) => void;
}

export const EducationInfo: React.FC<EducationInfoProps> = ({ visualresume, onUpdateResume }) => {
  const [educationList, setEducationList] = useState<Education[]>(
    visualresume.educationalInformation?.value || []
  );

  const handleAdd = () => {
    const newEducation: Education = {
      optional: true,
      degree: "Degree",
      college: "Institution",
      year: new Date().getFullYear().toString(),
      cgpa: "0.0",
      toggle: true
    };
    const updatedList = [...educationList, newEducation];
    setEducationList(updatedList);
    updateResume(updatedList);
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string | boolean) => {
    const updatedList = educationList.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setEducationList(updatedList);
    updateResume(updatedList);
  };

  const handleDelete = (index: number) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
    updateResume(updatedList);
  };

  const updateResume = (updatedList: Education[]) => {
    const updatedResume = {
      ...visualresume,
      educationalInformation: {
        ...visualresume.educationalInformation,
        value: updatedList
      }
    };
    onUpdateResume(updatedResume);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Education</h3>
        <Button variant="outline-primary" onClick={handleAdd} leftIcon={<PlusIcon />}>
          Add Education
        </Button>
      </div>

      <div className="space-y-6">
        {educationList.map((education, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
              <Button
                variant="ghost-red"
                size="sm"
                onClick={() => handleDelete(index)}
                leftIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                <input
                  type="text"
                  value={education.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                <input
                  type="text"
                  value={education.college}
                  onChange={(e) => handleEducationChange(index, 'college', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="text"
                  value={education.year}
                  onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CGPA/Percentage</label>
                <input
                  type="text"
                  value={education.cgpa}
                  onChange={(e) => handleEducationChange(index, 'cgpa', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={education.toggle}
                onChange={(e) => handleEducationChange(index, 'toggle', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-sm text-gray-700">Show in resume</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ====================== PROJECTS COMPONENT ======================
interface ProjectsInfoProps {
  visualresume: VisualResumeData;
  onUpdateResume: (data: VisualResumeData) => void;
}

export const ProjectsInfo: React.FC<ProjectsInfoProps> = ({ visualresume, onUpdateResume }) => {
  const [projects, setProjects] = useState<Project[]>(visualresume.projectInformation?.value || []);

  const handleAdd = () => {
    const newProject: Project = {
      title: `Project ${projects.length + 1}`,
      desc: "Project description goes here..."
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    updateResume(updatedProjects);
  };

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    setProjects(updatedProjects);
    updateResume(updatedProjects);
  };

  const handleDelete = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    updateResume(updatedProjects);
  };

  const updateResume = (updatedProjects: Project[]) => {
    const updatedResume = {
      ...visualresume,
      projectInformation: {
        ...visualresume.projectInformation,
        value: updatedProjects
      }
    };
    onUpdateResume(updatedResume);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
        <Button variant="outline-primary" onClick={handleAdd} leftIcon={<PlusIcon />}>
          Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">Project {index + 1}</h4>
              <Button
                variant="ghost-red"
                size="sm"
                onClick={() => handleDelete(index)}
                leftIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={project.desc.replace(/<[^>]*>/g, '')} // Strip HTML for editing
                  onChange={(e) => handleProjectChange(index, 'desc', `<p>${e.target.value}</p>`)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ====================== WORK EXPERIENCE COMPONENT ======================
interface WorkexpInfoProps {
  visualresume: VisualResumeData;
  onUpdateResume: (data: VisualResumeData) => void;
}

// Define the Training interface to match your data structure
interface TrainingExperience {
  type: string;
  org: string;
  startDate: string;
  endDate: string;
  desc: string;
}

export const WorkexpInfo: React.FC<WorkexpInfoProps> = ({ visualresume, onUpdateResume }) => {
  const [workExp, setWorkExp] = useState<TrainingExperience[]>(
    visualresume.trainingInformation?.value || []
  );

  const handleAdd = () => {
    const newWorkExp: TrainingExperience = {
      type: "Industrial Training",
      org: "Company Name",
      startDate: "01/01/" + new Date().getFullYear(),
      endDate: "01/01/" + new Date().getFullYear(),
      desc: "<p>Job description goes here...</p>"
    };
    const updatedWorkExp = [...workExp, newWorkExp];
    setWorkExp(updatedWorkExp);
    updateResume(updatedWorkExp);
  };

  const handleWorkExpChange = (index: number, field: keyof TrainingExperience, value: string) => {
    const updatedWorkExp = workExp.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    setWorkExp(updatedWorkExp);
    updateResume(updatedWorkExp);
  };

  const handleDelete = (index: number) => {
    const updatedWorkExp = workExp.filter((_, i) => i !== index);
    setWorkExp(updatedWorkExp);
    updateResume(updatedWorkExp);
  };

  const updateResume = (updatedWorkExp: TrainingExperience[]) => {
    const updatedResume = {
      ...visualresume,
      trainingsInformation: {
        ...visualresume.trainingInformation,
        title: "INDUSTRIAL EXPOSURE", // Keep the title
        value: updatedWorkExp
      }
    };
    onUpdateResume(updatedResume);
  };

  // Convert date format from DD/MM/YYYY to YYYY-MM-DD for input[type="date"]
  const formatDateForInput = (dateStr: string): string => {
    if (!dateStr) return '';
    // Check if already in YYYY-MM-DD format
    if (dateStr.includes('-') && dateStr.length === 10) return dateStr;
    // Convert DD/MM/YYYY to YYYY-MM-DD
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    return dateStr;
  };

  // Convert date format from YYYY-MM-DD to DD/MM/YYYY for storage
  const formatDateForStorage = (dateStr: string): string => {
    if (!dateStr) return '';
    // Check if already in DD/MM/YYYY format
    if (dateStr.includes('/')) return dateStr;
    // Convert YYYY-MM-DD to DD/MM/YYYY
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Industrial Exposure</h3>
        <Button variant="outline-primary" onClick={handleAdd} leftIcon={<PlusIcon />}>
          Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        {workExp.map((exp, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
              <Button
                variant="ghost-red"
                size="sm"
                onClick={() => handleDelete(index)}
                leftIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Training Type
                </label>
                <input
                  type="text"
                  value={exp.type}
                  onChange={(e) => handleWorkExpChange(index, 'type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Industrial Training"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization
                </label>
                <input
                  type="text"
                  value={exp.org}
                  onChange={(e) => handleWorkExpChange(index, 'org', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Organization name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(exp.startDate)}
                  onChange={(e) => handleWorkExpChange(index, 'startDate', formatDateForStorage(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={formatDateForInput(exp.endDate)}
                  onChange={(e) => handleWorkExpChange(index, 'endDate', formatDateForStorage(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={exp.desc.replace(/<[^>]*>/g, '')} // Strip HTML for editing
                onChange={(e) => handleWorkExpChange(index, 'desc', `<p>${e.target.value}</p>`)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your training experience, projects handled, and key learnings..."
              />
            </div>

            {/* Display the formatted description */}
            <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview (how it appears in resume):
              </label>
              <div 
                className="text-sm text-gray-700"
                dangerouslySetInnerHTML={{ __html: exp.desc }}
              />
            </div>
          </div>
        ))}

        {workExp.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No industrial exposure added yet.</p>
            <p className="text-sm">Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ====================== ACHIEVEMENTS COMPONENT ======================
interface AchievementsInfoProps {
  visualresume: VisualResumeData;
  onUpdateResume: (data: VisualResumeData) => void;
}

export const AchievementsInfo: React.FC<AchievementsInfoProps> = ({ visualresume, onUpdateResume }) => {
  const [achievements, setAchievements] = useState<string[]>(visualresume.extraCurricular?.value || []);

  const handleAdd = () => {
    const newAchievement = `Achievement ${achievements.length + 1}`;
    const updatedAchievements = [...achievements, newAchievement];
    setAchievements(updatedAchievements);
    updateResume(updatedAchievements);
  };

  const handleChange = (index: number, value: string) => {
    const updatedAchievements = achievements.map((achievement, i) =>
      i === index ? value : achievement
    );
    setAchievements(updatedAchievements);
    updateResume(updatedAchievements);
  };

  const handleDelete = (index: number) => {
    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
    updateResume(updatedAchievements);
  };

  const updateResume = (updatedAchievements: string[]) => {
    const updatedResume = {
      ...visualresume,
      extraCurricular: {
        ...visualresume.extraCurricular,
        value: updatedAchievements
      }
    };
    onUpdateResume(updatedResume);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Extra Curricular Activities</h3>
        <Button variant="outline-primary" onClick={handleAdd} leftIcon={<PlusIcon />}>
          Add Achievement
        </Button>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
            <textarea
              value={achievement}
              onChange={(e) => handleChange(index, e.target.value)}
              rows={2}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter achievement"
            />
            <Button
              variant="ghost-red"
              size="sm"
              onClick={() => handleDelete(index)}
              leftIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ====================== HOBBIES COMPONENT ======================
interface HobbiesInfoProps {
  visualresume: VisualResumeData;
  onUpdateResume: (data: VisualResumeData) => void;
}

export const HobbiesInfo: React.FC<HobbiesInfoProps> = ({ visualresume, onUpdateResume }) => {
  const [hobbies, setHobbies] = useState<string[]>(visualresume.hobbies?.value || []);

  const handleAdd = () => {
    const updatedHobbies = [...hobbies, "New Hobby"];
    setHobbies(updatedHobbies);
    updateResume(updatedHobbies);
  };

  const handleChange = (index: number, value: string) => {
    const updatedHobbies = hobbies.map((hobby, i) =>
      i === index ? value : hobby
    );
    setHobbies(updatedHobbies);
    updateResume(updatedHobbies);
  };

  const handleDelete = (index: number) => {
    const updatedHobbies = hobbies.filter((_, i) => i !== index);
    setHobbies(updatedHobbies);
    updateResume(updatedHobbies);
  };

  const updateResume = (updatedHobbies: string[]) => {
    const updatedResume = {
      ...visualresume,
      hobbies: {
        ...visualresume.hobbies,
        value: updatedHobbies
      }
    };
    onUpdateResume(updatedResume);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Hobbies</h3>
        <Button variant="outline-primary" onClick={handleAdd} leftIcon={<PlusIcon />}>
          Add Hobby
        </Button>
      </div>

      <div className="space-y-3">
        {hobbies.map((hobby, index) => (
          <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
            <input
              type="text"
              value={hobby}
              onChange={(e) => handleChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter hobby"
            />
            <Button
              variant="ghost-red"
              size="sm"
              onClick={() => handleDelete(index)}
              leftIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ====================== AREA OF INTEREST COMPONENT ======================
// ====================== AREA OF INTEREST COMPONENT ======================
interface AreaOfIntrestInfoProps {
  visualresume: VisualResumeData;
  onUpdateResume: (data: VisualResumeData) => void;
}

// Define the AreaOfIntrest interface to match your data structure
interface AreaOfIntrestData {
  title: string;
  area: string;
  area1: string;
  area1Topic: string;
  area2: string;
  area2Topic: string;
  area3: string;
  area3Topic: string;
  show: boolean;
}

export const AreaOfIntrestInfo: React.FC<AreaOfIntrestInfoProps> = ({ 
  visualresume, 
  onUpdateResume 
}) => {
  const [areaData, setAreaData] = useState<AreaOfIntrestData>(
    visualresume.areaOfIntrest || {
      title: "AREA OF INTRESTS",
      area: "eng",
      area1: "ME",
      area1Topic: "Strength of Materials",
      area2: "ME",
      area2Topic: "Fluid Mechanics",
      area3: "ME",
      area3Topic: "Heat Transfer",
      show: false
    }
  );

  const handleFieldChange = (field: keyof AreaOfIntrestData, value: string | boolean) => {
    const updatedAreaData = {
      ...areaData,
      [field]: value
    };
    setAreaData(updatedAreaData);
    updateResume(updatedAreaData);
  };

  const updateResume = (updatedAreaData: AreaOfIntrestData) => {
    const updatedResume = {
      ...visualresume,
      areaOfIntrest: updatedAreaData
    };
    onUpdateResume(updatedResume);
  };

  // Predefined options for areas
  const areaOptions = [
    { value: "eng", label: "Engineering" },
    { value: "cs", label: "Computer Science" },
    { value: "me", label: "Mechanical Engineering" },
    { value: "ee", label: "Electrical Engineering" },
    { value: "ce", label: "Civil Engineering" },
    { value: "it", label: "Information Technology" }
  ];

  const subAreaOptions = [
    { value: "ME", label: "Mechanical Engineering" },
    { value: "EE", label: "Electrical Engineering" },
    { value: "CS", label: "Computer Science" },
    { value: "CE", label: "Civil Engineering" },
    { value: "IT", label: "Information Technology" },
    { value: "ECE", label: "Electronics & Communication" }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Area of Interests</h3>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={areaData.show}
            onChange={(e) => handleFieldChange('show', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="text-sm text-gray-700">Show in resume</label>
        </div>
      </div>

      <div className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section Title
          </label>
          <input
            type="text"
            value={areaData.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. AREA OF INTERESTS"
          />
        </div>

        {/* Main Area Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Area
          </label>
          <select
            value={areaData.area}
            onChange={(e) => handleFieldChange('area', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {areaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Area 1 */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-4">Interest Area 1</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area Category
              </label>
              <select
                value={areaData.area1}
                onChange={(e) => handleFieldChange('area1', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {subAreaOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Topic
              </label>
              <input
                type="text"
                value={areaData.area1Topic}
                onChange={(e) => handleFieldChange('area1Topic', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Strength of Materials"
              />
            </div>
          </div>
        </div>

        {/* Area 2 */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-4">Interest Area 2</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area Category
              </label>
              <select
                value={areaData.area2}
                onChange={(e) => handleFieldChange('area2', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {subAreaOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Topic
              </label>
              <input
                type="text"
                value={areaData.area2Topic}
                onChange={(e) => handleFieldChange('area2Topic', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Fluid Mechanics"
              />
            </div>
          </div>
        </div>

        {/* Area 3 */}
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-4">Interest Area 3</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area Category
              </label>
              <select
                value={areaData.area3}
                onChange={(e) => handleFieldChange('area3', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {subAreaOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Topic
              </label>
              <input
                type="text"
                value={areaData.area3Topic}
                onChange={(e) => handleFieldChange('area3Topic', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Heat Transfer"
              />
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-3">Preview (how it appears in resume):</h5>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>Main Area:</strong> {areaOptions.find(opt => opt.value === areaData.area)?.label || areaData.area}</p>
            <div className="ml-4 space-y-1">
              <p>• <strong>{areaData.area1}:</strong> {areaData.area1Topic}</p>
              <p>• <strong>{areaData.area2}:</strong> {areaData.area2Topic}</p>
              <p>• <strong>{areaData.area3}:</strong> {areaData.area3Topic}</p>
            </div>
            <p className="text-xs mt-2">
              <strong>Status:</strong> {areaData.show ? "✅ Will be shown in resume" : "❌ Hidden from resume"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
