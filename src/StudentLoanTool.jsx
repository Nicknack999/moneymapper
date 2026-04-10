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
  Area
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
        selectedOverpay,
        setter === setReturnRate ? value : null
      );
      setResult(data);
      setFlipRate(data.flip_return_rate ?? null);
      setLoading(false);
    }
  };

  const ages = result?.curves?.ages || [];
  const investNetWorth = result?.curves?.invest_net_worth || [];
  const overpayNetWorth = result?.curves?.overpay_net_worth || [];

  const wealthDiff = result?.insights?.wealth_difference ?? null;
  const breakEvenSalary = result?.insights?.break_even_salary;
  const loanWrittenOff = result?.insights?.loan_written_off;

  let recommendation = "";
  let recommendationWhy = [];
  let decisionStrength = "neutral";

  if (wealthDiff !== null) {
    if (Math.abs(wealthDiff) < 5000) {
      recommendation = "Either option is broadly similar";
      decisionStrength = "neutral";
    } else if (wealthDiff < 0) {
      recommendation = "Invest instead of overpaying";
      decisionStrength = flipRate ? "sensitive" : "strong";
    } else {
      recommendation = "Overpay your loan";
      decisionStrength = "strong";
    }
  }

  const chartData = ages.map((age, i) => ({
    age,
    invest_net_worth: investNetWorth[i] ?? 0,
    overpay_net_worth: overpayNetWorth[i] ?? 0,
    gap: (investNetWorth[i] ?? 0) - (overpayNetWorth[i] ?? 0)
  }));

  const formatCurrency = (v) =>
    v !== null && v !== undefined
      ? `£${Math.round(v).toLocaleString()}`
      : "-";

  const formatAxis = (v) =>
    `£${(v / 1000).toFixed(0)}k`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload) return null;

    return (
      <div style={{ background: "#fff", border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
        <strong>Age {label}</strong>
        {payload.map((p, i) => (
          <div key={i}>
            {p.name}: {formatCurrency(p.value)}
          </div>
        ))}
      </div>
    );
  };

  // Dynamic insights
  let insightOutcome = "";
  let insightRepayment = "";
  let insightTrigger = "";

  if (wealthDiff !== null) {
    insightOutcome = wealthDiff < 0
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

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "auto" }}>

      <h2>🎓 Student Loan</h2>

      {/* Inputs */}
      <div>
        <label>Salary (£)</label>
        <input value={salary} onChange={(e) => setSalary(Number(e.target.value))} />
        <label>Loan Balance (£)</label>
        <input value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
      </div>

      {/* Scenario Controls */}
      <div style={{ marginTop: "20px", padding: "12px", border: "1px solid #eee", borderRadius: "8px" }}>
        <strong>Adjust your scenario</strong>

        <div>Investment return: {returnRate.toFixed(1)}%</div>
        <input type="range" min="0" max="10" step="0.1"
          value={returnRate}
          onChange={(e) => updateAndRun(setReturnRate, Number(e.target.value))} />

        <div>Loan interest: {loanInterest}%</div>
        <input type="range" min="0" max="10" step="0.1"
          value={loanInterest}
          onChange={(e) => updateAndRun(setLoanInterest, Number(e.target.value))} />

        <div>Write-off period: {writeOffYears} years</div>
        <input type="range" min="20" max="40" step="1"
          value={writeOffYears}
          onChange={(e) => updateAndRun(setWriteOffYears, Number(e.target.value))} />
      </div>

      <button onClick={runModel}>Run Model</button>

      {/* Overpay visibility */}
      <p style={{ marginTop: "10px" }}>
        You are currently overpaying <strong>£{selectedOverpay}/month</strong>
      </p>

      {/* Flip feedback */}
      {flipRate && (
        <p style={{ color: "#9333ea" }}>
          ⚠️ Decision flips below {flipRate.toFixed(1)}% return
        </p>
      )}

      {/* Results */}
      {result && (
        <div>

          <h3>{recommendation}</h3>

          {chartData.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="age" />
                <YAxis tickFormatter={formatAxis} />
                <Tooltip content={<CustomTooltip />} />
                <Line dataKey="gap" stroke="#dc2626" />
                <Line dataKey="invest_net_worth" stroke="#16a34a" />
                <Line dataKey="overpay_net_worth" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          )}

          <ul>
            {insightOutcome && <li>{insightOutcome}</li>}
            {insightRepayment && <li>{insightRepayment}</li>}
            {insightTrigger && <li>{insightTrigger}</li>}
          </ul>

        </div>
      )}

    </div>
  );
}