import { Link } from "react-router-dom";

import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";

export default function StudentLoan30kPage() {
  const pageTitle =
    "Should I overpay my student loan on £30k? | Wayli";

  const pageDescription =
    "Should you overpay your UK student loan on a £30,000 salary? Learn when it may help, when it may not, and compare overpaying vs saving with Wayli.";

  const relatedGuides = [
    [
      "Is overpaying worth it?",
      "/guides/student-loans/is-overpaying-worth-it"
    ],
    [
      "Which student loan plan am I on?",
      "/guides/student-loans/which-student-loan-plan-am-i-on"
    ],
    [
      "Why same salary repayments differ",
      "/guides/student-loans/why-two-people-on-the-same-salary-repay-different-amounts"
    ]
  ];

  return (
    <>
      <SiteHeader />

      <div className="min-h-screen bg-slate-50 text-slate-900">
        <title>{pageTitle}</title>

        <meta
          name="description"
          content={pageDescription}
        />

        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-10 sm:py-16 space-y-10">

          {/* BREADCRUMBS */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              to="/"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Home
            </Link>

            <span className="text-slate-300">/</span>

            <Link
              to="/guides"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Guides
            </Link>

            <span className="text-slate-300">/</span>

            <span className="text-slate-500">
              Should I overpay on £30k?
            </span>
          </div>

          {/* HERO */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10">
            <div className="inline-flex px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
              Wayli guide
            </div>

            <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tight leading-tight max-w-4xl">
              Should I overpay my student loan on £30k?
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-8 max-w-3xl">
              If you earn £30,000 in the UK, overpaying your
              student loan may help in some cases — but it is
              far from automatic.
            </p>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-8 max-w-3xl">
              For many borrowers, future salary growth,
              flexibility and other priorities matter more
              than modest extra payments today.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/student-loan-calculator"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition text-center"
              >
                Use Student Loan Calculator UK
              </Link>

              <a
                href="#decision"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-slate-300 bg-white font-semibold hover:bg-slate-50 transition text-center"
              >
                Read quick answer
              </a>
            </div>
          </section>

          {/* QUICK ANSWER */}
          <section
            id="decision"
            className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              The short-ish answer
            </h2>

            <div className="mt-6 space-y-5 text-slate-600 leading-8">
              <p>
                On £30k, many borrowers are making
                automatic repayments already.
              </p>

              <p>
                But depending on your loan plan, balance and
                future earnings, extra payments may or may
                not significantly improve the final outcome.
              </p>

              <p>
                In plain English: £30k can be a useful review
                point, not an automatic “yes, overpay now”
                signal.
              </p>
            </div>
          </section>

          {/* KEY CARDS */}
          <section className="grid md:grid-cols-3 gap-4">
            {[
              [
                "Income is only one factor",
                "The same salary can produce different outcomes depending on plan, balance and career path."
              ],
              [
                "Flexibility has value",
                "Cash savings can solve problems overpayments cannot."
              ],
              [
                "Future earnings matter",
                "Higher earnings later can change the repayment picture."
              ]
            ].map(([title, text]) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
              >
                <h3 className="font-semibold text-lg">
                  {title}
                </h3>

                <p className="mt-3 text-slate-600 leading-7">
                  {text}
                </p>
              </div>
            ))}
          </section>

          {/* WHY 30K */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Why £30k is a common decision point
            </h2>

            <div className="mt-6 space-y-5 text-slate-600 leading-8">
              <p>
                At this salary, many borrowers notice their
                repayments and start asking whether paying
                extra is worth it.
              </p>

              <p>
                Fair question. But future income growth can
                sometimes matter more than repaying £50–£100
                extra today.
              </p>

              <p>
                If your salary rises over time, standard
                repayments may rise too — which can change
                whether overpaying looks strong or weak.
              </p>
            </div>
          </section>

          {/* OPTIONS */}
          <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold">
              What £100 per month could do
            </h2>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {[
                [
                  "Overpay loan",
                  "May help more if full repayment already looks realistic."
                ],
                [
                  "Build savings",
                  "Creates resilience for emergencies or career changes."
                ],
                [
                  "Invest long term",
                  "Could build more wealth depending on returns and timeframe."
                ]
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl border border-emerald-100 p-5"
                >
                  <h3 className="font-semibold">
                    {title}
                  </h3>

                  <p className="mt-3 text-slate-600 leading-7">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* QUESTIONS */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Questions worth asking first
            </h2>

            <div className="mt-6 space-y-4">
              {[
                "Am I likely to repay the balance in full anyway?",
                "Do I need easier access to this money?",
                "Could this money help elsewhere first?",
                "Is my salary likely to grow?"
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 px-5 py-4 bg-slate-50"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* RELATED GUIDES */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Related student loan guides
            </h2>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {relatedGuides.map(([title, href]) => (
                <Link
                  key={title}
                  to={href}
                  className="rounded-2xl border border-slate-200 p-5 bg-slate-50 hover:bg-white transition block"
                >
                  <div className="font-semibold">
                    {title}
                  </div>

                  <div className="mt-2 text-sm text-emerald-600 font-medium">
                    Read guide →
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Want a clearer answer for your numbers?
            </h2>

            <p className="mt-5 text-slate-700 leading-8 max-w-2xl mx-auto">
              Salary alone does not decide this. Use your own
              plan, balance and overpayment amount.
            </p>

            <Link
              to="/student-loan-calculator"
              className="inline-block mt-7 px-7 py-4 rounded-2xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
            >
              Use Student Loan Calculator UK
            </Link>
          </section>

        </div>
      </div>

      <SiteFooter />
    </>
  );
}