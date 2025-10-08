// @/components/organisms/visualresume/fresher/Template.tsx

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import UserInformation from '@/components/organisms/visualreume/fresher/UserInformation';
import Resume from '@/components/templates/visualresume/fresher/Resume';
import LegacyResume from '@/components/templates/visualresume/fresher/LegacyResume';
import {
  LayoutInfo,
  UserInfo,
  PersonalInfo,
  ProfileSummaryInfo,
  SkillsInfo,
  EducationInfo,
  ProjectsInfo,
  WorkexpInfo,
  AchievementsInfo,
  HobbiesInfo,
  AreaOfIntrestInfo,
} from '@/components/organisms/visualreume/fresher/ResumeComponents';
import {
  ShareIcon,
  DownloadIcon,
  SaveIcon,
  LoadingSpinner,
  EditIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  MenuIcon,
  CheckIcon,
  DocumentIcon,
  CloseIcon,
  StarIcon,
  HeartIcon,
    TargetIcon
} from '@/components/atoms/Icons';
import Button from '@/components/atoms/Button';
import { H2, BodyText } from "@/components/atoms/Typography";
import { apiFetch } from '@/lib/api';
import { VisualResumeData } from '@/types/visualresume/fresher';
import {ResumeType, TemplateNumber} from '@/types/visualresume'
import { visualresumedata } from '@/lib/visualresume/fresher/fresher';
import { useToast } from '@/components/providers/ToastProvider';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  photoUrl?: string;
  username: string;
}

interface ColorTheme {
  bg: string;
  font: string;
}

interface TemplateProps {
  user: User;
  colors: ColorTheme[];
  fontFamily?: string;
  template: TemplateNumber;
  resumeType: ResumeType;
  fac?: number;
  
}

