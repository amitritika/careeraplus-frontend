// organisms/Pricing.tsx
import React, { useState } from 'react';
import { H2, BodyText } from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import  PricingCard from "@/components/molecules/PricingCard";
import { 
  CheckIcon, 
  StarIcon, 
  ShieldIcon,
  SupportIcon,
  TrendingIcon,
  HeartIcon
} from '@/components/atoms/Icons';

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      title: "Basic",
      description: "Perfect for students and job seekers starting their career journey",
      price: billingCycle === 'yearly' ? "₹299" : "₹49",
      originalPrice: billingCycle === 'yearly' ? "₹588" : "₹59",
      period: billingCycle === 'yearly' ? "year" : "month",
      discount: billingCycle === 'yearly' ? "Save 49%" : null,
      features: [
        "1 Page Resume",
        "5 Color Themes", 
        "10 Basic Templates",
        "PDF Download",
        "Email Support",
        "Basic Analytics"
      ],
      popular: false,
      ctaText: "Get Started",
      ctaVariant: "secondary" as const
    },
    {
      title: "Professional",
      description: "Most popular choice for professionals seeking better opportunities",
      price: billingCycle === 'yearly' ? "₹599" : "₹99",
      originalPrice: billingCycle === 'yearly' ? "₹1,188" : "₹119",
      period: billingCycle === 'yearly' ? "year" : "month", 
      discount: billingCycle === 'yearly' ? "Save 50%" : "Save 17%",
      features: [
        "Up to 3 Page Resume",
        "20+ Color Themes",
        "50+ Premium Templates", 
        "Unlimited Downloads",
        "Resume Sharing URL",
        "Priority Support",
        "Cover Letter Builder",
        "LinkedIn Integration"
      ],
      popular: true,
      ctaText: "Start Professional",
      ctaVariant: "primary" as const
    },
    {
      title: "Enterprise",
      description: "Complete solution for career transformation and exam preparation",
      price: billingCycle === 'yearly' ? "₹999" : "₹149",
      originalPrice: billingCycle === 'yearly' ? "₹1,788" : "₹179",
      period: billingCycle === 'yearly' ? "year" : "month",
      discount: billingCycle === 'yearly' ? "Save 44%" : "Save 17%",
      features: [
        "Unlimited Pages & Resumes",
        "All Color Themes & Templates",
        "Custom Branding Options",
        "Advanced Analytics Dashboard",
        "Exam Planning Tools",
        "Career Guidance Sessions",
        "24/7 Priority Support",
        "API Access",
        "Team Collaboration"
      ],
      popular: false,
      ctaText: "Go Enterprise",
      ctaVariant: "primary" as const
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at TCS",
      content: "CareerPlus helped me land my dream job at TCS. The visual resume made me stand out!",
      rating: 5
    },
    {
      name: "Rajesh Kumar", 
      role: "GATE 2024 AIR 156",
      content: "The exam planning feature was a game-changer. Cleared GATE with flying colors!",
      rating: 5
    },
    {
      name: "Anita Desai",
      role: "Marketing Manager",
      content: "Professional plan gave me everything I needed. Worth every rupee!",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Can I switch plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee if you're not satisfied with our service."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! You can try all features free for 7 days, no credit card required."
    }
  ];

  return (
    <>
      {/* Main Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-40 left-20 w-32 h-32 bg-purple-200/25 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-full border border-green-200">
              <TrendingIcon className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-700">Simple, Transparent Pricing</span>
            </div>

            <H2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[color:rgb(var(--brand-600))] to-purple-600 bg-clip-text text-transparent">
              Choose Your Perfect Plan
            </H2>
            
            <BodyText className="text-lg text-gray-600 max-w-3xl mx-auto">
              Start free, upgrade when you need more. All plans include core resume building features 
              with no hidden fees or surprise charges.
            </BodyText>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[color:rgb(var(--brand-500))] focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Save up to 50%
                </span>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                {...plan}
                onCTAClick={() => console.log(`Selected ${plan.title} plan`)}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="flex items-center space-x-2 text-gray-500">
                <ShieldIcon className="w-5 h-5" />
                <span className="text-sm">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <CheckIcon className="w-5 h-5" />
                <span className="text-sm">30-Day Guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <SupportIcon className="w-5 h-5" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
            
            <BodyText className="text-gray-500">
              Join 10,000+ professionals who trust CareerPlus with their career growth
            </BodyText>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <H2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</H2>
            <BodyText className="text-lg text-gray-600">
              Don't just take our word for it. Here's what our community says.
            </BodyText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <BodyText className="text-gray-700 mb-4 italic">
                  "{testimonial.content}"
                </BodyText>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <H2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</H2>
            <BodyText className="text-lg text-gray-600">
              Everything you need to know about our pricing and plans.
            </BodyText>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <BodyText className="text-gray-600">{faq.answer}</BodyText>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <BodyText className="text-gray-600 mb-4">
              Still have questions?
            </BodyText>
            <Button variant="secondary">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[color:rgb(var(--brand-600))] to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <H2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </H2>
          <BodyText className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your 7-day free trial today. No credit card required, 
            cancel anytime. Join thousands who found their dream jobs.
          </BodyText>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Start Free Trial
            </Button>
            <Button variant="outline-primary" size="lg" className="text-white border-white hover:bg-white hover:text-[color:rgb(var(--brand-600))]">
              View Demo
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-2 mt-6">
            <HeartIcon className="w-4 h-4 text-pink-300" />
            <BodyText className="text-blue-200 text-sm">
              Trusted by professionals worldwide
            </BodyText>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
