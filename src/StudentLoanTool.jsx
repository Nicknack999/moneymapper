import { useState } from "react";
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
  // PLAN RULES (UK)
  // ---------------------------------
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

  // ---------------------------------
  // HELPERS
  // ---------------------------------
  const money = (v) =>
    `£${Math.round(Number(v || 0)).toLocaleString()}`;

  const moneyShort = (v) => {
    const n = Number(v || 0);

    if (Math.abs(n) >= 1000000) {
      return `£${(n / 1000000).toFixed(1)}m`;
    }

    if (Math.abs(n) >= 1000) {
      return `£${Math.round(n / 1000)}k`;
    }

    return money(n);
  };

  const parseNum = (v) =>
    v === "" ? "" : Number(v);

  const card = {
    background: "white",
    borderRadius: 18,
    padding: 20,
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 10px 24px rgba(15,23,42,0.05)"
  };

  const input = {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "1px solid #d1d5db",
    marginTop: 6,
    fontSize: 16
  };

  const label = {
    fontSize: 14,
    fontWeight: 600,
    color: "#0f172a"
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

  // ---------------------------------
  // STATE
  // ---------------------------------
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

  const [monthlyAmount, setMonthlyAmount] =
    useState(100);

  const [currentAge, setCurrentAge] =
    useState(30);

  const [compareAge, setCompareAge] =
    useState(60);

  const [returnRate, setReturnRate] =
    useState(5);

  const [loanInterest, setLoanInterest] =
    useState(6);

  const selectedPlan =
    plans[plan];

  // ---------------------------------
  // API
  // ---------------------------------
  const runModel = async () => {
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
              Number(compareAge),
            monthly_savings:
              Number(monthlyAmount),
            overpay:
              Number(monthlyAmount),
            return_rate:
              Number(returnRate) / 100,
            loan_interest:
              Number(loanInterest) / 100,
            threshold:
              selectedPlan.threshold,
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
    } catch (err) {
      setError(
        "We couldn't run your comparison right now."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------
  // RESULT HELPERS
  // ---------------------------------
  const winner =
    result?.winner_label ||
    "No result yet";

  const winnerGap =
    result?.winner_gap || 0;

  const ranking =
    result?.ranking || [];

  const chartData =
    result?.chart || [];

  const summaryText =
    result?.summary_text || "";

  // ---------------------------------
  // TOOLTIP
  // ---------------------------------
  const CustomTooltip = ({
    active,
    payload,
    label
  }) => {
    if (
      active &&
      payload &&
      payload.length
    ) {
      return (
        <div
          style={{
            background: "white",
            border:
              "1px solid #e5e7eb",
            padding: 12,
            borderRadius: 12
          }}
        >
          <strong>
            Age {label}
          </strong>

          {payload.map((item) => (
            <div
              key={item.name}
              style={{
                marginTop: 6
              }}
            >
              {item.name}:{" "}
              {money(
                item.value
              )}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

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
          Student Loan Strategy Tool
        </h1>

        <p
          style={{
            color:
              "#475569",
            lineHeight: 1.7,
            margin: 0
          }}
        >
          Compare three common
          approaches using
          simplified UK student
          loan assumptions:
          pay minimum, overpay,
          or invest instead.
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
              "Monthly amount (£)",
              monthlyAmount,
              setMonthlyAmount
            ],
            [
              "Current age",
              currentAge,
              setCurrentAge
            ],
            [
              "Compare until age",
              compareAge,
              setCompareAge
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
              title,
              value,
              setter
            ]) => (
              <div key={title}>
                <label
                  style={
                    label
                  }
                >
                  {title}
                </label>

                <input
                  type="number"
                  value={value}
                  onChange={(e) =>
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

        <button
          onClick={runModel}
          disabled={loading}
          style={{
            ...button,
            marginTop: 18,
            opacity:
              loading
                ? 0.7
                : 1
          }}
        >
          {loading
            ? "Comparing..."
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
          {/* WINNER */}
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
                fontSize: 14,
                color:
                  "#065f46",
                fontWeight: 700
              }}
            >
              Highest projected
              outcome
            </div>

            <h2
              style={{
                marginTop: 8,
                marginBottom: 8
              }}
            >
              {winner}
            </h2>

            <p
              style={{
                margin: 0,
                color:
                  "#065f46"
              }}
            >
              Estimated to finish{" "}
              {money(
                winnerGap
              )} ahead of the
              next closest route
              by age{" "}
              {compareAge}.
            </p>
          </div>

          {/* RANKING */}
          <div
            style={{
              ...card,
              marginTop: 18
            }}
          >
            <h3>
              Strategy ranking
            </h3>

            {ranking.map(
              (
                item,
                i
              ) => (
                <div
                  key={
                    item.label
                  }
                  style={{
                    display:
                      "flex",
                    justifyContent:
                      "space-between",
                    padding:
                      "10px 0",
                    borderBottom:
                      i <
                      ranking.length -
                        1
                        ? "1px solid #f1f5f9"
                        : "none"
                  }}
                >
                  <strong>
                    {i + 1}.{" "}
                    {
                      item.label
                    }
                  </strong>

                  <span>
                    {moneyShort(
                      item.value
                    )}
                  </span>
                </div>
              )
            )}
          </div>

          {/* CHART */}
          <div
            style={{
              ...card,
              marginTop: 18
            }}
          >
            <h3>
              Projected overall
              financial position
            </h3>

            <p
              style={{
                color:
                  "#475569"
              }}
            >
              This chart shows
              estimated outcomes
              under each route
              using your inputs.
            </p>

            <ResponsiveContainer
              width="100%"
              height={380}
            >
              <LineChart
                data={chartData}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="age" />

                <YAxis
                  tickFormatter={
                    moneyShort
                  }
                />

                <Tooltip
                  content={
                    <CustomTooltip />
                  }
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="invest"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                  name="Invest monthly"
                />

                <Line
                  type="monotone"
                  dataKey="minimum"
                  stroke="#64748b"
                  strokeWidth={3}
                  dot={false}
                  name="Minimum repayments only"
                />

                <Line
                  type="monotone"
                  dataKey="overpay"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                  name="Overpay monthly"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* SUMMARY */}
          <div
            style={{
              ...card,
              marginTop: 18
            }}
          >
            <h3>
              What this may mean
            </h3>

            <p
              style={{
                color:
                  "#334155",
                lineHeight: 1.7
              }}
            >
              {summaryText}
            </p>

            <p
              style={{
                color:
                  "#64748b",
                fontSize: 14,
                marginTop: 14
              }}
            >
              This tool is for
              educational scenario
              comparison only and
              is not personal
              financial advice.
            </p>
          </div>

          {/* CTA */}
          <div
            style={{
              ...card,
              marginTop: 18,
              textAlign:
                "center"
            }}
          >
            <h3>
              Compare another
              scenario
            </h3>

            <p
              style={{
                color:
                  "#475569"
              }}
            >
              Try changing salary,
              age or monthly
              amount to see how
              outcomes shift.
            </p>
          </div>
        </>
      )}
    </div>
  );
}