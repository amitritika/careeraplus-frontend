// organisms/Footer.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { H3, BodyText } from '@/components/atoms/Typography';
import {
  FacebookIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon,
  YouTubeIcon,
  EmailIcon,
  PhoneIcon,
  LocationIcon,
  CheckIcon,
  ShieldIcon,
  AwardIcon,
  SupportIcon,
  HeartIcon
} from '@/components/atoms/Icons';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C+</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CareerPlus
              </span>
            </div>
            
            <BodyText className="text-gray-300 leading-relaxed">
              Empowering careers through visual resumes, data-driven exam preparation, 
              and comprehensive career guidance. Your dream job is just 15 minutes away.
            </BodyText>
            
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<FacebookIcon />} label="Facebook" />
              <SocialLink href="#" icon={<TwitterIcon />} label="Twitter" />
              <SocialLink href="#" icon={<LinkedInIcon />} label="LinkedIn" />
              <SocialLink href="#" icon={<InstagramIcon />} label="Instagram" />
              <SocialLink href="#" icon={<YouTubeIcon />} label="YouTube" />
            </div>
          </div>

          {/* Products Section */}
          <div className="space-y-6">
            <H3 className="text-white">Products</H3>
            <nav className="space-y-3">
              <FooterLink href="/resume-builder">Resume Builder</FooterLink>
              <FooterLink href="/exam-planner">Exam Planner</FooterLink>
              <FooterLink href="/career-guidance">Career Guidance</FooterLink>
              <FooterLink href="/templates">Resume Templates</FooterLink>
              <FooterLink href="/pricing">Pricing Plans</FooterLink>
            </nav>
          </div>

          {/* Resources Section */}
          <div className="space-y-6">
            <H3 className="text-white">Resources</H3>
            <nav className="space-y-3">
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/career-tips">Career Tips</FooterLink>
              <FooterLink href="/exam-guides">Exam Guides</FooterLink>
              <FooterLink href="/success-stories">Success Stories</FooterLink>
              <FooterLink href="/help-center">Help Center</FooterLink>
              <FooterLink href="/api-docs">API Documentation</FooterLink>
            </nav>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <H3 className="text-white">Stay Updated</H3>
            <BodyText className="text-gray-300">
              Get the latest career tips, exam updates, and exclusive offers delivered to your inbox.
            </BodyText>
            
            {!subscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                />
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full"
                >
                  Subscribe Now
                </Button>
              </form>
            ) : (
              <div className="p-4 bg-green-900 border border-green-700 rounded-xl">
                <div className="flex items-center space-x-2">
                  <CheckIcon className="w-5 h-5 text-green-400" />
                  <span className="text-green-100 font-semibold">Successfully subscribed!</span>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <H3 className="text-white text-sm">Contact Us</H3>
              <div className="space-y-2">
                <ContactInfo 
                  icon={<EmailIcon />} 
                  text="contact@careeraplus.in"
                  href="mailto:contact@careeraplus.in"
                />
                <ContactInfo 
                  icon={<PhoneIcon />} 
                  text="+91 98765 43210"
                  href="tel:+919876543210"
                />
                <ContactInfo 
                  icon={<LocationIcon />} 
                  text="Bangalore, Karnataka, India"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <BodyText className="text-gray-400 text-sm flex items-center space-x-2">
              <span>© {new Date().getFullYear()} CareerPlus. All rights reserved.</span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <HeartIcon className="w-4 h-4 text-red-500" />
                <span>in India</span>
              </span>
            </BodyText>
            
            {/* Legal Links */}
            <div className="flex flex-wrap items-center space-x-6">
              <FooterLink href="/privacy-policy" className="text-sm">Privacy Policy</FooterLink>
              <FooterLink href="/terms-of-service" className="text-sm">Terms of Service</FooterLink>
              <FooterLink href="/cookie-policy" className="text-sm">Cookie Policy</FooterLink>
              <FooterLink href="/refund-policy" className="text-sm">Refund Policy</FooterLink>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <BodyText className="text-gray-500 text-sm text-center md:text-left">
                Trusted by 10,000+ professionals • ISO 27001 Certified • Enterprise Ready
              </BodyText>
              
              <div className="flex items-center space-x-4">
                <TrustBadge icon={<ShieldIcon />} text="Secure" />
                <TrustBadge icon={<AwardIcon />} text="Certified" />
                <TrustBadge icon={<SupportIcon />} text="24/7 Support" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==================== SUPPORTING COMPONENTS ====================

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, className = "" }) => (
  <Link 
    href={href as any}
    className={`text-gray-300 hover:text-white transition-colors duration-200 hover:underline ${className}`}
  >
    {children}
  </Link>
);

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 bg-gray-800 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-lg transition-all duration-300 group"
    aria-label={label}
  >
    <div className="w-5 h-5 text-gray-300 group-hover:text-white">
      {icon}
    </div>
  </a>
);

interface ContactInfoProps {
  icon: React.ReactNode;
  text: string;
  href?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, text, href }) => {
  const content = (
    <div className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
      <div className="w-4 h-4">{icon}</div>
      <span className="text-sm">{text}</span>
    </div>
  );

  return href ? <a href={href}>{content}</a> : content;
};

interface TrustBadgeProps {
  icon: React.ReactNode;
  text: string;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, text }) => (
  <div className="flex items-center space-x-1 text-gray-400">
    <div className="w-4 h-4">{icon}</div>
    <span className="text-xs">{text}</span>
  </div>
);
export default Footer;