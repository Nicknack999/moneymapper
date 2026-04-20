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
import { wayliMessages } from "./wayliMessages";

export default function StudentLoanTool() {
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://api.wayli.uk";

  // ---------------------------------
  // PLAN RULES
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
    `£${Math.round(
      Number(v || 0)
    ).toLocaleString()}`;

  const moneyShort = (v) => {
    const n = Number(v || 0);

    if (Math.abs(n) >= 1000000) {
      return `£${(
        n / 1000000
      ).toFixed(1)}m`;
    }

    if (Math.abs(n) >= 1000) {
      return `£${Math.round(
        n / 1000
      )}k`;
    }

    return money(n);
  };

  const parseNum = (v) =>
    v === "" ? "" : Number(v);

  const describeValue = (v) => {
    const n = Number(v || 0);

    if (n > 5000) {
      return `${moneyShort(n)} ahead`;
    }

    if (n < -5000) {
      return `${moneyShort(
        Math.abs(n)
      )} behind`;
    }

    return "Around break-even";
  };

  const routeLabel = {
    minimum:
      "Minimum repayments only",
    overpay:
      "Overpay monthly",
    invest:
      "Invest monthly"
  };

  // ---------------------------------
  // STYLES
  // ---------------------------------
  const card = {
    background: "white",
    borderRadius: 20,
    padding: 22,
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 12px 28px rgba(15,23,42,0.06)"
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

  const chip = {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    background: "white",
    cursor: "pointer",
    fontWeight: 600
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
  const runModel = async (
    overrides = {}
  ) => {
    setLoading(true);
    setError("");

    try {
      const payload = {
        plan,
        salary:
          Number(
            overrides.salary ??
              salary
          ),
        loan_balance:
          Number(
            overrides.balance ??
              balance
          ),
        current_age:
          Number(
            overrides.currentAge ??
              currentAge
          ),
        retirement_age:
          Number(
            overrides.compareAge ??
              compareAge
          ),
        monthly_savings:
          Number(
            overrides.monthlyAmount ??
              monthlyAmount
          ),
        overpay:
          Number(
            overrides.monthlyAmount ??
              monthlyAmount
          ),
        return_rate:
          Number(
            overrides.returnRate ??
              returnRate
          ) / 100,
        loan_interest:
          Number(
            overrides.loanInterest ??
              loanInterest
          ) / 100,
        threshold:
          selectedPlan.threshold,
        write_off_years:
          selectedPlan.years,
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

      if (!res.ok) {
        throw new Error();
      }

      const data =
        await res.json();

      setResult(data);
    } catch {
      setError(
        "We couldn't run your comparison right now."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------
  // QUICK SCENARIOS
  // ---------------------------------
  const runScenario = (
    type
  ) => {
    if (type === "salary50") {
      setSalary(50000);
      runModel({
        salary: 50000
      });
    }

    if (type === "returns3") {
      setReturnRate(3);
      runModel({
        returnRate: 3
      });
    }

    if (type === "pay150") {
      setMonthlyAmount(150);
      runModel({
        monthlyAmount: 150
      });
    }

    if (type === "age67") {
      setCompareAge(67);
      runModel({
        compareAge: 67
      });
    }
  };

  // ---------------------------------
  // RESULTS
  // ---------------------------------
  const winner =
    result?.summary
      ?.winner_label || "";

  const winnerGap =
    result?.summary
      ?.winner_difference || 0;

  const repaymentType =
    result?.decision
      ?.repayment_outcome
      ?.type || "";

  const salaryTriggerText =
    result?.insights
      ?.salary_trigger_text || "";

  const ranking =
    result?.summary?.ranking?.map(
      (key) => {
        const values = {
          minimum:
            result?.summary
              ?.minimum_final || 0,
          overpay:
            result?.summary
              ?.overpay_final || 0,
          invest:
            result?.summary
              ?.invest_final || 0
        };

        return {
          key,
          label:
            routeLabel[key],
          value:
            values[key]
        };
      }
    ) || [];

  const chartData =
    result?.curves?.ages?.map(
      (age, i) => ({
        age,
        minimum:
          result?.curves
            ?.minimum_net_worth?.[
            i
          ] || 0,
        overpay:
          result?.curves
            ?.overpay_net_worth?.[
            i
          ] || 0,
        invest:
          result?.curves
            ?.invest_net_worth?.[
            i
          ] || 0
      })
    ) || [];

  // ---------------------------------
  // TEXT HELPERS
  // ---------------------------------
  const whyWinner = () => {
    if (
      repaymentType ===
      "full_repay"
    ) {
      return (
        "Full repayment looks more likely. " +
        wayliMessages.comparison.valuesMatter
      );
    }

    if (
      repaymentType ===
      "write_off"
    ) {
      return wayliMessages.repayment.unlikelyRepay;
    }

    return wayliMessages.comparison.close;
  };

  const routeExplain = (
    item
  ) => {
    if (
      item.key === "invest"
    ) {
      return wayliMessages.investing.growthPotential(
        item.value
      );
    }

    if (
      item.key === "minimum"
    ) {
      return wayliMessages.minimum.flexibility;
    }

    return wayliMessages.overpaying.debtSooner;
  };

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
            background:
              "white",
            border:
              "1px solid #e5e7eb",
            padding: 14,
            borderRadius: 12
          }}
        >
          <strong>
            Age {label}
          </strong>

          <div
            style={{
              marginTop: 6,
              fontSize: 13,
              color:
                "#64748b"
            }}
          >
            Higher lines are generally better.
          </div>

          {payload.map(
            (item) => (
              <div
                key={
                  item.name
                }
                style={{
                  marginTop: 8
                }}
              >
                {item.name}:{" "}
                {moneyShort(
                  item.value
                )}
              </div>
            )
          )}
        </div>
      );
    }

    return null;
  };

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
          Student Loan Tool
        </h1>

        <p
          style={{
            color:
              "#475569",
            lineHeight: 1.7
          }}
        >
          Compare three ways to use the same monthly money:
          <br />
          • Pay only normal deductions
          <br />
          • Overpay the loan
          <br />
          • Invest instead
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

        <button
          onClick={() =>
            runModel()
          }
          disabled={
            loading
          }
          style={{
            ...button,
            marginTop: 18
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
          {/* HERO RESULT */}
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
              Best financial outcome in this model
            </div>

            <h2>{winner}</h2>

            <p>
              Based on what you entered, this route is ahead by{" "}
              {money(
                winnerGap
              )}{" "}
              by age{" "}
              {compareAge}.
            </p>

            <p>
              {whyWinner()}
            </p>

            {salaryTriggerText && (
              <div
                style={{
                  marginTop: 14,
                  padding: 14,
                  borderRadius: 14,
                  background:
                    "white"
                }}
              >
                <strong>
                  Worth knowing
                </strong>

                <p
                  style={{
                    marginTop: 8,
                    marginBottom: 0
                  }}
                >
                  {
                    salaryTriggerText
                  }
                </p>
              </div>
            )}
          </div>

          {/* ROUTES */}
          <div
            style={{
              ...card,
              marginTop: 18
            }}
          >
            <h3>
              How each route compares
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
                    padding:
                      "16px 0",
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

                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 24,
                      fontWeight: 800
                    }}
                  >
                    {describeValue(
                      item.value
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      color:
                        "#475569",
                      lineHeight: 1.7
                    }}
                  >
                    {routeExplain(
                      item
                    )}
                  </div>
                </div>
              )
            )}
          </div>

          {/* GRAPH */}
          <div
            style={{
              ...card,
              marginTop: 18
            }}
          >
            <h3>
              How things may change over time
            </h3>

            <p
              style={{
                color:
                  "#475569"
              }}
            >
              Higher lines are generally better.
            </p>

            <ResponsiveContainer
              width="100%"
              height={380}
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
                  dataKey="minimum"
                  stroke="#111827"
                  strokeWidth={4}
                  strokeDasharray="6 4"
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

                <Line
                  type="monotone"
                  dataKey="invest"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={false}
                  name="Invest monthly"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* SCENARIOS */}
          <div
            style={{
              ...card,
              marginTop: 18
            }}
          >
            <h3>
              Try another version of the future
            </h3>

            <div
              style={{
                display:
                  "flex",
                gap: 10,
                flexWrap:
                  "wrap",
                marginTop: 12
              }}
            >
              <button
                style={chip}
                onClick={() =>
                  runScenario(
                    "salary50"
                  )
                }
              >
                Salary £50k
              </button>

              <button
                style={chip}
                onClick={() =>
                  runScenario(
                    "returns3"
                  )
                }
              >
                Returns 3%
              </button>

              <button
                style={chip}
                onClick={() =>
                  runScenario(
                    "pay150"
                  )
                }
              >
                £150 monthly
              </button>

              <button
                style={chip}
                onClick={() =>
                  runScenario(
                    "age67"
                  )
                }
              >
                Compare to 67
              </button>
            </div>
          </div>

          {/* FOOTER */}
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