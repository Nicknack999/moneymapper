export default function WhichStudentLoanPlanAmIOnPage() {
  const pageTitle =
    "Which student loan plan am I on? UK guide | Wayli";

  const pageDescription =
    "Find out which UK student loan plan you are on, how repayments work, compare Plan 1, Plan 2, Plan 4, Plan 5 and postgraduate loans, and check official sources.";

  const cards = [
    [
      "Employed through payroll",
      "For many borrowers, repayments are deducted automatically through PAYE once earnings go above the relevant threshold."
    ],
    [
      "Income changes",
      "If earnings fall below the threshold, deductions may reduce or stop."
    ],
    [
      "Self-employed",
      "Repayments are often handled through Self Assessment rather than payroll deductions."
    ],
    [
      "Why your plan matters",
      "Your plan can affect thresholds, deductions and how long repayments may continue."
    ]
  ];

  const faqs = [
  {
    q: "Do I manually pay my student loan every month?",
    a: "Not if you are employed. Repayments are commonly deducted automatically through your employer's payroll once your earnings go above the relevant threshold."
  },
  {
    q: "Why is money coming off my payslip?",
    a: "Student loan deductions may begin when your income goes above the repayment threshold and your employer's payroll records show repayments are due. They often appear alongside tax and National Insurance outgoings."
  },
  {
    q: "How do I make sure I am repaying the correct amount?",
    a: "Keep your employment and contact details up to date with the relevant student loan organisation. If something looks wrong, raise it early."
  },
  {
    q: "Do I need to update my employment details each year?",
    a: "Yes, it is sensible to keep your details current whenever your job, income or circumstances change. Accurate records help repayments run more smoothly and avoid arrears."
  },
  {
    q: "What if I change jobs?",
    a: "Your new employer will usually handle deductions through their payroll once the correct information is in place. Checking your first few payslips after a move can be worthwhile."
  },
  {
    q: "What if I stop working or my income falls?",
    a: "If earnings fall below the relevant threshold, deductions may reduce or stop. Student loan repayments often move with income rather than staying fixed like many normal debts."
  },
  {
    q: "I am self-employed. How does repayment usually work?",
    a: "Repayments are often handled through Self Assessment rather than monthly PAYE deductions. Official guidance is the best source for your exact position."
  },
  {
    q: "Can two people with student loans on the same salary repay different amounts?",
    a: "Yes. Different plans can mean different thresholds and different deductions, even on similar earnings."
  },
  {
    q: "Should I overpay before I know my plan?",
    a: "Usually better to confirm your plan first, then make decisions with clearer numbers."
  },
   {
    q: "Anything else I should know?",
    a: "Maybe! There are lots of variables like if you've two jobs, go travelling for an extended period, that could affect your repayments. Check the Student Loans Company website if you really want the small print."
  }
];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      <div className="max-w-5xl mx-auto px-6 py-8 md:py-12 space-y-8 md:space-y-10">

        {/* HERO */}
        <header className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10">
          <div className="inline-flex px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
            Wayli guide
          </div>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Which student loan plan am I on?
          </h1>

          <p className="mt-5 text-lg md:text-xl leading-8 text-slate-600 max-w-3xl">
            Not sure whether you are on Plan 1, Plan 2, Plan 4, Plan 5 or a
            postgraduate loan? You are not alone. Many people only ask when
            deductions appear on a payslip or they begin thinking about overpaying.
          </p>

          <p className="mt-4 text-slate-600 leading-8 max-w-3xl">
            Your plan often depends on when and where you lived and studied, so
            checking official records is usually the best place to start.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/">
              <button className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition">
                Try the Wayli calculator
              </button>
            </a>

            <a href="#plans">
              <button className="px-6 py-4 rounded-2xl border border-slate-300 bg-white font-semibold">
                Compare plans
              </button>
            </a>
          </div>
        </header>

        {/* HOW REPAYMENTS WORK */}
        <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            How student loan repayments usually work
          </h2>

          <div className="mt-5 space-y-5 text-slate-600 leading-8">
            <p>
              For many borrowers, repayments are linked to income rather than
              manually paying a monthly bill.
            </p>

            <p>
              If you are employed, deductions may be taken through PAYE payroll
              once earnings go above the relevant threshold.
            </p>

            <p>
              If earnings fall below that level, deductions may reduce or stop.
            </p>

            <p>
              If you are self-employed, repayments are often handled through
              Self Assessment instead.
            </p>
          </div>
        </section>

        {/* QUICK CARDS */}
        <section className="grid md:grid-cols-2 gap-5">
          {cards.map(([title, text]) => (
            <div
              key={title}
              className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6"
            >
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-3 text-slate-600 leading-8">{text}</p>
            </div>
          ))}
        </section>

        {/* WHY SO MANY PLANS */}
        <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Why are there so many student loan plans?
          </h2>

          <p className="mt-4 text-slate-600 leading-8">
            Because student loans were introduced at different times across the UK,
            with different rules depending on where you lived and studied.
          </p>

          <p className="mt-4 text-slate-600 leading-8">
            That means borrowers can end up on different plans with different
            thresholds and repayment terms.
          </p>

          <div className="mt-6">
            <p className="font-semibold text-slate-900">
              Official student finance organisations
            </p>

            <ul className="mt-4 space-y-3 text-slate-600">
              <li>
                <a
                  href="https://www.gov.uk/student-finance"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  Student Finance England
                </a>
              </li>

              <li>
                <a
                  href="https://www.saas.gov.uk/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  SAAS (Scotland)
                </a>
              </li>

              <li>
                <a
                  href="https://www.studentfinancewales.co.uk/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  Student Finance Wales
                </a>
              </li>

              <li>
                <a
                  href="https://www.studentfinanceni.co.uk/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  Student Finance Northern Ireland
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* IMPROVED SPACING CHART */}
        <section
          id="plans"
          className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            Student loan plans compared
          </h2>

          <p className="mt-4 text-slate-600 leading-8 max-w-3xl">
            Updated using official April 2026 thresholds. Interest rates and thresholds
            can change over time.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[1120px] text-left border-collapse">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-5 py-4 font-semibold text-slate-900">Plan</th>

                  <th className="px-5 py-4 font-semibold text-slate-900">
                    Repayment threshold
                  </th>

                  <th className="px-5 py-4 font-semibold text-slate-900">
                    Repayment rate
                  </th>

                  <th className="px-5 py-4 font-semibold text-slate-900">
                    Interest rate
                  </th>

                  <th className="px-5 py-4 font-semibold text-slate-900">
                    Typical write-off
                  </th>

                  <th className="px-5 py-4 font-semibold text-slate-900">
                    Often linked to
                  </th>
                </tr>
              </thead>

              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold">Plan 1</td>
                  <td className="px-5 py-4">£26,900</td>
                  <td className="px-5 py-4">9% above threshold</td>
                  <td className="px-5 py-4">3.2%</td>
                  <td className="px-5 py-4">25 years / legacy rules</td>
                  <td className="px-5 py-4">Older borrowers</td>
                </tr>

                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold">Plan 2</td>
                  <td className="px-5 py-4">£29,385</td>
                  <td className="px-5 py-4">9% above threshold</td>
                  <td className="px-5 py-4">3.2% to 6.2%*</td>
                  <td className="px-5 py-4">30 years</td>
                  <td className="px-5 py-4">Many England/Wales cohorts</td>
                </tr>

                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold">Plan 4</td>
                  <td className="px-5 py-4">£33,795</td>
                  <td className="px-5 py-4">9% above threshold</td>
                  <td className="px-5 py-4">3.2%</td>
                  <td className="px-5 py-4">30 years / legacy rules</td>
                  <td className="px-5 py-4">Scotland</td>
                </tr>

                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold">Plan 5</td>
                  <td className="px-5 py-4">£25,000</td>
                  <td className="px-5 py-4">9% above threshold</td>
                  <td className="px-5 py-4">3.2%</td>
                  <td className="px-5 py-4">40 years</td>
                  <td className="px-5 py-4">Newer England borrowers</td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-semibold">Postgraduate</td>
                  <td className="px-5 py-4">£21,000</td>
                  <td className="px-5 py-4">6% above threshold</td>
                  <td className="px-5 py-4">6.2%</td>
                  <td className="px-5 py-4">30 years</td>
                  <td className="px-5 py-4">Masters / Doctoral loans</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* FOOTNOTES */}
          <div className="mt-6 space-y-3 text-sm text-slate-500 leading-7 max-w-4xl">
            <p>
              * <span className="font-semibold text-slate-700">Plan 2 interest:</span>{" "}
              Variable Interest Rate (VIR). While studying, interest is typically RPI
              plus 3% (currently 6.2%).
            </p>

            <p>
              After leaving study, Plan 2 interest usually depends on income:
              £29,385 or less = 3.2%; £29,386 to £52,884 = 3.2% plus up to 3%;
              £52,885 or more = 6.2%.
            </p>

            <p>
              Figures are simplified and may change. Check official sources for current
              thresholds, rates and personal eligibility.
            </p>
          </div>
        </section>

        {/* WHY IT MATTERS */}
        <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Why knowing your plan matters
          </h2>

          <p className="mt-4 text-slate-700 leading-8">
            Two people on the same salary can repay different amounts simply
            because they are on different plans. And they can be affected by different thresholds,
            deductions and long-term outcomes.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Once you know your plan, run your numbers
          </h2>

          <p className="mt-4 text-slate-600 leading-8 max-w-2xl">
            Knowing the plan is step one. The next question is what it could mean
            for your money. Compare overpaying versus keeping flexibility with the
            Wayli calculator.
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