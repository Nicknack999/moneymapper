export default function StudentLoanExplainerPage(){
  const pageTitle = 'Why two people earning £45k can have different student loan repayments';
  const pageDescription = 'Understand why the same salary can lead to different UK student loan repayments across Plan 1, Plan 2, Plan 5 and postgraduate loans. Compare thresholds, write-off periods and overpayment choices.';
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <header className="bg-white rounded-2xl shadow-sm border p-8">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">Wayli</p>
          <h1 className="text-4xl font-bold mt-3 leading-tight">Why two people earning £45k can have different student loan repayments</h1>
          <p className="mt-4 text-lg text-slate-600 leading-8">Same salary. Same debt. Different outcome. It sounds odd at first, but UK student loan plans use different thresholds and write-off periods, which can change what you repay over time.</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <button className="px-5 py-3 rounded-xl bg-emerald-500 text-white font-semibold">Try the Wayli student loan tool</button>
            <button className="px-5 py-3 rounded-xl border font-semibold">See repayment examples</button>
          </div>
        </header>

        <section className="grid md:grid-cols-3 gap-4">
          {[
            ['Thresholds matter','Repayments usually start only above your plan threshold.'],
            ['Time matters','Some plans run longer before write-off.'],
            ['Growth matters','Future pay rises can change the picture.']
          ].map(([t,d]) => (
            <div key={t} className="bg-white rounded-2xl border p-5 shadow-sm">
              <h3 className="font-semibold">{t}</h3>
              <p className="text-slate-600 mt-2 leading-7">{d}</p>
            </div>
          ))}
        </section>

        <section className="bg-white rounded-2xl border p-8 shadow-sm space-y-5">
          <h2 className="text-2xl font-bold">A simple example</h2>
          <p className="text-slate-600 leading-8">Imagine two people each earn £45,000 and both owe £70,000. One is on Plan 1, the other on Plan 2. Their yearly repayments can differ because each plan has a different threshold. If one person repays more each year, or has longer before write-off, the long-term result can change.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3">Plan</th>
                  <th className="py-3">Approx threshold</th>
                  <th className="py-3">Approx yearly repayment at £45k</th>
                  <th className="py-3">Write-off window</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="py-3">Plan 1</td><td>£26k</td><td>~£1.7k</td><td>25 years</td></tr>
                <tr className="border-b"><td className="py-3">Plan 2</td><td>£27k</td><td>~£1.6k</td><td>30 years</td></tr>
                <tr><td className="py-3">Plan 5</td><td>£25k</td><td>~£1.8k</td><td>40 years</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-emerald-50 rounded-2xl border border-emerald-100 p-8">
          <h2 className="text-2xl font-bold">What this means for overpaying your student loan</h2>
          <p className="mt-3 text-slate-700 leading-8">Overpaying can help some borrowers, especially if they are already likely to clear the balance. For others, keeping flexibility or investing elsewhere may be stronger. The answer depends on your plan, salary path and balance — not salary alone.</p>
        </section>

        <section className="bg-white rounded-2xl border p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <div>
            <h3 className="font-semibold">Does the same salary always mean the same student loan repayment?</h3>
            <p className="text-slate-600 mt-2 leading-7">No. Your repayment plan, threshold and write-off period can all change the result.</p>
          </div>
          <div>
            <h3 className="font-semibold">Should I overpay my student loan?</h3>
            <p className="text-slate-600 mt-2 leading-7">It depends on whether you are likely to clear the balance anyway, your interest rate and how much flexibility you want with cash.</p>
          </div>
          <div className="pt-2">
            <button className="px-5 py-3 rounded-xl bg-emerald-500 text-white font-semibold">Use the Wayli calculator</button>
          </div>
        </section>
      </div>
    </div>
  )
}
