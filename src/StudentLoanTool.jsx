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
    result?.summary?.winner_label ||
    "No result yet";

  const winnerGap =
    result?.summary?.winner_difference || 0;

  // Correct ranking: map sorted strategy keys to their true values
  const ranking =
    result?.summary?.ranking?.map((key) => {
      const labels = {
        minimum: "Minimum repayments only",
        overpay: "Overpay monthly",
        invest: "Invest monthly"
      };

      const values = {
        minimum:
          result?.summary?.minimum_final || 0,
        overpay:
          result?.summary?.overpay_final || 0,
        invest:
          result?.summary?.invest_final || 0
      };

      return {
        label: labels[key] || key,
        value: values[key] || 0
      };
    }) || [];

  const summaryText =
    result?.insights?.explanation || "";

  const chartData =
    result?.curves?.ages?.map((age, i) => ({
      age,

      minimum:
        result?.curves?.minimum_net_worth?.[i] || 0,

      overpay:
        result?.curves?.overpay_net_worth?.[i] || 0,

      invest:
        result?.curves?.invest_net_worth?.[i] || 0
   })) || [];
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

      // =====================================
// PREMIUM RESULTS V2 JSX
// Replace your current {result && ( ... )}
// results block with this
// =====================================

{result && (() => {
  const closeResult =
    result?.insights?.close_result;

  const explanation =
    result?.insights?.explanation || "";

  const repaymentType =
    result?.decision?.repayment_outcome?.type || "";

  const winnerName =
    winner || "No result";

  const confidenceLabel =
    closeResult
      ? "Medium"
      : winnerGap > 15000
      ? "High"
      : "Moderate";

  const confidenceColor =
    closeResult
      ? "#f59e0b"
      : "#10b981";

  const scenarioShift = [];

  if (repaymentType === "full_repay") {
    scenarioShift.push(
      "If your loan is likely to be fully repaid, extra repayments can become more valuable."
    );
  }

  if (repaymentType === "borderline") {
    scenarioShift.push(
      "This appears close to the point where future salary growth could materially change the result."
    );
  }

  scenarioShift.push(
    "Lower investment returns would reduce the advantage of investing."
  );

  scenarioShift.push(
    "Personal preference for certainty or flexibility may also matter."
  );

  return (
    <>
      {/* HERO VERDICT */}
      <div
        style={{
          ...card,
          marginTop: 18,
          background: "#ecfdf5",
          border: "1px solid #bbf7d0"
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#065f46",
            textTransform: "uppercase",
            letterSpacing: 0.6
          }}
        >
          Strongest projected outcome
        </div>

        <h2 style={{ marginTop: 8, marginBottom: 8 }}>
          {winnerName}
        </h2>

        <p
          style={{
            margin: 0,
            color: "#065f46",
            lineHeight: 1.6
          }}
        >
          Based on the figures entered, this route currently projects
          the strongest overall financial position by age {compareAge}.
        </p>

        <div
          style={{
            marginTop: 14,
            fontSize: 22,
            fontWeight: 800,
            color: "#065f46"
          }}
        >
          {money(winnerGap)} ahead
        </div>

        <p
          style={{
            marginTop: 4,
            marginBottom: 0,
            color: "#065f46"
          }}
        >
          Estimated lead over the next closest option under these assumptions.
        </p>

        <div
          style={{
            marginTop: 14,
            display: "inline-block",
            padding: "8px 12px",
            borderRadius: 999,
            background: "#ffffff",
            border: `1px solid ${confidenceColor}`,
            fontWeight: 700,
            color: confidenceColor
          }}
        >
          Confidence: {confidenceLabel}
        </div>
      </div>

      {/* WHY THIS MAY BE HAPPENING */}
      <div style={{ ...card, marginTop: 18 }}>
        <h3 style={{ marginTop: 0 }}>
          Why this may be happening
        </h3>

        <p
          style={{
            color: "#334155",
            lineHeight: 1.7
          }}
        >
          {explanation}
        </p>

        {repaymentType === "write_off" && (
          <p style={{ color: "#475569", lineHeight: 1.7 }}>
            If some balance may remain until write-off, extra repayments can
            sometimes deliver less value than expected.
          </p>
        )}

        {repaymentType === "full_repay" && (
          <p style={{ color: "#475569", lineHeight: 1.7 }}>
            Where a loan is likely to be fully repaid, reducing interest and
            clearing the balance earlier can become more competitive.
          </p>
        )}

        {repaymentType === "borderline" && (
          <p style={{ color: "#475569", lineHeight: 1.7 }}>
            This appears relatively sensitive to future income growth and rates,
            so small changes may alter the outcome.
          </p>
        )}
      </div>

      {/* WHAT COULD CHANGE RESULT */}
      <div style={{ ...card, marginTop: 18 }}>
        <h3 style={{ marginTop: 0 }}>
          What could change the result
        </h3>

        <div
          style={{
            display: "grid",
            gap: 10
          }}
        >
          {scenarioShift.map((item, i) => (
            <div
              key={i}
              style={{
                padding: 12,
                borderRadius: 12,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                color: "#334155"
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* COMPARE OPTIONS */}
      <div style={{ ...card, marginTop: 18 }}>
        <h3 style={{ marginTop: 0 }}>
          How each route compares
        </h3>

        {ranking.map((item, i) => (
          <div
            key={item.label}
            style={{
              padding: "14px 0",
              borderBottom:
                i < ranking.length - 1
                  ? "1px solid #f1f5f9"
                  : "none"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12
              }}
            >
              <strong>
                {i + 1}. {item.label}
              </strong>

              <span style={{ fontWeight: 700 }}>
                {moneyShort(item.value)}
              </span>
            </div>

            <div
              style={{
                marginTop: 6,
                color: "#64748b",
                fontSize: 14
              }}
            >
              {item.label === "Invest monthly" &&
                "Higher projected long-term growth in this example."}

              {item.label === "Minimum repayments only" &&
                "Keeps flexibility and preserves monthly cash flow."}

              {item.label === "Overpay monthly" &&
                "Reduces debt sooner and may feel lower risk."}
            </div>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div style={{ ...card, marginTop: 18 }}>
        <h3>
          Projected overall financial position
        </h3>

        <p style={{ color: "#475569" }}>
          This chart illustrates how each route may develop over time using
          your assumptions.
        </p>

        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" />
            <YAxis tickFormatter={moneyShort} />
            <Tooltip content={<CustomTooltip />} />
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

      {/* FOOTER */}
      <div
        style={{
          ...card,
          marginTop: 18,
          textAlign: "center"
        }}
      >
        <h3>Important context</h3>

        <p
          style={{
            color: "#475569",
            lineHeight: 1.7,
            maxWidth: 760,
            margin: "0 auto"
          }}
        >
          This tool is an educational scenario comparison based on simplified
          assumptions. It is not personal financial advice. Real outcomes depend
          on future earnings, rates, tax treatment, investment performance and
          policy changes.
        </p>
      </div>
    </>
  );
})()}