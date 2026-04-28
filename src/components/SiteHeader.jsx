import { Link } from "react-router-dom";

export default function SiteHeader() {
  const link =
    "text-sm font-semibold text-slate-600 hover:text-emerald-600 transition";

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between flex-wrap gap-4">
        
        <Link
          to="/"
          className="text-xl font-bold text-slate-900"
        >
          Wayli
        </Link>

        <nav className="flex gap-5 flex-wrap items-center">
          <Link to="/" className={link}>Home</Link>
          <Link to="/student-loan-calculator" className={link}>Tools</Link>
          <Link to="/guides" className={link}>Guides</Link>
          <Link to="/about" className={link}>About</Link>
          <Link to="/contact" className={link}>Contact</Link>
        </nav>

      </div>
    </header>
  );
}