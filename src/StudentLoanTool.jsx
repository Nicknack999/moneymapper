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

  // -----------------------------
  // DATA
  // -----------------------------
  const ages = result?.curves?.ages || [];
  const investNetWorth = result?.curves?.invest_net_worth || [];
  const overpayNetWorth = result?.curves?.overpay_net_worth || [];

  const wealthDiff = result?.insights?.wealth_difference ?? null;
  const breakEvenOverpay = result?.insights?.break_even_overpay;
  const breakEvenSalary = result?.insights?.break_even_salary;
  const loanWrittenOff = result?.insights?.loan_written_off;

  // -----------------------------
  // DECISION LOGIC
  // -----------------------------
  let recommendation = "";
  let recommendationWhy = [];

  if (wealthDiff !== null) {
    if (Math.abs(wealthDiff) < 5000) {
      recommendation = "Either option is broadly similar";
      recommendationWhy = [
        "The difference is small under current assumptions",
        "Small changes could shift the outcome",
        flipRate ? `Decision flips around ${flipRate.toFixed(1)}% returns` : "Stable outcome"
      ];
    } else if (wealthDiff < 0) {
      recommendation = "Invest instead of overpaying";
      recommendationWhy = [
        "Higher long-term wealth",
        "Compounding returns outweigh interest savings",
        flipRate
          ? `Only flips below ~${flipRate.toFixed(1)}% returns`
          : "Decision remains strong even at lower returns"
      ];
    } else {
      recommendation = "Overpay your loan";
      recommendationWhy = [
        "Interest savings outweigh investment returns",
        "Loan cost is higher than expected returns"
      ];
    }
  }

  // -----------------------------
  // CHART DATA
  // -----------------------------
  const chartData = ages.map((age, i) => ({
    age,
    invest_net_worth: investNetWorth[i] ?? 0,
    overpay_net_worth: overpayNetWorth[i] ?? 0,
    gap: (investNetWorth[i] ?? 0) - (overpayNetWorth[i] ?? 0)
  }));

  // -----------------------------
  // FORMAT
  // -----------------------------
  const formatCurrency = (v) =>
    v !== null && v !== undefined
      ? `£${Math.round(v).toLocaleString()}`
      : "-";

  const formatAxis = (v) =>
    `£${(v / 1000).toFixed(0)}k`;

  // -----------------------------
  // TOOLTIP
  // -----------------------------
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload) return null;

    return (
      <div style={{
        background: "#fff",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "8px"
      }}>
        <strong>Age {label}</strong>
        {payload.map((p, i) => (
          <div key={i}>
            {p.name}: {formatCurrency(p.value)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "auto" }}>

      <h2>🎓 Student Loan</h2>

      {/* INPUTS */}
      <div className="input-row">
        <div className="input-group">
          <label>Salary (£)</label>
          <input
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Loan Balance (£)</label>
          <input
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
        </div>
      </div>

      <button onClick={runModel} style={{ marginTop: "10px" }}>
        Run Model
      </button>

      {loading && <p style={{ marginTop: "10px" }}>Calculating...</p>}

      {/* SLIDER */}
      <div style={{ marginTop: "20px", padding: "12px", border: "1px solid #eee", borderRadius: "8px" }}>
        <label>Investment Return: <strong>{returnRate.toFixed(1)}%</strong></label>

        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={returnRate}
          onChange={(e) => updateAndRun(setReturnRate, Number(e.target.value))}
          style={{ width: "100%" }}
        />

        {flipRate !== null ? (
          <p style={{ color: "#9333ea" }}>
            💡 If returns fall below <strong>{flipRate.toFixed(1)}%</strong>, the decision changes
          </p>
        ) : result && (
          <p style={{ color: "#059669" }}>
            💡 Investing remains better even with much lower returns — this is a strong decision
          </p>
        )}
      </div>

      {/* ASSUMPTIONS */}
      <div style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
        <strong>Assumptions</strong>
        <ul>
          <li>Investment return: {returnRate.toFixed(1)}%</li>
          <li>Loan interest: {loanInterest}%</li>
          <li>Write-off period: {writeOffYears} years</li>
        </ul>
      </div>

      {/* BREAK EVEN */}
      {breakEvenOverpay !== null && (
        <p style={{ color: "#666" }}>
          Break-even overpay ≈ <strong>£{breakEvenOverpay}/mo</strong>
        </p>
      )}

      {/* RECOMMENDATION */}
{result && (
  <div style={{ marginTop: "20px" }}>
    
    {/* Main recommendation */}
    <div style={{
      padding: "15px",
      background: "#ecfdf5",
      borderRadius: "10px"
    }}>
      <strong>✅ Recommendation: {recommendation}</strong>
      <ul style={{ marginTop: "8px" }}>
        {recommendationWhy.map((w, i) => <li key={i}>{w}</li>)}
      </ul>
    </div>

    {/* 👇 NEW: KEY INSIGHTS */}
    <div style={{
      marginTop: "12px",
      padding: "12px",
      background: "#f5f9ff",
      borderLeft: "4px solid #4CAF50",
      borderRadius: "10px"
    }}>
      <strong>📊 Key insights</strong>

      <ul style={{ marginTop: "6px", fontSize: "14px", paddingLeft: "18px" }}>
        <li>Investing leads to higher long-term wealth</li>
        <li>Compounding outweighs loan interest over time</li>
        <li>The financial gap widens significantly later in life</li>
      </ul>
    </div>

    {/* WHY */}
    <div style={{
      marginTop: "12px",
      padding: "12px",
      background: loanWrittenOff ? "#fff7ed" : "#eef2ff",
      borderRadius: "10px",
      border: "1px solid #ddd"
    }}>
      <strong>💡 Why this happens</strong>

      <div style={{ marginTop: "6px", fontSize: "14px" }}>
        {loanWrittenOff ? (
          <>
            You’re unlikely to fully repay your loan, so extra payments don’t reduce what you repay overall.
            <br /><br />
            Investing instead allows your money to grow.
          </>
        ) : (
          <>
            You’re on track to repay your loan in full.
            <br /><br />
            Investing gives your money time to grow — leading to better outcomes.
          </>
        )}
      </div>
    </div>

  </div>
)}

      {/* CHART */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age" />
          <YAxis tickFormatter={formatAxis} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine y={0} stroke="#999" />

          <Area dataKey="gap" stroke="none" fill="#fca5a5" fillOpacity={0.15} />

          <Line dataKey="gap" stroke="#dc2626" strokeWidth={2} dot={false} name="Difference" />
          <Line dataKey="invest_net_worth" stroke="#16a34a" name="Invest" />
          <Line dataKey="overpay_net_worth" stroke="#2563eb" name="Overpay" />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}