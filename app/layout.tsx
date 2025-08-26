import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { Route } from 'next';
import { ToastProvider } from '@/components/providers/ToastProvider';
import Toaster from '@/components/ui/Toaster';
import NavAuthLinks from '@/components/organisms/Navbar';

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
          <NavAuthLinks />
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
