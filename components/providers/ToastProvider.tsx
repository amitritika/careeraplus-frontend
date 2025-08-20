'use client';
import React from 'react';

export type Toast = {
  id?: string;
  title?: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number; // ms
};

type Ctx = {
  toasts: Toast[];
  show: (t: Toast) => void;
  dismiss: (id: string) => void;
};

const ToastContext = React.createContext<Ctx | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = React.useCallback((t: Toast) => {
    const id = t.id || Math.random().toString(36).slice(2);
    const toast = { ...t, id, duration: t.duration ?? 3500 };
    setToasts((prev) => [...prev, toast]);
    if (toast.duration! > 0) {
      setTimeout(() => dismiss(id), toast.duration);
    }
  }, [dismiss]);

  const value = React.useMemo(() => ({ toasts, show, dismiss }), [toasts, show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}
