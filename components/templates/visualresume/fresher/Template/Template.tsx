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
  CloseIcon
} from '@/components/atoms/Icons';
import Button from '@/components/atoms/Button';
import { H2, BodyText } from "@/components/atoms/Typography";
import { apiFetch } from '@/lib/api';
import { VisualResumeData } from '@/types/visualresume/fresher';
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
  template: string;
}

const Template: React.FC<TemplateProps> = ({ user, colors, template }) => {
  const router = useRouter();
  const userInformationRef = useRef<any>(null);

  // State Management
  const [visualResume, setVisualResume] = useState<VisualResumeData>(visualresumedata);
  const [activeSection, setActiveSection] = useState('layoutInfo');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<'menu' | 'editor' | 'resume'>('menu'); // For mobile

  const { show } = useToast();

  

  // Available sections - following FeatureCard structure
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
      icon: <EditIcon className="w-5 h-5" />,
      component: ProfileSummaryInfo,
      color: 'orange',
      highlights: ['Career Goals', 'Professional Summary', 'Key Strengths']
    },
    {
      key: 'techSkillsInfo',
      title: 'Technical Skills',
      description: 'Programming languages, tools and technologies',
      icon: <CheckIcon className="w-5 h-5" />,
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
      icon: <ShareIcon className="w-5 h-5" />,
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
    console.log('handleUpdateResume called — prev === updatedData?', identical);
    if (!identical) {
      console.trace('handleUpdateResume trace (who triggered this?)');
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
      return <SectionComponent {...baseProps} user={user} />;
    }

    return <SectionComponent {...baseProps} user={user} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[color:rgb(var(--primary-50))] via-[color:rgb(var(--surface-1))] to-[color:rgb(var(--secondary-50))]">
        {/* Background Elements - same as LoginForm */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 gradient-primary rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 gradient-success rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[color:rgb(var(--secondary-400))] to-[color:rgb(var(--primary-400))] rounded-full opacity-5 blur-2xl"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="text-lg text-[color:rgb(var(--neutral-600))]">Loading your resume builder...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[color:rgb(var(--primary-50))] via-[color:rgb(var(--surface-1))] to-[color:rgb(var(--secondary-50))]">
      {/* Background Elements - same as LoginForm */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 gradient-primary rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 gradient-success rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[color:rgb(var(--secondary-400))] to-[color:rgb(var(--primary-400))] rounded-full opacity-5 blur-2xl"></div>
        
        </div>

      {/* Mobile Header */}
      <div className="lg:hidden relative z-20 bg-white/80 backdrop-blur-sm border-b border-[color:rgb(var(--neutral-200))] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-gradient-primary flex items-center justify-center">
              <DocumentIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <H2 className="text-lg font-bold gradient-text">Resume Builder</H2>
              <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">
                {user.firstName} {user.lastName}
              </BodyText>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile View Tabs */}
            <div className="flex bg-white/50 rounded-[var(--radius-lg)] p-1">
              <button
                onClick={() => setActiveView('menu')}
                className={`px-3 py-2 rounded-[var(--radius-md)] text-xs font-medium transition-colors ${
                  activeView === 'menu' 
                    ? 'bg-[color:rgb(var(--primary-500))] text-white' 
                    : 'text-[color:rgb(var(--neutral-600))] hover:text-[color:rgb(var(--neutral-900))]'
                }`}
              >
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
                Resume
              </button>
            </div>

            {/* Mobile Action Buttons */}
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleSave}
              loading={saving}
              className="px-2"
            >
              <SaveIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Desktop Layout - Three Equal Columns */}
        <div className="hidden lg:flex w-full h-screen">
          {/* 1/3 - Side Menu */}
          <div className="w-1/3 border-r border-[color:rgb(var(--neutral-200))] bg-white/50 backdrop-blur-sm overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 mx-auto mb-3 rounded-[var(--radius-xl)] bg-gradient-primary flex items-center justify-center">
                  <DocumentIcon className="w-6 h-6 text-white" />
                </div>
                <H2 className="text-xl font-bold gradient-text mb-1">Resume Builder</H2>
                <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">
                  Create your professional resume
                </BodyText>
              </div>

              {/* Section Cards - Compact Version */}
              <div className="space-y-3">
                {sections.map((section, index) => {
                  const variant = colorVariants[section.color as keyof typeof colorVariants] || colorVariants.blue;
                  const isActive = activeSection === section.key;

                  return (
                    <div
                      key={section.key}
                      onClick={() => setActiveSection(section.key)}
                      className={`
                        relative group cursor-pointer transition-all duration-300 
                        ${isActive ? 'scale-105 z-10' : 'hover:scale-102'}
                      `}
                    >
                      <div className={`
                        relative bg-gradient-to-br ${variant.gradient} 
                        rounded-[var(--radius-xl)] p-3 border-2 transition-all duration-300
                        ${isActive ? variant.border + ' shadow-lg' : 'border-transparent hover:border-opacity-50 hover:' + variant.border}
                      `}>
                        {/* Compact Layout */}
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-[var(--radius-lg)] bg-white flex items-center justify-center ${variant.icon}`}>
                            {section.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-bold text-sm ${variant.title}`}>
                              {section.title}
                            </h3>
                          </div>
                        </div>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-1 ml-11">
                          {section.highlights.slice(0, 2).map((highlight, idx) => (
                            <span
                              key={idx}
                              className={`text-xs px-2 py-1 rounded-full ${variant.highlight} font-medium`}
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>

                        {/* Active Indicator */}
                        {isActive && (
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[var(--radius-xl)] opacity-20 blur-sm"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-[color:rgb(var(--neutral-200))]">
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={handleSave}
                  loading={saving}
                  leftIcon={<SaveIcon className="w-4 h-4" />}
                >
                  {saving ? 'Saving...' : 'Save Resume'}
                </Button>
                
                <Button
                  variant="outline-primary"
                  size="sm"
                  fullWidth
                  onClick={handleDownload}
                  leftIcon={<DownloadIcon className="w-4 h-4" />}
                >
                  Download PDF
                </Button>
              </div>
            </div>
          </div>

          {/* 1/3 - Editor Panel */}
          <div className="w-1/3 border-r border-[color:rgb(var(--neutral-200))] bg-white/50 backdrop-blur-sm overflow-y-auto">
            <div className="p-6">
              {/* Current Section Header */}
              <div className="mb-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-[var(--radius-xl)] p-4 border border-[color:rgb(var(--neutral-200))] shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const currentSection = sections.find(s => s.key === activeSection);
                        const variant = colorVariants[currentSection?.color as keyof typeof colorVariants] || colorVariants.blue;
                        return (
                          <div className={`w-10 h-10 rounded-[var(--radius-lg)] bg-gradient-to-br ${variant.gradient} flex items-center justify-center ${variant.icon}`}>
                            {currentSection?.icon}
                          </div>
                        );
                      })()}
                      <div>
                        <H2 className="text-lg font-bold text-[color:rgb(var(--neutral-900))]">
                          {sections.find(s => s.key === activeSection)?.title}
                        </H2>
                        <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">
                          {sections.find(s => s.key === activeSection)?.description}
                        </BodyText>
                      </div>
                    </div>

                    {/* Error Display */}
                    {error && (
                      <div className="text-xs text-[color:rgb(var(--error-600))] bg-[color:rgb(var(--error-50))] px-2 py-1 rounded-[var(--radius-md)] border border-[color:rgb(var(--error-200))]">
                        Error
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div className="bg-white/80 backdrop-blur-sm rounded-[var(--radius-xl)] p-4 border border-[color:rgb(var(--neutral-200))] shadow-sm max-h-[calc(100vh-200px)] overflow-y-auto">
                {renderCurrentSection()}
              </div>
            </div>
          </div>

          {/* 1/3 - Resume Preview */}
          <div className="w-1/3 bg-white/50 backdrop-blur-sm overflow-y-auto">
            <div className="p-6">
              <div className="mb-4 text-center">
                <H2 className="text-lg font-bold text-[color:rgb(var(--neutral-900))] mb-1">
                  Live Preview
                </H2>
                <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">
                  Real-time resume preview
                </BodyText>
              </div>

              <div className="bg-white rounded-[var(--radius-xl)] shadow-lg overflow-hidden border border-[color:rgb(var(--neutral-200))]">
                <div className="transform scale-75 origin-top">
                  {/*<Resume
                    visualResume={visualResume}
                    user={user}
                    isPreview={true}
                  />*/}
                  <LegacyResume visualResume={visualResume} user={user} isPreview={false} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Single Column with Tabs */}
        <div className="lg:hidden w-full">
          {activeView === 'menu' && (
            <div className="p-4 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              {/* Header */}
              <div className="text-center mb-6">
                <H2 className="text-xl font-bold gradient-text mb-2">Resume Sections</H2>
                <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">
                  Select a section to edit
                </BodyText>
              </div>

              {/* Section Cards */}
              <div className="space-y-3">
                {sections.map((section, index) => {
                  const variant = colorVariants[section.color as keyof typeof colorVariants] || colorVariants.blue;
                  const isActive = activeSection === section.key;

                  return (
                    <div
                      key={section.key}
                      onClick={() => handleEditClick(section.key)}
                      className="relative group cursor-pointer transition-all duration-300 hover:scale-102"
                    >
                      <div className={`
                        relative bg-gradient-to-br ${variant.gradient} 
                        rounded-[var(--radius-xl)] p-4 border-2 transition-all duration-300
                        ${isActive ? variant.border + ' shadow-lg' : 'border-transparent'}
                      `}>
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-[var(--radius-lg)] bg-white flex items-center justify-center ${variant.icon}`}>
                            {section.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-bold text-base mb-1 ${variant.title}`}>
                              {section.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {section.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {section.highlights.slice(0, 3).map((highlight, idx) => (
                                <span
                                  key={idx}
                                  className={`text-xs px-2 py-1 rounded-full ${variant.highlight} font-medium`}
                                >
                                  {highlight}
                                </span>
                              ))}
                            </div>
                          </div>
                          <ArrowRightIcon className={`w-5 h-5 ${variant.icon}`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeView === 'editor' && (
            <div className="p-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              {/* Section Header */}
              <div className="mb-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-[var(--radius-xl)] p-4 border border-[color:rgb(var(--neutral-200))] shadow-sm">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setActiveView('menu')}
                      leftIcon={<ArrowLeftIcon className="w-4 h-4" />}
                    >
                      Back
                    </Button>
                    <div className="flex-1">
                      <H2 className="text-lg font-bold text-[color:rgb(var(--neutral-900))]">
                        {sections.find(s => s.key === activeSection)?.title}
                      </H2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div className="bg-white/80 backdrop-blur-sm rounded-[var(--radius-xl)] p-4 border border-[color:rgb(var(--neutral-200))] shadow-sm">
                {renderCurrentSection()}
              </div>
            </div>
          )}

          {activeView === 'resume' && (
            <div className="p-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              <div className="mb-4 text-center">
                <H2 className="text-lg font-bold text-[color:rgb(var(--neutral-900))] mb-2">
                  Resume Preview
                </H2>
                <div className="flex justify-center gap-2 mb-4">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={handleDownload}
                    leftIcon={<DownloadIcon className="w-4 h-4" />}
                  >
                    Download
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-[var(--radius-xl)] shadow-lg overflow-hidden border border-[color:rgb(var(--neutral-200))]">
                {/*<Resume
                  visualResume={visualResume}
                  user={user}
                  isPreview={true}
                />*/}
                <LegacyResume visualResume={visualResume} user={user} isPreview={false} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden UserInformation component for compatibility */}
      <div className="hidden">
        <UserInformation
          ref={userInformationRef}
          user={user}
          visualresume={visualResume}
          onUpdateResume={handleUpdateResume}
          onEditClick={handleEditClick}
        />
      </div>
    </div>
  );
};

export default Template;
