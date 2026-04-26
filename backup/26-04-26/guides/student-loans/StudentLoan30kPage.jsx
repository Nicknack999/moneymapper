export default function StudentLoan30kPage() {
  const pageTitle =
    "Should I overpay my student loan on £30k?";

  const pageDescription =
    "Find out whether overpaying your UK student loan on a £30,000 salary is worth it. Compare overpaying vs saving and use the Wayli calculator.";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <title>{pageTitle}</title>
      <meta
        name="description"
        content={pageDescription}
      />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 py-10 sm:py-16 space-y-16">
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
            student loan might help — but it is far from
            automatic.
          </p>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-8 max-w-3xl">
            For many borrowers, future salary growth,
            flexibility and other financial priorities can
            matter more than modest overpayments today.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="/#tool" className="w-full sm:w-auto">
              <button className="w-full px-6 py-4 rounded-2xl bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-600 transition">
                Try the Wayli calculator
              </button>
            </a>

            <a href="#example" className="w-full sm:w-auto">
              <button className="w-full px-6 py-4 rounded-2xl border border-slate-300 bg-white font-semibold hover:bg-slate-50 transition">
                See examples
              </button>
            </a>
          </div>
        </section>

        {/* QUICK CARDS */}
        <section className="grid md:grid-cols-3 gap-4">
          {[
            [
              "Income is only one factor",
              "The same salary can lead to different outcomes depending on your plan and balance."
            ],
            [
              "Flexibility has value",
              "Money kept in savings can be useful when life changes."
            ],
            [
              "Future earnings matter",
              "Repayments usually rise as income rises."
            ]
          ].map(([title, text]) => (
            <div
              key={title}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
            >
              <h2 className="font-semibold text-lg">
                {title}
              </h2>

              <p className="mt-3 text-slate-600 leading-7">
                {text}
              </p>
            </div>
          ))}
        </section>

        {/* WHY */}
        <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Why £30k is an important decision point
          </h2>

          <p className="mt-5 text-slate-600 leading-8 max-w-3xl">
            At £30,000, many UK borrowers are making
            automatic repayments but may still be early in
            the long-term repayment journey.
          </p>

          <p className="mt-4 text-slate-600 leading-8 max-w-3xl">
            That means future pay rises can sometimes have a
            bigger effect than smaller overpayments made
            today.
          </p>

          <p className="mt-4 text-slate-600 leading-8 max-w-3xl">
            For some people, waiting, reviewing later and
            keeping cash flexible can be the stronger move.
          </p>
        </section>

        {/* EXAMPLE */}
        <section
          id="example"
          className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            What £100 per month could do instead
          </h2>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              [
                "Overpay loan",
                "Could reduce balance faster if full repayment looks realistic."
              ],
              [
                "Build savings",
                "Creates flexibility for emergencies or future plans."
              ],
              [
                "Invest long term",
                "May build more wealth depending on returns and timeframe."
              ]
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 p-5 bg-slate-50"
              >
                <div className="font-semibold">
                  {title}
                </div>

                <p className="mt-3 text-sm text-slate-600 leading-7">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* QUESTIONS */}
        <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Questions to ask before overpaying
          </h2>

          <div className="mt-6 space-y-5">
            {[
              "Am I likely to clear the balance anyway?",
              "Do I need access to this cash later?",
              "Could the money work harder elsewhere?",
              "Is my salary likely to rise over time?"
            ].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl px-5 py-4 border border-emerald-100"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Use real numbers, not guesswork
          </h2>

          <p className="mt-5 text-slate-600 leading-8 max-w-2xl mx-auto">
            The smartest move depends on your plan,
            balance, income path and priorities.
          </p>

          <p className="mt-4 text-slate-600 leading-8 max-w-2xl mx-auto">
            Use the Wayli calculator to compare whether
            overpaying, saving or waiting looks strongest
            for your own situation.
          </p>

          <div className="mt-8">
            <a href="/#tool">
              <button className="px-7 py-4 rounded-2xl bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-600 transition">
                Use the calculator
              </button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}