export default function Card({
  title,
  actions,
  children,
  className = ''
}: {
  title?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-8 ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          {title}
        </h2>
      )}
      {children}
      {actions && <div className="mt-4">{actions}</div>}
    </div>
  );
}
