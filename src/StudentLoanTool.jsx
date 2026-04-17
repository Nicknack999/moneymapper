import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

export default function StudentLoanTool() {
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://moneymapper-backend-018g.onrender.com";

  // ---------------------------------
  // UK PLAN RULES (2026)
  // ---------------------------------
  const plans = {
    plan1: {
      name: "Plan 1",
      threshold: 26065,
      years: 25,
      defaultStartAge: 21
    },
    plan2: {
      name: "Plan 2",
      threshold: 27295,
      years: 30,
      defaultStartAge: 21
    },
    plan5: {
      name: "Plan 5",
      threshold: 25000,
      years: 40,
      defaultStartAge: 21
    },
    pg: {
      name: "Postgraduate",
      threshold: 21000,
      years: 30,
      defaultStartAge: 24
    }
  };

  // ---------------------------------
  // HELPERS
  // ---------------------------------
  const money = (v) =>
    `£${Math.round(Number(v || 0)).toLocaleString()}`;

  const moneyK = (v) =>
    `£${Math.round(Number(v || 0) / 1000)}k`;

  const parseNum = (value) =>
    value === "" ? "" : Number(value);

  const getDefaultEndAge = (planKey, age) => {
    const selected = plans[planKey];
    const current = Number(age || 0);

    return Math.max(
      current + 1,
      selected.defaultStartAge + selected.years
    );
  };

  const getDifferenceText = (
    diff,
    age,
    direction
  ) => {
    const amount = Math.abs(diff);

    if (amount < 1000) {
      return `By age ${age}, both routes are projected to finish similarly (${money(
        amount
      )} apart).`;
    }

    if (direction === "Investing") {
      return `By age ${age}, investing is projected to leave you ${money(
        amount
      )} better off.`;
    }

    if (direction === "Overpaying") {
      return `By age ${age}, overpaying is projected to leave you ${money(
        amount
      )} better off.`;
    }

    return `By age ${age}, both routes look similar.`;
  };

  // ---------------------------------
  // STATE
  // ---------------------------------
  const [tab, setTab] =
    useState("summary");
  const [loading, setLoading] =
    useState(false);
  const [error, setError] =
    useState("");
  const [result, setResult] =
    useState(null);

  const [plan, setPlan] =
    useState("plan2");
  const [salary, setSalary] =
    useState(40000);
  const [balance, setBalance] =
    useState(50000);
  const [overpay, setOverpay] =
    useState(100);
  const [currentAge, setCurrentAge] =
    useState(30);
  const [
    compareUntilAge,
    setCompareUntilAge
  ] = useState(51);
  const [returnRate, setReturnRate] =
    useState(5);
  const [
    loanInterest,
    setLoanInterest
  ] = useState(6);

  const selectedPlan =
    plans[plan];

  // ---------------------------------
  // AUTO END AGE
  // only updates when plan changes
  // or when compare age is blank
  // ---------------------------------
  useEffect(() => {
    if (
      compareUntilAge === "" ||
      compareUntilAge === null
    ) {
      setCompareUntilAge(
        getDefaultEndAge(
          plan,
          currentAge
        )
      );
    }
  }, [plan]);

  const comparisonYears =
    Math.max(
      1,
      Number(compareUntilAge || 0) -
        Number(currentAge || 0)
    );

  // ---------------------------------
  // INPUT VALIDATION
  // ---------------------------------
  const canRun =
    salary !== "" &&
    balance !== "" &&
    overpay !== "" &&
    currentAge !== "" &&
    compareUntilAge !== "" &&
    returnRate !== "" &&
    loanInterest !== "";

  // ---------------------------------
  // FRONTEND CALCS
  // ---------------------------------
  const threshold =
    selectedPlan.threshold;

  const monthlyRepayment =
    Math.max(
      0,
      (Number(salary || 0) -
        threshold) *
        0.09
    ) / 12;

  const yearsToRepay =
    monthlyRepayment > 0
      ? Number(balance || 0) /
        (monthlyRepayment * 12)
      : null;

  const repayLikely =
    yearsToRepay !== null &&
    yearsToRepay <=
      selectedPlan.years;

  const requiredSalary =
    threshold +
    Number(balance || 0) /
      selectedPlan.years /
      0.09;

  // ---------------------------------
  // MODEL CALL
  // ---------------------------------
  const runModel = async () => {
    if (!canRun || loading) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(
        `${API_URL}/full-model`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            salary:
              Number(salary),
            loan_balance:
              Number(balance),
            current_age:
              Number(currentAge),
            retirement_age:
              Number(
                compareUntilAge
              ),
            monthly_savings: 200,
            overpay:
              Number(overpay),
            return_rate:
              Number(
                returnRate
              ) / 100,
            loan_interest:
              Number(
                loanInterest
              ) / 100,
            write_off_years:
              selectedPlan.years,
            model_opportunity_cost: true
          })
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      const data =
        await res.json();

      setResult(data);
      setTab("summary");
    } catch (err) {
      setError(
        "We couldn't load your comparison right now."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------
  // RESULT DATA
  // ---------------------------------
  const ages =
    result?.curves?.ages || [];

  const invest =
    result?.curves
      ?.invest_net_worth || [];

  const overpayCurve =
    result?.curves
      ?.overpay_net_worth || [];

  const wealthDiff =
    result?.insights
      ?.wealth_difference ??
    null;

  const direction =
    wealthDiff === null
      ? "Either route"
      : wealthDiff < 0
      ? "Investing"
      : "Overpaying";

  const chartData = ages.map(
    (age, i) => ({
      age,
      invest:
        invest[i] ?? 0,
      overpay:
        overpayCurve[i] ?? 0
    })
  );

  // ---------------------------------
  // STYLES
  // ---------------------------------
  const card = {
    background: "white",
    borderRadius: 18,
    padding: 20,
    border:
      "1px solid #e5e7eb",
    boxShadow:
      "0 10px 24px rgba(15,23,42,0.05)"
  };

  const input = {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border:
      "1px solid #d1d5db",
    marginTop: 6,
    fontSize: 16
  };

  const label = {
    fontSize: 14,
    fontWeight: 600,
    color: "#0f172a"
  };

  const pill = (active) => ({
    padding:
      "10px 14px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    background: active
      ? "#10b981"
      : "#e5e7eb",
    color: active
      ? "white"
      : "#0f172a"
  });

  // ---------------------------------
  // UI
  // ---------------------------------
  return (
    <div
      style={{
        maxWidth: 1100,
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
            letterSpacing: 1,
            textTransform:
              "uppercase"
          }}
        >
          Wayli
        </div>

        <h1
          style={{
            marginTop: 8,
            marginBottom: 10,
            fontSize: 30
          }}
        >
          Student Loan Overpay vs Invest
        </h1>

        <p
          style={{
            color:
              "#475569",
            lineHeight: 1.7,
            margin: 0
          }}
        >
          Compare whether
          overpaying your UK
          student loan or
          investing the same
          money may leave you
          better off.
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
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 16
          }}
        >
          <div>
            <label style={label}>
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
              "Your salary (£)",
              salary,
              setSalary
            ],
            [
              "Current loan balance (£)",
              balance,
              setBalance
            ],
            [
              "Extra overpayment / month (£)",
              overpay,
              setOverpay
            ],
            [
              "Current age",
              currentAge,
              setCurrentAge
            ],
            [
              "Compare until age",
              compareUntilAge,
              setCompareUntilAge
            ],
            [
              "Investment return (%)",
              returnRate,
              setReturnRate
            ],
            [
              "Loan interest (%)",
              loanInterest,
              setLoanInterest
            ]
          ].map(
            ([
              labelText,
              value,
              setter
            ]) => (
              <div
                key={
                  labelText
                }
              >
                <label
                  style={
                    label
                  }
                >
                  {
                    labelText
                  }
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(
                    e
                  ) =>
                    setter(
                      parseNum(
                        e.target
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

        <div
          style={{
            fontSize: 12,
            color:
              "#64748b",
            marginTop: 8
          }}
        >
          {comparisonYears} year
          comparison
        </div>

        {/* Snapshot */}
        <div
          style={{
            marginTop: 18,
            padding: 16,
            background:
              "#f8fafc",
            borderRadius: 14
          }}
        >
          <strong>
            {
              selectedPlan.name
            }{" "}
            assumptions
          </strong>

          <div
            style={{
              marginTop: 8,
              color:
                "#475569",
              lineHeight: 1.8
            }}
          >
            • Repayments start
            above{" "}
            {money(
              threshold
            )}
            <br />
            • 9% of income
            above threshold
            <br />
            • Typical write-off
            after{" "}
            {
              selectedPlan.years
            }{" "}
            years
            <br />
            • Illustrative loan
            end age:{" "}
            {getDefaultEndAge(
              plan,
              currentAge
            )}
          </div>
        </div>

        <button
          onClick={
            runModel
          }
          disabled={
            !canRun ||
            loading
          }
          style={{
            marginTop: 18,
            padding:
              "14px 18px",
            border:
              "none",
            borderRadius: 14,
            background:
              !canRun ||
              loading
                ? "#94a3b8"
                : "#10b981",
            color:
              "white",
            fontWeight: 700,
            fontSize: 16,
            cursor:
              !canRun ||
              loading
                ? "not-allowed"
                : "pointer",
            width: "100%"
          }}
        >
          {loading
            ? "Comparing options..."
            : "Compare My Options"}
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
          <div
            style={{
              display:
                "flex",
              gap: 10,
              flexWrap:
                "wrap",
              marginTop: 18
            }}
          >
            {[
              "summary",
              "chart",
              "method"
            ].map(
              (name) => (
                <button
                  key={
                    name
                  }
                  style={pill(
                    tab ===
                      name
                  )}
                  onClick={() =>
                    setTab(
                      name
                    )
                  }
                >
                  {name ===
                  "summary"
                    ? "Summary"
                    : name ===
                      "chart"
                    ? "Comparison Chart"
                    : "How It Works"}
                </button>
              )
            )}
          </div>

          {tab ===
            "summary" && (
            <div
              style={{
                ...card,
                marginTop: 16
              }}
            >
              <h3>
                Your repayment
                picture
              </h3>

              <ul
                style={{
                  lineHeight: 1.8,
                  color:
                    "#334155"
                }}
              >
                <li>
                  Current
                  repayments
                  around{" "}
                  {money(
                    monthlyRepayment
                  )}{" "}
                  / month
                </li>
                <li>
                  {repayLikely
                    ? "At a similar income, full repayment may happen before write-off."
                    : "At a similar income, full repayment before write-off may be less likely."}
                </li>
                <li>
                  Comparison
                  runs until age{" "}
                  {
                    compareUntilAge
                  }
                </li>
                <li>
                  Estimated
                  salary to
                  clear in{" "}
                  {
                    selectedPlan.years
                  }{" "}
                  years:{" "}
                  {money(
                    requiredSalary
                  )}
                </li>
              </ul>

              <hr />

              <h3>
                What this
                suggests
              </h3>

              <p>
                <strong>
                  {
                    direction
                  }
                </strong>{" "}
                looks stronger
                based on these
                assumptions.
              </p>

              {wealthDiff !==
                null && (
                <p>
                  {getDifferenceText(
                    wealthDiff,
                    compareUntilAge,
                    direction
                  )}
                </p>
              )}
            </div>
          )}

          {tab ===
            "chart" && (
            <div
              style={{
                ...card,
                marginTop: 16
              }}
            >
              <h3>
                Projected
                financial
                position
              </h3>

              <p
                style={{
                  color:
                    "#475569"
                }}
              >
                This compares
                estimated
                overall wealth
                under each
                route.
              </p>

              <ResponsiveContainer
                width="100%"
                height={360}
              >
                <LineChart
                  data={
                    chartData
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis tickFormatter={moneyK} />
                  <Tooltip
                    formatter={(
                      value
                    ) =>
                      money(
                        value
                      )
                    }
                  />
                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="invest"
                    stroke="#10b981"
                    strokeWidth={
                      3
                    }
                    dot={
                      false
                    }
                    name="Invest route"
                  />

                  <Line
                    type="monotone"
                    dataKey="overpay"
                    stroke="#2563eb"
                    strokeWidth={
                      3
                    }
                    dot={
                      false
                    }
                    name="Overpay route"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {tab ===
            "method" && (
            <div
              style={{
                ...card,
                marginTop: 16
              }}
            >
              <h3>
                How this works
              </h3>

              <p>
                We compare two
                routes:
              </p>

              <p>
                1. Overpay your
                student loan
              </p>

              <p>
                2. Invest the
                same monthly
                amount
              </p>

              <p>
                Results are
                scenario
                estimates, not
                personal
                financial
                advice.
              </p>

              <p>
                Built by Wayli
                to help you make
                clearer money
                decisions.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}