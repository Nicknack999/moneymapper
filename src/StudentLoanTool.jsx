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

// ✅ JOURNEY + ACCELERATION (FIXED)
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

// ✅ SENSITIVITY
if (flipRate) {
  insightSensitivity = `This result depends on returns around ${returnRate.toFixed(1)}%. Lower returns (below ~${flipRate.toFixed(1)}%) could change the outcome`;
}