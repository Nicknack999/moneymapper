import { useState, useEffect } from "react";
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
    plan1: { name: "Plan 1", threshold: 26065, years: 25, typicalStartAge: 21 },
    plan2: { name: "Plan 2", threshold: 27295, years: 30, typicalStartAge: 21 },
    plan5: { name: "Plan 5", threshold: 25000, years: 40, typicalStartAge: 21 },
    pg: { name: "Postgraduate", threshold: 21000, years: 30, typicalStartAge: 24 }
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

  const getDefaultEndAge = (planKey, userAge) => {
    const p = plans[planKey];
    return Math.max(userAge + 1, p.typicalStartAge + p.years);
  };

  const getDifferenceText = (diff, age, direction) => {
    const amount = Math.abs(diff);

    if (amount < 1000) {
      return `By age ${age}, both routes are projected to leave you in a very similar overall position.`;
    }

    if (direction === "Investing") {
      return `By age ${age}, investing is estimated to leave you ${money(
        amount
      )} better off overall.`;
    }

    if (direction === "Overpaying") {
      return `By age ${age}, overpaying is estimated to leave you ${money(
        amount
      )} better off overall.`;
    }

    return "";
  };

  // ---------------------------------
  // STATE
  // ---------------------------------
  const [tab, setTab] = useState("summary");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [plan, setPlan] = useState("plan2");
  const [salary, setSalary] = useState(40000);
  const [balance, setBalance] = useState(50000);
  const [overpay, setOverpay] = useState(100);
  const [currentAge, setCurrentAge] = useState(30);
  const [compareUntilAge, setCompareUntilAge] = useState(51);
  const [returnRate, setReturnRate] = useState(5);
  const [loanInterest, setLoanInterest] = useState(6);

  const selectedPlan = plans[plan];

  // only set default ONCE or when empty
  useEffect(() => {
    if (!compareUntilAge) {
      setCompareUntilAge(getDefaultEndAge(plan, currentAge));
    }
  }, [plan]);

  const canRun =
    salary !== "" &&
    balance !== "" &&
    currentAge !== "" &&
    compareUntilAge !== "";

  // ---------------------------------
  // MODEL CALL
  // ---------------------------------
  const runModel = async () => {
    if (!canRun || loading) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`${API_URL}/full-model`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salary: Number(salary),
          loan_balance: Number(balance),
          current_age: Number(currentAge),
          retirement_age: Number(compareUntilAge),
          monthly_savings: 200,
          overpay: Number(overpay),
          return_rate: Number(returnRate) / 100,
          loan_interest: Number(loanInterest) / 100,
          write_off_years: selectedPlan.years,
          model_opportunity_cost: true
        })
      });

      const data = await res.json();
      setResult(data);
      setTab("summary");
    } catch {
      setError("We couldn't load your comparison.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------
  // RESULT DATA
  // ---------------------------------
  const ages = result?.curves?.ages || [];
  const invest = result?.curves?.invest_net_worth || [];
  const overpayCurve = result?.curves?.overpay_net_worth || [];
  const wealthDiff = result?.insights?.wealth_difference ?? null;

  const direction =
    wealthDiff === null
      ? "Either route"
      : wealthDiff < 0
      ? "Investing"
      : "Overpaying";

  const chartData = ages.map((age, i) => ({
    age,
    invest: invest[i] ?? 0,
    overpay: overpayCurve[i] ?? 0
  }));

  // ---------------------------------
  // TOOLTIP (UPGRADED)
  // ---------------------------------
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    const investVal = payload[0]?.value ?? 0;
    const overpayVal = payload[1]?.value ?? 0;
    const diff = investVal - overpayVal;

    return (
      <div style={{ background: "white", padding: 12, borderRadius: 10 }}>
        <strong>Age {label}</strong>

        <div style={{ marginTop: 6 }}>
          If you invested:
          <br />
          {money(investVal)}
        </div>

        <div style={{ marginTop: 6 }}>
          If you overpaid:
          <br />
          {money(overpayVal)}
        </div>

        <div style={{ marginTop: 8, fontWeight: 600 }}>
          {Math.abs(diff) < 500
            ? "Both options are similar here"
            : diff > 0
            ? `Investing is ahead by ${money(diff)}`
            : `Overpaying is ahead by ${money(-diff)}`}
        </div>
      </div>
    );
  };

  // ---------------------------------
  // UI
  // ---------------------------------
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
      {/* HEADER */}
      <h1>Student Loan: Overpay or Invest?</h1>

      <p>
        This compares your estimated overall financial position under each option,
        based on UK student loan rules.
      </p>

      {/* INPUTS */}
      <div style={{ marginTop: 20 }}>
        <input value={salary} onChange={(e) => setSalary(parseNum(e.target.value))} />
        <input value={balance} onChange={(e) => setBalance(parseNum(e.target.value))} />
        <input value={currentAge} onChange={(e) => setCurrentAge(parseNum(e.target.value))} />
        <input value={compareUntilAge} onChange={(e) => setCompareUntilAge(parseNum(e.target.value))} />
      </div>

      <button onClick={runModel} disabled={!canRun || loading}>
        {loading ? "Running..." : "Compare"}
      </button>

      {/* RESULTS */}
      {result && (
        <>
          <h2 style={{ marginTop: 30 }}>
            {getDifferenceText(wealthDiff, compareUntilAge, direction)}
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis tickFormatter={moneyK} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />

              <Line dataKey="invest" stroke="#10b981" name="If you invested" />
              <Line dataKey="overpay" stroke="#2563eb" name="If you overpaid" />
            </LineChart>
          </ResponsiveContainer>

          <p style={{ marginTop: 12, color: "#475569" }}>
            This shows your estimated overall financial position at each age,
            taking into account loan repayments, interest, and investment growth.
          </p>
        </>
      )}
    </div>
  );
}