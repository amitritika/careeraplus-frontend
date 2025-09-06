'use client';

import { API_BASE } from '@/lib/api';
import SocialLoginButton from '@/components/atoms/SocialMediaButton';

interface SocialLoginButtonsProps {
  providers?: Array<'google' | 'facebook' | 'linkedin' | 'twitter' | 'github'>;
  layout?: 'grid-2' | 'grid-3' | 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onProviderClick?: (provider: string) => void;
}

const layoutConfig = {
  'grid-2': 'grid grid-cols-2 gap-3',
  'grid-3': 'grid grid-cols-3 gap-3',
  'vertical': 'flex flex-col gap-3',
  'horizontal': 'flex flex-row gap-3',
};

export default function SocialLoginButtons({
  providers = ['google', 'facebook'],
  layout = 'grid-2',
  size = 'md',
  className = '',
  onProviderClick,
}: SocialLoginButtonsProps) {
  const handleProviderClick = (provider: string) => {
    if (onProviderClick) {
      onProviderClick(provider);
      window.location.assign(`${API_BASE}/api/auth/oauth/${provider}/start`);
    } else {
      // Default OAuth behavior
      window.location.assign(`${API_BASE}/api/auth/oauth/${provider}/start`);
    }
  };

  return (
    <div className={`mt-6 ${layoutConfig[layout]} ${className}`.trim()}>
      {providers.map((provider) => (
        <SocialLoginButton
          key={provider}
          provider={provider}
          size={size}
          onClick={() => handleProviderClick(provider)}
        />
      ))}
    </div>
  );
}
