// app/examplan/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { H1, H2, BodyText } from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { ExamIcon, LoadingSpinner, ArrowRightIcon } from '@/components/atoms/Icons';
import { apiFetch } from '@/lib/api';

interface Stream {
  name: string;
  slug: string;
  isActive: boolean;
}

interface Exam {
  _id: string;
  name: string;
  slug: string;
  description: string;
  streams: Stream[];
  isActive: boolean;
}

export default function ExamPlanPage(): React.JSX.Element {
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/api/exams');
      setExams(response);
    } catch (err) {
      setError('Failed to load exams. Please try again.');
      console.error('Error loading exams:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExamSelect = (examSlug: string) => {
    router.push(`/examplan/${examSlug}` as any);
  };

  const getExamColor = (index: number): string => {
    const colors = ['blue', 'purple', 'green', 'orange'];
    return colors[index % colors.length];
  };

  const getExamGradient = (index: number): string => {
    const gradients = [
      'from-blue-50 to-blue-100',
      'from-purple-50 to-purple-100', 
      'from-green-50 to-green-100',
      'from-orange-50 to-orange-100'
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <BodyText className="mt-4 text-[color:rgb(var(--neutral-600))]">
            Loading exam plans...
          </BodyText>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <ExamIcon className="w-16 h-16 mx-auto" />
          </div>
          <H2 className="text-[color:rgb(var(--error-600))] mb-2">Unable to Load Exams</H2>
          <BodyText className="mb-6 text-[color:rgb(var(--neutral-600))]">{error}</BodyText>
          <Button onClick={loadExams} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-blue-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
            <ExamIcon className="w-8 h-8 text-white" />
          </div>
          
          <H1 className="mb-4 text-[color:rgb(var(--neutral-900))]">
            Choose Your Exam Plan
          </H1>
          
          <BodyText className="text-xl text-[color:rgb(var(--neutral-600))] max-w-2xl mx-auto">
            Select from our comprehensive study plans designed with data analytics and 
            previous year paper analysis to maximize your success rate.
          </BodyText>
        </div>

        {/* Exam Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {exams.map((exam, index) => (
            <div
              key={exam._id}
              className={`group relative bg-gradient-to-br ${getExamGradient(index)} rounded-3xl p-8 border border-white/60 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
              onClick={() => handleExamSelect(exam.slug)}
            >
              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${
                  getExamColor(index) === 'blue' ? 'from-blue-600 to-blue-700' :
                  getExamColor(index) === 'purple' ? 'from-purple-600 to-purple-700' :
                  getExamColor(index) === 'green' ? 'from-green-600 to-green-700' :
                  'from-orange-600 to-orange-700'
                } rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <ExamIcon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <H2 className={`mb-3 ${
                  getExamColor(index) === 'blue' ? 'text-blue-900' :
                  getExamColor(index) === 'purple' ? 'text-purple-900' :
                  getExamColor(index) === 'green' ? 'text-green-900' :
                  'text-orange-900'
                }`}>
                  {exam.name}
                </H2>

                {/* Description */}
                <BodyText className="text-[color:rgb(var(--neutral-700))] mb-6 leading-relaxed">
                  {exam.description || `Comprehensive study plan for ${exam.name} with analytics-based approach and revision cycles.`}
                </BodyText>

                {/* Streams Count */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    getExamColor(index) === 'blue' ? 'bg-blue-100 text-blue-700' :
                    getExamColor(index) === 'purple' ? 'bg-purple-100 text-purple-700' :
                    getExamColor(index) === 'green' ? 'bg-green-100 text-green-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {exam.streams.filter((s: Stream) => s.isActive).length} Stream{exam.streams.filter((s: Stream) => s.isActive).length !== 1 ? 's' : ''} Available
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant={getExamColor(index) as 'blue' | 'purple' | 'green' | 'orange'}
                  fullWidth
                  rightIcon={<ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleExamSelect(exam.slug);
                  }}
                >
                  View Streams
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <H2 className="text-[color:rgb(var(--neutral-900))] mb-4">
              Why Choose Our Exam Plans?
            </H2>
            <BodyText className="text-[color:rgb(var(--neutral-600))] max-w-2xl mx-auto">
              Our data-driven approach ensures maximum efficiency in your preparation
            </BodyText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Data Analytics Based",
                description: "Plans based on previous year paper analysis and weightage distribution"
              },
              {
                title: "Smart Revision Cycles", 
                description: "Multiple revision rounds with increasing frequency before exam"
              },
              {
                title: "Backup Days Included",
                description: "Built-in buffer days to accommodate unforeseen circumstances"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/60">
                <H2 className="text-lg mb-3 text-[color:rgb(var(--neutral-900))]">
                  {feature.title}
                </H2>
                <BodyText className="text-[color:rgb(var(--neutral-600))]">
                  {feature.description}
                </BodyText>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
