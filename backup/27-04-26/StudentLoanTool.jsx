import { useState } from "react";
import { studentLoanInsights } from "../core/content/studentLoanInsights";
import { wayliMessages } from "../core/content/wayliMessages";

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
    background: "#f8fafc"
  };

  const card = {
    background: "#ecfdf5",
    borderRadius: 20,
    padding: 24,
    border: "1px solid #bbf7d0",
    boxShadow:
      "0 12px 28px rgba(16,185,129,0.08)"
  };

  const whiteCard = {
    background: "#ffffff",
    borderRadius: 20,
    padding: 24,
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 12px 28px rgba(15,23,42,0.04)"
  };

  const input = {
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    height: 52,
    borderRadius: 14,
    border: "1px solid #d1d5db",
    padding: "0 14px",
    marginTop: 6,
    fontSize: 16
};

  const button = {
    padding: "14px 18px",
    border: "none",
    borderRadius: 14,
    background: "#10b981",
    color: "white",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    width: "100%"
  };

  const quickBtn = (active) => ({
    padding: "10px 14px",
    borderRadius: 12,
    border: active
      ? "1px solid #10b981"
      : "1px solid #d1d5db",
    background: active
      ? "#d1fae5"
      : "white",
    fontWeight: 700,
    cursor: "pointer"
  });

  const ghostBtn = {
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    background: "white",
    cursor: "pointer",
    width: "100%",
    fontWeight: 600
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
        ? "#ecfdf5"
        : repaymentType ===
          "borderline"
        ? "#f0fdf4"
        : "#f8fafc"
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
// MINI SCENARIO BLOCK
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
// TRUE DYNAMIC MATTERS BOX V4
// Replace your current dynamicMatters block only
// SEARCH: const dynamicMatters = [];
// REPLACE until just before return (
// --------------------------------

const dynamicMatters = [];

// BALANCE
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

// SALARY STAGE
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

// AGE / TIME
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

// OVERPAYMENT
if (monthlyAmount >= 250) {
  dynamicMatters.push(
    `An extra payment at this level could genuinely change the outcome over time.`
  );
} else if (monthlyAmount >= 100) {
  if (salary >= 65000) {
    dynamicMatters.push(
      `Because repayments already look stronger, this may be more about finishing sooner or paying less overall.`
    );
  } else if (salary >= selectedPlan.threshold) {
    dynamicMatters.push(
      `This level of overpayment could help, though future earnings may still be the bigger factor.`
    );
  } else {
    dynamicMatters.push(
      `Before overpaying this amount, it may be worth comparing it with savings goals or keeping flexibility.`
    );
  }
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
          color: "#10b981",
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
          lineHeight: 1.2
        }}
      >
        Should You Overpay
        Your Student Loan?
      </h1>

      <p
        style={{
          color:
            "#475569",
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
            gridTemplateColumns: "1fr",
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
                  e.target
                    .value
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
                <label>
                  {a}
                </label>

                <input
                  type="number"
                  value={b}
                  onChange={(
                    e
                  ) =>
                    c(
                      parseNum(
                        e
                          .target
                          .value
                      )
                    )
                  }
                  style={
                    input
                  }
                />
              </div>
            )
          )}
        </div>

        {/* QUICK BUTTONS */}
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
              display: "flex",
              gap: 10,
              flexWrap: "wrap"
            }}
          >
            {[
              0,
              50,
              100,
              150,
              200,
              300
            ].map(
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
          disabled={
            loading
          }
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
                "#dc2626",
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
        {/* SALARY THRESHOLD */}
          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <h3>
              What income may shift the outcome?
            </h3>

            <p
              style={{
                color: "#475569",
                lineHeight: 1.7,
                marginBottom: 0
              }}
            >
              {salaryNeeded
                ? salary >= salaryNeeded
                  ? `You may already be above a range where clearing the loan before write-off looks more achievable under these assumptions.`
                  : repaymentType === "borderline"
                  ? `Around ${money(salaryNeeded)} may be a range where full repayment becomes more realistic. That is about ${money(salaryNeeded - salary)} above your current salary.`
                  : `Around ${money(salaryNeeded)} may be a range where clearing the loan before write-off looks more achievable. That is about ${money(salaryNeeded - salary)} above your current salary.`
                : `This may require a very high sustained income under these assumptions.`}
          </p>
          </div>

          {/* MAIN RESULT */}
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
                  "#d1fae5",
                color:
                  "#065f46",
                fontSize: 12,
                fontWeight: 800,
                textTransform:
                  "uppercase"
              }}
            >
              Your likely direction
            </div>

            <h2
              style={{
                marginTop: 14,
                marginBottom: 8
              }}
            >
              {
                content.title
              }
            </h2>

            <p
              style={{
                lineHeight: 1.7,
                marginBottom: 0
              }}
            >
              {
                content.text
              }
            </p>
          </div>

          {/* DECISION CARD */}
          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <h3>
              Best fit today
            </h3>

            <p
              style={{
                fontWeight: 700,
                marginBottom: 8
              }}
            >
              {
                decisionCard.title
              }
            </p>

            <p
              style={{
                color:
                  "#475569",
                lineHeight: 1.7,
                marginBottom: 0
              }}
            >
              {
                decisionCard.text
              }
            </p>
          </div>

          {/* TRIGGER INSIGHT */}
          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <h3>
              Worth knowing
            </h3>

            <p
              style={{
                color:
                  "#475569",
                lineHeight: 1.7
              }}
            >
              {
                triggerInsight
              }
            </p>
          </div>

          {/* CURRENT INPUTS */}
          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <h3>
              Your numbers today
            </h3>

            <ul
              style={{
                paddingLeft: 18,
                color:
                  "#475569",
                lineHeight: 1.8,
                marginBottom: 0
              }}
            >
              <li>
                Automatic
                repayments:
                {" "}
                <strong>
                  {money(
                    payrollRepayment
                  )}
                  /year
                </strong>
              </li>

              <li>
                Loan write-off
                year:
                {" "}
                <strong>
                  {
                    writeOffYear
                  }
                </strong>
              </li>

              <li>
                {money(
                  monthlyAmount
                )}
                /month =
                {" "}
                <strong>
                  {money(
                    monthlyAmount *
                      12
                  )}
                  /year
                </strong>
              </li>
            </ul>
          </div>
          

          {/* WHAT MATTERS */}
            <div
              style={{
                ...whiteCard,
                marginTop: 18
              }}
            >
              <h3>
                Key drivers
              </h3>

              <ul
                style={{
                  paddingLeft: 18,
                  color: "#475569",
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

          {/* MINI SCENARIO */}
          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <h3>
              What{" "}
              {money(
                monthlyAmount
              )}
              /month could do instead
            </h3>

            <div
              style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 16
            }}
            >
              <div>
            <strong>
              Overpay loan
            </strong>

            <p
              style={{
                color: "#475569",
                lineHeight: 1.7
              }}
            >
              {money(monthlyAmount)}/month adds{" "}
              <strong>
                {money(monthlyAmount * 12)}
              </strong>{" "}
              per year toward the loan.

              {repaymentType === "full_repay"
                ? ` This may help reduce total cost or shorten repayment.`
                : repaymentType === "borderline"
                ? ` This could help if you are near the repayment line.`
                : ` Future earnings may still matter more than modest overpayments alone.`}
            </p>
          </div>

              <div>
                <strong>
                  Savings
                </strong>

                <p
                  style={{
                    color:
                      "#475569",
                    lineHeight: 1.7
                  }}
                >
                  Around{" "}
                  <strong>
                    {money(
                      savingsValue
                    )}
                  </strong>{" "}
                  in 5 years
                  using a simple
                  3% assumption.
                </p>
              </div>

              <div>
                <strong>
                  Investing
                </strong>

                <p
                  style={{
                    color:
                      "#475569",
                    lineHeight: 1.7
                  }}
                >
                  Around{" "}
                  <strong>
                    {money(
                      investingValue
                    )}
                  </strong>{" "}
                  in 5 years
                  using a simple
                  5% growth
                  assumption.
                </p>
              </div>
            </div>

            <p
              style={{
                marginTop: 14,
                fontSize: 14,
                color:
                  "#64748b",
                lineHeight: 1.7
              }}
            >
              Illustrative
              examples only.
              Real returns and
              loan outcomes vary.
            </p>
          </div>

          {/* HOW IT WORKS */}
          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <h3>
              How these estimates work            
            </h3>

            <p
              style={{
                color:
                  "#475569",
                lineHeight: 1.8
              }}
            >
              We use
              simplified UK
              student loan
              rules including:
              <br />
              • your plan
              threshold
              <br />
              • 9%
              repayments
              above threshold
              <br />
              • current
              balance entered
              <br />
              • estimated
              interest
              <br />
              • assumed
              future earnings
              growth
              <br />
              <br />
              Real
              repayments
              depend on
              changing
              salary,
              official
              rates and
              policy
              updates.
              <br />
              <br />
              For your
              exact balance
              or official
              figures, check
              the Student
              Loans Company.
            </p>
          </div>

          {/* EXTRA */}
          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <button
              style={
                ghostBtn
              }
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
                      "#475569",
                    lineHeight: 1.7
                  }}
                >
                  Revisiting this after salary changes can materially alter the picture.
                </p>

                <p
                  style={{
                    color:
                      "#475569",
                    lineHeight: 1.7
                  }}
                >
                  For many users, keeping flexible cash can be as valuable as faster repayment.
                </p>
              </div>
            )}
          </div>

          {/* FOOTER */}
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
                  "#64748b",
                lineHeight: 1.7,
                margin: 0
              }}
            >
              {
                wayliMessages.education.assumptions
              }
              <br />
              {
                wayliMessages.education.notAdvice
              }
            </p>
          </div>
        </>
      )}
    </div>
  );
}