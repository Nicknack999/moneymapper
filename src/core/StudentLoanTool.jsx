import { useState } from "react";
import { studentLoanInsights } from "../core/content/studentLoanInsights";
import { wayliMessages } from "../core/content/wayliMessages";
import { theme } from "../styles/wayliTheme";

export default function StudentLoanTool() {
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://api.wayli.uk";

  // --------------------------------
  // PLAN RULES
  // --------------------------------
  const plans = {
    plan1: {
      name: "Plan 1",
      threshold: 26065,
      years: 25
    },
    plan2: {
      name: "Plan 2",
      threshold: 27295,
      years: 30
    },
    plan5: {
      name: "Plan 5",
      threshold: 25000,
      years: 40
    },
    pg: {
      name: "Postgraduate",
      threshold: 21000,
      years: 30
    }
  };

  // --------------------------------
  // HELPERS
  // --------------------------------
  const money = (v) =>
    `£${Math.round(
      Number(v || 0)
    ).toLocaleString()}`;

  const parseNum = (v) =>
    v === "" ? "" : Number(v);

  // --------------------------------
  // STYLES
  // --------------------------------
  const page = {
    maxWidth: 960,
    margin: "0 auto",
    padding: 16,
    background: theme.colours.pageBg
  };

  const card = {
    background: theme.colours.successBg,
    borderRadius: theme.radius.card,
    padding: 24,
    border: `1px solid ${theme.colours.successBorder}`,
    boxShadow: theme.shadow.success
  };

  const whiteCard = {
    background: theme.colours.white,
    borderRadius: theme.radius.card,
    padding: 24,
    border: `1px solid ${theme.colours.neutralBorder}`,
    boxShadow: theme.shadow.card
  };

  const input = {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    height: 52,
    borderRadius: theme.radius.input,
    border: `1px solid ${theme.colours.inputBorder}`,
    padding: "0 14px",
    marginTop: 6,
    fontSize: 16,
    background: theme.colours.white
  };

  const button = {
    padding: "14px 18px",
    border: "none",
    borderRadius: theme.radius.input,
    background: theme.colours.primary,
    color: theme.colours.white,
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    width: "100%",
    boxShadow: theme.shadow.button
  };

 const quickBtn = (active) => ({
  padding: "14px 10px",
  borderRadius: 12,
  border: active
    ? `1px solid ${theme.colours.primary}`
    : `1px solid ${theme.colours.inputBorder}`,
  background: active
    ? theme.colours.successBorder
    : theme.colours.white,
  fontWeight: 700,
  cursor: "pointer",
  color: active
    ? theme.colours.successText
    : theme.colours.heading,
  width: "100%",
  fontSize: 18,
  textAlign: "center"
});

  const ghostBtn = {
    padding: "12px 16px",
    borderRadius: 12,
    border: `1px solid ${theme.colours.inputBorder}`,
    background: theme.colours.white,
    cursor: "pointer",
    width: "100%",
    fontWeight: 600,
    color: theme.colours.heading
  };

  const bigHeading = {
    fontSize: 24,
    fontWeight: 800,
    color: theme.colours.heading,
    margin: "0 0 12px 0"
  };

  const smallHeading = {
    fontSize: 18,
    fontWeight: 700,
    color: theme.colours.heading,
    margin: "0 0 10px 0"
  };

  // --------------------------------
  // STATE
  // --------------------------------
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [showMore, setShowMore] =
    useState(false);

  const [plan, setPlan] =
    useState("plan2");

  const [salary, setSalary] =
    useState(40000);

  const [balance, setBalance] =
    useState(50000);

  const [monthlyAmount, setMonthlyAmount] =
    useState(100);

  const [currentAge, setCurrentAge] =
    useState(30);

  const selectedPlan =
    plans[plan];

  // --------------------------------
  // API
  // --------------------------------
  const runModel = async () => {
    setLoading(true);
    setError("");

    try {
      const payload = {
        plan,
        salary: Number(salary),
        loan_balance:
          Number(balance),
        current_age:
          Number(currentAge),
        overpay:
          Number(
            monthlyAmount
          ),
        threshold:
          selectedPlan.threshold,
        write_off_years:
          selectedPlan.years
      };

      const res = await fetch(
        `${API_URL}/student-loan`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(
            payload
          )
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      const data =
        await res.json();

      setResult(data);
      setShowMore(false);
    } catch {
      setResult(null);

      setError(
        "We couldn't run your comparison right now."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------
  // QUICK BUTTONS
  // --------------------------------
  const applyQuickAmount = (
    amount
  ) => {
    setMonthlyAmount(amount);

    if (result) {
      setTimeout(() => {
        runModel();
      }, 50);
    }
  };

  // --------------------------------
  // DERIVED
  // --------------------------------
  const repaymentType =
    result?.decision
      ?.repayment_outcome
      ?.type || "";

  const salaryNeeded =
    result?.salary_needed;

  const payrollRepayment =
    Math.max(
      0,
      (salary -
        selectedPlan.threshold) *
        0.09
    );

  const writeOffYear =
    new Date().getFullYear() +
    selectedPlan.years;

  // --------------------------------
  // RESULT CONTENT
  // --------------------------------
  const salaryTier =
    salary < 35000
      ? "low"
      : salary < 55000
      ? "mid"
      : "high";

  const insightPack =
    studentLoanInsights[
      repaymentType
    ]?.[salaryTier] || {
      outlook: "",
      worthKnowing: "",
      matters: "",
      nextStep: ""
    };

  const content = {
    title:
      result?.decision
        ?.repayment_outcome
        ?.headline ||
      "Your outlook",

    text:
      insightPack.outlook,

    bg:
      repaymentType ===
      "full_repay"
        ? theme.colours.successBg
        : repaymentType ===
          "borderline"
        ? "#f0fdf4"
        : theme.colours.pageBg
  };

  const triggerInsight =
    insightPack.worthKnowing +
    " " +
    insightPack.nextStep;

  // --------------------------------
  // DECISION CARD
  // --------------------------------
  const decisionCard =
    repaymentType ===
    "write_off"
      ? {
          title:
            "Prioritise flexibility",
          text:
            "If full repayment looks less likely, keeping cash accessible may be stronger than aggressive overpayments."
        }
      : repaymentType ===
        "borderline"
      ? {
          title:
            "Keep options open",
          text:
            "You appear near the middle ground. A blend of savings and measured overpayments may suit many borrowers."
        }
      : {
          title:
            "Overpaying may add value",
          text:
            "If clearing the balance already looks realistic, overpayments may reduce interest and shorten the term."
        };

  // --------------------------------
  // MINI SCENARIO
  // --------------------------------
  const years = 5;
  const months =
    years * 12;

  function futureValue(
    monthly,
    annualRate
  ) {
    const r =
      annualRate / 12;

    let total = 0;

    for (
      let i = 0;
      i < months;
      i++
    ) {
      total =
        total *
          (1 + r) +
        monthly;
    }

    return Math.round(
      total
    );
  }

  const savingsValue =
    futureValue(
      monthlyAmount,
      0.03
    );

  const investingValue =
    futureValue(
      monthlyAmount,
      0.05
    );

  // --------------------------------
  // DYNAMIC MATTERS
  // --------------------------------
  const dynamicMatters = [];

  if (balance >= 80000) {
    dynamicMatters.push(
      `With a balance this size, future earnings are likely to matter more than small monthly changes.`
    );
  } else if (balance >= 50000) {
    dynamicMatters.push(
      `With a balance around this level, both repayments now and income later could shape what happens.`
    );
  } else if (balance >= 25000) {
    dynamicMatters.push(
      `With a balance around this level, steady repayments can make more of a difference than with larger loans.`
    );
  } else {
    dynamicMatters.push(
      `With a balance at this level, your current repayments may have a clearer impact.`
    );
  }

  if (salary < selectedPlan.threshold) {
    dynamicMatters.push(
      `At your current income, repayments are still fairly low on ${selectedPlan.name}, so future pay rises could matter a lot.`
    );
  } else if (salary < 45000) {
    dynamicMatters.push(
      `You’re already making repayments, but it may still take time for the balance to move meaningfully.`
    );
  } else if (salary < 65000) {
    dynamicMatters.push(
      `You look near the point where stronger repayments or higher earnings could start to change the picture.`
    );
  } else {
    dynamicMatters.push(
      `At your current income, repayments already look solid, so extra overpayments may go further.`
    );
  }

  if (currentAge <= 30) {
    dynamicMatters.push(
      `You still have time on your side, which means future earnings could make a big difference.`
    );
  } else if (currentAge <= 40) {
    dynamicMatters.push(
      `From here, both what you repay now and how things change later could matter.`
    );
  } else {
    dynamicMatters.push(
      `With fewer years left before write-off, timing may matter more now.`
    );
  }

  if (monthlyAmount >= 250) {
    dynamicMatters.push(
      `An extra payment at this level could genuinely change the outcome over time.`
    );
  } else if (monthlyAmount >= 100) {
    dynamicMatters.push(
      `This level of overpayment could help, though future earnings may still be the bigger factor.`
    );
  } else if (monthlyAmount > 0) {
    dynamicMatters.push(
      `Even smaller overpayments can help, though salary growth may still matter more.`
    );
  } else {
    dynamicMatters.push(
      `Without extra payments, the outcome is more likely to depend on normal repayments and future earnings.`
    );
  }

  return (
    <div style={page}>
      {/* HERO */}
      <div style={card}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: theme.colours.primary,
            textTransform:
              "uppercase"
          }}
        >
          Wayli
        </div>

        <h1
          style={{
            marginTop: 8,
            fontSize: 34,
            lineHeight: 1.2,
            color:
              theme.colours.heading
          }}
        >
          Should You Overpay
          Your Student Loan?
        </h1>

        <p
          style={{
            color:
              theme.colours.body,
            lineHeight: 1.7,
            fontSize: 17
          }}
        >
          Understand your
          options using UK loan
          plan rules. Compare
          overpaying,
          investing elsewhere,
          or keeping your cash
          flexible.
        </p>
      </div>

      {/* INPUTS */}
      <div
        style={{
          ...whiteCard,
          marginTop: 18
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16
          }}
        >
          <div>
            <label>
              Loan plan
            </label>

            <select
              value={plan}
              onChange={(e) =>
                setPlan(
                  e.target.value
                )
              }
              style={input}
            >
              <option value="plan1">
                Plan 1
              </option>
              <option value="plan2">
                Plan 2
              </option>
              <option value="plan5">
                Plan 5
              </option>
              <option value="pg">
                Postgraduate
              </option>
            </select>
          </div>

          {[
            [
              "Salary (£)",
              salary,
              setSalary
            ],
            [
              "Loan balance (£)",
              balance,
              setBalance
            ],
            [
              "Age",
              currentAge,
              setCurrentAge
            ],
            [
              "Monthly overpayment (£)",
              monthlyAmount,
              setMonthlyAmount
            ]
          ].map(
            ([a, b, c]) => (
              <div key={a}>
                <label>{a}</label>

                <input
                  type="number"
                  value={b}
                  onChange={(e) =>
                    c(
                      parseNum(
                        e.target
                          .value
                      )
                    )
                  }
                  style={input}
                />
              </div>
            )
          )}
        </div>

        <div
          style={{
            marginTop: 18
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: 10
            }}
          >
            Try monthly overpayments
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10
            }}
          >
            {[0, 50, 100, 150, 200, 300].map(
              (amt) => (
                <button
                  key={amt}
                  onClick={() =>
                    applyQuickAmount(
                      amt
                    )
                  }
                  style={quickBtn(
                    monthlyAmount ===
                      amt
                  )}
                >
                  £{amt}
                </button>
              )
            )}
          </div>
        </div>

        <button
          onClick={runModel}
          disabled={loading}
          style={{
            ...button,
            marginTop: 20
          }}
        >
          {loading
            ? "Working..."
            : "See My Options"}
        </button>

        {error && (
          <p
            style={{
              color:
                theme.colours.danger,
              marginTop: 12
            }}
          >
            {error}
          </p>
        )}
      </div>

      {/* RESULTS */}
      {result && (
        <>
          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <h3 style={smallHeading}>
              Helpful context
            </h3>

            <p
              style={{
                color:
                  theme.colours.body,
                lineHeight: 1.7,
                margin: 0
              }}
            >
              {triggerInsight}
            </p>
          </div>

          <div
            style={{
              ...card,
              marginTop: 18,
              background:
                content.bg
            }}
          >
            <div
              style={{
                display:
                  "inline-block",
                padding:
                  "6px 10px",
                borderRadius:
                  999,
                background:
                  theme.colours.successBorder,
                color:
                  theme.colours.successText,
                fontSize: 12,
                fontWeight: 800
              }}
            >
              Your likely direction
            </div>

            <h2
              style={{
                marginTop: 14,
                marginBottom: 8,
                color:
                  theme.colours.heading
              }}
            >
              {content.title}
            </h2>

            <p
              style={{
                lineHeight: 1.7,
                marginBottom: 0,
                color:
                  theme.colours.body
              }}
            >
              {content.text}
            </p>
          </div>

          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <h3 style={smallHeading}>
              Key drivers
            </h3>

            <ul
              style={{
                paddingLeft: 18,
                color:
                  theme.colours.body,
                lineHeight: 1.8,
                marginBottom: 0
              }}
            >
              {dynamicMatters.map(
                (item, i) => (
                  <li key={i}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <button
              style={ghostBtn}
              onClick={() =>
                setShowMore(
                  !showMore
                )
              }
            >
              {showMore
                ? "Hide extra detail ▲"
                : "More perspective ▼"}
            </button>

            {showMore && (
              <div
                style={{
                  marginTop: 16
                }}
              >
                <p
                  style={{
                    color:
                      theme.colours.body,
                    lineHeight: 1.7
                  }}
                >
                  Revisiting this after salary changes can materially alter the picture.
                </p>

                <p
                  style={{
                    color:
                      theme.colours.body,
                    lineHeight: 1.7
                  }}
                >
                  For many users, keeping flexible cash can be as valuable as faster repayment.
                </p>
              </div>
            )}
          </div>

          <div
            style={{
              ...whiteCard,
              marginTop: 18,
              textAlign:
                "center"
            }}
          >
            <p
              style={{
                color:
                  theme.colours.muted,
                lineHeight: 1.7,
                margin: 0
              }}
            >
              {
                wayliMessages
                  .education
                  .assumptions
              }
              <br />
              {
                wayliMessages
                  .education
                  .notAdvice
              }
            </p>
          </div>
        </>
      )}
    </div>
  );
}