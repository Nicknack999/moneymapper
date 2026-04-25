export default function StudentLoanExplainerPage() {
  const pageTitle =
    "Why two people on £45k can repay different student loan amounts";

  const pageDescription =
    "See why two people earning £45k can repay different UK student loan amounts depending on Plan 1, Plan 2, Plan 5 or postgraduate loans. Compare thresholds, write-off dates and whether overpaying is worth it.";

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

          <h1 className="mt-5 text-3xl sm:text-5xl font-bold tracking-tight leading-tight text-slate-900 max-w-4xl">
            Why two people on £45k{" "}
            <span className="block text-emerald-600">
              can repay different amounts
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-8 max-w-2xl">
            Two graduates can earn the same salary and still make different
            student loan repayments. Your loan plan, repayment threshold and
            write-off rules often matter more than salary alone.
          </p>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-8 max-w-2xl">
            If you are deciding whether to overpay, save or invest instead,
            this is one of the most important things to understand first.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="/#tool" className="w-full sm:w-auto">
              <button className="w-full px-6 py-4 rounded-2xl bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-600 transition">
                Try the Wayli calculator
              </button>
            </a>

            <a href="#example" className="w-full sm:w-auto">
              <button className="w-full px-6 py-4 rounded-2xl border border-slate-300 bg-white font-semibold hover:bg-slate-50 transition">
                See example
              </button>
            </a>
          </div>
        </section>

        {/* QUICK CARDS */}
        <section className="grid md:grid-cols-3 gap-4">
          {[
            [
              "Thresholds matter",
              "Repayments usually only apply above your plan threshold."
            ],
            [
              "Time matters",
              "Some plans run longer before any remaining balance is written off."
            ],
            [
              "Growth matters",
              "Future pay rises can change whether full repayment becomes likely."
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

        {/* EXAMPLE */}
        <section
          id="example"
          className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Example: two borrowers earning £45k
          </h2>

          <p className="mt-5 text-slate-600 leading-8 max-w-3xl">
            Imagine two people both earn £45,000 and both owe £70,000.
            One is on Plan 1 and the other is on Plan 2.
          </p>

          <p className="mt-4 text-slate-600 leading-8 max-w-3xl">
            Their repayments can differ because each plan uses a different
            threshold. One borrower may repay more each year, reduce the
            balance faster, or become a stronger candidate for overpaying.
          </p>

          {/* MOBILE CARDS */}
          <div className="mt-8 grid gap-4 sm:hidden">
            {[
              ["Plan 1", "£26k threshold", "~£1.7k yearly", "25 years"],
              ["Plan 2", "£27k threshold", "~£1.6k yearly", "30 years"],
              ["Plan 5", "£25k threshold", "~£1.8k yearly", "40 years"]
            ].map(([plan, a, b, c]) => (
              <div
                key={plan}
                className="rounded-2xl border border-slate-200 p-5 bg-slate-50"
              >
                <div className="font-semibold text-slate-900">
                  {plan}
                </div>

                <div className="mt-2 text-sm text-slate-600 space-y-1">
                  <div>{a}</div>
                  <div>{b}</div>
                  <div>{c}</div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden sm:block mt-8 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 pr-4">Plan</th>
                  <th className="py-4 pr-4">Threshold</th>
                  <th className="py-4 pr-4">
                    Approx yearly repayment
                  </th>
                  <th className="py-4">Write-off</th>
                </tr>
              </thead>

              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="py-4">Plan 1</td>
                  <td>£26k</td>
                  <td>~£1.7k</td>
                  <td>25 years</td>
                </tr>

                <tr className="border-b border-slate-100">
                  <td className="py-4">Plan 2</td>
                  <td>£27k</td>
                  <td>~£1.6k</td>
                  <td>30 years</td>
                </tr>

                <tr>
                  <td className="py-4">Plan 5</td>
                  <td>£25k</td>
                  <td>~£1.8k</td>
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
            Overpaying can be valuable if you are already likely to clear the
            balance anyway. In those cases, extra payments may reduce interest
            or help you finish sooner.
          </p>

          <p className="mt-4 text-slate-700 leading-8 max-w-3xl">
            For others, keeping flexibility, building savings or investing may
            be stronger. The right answer depends on your plan, balance and
            future earnings path.
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
            <a href="/#tool">
              <button className="px-6 py-4 rounded-2xl bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-200 hover:bg-emerald-600 transition">
                Use the Wayli calculator
              </button>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}