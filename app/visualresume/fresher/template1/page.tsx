'use client';

import Head from 'next/head';
import AuthProtected from '@/components/templates/AuthProtected';
import Template from "@/components/templates/visualresume/fresher/TemplateTrial";

const Template1 = () => {
  const head = () => (
    <Head>
      <title>Visual Resume Builder - Create Professional Resume | Career A+</title>
      <meta 
        name="description" 
        content="Create stunning visual resumes with our professional template. Stand out from the crowd with modern, customizable resume designs." 
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href="/visualresume/fresher/template1" />
      
      {/* Open Graph */}
      <meta property="og:title" content="Visual Resume Builder - Professional Template" />
      <meta property="og:description" content="Create stunning visual resumes with our professional template" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="/visualresume/fresher/template1" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Visual Resume Builder" />
      <meta name="twitter:description" content="Create professional visual resumes" />
      
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );

  return (
    <>
      {head()}
       <AuthProtected>
      {(user) => (
        <div className="min-h-screen bg-[color:rgb(var(--surface-2))]">
          <Template 
            user={user}
            colors={[{ bg: '#2563eb', font: '#ffffff' }]}
            template={5}
            fontFamily='calibri'
            resumeType='fresher'
          />
        </div>
      )}
    </AuthProtected>
    </>
  );
};

export default Template1;
