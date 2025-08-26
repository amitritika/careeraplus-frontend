export default function FormField({
  label, htmlFor, hint, error, children
}: {
  label: string; htmlFor: string; hint?: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={htmlFor} className="text-sm text-slate-600">{label}</label>
      {children}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
