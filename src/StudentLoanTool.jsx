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
  // FETCH
  // -----------------------------
  const fetchModel = async (overpayValue, overrideReturnRate = null) => {
    const res = await fetch("https://moneymapper-backend-018g.onrender.com/full-model", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        salary,
        loan_balance: balance,
        current_age: currentAge,
        retirement_age: retirementAge,
        monthly_savings: 200,
        overpay: overpayValue,
        return_rate: (overrideReturnRate ?? returnRate) / 100,
        loan_interest: loanInterest / 100,
        write_off_years: writeOffYears,
        model_opportunity_cost: true
      })
    });

    return res.json();
  };

  const runModel = async () => {
    setLoading(true);
    const data = await fetchModel(selectedOverpay);
    setResult(data);
    setFlipRate(data.flip_return_rate ?? null);
    setLoading(false);
  };

  const updateAndRun = async (setter, value) => {
    setter(value);

    if (result && currentAge < retirementAge) {
      setLoading(true);
      const data = await fetchModel(
        setter === setSelectedOverpay ? value : selectedOverpay,
        setter === setReturnRate ? value : null
      );
      setResult(data);
      setFlipRate(data.flip_return_rate ?? null);
      setLoading(false);
    }
  };

  // -----------------------------
  // DATA
  // -----------------------------
  const ages = result?.curves?.ages || [];
  const invest = result?.curves?.invest_net_worth || [];
  const overpay = result?.curves?.overpay_net_worth || [];

  const wealthDiff = result?.insights?.wealth_difference ?? null;
  const breakEvenSalary = result?.insights?.break_even_salary;
  const loanWrittenOff = result?.insights?.loan_written_off;

  // -----------------------------
  // CROSSOVER
  // -----------------------------
  let crossoverAge = null;
  for (let i = 0; i < ages.length; i++) {
    if ((invest[i] ?? 0) > (overpay[i] ?? 0)) {
      crossoverAge = ages[i];
      break;
    }
  }

  // -----------------------------
  // MAX ADVANTAGE
  // -----------------------------
  let maxAdvantage = null;
  let maxAdvantageAge = null;
  let maxIndex = null;

  for (let i = 0; i < ages.length; i++) {
    const gap = (invest[i] ?? 0) - (overpay[i] ?? 0);

    if (maxAdvantage === null || Math.abs(gap) > Math.abs(maxAdvantage)) {
      maxAdvantage = gap;
      maxAdvantageAge = ages[i];
      maxIndex = i;
    }
  }

  // -----------------------------
  // MEANINGFUL GAP
  // -----------------------------
  let meaningfulAge = null;
  const threshold = 10000;

  for (let i = 0; i < ages.length; i++) {
    const gap = (invest[i] ?? 0) - (overpay[i] ?? 0);

    if (Math.abs(gap) >= threshold) {
      meaningfulAge = ages[i];
      break;
    }
  }

  // -----------------------------
  // DECISION
  // -----------------------------
  let recommendation = "";
  let decisionStrength = "neutral";

  if (wealthDiff !== null) {
    if (Math.abs(wealthDiff) < 5000) {
      recommendation = "Either option is broadly similar";
    } else if (wealthDiff < 0) {
      recommendation = "Invest instead of overpaying";
      decisionStrength = flipRate ? "sensitive" : "strong";
    } else {
      recommendation = "Overpay your loan";
      decisionStrength = "strong";
    }
  }

  // -----------------------------
  // CHART DATA
  // -----------------------------
  const chartData = ages.map((age, i) => ({
    age,
    invest: invest[i] ?? 0,
    overpay: overpay[i] ?? 0,
    gap: (invest[i] ?? 0) - (overpay[i] ?? 0)
  }));

  // -----------------------------
  // FORMAT
  // -----------------------------
  const formatCurrency = (v) =>
    v !== null && v !== undefined
      ? `£${Math.round(v).toLocaleString()}`
      : "-";

  const formatAxis = (v) => `£${(v / 1000).toFixed(0)}k`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload) return null;

    return (
      <div style={{ background: "#fff", padding: 10, border: "1px solid #ddd", borderRadius: 8 }}>
        <strong>Age {label}</strong>
        {payload.map((p, i) => (
          <div key={i}>{p.name}: {formatCurrency(p.value)}</div>
        ))}
      </div>
    );
  };

  // -----------------------------
  // INSIGHTS
  // -----------------------------
  let insightOutcome = "";
  let insightRepayment = "";
  let insightTrigger = "";
  let insightCrossover = "";
  let insightMeaningful = "";
  let insightAcceleration = "";
  let insightSensitivity = "";
  let insightMax = "";
  let insightJourney = "";

  if (wealthDiff !== null) {
    insightOutcome =
      wealthDiff < 0
        ? `Investing leaves you ${formatCurrency(Math.abs(wealthDiff))} better off by retirement`
        : `Overpaying leaves you ${formatCurrency(Math.abs(wealthDiff))} better off overall`;
  }

  if (loanWrittenOff === true) {
    insightRepayment = "Your loan is likely to be written off before full repayment";
  } else if (loanWrittenOff === false) {
    insightRepayment = "You are likely to repay your loan in full";
  }

  if (breakEvenSalary) {
    insightTrigger = `If your salary reached around £${Math.round(breakEvenSalary).toLocaleString()}, this decision could change`;
  }

  if (crossoverAge) {
    insightCrossover = `You start to come out ahead from around age ${crossoverAge}`;
  }

  if (meaningfulAge) {
    insightMeaningful = `The difference becomes meaningful (around £10k) by age ${meaningfulAge}`;
  }

  if (maxAdvantageAge !== null) {
    insightMax =
      maxAdvantage < 0
        ? `Maximum advantage is ${formatCurrency(Math.abs(maxAdvantage))} from investing at around age ${maxAdvantageAge}`
        : `Maximum advantage is ${formatCurrency(Math.abs(maxAdvantage))} from overpaying at around age ${maxAdvantageAge}`;
  }

  if (crossoverAge && maxAdvantageAge) {
    const earlyGap = (invest[0] ?? 0) - (overpay[0] ?? 0);
    const yearsToPeak = maxAdvantageAge - crossoverAge;

    const earlyLeader =
      earlyGap < 0 ? "Overpaying starts ahead" : "Investing starts ahead";

    const speed =
      yearsToPeak > 10
        ? "and the advantage builds gradually over time"
        : "and the advantage builds relatively quickly";

    insightJourney = `${earlyLeader}, before the outcomes converge around age ${crossoverAge}, ${speed}. Most of the benefit occurs later due to compounding.`;

    insightAcceleration =
      yearsToPeak > 10
        ? "The financial gap builds gradually, with most benefit later due to compounding"
        : "The financial difference emerges relatively quickly after crossover";
  }

  if (flipRate) {
    insightSensitivity = `This result depends on returns around ${returnRate.toFixed(1)}%. Lower returns (below ~${flipRate.toFixed(1)}%) could change the outcome`;
  }

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "auto" }}>

      <h2>🎓 Student Loan</h2>

      <div>
        <label>Salary (£)</label>
        <input value={salary} onChange={(e) => setSalary(Number(e.target.value))} />

        <label>Loan Balance (£)</label>
        <input value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
      </div>

      {/* CONTROLS */}
      <div style={{ marginTop: 20, padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
        <strong>Adjust your scenario</strong>

        <div>Current age: {currentAge}</div>
        <input type="range" min="18" max="55" value={currentAge}
          onChange={(e) => updateAndRun(setCurrentAge, Number(e.target.value))}
        />

        <div>Retirement age: {retirementAge}</div>
        <input type="range" min="50" max="70" value={retirementAge}
          onChange={(e) => updateAndRun(setRetirementAge, Number(e.target.value))}
        />

        {currentAge >= retirementAge && (
          <p style={{ color: "red" }}>Retirement age must be higher than current age</p>
        )}

        <div>Investment return: {returnRate.toFixed(1)}%</div>
        <input type="range" min="0" max="10" step="0.1"
          value={returnRate}
          onChange={(e) => updateAndRun(setReturnRate, Number(e.target.value))}
        />

        <div>Overpayment: £{selectedOverpay}/month</div>
        <input type="range" min="0" max="500" step="10"
          value={selectedOverpay}
          onChange={(e) => updateAndRun(setSelectedOverpay, Number(e.target.value))}
        />

        <div>Loan interest: {loanInterest}%</div>
        <input type="range" min="0" max="10" step="0.1"
          value={loanInterest}
          onChange={(e) => updateAndRun(setLoanInterest, Number(e.target.value))}
        />

        <div style={{ marginTop: 10, fontSize: 13, color: "#666" }}>
          <strong>Assumptions:</strong> Age {currentAge} → {retirementAge} • Return {returnRate.toFixed(1)}% • Loan {loanInterest}%
        </div>
      </div>

      <button onClick={runModel} style={{ marginTop: 10 }}>
        Run Model
      </button>

      {loading && <p>Calculating...</p>}

      {result && (
        <div style={{ marginTop: 20 }}>

          {/* RECOMMENDATION */}
          <div style={{ padding: 15, borderRadius: 10, background: "#ecfdf5" }}>
            <strong>💡 What this suggests</strong>
            <div style={{ marginTop: 6 }}>
              {recommendation === "Invest instead of overpaying" &&
                "Based on your inputs, investing appears to lead to better long-term outcomes."}

              {recommendation === "Overpay your loan" &&
                "Based on your inputs, overpaying appears to lead to better overall outcomes."}

              {recommendation === "Either option is broadly similar" &&
                "Based on your inputs, both options lead to broadly similar outcomes."}
            </div>
          </div>

          {/* CHART */}
          <div style={{ marginTop: 20 }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis tickFormatter={formatAxis} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                {crossoverAge && <ReferenceLine x={crossoverAge} stroke="purple" />}
                {meaningfulAge && <ReferenceLine x={meaningfulAge} stroke="#f59e0b" />}
                {maxIndex !== null && (
                  <ReferenceDot x={ages[maxIndex]} y={invest[maxIndex]} r={6} fill="green" />
                )}

                <Area dataKey="gap" fill="#fca5a5" fillOpacity={0.15} />
                <Line dataKey="gap" stroke="#dc2626" />
                <Line dataKey="invest" stroke="#16a34a" />
                <Line dataKey="overpay" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* INSIGHTS */}
          <div style={{ marginTop: 12, padding: 12, background: "#f5f9ff", borderLeft: "4px solid #4CAF50", borderRadius: 10 }}>
            <strong>📊 Key insights</strong>
            <ul>
              {insightOutcome && <li>{insightOutcome}</li>}
              {insightJourney && <li>{insightJourney}</li>}
              {insightCrossover && <li>{insightCrossover}</li>}
              {insightMeaningful && <li>{insightMeaningful}</li>}
              {insightMax && <li>{insightMax}</li>}
              {insightAcceleration && <li>{insightAcceleration}</li>}
              {insightSensitivity && <li>{insightSensitivity}</li>}
              {insightTrigger && <li>{insightTrigger}</li>}
            </ul>
          </div>

          {/* WHY */}
          <div style={{
            marginTop: 12,
            padding: 12,
            background: loanWrittenOff ? "#fff7ed" : "#eef2ff",
            borderRadius: 10,
            border: "1px solid #ddd"
          }}>
            <strong>💡 Why this happens</strong>
            <div style={{ marginTop: 6 }}>
              {loanWrittenOff
                ? "Your loan is unlikely to be fully repaid, so overpaying does not reduce total repayments significantly."
                : "You are likely to repay your loan in full, but investment growth can still outpace the interest cost."}
            </div>
          </div>

          {/* DISCLAIMER */}
          <div style={{
            marginTop: 16,
            padding: 10,
            fontSize: 12,
            color: "#555",
            background: "#f9fafb",
            borderRadius: 8,
            border: "1px solid #e5e7eb"
          }}>
            <strong>⚠️ Important context</strong>
            <div style={{ marginTop: 4 }}>
              We built this tool to help our own family understand student loan decisions. 
              It’s designed to guide thinking and explore scenarios, not to provide financial advice.
            </div>
          </div>

        </div>
      )}
    </div>
  );
}