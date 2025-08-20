import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="grid gap-8 sm:grid-cols-2 items-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold leading-tight">Grow your career with <span className="text-brand-300">CareerPlus</span></h1>
        <p className="text-slate-300">Login to access your personalized feed, groups, and planner.</p>
        <div className="space-x-3">
          <Link href="/login" className="inline-block rounded-xl bg-brand-600 px-5 py-2.5 text-white shadow hover:bg-brand-500">Login</Link>
          <a href="https://docs.careeraplus.local" className="inline-block rounded-xl border border-slate-700 px-5 py-2.5 hover:bg-slate-800">Docs</a>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
        <div className="h-48 rounded-xl bg-gradient-to-br from-brand-700 to-brand-400 opacity-70" />
        <p className="mt-3 text-xs text-slate-400">Beautiful, minimal UI powered by Tailwind.</p>
      </div>
    </section>
  );
}
