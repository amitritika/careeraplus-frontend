import Navbar from '@/components/organisms/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[color:rgb(var(--surface-2))] text-slate-900">
      <main className="mx-auto max-w-6xl px-4 py-8 grid gap-6">{children}</main>
    </div>
  );
}