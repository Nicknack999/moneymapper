export default function SiteHeader() {
  const link =
    "text-sm font-semibold text-slate-600 hover:text-emerald-600";

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between flex-wrap gap-4">
        <a
          href="/"
          className="text-xl font-bold text-slate-900"
        >
          Wayli
        </a>

        <nav className="flex gap-5 flex-wrap">
          <a href="/" className={link}>Home</a>
          <a href="/student-loan-calculator" className={link}>Tools</a>
          <a href="/guides" className={link}>Guides</a>
          <a href="/contact" className={link}>Contact</a>
        </nav>
      </div>
    </header>
  );
}