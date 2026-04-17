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
  // UK PLAN RULES
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

  const moneyK = (v) =>
    `£${Math.round(Number(v || 0) / 1000)}k`;

  const parseNum = (value) =>
    value === "" ? "" : Number(value);

  const getDefaultEndAge = (planKey, age) => {
    const current = Number(age || 30);
    return current + plans[planKey].years;
  };

  const strategyName = (key) => {
    const map = {
      minimum: "Minimum repayments only",
      overpay: "Overpay monthly",
      invest: "Invest monthly"
    };

    return map[key] || key;
  };

  // ---------------------------------
  // STATE
  // ---------------------------------
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [tab, setTab] =
    useState("summary");

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
  ] = useState(60);

  const [returnRate, setReturnRate] =
    useState(5);

  const [
    loanInterest,
    setLoanInterest
  ] = useState(6);

  const selectedPlan =
    plans[plan];

  // ---------------------------------
  // VALIDATION
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
  // RUN MODEL
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
            overpay:
              Number(overpay),
            monthly_savings:
              Number(overpay),
            return_rate:
              Number(
                returnRate
              ) / 100,
            loan_interest:
              Number(
                loanInterest
              ) / 100,
            threshold:
              selectedPlan.threshold,
            repayment_rate: 0.09,
            write_off_years:
              selectedPlan.years,
            model_opportunity_cost: true
          })
        }
      );

      if (!res.ok)
        throw new Error();

      const data =
        await res.json();

      setResult(data);
      setTab("summary");
    } catch (err) {
      setError(
        "We couldn't run your comparison right now."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------
  // CHART DATA
  // ---------------------------------
  const chartData =
    result?.curves?.ages?.map(
      (age, i) => ({
        age,
        minimum:
          result.curves
            .minimum_net_worth?.[
            i
          ] ?? 0,
        overpay:
          result.curves
            .overpay_net_worth?.[
            i
          ] ?? 0,
        invest:
          result.curves
            .invest_net_worth?.[
            i
          ] ?? 0
      })
    ) || [];

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
        padding: 16
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
            marginTop: 8,
            marginBottom: 10
          }}
        >
          Student Loan Strategy Tool
        </h1>

        <p
          style={{
            margin: 0,
            color: "#475569",
            lineHeight: 1.7
          }}
        >
          Explore how paying
          the minimum,
          overpaying, or
          investing instead
          could affect your
          longer-term
          financial position.
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
              "Extra monthly amount (£)",
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
              text,
              value,
              setter
            ]) => (
              <div key={text}>
                <label
                  style={label}
                >
                  {text}
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
                  style={input}
                />
              </div>
            )
          )}
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
            width: "100%",
            padding:
              "14px 18px",
            border: "none",
            borderRadius: 14,
            background:
              loading ||
              !canRun
                ? "#94a3b8"
                : "#10b981",
            color:
              "white",
            fontWeight: 700,
            fontSize: 16,
            cursor:
              loading ||
              !canRun
                ? "not-allowed"
                : "pointer"
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
          {/* HEADLINE */}
          <div
            style={{
              ...card,
              marginTop: 18,
              background:
                "#ecfdf5"
            }}
          >
            <div
              style={{
                fontSize: 14,
                color: "#065f46"
              }}
            >
              Highest projected
              outcome under
              these
              assumptions
            </div>

            <h2
              style={{
                marginTop: 8,
                marginBottom: 8
              }}
            >
              {
                result.summary
                  .winner_label
              }
            </h2>

            <p
              style={{
                margin: 0
              }}
            >
              {money(
                result.summary
                  .winner_difference
              )}{" "}
              ahead of the next
              closest route by
              age{" "}
              {
                compareUntilAge
              }
              .
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
              Projected finish
              order
            </h3>

            <ol
              style={{
                lineHeight: 2
              }}
            >
              {result.summary.ranking_labels.map(
                (
                  item,
                  i
                ) => (
                  <li
                    key={i}
                  >
                    {item}
                  </li>
                )
              )}
            </ol>

            <p
              style={{
                color:
                  "#475569"
              }}
            >
              {
                result
                  .insights
                  .explanation
              }
            </p>
          </div>

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
            {[
              "summary",
              "chart",
              "meaning"
            ].map(
              (name) => (
                <button
                  key={name}
                  onClick={() =>
                    setTab(
                      name
                    )
                  }
                  style={pill(
                    tab ===
                      name
                  )}
                >
                  {name ===
                  "summary"
                    ? "Summary"
                    : name ===
                      "chart"
                    ? "Compare Over Time"
                    : "What This Means"}
                </button>
              )
            )}
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
                Scenario values
                by age{" "}
                {
                  compareUntilAge
                }
              </h3>

              <ul
                style={{
                  lineHeight: 2
                }}
              >
                <li>
                  Minimum
                  repayments
                  only:{" "}
                  {money(
                    result
                      .summary
                      .minimum_final
                  )}
                </li>

                <li>
                  Overpay
                  monthly:{" "}
                  {money(
                    result
                      .summary
                      .overpay_final
                  )}
                </li>

                <li>
                  Invest
                  monthly:{" "}
                  {money(
                    result
                      .summary
                      .invest_final
                  )}
                </li>
              </ul>

              <button
                onClick={() =>
                  setResult(
                    null
                  )
                }
                style={{
                  marginTop: 8,
                  padding:
                    "12px 16px",
                  border:
                    "none",
                  borderRadius: 12,
                  background:
                    "#0f172a",
                  color:
                    "white",
                  cursor:
                    "pointer"
                }}
              >
                Compare Another
                Scenario
              </button>
            </div>
          )}

          {/* CHART */}
          {tab ===
            "chart" && (
            <div
              style={{
                ...card,
                marginTop: 16
              }}
            >
              <h3>
                Compare over
                time
              </h3>

              <p
                style={{
                  color:
                    "#475569"
                }}
              >
                Estimated
                overall
                financial
                position under
                each route.
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
                      money(
                        value
                      )}
                  />

                  <Legend />

                  <Line
                    type="monotone"
                    dataKey="minimum"
                    stroke="#94a3b8"
                    strokeWidth={
                      2
                    }
                    dot={
                      false
                    }
                    name="Minimum only"
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
                    name="Overpay"
                  />

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
                    name="Invest"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* MEANING */}
          {tab ===
            "meaning" && (
            <div
              style={{
                ...card,
                marginTop: 16
              }}
            >
              <h3>
                What this
                means
              </h3>

              <p>
                UK student
                loans often
                work
                differently
                from normal
                debt.
              </p>

              <p>
                Depending on
                earnings,
                some people
                repay in full
                while others
                may not before
                write-off.
              </p>

              <p>
                This tool
                helps you
                compare
                possible
                routes using
                assumptions.
                It is for
                education and
                scenario
                planning, not
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