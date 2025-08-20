'use client';
import React from 'react';
import { apiFetch, API_BASE } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/providers/ToastProvider';

export default function AccountPage() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');
  const [message, setMessage] = React.useState<string | null>(null);
  const { show } = useToast();
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(()=>{
    (async ()=>{
      try {
        const u = await apiFetch('/api/user/profile');
        setUser(u);
        setName(u.name || '');
        setAbout(u.about || '');
        setLoading(false);
      } catch (e:any) {
        setError(e.message || 'Unauthorized');
        setLoading(false);
      }
    })();
  }, []);

  async function onSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null); setError(null);
    const fd = new FormData();
    fd.set('name', name);
    fd.set('about', about);
    try {
      const res = await fetch(`${API_BASE}/api/user/update`, {
        method: 'PUT', body: fd, credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || res.statusText);
      setMessage('Profile updated');
      show({ type: 'success', title: 'Profile updated' });
      setUser(data);
    } catch (e:any) {
      setError(e.message || 'Update failed');
      show({ type: 'error', title: 'Update failed', description: e.message });
    }
  }

  async function onUploadPhoto(e: React.ChangeEvent<HTMLInputElement>, endpoint: string) {
    if (!e.target.files || e.target.files.length === 0) return;
    setMessage(null); setError(null);
    const fd = new FormData();
    fd.set('photosrc', e.target.files[0]);
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, { method: 'PUT', body: fd, credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || res.statusText);
      setMessage('Photo updated');
      show({ type: 'success', title: 'Photo updated' });
      setUser(data);
    } catch (err:any) {
      setError(err.message || 'Upload failed');
      show({ type: 'error', title: 'Upload failed', description: err.message });
    } finally {
      e.target.value = '';
    }
  }

  const username = user?.username;

  if (loading) return <p>Loading…</p>;
  if (error) return <div className="rounded-md bg-red-900/40 px-3 py-2 text-sm text-red-200">{error}</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Account</h1>
      {message && <div className="rounded-md bg-emerald-900/30 px-3 py-2 text-sm text-emerald-200">{message}</div>}

      <section className="grid gap-6 md:grid-cols-2">
        <form onSubmit={onSaveProfile} className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="font-semibold">Profile</h2>
          <div className="space-y-1.5">
            <label className="text-sm text-slate-300">Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm text-slate-300">About</label>
            <textarea value={about} onChange={e=>setAbout(e.target.value)} className="min-h-[120px] w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2" />
          </div>
          <Button type="submit">Save</Button>
        </form>

        <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="font-semibold">Photos</h2>
          {username && (
            <div className="flex gap-6">
              <div>
                <div className="text-xs text-slate-400 mb-2">Profile photo</div>
                <img alt="profile" className="h-24 w-24 rounded-xl border border-slate-800 object-cover"
                  src={`${API_BASE}/api/user/profile-photo/${username}`} onError={(e)=>{(e.currentTarget as any).style.display='none'}} />
                <input type="file" accept="image/*" onChange={(e)=>onUploadPhoto(e, '/api/user/update-profile-photo')} className="mt-2 text-sm"/>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-2">Resume photo</div>
                <img alt="resume" className="h-24 w-24 rounded-xl border border-slate-800 object-cover"
                  src={`${API_BASE}/api/user/resume-photo/${username}`} onError={(e)=>{(e.currentTarget as any).style.display='none'}} />
                <input type="file" accept="image/*" onChange={(e)=>onUploadPhoto(e, '/api/user/update-resume-photo')} className="mt-2 text-sm"/>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="mb-2 font-semibold">Profile Resume JSON</h2>
        <ResumeEditor username={username} />
      </section>
    </div>
  );
}

function ResumeEditor({ username }: { username?: string }) {
  const [json, setJson] = React.useState<any>({ list: [], bg: '#ffffff', font: 'Inter' });
  const [status, setStatus] = React.useState<string>('');
  React.useEffect(()=>{
    if (!username) return;
    (async ()=>{
      try {
        const data = await fetch(`${API_BASE}/api/user/profile-resume/${username}`).then(r => r.ok ? r.json() : { list: [], bg: '#ffffff', font: 'Inter' });
        setJson(data);
      } catch {}
    })();
  }, [username]);

  async function onSave() {
    setStatus('Saving...');
    try {
      const res = await fetch(`${API_BASE}/api/user/update-profile-resume`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json),
      });
      if (!res.ok) throw new Error((await res.json())?.error || res.statusText);
      setStatus('Saved');
    } catch (e:any) {
      setStatus('Error: ' + e.message);
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm text-slate-300">JSON</label>
        <textarea value={JSON.stringify(json, null, 2)} onChange={(e)=>{
          try { setJson(JSON.parse(e.target.value)); } catch {}
        }} className="min-h-[240px] w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 font-mono text-xs" />
        <button onClick={onSave} className="inline-block rounded-xl bg-brand-600 px-4 py-2 text-white">Save</button>
        <div className="text-xs text-slate-400">{status}</div>
      </div>
      <div className="rounded-xl border border-slate-800 bg-white p-4 text-slate-900">
        <div className="text-xs text-slate-500">Preview</div>
        <div style={{ background: json.bg || '#fff' }} className="mt-2 rounded-lg p-4">
          <div style={{ fontFamily: json.font || 'Inter' }}>
            <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(json.list, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
