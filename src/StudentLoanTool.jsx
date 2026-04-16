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

  // -----------------------------
  // STATE
  // -----------------------------
  const [tab, setTab] = useState("summary");

  const [salary, setSalary] = useState(40000);
  const [balance, setBalance] = useState(50000);
  const [overpay, setOverpay] = useState(100);

  const [currentAge, setCurrentAge] = useState(30);
  const [comparisonYears, setComparisonYears] = useState(30);

  const [returnRate, setReturnRate] = useState(5);
  const [loanInterest, setLoanInterest] = useState(6);

  const [plan, setPlan] = useState("plan2");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // -----------------------------
  // UK PLAN SETTINGS (2026)
  // -----------------------------
  const plans = {
    plan1: {
      name: "Plan 1",
      threshold: 26065,
      writeOffYears: 25
    },
    plan2: {
      name: "Plan 2",
      threshold: 27295,
      writeOffYears: 30
    },
    plan5: {
      name: "Plan 5",
      threshold: 25000,
      writeOffYears: 40
    },
    pg: {
      name: "Postgraduate",
      threshold: 21000,
      writeOffYears: 30
    }
  };

  const selectedPlan = plans[plan];
  const threshold = selectedPlan.threshold;

  // -----------------------------
  // HELPERS
  // -----------------------------
  const formatCurrency = (v) =>
    `£${Math.round(v || 0).toLocaleString()}`;

  const formatK = (v) => `£${Math.round(v / 1000)}k`;

  // -----------------------------
  // FETCH
  // -----------------------------
  const runModel = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/full-model`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          salary,
          loan_balance: balance,
          current_age: currentAge,
          retirement_age: currentAge + comparisonYears,
          monthly_savings: 200,
          overpay,
          return_rate: returnRate / 100,
          loan_interest: loanInterest / 100,
          write_off_years: selectedPlan.writeOffYears,
          model_opportunity_cost: true
        })
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // -----------------------------
  // SIMPLE CALCS
  // -----------------------------
  const monthlyRepayment =
    Math.max(0, (salary - threshold) * 0.09) / 12;

  const estimatedYears =
    monthlyRepayment > 0
      ? balance / (monthlyRepayment * 12)
      : null;

  const payoffAge = estimatedYears
    ? Math.round(currentAge + estimatedYears)
    : null;

  // -----------------------------
  // MODEL DATA
  // -----------------------------
  const ages = result?.curves?.ages || [];
  const invest =
    result?.curves?.invest_net_worth || [];
  const repay =
    result?.curves?.overpay_net_worth || [];

  const wealthDiff =
    result?.insights?.wealth_difference ?? null;

  const loanWrittenOff =
    result?.insights?.loan_written_off;

  const direction =
    wealthDiff === null
      ? "Either option"
      : wealthDiff < 0
      ? "Investing"
      : "Overpaying";

  const chartData = ages.map((age, i) => ({
    age,
    invest: invest[i] ?? 0,
    overpay: repay[i] ?? 0
  }));

  // -----------------------------
  // STYLES
  // -----------------------------
  const card = {
    background: "white",
    borderRadius: 16,
    padding: 18,
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 20px rgba(15,23,42,0.05)"
  };

  const inputStyle = {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #d1d5db",
    marginTop: 6
  };

  const tabButton = (active) => ({
    padding: "10px 14px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    background: active ? "#10b981" : "#e5e7eb",
    color: active ? "white" : "#0f172a",
    fontWeight: 600
  });

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      {/* HEADER */}
      <div style={card}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#0f172a"
          }}
        >
          Student Loan: Should I Overpay?
        </div>

        <div
          style={{
            marginTop: 8,
            color: "#475569",
            lineHeight: 1.6
          }}
        >
          Compare overpaying your loan with
          investing the same money. Built for UK
          student loan plans.
        </div>
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
            display: "grid",
            gap: 14,
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))"
          }}
        >
          <div>
            <label>Loan plan</label>
            <select
              value={plan}
              onChange={(e) =>
                setPlan(e.target.value)
              }
              style={inputStyle}
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
            <label>Salary (£)</label>
            <input
              type="number"
              value={salary}
              onChange={(e) =>
                setSalary(
                  Number(e.target.value)
                )
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>Loan balance (£)</label>
            <input
              type="number"
              value={balance}
              onChange={(e) =>
                setBalance(
                  Number(e.target.value)
                )
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>
              Monthly overpayment (£)
            </label>
            <input
              type="number"
              value={overpay}
              onChange={(e) =>
                setOverpay(
                  Number(e.target.value)
                )
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>Current age</label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) =>
                setCurrentAge(
                  Number(e.target.value)
                )
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>
              Comparison period (years)
            </label>
            <input
              type="number"
              value={comparisonYears}
              onChange={(e) =>
                setComparisonYears(
                  Number(e.target.value)
                )
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>
              Investment return (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={returnRate}
              onChange={(e) =>
                setReturnRate(
                  Number(e.target.value)
                )
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>
              Loan interest (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={loanInterest}
              onChange={(e) =>
                setLoanInterest(
                  Number(e.target.value)
                )
              }
              style={inputStyle}
            />
          </div>
        </div>

        <button
          onClick={runModel}
          style={{
            marginTop: 18,
            padding: "14px 18px",
            border: "none",
            borderRadius: 12,
            background: "#10b981",
            color: "white",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >
          {loading
            ? "Calculating..."
            : "Run Comparison"}
        </button>
      </div>

      {/* TABS */}
      {result && (
        <>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginTop: 18
            }}
          >
            <button
              style={tabButton(
                tab === "summary"
              )}
              onClick={() =>
                setTab("summary")
              }
            >
              Summary
            </button>

            <button
              style={tabButton(
                tab === "graph"
              )}
              onClick={() =>
                setTab("graph")
              }
            >
              Graph
            </button>

            <button
              style={tabButton(
                tab === "method"
              )}
              onClick={() =>
                setTab("method")
              }
            >
              How We Estimated This
            </button>

            <button
              style={tabButton(
                tab === "details"
              )}
              onClick={() =>
                setTab("details")
              }
            >
              Details
            </button>
          </div>

          {/* SUMMARY */}
          {tab === "summary" && (
            <div
              style={{
                ...card,
                marginTop: 16
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 22,
                  color: "#0f172a"
                }}
              >
                💡 What this suggests
              </div>

              <div
                style={{
                  marginTop: 10,
                  lineHeight: 1.7,
                  color: "#334155"
                }}
              >
                {direction} appears to lead to
                stronger long-term outcomes in
                this scenario.
              </div>

              {wealthDiff !== null && (
                <div
                  style={{
                    marginTop: 10,
                    color: "#334155"
                  }}
                >
                  Difference by end of period:
                  <strong>
                    {" "}
                    {formatCurrency(
                      Math.abs(wealthDiff)
                    )}
                  </strong>
                </div>
              )}

              <hr
                style={{
                  margin: "18px 0",
                  borderColor: "#f1f5f9"
                }}
              />

              <div
                style={{
                  fontWeight: 700
                }}
              >
                🧾 Your repayment picture
              </div>

              <ul
                style={{
                  marginTop: 10,
                  lineHeight: 1.8,
                  color: "#334155"
                }}
              >
                <li>
                  You begin repayments above{" "}
                  {formatCurrency(
                    threshold
                  )}
                </li>

                <li>
                  At your current salary, you
                  repay around{" "}
                  {formatCurrency(
                    monthlyRepayment
                  )}
                  /month
                </li>

                {estimatedYears && (
                  <li>
                    At this rate, repayment
                    would take around{" "}
                    {Math.round(
                      estimatedYears
                    )}{" "}
                    years (around age{" "}
                    {payoffAge})
                  </li>
                )}

                <li>
                  {loanWrittenOff
                    ? "Your model suggests the balance may be written off before full repayment."
                    : "Your model suggests the balance is likely to be repaid in full."}
                </li>
              </ul>
            </div>
          )}

          {/* GRAPH */}
          {tab === "graph" && (
            <div
              style={{
                ...card,
                marginTop: 16
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: 14
                }}
              >
                Net worth comparison over time
              </div>

              <ResponsiveContainer
                width="100%"
                height={340}
              >
                <LineChart
                  data={chartData}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis
                    tickFormatter={formatK}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="invest"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Invest instead"
                  />
                  <Line
                    type="monotone"
                    dataKey="overpay"
                    stroke="#2563eb"
                    strokeWidth={3}
                    name="Overpay loan"
                  />
                </LineChart>
              </ResponsiveContainer>

              <div
                style={{
                  marginTop: 10,
                  color: "#64748b",
                  fontSize: 14
                }}
              >
                Green = invest the spare money.
                Blue = overpay the loan.
              </div>
            </div>
          )}

          {/* METHOD */}
          {tab === "method" && (
            <div
              style={{
                ...card,
                marginTop: 16,
                lineHeight: 1.8,
                color: "#334155"
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 20
                }}
              >
                How We Estimated This
              </div>

              <p>
                We compare two paths:
              </p>

              <p>
                <strong>
                  Option 1:
                </strong>{" "}
                Overpay the student loan.
              </p>

              <p>
                <strong>
                  Option 2:
                </strong>{" "}
                Invest the same monthly amount.
              </p>

              <p>
                We then estimate future net
                worth using your salary, loan
                balance, loan plan, comparison
                period and assumed growth rates.
              </p>

              <p>
                Results are estimates — useful
                for comparing scenarios, not
                personal financial advice.
              </p>
            </div>
          )}

          {/* DETAILS */}
          {tab === "details" && (
            <div
              style={{
                ...card,
                marginTop: 16,
                lineHeight: 1.8
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 20
                }}
              >
                Important context
              </div>

              <p>
                Student loans often behave
                differently from normal debt.
                For many borrowers, monthly
                repayments depend more on
                earnings than balance size.
              </p>

              <p>
                Overpaying can help in some
                scenarios, but not all.
              </p>

              <p>
                This tool helps you explore
                options with clarity.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}