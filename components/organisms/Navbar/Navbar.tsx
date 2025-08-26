'use client';

import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { apiFetch, API_BASE } from '@/lib/api';
import { useToast } from '@/components/providers/ToastProvider';

type Profile = {
  username: string;
  name: string;
  email: string;
  role?: number;
  photoUrl?: string; // server photo endpoint (e.g. /api/user/photo)
};

export default function Navbar() {
  const router = useRouter();
  const { show } = useToast();

  const [profile, setProfile] = React.useState<Profile | null>(null);
  const role = profile?.role ?? null;

  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [avatarSrc, setAvatarSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
  (async () => {
    try {
      const res = await apiFetch<any>('/api/user/profile', { method: 'GET' });
      const u: Profile = (res?.user ?? res) as Profile;
      setProfile(u);

      // NEW: fetch public profile to get base64 photo -> set data URL
      if (u?.username) {
        try {
          const pub = await apiFetch<any>(`/api/user/public-profile/${u.username}`, { method: 'GET' });
          const contentType = pub?.profile_photo?.contentType as string | undefined;
          const base64 = pub?.profile_photo?.data as string | undefined;

          if (contentType && base64) {
            setAvatarSrc(`data:${contentType};base64,${base64}`);
          } else {
            setAvatarSrc(null); // will fall back to initials/logo below
          }
        } catch {
          setAvatarSrc(null);
        }
      } else {
        setAvatarSrc(null);
      }
    } catch {
      setProfile(null);
      setAvatarSrc(null);
    }
  })();
}, []);

  React.useEffect(() => {
    // close on outside click / escape
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  async function onSignout(e?: React.MouseEvent<HTMLButtonElement>) {
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

  const initials =
    (profile?.name || profile?.username || 'U')
      .split(' ')
      .map(s => s[0]?.toUpperCase())
      .slice(0, 2)
      .join('') || 'U';

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 backdrop-blur bg-white/70">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <img
              src="/Logo.png"
              alt="Career A+ logo"
              className="h-9 w-9 rounded-full ring-1 ring-white/25 bg-white/10"
            />
            <span className="text-base font-semibold text-slate-900">Career A+</span>
          </Link>
        </div>

        {/* Center: primary nav (optional) */}
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <Link className="hover:underline" href="/feed">Feed</Link>
          <Link className="hover:underline" href={'/user/update/account-update' as Route}>Account Update</Link>
          <Link className="hover:underline" href={'/admin' as Route}>Admin</Link>
        </nav>

        {/* Right: auth / profile */}
        <div className="flex items-center gap-3">
          {/* Logged OUT */}
          {role === null && (
            <>
              <Link
                href="/login"
                className="inline-flex h-8 items-center rounded-md border px-3 text-sm hover:bg-slate-50"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-8 items-center rounded-md bg-slate-900 px-3 text-sm text-white hover:bg-slate-800"
              >
                Sign up
              </Link>
            </>
          )}

          {/* Logged IN */}
          {role !== null && (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(v => !v)}
                className="flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-slate-200 bg-white overflow-hidden"
              >
                {/* Show photo if present; else initials */}
                {avatarSrc ? (
                  <img
                    src={finalAvatarSrc}
                    alt="Profile"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none'; // show initials layer
                    }}
                  />
                ) : null}
                {/* Initials fallback layer (shown if img hidden) */}
                <span className="absolute inset-0 grid place-items-center text-xs font-semibold text-slate-700">
                  {initials}
                </span>
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div
                  role="menu"
                  aria-label="User menu"
                  className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
                >
                  <div className="px-3 py-2 text-xs text-slate-500">
                    Signed in as
                    <div className="truncate font-medium text-slate-900">
                      {profile?.name || profile?.username || profile?.email}
                    </div>
                  </div>
                  <div className="h-px bg-slate-200" />

                  <MenuItem href="/feed" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </MenuItem>

                  {role === 1 && (
                    <MenuItem href="/admin" onClick={() => setMenuOpen(false)}>
                      Admin Dashboard
                    </MenuItem>
                  )}

                  <MenuItem href="/settings" onClick={() => setMenuOpen(false)}>
                    Settings
                  </MenuItem>

                  <MenuItem href="/user/update/account-update" onClick={() => setMenuOpen(false)}>
                    Account Update
                  </MenuItem>

                  <div className="h-px bg-slate-200" />

                  <button
                    role="menuitem"
                    onClick={(e) => {
                      setMenuOpen(false);
                      onSignout(e);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/** Tiny helper to keep dropdown items consistent */
function MenuItem({
  href,
  children,
  onClick,
}: {
  href: Route<
    '/feed' |
    '/admin' |
    '/settings' |
    '/account'
  > | string; // keep wide if some routes are not typed yet
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      role="menuitem"
      href={href as any}
      onClick={onClick}
      className="block px-4 py-2.5 text-sm hover:bg-slate-50"
    >
      {children}
    </Link>
  );
}
