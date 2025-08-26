'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { apiFetch, API_BASE } from '@/lib/api';
import { useToast } from '@/components/providers/ToastProvider';

type Profile = {
  username: string;
  name: string;
  email: string;
  about?: string;
};

export default function AccountPage() {
  const router = useRouter();

  // form state
  const [profile, setProfile] = React.useState<Profile | null>(null);
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [about, setAbout] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const { show } = useToast();

  // photo state
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const [photoStamp, setPhotoStamp] = React.useState<number>(() => Date.now());

  // forgot-password UI
  const [fpBusy, setFpBusy] = React.useState(false);

   React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        // Accept both response shapes: { user: {...} } OR just {...}
        const res = await apiFetch<any>('/api/user/profile', { method: 'GET' });
        const u: Profile = (res?.user ?? res) as Profile;

        if (!alive) return;
        setProfile(u);
        setName(u?.name ?? '');
        setUsername(u?.username ?? '');
        setAbout(u?.about ?? '');
      } catch (e: any) {
        if (!alive) return;
        show({ type: 'error', title: 'Failed to load profile', description: e.message });
        console.error(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [show]);

  function onPickPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setPhotoFile(f);
    const url = URL.createObjectURL(f);
    setPhotoPreview(url);
  }

  function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => resolve(reader.result as string); // e.g. "data:image/png;base64,...."
    reader.readAsDataURL(file);
  });
}

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;

    try {
      setLoading(true);
      const fd = new FormData();
      // The /api/user/update endpoint accepts normal fields + optional `photosrc`
      // (multipart/form-data) — keeps it to one call.  :contentReference[oaicite:5]{index=5}
      fd.set('name', name);
      fd.set('username', username);
      fd.set('about', about);
      if (photoFile) {
        fd.set('photosrc', photoFile);
        const dataUri = await fileToDataURL(photoFile);
        console.log('Updating profile with', dataUri);

      }
      
      
      const updated = await apiFetch<Profile>('/api/user/update', {
        method: 'PUT',
        body: fd, // don't set Content-Type; the browser sets boundary
      });

      setProfile(updated);
      // clear preview if saved
      setPhotoFile(null);
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);

// bump the version to force a fresh fetch
      setPhotoStamp(Date.now());

      show({ type: 'success', title: 'Profile updated' });
    } catch (e: any) {
      show({ type: 'error', title: 'Update failed', description: e.message });
    } finally {
      setLoading(false);
    }
  }

  async function onSendResetLink() {
    if (!profile?.email) return;
    try {
      setFpBusy(true);
      const res = await apiFetch<{ message: string; token?: string }>(
        '/api/auth/forgot-password',
        { method: 'PUT', json: { email: profile.email } }
      ); // sends email in prod, returns token in dev  :contentReference[oaicite:6]{index=6}

      show({ type: 'success', title: res.message || 'If the email exists, a reset link has been sent.' });
      // Dev convenience: if token present, point to /reset/:token
      if (res.token && process.env.NODE_ENV !== 'production') {
        
        
        show({ type: 'info', title: 'Dev reset link', description: `${window.location.origin}/reset/${res.token}` });
      }
    } catch (e: any) {
      show({ type: 'error', title: 'Could not send reset link', description: e.message });
    } finally {
      setFpBusy(false);
    }
  }

  const photoSrc =
  photoPreview ||
  (profile?.username
    ? `${API_BASE}/api/user/profile-photo/${profile.username}?v=${photoStamp}`
    : undefined); // binary photo route  :contentReference[oaicite:7]{index=7}

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-semibold">Account</h1>
      <p className="mb-8 text-sm text-gray-600">
        Update your basic details and profile picture.
      </p>

      {loading ? (
        <div className="h-32 animate-pulse rounded-md bg-gray-100" />
      ) : (
        <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-[220px,1fr]">
          {/* Photo */}
          <div className="space-y-3">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border">
              {photoSrc ? (
                // next/image can show blobs and remote images (unoptimized if cross-origin)
                <Image key={photoStamp} src={photoSrc} alt="Profile photo" fill className="object-cover" unoptimized />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                  No photo
                </div>
              )}
            </div>

            <label className="block">
              <span className="mb-1 block text-sm font-medium">Profile photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={onPickPhoto}
                className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-gray-900 file:px-3 file:py-2 file:text-white hover:file:bg-black"
              />
            </label>

            {photoPreview && (
              <button
                type="button"
                onClick={() => {
                  setPhotoFile(null);
                  setPhotoPreview(null);
                }}
                className="text-sm text-gray-600 underline"
              >
                Remove selected photo
              </button>
            )}
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                disabled
                value={profile?.email ?? ''}
                className="w-full rounded-md border px-3 py-2 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">About</label>
              <textarea
                rows={4}
                value={about}
                onChange={(e) => setAbout(e.currentTarget.value)}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Saving…' : 'Update profile'}
              </button>

              <button
                type="button"
                disabled={fpBusy}
                onClick={onSendResetLink}
                className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
              >
                {fpBusy ? 'Sending…' : 'Send password reset link'}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-md px-4 py-2 text-sm underline"
              >
                Go back
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
