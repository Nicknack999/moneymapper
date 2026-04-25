export const studentLoanInsights = {
  unlikely: {
    low: {
      outlook: "Full repayment currently looks unlikely.",
      worthKnowing:
        "Your salary is below the repayment threshold, so required repayments may be low or zero at present."
    },
    mid: {
      outlook: "Full repayment currently looks less likely.",
      worthKnowing:
        "Repayments may have started, but may not yet be enough to clear the balance quickly."
    }
  },

  borderline: {
    mid: {
      outlook:
        "You appear close to the line where future pay rises could materially change the outcome.",
      worthKnowing:
        "Salary growth or consistent overpayments could improve the picture."
    }
  },

  likely: {
    high: {
      outlook: "You currently appear on track to repay.",
      worthKnowing:
        "At your current income, overpayments may reduce interest and shorten repayment time."
    }
  }
};