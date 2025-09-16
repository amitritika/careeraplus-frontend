// app/examplan/[examSlug]/[streamSlug]/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { useToast } from '@/components/providers/ToastProvider';
import { H1, H2, H3, BodyText } from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import {
  ExamIcon,
  LoadingSpinner,
  ArrowLeftIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  TrendingIcon
} from '@/components/atoms/Icons';
import { apiFetch } from '@/lib/api';
import CalendarSection from '@/components/templates/CalendarSection';

// Type definitions
interface PreparationType {
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
}

interface StreamData {
  exam: string;
  examSlug: string;
  stream: {
    name: string;
    slug: string;
    preparationTypes: PreparationType[];
  };
}

interface ScheduleDay {
  date: string;
  subject: string;
  topic: string;
  type: string;
  testType?: string;
  color: string;
  isLastDay?: boolean;
}

interface Subject {
  name: string;
  studyDays: number;
  revision1Days: number;
  revision2Days: number;
  totalDays: number;
  topics: Array<{
    name: string;
    days: number;
  }>;
}

interface ExamPlanData {
  success: boolean;
  data: {
    exam: string;
    stream: string;
    preparationType: string;
    totalDays: number;
    studyDays: number;
    vacationDays: number;
    schedule: ScheduleDay[];
    subjects: Subject[];
    phases: {
      z1: number;
      z2: number;
      z3: number;
    };
    statistics: {
      mainCourseDays: number;
      finalRevision1Days: number;
      finalRevision2Days: number;
      backupDays: number;
      scheduleBreakdown: {
        totalDays: number;
        studyDays: number;
        revision1Days: number;
        revision2Days: number;
        vacationDays: number;
        backupDays: number;
        testDays: number;
        topicTests: number;
        fullLengthRev1Tests: number;
        fullLengthRev2Tests: number;
      };
    };
  };
}

// Form validation
interface FormData {
  startDate: string;
  endDate: string;
  hasVacation: boolean;
  vacationStart: string;
  vacationEnd: string;
  hasRevision: boolean;
  selectedPrepType: string;
}

interface FormErrors {
  startDate?: string;
  endDate?: string;
  vacationStart?: string;
  vacationEnd?: string;
  general?: string;
}

