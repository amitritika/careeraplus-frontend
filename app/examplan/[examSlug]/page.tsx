// app/examplan/[examSlug]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { H1, H2, BodyText } from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { ExamIcon, LoadingSpinner, ArrowRightIcon, ArrowLeftIcon } from '@/components/atoms/Icons';
import { apiFetch } from '@/lib/api';


interface Stream {
  name: string;
  slug: string;
  isActive: boolean;
  preparationTypes: Array<{
    name: string;
    slug: string;
    description: string;
    isActive: boolean;
  }>;
}

interface ExamData {
  name: string;
  slug: string;
  description: string;
  streams: Stream[];
}

export default function ExamStreamsPage(): React.JSX.Element {
  const router = useRouter();
  const params = useParams();
  const examSlug = params.examSlug as string;

  const [examData, setExamData] = useState<ExamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (examSlug) {
      loadExamData();
    }
  }, [examSlug]);

  const loadExamData = async () => {
    try {
      setLoading(true);
      const response = await apiFetch(`/api/exams/${examSlug}`);
      setExamData(response);
    } catch (err) {
      setError('Failed to load exam data. Please try again.');
      console.error('Error loading exam data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStreamSelect = (streamSlug: string) => {
    router.push(`/examplan/${examSlug}/${streamSlug}`as any);
  };

  const handleBack = () => {
    router.push('/examplan'as any);
  };

  const getStreamColor = (index: number) => {
    const colors = ['blue', 'purple', 'green', 'orange', 'red'];
    return colors[index % colors.length];
  };

  const getStreamGradient = (index: number) => {
    const gradients = [
      'from-blue-50 to-blue-100',
      'from-purple-50 to-purple-100', 
      'from-green-50 to-green-100',
      'from-orange-50 to-orange-100',
      'from-red-50 to-red-100'
    ];
    return gradients[index % gradients.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <BodyText className="mt-4 text-[color:rgb(var(--neutral-600))]">
            Loading streams...
          </BodyText>
        </div>
      </div>
    );
  }

  if (error || !examData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <ExamIcon className="w-16 h-16 mx-auto" />
          </div>
          <H2 className="text-[color:rgb(var(--error-600))] mb-2">Unable to Load Exam Data</H2>
          <BodyText className="mb-6 text-[color:rgb(var(--neutral-600))]">{error}</BodyText>
          <div className="space-x-4">
            <Button onClick={handleBack} variant="secondary">
              Back to Exams
            </Button>
            <Button onClick={loadExamData} variant="primary">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const activeStreams = examData.streams.filter(stream => stream.isActive);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-blue-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            onClick={handleBack}
            variant="ghost-primary"
            leftIcon={<ArrowLeftIcon className="w-4 h-4" />}
          >
            Back to Exams
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
            <ExamIcon className="w-8 h-8 text-white" />
          </div>
          
          <H1 className="mb-4 text-[color:rgb(var(--neutral-900))]">
            {examData.name} Streams
          </H1>
          
          <BodyText className="text-xl text-[color:rgb(var(--neutral-600))] max-w-2xl mx-auto">
            Choose your engineering stream to get a customized study plan with subject-wise 
            weightage and topic distribution.
          </BodyText>
        </div>

        {/* Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {activeStreams.map((stream, index) => (
            <div
              key={stream.slug}
              className={`group relative bg-gradient-to-br ${getStreamGradient(index)} rounded-3xl p-8 border border-white/60 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
              onClick={() => handleStreamSelect(stream.slug)}
            >
              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${
                  getStreamColor(index) === 'blue' ? 'from-blue-600 to-blue-700' :
                  getStreamColor(index) === 'purple' ? 'from-purple-600 to-purple-700' :
                  getStreamColor(index) === 'green' ? 'from-green-600 to-green-700' :
                  getStreamColor(index) === 'orange' ? 'from-orange-600 to-orange-700' :
                  'from-red-600 to-red-700'
                } rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <ExamIcon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <H2 className={`mb-3 ${
                  getStreamColor(index) === 'blue' ? 'text-blue-900' :
                  getStreamColor(index) === 'purple' ? 'text-purple-900' :
                  getStreamColor(index) === 'green' ? 'text-green-900' :
                  getStreamColor(index) === 'orange' ? 'text-orange-900' :
                  'text-red-900'
                }`}>
                  {stream.name}
                </H2>

                {/* Description */}
                <BodyText className="text-[color:rgb(var(--neutral-700))] mb-6 leading-relaxed">
                  Comprehensive study plan for {stream.name} engineering with subject-wise 
                  analysis and optimized topic distribution.
                </BodyText>

                {/* Preparation Types */}
                {stream.preparationTypes && stream.preparationTypes.length > 0 && (
                  <div className="mb-6">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      getStreamColor(index) === 'blue' ? 'bg-blue-100 text-blue-700' :
                      getStreamColor(index) === 'purple' ? 'bg-purple-100 text-purple-700' :
                      getStreamColor(index) === 'green' ? 'bg-green-100 text-green-700' :
                      getStreamColor(index) === 'orange' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {stream.preparationTypes.filter(pt => pt.isActive).length} Preparation Type{stream.preparationTypes.filter(pt => pt.isActive).length !== 1 ? 's' : ''}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <Button
                  variant={getStreamColor(index) as any}
                  fullWidth
                  rightIcon={<ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStreamSelect(stream.slug);
                  }}
                >
                  Create Study Plan
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* No Streams Message */}
        {activeStreams.length === 0 && (
          <div className="text-center py-16">
            <ExamIcon className="w-16 h-16 mx-auto text-[color:rgb(var(--neutral-400))] mb-4" />
            <H2 className="text-[color:rgb(var(--neutral-600))] mb-2">No Streams Available</H2>
            <BodyText className="text-[color:rgb(var(--neutral-500))]">
              Streams for this exam are currently being updated. Please check back later.
            </BodyText>
          </div>
        )}
      </div>
    </div>
  );
}

