export default function SiteFooter() {
  const link =
    "hover:text-emerald-600";

  return (
    <footer className="border-t border-slate-200 mt-16">
      <div className="max-w-6xl mx-auto px-5 py-8 text-sm text-slate-500 flex flex-wrap gap-5">
        <a href="/" className={link}>Home</a>
        <a href="/student-loan-calculator" className={link}>Tools</a>
        <a href="/guides" className={link}>Guides</a>
        <a href="/contact" className={link}>Contact</a>

        <span className="ml-auto">
          © Wayli
        </span>
      </div>
    </footer>
  );
}