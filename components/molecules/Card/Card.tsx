export default function Card({
  title, actions, children,
}: { title?: string; actions?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-2xl)] border border-slate-200 shadow-md p-5 bg-white/90">
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}
