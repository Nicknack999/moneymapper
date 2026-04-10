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

  const [returnRate, setReturnRate] = useState(5);
  const [loanInterest, setLoanInterest] = useState(6);
  const [writeOffYears, setWriteOffYears] = useState(30);

  const [flipRate, setFlipRate] = useState(null);

  const currentAge = 30;
  const retirementAge = 60;

  // FETCH
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

    if (result) {
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

  // DATA
  const ages = result?.curves?.ages || [];
  const invest = result?.curves?.invest_net_worth || [];
  const overpay = result?.curves?.overpay_net_worth || [];

  const wealthDiff = result?.insights?.wealth_difference ?? null;
  const breakEvenSalary = result?.insights?.break_even_salary;
  const loanWrittenOff = result?.insights?.loan_written_off;

  // CROSSOVER
  let crossoverAge = null;
  for (let i = 0; i < ages.length; i++) {
    if ((invest[i] ?? 0) > (overpay[i] ?? 0)) {
      crossoverAge = ages[i];
      break;
    }
  }

  // MAX ADVANTAGE
  let maxAdvantage = null;
  let maxAdvantageAge = null;

  for (let i = 0; i < ages.length; i++) {
    const gap = (invest[i] ?? 0) - (overpay[i] ?? 0);

    if (maxAdvantage === null || Math.abs(gap) > Math.abs(maxAdvantage)) {
      maxAdvantage = gap;
      maxAdvantageAge = ages[i];
    }
  }

  // MEANINGFUL GAP
  let meaningfulAge = null;
  const threshold = 10000;

  for (let i = 0; i < ages.length; i++) {
    const gap = (invest[i] ?? 0) - (overpay[i] ?? 0);

    if (Math.abs(gap) >= threshold) {
      meaningfulAge = ages[i];
      break;
    }
  }

  // DECISION
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

  // CHART DATA
  const chartData = ages.map((age, i) => ({
    age,
    invest: invest[i] ?? 0,
    overpay: overpay[i] ?? 0,
    gap: (invest[i] ?? 0) - (overpay[i] ?? 0)
  }));

  // FORMAT
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

  // INSIGHTS
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
    insightAcceleration =
      maxAdvantageAge - crossoverAge > 10
        ? "The financial gap builds gradually, with most benefit later due to compounding"
        : "The financial difference emerges relatively quickly after crossover";

    let insightJourney = "";

if (crossoverAge && maxAdvantageAge) {

  const earlyGap = (invest[0] ?? 0) - (overpay[0] ?? 0);
  const yearsToPeak = maxAdvantageAge - crossoverAge;

  const earlyLeader =
    earlyGap < 0 ? "Overpaying starts ahead" : "Investing starts ahead";

  const speed =
    yearsToPeak > 10
      ? "and the advantage builds gradually over time"
      : "and the advantage builds relatively quickly";

  insightJourney = `${earlyLeader}, before the outcomes converge around age ${crossoverAge}, ${speed}. `;
}

  if (flipRate) {
    insightSensitivity = `This result depends on returns around ${returnRate.toFixed(1)}%. Lower returns (below ~${flipRate.toFixed(1)}%) could change the outcome`;
  }

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "auto" }}>

      <h2>🎓 Student Loan</h2>

      <div>
        <label>Salary (£)</label>
        <input value={salary} onChange={(e) => setSalary(Number(e.target.value))} />

        <label>Loan Balance (£)</label>
        <input value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
      </div>

      <div style={{ marginTop: 20, padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
        <strong>Adjust your scenario</strong>

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
      </div>

      <button onClick={runModel} style={{ marginTop: 10 }}>
        Run Model
      </button>

      {loading && <p>Calculating...</p>}

      {result && (
        <div style={{ marginTop: 20 }}>

          <div style={{ padding: 15, borderRadius: 10, background: "#ecfdf5" }}>
            <strong>💡 What this suggests</strong>
            <div style={{ marginTop: 6 }}>
              Based on your inputs, investing appears to lead to better long-term outcomes.
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis tickFormatter={formatAxis} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                {crossoverAge && (
                  <ReferenceLine x={crossoverAge} stroke="purple" label={{ value: "Crossover", position: "top" }} />
                )}

                {maxAdvantageAge && (
                  <ReferenceDot
                    x={maxAdvantageAge}
                    y={invest[ages.indexOf(maxAdvantageAge)]}
                    r={6}
                    fill="green"
                    label={{ value: "Max", position: "top" }}
                  />
                )}

                <Area dataKey="gap" fill="#fca5a5" fillOpacity={0.15} />
                <Line dataKey="gap" stroke="#dc2626" />
                <Line dataKey="invest" stroke="#16a34a" />
                <Line dataKey="overpay" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ marginTop: 12, padding: 12, background: "#f5f9ff", borderLeft: "4px solid #4CAF50", borderRadius: 10 }}>
            <strong>📊 Key insights</strong>
            <ul>
              <li>{insightOutcome}</li>
              <li>{insightJourney}</li>
              <li>{insightCrossover}</li>
              <li>{insightMeaningful}</li>
              <li>{insightMax}</li>
              <li>{insightAcceleration}</li>
              <li>{insightSensitivity}</li>
              <li>{insightTrigger}</li>
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}