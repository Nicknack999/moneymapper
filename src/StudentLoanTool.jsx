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
  // STATE
  // ---------------------------------
  const [tab, setTab] = useState("summary");
  const [visualMode, setVisualMode] = useState("simple");

  const [salary, setSalary] = useState(40000);
  const [balance, setBalance] = useState(50000);
  const [overpay, setOverpay] = useState(100);

  const [currentAge, setCurrentAge] = useState(30);
  const [comparisonYears, setComparisonYears] =
    useState(30);

  const [returnRate, setReturnRate] =
    useState(5);

  const [loanInterest, setLoanInterest] =
    useState(6);

  const [plan, setPlan] = useState("plan2");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  // ---------------------------------
  // PLAN DATA (2026)
  // ---------------------------------
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

  // ---------------------------------
  // HELPERS
  // ---------------------------------
  const money = (v) =>
    `£${Math.round(v || 0).toLocaleString()}`;

  const moneyK = (v) =>
    `£${Math.round(v / 1000)}k`;

  const threshold =
    selectedPlan.threshold;

  // ---------------------------------
  // FETCH
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
            current_age: currentAge,
            retirement_age:
              currentAge +
              comparisonYears,
            monthly_savings: 200,
            overpay,
            return_rate:
              returnRate / 100,
            loan_interest:
              loanInterest / 100,
            write_off_years:
              selectedPlan.writeOffYears,
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
  // SIMPLE CALCS
  // ---------------------------------
  const monthlyRepayment =
    Math.max(
      0,
      (salary - threshold) * 0.09
    ) / 12;

  const estimatedYears =
    monthlyRepayment > 0
      ? balance /
        (monthlyRepayment * 12)
      : null;

  const payoffAge =
    estimatedYears
      ? Math.round(
          currentAge +
            estimatedYears
        )
      : null;

  const repayWithinWindow =
    estimatedYears &&
    estimatedYears <=
      selectedPlan.writeOffYears;

  const requiredAnnual =
    balance /
    selectedPlan.writeOffYears;

  const requiredSalary =
    threshold +
    requiredAnnual / 0.09;

  // ---------------------------------
  // MODEL DATA
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
      ? "Either option"
      : wealthDiff < 0
      ? "Investing"
      : "Overpaying";

  const loanWrittenOff =
    result?.insights
      ?.loan_written_off;

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
  // CHART MILESTONES
  // ---------------------------------
  let crossoverAge = null;

  for (
    let i = 0;
    i < ages.length;
    i++
  ) {
    if (
      (invest[i] ?? 0) >
      (overpayCurve[i] ??
        0)
    ) {
      crossoverAge =
        ages[i];
      break;
    }
  }

  const finalAge =
    ages[
      ages.length - 1
    ];

  const finalGap =
    wealthDiff !== null
      ? Math.abs(
          wealthDiff
        )
      : null;

  // ---------------------------------
  // STYLES
  // ---------------------------------
  const card = {
    background: "white",
    borderRadius: 16,
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

  const button = (
    active = false
  ) => ({
    padding:
      "10px 14px",
    borderRadius: 10,
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
            margin: 0,
            color:
              "#0f172a"
          }}
        >
          Student Loan:
          Should I Overpay?
        </h2>

        <p
          style={{
            marginTop: 8,
            color:
              "#475569",
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
              Loan plan
            </label>
            <select
              value={
                plan
              }
              onChange={(
                e
              ) =>
                setPlan(
                  e
                    .target
                    .value
                )
              }
              style={
                input
              }
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
              value={
                salary
              }
              onChange={(
                e
              ) =>
                setSalary(
                  Number(
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

          <div>
            <label>
              Loan balance (£)
            </label>
            <input
              type="number"
              value={
                balance
              }
              onChange={(
                e
              ) =>
                setBalance(
                  Number(
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

          <div>
            <label>
              Monthly overpayment (£)
            </label>
            <input
              type="number"
              value={
                overpay
              }
              onChange={(
                e
              ) =>
                setOverpay(
                  Number(
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

          <div>
            <label>
              Current age
            </label>
            <input
              type="number"
              value={
                currentAge
              }
              onChange={(
                e
              ) =>
                setCurrentAge(
                  Number(
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

          <div>
            <label>
              Comparison period (years)
            </label>
            <input
              type="number"
              value={
                comparisonYears
              }
              onChange={(
                e
              ) =>
                setComparisonYears(
                  Number(
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

          <div>
            <label>
              Investment return (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={
                returnRate
              }
              onChange={(
                e
              ) =>
                setReturnRate(
                  Number(
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

          <div>
            <label>
              Loan interest (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={
                loanInterest
              }
              onChange={(
                e
              ) =>
                setLoanInterest(
                  Number(
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
            ? "Calculating..."
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
              style={button(
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
              style={button(
                tab ===
                  "visual"
              )}
              onClick={() =>
                setTab(
                  "visual"
                )
              }
            >
              Visual Breakdown
            </button>

            <button
              style={button(
                tab ===
                  "method"
              )}
              onClick={() =>
                setTab(
                  "method"
                )
              }
            >
              How We Estimated This
            </button>

            <button
              style={button(
                tab ===
                  "details"
              )}
              onClick={() =>
                setTab(
                  "details"
                )
              }
            >
              Details
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
                💡 What
                this
                suggests
              </h3>

              <p>
                {direction} appears
                stronger in
                this
                scenario.
              </p>

              {wealthDiff !==
                null && (
                <p>
                  Estimated
                  net worth
                  difference
                  after{" "}
                  {
                    comparisonYears
                  }{" "}
                  years:{" "}
                  <strong>
                    {money(
                      Math.abs(
                        wealthDiff
                      )
                    )}
                  </strong>
                </p>
              )}

              <hr />

              <h3>
                🎯 When
                Overpaying
                Matters
              </h3>

              <p>
                {salary <
                requiredSalary *
                  0.85
                  ? "You appear below the zone where overpaying often has the biggest impact."
                  : salary <=
                    requiredSalary *
                      1.1
                  ? "You appear near the key decision zone where comparing overpaying vs investing is especially worthwhile."
                  : "You appear in a stronger repayment zone where overpaying can become more valuable."}
              </p>

              <p>
                Illustrative
                salary to
                repay
                within{" "}
                {
                  selectedPlan.writeOffYears
                }{" "}
                years:{" "}
                <strong>
                  {money(
                    requiredSalary
                  )}
                </strong>
              </p>

              <hr />

              <h3>
                🧾 Your
                repayment
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
                  At your
                  salary,
                  repayments
                  are around{" "}
                  {money(
                    monthlyRepayment
                  )}
                  /month
                </li>

                {estimatedYears && (
                  <li>
                    If salary
                    stayed
                    similar,
                    simple
                    repayments
                    alone
                    could
                    take
                    around{" "}
                    {Math.round(
                      estimatedYears
                    )}{" "}
                    years
                    (age{" "}
                    {
                      payoffAge
                    }
                    )
                  </li>
                )}

                <li>
                  {repayWithinWindow
                    ? "This rough estimate suggests repayment could happen before write-off."
                    : "This rough estimate suggests full repayment may be unlikely before write-off."}
                </li>

                {loanWrittenOff ===
                  true && (
                  <li>
                    Your
                    full
                    model
                    also
                    suggests
                    write-off
                    may
                    happen
                    first.
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* VISUAL */}
          {tab ===
            "visual" && (
            <div
              style={{
                ...card,
                marginTop: 16
              }}
            >
              <h3>
                📈 Visual
                Breakdown
              </h3>

              <p>
                What this
                suggests:
              </p>

              <ul>
                <li>
                  Both
                  options
                  are
                  often
                  closer
                  early on
                </li>

                <li>
                  Overpaying
                  can help
                  sooner by
                  reducing
                  debt
                </li>

                <li>
                  Investing
                  may pull
                  ahead
                  later
                  through
                  long-term
                  growth
                </li>

                {crossoverAge && (
                  <li>
                    Investing
                    first
                    moves
                    ahead
                    around
                    age{" "}
                    {
                      crossoverAge
                    }
                  </li>
                )}
              </ul>

              <div
                style={{
                  display:
                    "flex",
                  gap: 10,
                  marginTop: 12,
                  flexWrap:
                    "wrap"
                }}
              >
                <button
                  style={button(
                    visualMode ===
                      "simple"
                  )}
                  onClick={() =>
                    setVisualMode(
                      "simple"
                    )
                  }
                >
                  Simple
                  View
                </button>

                <button
                  style={button(
                    visualMode ===
                      "chart"
                  )}
                  onClick={() =>
                    setVisualMode(
                      "chart"
                    )
                  }
                >
                  Chart
                  View
                </button>
              </div>

              {visualMode ===
              "simple" ? (
                <div
                  style={{
                    marginTop: 16,
                    lineHeight: 2
                  }}
                >
                  <div>
                    Age{" "}
                    {
                      currentAge +
                      5
                    }{" "}
                    → Often
                    still
                    fairly
                    close
                  </div>

                  {crossoverAge && (
                    <div>
                      Age{" "}
                      {
                        crossoverAge
                      }{" "}
                      →
                      Investing
                      moves
                      ahead
                    </div>
                  )}

                  {finalGap !==
                    null && (
                    <div>
                      Age{" "}
                      {
                        finalAge
                      }{" "}
                      →{" "}
                      {
                        direction
                      } ahead
                      by{" "}
                      {money(
                        finalGap
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    marginTop: 16
                  }}
                >
                  <ResponsiveContainer
                    width="100%"
                    height={
                      340
                    }
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
                      <Tooltip />
                      <Legend />

                      <Line
                        dataKey="invest"
                        stroke="#10b981"
                        strokeWidth={
                          3
                        }
                        name="Invest instead"
                      />

                      <Line
                        dataKey="overpay"
                        stroke="#2563eb"
                        strokeWidth={
                          3
                        }
                        name="Overpay loan"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
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
                How We
                Estimated
                This
              </h3>

              <p>
                We compare
                two
                scenarios:
              </p>

              <p>
                1.
                Overpay
                your loan
              </p>

              <p>
                2. Invest
                the same
                money
              </p>

              <p>
                We then
                model
                future net
                worth
                using your
                inputs and
                assumptions.
              </p>

              <p>
                This tool
                is for
                exploring
                options,
                not
                personal
                financial
                advice.
              </p>
            </div>
          )}

          {/* DETAILS */}
          {tab ===
            "details" && (
            <div
              style={{
                ...card,
                marginTop: 16
              }}
            >
              <h3>
                Important
                Context
              </h3>

              <p>
                Student
                loans
                often
                behave
                differently
                from
                normal
                debt.
              </p>

              <p>
                Repayments
                depend
                largely on
                earnings
                above the
                threshold.
              </p>

              <p>
                Overpaying
                helps in
                some
                scenarios,
                but not
                all.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}