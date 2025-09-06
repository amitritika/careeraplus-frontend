// organisms/Hero.tsx
import React from 'react';
import Button from '@/components/atoms/Button';
import { H1, BodyText } from '@/components/atoms/Typography';
import { ResumeIcon, ExamIcon, CheckIcon } from '@/components/atoms/Icons';

export const Hero: React.FC = () => (
  <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[color:rgb(var(--primary-50))] via-white to-[color:rgb(var(--secondary-50))] overflow-hidden">
    {/* Enhanced Background Elements */}
    <div className="absolute inset-0 z-0">
      {/* Large floating circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 right-32 w-64 h-64 bg-purple-200/40 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-indigo-200/25 rounded-full blur-xl animate-bounce delay-2000"></div>
      
      {/* Smaller accent circles */}
      <div className="absolute top-1/4 right-1/2 w-24 h-24 bg-pink-200/20 rounded-full blur-lg animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-cyan-200/30 rounded-full blur-xl animate-pulse delay-1500"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59 130 246) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="space-y-8">
        <H1 color="gradient">
          Create Your Dream Visual Resume
          <br />
          <span className="text-[color:rgb(var(--neutral-700))]">in 15 Minutes</span>
        </H1>
        
        <BodyText size="lg" color="secondary" className="max-w-3xl mx-auto">
          Transform your career with our AI-powered resume builder, data-driven exam plans, 
          and comprehensive career guidance. Join thousands who achieved their dream jobs.
        </BodyText>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
          <Button 
            variant="primary" 
            size="xl" 
            leftIcon={<ResumeIcon className="w-5 h-5" />}
            fullWidth
            className="sm:w-auto"
          >
            Build Resume Now
          </Button>
          <Button 
            variant="outline-primary" 
            size="xl" 
            leftIcon={<ExamIcon className="w-5 h-5" />}
            fullWidth
            className="sm:w-auto"
          >
            Explore Exam Plans
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-[color:rgb(var(--neutral-500))] pt-8">
          <div className="flex items-center space-x-2">
            <CheckIcon className="w-5 h-5 text-[color:rgb(var(--success-500))]" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckIcon className="w-5 h-5 text-[color:rgb(var(--success-500))]" />
            <span>Free Templates</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckIcon className="w-5 h-5 text-[color:rgb(var(--success-500))]" />
            <span>15 Min Setup</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default Hero;