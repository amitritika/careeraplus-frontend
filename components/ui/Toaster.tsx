'use client';
import React from 'react';
import { useToast } from '../providers/ToastProvider';
import { clsx } from 'clsx';

export default function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-end gap-2 p-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={clsx(
            'pointer-events-auto w-full max-w-sm rounded-xl border px-4 py-3 shadow-lg backdrop-blur',
            t.type === 'success' && 'border-emerald-800 bg-emerald-900/40 text-emerald-100',
            t.type === 'error' && 'border-red-800 bg-red-900/40 text-red-100',
            (!t.type || t.type === 'info') && 'border-slate-800 bg-slate-900/60 text-slate-100'
          )}
          role="status"
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              {t.title && <div className="font-semibold">{t.title}</div>}
              {t.description && <div className="text-sm opacity-90">{t.description}</div>}
            </div>
            <button
              aria-label="Close"
              onClick={() => dismiss(t.id!)}
              className="rounded-md p-1 text-sm opacity-70 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
