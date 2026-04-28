import { Link } from "react-router-dom";

import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";

export default function WhyTwoPeopleSameSalaryRepayDifferentAmountsPage() {
  const pageTitle =
    "Why two people on the same salary can repay different student loan amounts | Wayli";

  const pageDescription =
    "See why two people earning the same salary can repay different UK student loan amounts depending on Plan 1, Plan 2, Plan 4, Plan 5 or postgraduate loans. Compare thresholds, write-off dates and whether overpaying is worth it.";

  const related = [
    [
      "Which student loan plan am I on?",
      "/guides/student-loans/which-student-loan-plan-am-i-on"
    ],
    [
      "Is overpaying worth it?",
      "/guides/student-loans/is-overpaying-worth-it"
    ],
    [
      "Should I overpay on £30k?",
      "/guides/student-loans/student-loan-30k"
    ]
  ];

  return (
    <>
      <SiteHeader />

      <div className="min-h-screen bg-slate-50 text-slate-900">
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

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
              Same salary, different repayments
            </span>
          </div>

          {/* HERO */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10">
            <div className="inline-flex px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
              Wayli guide
            </div>

            <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-slate-900 max-w-4xl">
              Why two people on the same salary{" "}
              <span className="block text-emerald-600">
                can repay different amounts
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-8 max-w-3xl">
              Two graduates can earn the same salary and still make different
              student loan repayments. Your loan plan, repayment threshold,
              interest rules and write-off timing often matter more than salary alone.
            </p>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-8 max-w-3xl">
              If you are deciding whether to overpay, save or invest instead,
              this is one of the most useful things to understand first.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/student-loan-calculator"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-600 transition text-center"
              >
                Try the Wayli calculator
              </Link>

              <a
                href="#example"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-slate-300 bg-white font-semibold hover:bg-slate-50 transition text-center"
              >
                See example
              </a>
            </div>
          </section>

          {/* QUICK CARDS */}
          <section className="grid md:grid-cols-3 gap-4">
            {[
              [
                "Thresholds matter",
                "Repayments usually only begin above your plan threshold."
              ],
              [
                "Time matters",
                "Some plans run longer before any remaining balance is written off."
              ],
              [
                "Future income matters",
                "Pay rises can change whether full repayment becomes likely."
              ]
            ].map(([title, text]) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
              >
                <h2 className="font-semibold text-lg text-slate-900">
                  {title}
                </h2>

                <p className="mt-3 text-slate-600 leading-7">
                  {text}
                </p>
              </div>
            ))}
          </section>

          {/* WHY IT HAPPENS */}
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Why does this happen?
            </h2>

            <p className="mt-5 text-slate-600 leading-8 max-w-3xl">
              UK student loans were introduced at different times with different
              rules. That means borrowers can sit on different plans even when
              earning the same amount today.
            </p>

            <p className="mt-4 text-slate-600 leading-8 max-w-3xl">
              Two people on £40k, £45k or £60k can therefore see different monthly
              deductions simply because thresholds, interest rules or write-off
              dates are not identical.
            </p>
          </section>

          {/* EXAMPLE */}
          <section
            id="example"
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Example: two borrowers earning £45k
            </h2>

            <p className="mt-5 text-slate-600 leading-8 max-w-3xl">
              Imagine two people both earn £45,000 and both owe student loans.
              One is on Plan 1 and the other is on Plan 2.
            </p>

            <p className="mt-4 text-slate-600 leading-8 max-w-3xl">
              Their deductions can differ because each plan uses different
              thresholds. One borrower may repay more each year, reduce the
              balance faster, or become a stronger candidate for overpaying.
            </p>

            <div className="hidden sm:block mt-8 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-4 pr-4">Plan</th>
                    <th className="py-4 pr-4">Threshold</th>
                    <th className="py-4 pr-4">Approx yearly repayment</th>
                    <th className="py-4">Write-off</th>
                  </tr>
                </thead>

                <tbody className="text-slate-700">
                  <tr className="border-b border-slate-100">
                    <td className="py-4">Plan 1</td>
                    <td>£26,900</td>
                    <td>Higher</td>
                    <td>25 years / legacy</td>
                  </tr>

                  <tr className="border-b border-slate-100">
                    <td className="py-4">Plan 2</td>
                    <td>£29,385</td>
                    <td>Lower</td>
                    <td>30 years</td>
                  </tr>

                  <tr>
                    <td className="py-4">Plan 5</td>
                    <td>£25,000</td>
                    <td>Higher</td>
                    <td>40 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* OVERPAYING */}
          <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              What this means for overpaying
            </h2>

            <p className="mt-5 text-slate-700 leading-8 max-w-3xl">
              Overpaying can be more useful if you are already likely to clear the
              balance anyway. In those cases, extra payments may reduce interest
              or help you finish sooner.
            </p>

            <p className="mt-4 text-slate-700 leading-8 max-w-3xl">
              For others, keeping flexibility, building savings or investing may
              be stronger. The right answer often depends on your plan, balance
              and future earnings path.
            </p>
          </section>

          {/* FAQ */}
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Frequently asked questions
            </h2>

            <div className="mt-8 space-y-7">
              <div>
                <h3 className="font-semibold text-lg">
                  Does the same salary always mean the same repayment?
                </h3>

                <p className="mt-2 text-slate-600 leading-7">
                  No. Your student loan plan, threshold and write-off rules can
                  all change what you repay.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Should I overpay on £45k?
                </h3>

                <p className="mt-2 text-slate-600 leading-7">
                  Possibly. It depends on whether full repayment already looks
                  realistic and whether spare cash could work harder elsewhere.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  How do I check my own situation?
                </h3>

                <p className="mt-2 text-slate-600 leading-7">
                  Use a calculator that compares your plan, salary, balance and
                  overpayment options.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/student-loan-calculator"
                className="inline-block px-6 py-4 rounded-2xl bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-600 transition"
              >
                Use calculator
              </Link>
            </div>
          </section>

          {/* RELATED GUIDES */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Related guides
            </h2>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {related.map(([title, url]) => (
                <Link
                  key={title}
                  to={url}
                  className="rounded-2xl border border-slate-200 p-5 hover:border-emerald-300 transition block"
                >
                  <div className="font-semibold">
                    {title}
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>

      <SiteFooter />
    </>
  );
}