export default function StreamExamPlanPage(): React.JSX.Element {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const { show } = useToast();

  const examSlug = params?.examSlug as string;
  const streamSlug = params?.streamSlug as string;

  // State management
  const [streamData, setStreamData] = useState<StreamData | null>(null);
  const [examPlan, setExamPlan] = useState<ExamPlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState<FormData>({
    startDate: '',
    endDate: '',
    hasVacation: false,
    vacationStart: '',
    vacationEnd: '',
    hasRevision: true,
    selectedPrepType: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Initialize default dates
  useEffect(() => {
    const today = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(today.getMonth() + 3);
    
    setFormData(prev => ({
      ...prev,
      startDate: today.toISOString().split('T')[0],
      endDate: threeMonthsLater.toISOString().split('T')[0]
    }));
  }, []);

  // Load stream data
  useEffect(() => {
    if (examSlug && streamSlug) {
      loadStreamData();
    }
  }, [examSlug, streamSlug]);

  const loadStreamData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await apiFetch(`/api/exams/${examSlug}/streams/${streamSlug}`);
      setStreamData(response);

      // Set default prep type
      if (response.stream.preparationTypes?.length > 0) {
        const defaultPrepType = response.stream.preparationTypes.find((pt: PreparationType) => pt.isActive) 
          || response.stream.preparationTypes[0];
        
        setFormData(prev => ({
          ...prev,
          selectedPrepType: defaultPrepType.slug
        }));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load stream data. Please try again.';
      setError(errorMessage);
      console.error('Error loading stream data:', err);
    } finally {
      setLoading(false);
    }
  }, [examSlug, streamSlug]);

  // Form validation
  const validateForm = useCallback((): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.startDate) {
      errors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      errors.endDate = 'End date is required';
    }
    
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      
      if (start >= end) {
        errors.endDate = 'End date must be after start date';
      }
      
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 30) {
        errors.general = 'Study period must be at least 30 days';
      }
    }
    
    if (formData.hasVacation) {
      if (!formData.vacationStart) {
        errors.vacationStart = 'Vacation start date is required';
      }
      
      if (!formData.vacationEnd) {
        errors.vacationEnd = 'Vacation end date is required';
      }
      
      if (formData.vacationStart && formData.vacationEnd) {
        const vacStart = new Date(formData.vacationStart);
        const vacEnd = new Date(formData.vacationEnd);
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        
        if (vacStart >= vacEnd) {
          errors.vacationEnd = 'Vacation end date must be after start date';
        }
        
        if (vacStart < start || vacEnd > end) {
          errors.general = 'Vacation period must be within study period';
        }
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const generateExamPlan = useCallback(async () => {
    if (!validateForm()) {
      show({
        type: 'error',
        title: 'Validation Error',
        description: 'Please correct the form errors before proceeding.'
      });
      return;
    }

    try {
      setGenerating(true);
      setFormErrors({});
      
      const endpoint = formData.selectedPrepType 
        ? `/api/exams/${examSlug}/streams/${streamSlug}/preparation-types/${formData.selectedPrepType}/generate`
        : `/api/exams/${examSlug}/streams/${streamSlug}/generate`;

      const payload = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        hasVacation: formData.hasVacation,
        hasRevision: formData.hasRevision,
        ...(formData.hasVacation && {
          vacationStart: formData.vacationStart,
          vacationEnd: formData.vacationEnd
        })
      };

      const response = await apiFetch(endpoint, {
        method: 'POST',
        json: payload
      });

      setExamPlan(response);
      
      show({
        type: 'success',
        title: 'Plan Generated!',
        description: 'Your personalized study plan has been created successfully.'
      });
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('exam-plan-results')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate exam plan. Please try again.';
      
      show({
        type: 'error',
        title: 'Generation Failed',
        description: errorMessage
      });
      
      console.error('Error generating exam plan:', err);
    } finally {
      setGenerating(false);
    }
  }, [formData, validateForm, show, examSlug, streamSlug]);

  const saveExamPlan = useCallback(async () => {
    if (!user) {
      show({
        type: 'error',
        title: 'Authentication Required',
        description: 'Please login to save your exam plan.'
      });
      router.push('/login');
      return;
    }

    if (!examPlan) {
      show({
        type: 'error',
        title: 'No Plan Found',
        description: 'Please generate an exam plan first.'
      });
      return;
    }

    try {
      setSaving(true);
      
      const endpoint = formData.selectedPrepType 
        ? `/api/exams/${examSlug}/streams/${streamSlug}/preparation-types/${formData.selectedPrepType}/save/${user._id}`
        : `/api/exams/${examSlug}/streams/${streamSlug}/save/${user._id}`;

      await apiFetch(endpoint, {
        method: 'POST',
        json: {
          ...examPlan.data,
          startDate: formData.startDate,
          endDate: formData.endDate,
          hasVacation: formData.hasVacation,
          hasRevision: formData.hasRevision,
          ...(formData.hasVacation && {
            vacationStart: formData.vacationStart,
            vacationEnd: formData.vacationEnd
          })
        }
      });

      show({
        type: 'success',
        title: 'Plan Saved!',
        description: 'Your exam plan has been saved to your account.'
      });
      
      router.push('/dashboard' as any);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save exam plan. Please try again.';
      
      show({
        type: 'error',
        title: 'Save Failed',
        description: errorMessage
      });
      
      console.error('Error saving exam plan:', err);
    } finally {
      setSaving(false);
    }
  }, [user, examPlan, formData, show, router, examSlug, streamSlug]);

  const handleBack = useCallback(() => {
    router.push(`/examplan/${examSlug}`);
  }, [router, examSlug]);

  const updateFormData = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear related errors
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  }, [formErrors]);

  const resetPlan = useCallback(() => {
    setExamPlan(null);
    setFormErrors({});
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="flex flex-col items-center justify-center h-96">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 p-8 shadow-xl text-center">
            <LoadingSpinner size="lg" />
            <BodyText className="mt-4 text-[color:rgb(var(--neutral-600))]">
              Loading exam plan generator...
            </BodyText>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !streamData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 p-8 shadow-xl text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExamIcon className="w-8 h-8 text-red-600" />
              </div>
              
              <H2 className="mb-4 text-[color:rgb(var(--error-600))]">
                Unable to Load Stream Data
              </H2>
              
              <BodyText className="mb-6 text-[color:rgb(var(--neutral-600))]">
                {error || 'An unexpected error occurred while loading the exam plan generator.'}
              </BodyText>
              
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={handleBack}
                  variant="outline-primary"
                  leftIcon={<ArrowLeftIcon />}
                >
                  Back to Streams
                </Button>
                
                <Button
                  onClick={loadStreamData}
                  variant="primary"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <Button
                  onClick={handleBack}
                  variant="outline-primary"
                  size="sm"
                  leftIcon={<ArrowLeftIcon />}
                >
                  Back to Streams
                </Button>
                
                <div className="flex items-center space-x-2">
                  <ExamIcon className="w-6 h-6 text-blue-600" />
                  <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">
                    Exam Plan Generator
                  </BodyText>
                </div>
              </div>
              
              <H1 className="mb-2 text-[color:rgb(var(--neutral-900))]">
                {streamData.exam} - {streamData.stream.name}
              </H1>
              
              <BodyText className="text-[color:rgb(var(--neutral-600))]">
                Create your personalized study plan with intelligent topic distribution and revision scheduling.
              </BodyText>
            </div>

            {!examPlan ? (
              /* Configuration Form */
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 p-8 shadow-xl">
                <H2 className="mb-6 text-[color:rgb(var(--neutral-900))]">
                  Configure Your Study Plan
                </H2>

                <div className="space-y-6">
                  {/* General Error */}
                  {formErrors.general && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <BodyText className="text-red-700">{formErrors.general}</BodyText>
                    </div>
                  )}

                  {/* Preparation Type Selection */}
                  {streamData.stream.preparationTypes && streamData.stream.preparationTypes.length > 0 && (
                    <div className="space-y-3">
                      <H3 className="text-[color:rgb(var(--neutral-800))]">Preparation Type</H3>
                      <div className="grid gap-3">
                        {streamData.stream.preparationTypes
                          .filter(pt => pt.isActive)
                          .map((prepType) => (
                            <div
                              key={prepType.slug}
                              className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                formData.selectedPrepType === prepType.slug
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                              onClick={() => updateFormData('selectedPrepType', prepType.slug)}
                            >
                              <input
                                type="radio"
                                name="preparationType"
                                value={prepType.slug}
                                checked={formData.selectedPrepType === prepType.slug}
                                onChange={(e) => updateFormData('selectedPrepType', e.target.value)}
                                className="sr-only"
                              />
                              
                              {formData.selectedPrepType === prepType.slug && (
                                <div className="absolute top-4 right-4">
                                  <CheckIcon className="w-5 h-5 text-blue-500" />
                                </div>
                              )}
                              
                              <H3 className="text-[color:rgb(var(--neutral-800))] mb-1">
                                {prepType.name}
                              </H3>
                              
                              {prepType.description && (
                                <BodyText className="text-sm text-[color:rgb(var(--neutral-600))]">
                                  {prepType.description}
                                </BodyText>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Date Selection */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="startDate" className="block font-semibold text-[color:rgb(var(--neutral-800))]">
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        value={formData.startDate}
                        onChange={(e) => updateFormData('startDate', e.target.value)}
                        className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formErrors.startDate ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {formErrors.startDate && (
                        <BodyText className="text-sm text-red-600">{formErrors.startDate}</BodyText>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="endDate" className="block font-semibold text-[color:rgb(var(--neutral-800))]">
                        End Date (Exam Date)
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        value={formData.endDate}
                        onChange={(e) => updateFormData('endDate', e.target.value)}
                        className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          formErrors.endDate ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {formErrors.endDate && (
                        <BodyText className="text-sm text-red-600">{formErrors.endDate}</BodyText>
                      )}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-4">
                    <H3 className="text-[color:rgb(var(--neutral-800))]">Study Options</H3>
                    
                    {/* Revision Option */}
                    <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <input
                        type="checkbox"
                        id="hasRevision"
                        checked={formData.hasRevision}
                        onChange={(e) => updateFormData('hasRevision', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
                      />
                      <div>
                        <label htmlFor="hasRevision" className="font-semibold text-blue-900 cursor-pointer">
                          Include Multiple Revision Cycles
                        </label>
                        <BodyText className="text-sm text-blue-700 mt-1">
                          Recommended for comprehensive preparation with Rev1 and Rev2 phases
                        </BodyText>
                      </div>
                    </div>
                    
                    {/* Vacation Option */}
                    <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                      <input
                        type="checkbox"
                        id="hasVacation"
                        checked={formData.hasVacation}
                        onChange={(e) => updateFormData('hasVacation', e.target.checked)}
                        className="w-5 h-5 text-yellow-600 rounded focus:ring-yellow-500 mt-0.5"
                      />
                      <div>
                        <label htmlFor="hasVacation" className="font-semibold text-yellow-900 cursor-pointer">
                          I have vacation/break periods
                        </label>
                        <BodyText className="text-sm text-yellow-700 mt-1">
                          Schedule will adjust around your vacation dates
                        </BodyText>
                      </div>
                    </div>
                  </div>

                  {/* Vacation Dates */}
                  {formData.hasVacation && (
                    <div className="space-y-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                      <H3 className="text-yellow-900">Vacation Period</H3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="vacationStart" className="block font-semibold text-yellow-800">
                            Vacation Start Date
                          </label>
                          <input
                            type="date"
                            id="vacationStart"
                            value={formData.vacationStart}
                            onChange={(e) => updateFormData('vacationStart', e.target.value)}
                            className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
                              formErrors.vacationStart ? 'border-red-500' : 'border-yellow-300'
                            }`}
                          />
                          {formErrors.vacationStart && (
                            <BodyText className="text-sm text-red-600">{formErrors.vacationStart}</BodyText>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="vacationEnd" className="block font-semibold text-yellow-800">
                            Vacation End Date
                          </label>
                          <input
                            type="date"
                            id="vacationEnd"
                            value={formData.vacationEnd}
                            onChange={(e) => updateFormData('vacationEnd', e.target.value)}
                            className={`w-full px-4 py-3 bg-white border rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
                              formErrors.vacationEnd ? 'border-red-500' : 'border-yellow-300'
                            }`}
                          />
                          {formErrors.vacationEnd && (
                            <BodyText className="text-sm text-red-600">{formErrors.vacationEnd}</BodyText>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Generate Button */}
                  <div className="pt-4">
                    <Button
                      onClick={generateExamPlan}
                      loading={generating}
                      loadingText="Generating Your Plan..."
                      fullWidth
                      size="lg"
                      leftIcon={<CalendarIcon />}
                    >
                      Generate Study Plan
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              /* Generated Plan Display */
              <div id="exam-plan-results" className="space-y-8">
                {/* Plan Overview */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-6">
                    <H2 className="text-[color:rgb(var(--neutral-900))]">
                      Your Study Plan
                    </H2>
                    
                    <div className="flex space-x-3">
                      <Button
                        onClick={resetPlan}
                        variant="outline-primary"
                        size="sm"
                      >
                        Modify Plan
                      </Button>
                      
                      <Button
                        onClick={saveExamPlan}
                        loading={saving}
                        loadingText="Saving..."
                        size="sm"
                      >
                        Save Plan
                      </Button>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {examPlan.data.totalDays}
                      </div>
                      <BodyText className="text-blue-700 font-medium">Total Days</BodyText>
                    </div>
                    
                    <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {examPlan.data.studyDays}
                      </div>
                      <BodyText className="text-green-700 font-medium">Study Days</BodyText>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {examPlan.data.subjects.length}
                      </div>
                      <BodyText className="text-purple-700 font-medium">Subjects</BodyText>
                    </div>
                    
                    <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600 mb-1">
                        {examPlan.data.subjects.reduce((acc, subject) => acc + subject.topics.length, 0)}
                      </div>
                      <BodyText className="text-orange-700 font-medium">Topics</BodyText>
                    </div>
                  </div>

                  {/* Additional Statistics */}
                  {examPlan.data.statistics?.scheduleBreakdown && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-600">
                          {examPlan.data.statistics.scheduleBreakdown.testDays}
                        </div>
                        <BodyText className="text-sm text-gray-500">Test Days</BodyText>
                      </div>
                      
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-600">
                          {examPlan.data.statistics.scheduleBreakdown.backupDays}
                        </div>
                        <BodyText className="text-sm text-gray-500">Backup Days</BodyText>
                      </div>
                      
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-600">
                          {examPlan.data.statistics.scheduleBreakdown.revision1Days}
                        </div>
                        <BodyText className="text-sm text-gray-500">Revision 1</BodyText>
                      </div>
                      
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold text-gray-600">
                          {examPlan.data.statistics.scheduleBreakdown.revision2Days}
                        </div>
                        <BodyText className="text-sm text-gray-500">Revision 2</BodyText>
                      </div>
                    </div>
                  )}
                </div>

                {/* Calendar Section */}
                <CalendarSection
                  schedule={examPlan.data.schedule}
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  title="Study Calendar"
                  description="Navigate through your monthly study schedule. Click on any day to see detailed information."
                />

                {/* Subject Breakdown */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 p-8 shadow-xl">
                  <H3 className="mb-6 text-[color:rgb(var(--neutral-900))]">
                    Subject Distribution
                  </H3>
                  
                  <div className="grid gap-4">
                    {examPlan.data.subjects.map((subject, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <H3 className="text-blue-900 mb-1">{subject.name}</H3>
                            <BodyText className="text-sm text-blue-700">
                              {subject.topics.length} topics • {subject.totalDays} total days
                            </BodyText>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm text-blue-600">
                              Study: {subject.studyDays} days
                            </div>
                            {subject.revision1Days > 0 && (
                              <div className="text-sm text-orange-600">
                                Rev1: {subject.revision1Days} days
                              </div>
                            )}
                            {subject.revision2Days > 0 && (
                              <div className="text-sm text-red-600">
                                Rev2: {subject.revision2Days} days
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-3">
                          <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                              style={{ 
                                width: `${(subject.totalDays / Math.max(...examPlan.data.subjects.map(s => s.totalDays))) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
