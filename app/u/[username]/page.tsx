'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { API_BASE } from '@/lib/api';

export default function PublicProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [data, setData] = React.useState<any | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(()=>{
    (async ()=>{
      try {
        const res = await fetch(`${API_BASE}/api/user/public-profile/${username}`);
        if (!res.ok) throw new Error((await res.json())?.error || res.statusText);
        const json = await res.json();
        setData(json);
      } catch (e:any) {
        setError(e.message || 'Failed to load');
      }
    })();
  }, [username]);

  if (error) return <div className="rounded-md bg-red-900/40 px-3 py-2 text-sm text-red-200">{error}</div>;
  if (!data) return <p>Loading…</p>;

  return (
    <div className="grid gap-6 md:grid-cols-[200px,1fr]">
      <div>
        <img alt="profile" className="h-40 w-40 rounded-xl border border-slate-800 object-cover"
          src={`${API_BASE}/api/user/profile-photo/${username}`} onError={(e)=>{(e.currentTarget as any).style.display='none'}} />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{data.name} <span className="text-slate-500">@{data.username}</span></h1>
        {data.about && <p className="text-slate-300">{data.about}</p>}
        <div className="text-sm text-slate-400">Email: {data.email}</div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="text-xs text-slate-400">Resume JSON</div>
          <pre className="mt-2 whitespace-pre-wrap text-xs">{JSON.stringify(data.profile_resume || {}, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
