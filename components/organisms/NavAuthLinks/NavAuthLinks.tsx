// organisms/Navbar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { apiFetch, API_BASE } from '@/lib/api';
import { useToast } from '@/components/providers/ToastProvider';
import { 
  MenuIcon, 
  CloseIcon, 
  ChevronDownIcon,
  LoadingSpinner 
} from '@/components/atoms/Icons';
import Button from '@/components/atoms/Button';

type Profile = {
  username: string;
  name: string;
  email: string;
  role?: number;
  photoUrl?: string;
};

export default function Navbar() {
  const router = useRouter();
  const { show } = useToast();
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const role = profile?.role ?? null;
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [avatarSrc, setAvatarSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await apiFetch('/api/user/profile', { method: 'GET' });
        const u: Profile = (res?.user ?? res) as Profile;
        setProfile(u);

        if (u?.username) {
          setAvatarSrc(`${API_BASE}/api/user/photo/${encodeURIComponent(u.username)}`);
        } else {
          setAvatarSrc(null);
        }
      } catch {
        setProfile(null);
        setAvatarSrc(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  async function onSignout(e?: React.MouseEvent) {
    e?.preventDefault();
    try {
      await apiFetch('/api/auth/signout', { method: 'GET' });
      show({ type: 'success', title: 'Signed out' });
    } catch (err: any) {
      show({ type: 'error', title: 'Signout failed', description: err?.message });
    } finally {
      router.replace('/login' as Route<'/login'>);
    }
  }

  const finalAvatarSrc = avatarSrc || '/Logo.png';
  const initials = (profile?.name || profile?.username || 'U')
    .split(' ')
    .map(s => s[0]?.toUpperCase())
    .slice(0, 2)
    .join('') || 'U';

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
               <img
              src="/Logo.png"
              alt="Career A+ logo"
              className="h-9 w-9 rounded-full ring-1 ring-white/25 bg-white/10"
            />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[color:rgb(var(--brand-600))] to-[color:rgb(var(--brand-500))] bg-clip-text text-transparent">
                Career A+
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLink href="/" >Home</NavLink>
              <NavLink href="/pricing">Pricing</NavLink>
              <NavLink href="/about">About</NavLink>
              {profile && <NavLink href="/admin">Dashboard</NavLink>}
            </div>

            {/* Right side - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {loading ? (
                <LoadingSpinner size="sm" />
              ) : profile ? (
                // User menu
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[color:rgb(var(--brand-500))]/20 group"
                  >
                    <div className="relative">
                      {avatarSrc ? (<img
                        src={finalAvatarSrc}
                        alt="Profile"
                        className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 group-hover:border-[color:rgb(var(--brand-400))] transition-colors duration-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />) : null}
                      {avatarSrc == null ? (<div className="absolute inset-0 w-9 h-9 rounded-full bg-gradient-to-r from-[color:rgb(var(--brand-600))] to-[color:rgb(var(--brand-500))] flex items-center justify-center text-white font-semibold text-sm">
                        {initials}
                      </div>) : null}
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-sm font-medium text-gray-900">
                        {profile.name || profile.username}
                      </div>
                      <div className="text-xs text-gray-500">
                        {profile.email}
                      </div>
                    </div>
                    <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {menuOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="text-sm font-medium text-gray-900">
                          {profile.name || profile.username}
                        </div>
                        <div className="text-xs text-gray-500">{profile.email}</div>
                      </div>
                      
                      <div className="py-2">
                        <MenuItem href="/dashboard">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                              📊
                            </div>
                            <span>Dashboard</span>
                          </div>
                        </MenuItem>
                        <MenuItem href="/settings">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                              ⚙️
                            </div>
                            <span>Settings</span>
                          </div>
                        </MenuItem>
                        <MenuItem href="/account">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                              👤
                            </div>
                            <span>Account</span>
                          </div>
                        </MenuItem>
                        
                        {role === 1 && (
                          <MenuItem href="/admin">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                                🔧
                              </div>
                              <span>Admin Panel</span>
                            </div>
                          </MenuItem>
                        )}
                      </div>

                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={onSignout}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                            🚪
                          </div>
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Auth buttons
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => router.push('/login' as Route<'/login'>)}
                  >
                    Sign in
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => router.push('/signup' as Route<'/signup'>)}
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[color:rgb(var(--brand-500))]/20"
            >
              {mobileMenuOpen ? (
                <CloseIcon className="w-6 h-6 text-gray-600" />
              ) : (
                <MenuIcon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg">
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Navigation Links */}
              <MobileNavLink href="/" >Home</MobileNavLink>
              <MobileNavLink href="/pricing">Pricing</MobileNavLink>
              <MobileNavLink href="/about">About</MobileNavLink>
              {profile && <MobileNavLink href="/admin">Dashboard</MobileNavLink>}
              
              {/* Mobile User Section */}
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <LoadingSpinner size="sm" />
                </div>
              ) : profile ? (
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex items-center space-x-3 px-3 py-2 mb-3">
                    <div className="relative">
                      <img
                        src={finalAvatarSrc}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 w-10 h-10 rounded-full bg-gradient-to-r from-[color:rgb(var(--brand-600))] to-[color:rgb(var(--brand-500))] flex items-center justify-center text-white font-semibold text-sm">
                        {initials}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {profile.name || profile.username}
                      </div>
                      <div className="text-xs text-gray-500">{profile.email}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <MobileMenuItem href="/settings">Settings</MobileMenuItem>
                    <MobileMenuItem href="/account">Account</MobileMenuItem>
                    {role === 1 && (
                      <MobileMenuItem href="/admin">Admin Panel</MobileMenuItem>
                    )}
                    <button
                      onClick={onSignout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                  <Button 
                    variant="outline-primary" 
                    size="md" 
                    className="w-full justify-center"
                    onClick={() => router.push('/login' as Route<'/login'>)}
                  >
                    Sign in
                  </Button>
                  <Button 
                    variant="primary" 
                    size="md" 
                    className="w-full justify-center"
                    onClick={() => router.push('/signup' as Route<'/signup'>)}
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// Supporting Components
const NavLink: React.FC<{ href: string; children: React.ReactNode; active?: boolean }> = ({ 
  href, 
  children, 
  active = false 
}) => (
  <Link
    href={href as Route<string>}
    className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      active
        ? 'text-[color:rgb(var(--brand-600))] bg-blue-50'
        : 'text-gray-700 hover:text-[color:rgb(var(--brand-600))] hover:bg-gray-50'
    }`}
  >
    {children}
    {active && (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-[color:rgb(var(--brand-600))] to-[color:rgb(var(--brand-500))] rounded-full" />
    )}
  </Link>
);

const MobileNavLink: React.FC<{ href: string; children: React.ReactNode; active?: boolean }> = ({ 
  href, 
  children, 
  active = false 
}) => (
  <Link
    href={href as Route<string>}
    className={`block px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
      active
        ? 'text-[color:rgb(var(--brand-600))] bg-blue-50'
        : 'text-gray-700 hover:text-[color:rgb(var(--brand-600))] hover:bg-gray-50'
    }`}
  >
    {children}
  </Link>
);

const MobileMenuItem: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <Link
    href={href as Route<string>}
    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
  >
    {children}
  </Link>
);

function MenuItem({
  href,
  children,
  onClick,
}: {
  href: Route<'/feed' | '/admin' | '/settings' | '/account' | '/dashboard'> | string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href as Route<string>}
      onClick={onClick}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
    >
      {children}
    </Link>
  );
}
