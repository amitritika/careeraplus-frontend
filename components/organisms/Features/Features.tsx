// organisms/Features.tsx
import React from 'react';
import { H2, BodyText } from "@/components/atoms/Typography";
import FeatureCard  from "@/components/molecules/FeatureCard";
import Button from "@/components/atoms/Button";
import { 
  ResumeIcon, 
  ExamIcon, 
  CareerIcon, 
  ShareIcon,
  CheckIcon,
  StarIcon,
  TrendingIcon,
  DownloadIcon
} from '@/components/atoms/Icons';

const Features: React.FC = () => {
  const mainFeatures = [
    {
      icon: <ResumeIcon className="w-8 h-8" />,
      title: "Visual Resume Builder",
      description: "Create stunning visual resumes with multiple color themes and layouts. Convert your existing resume in just 15 minutes with our easy-to-use tool.",
      highlights: ["15 Min Creation", "Multiple Themes", "Auto-Layout"],
      color: "blue"
    },
    {
      icon: <ExamIcon className="w-8 h-8" />,
      title: "Data-Driven Exam Plans", 
      description: "Customize your study timetable for GATE, ESE, State PSC exams. Our analytics-based approach includes tests, revision cycles, and backup days.",
      highlights: ["GATE & ESE Ready", "Smart Analytics", "Revision Cycles"],
      color: "purple"
    },
    {
      icon: <CareerIcon className="w-8 h-8" />,
      title: "Career Guidance",
      description: "Access extensive career path information, skill improvement videos, and expert blogs to navigate your professional journey effectively.",
      highlights: ["Expert Videos", "Career Paths", "Skill Guides"],
      color: "green"
    },
    {
      icon: <ShareIcon className="w-8 h-8" />,
      title: "Instant Sharing",
      description: "Get a shareable URL with attractive clickable post images. Share your visual resume across LinkedIn, Facebook, and other platforms.",
      highlights: ["Social Ready", "Clickable Posts", "Instant URLs"],
      color: "orange"
    }
  ];

  const additionalFeatures = [
    { icon: <DownloadIcon className="w-5 h-5" />, text: "Unlimited PDF Downloads" },
    { icon: <StarIcon className="w-5 h-5" />, text: "Premium Templates" },
    { icon: <TrendingIcon className="w-5 h-5" />, text: "Performance Analytics" },
    { icon: <CheckIcon className="w-5 h-5" />, text: "ATS-Friendly Format" },
  ];

  const stats = [
    { number: "10,000+", label: "Users Trust Us" },
    { number: "15", label: "Minutes Setup" },
    { number: "50+", label: "Templates Available" },
    { number: "99%", label: "Success Rate" },
  ];

  return (
    <>
      {/* Main Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-100 rounded-full opacity-40 blur-lg"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200">
              <StarIcon className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">Why Choose CareerPlus?</span>
            </div>
            
            <H2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[color:rgb(var(--brand-600))] to-purple-600 bg-clip-text text-transparent">
              Everything you need to accelerate your career growth
            </H2>
            
            <BodyText className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines AI-powered resume building, data-driven exam preparation, 
              and expert career guidance to help you land your dream job.
            </BodyText>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {mainFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                highlights={feature.highlights}
                color={feature.color}
                index={index}
              />
            ))}
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-16">
            <div className="text-center mb-8">
              <H2 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Professionals</H2>
              <BodyText className="text-gray-600">Join thousands who have transformed their careers</BodyText>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[color:rgb(var(--brand-600))] to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Features */}
          <div className="text-center">
            <H2 className="text-2xl font-bold text-gray-900 mb-8">Plus Many More Features</H2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-2 p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                  <div className="text-[color:rgb(var(--brand-600))]">{feature.icon}</div>
                  <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Start Building Now
              </Button>
              <Button variant="secondary" size="lg">
                View All Features
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <H2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</H2>
            <BodyText className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process
            </BodyText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choose Template",
                description: "Select from 50+ professional templates designed by experts"
              },
              {
                step: "02", 
                title: "Add Your Info",
                description: "Fill in your details with our smart auto-suggestions"
              },
              {
                step: "03",
                title: "Download & Share",
                description: "Get your resume in PDF format and shareable link instantly"
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-[color:rgb(var(--brand-600))] to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>
                <H2 className="text-xl font-bold text-gray-900 mb-4">{step.title}</H2>
                <BodyText className="text-gray-600">{step.description}</BodyText>
                
                {/* Connector Arrow (except for last item) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-[color:rgb(var(--brand-600))] to-purple-600 ml-8"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
