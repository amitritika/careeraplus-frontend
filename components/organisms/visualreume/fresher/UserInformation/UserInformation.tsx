// @/components/organisms/visualresume/fresher/UserInformation.tsx

'use client';

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { apiFetch } from '@/lib/api';
import { CheckIcon, AlertIcon, LoadingSpinner, UserIcon, EmailIcon, PhoneIcon } from '@/components/atoms/Icons';
import { H2, BodyText } from "@/components/atoms/Typography";
import { VisualResumeData } from '@/types/visualresume/fresher';
import { useToast } from '@/components/providers/ToastProvider';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  photoUrl?: string;
}

interface UserInformationProps {
  user: User;
  visualresume: VisualResumeData;
  onUpdateResume: (data: VisualResumeData) => void;
  onEditClick: (section: string) => void;
}

interface UserInformationHandle {
  editClickChild: (displayName: string) => void;
  editClickNext: (currentDisplay: string, nextDisplay: string) => void;
}

const UserInformation = forwardRef<UserInformationHandle, UserInformationProps>(
  ({ user, visualresume, onUpdateResume, onEditClick }, ref) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { show } = useToast();

    // Color variants following FeatureCard design
    const colorVariants = {
      blue: {
        gradient: "from-blue-50 to-blue-100",
        border: "border-blue-200",
        icon: "text-blue-600",
        title: "text-blue-900",
        highlight: "bg-blue-100 text-blue-700"
      },
      green: {
        gradient: "from-green-50 to-green-100",
        border: "border-green-200",
        icon: "text-green-600",
        title: "text-green-900",
        highlight: "bg-green-100 text-green-700"
      },
      purple: {
        gradient: "from-purple-50 to-purple-100",
        border: "border-purple-200",
        icon: "text-purple-600",
        title: "text-purple-900",
        highlight: "bg-purple-100 text-purple-700"
      }
    };

    // User info cards data
    const userInfoCards = [
      {
        title: "Profile Information",
        description: "Basic profile details and photo settings",
        icon: <UserIcon className="w-6 h-6" />,
        color: "blue",
        highlights: ["Profile Photo", "Display Name"],
        data: [
          { label: "Full Name", value: `${user.firstName} ${user.lastName}` },
          { label: "Display Name", value: user.name },
          { label: "Photo Available", value: user.photoUrl ? "Yes" : "No" }
        ]
      },
      {
        title: "Contact Information",
        description: "Email and communication preferences",
        icon: <EmailIcon className="w-6 h-6" />,
        color: "green",
        highlights: ["Email Verified", "Primary Contact"],
        data: [
          { label: "Email Address", value: user.email },
          { label: "User ID", value: user.id }
        ]
      },
      {
        title: "Resume Settings",
        description: "Personal information display preferences",
        icon: <PhoneIcon className="w-6 h-6" />,
        color: "purple",
        highlights: ["Personal Info", "Contact Display"],
        data: [
          { label: "Phone Number", value: visualresume.personalInformation?.phone || "Not provided" },
          { label: "Professional Title", value: visualresume.personalInformation?.designation || "Not provided" },
          { label: "Address", value: visualresume.personalInformation?.address || "Not provided" }
        ]
      }
    ];

    useImperativeHandle(ref, () => ({
      editClickChild: (displayName: string) => {
        onEditClick(displayName);
      },
      editClickNext: (currentDisplay: string, nextDisplay: string) => {
        onEditClick(nextDisplay);
      }
    }));

    useEffect(() => {
      const init = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const response = await apiFetch('/api/user/profile');
          
          if (response.error) {
            setError(response.error);
          } else {
            setSuccess(true);
            show({ type: 'success', title: 'User data loaded successfully' });
          }
        } catch (error) {
          setError('Failed to load user data');
        } finally {
          setLoading(false);
        }
      };

      if (user) {
        init();
      }
    }, [user, show]);

    if (loading) {
      return (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <BodyText className="text-[color:rgb(var(--neutral-600))]">
              Loading user information...
            </BodyText>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full overflow-y-auto space-y-6">
        {/* Success/Error Messages */}
        {success && (
          <div className="p-4 bg-[color:rgb(var(--success-50))] border-2 border-[color:rgb(var(--success-200))] rounded-[var(--radius-xl)]">
            <div className="flex items-center gap-3">
              <CheckIcon className="w-5 h-5 text-[color:rgb(var(--success-600))]" />
              <BodyText className="text-[color:rgb(var(--success-800))] font-medium">
                User data loaded successfully
              </BodyText>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-[color:rgb(var(--error-50))] border-2 border-[color:rgb(var(--error-200))] rounded-[var(--radius-xl)]">
            <div className="flex items-center gap-3">
              <AlertIcon className="w-5 h-5 text-[color:rgb(var(--error-600))]" />
              <BodyText className="text-[color:rgb(var(--error-800))] font-medium">
                Error: {error}
              </BodyText>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          {user.photoUrl ? (
            <img
              src={user.photoUrl}
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-[color:rgb(var(--primary-200))] mx-auto mb-4"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              {user.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          )}
          <H2 className="text-2xl font-bold gradient-text mb-2">User Information</H2>
          <BodyText className="text-[color:rgb(var(--neutral-600))]">
            Manage your profile and resume settings
          </BodyText>
        </div>

        {/* User Information Cards - Following FeatureCard design */}
        <div className="grid gap-6">
          {userInfoCards.map((card, index) => {
            const variant = colorVariants[card.color as keyof typeof colorVariants] || colorVariants.blue;

            return (
              <div
                key={index}
                className="relative group transition-all duration-300 hover:scale-102"
              >
                <div className={`
                  relative bg-gradient-to-br ${variant.gradient} 
                  rounded-[var(--radius-2xl)] p-6 border-2 ${variant.border}
                  transition-all duration-300 hover:shadow-lg
                `}>
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-[var(--radius-lg)] bg-white flex items-center justify-center mb-4 ${variant.icon}`}>
                    {card.icon}
                  </div>

                  {/* Title & Description */}
                  <H2 className={`text-xl font-bold mb-2 ${variant.title}`}>
                    {card.title}
                  </H2>
                  <BodyText className="text-gray-600 mb-4">
                    {card.description}
                  </BodyText>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {card.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className={`text-sm px-3 py-1 rounded-full ${variant.highlight} font-medium`}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  {/* Data Display */}
                  <div className="space-y-3">
                    {card.data.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-white/50 last:border-b-0">
                        <span className="text-sm font-medium text-gray-700">
                          {item.label}
                        </span>
                        <span className="text-sm text-gray-900 font-semibold max-w-[60%] text-right truncate">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[var(--radius-2xl)] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notice */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-[var(--radius-xl)] p-4 border-2 border-gray-200">
          <BodyText className="text-sm text-[color:rgb(var(--neutral-600))] text-center">
            <strong>Note:</strong> Basic information is managed through your account settings. 
            Use the Personal Information section to add additional resume-specific details.
          </BodyText>
        </div>
      </div>
    );
  }
);

UserInformation.displayName = 'UserInformation';

export default UserInformation;
