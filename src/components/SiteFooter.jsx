import { Link } from "react-router-dom";

export default function SiteFooter() {
  const link =
    "hover:text-emerald-600 transition";

  return (
    <footer className="border-t border-slate-200 mt-16 bg-white">
      <div className="max-w-6xl mx-auto px-5 py-8 text-sm text-slate-500 flex flex-wrap items-center gap-5">

        <Link to="/" className={link}>
          Home
        </Link>

        <Link to="/student-loan-calculator" className={link}>
          Calculator
        </Link>

        <Link to="/guides" className={link}>
          Guides
        </Link>

        <Link to="/about" className={link}>
          About Wayli
        </Link>

        <Link to="/contact" className={link}>
          Contact
        </Link>

        <span className="ml-auto text-slate-400">
          © Wayli
        </span>
      </div>
    </footer>
  );
}