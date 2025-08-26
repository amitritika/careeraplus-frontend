'use client';
import { API_BASE } from '@/lib/api';

export default function SocialLoginButtons() {
  const start = (p: 'google' | 'facebook' | 'linkedin') =>
    window.location.assign(`${API_BASE}/api/auth/oauth/${p}/start`);

  return (
    <div className="space-y-2">
      <button type="button" onClick={() => start('google')}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 hover:bg-slate-700/60">
        Continue with Google
      </button>
      <button type="button" onClick={() => start('facebook')}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 hover:bg-slate-700/60">
        Continue with Facebook
      </button>
      <button type="button" onClick={() => start('linkedin')}
        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 hover:bg-slate-700/60">
        Continue with LinkedIn
      </button>
    </div>
  );
}
