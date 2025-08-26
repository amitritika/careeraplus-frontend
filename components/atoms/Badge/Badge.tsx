export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[var(--radius-xl)] border border-[color:rgb(var(--brand-500))] text-[color:rgb(var(--brand-600))] px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}
