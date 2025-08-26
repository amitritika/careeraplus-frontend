'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OAuthSuccess() {
  const router = useRouter();
  useEffect(() => { router.replace('/feed'); }, [router]);
  return <p className="mt-10 text-center">Signing you in…</p>;
}
