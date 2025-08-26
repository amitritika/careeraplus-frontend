export default function Modal({
  open, title, onClose, children
}: { open: boolean; title?: string; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-40 grid place-items-center p-4">
      <div className="rounded-[var(--radius-2xl)] bg-white p-6 shadow-xl w-full max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
