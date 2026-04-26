import { Link } from "react-router-dom";

import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function GuidesPage() {
  const featured = [
    [
      "Is overpaying worth it?",
      "When student loan overpayments can help, when they may not, and how to think clearly about the trade-offs.",
      "/guides/student-loans/is-overpaying-worth-it"
    ],
    [
      "Should I overpay on £30k?",
      "A focused look at whether overpaying on a £30,000 salary makes sense for many UK borrowers.",
      "/guides/student-loans/student-loan-30k"
    ],
    [
      "Which student loan plan am I on?",
      "Understand Plan 1, Plan 2, Plan 4, Plan 5 and postgraduate loans in plain English.",
      "/guides/student-loans/which-student-loan-plan-am-i-on"
    ],
    [
      "Why same salary can repay differently",
      "See why two people earning the same amount can repay very different student loan totals.",
      "/guides/student-loans/why-two-people-on-the-same-salary-repay-different-amounts"
    ]
  ];

  const upcoming = [
    "Mortgage overpay vs invest",
    "Car repair vs replace",
    "Emergency fund sizing",
    "Retirement catch-up planning"
  ];

  return (
    <>
      <SiteHeader />

      <div className="min-h-screen bg-slate-50 text-slate-900">
        <title>Guides | Wayli</title>

        <meta
          name="description"
          content="Browse practical UK money guides from Wayli covering student loans, mortgages, car decisions, savings and more."
        />

        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-10 sm:py-14 space-y-10">

          {/* BREADCRUMBS */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              to="/"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Home
            </Link>

            <span className="text-slate-300">/</span>

            <span className="text-slate-500">
              Guides
            </span>
          </div>

          {/* HERO */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10">
            <div className="inline-flex px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
              Wayli guides
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl font-bold tracking-tight leading-tight max-w-4xl">
              Practical money guides for
              real UK decisions
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-8 max-w-3xl">
              Clear, plain-English guides to help you
              make smarter decisions with student loans,
              mortgages, savings, cars and more.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/student-loan-calculator">
                <button className="px-6 py-4 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition">
                  Use Student Loan Calculator UK
                </button>
              </Link>

              <a href="#student-loans">
                <button className="px-6 py-4 rounded-2xl border border-slate-300 bg-white font-semibold">
                  Browse guides
                </button>
              </a>
            </div>
          </section>

          {/* FEATURED */}
          <section
            id="student-loans"
            className="space-y-5"
          >
            <div>
              <h2 className="text-3xl font-bold">
                Student loan guides
              </h2>

              <p className="mt-2 text-slate-600">
                Our current focus area — helping UK borrowers make clearer repayment and overpayment decisions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {featured.map(([title, text, url]) => (
                <Link
                  key={title}
                  to={url}
                  className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 hover:border-emerald-300 transition block"
                >
                  <h3 className="text-xl font-bold">
                    {title}
                  </h3>

                  <p className="mt-3 text-slate-600 leading-7">
                    {text}
                  </p>

                  <div className="mt-5 text-emerald-600 font-semibold">
                    Read guide →
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 sm:p-10">
            <h2 className="text-3xl font-bold">
              Want a personalised answer?
            </h2>

            <p className="mt-4 text-slate-700 leading-8 max-w-2xl">
              Guides explain principles. The calculator helps apply them to your own salary, balance, age and overpayment plans.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/student-loan-calculator">
                <button className="px-6 py-4 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition">
                  Use Student Loan Calculator UK
                </button>
              </Link>

              <Link to="/contact">
                <button className="px-6 py-4 rounded-2xl border border-slate-300 bg-white font-semibold">
                  Contact Wayli
                </button>
              </Link>
            </div>
          </section>

          {/* COMING SOON */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10">
            <h2 className="text-3xl font-bold">
              More categories coming soon
            </h2>

            <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {upcoming.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 p-5 text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      <SiteFooter />
    </>
  );
}