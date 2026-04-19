export const wayliMessages = {
  // --------------------------------------------------
  // EDUCATION / TRUST
  // --------------------------------------------------
  education: {
    assumptions:
      "These estimates use simplified assumptions. Real outcomes depend on earnings, returns, investment performance and future policy changes.",

    notAdvice:
      "This is an educational comparison tool, not personal financial advice.",

    taxLike:
      "UK student loans often behave more like an income-linked charge than normal consumer debt.",

    estimates:
      "Figures shown are estimates based on the assumptions you entered."
  },

  // --------------------------------------------------
  // REPAYMENT STATUS
  // --------------------------------------------------
  repayment: {
    likelyRepay:
      "At your current income, full repayment looks more likely within the selected timeframe.",

    unlikelyRepay:
      "At your current income, full repayment looks less likely before the loan term ends.",

    borderline:
      "This looks fairly balanced. Future earnings and policy changes could affect the result.",

    salaryTrigger: (salary) =>
      `Full repayment may become more likely from around £${Number(
        salary || 0
      ).toLocaleString()} salary upward.`,

    clearEarlier: (years) =>
      `Overpaying could clear the balance around ${years} years earlier under these assumptions.`
  },

  // --------------------------------------------------
  // INVESTING
  // --------------------------------------------------
  investing: {
    growthPotential: (value) =>
      `Investing the same monthly amount could grow to around £${Number(
        value || 0
      ).toLocaleString()} over time.`,

    strongest:
      "Under these assumptions, investing gives the strongest long-term financial outcome.",

    timeMatters:
      "This route usually benefits most from time and consistency.",

    lowerReturns:
      "If investment returns are lower than expected, overpaying may become more competitive."
  },

  // --------------------------------------------------
  // OVERPAYING
  // --------------------------------------------------
  overpaying: {
    stronger:
      "Under these assumptions, overpaying gives the strongest financial outcome.",

    debtSooner:
      "This route may appeal if becoming debt-free sooner matters to you.",

    certainty:
      "Some people prefer reducing debt rather than relying on future market returns.",

    interestSaved: (value) =>
      `Overpaying may reduce future interest by around £${Number(
        value || 0
      ).toLocaleString()}.`
  },

  // --------------------------------------------------
  // MINIMUM ONLY
  // --------------------------------------------------
  minimum: {
    flexibility:
      "Paying only normal deductions keeps more monthly flexibility in the short term.",

    noExtra:
      "This means making no voluntary extra payments beyond required payroll deductions.",

    breathingRoom:
      "This can suit periods where cashflow matters more than optimisation."
  },

  // --------------------------------------------------
  // COMPARISON / UX
  // --------------------------------------------------
  comparison: {
    close:
      "These outcomes look fairly close. Personal preference may matter more than the maths here.",

    valuesMatter:
      "Best financial outcome and best personal choice are not always the same thing.",

    scenarioFirst:
      "Use these results to explore scenarios, not just chase one headline answer."
  },

  // --------------------------------------------------
  // NUDGES
  // --------------------------------------------------
  nudges: {
    tryHigherSalary:
      "Try increasing salary to see how strongly future earnings can change the result.",

    tryLowerReturns:
      "Try lowering investment returns to stress-test the investing route.",

    tryHigherOverpay:
      "Try a larger monthly amount to see when overpaying becomes more competitive.",

    tryLaterAge:
      "Try extending the compare age to see the effect of time."
  }
};