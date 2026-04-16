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
  // PLAN RULES (2026)
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
    `£${Math.round(v || 0).toLocaleString()}`;

  const moneyK = (v) =>
    `£${Math.round(v / 1000)}k`;

  const getDefaultEndAge = (
    planKey,
    currentAge
  ) => {
    const p = plans[planKey];

    const naturalEndAge =
      p.defaultStartAge + p.years;

    return Math.max(
      currentAge + 1,
      naturalEndAge
    );
  };

  const getDifferenceText = (
    diff,
    age,
    direction
  ) => {
    const amount =
      Math.abs(diff);

    if (amount < 1000) {
      return `By age ${age}, both options are projected to finish very similarly (${money(
        amount
      )} apart).`;
    }

    if (direction === "Investing") {
      return `By age ${age}, investing is estimated to leave you ${money(
        amount
      )} better off.`;
    }

    if (
      direction ===
      "Overpaying"
    ) {
      return `By age ${age}, overpaying is estimated to leave you ${money(
        amount
      )} better off.`;
    }

    return `By age ${age}, outcomes are estimated to be similar.`;
  };

  // ---------------------------------
  // STATE
  // ---------------------------------
  const [tab, setTab] =
    useState("summary");

  const [salary, setSalary] =
    useState(40000);

  const [balance, setBalance] =
    useState(50000);

  const [overpay, setOverpay] =
    useState(100);

  const [currentAge, setCurrentAge] =
    useState(30);

  const [plan, setPlan] =
    useState("plan2");

  const [compareUntilAge, setCompareUntilAge] =
    useState(51);

  const [returnRate, setReturnRate] =
    useState(5);

  const [loanInterest, setLoanInterest] =
    useState(6);

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const selectedPlan =
    plans[plan];

  // ---------------------------------
  // AUTO DEFAULT END AGE
  // ---------------------------------
  useEffect(() => {
    setCompareUntilAge(
      getDefaultEndAge(
        plan,
        currentAge
      )
    );
  }, [plan, currentAge]);

  const comparisonYears =
    Math.max(
      1,
      compareUntilAge -
        currentAge
    );

  // ---------------------------------
  // STYLES
  // ---------------------------------
  const card = {
    background: "white",
    borderRadius: 18,
    padding: 18,
    border:
      "1px solid #e5e7eb",
    boxShadow:
      "0 8px 20px rgba(15,23,42,0.05)"
  };

  const input = {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border:
      "1px solid #d1d5db",
    marginTop: 6
  };

  const pill = (active) => ({
    padding:
      "10px 14px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    background: active
      ? "#10b981"
      : "#e5e7eb",
    color: active
      ? "white"
      : "#0f172a"
  });

  // ---------------------------------
  // MODEL CALL
  // ---------------------------------
  const runModel = async () => {
    setLoading(true);

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
            salary,
            loan_balance: balance,
            current_age:
              currentAge,
            retirement_age:
              compareUntilAge,
            monthly_savings: 200,
            overpay,
            return_rate:
              returnRate / 100,
            loan_interest:
              loanInterest / 100,
            write_off_years:
              selectedPlan.years,
            model_opportunity_cost: true
          })
        }
      );

      const data =
        await res.json();

      setResult(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // ---------------------------------
  // FRONTEND CALCS
  // ---------------------------------
  const threshold =
    selectedPlan.threshold;

  const monthlyRepayment =
    Math.max(
      0,
      (salary - threshold) *
        0.09
    ) / 12;

  const yearsToRepay =
    monthlyRepayment > 0
      ? balance /
        (monthlyRepayment * 12)
      : null;

  const repayLikely =
    yearsToRepay &&
    yearsToRepay <=
      selectedPlan.years;

  const requiredSalary =
    threshold +
    balance /
      selectedPlan.years /
      0.09;

  // ---------------------------------
  // MODEL DATA
  // ---------------------------------
  const ages =
    result?.curves?.ages ||
    [];

  const invest =
    result?.curves
      ?.invest_net_worth ||
    [];

  const overpayCurve =
    result?.curves
      ?.overpay_net_worth ||
    [];

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
        overpayCurve[i] ??
        0
    })
  );

  // ---------------------------------
  // UI
  // ---------------------------------
  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "0 auto"
      }}
    >
      {/* HEADER */}
      <div style={card}>
        <h2
          style={{
            margin: 0
          }}
        >
          Student Loan:
          Should I Overpay?
        </h2>

        <p
          style={{
            color:
              "#475569",
            marginTop: 8,
            lineHeight: 1.6
          }}
        >
          Compare
          overpaying your
          loan with
          investing the
          same money.
          Built for UK
          student loan
          plans.
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
            gap: 14
          }}
        >
          <div>
            <label>
              Loan Plan
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

          <div>
            <label>
              Salary (£)
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e) =>
                setSalary(
                  Number(
                    e.target.value
                  )
                )
              }
              style={input}
            />
          </div>

          <div>
            <label>
              Balance (£)
            </label>
            <input
              type="number"
              value={balance}
              onChange={(e) =>
                setBalance(
                  Number(
                    e.target.value
                  )
                )
              }
              style={input}
            />
          </div>

          <div>
            <label>
              Overpay / month (£)
            </label>
            <input
              type="number"
              value={overpay}
              onChange={(e) =>
                setOverpay(
                  Number(
                    e.target.value
                  )
                )
              }
              style={input}
            />
          </div>

          <div>
            <label>
              Current Age
            </label>
            <input
              type="number"
              value={
                currentAge
              }
              onChange={(e) =>
                setCurrentAge(
                  Number(
                    e.target.value
                  )
                )
              }
              style={input}
            />
          </div>

          <div>
            <label>
              Compare Until Age
            </label>
            <input
              type="number"
              value={
                compareUntilAge
              }
              onChange={(e) =>
                setCompareUntilAge(
                  Number(
                    e.target.value
                  )
                )
              }
              style={input}
            />
            <div
              style={{
                fontSize: 12,
                color:
                  "#64748b",
                marginTop: 4
              }}
            >
              {
                comparisonYears
              }{" "}
              year
              comparison
            </div>
          </div>

          <div>
            <label>
              Investment Return (%)
            </label>
            <input
              type="number"
              value={
                returnRate
              }
              onChange={(e) =>
                setReturnRate(
                  Number(
                    e.target.value
                  )
                )
              }
              style={input}
            />
          </div>

          <div>
            <label>
              Loan Interest (%)
            </label>
            <input
              type="number"
              value={
                loanInterest
              }
              onChange={(e) =>
                setLoanInterest(
                  Number(
                    e.target.value
                  )
                )
              }
              style={input}
            />
          </div>
        </div>

        {/* SNAPSHOT */}
        <div
          style={{
            marginTop: 16,
            padding: 14,
            background:
              "#f8fafc",
            borderRadius: 12
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
            • Repayments
            start above{" "}
            {money(
              threshold
            )}
            <br />
            • 9% of income
            above threshold
            <br />
            • Typical
            write-off after{" "}
            {
              selectedPlan.years
            }{" "}
            years
            <br />
            • Typical
            repayments may
            begin around age{" "}
            {
              selectedPlan.defaultStartAge
            }
            <br />
            • Loan may end
            around age{" "}
            {getDefaultEndAge(
              plan,
              currentAge
            )}
            <br />
            • Interest
            assumption:{" "}
            {
              loanInterest
            }
            %
          </div>
        </div>

        <button
          onClick={
            runModel
          }
          style={{
            marginTop: 18,
            padding:
              "14px 18px",
            border:
              "none",
            borderRadius: 12,
            background:
              "#10b981",
            color:
              "white",
            fontWeight: 700,
            cursor:
              "pointer"
          }}
        >
          {loading
            ? "Comparing..."
            : "Run Comparison"}
        </button>
      </div>

      {/* RESULTS */}
      {result && (
        <>
          {/* TABS */}
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
            <button
              style={pill(
                tab ===
                  "summary"
              )}
              onClick={() =>
                setTab(
                  "summary"
                )
              }
            >
              Summary
            </button>

            <button
              style={pill(
                tab ===
                  "journey"
              )}
              onClick={() =>
                setTab(
                  "journey"
                )
              }
            >
              Journey
            </button>

            <button
              style={pill(
                tab ===
                  "method"
              )}
              onClick={() =>
                setTab(
                  "method"
                )
              }
            >
              Method
            </button>
          </div>

          {/* SUMMARY */}
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

              <ul>
                <li>
                  You begin
                  repayments
                  above{" "}
                  {money(
                    threshold
                  )}
                </li>

                <li>
                  Current
                  repayments:
                  around{" "}
                  {money(
                    monthlyRepayment
                  )}
                  /month
                </li>

                <li>
                  {repayLikely
                    ? "At a similar income, repayment may happen before write-off."
                    : "At a similar income, full repayment may be unlikely before write-off."}
                </li>

                <li>
                  Comparison
                  runs until
                  around age{" "}
                  {
                    compareUntilAge
                  }
                </li>

                <li>
                  Illustrative
                  salary to
                  clear within{" "}
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
                appears
                stronger
                based on
                these
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

              <hr />

              <h3>
                When
                overpaying
                matters
              </h3>

              <p>
                {salary <
                requiredSalary *
                  0.9
                  ? "You appear below the key zone where overpaying often has the biggest effect."
                  : salary <=
                    requiredSalary *
                      1.1
                  ? "You appear near the key decision zone where comparing both routes is especially worthwhile."
                  : "You appear in a stronger repayment zone where overpaying can become more valuable."}
              </p>
            </div>
          )}

          {/* JOURNEY */}
          {tab ===
            "journey" && (
            <div
              style={{
                ...card,
                marginTop: 16
              }}
            >
              <h3>
                Projected
                Financial
                Position
              </h3>

              <p
                style={{
                  color:
                    "#475569"
                }}
              >
                This chart
                compares your
                estimated
                overall
                financial
                position
                under each
                route — not
                remaining loan
                balance.
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

                  <YAxis
                    tickFormatter={
                      moneyK
                    }
                  />

                  <Tooltip
                    formatter={(
                      value
                    ) =>
                      `£${Math.round(
                        value
                      ).toLocaleString()}`
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

              <p
                style={{
                  marginTop: 12
                }}
              >
                {direction ===
                "Investing"
                  ? "Based on these assumptions, investing comes out ahead over time."
                  : direction ===
                    "Overpaying"
                  ? "Based on these assumptions, overpaying comes out ahead over time."
                  : "Based on these assumptions, outcomes are fairly close."}
              </p>
            </div>
          )}

          {/* METHOD */}
          {tab ===
            "method" && (
            <div
              style={{
                ...card,
                marginTop: 16
              }}
            >
              <h3>
                How this
                works
              </h3>

              <p>
                We compare
                two routes:
              </p>

              <p>
                1. Overpay
                your loan
              </p>

              <p>
                2. Invest
                the same
                monthly
                amount
              </p>

              <p>
                The default
                comparison
                end age is
                based on a
                typical loan
                timeline for
                your plan.
                You can edit
                it anytime.
              </p>

              <p>
                This tool is
                for
                educational
                purposes and
                scenario
                exploration.
                It is not
                personal
                financial
                advice.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}