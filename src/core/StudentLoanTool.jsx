import { useState } from "react";

export default function StudentLoanTool() {
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://api.wayli.uk";

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const [plan, setPlan] = useState("plan2");
  const [salary, setSalary] = useState(42000);
  const [balance, setBalance] = useState(48000);
  const [age, setAge] = useState(30);
  const [monthlyOverpay, setMonthlyOverpay] =
    useState(100);

  const [showMore, setShowMore] =
    useState(false);

  const selectedPlan = plans[plan];

  const money = (v) =>
    `£${Math.round(
      Number(v || 0)
    ).toLocaleString()}`;

  const card = {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 18,
    padding: 22,
    boxShadow:
      "0 8px 24px rgba(15,23,42,0.06)"
  };

  const input = {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "1px solid #d1d5db",
    marginTop: 6,
    fontSize: 16
  };

  const button = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 14,
    border: "none",
    background: "#10b981",
    color: "white",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer"
  };

  const muted = {
    color: "#64748b",
    lineHeight: 1.7
  };

  const runTool = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = {
        plan: plan,
        salary: Number(salary),
        loan_balance: Number(balance),
        current_age: Number(age),
        retirement_age: 60,
        overpay: Number(monthlyOverpay),
        monthly_savings: Number(monthlyOverpay),
        threshold: selectedPlan.threshold,
        write_off_years: selectedPlan.years,
        return_rate: 0.05,
        loan_interest: 0.06,
        model_opportunity_cost: true
      };

      const res = await fetch(
        `${API_URL}/full-model`,
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

      if (!res.ok) throw new Error();

      const data = await res.json();
      setResult(data);
    } catch {
      setError(
        "We couldn't run your comparison right now."
      );
    } finally {
      setLoading(false);
    }
  };

  const salaryNum = Number(salary);
  const balanceNum = Number(balance);
  const overpayNum =
    Number(monthlyOverpay);

  const yearlyPayrollRepayment =
    Math.max(
      0,
      (salaryNum -
        selectedPlan.threshold) *
        0.09
    );

  const yearlyExtra =
    overpayNum * 12;

  // ---------------------------------
  // PLAN-AWARE CLASSIFICATION
  // ---------------------------------
  const classifyUser = () => {
    const aboveThreshold =
      salaryNum -
      selectedPlan.threshold;

    // PLAN 1
    if (plan === "plan1") {
      if (
        balanceNum < 20000 &&
        salaryNum > 32000
      )
        return "full_repay";

      if (
        balanceNum > 40000 &&
        salaryNum < 32000
      )
        return "write_off";

      return "borderline";
    }

    // PLAN 2
    if (plan === "plan2") {
      if (
        balanceNum > 70000 &&
        salaryNum < 38000
      )
        return "write_off";

      if (
        balanceNum < 45000 &&
        salaryNum > 42000
      )
        return "full_repay";

      if (
        aboveThreshold < 10000 &&
        balanceNum > 50000
      )
        return "borderline";

      if (
        salaryNum > 55000
      )
        return "full_repay";

      return "borderline";
    }

    // PLAN 5
    if (plan === "plan5") {
      if (
        salaryNum < 32000 &&
        balanceNum > 50000
      )
        return "write_off";

      if (
        salaryNum > 60000
      )
        return "full_repay";

      return "borderline";
    }

    // POSTGRAD
    if (plan === "pg") {
      if (
        salaryNum > 45000
      )
        return "full_repay";

      if (
        salaryNum < 28000 &&
        balanceNum > 25000
      )
        return "write_off";

      return "borderline";
    }

    return "borderline";
  };

  const repaymentType =
    classifyUser();

  const salaryNeeded =
    result?.break_even_salary ||
    result?.insights
      ?.break_even_salary ||
    null;

  const outlook = () => {
    if (
      repaymentType ===
      "write_off"
    ) {
      return {
        title:
          "Write-off likely at current earnings",
        body:
          "At your current salary, full repayment looks unlikely under these assumptions."
      };
    }

    if (
      repaymentType ===
      "full_repay"
    ) {
      return {
        title:
          "Likely full repayment",
        body:
          "At your current salary, full repayment looks likely under these assumptions."
      };
    }

    return {
      title:
        "Outcome could go either way",
      body:
        "Future earnings and repayment choices may determine whether you clear the balance in time."
    };
  };

  const getWorthKnowing = () => {
    if (
      repaymentType ===
      "write_off"
    ) {
      return [
        salaryNeeded
          ? `You’d likely need earnings of around ${money(
              salaryNeeded
            )} to fully clear this loan within the term.`
          : null,
        "Overpayments may have lower long-term value if full repayment looks unlikely.",
        "Future pay rises could materially change the picture."
      ].filter(Boolean);
    }

    if (
      repaymentType ===
      "full_repay"
    ) {
      return [
        `You may already repay around ${money(
          yearlyPayrollRepayment
        )} a year automatically through payroll.`,
        `An extra ${money(
          overpayNum
        )}/month equals ${money(
          yearlyExtra
        )} extra each year.`,
        "Overpaying may reduce total interest and shorten the term."
      ];
    }

    return [
      salaryNeeded
        ? `Earnings of around ${money(
            salaryNeeded
          )} may improve your chances of clearing the balance in time.`
        : null,
      "Future salary growth may matter more than small overpayments.",
      `An extra ${money(
        overpayNum
      )}/month may still improve the outcome if sustained.`
    ].filter(Boolean);
  };

  const getOptions = () => {
    if (
      repaymentType ===
      "write_off"
    ) {
      return [
        {
          title:
            "Keep cash flexible",
          body:
            "May suit users prioritising emergency savings or near-term goals."
        },
        {
          title:
            "Save or invest elsewhere",
          body:
            "Could help build assets outside the student loan."
        },
        {
          title:
            "Review later if income rises",
          body:
            "Higher future earnings may change repayment outcomes."
        }
      ];
    }

    if (
      repaymentType ===
      "full_repay"
    ) {
      return [
        {
          title:
            "Overpay the loan",
          body:
            "Could reduce total cost and shorten repayments."
        },
        {
          title:
            "Invest elsewhere",
          body:
            "Could build assets, though returns are uncertain."
        },
        {
          title:
            "Keep flexibility",
          body:
            "Some users prefer accessible cash for goals or emergencies."
        }
      ];
    }

    return [
      {
        title:
          "Overpay modestly",
        body:
          "Could improve the picture if maintained consistently."
      },
      {
        title:
          "Wait and review later",
        body:
          "Future pay rises may change the best route."
      },
      {
        title:
          "Save or invest elsewhere",
        body:
          "Some users prefer flexibility while outcomes remain uncertain."
      }
    ];
  };

  const getExtra = () => {
    if (
      repaymentType ===
      "write_off"
    ) {
      return [
        "Some borrowers prefer flexibility over overpaying when full repayment looks unlikely.",
        "Rechecking after future salary rises can be worthwhile.",
        `Saving ${money(
          overpayNum
        )}/month equals ${money(
          yearlyExtra
        )} each year for other goals.`
      ];
    }

    if (
      repaymentType ===
      "full_repay"
    ) {
      return [
        "Clearing the balance sooner can reduce the total amount repaid.",
        "Some users still prefer investing if expected returns are higher.",
        `Saving ${money(
          overpayNum
        )}/month equals ${money(
          yearlyExtra
        )} each year.`
      ];
    }

    return [
      "Borderline outcomes often change with future earnings.",
      "Consistency can matter more than perfect timing.",
      `Saving ${money(
        overpayNum
      )}/month equals ${money(
        yearlyExtra
      )} each year.`
    ];
  };

  const worthKnowing =
    getWorthKnowing();

  const options =
    getOptions();

  const extra =
    getExtra();

  return (
    <div
      style={{
        maxWidth: 920,
        margin: "0 auto",
        padding: 16,
        background:
          "#f8fafc"
      }}
    >
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
            marginTop: 8
          }}
        >
          Should You Overpay Your Student Loan?
        </h1>

        <p style={muted}>
          Understand your options using UK loan plan rules.
          Compare overpaying, investing elsewhere,
          or keeping your cash flexible.
        </p>
      </div>

      {/* INPUTS */}
      <div
        style={{
          ...card,
          marginTop: 18
        }}
      >
        <div
          style={{
            display:
              "grid",
            gap: 16,
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))"
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

          <div>
            <label>
              Salary (£)
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e) =>
                setSalary(
                  e.target
                    .value
                )
              }
              style={input}
            />
          </div>

          <div>
            <label>
              Loan balance (£)
            </label>
            <input
              type="number"
              value={balance}
              onChange={(e) =>
                setBalance(
                  e.target
                    .value
                )
              }
              style={input}
            />
          </div>

          <div>
            <label>
              Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) =>
                setAge(
                  e.target
                    .value
                )
              }
              style={input}
            />
          </div>

          <div>
            <label>
              Monthly overpayment (£)
            </label>
            <input
              type="number"
              value={
                monthlyOverpay
              }
              onChange={(e) =>
                setMonthlyOverpay(
                  e.target
                    .value
                )
              }
              style={input}
            />
          </div>
        </div>

        <button
          style={{
            ...button,
            marginTop: 18
          }}
          onClick={runTool}
          disabled={loading}
        >
          {loading
            ? "Checking..."
            : "See My Options"}
        </button>

        <p
          style={{
            ...muted,
            fontSize: 14,
            marginTop: 10
          }}
        >
          Educational guidance using simplified assumptions.
        </p>

        {error && (
          <p
            style={{
              color:
                "#dc2626"
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
              ...card,
              marginTop: 18,
              background:
                "#ecfdf5",
              border:
                "1px solid #bbf7d0"
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color:
                  "#065f46"
              }}
            >
              Your current outlook
            </div>

            <h2>
              {outlook().title}
            </h2>

            <p
              style={{
                color:
                  "#065f46",
                lineHeight: 1.7
              }}
            >
              {outlook().body}
            </p>
          </div>

          <div
            style={{
              ...card,
              marginTop: 18
            }}
          >
            <h3>
              Worth knowing
            </h3>

            {worthKnowing.map(
              (
                item,
                i
              ) => (
                <p
                  key={i}
                  style={
                    muted
                  }
                >
                  {item}
                </p>
              )
            )}
          </div>

          <div
            style={{
              ...card,
              marginTop: 18
            }}
          >
            <h3>
              Your main options
            </h3>

            {options.map(
              (
                item,
                i
              ) => (
                <div
                  key={i}
                  style={{
                    marginTop: 14
                  }}
                >
                  <strong>
                    {
                      item.title
                    }
                  </strong>

                  <p
                    style={
                      muted
                    }
                  >
                    {
                      item.body
                    }
                  </p>
                </div>
              )
            )}
          </div>

          <div
            style={{
              ...card,
              marginTop: 18
            }}
          >
            <button
              onClick={() =>
                setShowMore(
                  !showMore
                )
              }
              style={{
                background:
                  "none",
                border:
                  "none",
                padding: 0,
                fontSize: 18,
                fontWeight: 700,
                cursor:
                  "pointer"
              }}
            >
              {showMore
                ? "Hide extra insights ▲"
                : "Show extra insights ▼"}
            </button>

            {showMore && (
              <div
                style={{
                  marginTop: 16
                }}
              >
                {extra.map(
                  (
                    item,
                    i
                  ) => (
                    <p
                      key={
                        i
                      }
                      style={
                        muted
                      }
                    >
                      {item}
                    </p>
                  )
                )}
              </div>
            )}
          </div>

          <div
            style={{
              ...card,
              marginTop: 18,
              textAlign:
                "center"
            }}
          >
            <p
              style={{
                ...muted,
                margin: 0
              }}
            >
              This tool is for education only and does not
              provide regulated financial advice.
              Real outcomes depend on earnings,
              rates, policy changes and personal circumstances.
            </p>
          </div>
        </>
      )}
    </div>
  );
}