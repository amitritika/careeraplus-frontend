import * as React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export default function FormField({
  label,
  htmlFor,
  hint,
  error,
  children
}: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label 
        htmlFor={htmlFor} 
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="mt-1">
        {children}
      </div>
      {hint && !error && (
        <p className="mt-1 text-sm text-slate-500">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
