import { Link } from "react-router-dom";

import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";

export default function IsOverpayingWorthItPage() {
  const pageTitle =
    "Is overpaying your student loan worth it in the UK? | Wayli";

  const pageDescription =
    "Wondering if overpaying your student loan is worth it? Learn when it may help, when it may not, and compare your own numbers with Wayli.";

  const faqs = [
    {
      q: "Is overpaying a student loan always a good idea?",
      a: "No. For some borrowers it can reduce total repayments or clear the balance sooner. For others, it may make little difference if part of the balance is likely to be written off."
    },
    {
      q: "Should I overpay my student loan or save cash?",
      a: "That depends on your emergency fund, job security and how much flexibility matters to you. Cash savings can solve problems overpayments cannot."
    },
    {
      q: "Does salary matter most?",
      a: "Future earnings often matter more than current salary alone. Pay rises can materially change likely outcomes over time."
    },
    {
      q: "Should I use a calculator first?",
      a: "Usually yes. The same monthly overpayment can look strong in one scenario and weak in another."
    }
  ];

  const cards = [
    [
      "It may be stronger if...",
      [
        "You are likely to clear the balance anyway",
        "Your earnings may rise over time",
        "You already have a solid emergency fund",
        "You value being debt-free sooner"
      ]
    ],
    [
      "It may be weaker if...",
      [
        "Part of the balance may be written off later",
        "You have expensive debt elsewhere",
        "Your savings buffer is thin",
        "You need flexibility right now"
      ]
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

        <div className="max-w-5xl mx-auto px-6 py-8 md:py-12 space-y-8 md:space-y-10">

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
              Is overpaying worth it?
            </span>
          </div>

          {/* HERO */}
          <header className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10">
            <div className="inline-flex px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
              Wayli guide
            </div>

            <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Is overpaying your student loan worth it in the UK?
            </h1>

            <p className="mt-5 text-lg md:text-xl leading-8 text-slate-600 max-w-3xl">
              Sometimes yes, sometimes no. For some borrowers,
              overpaying can help. For others, it can be a weak
              use of cash. It usually depends on your plan,
              future earnings, savings position and priorities.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/student-loan-calculator"
                className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
              >
                Use calculator
              </Link>

              <a
                href="#quick-answer"
                className="px-6 py-4 rounded-2xl border border-slate-300 bg-white font-semibold"
              >
                Quick answer
              </a>
            </div>
          </header>

          {/* QUICK ANSWER */}
          <section
            id="quick-answer"
            className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              The short-ish version
            </h2>

            <div className="mt-5 space-y-5 text-slate-600 leading-8">
              <p>
                If you are likely to repay your loan in full anyway,
                overpayments may reduce interest or help you finish sooner.
              </p>

              <p>
                If some of the balance may never be repaid before write-off,
                overpaying can be less rewarding than many assume.
              </p>

              <p>
                In practice, this is rarely a blanket yes-or-no decision.
                It is usually a question of what is most useful for your money.
              </p>

              <p>
                UK student loans often behave differently from traditional debt.
                Repayments depend on earnings above a threshold, and any
                remaining balance may be written off later.
              </p>
            </div>
          </section>

          {/* TWO CARDS */}
          <section className="grid md:grid-cols-2 gap-5">
            {cards.map(([title, items]) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-8"
              >
                <h2 className="text-2xl font-bold">
                  {title}
                </h2>

                <ul className="mt-5 space-y-3 text-slate-600 leading-8">
                  {items.map((item) => (
                    <li key={item}>
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* MAIN CONTENT */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              What many people miss
            </h2>

            <p className="text-slate-600 leading-8">
              Many people focus only on today’s salary.
              Understandable — it is the easiest number to see.
              But future earnings can matter more than a modest
              overpayment made this month.
            </p>

            <p className="text-slate-600 leading-8">
              If your income rises over time, normal repayments
              may rise too. That can materially change whether
              overpaying now looks strong, average or unnecessary.
            </p>

            <p className="text-slate-600 leading-8">
              Cash flexibility also has value. Savings can help with
              emergencies or uncertainty. Money sent to a loan is
              harder to access again.
            </p>

            <p className="text-slate-600 leading-8">
              That does not mean overpaying is wrong. It means your
              money often has competing jobs to do.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold">
              Want a clearer answer for your own numbers?
            </h2>

            <p className="mt-4 text-slate-700 leading-8 max-w-2xl">
              Two people on similar salaries can end up with very
              different outcomes. Run your own scenario with the
              Wayli Student Loan Calculator UK.
            </p>

            <Link
              to="/student-loan-calculator"
              className="inline-block mt-6 px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
            >
              Use calculator
            </Link>
          </section>

          {/* RELATED GUIDES */}
          <section
            id="related"
            className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              Related guides
            </h2>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <Link
                to="/guides/student-loans/which-student-loan-plan-am-i-on"
                className="border rounded-2xl p-5 hover:bg-slate-50"
              >
                Which plan am I on?
              </Link>

              <Link
                to="/guides/student-loans/student-loan-30k"
                className="border rounded-2xl p-5 hover:bg-slate-50"
              >
                £30k student loan explained
              </Link>

              <Link
                to="/guides/student-loans/why-two-people-on-the-same-salary-repay-different-amounts"
                className="border rounded-2xl p-5 hover:bg-slate-50"
              >
                Same salary, different repayments
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold">
              Frequently asked questions
            </h2>

            <div className="mt-6 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <h3 className="font-semibold text-lg">
                    {faq.q}
                  </h3>

                  <p className="mt-2 text-slate-600 leading-8">
                    {faq.a}
                  </p>
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