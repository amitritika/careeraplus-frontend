// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import Toaster from '@/components/ui/Toaster';
import Navbar from '@/components/organisms/Navbar';
import NavAuthLinks from '@/components/organisms/NavAuthLinks';

export const metadata: Metadata = {
  title: 'CareerPlus',
  description: 'Career social platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          <AuthProvider>
            <NavAuthLinks />
            {children}
            <Toaster />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
