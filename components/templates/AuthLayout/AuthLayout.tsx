export default function AuthLayout({ children, title='Sign in to Career A+' }:{
  children: React.ReactNode; title?: string;
}) {
  return (
    <div className="min-h-screen bg-[color:rgb(var(--surface-2))] text-slate-900">
      <main className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-8">
        <section className="hidden md:block">
          <h1 className="text-3xl font-semibold mb-4">{title}</h1>
          <p className="text-slate-600 mb-6">Build pages using documented components. Tokens drive visual consistency.</p>
        </section>
        <section>{children}</section>
      </main>
    </div>
  );
}
