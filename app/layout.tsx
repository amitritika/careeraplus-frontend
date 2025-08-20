import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ToastProvider } from '@/components/providers/ToastProvider';
import Toaster from '@/components/ui/Toaster';
import NavAuthLinks from '@/components/NavAuthLinks';

export const metadata: Metadata = {
  title: 'CareerPlus',
  description: 'Career social platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <Toaster />
          <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
            <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
              <Link href="/" className="font-semibold text-brand-300">CareerPlus</Link>
              <div className="space-x-4 text-sm">
                <Link href="/login">Login</Link>
                <Link href="/signup">Signup</Link>
                <Link href="/feed">Feed</Link>
                <NavAuthLinks />
              </div>
            </div>
          </nav>
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