// Sidebar Menu Component
interface SidebarMenuProps {
  sections: any[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  colorVariants: any;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ 
  sections, 
  activeSection, 
  onSectionChange, 
  colorVariants 
}) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-3 p-4">
        {/* Header */}
        <div className="mb-6">
          <H2 className="text-lg font-bold text-[color:rgb(var(--neutral-900))] mb-2">
            Sections
          </H2>
          <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">
            Configure resume sections
          </BodyText>
        </div>

        {/* Section List */}
        {sections.map((section) => {
          const variant = colorVariants[section.color as keyof typeof colorVariants] || colorVariants.blue;
          const isActive = activeSection === section.key;
          
          return (
            <button
              key={section.key}
              onClick={() => onSectionChange(section.key)}
              className={`
                w-full text-left p-3 rounded-lg border-2 transition-all duration-200 
                ${isActive 
                  ? `bg-gradient-to-br ${variant.gradient} ${variant.border} scale-105 shadow-md` 
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center
                  ${isActive ? 'bg-white' : 'bg-gray-50'}
                  ${isActive ? variant.icon : 'text-gray-400'}
                `}>
                  {section.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`
                    text-sm font-medium truncate
                    ${isActive ? variant.title : 'text-gray-700'}
                  `}>
                    {section.title}
                  </div>
                  {isActive && (
                    <div className="text-xs text-gray-500 truncate mt-1">
                      {section.description}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Template: React.FC<TemplateProps> = ({ user, colors, template, fontFamily, resumeType }) => {
  const router = useRouter();
  const userInformationRef = useRef<any>(null);

  // State Management
  const [visualResume, setVisualResume] = useState<VisualResumeData>(visualresumedata);
  const [activeSection, setActiveSection] = useState('layoutInfo');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isLivePreview, setIsLivePreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<'menu' | 'editor' | 'resume'>('menu');

  const { show } = useToast();

  // Available sections
  const sections = [
    {
      key: 'layoutInfo',
      title: 'Layout Configuration',
      description: 'Configure colors, themes and overall layout settings',
      icon: <DocumentIcon className="w-5 h-5" />,
      component: LayoutInfo,
      color: 'blue',
      highlights: ['Color Themes', 'Layout Style', 'Font Selection']
    },
    {
      key: 'userInfo',
      title: 'User Information',
      description: 'Basic user profile and account information',
      icon: <UserIcon className="w-5 h-5" />,
      component: UserInfo,
      color: 'purple',
      highlights: ['Profile Data', 'Account Info', 'Photo Settings']
    },
    {
      key: 'personalInfo',
      title: 'Personal Information',
      description: 'Contact details, address and personal preferences',
      icon: <UserIcon className="w-5 h-5" />,
      component: PersonalInfo,
      color: 'green',
      highlights: ['Contact Info', 'Address', 'Phone Number']
    },
    {
      key: 'profileSummaryInfo',
      title: 'Profile Summary',
      description: 'Professional summary and career objective',
      icon: <DocumentIcon className="w-5 h-5" />,
      component: ProfileSummaryInfo,
      color: 'orange',
      highlights: ['Career Goals', 'Professional Summary', 'Key Strengths']
    },
    {
      key: 'techSkillsInfo',
      title: 'Technical Skills',
      description: 'Programming languages, tools and technologies',
      icon: <DocumentIcon className="w-5 h-5" />,
      component: SkillsInfo,
      color: 'blue',
      highlights: ['Programming', 'Tools', 'Technologies']
    },
    {
      key: 'educationInfo',
      title: 'Education',
      description: 'Academic background and qualifications',
      icon: <DocumentIcon className="w-5 h-5" />,
      component: EducationInfo,
      color: 'purple',
      highlights: ['Degree', 'University', 'Achievements']
    },
    {
      key: 'projectsInfo',
      title: 'Projects',
      description: 'Personal and professional project portfolio',
      icon: <DocumentIcon className="w-5 h-5" />,
      component: ProjectsInfo,
      color: 'green',
      highlights: ['Portfolio', 'GitHub', 'Live Demos']
    },
    {
      key: 'workexpInfo',
      title: 'Work Experience',
      description: 'Professional experience and internships',
      icon: <DocumentIcon className="w-5 h-5" />,
      component: WorkexpInfo,
      color: 'orange',
      highlights: ['Experience', 'Internships', 'Responsibilities']
    },
    {
    key: 'achievmentsInfo',
    title: 'Extra Curricular',
    description: 'Awards, achievements and extra curricular activities',
    icon: <StarIcon className="w-5 h-5" />,
    component: AchievementsInfo,
    color: 'blue',
    highlights: ['Awards', 'Achievements', 'Activities']
  },
  {
    key: 'hobbiesInfo',
    title: 'Hobbies',
    description: 'Personal interests and hobbies',
    icon: <HeartIcon className="w-5 h-5" />,
    component: HobbiesInfo,
    color: 'green',
    highlights: ['Interests', 'Recreation', 'Personal']
  },
  {
    key: 'areaOfIntrestInfo',
    title: 'Area of Interests',
    description: 'Professional and academic areas of interest',
    icon: <TargetIcon className="w-5 h-5" />,
    component: AreaOfIntrestInfo,
    color: 'purple',
    highlights: ['Specialization', 'Focus Areas', 'Expertise']
  }
  ];

  const colorVariants = {
    blue: {
      gradient: "from-blue-50 to-blue-100",
      border: "border-blue-200",
      icon: "text-blue-600",
      title: "text-blue-900",
      highlight: "bg-blue-100 text-blue-700"
    },
    purple: {
      gradient: "from-purple-50 to-purple-100",
      border: "border-purple-200",
      icon: "text-purple-600",
      title: "text-purple-900",
      highlight: "bg-purple-100 text-purple-700"
    },
    green: {
      gradient: "from-green-50 to-green-100",
      border: "border-green-200",
      icon: "text-green-600",
      title: "text-green-900",
      highlight: "bg-green-100 text-green-700"
    },
    orange: {
      gradient: "from-orange-50 to-orange-100",
      border: "border-orange-200",
      icon: "text-orange-600",
      title: "text-orange-900",
      highlight: "bg-orange-100 text-orange-700"
    }
  };

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch existing resume data if available
        try {
          const response = await apiFetch(`/api/visualresume`, {
            method: 'GET'
          });
          
          if (response.data) {
            setVisualResume({
              ...response.data,
              colors: response.data.colors || colors[0] || { bg: '#2563eb', font: '#ffffff' }
            });
          }
        } catch (fetchError) {
          const initialData = {
            ...visualresumedata,
            personalInformation: {
              ...visualresumedata.personalInformation,
              phone: '',
              designation: '',
              address: '',
              aboutMe: '',
              photoDisplay: false,
              addressDisplay: false
            },
            colors: colors[0] || { bg: '#2563eb', font: '#ffffff' }
          };
          setVisualResume(initialData);
        }
      } catch (error) {
        setError('Failed to load resume data. Please refresh and try again.');
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [user, colors]);

  const handleUpdateResume = useCallback((updatedData: VisualResumeData) => {
    setVisualResume(prev => {
      const identical = prev === updatedData;
      if (!identical) {
        console.log('Resume data updated');
      }
      return updatedData;
    });
  }, []);

  const handleEditClick = useCallback((section: string) => {
    setActiveSection(section);
    if (window.innerWidth < 1024) {
      setActiveView('editor');
      setMobileMenuOpen(false);
    }
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      
      const response = await apiFetch(`/api/visualresume/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          typeOfResume: `/visualresume/fresher/${template}`,
          data: visualResume
        })
      });

      if (!response) {
        show({ type: 'error', title: 'Failed to save resume' });
      } else {
        setVisualResume(response.visualresume.data);
        show({ type: 'success', title: 'Resume saved successfully!' });
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      setError(error instanceof Error ? error.message : 'Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await apiFetch('/api/visualresume/fresher/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      });

      if (response.success && response.downloadUrl) {
        const link = document.createElement('a');
        link.href = response.downloadUrl;
        link.download = `${user.firstName}_${user.lastName}_Resume.pdf`;
        link.click();
        show({ type: 'success', title: 'Resume downloaded successfully!' });
      }
    } catch (error) {
      setError('Failed to download resume. Please try again.');
    }
  };

  const handleLivePreview = () => {
    setIsLivePreview(!isLivePreview);
  };

  const handleShare = () => {
    // Share functionality implementation
    show({ type: 'info', title: 'Share functionality coming soon!' });
  };

  const renderCurrentSection = () => {
    const currentSection = sections.find(s => s.key === activeSection);
    if (!currentSection) return null;

    const SectionComponent = currentSection.component;
    const baseProps = {
      visualresume: visualResume,
      onUpdateResume: handleUpdateResume,
      onEditClick: handleEditClick
    };

    if (currentSection.key === 'userInfo') {
      return <SectionComponent user={user} {...baseProps} />;
    }

    return <SectionComponent {...baseProps} user={user} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner  />
          <H2 className="text-xl font-semibold mb-2">Loading your resume builder...</H2>
          <BodyText className="text-[color:rgb(var(--neutral-600))]">
            Setting up your workspace
          </BodyText>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Top Action Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[color:rgb(var(--neutral-200))] shadow-sm">
        <div className="max-w-full px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Logo/Title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <DocumentIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <H2 className="text-lg font-bold text-[color:rgb(var(--neutral-900))]">
                  Resume Builder
                </H2>
                <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">
                  {user.firstName} {user.lastName}
                </BodyText>
              </div>
            </div>

            {/* Right side - Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleLivePreview}
                leftIcon={isLivePreview ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                className="hidden md:flex"
              >
                {isLivePreview ? 'Exit Preview' : 'Live Preview'}
              </Button>
              
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleSave}
                leftIcon={saving ? <LoadingSpinner  /> : <SaveIcon className="w-4 h-4" />}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </Button>
              
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleDownload}
                leftIcon={<DownloadIcon className="w-4 h-4" />}
              >
                Download
              </Button>
              
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleShare}
                leftIcon={<ShareIcon className="w-4 h-4" />}
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full p-4">
        {isLivePreview ? (
          // Live Preview Mode - Full Width Resume with margins
          <div className="mx-4 lg:mx-12 xl:mx-24">
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <LegacyResume 
                visualResume={visualResume} 
                user={user} 
                isPreview={true}
                fontFamily={fontFamily}
                template={template}
                resumeType={resumeType}
                fac = {2.8}
              />
            </div>
          </div>
        ) : (
          // Desktop Layout - 3 Column Layout: 20% Sidebar, 30% LayoutInfo, 50% Resume
          <>
            <div className="hidden lg:grid grid-cols-10 gap-6 h-[calc(100vh-120px)]">
              {/* Sidebar Menu - 20% (2/10) */}
              <div className="col-span-2 bg-white rounded-lg border border-[color:rgb(var(--neutral-200))] overflow-hidden">
                <SidebarMenu 
                  sections={sections}
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                  colorVariants={colorVariants}
                />
              </div>

              {/* Layout Info Panel - 30% (3/10) */}
              <div className="col-span-4 bg-white rounded-lg border border-[color:rgb(var(--neutral-200))] overflow-y-auto">
                <div className="p-6">
                  {/* Current Section Header */}
                  <div className="flex items-center gap-3 mb-6">
                    {(() => {
                      const currentSection = sections.find(s => s.key === activeSection);
                      const variant = colorVariants[currentSection?.color as keyof typeof colorVariants] || colorVariants.blue;
                      return (
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${variant.gradient}`}>
                          <div className={variant.icon}>
                            {currentSection?.icon}
                          </div>
                        </div>
                      );
                    })()}
                    <div>
                      <H2 className="text-lg font-semibold">
                        {sections.find(s => s.key === activeSection)?.title}
                      </H2>
                      <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">
                        {sections.find(s => s.key === activeSection)?.description}
                      </BodyText>
                    </div>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <BodyText className="text-red-700 text-sm font-medium">Error</BodyText>
                      <BodyText className="text-red-600 text-sm">{error}</BodyText>
                    </div>
                  )}

                  {/* Section Content */}
                  <div className="space-y-4">
                    {renderCurrentSection()}
                  </div>
                </div>
              </div>

              {/* Resume Preview - 50% (5/10) */}
              <div className="col-span-4 bg-white rounded-lg border border-[color:rgb(var(--neutral-200))] overflow-y-auto">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <H2 className="text-lg font-semibold">Resume Preview</H2>
                    <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">
                      Live Preview
                    </BodyText>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <LegacyResume 
                      visualResume={visualResume} 
                      user={user} 
                      isPreview={false}
                      fontFamily={fontFamily}
                template={template}
                resumeType={resumeType}
                fac = {2}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden">
              {/* Mobile Header with Preview Toggle */}
              <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg border border-[color:rgb(var(--neutral-200))]">
                <H2 className="text-lg font-semibold">Resume Builder</H2>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleLivePreview}
                  leftIcon={isLivePreview ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                >
                  {isLivePreview ? 'Edit' : 'Preview'}
                </Button>
              </div>

              {/* Mobile View Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveView('menu')}
                  className={`px-3 py-2 rounded-[var(--radius-md)] text-xs font-medium transition-colors ${
                    activeView === 'menu'
                      ? 'bg-[color:rgb(var(--primary-500))] text-white'
                      : 'text-[color:rgb(var(--neutral-600))] hover:text-[color:rgb(var(--neutral-900))]'
                  }`}
                >
                  <MenuIcon className="w-4 h-4 mr-1" />
                  Menu
                </button>
                <button
                  onClick={() => setActiveView('editor')}
                  className={`px-3 py-2 rounded-[var(--radius-md)] text-xs font-medium transition-colors ${
                    activeView === 'editor'
                      ? 'bg-[color:rgb(var(--primary-500))] text-white'
                      : 'text-[color:rgb(var(--neutral-600))] hover:text-[color:rgb(var(--neutral-900))]'
                  }`}
                >
                  <EditIcon className="w-4 h-4 mr-1" />
                  Editor
                </button>
                <button
                  onClick={() => setActiveView('resume')}
                  className={`px-3 py-2 rounded-[var(--radius-md)] text-xs font-medium transition-colors ${
                    activeView === 'resume'
                      ? 'bg-[color:rgb(var(--primary-500))] text-white'
                      : 'text-[color:rgb(var(--neutral-600))] hover:text-[color:rgb(var(--neutral-900))]'
                  }`}
                >
                  <DocumentIcon className="w-4 h-4 mr-1" />
                  Resume
                </button>
              </div>

              {/* Mobile Content */}
              {activeView === 'menu' && (
                <div className="space-y-4">
                  <H2 className="text-lg font-bold mb-4">Resume Sections</H2>
                  {sections.map((section) => {
                    const variant = colorVariants[section.color as keyof typeof colorVariants] || colorVariants.blue;
                    const isActive = activeSection === section.key;
                    
                    return (
                      <button
                        key={section.key}
                        onClick={() => handleEditClick(section.key)}
                        className="w-full text-left p-4 bg-white rounded-lg border border-[color:rgb(var(--neutral-200))] transition-all duration-200 hover:shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${variant.gradient}`}>
                            <div className={variant.icon}>
                              {section.icon}
                            </div>
                          </div>
                          <div className="flex-1">
                            <H2 className="text-base font-semibold">{section.title}</H2>
                            <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">
                              {section.description}
                            </BodyText>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {activeView === 'editor' && (
                <div className="bg-white rounded-lg border border-[color:rgb(var(--neutral-200))] p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setActiveView('menu')}
                      leftIcon={<ArrowLeftIcon className="w-4 h-4" />}
                    >
                      Back
                    </Button>
                    <H2 className="text-lg font-semibold">
                      {sections.find(s => s.key === activeSection)?.title}
                    </H2>
                  </div>
                  {renderCurrentSection()}
                </div>
              )}

              {activeView === 'resume' && (
                <div className="bg-white rounded-lg border border-[color:rgb(var(--neutral-200))] p-4">
                  <div className="flex items-center justify-between mb-4">
                    <H2 className="text-lg font-semibold">Resume Preview</H2>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={handleDownload}
                      leftIcon={<DownloadIcon className="w-4 h-4" />}
                    >
                      Download
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <LegacyResume 
                      visualResume={visualResume} 
                      user={user} 
                      isPreview={false}
                      fontFamily={fontFamily}
                template={template}
                resumeType={resumeType}
                fac = {2}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Hidden UserInformation component for compatibility 
      <UserInformation
        ref={userInformationRef}
        user={user}
        visualresume={visualResume}
        onUpdateResume={handleUpdateResume}
        onEditClick={handleEditClick}
        className="hidden"
      />*/}
    </div>
  );
};

export default Template;
