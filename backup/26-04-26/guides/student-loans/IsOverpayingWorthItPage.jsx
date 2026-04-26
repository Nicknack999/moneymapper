export default function IsOverpayingWorthItPage() {
  const pageTitle =
    "Is overpaying your student loan worth it in the UK? | Wayli";

  const pageDescription =
    "Wondering if overpaying your student loan is worth it? Explore when it may help, when it may not, and how to think about the decision using the Wayli calculator.";

  const faqs = [
    {
      q: "Is overpaying a student loan always a good idea?",
      a: "Not always. For some borrowers it can reduce total repayments or clear the balance earlier. For others, it may make little difference if a portion is likely to be written off."
    },
    {
      q: "Should I overpay my student loan or save cash?",
      a: "That depends on your emergency fund, job security and how much flexibility matters to you. Cash in the bank can solve problems that overpayments cannot."
    },
    {
      q: "Does salary matter most?",
      a: "Your future salary path often matters more than your current salary alone. Pay rises over time can change the picture significantly because they increase minimum payments."
    },
    {
      q: "Should I use a calculator first?",
      a: "Usually yes. The same monthly overpayment can look smart in one scenario and weak in another."
    }
  ];

  const cards = [
    [
      "It may be stronger if...",
      [
        "You are likely to clear the balance anyway",
        "Your earnings may rise over time",
        "You have a healthy emergency fund",
        "You value being debt-free sooner"
      ]
    ],
    [
      "It may be weaker if...",
      [
        "A large balance may be written off later",
        "You have expensive debts elsewhere",
        "Your savings buffer is thin",
        "You need flexibility right now"
      ]
    ]
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      <div className="max-w-5xl mx-auto px-6 py-8 md:py-12 space-y-8 md:space-y-10">
        {/* Hero */}
        <header className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10">
          <div className="inline-flex px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
            Wayli guide
          </div>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Is overpaying your student loan worth it in the UK?
          </h1>

          <p className="mt-5 text-lg md:text-xl leading-8 text-slate-600 max-w-3xl">
            Short answer: sometimes yes, sometimes no. Student loan
            overpayments can be smart for some people and a poor use of cash for
            others. It usually comes down to your plan, likely future earnings,
            savings position and what you want your money to do for you.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/">
              <button className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition">
                Try the Wayli calculator
              </button>
            </a>

            <a href="#quick-answer">
              <button className="px-6 py-4 rounded-2xl border border-slate-300 bg-white font-semibold">
                Read the quick answer
              </button>
            </a>
          </div>
        </header>

        {/* Quick answer */}
        <section
          id="quick-answer"
          className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            The short-ish version ↓
          </h2>

          <div className="mt-5 space-y-5 text-slate-600 leading-8">
            <p>
              If you are likely to repay your loan in full anyway, extra payments
              may reduce interest or help you pay it off sooner.
            </p>

            <p>
              If a chunk of the balance may never be repaid before write-off,
              overpaying can be less rewarding than many people assume.
            </p>

            <p>
              In plain English: this is rarely a yes-or-no rule. It is more of a
              “what is most useful for your situation?” question.
            </p>
            <p>
              Why? Because UK student loans often work differently from traditional debt. 
            </p>
            <p>
              Repayments are linked to earnings above a threshold, and any remaining balance may be written off after a set period.
            </p>
          </div>
        </section>

        {/* Cards */}
        <section className="grid md:grid-cols-2 gap-5">
          {cards.map(([title, items]) => (
            <div
              key={title}
              className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold">{title}</h2>

              <ul className="mt-5 space-y-3 text-slate-600 leading-8">
                {items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Main content */}
        <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            What many people miss
          </h2>

          <p className="text-slate-600 leading-8">
            People often focus only on today’s salary. Fair enough — it is the
            easiest number to grab. But future earnings can matter more than a
            modest overpayment made this month.
          </p>

          <p className="text-slate-600 leading-8">
            If your income rises over time, your normal repayments may rise too.
            That can completely change whether overpaying now looks strong,
            average or unnecessary.
          </p>

          <p className="text-slate-600 leading-8">
            Another overlooked point: cash flexibility has value. £200 in savings
            can help with a broken boiler, car repair or job wobble. £200 sent to
            a loan is much harder to get back.
          </p>

          <p className="text-slate-600 leading-8">
            That does not mean overpaying is wrong. It means your money usually
            has competing jobs to do.
          </p>
        </section>

        {/* Example scenarios */}
        <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            A few real-life examples
          </h2>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              [
                "Steady income around £30k",
                "If a balance may not be fully repaid before write-off, is making large overpayments the best use of your money?"
              ],
              [
                "Growing career income",
                "If earnings grow over time, overpaying may become more worthwhile if clearing the loan looks realistic."
              ],
              [
                "Got an emergency fund?",
                "Building cash resilience may deserve priority."
              ],
              [
                "High confidence you’ll clear it anyway",
                "Extra payments may be more meaningful."
              ]
            ].map(([title, text]) => (
              <div
                key={title}
                className="bg-white rounded-2xl border border-emerald-100 p-5"
              >
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-slate-600 leading-7">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Want a clearer answer for your numbers?
        </h2>

        <p className="mt-4 text-slate-700 leading-8 max-w-2xl">
            Two people on similar salaries can end up with very different outcomes.
            That is why broad rules often miss the mark. Run your own scenario with
            the Wayli student loan calculator.
        </p>

        <a href="/" className="inline-block mt-6">
            <button className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition">
            Use the calculator
            </button>
        </a>
        </section>

        {/* FAQ */}
        <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Frequently asked questions
          </h2>

          <div className="mt-6 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-semibold text-lg">{faq.q}</h3>
                <p className="mt-2 text-slate-600 leading-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}