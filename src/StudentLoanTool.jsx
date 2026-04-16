import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  CartesianGrid,
  Area,
  ReferenceDot
} from "recharts";

export default function StudentLoanTool() {
  const [salary, setSalary] = useState(40000);
  const [balance, setBalance] = useState(50000);
  const [selectedOverpay, setSelectedOverpay] = useState(100);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);

  const [returnRate, setReturnRate] = useState(5);
  const [loanInterest, setLoanInterest] = useState(6);
  const [writeOffYears, setWriteOffYears] = useState(30);

  const [flipRate, setFlipRate] = useState(null);

  // -----------------------------
  // API
  // -----------------------------
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://moneymapper-backend-018g.onrender.com";

  // -----------------------------
  // HELPERS
  // -----------------------------
  const formatCurrency = (value) =>
    `£${Math.round(value).toLocaleString()}`;

  // -----------------------------
  // FETCH MODEL
  // -----------------------------
  const fetchModel = async (
    overpayValue,
    overrideReturnRate = null
  ) => {
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
          retirement_age: retirementAge,
          monthly_savings: 200,
          overpay: overpayValue,
          return_rate:
            (overrideReturnRate ?? returnRate) / 100,
          loan_interest: loanInterest / 100,
          write_off_years: writeOffYears,
          model_opportunity_cost: true
        })
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error("Fetch failed:", err);
      return null;
    }
  };

  // -----------------------------
  // RUN MODEL
  // -----------------------------
  const runModel = async () => {
    if (currentAge >= retirementAge) return;

    setLoading(true);

    const data = await fetchModel(selectedOverpay);

    if (data) {
      setResult(data);
      setFlipRate(data.flip_return_rate ?? null);
    }

    setLoading(false);
  };

  // -----------------------------
  // UPDATE + RE-RUN
  // -----------------------------
  const updateAndRun = async (setter, value) => {
    setter(value);

    if (result && currentAge < retirementAge) {
      setLoading(true);

      const data = await fetchModel(
        setter === setSelectedOverpay
          ? value
          : selectedOverpay,
        setter === setReturnRate ? value : null
      );

      if (data) {
        setResult(data);
        setFlipRate(data.flip_return_rate ?? null);
      }

      setLoading(false);
    }
  };

  // -----------------------------
  // REPAYMENT LOGIC
  // -----------------------------
  const threshold = 27295;
  const repaymentRate = 0.09;

  const annualRepayment = Math.max(
    0,
    (salary - threshold) * repaymentRate
  );

  const monthlyRepayment = annualRepayment / 12;

  const estimatedYearsToRepay =
    annualRepayment > 0
      ? balance / annualRepayment
      : null;

  const payoffAge = estimatedYearsToRepay
    ? Math.round(currentAge + estimatedYearsToRepay)
    : null;

  const targetYears = 10;
  const requiredAnnual = balance / targetYears;
  const requiredMonthly = requiredAnnual / 12;
  const requiredSalary =
    requiredAnnual / repaymentRate + threshold;

  // -----------------------------
  // MODEL DATA
  // -----------------------------
  const ages = result?.curves?.ages || [];
  const invest =
    result?.curves?.invest_net_worth || [];
  const overpay =
    result?.curves?.overpay_net_worth || [];

  const wealthDiff =
    result?.insights?.wealth_difference ?? null;

  const breakEvenSalary =
    result?.insights?.break_even_salary;

  const loanWrittenOff =
    result?.insights?.loan_written_off;

  const direction =
    wealthDiff === null
      ? "either option"
      : wealthDiff < 0
      ? "investing"
      : "overpaying";

  // -----------------------------
  // CROSSOVER / MILESTONES
  // -----------------------------
  let crossoverAge = null;
  let meaningfulAge = null;
  let maxAdvantage = null;
  let maxAdvantageAge = null;
  let maxIndex = null;

  for (let i = 0; i < ages.length; i++) {
    const gap =
      (invest[i] ?? 0) - (overpay[i] ?? 0);

    if (!crossoverAge && gap > 0) {
      crossoverAge = ages[i];
    }

    if (
      !meaningfulAge &&
      Math.abs(gap) >= 10000
    ) {
      meaningfulAge = ages[i];
    }

    if (
      maxAdvantage === null ||
      Math.abs(gap) >
        Math.abs(maxAdvantage)
    ) {
      maxAdvantage = gap;
      maxAdvantageAge = ages[i];
      maxIndex = i;
    }
  }

  // -----------------------------
  // INSIGHTS
  // -----------------------------
  let insightOutcome = "";
  let insightJourney = "";
  let insightMeaning = "";
  let insightDriver = "";
  let insightSensitivity = "";
  let insightTrigger = "";

  if (wealthDiff !== null) {
    insightOutcome = `By age ${retirementAge}, ${direction} could leave you about ${formatCurrency(
      Math.abs(wealthDiff)
    )} better off overall`;
  }

  if (
    crossoverAge &&
    crossoverAge > currentAge + 2
  ) {
    insightJourney = `Overpaying is slightly ahead early on, but ${direction} overtakes around age ${crossoverAge}`;
  } else if (crossoverAge) {
    insightJourney = `${direction} is ahead almost immediately and continues to pull away over time`;
  }

  if (
    maxAdvantageAge &&
    maxAdvantageAge - currentAge > 10
  ) {
    insightMeaning =
      "Most of the difference builds later in life, as growth compounds over time";
  }

  if (loanWrittenOff === true) {
    insightDriver =
      "Because your loan is unlikely to be fully repaid, overpaying has limited impact on total repayments.";
  } else if (loanWrittenOff === false) {
    insightDriver =
      "Because you are likely to repay your loan in full, the result depends on whether investment growth outpaces the loan cost.";
  }

  if (flipRate) {
    insightSensitivity = `This outcome depends on returns around ${returnRate.toFixed(
      1
    )}%. Lower returns (below ~${flipRate.toFixed(
      1
    )}%) could change the result.`;
  }

  if (breakEvenSalary) {
    insightTrigger = `If your salary reached around ${formatCurrency(
      breakEvenSalary
    )}, this outcome could change.`;
  }

  // -----------------------------
  // CHART DATA
  // -----------------------------
  const chartData = ages.map((age, i) => ({
    age,
    invest: invest[i] ?? 0,
    overpay: overpay[i] ?? 0,
    gap:
      (invest[i] ?? 0) -
      (overpay[i] ?? 0)
  }));

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div
      style={{
        padding: 20,
        maxWidth: 1100,
        margin: "auto"
      }}
    >
      <h2>🎓 Student Loan</h2>

      {/* BASIC INPUTS */}
      <div>
        <label>Salary (£)</label>
        <input
          value={salary}
          onChange={(e) =>
            setSalary(Number(e.target.value))
          }
        />

        <label>Loan Balance (£)</label>
        <input
          value={balance}
          onChange={(e) =>
            setBalance(Number(e.target.value))
          }
        />
      </div>

      {/* CONTROLS */}
      <div
        style={{
          marginTop: 20,
          padding: 12,
          border: "1px solid #eee",
          borderRadius: 8
        }}
      >
        <strong>Adjust your scenario</strong>

        <div>Current age: {currentAge}</div>
        <input
          type="range"
          min="18"
          max="55"
          value={currentAge}
          onChange={(e) =>
            updateAndRun(
              setCurrentAge,
              Number(e.target.value)
            )
          }
        />

        <div>
          Retirement age: {retirementAge}
        </div>
        <input
          type="range"
          min="50"
          max="70"
          value={retirementAge}
          onChange={(e) =>
            updateAndRun(
              setRetirementAge,
              Number(e.target.value)
            )
          }
        />

        {currentAge >= retirementAge && (
          <p style={{ color: "red" }}>
            Retirement age must be
            higher than current age
          </p>
        )}

        <div>
          Investment return:{" "}
          {returnRate.toFixed(1)}%
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={returnRate}
          onChange={(e) =>
            updateAndRun(
              setReturnRate,
              Number(e.target.value)
            )
          }
        />

        <div>
          Overpayment: £
          {selectedOverpay}/month
        </div>
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={selectedOverpay}
          onChange={(e) =>
            updateAndRun(
              setSelectedOverpay,
              Number(e.target.value)
            )
          }
        />

        <div>
          Loan interest: {loanInterest}%
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={loanInterest}
          onChange={(e) =>
            updateAndRun(
              setLoanInterest,
              Number(e.target.value)
            )
          }
        />

        <div>
          Write-off period:{" "}
          {writeOffYears} years
        </div>
        <input
          type="range"
          min="20"
          max="40"
          step="1"
          value={writeOffYears}
          onChange={(e) =>
            updateAndRun(
              setWriteOffYears,
              Number(e.target.value)
            )
          }
        />

        <div
          style={{
            marginTop: 10,
            fontSize: 13,
            color: "#666"
          }}
        >
          <strong>Assumptions:</strong>{" "}
          Age {currentAge} →{" "}
          {retirementAge} • Return{" "}
          {returnRate.toFixed(1)}% • Loan{" "}
          {loanInterest}% • Write-off{" "}
          {writeOffYears}y
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={runModel}
        style={{ marginTop: 10 }}
      >
        Run Model
      </button>

      {loading && <p>Calculating...</p>}

      {/* RESULTS */}
      {result && (
        <div style={{ marginTop: 20 }}>
          {/* REPAYMENT */}
          <div
            style={{
              marginTop: 20,
              padding: 12,
              background: "#f0fdf4",
              borderRadius: 10,
              border:
                "1px solid #bbf7d0"
            }}
          >
            <strong>
              🧾 Your repayment picture
            </strong>

            <ul
              style={{
                marginTop: 8,
                paddingLeft: 18
              }}
            >
              <li>
                You start repaying above
                £27,295
              </li>

              <li>
                At your current salary (
                {formatCurrency(salary)}),
                you repay about{" "}
                {formatCurrency(
                  monthlyRepayment
                )}
                /month
              </li>

              {estimatedYearsToRepay &&
                payoffAge && (
                  <li>
                    At this rate, your
                    loan would be repaid
                    in around{" "}
                    {Math.round(
                      estimatedYearsToRepay
                    )}{" "}
                    years (around age{" "}
                    {payoffAge}),
                    assuming your salary
                    stays similar
                  </li>
                )}

              {loanWrittenOff ===
                true && (
                <li>
                  At this repayment
                  level, your loan is
                  unlikely to be fully
                  repaid before the
                  write-off point
                </li>
              )}

              <li>
                To clear your loan in
                ~10 years, you'd need to
                repay about{" "}
                {formatCurrency(
                  requiredMonthly
                )}
                /month
              </li>

              <li>
                That typically requires
                earnings of around{" "}
                {formatCurrency(
                  requiredSalary
                )}
              </li>
            </ul>
          </div>

          {/* RECOMMENDATION */}
          <div
            style={{
              marginTop: 20,
              padding: 15,
              borderRadius: 10,
              background: "#ecfdf5"
            }}
          >
            <strong>
              💡 What this suggests
            </strong>

            <div
              style={{ marginTop: 6 }}
            >
              Based on your inputs,{" "}
              {direction} appears to
              lead to better long-term
              outcomes.
            </div>
          </div>

          {/* CHART */}
          <div style={{ marginTop: 20 }}>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart
                data={chartData}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="age" />

                <YAxis
                  tickFormatter={(v) =>
                    `£${(
                      v / 1000
                    ).toFixed(0)}k`
                  }
                />

                <Tooltip />
                <Legend />

                {crossoverAge && (
                  <ReferenceLine
                    x={crossoverAge}
                    stroke="purple"
                  />
                )}

                {meaningfulAge && (
                  <ReferenceLine
                    x={meaningfulAge}
                    stroke="#f59e0b"
                  />
                )}

                {maxIndex !==
                  null && (
                  <ReferenceDot
                    x={ages[maxIndex]}
                    y={
                      invest[maxIndex]
                    }
                    r={6}
                    fill="green"
                  />
                )}

                <Area
                  dataKey="gap"
                  fill="#fca5a5"
                  fillOpacity={0.15}
                />

                <Line
                  dataKey="gap"
                  stroke="#dc2626"
                  name="Gap"
                />

                <Line
                  dataKey="invest"
                  stroke="#16a34a"
                  name="Invest"
                />

                <Line
                  dataKey="overpay"
                  stroke="#2563eb"
                  name="Overpay"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* INSIGHTS */}
          <div
            style={{
              marginTop: 12,
              padding: 12,
              background:
                "#f5f9ff",
              borderLeft:
                "4px solid #4CAF50",
              borderRadius: 10
            }}
          >
            <strong>
              📊 Key insights
            </strong>

            <ul>
              {insightOutcome && (
                <li>
                  {insightOutcome}
                </li>
              )}
              {insightJourney && (
                <li>
                  {insightJourney}
                </li>
              )}
              {insightMeaning && (
                <li>
                  {insightMeaning}
                </li>
              )}
              {insightDriver && (
                <li>
                  {insightDriver}
                </li>
              )}
              {insightSensitivity && (
                <li>
                  {
                    insightSensitivity
                  }
                </li>
              )}
              {insightTrigger && (
                <li>
                  {insightTrigger}
                </li>
              )}
            </ul>
          </div>

          {/* WHY */}
          <div
            style={{
              marginTop: 12,
              padding: 12,
              background:
                loanWrittenOff
                  ? "#fff7ed"
                  : "#eef2ff",
              borderRadius: 10,
              border:
                "1px solid #ddd"
            }}
          >
            <strong>
              💡 Why this happens
            </strong>

            <div
              style={{ marginTop: 6 }}
            >
              {loanWrittenOff
                ? "In your scenario, the loan behaves more like a time-based repayment. Overpaying has limited impact, while investments may still grow over time."
                : "Because you are likely to repay the loan in full, overpaying reduces interest costs — but investing may still produce higher long-term growth."}
            </div>
          </div>

          {/* DISCLAIMER */}
          <div
            style={{
              marginTop: 16,
              padding: 10,
              fontSize: 12,
              color: "#555",
              background:
                "#f9fafb",
              borderRadius: 8,
              border:
                "1px solid #e5e7eb"
            }}
          >
            <strong>
              ⚠️ Important context
            </strong>

            <div
              style={{ marginTop: 4 }}
            >
              We built this tool to
              help our own family
              understand student loan
              decisions. It's designed
              to guide thinking and
              explore scenarios, not to
              provide financial advice.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}