import { useState } from "react";

export default function MortgageTool() {
  const [rate, setRate] = useState(1.29);
  const [returnRate, setReturnRate] = useState(5);
  const [yearsToRetirement, setYearsToRetirement] = useState(4);
  const [cashBuffer, setCashBuffer] = useState("medium");

  const getDecision = () => {
    const gap = returnRate - rate;

    let factors = [];
    let confidence = "Medium";
    let proximityNote = "";

    // Detect close decision
    if (Math.abs(gap) < 1) {
      proximityNote = "You are close to the tipping point between investing and repaying";
    }

    // Strong KEEP case
    if (gap > 2 && yearsToRetirement > 3) {
      factors.push("Investment returns significantly exceed mortgage rate");
      factors.push("Sufficient time before retirement");

      return {
        label: "KEEP",
        color: "green",
        confidence: "High",
        factors,
        proximity: proximityNote,
        gap: gap.toFixed(1),
        action: "Keep the mortgage and prioritise investing."
      };
    }

    // Strong PAY OFF case
    if (rate > returnRate || yearsToRetirement <= 2) {
      factors.push("Mortgage cost is high relative to investment return");
      factors.push("Approaching retirement reduces risk tolerance");

      return {
        label: "PAY OFF",
        color: "red",
        confidence: "High",
        factors,
        proximity: proximityNote,
        gap: gap.toFixed(1),
        action: "Consider paying off the mortgage to reduce financial risk."
      };
    }

    // Medium zone
    factors.push("Difference between mortgage and investment return is modest");

    if (cashBuffer === "low") {
      factors.push("Limited cash buffer reduces flexibility");
    } else {
      factors.push("Cash buffer provides flexibility");
    }

    return {
      label: "PREPARE",
      color: "orange",
      confidence,
      factors,
      proximity: proximityNote,
      gap: gap.toFixed(1),
      action: "Build cash and keep options open before making a final decision."
    };
  };

  const decision = getDecision();

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginTop: "4px"
  };

  const sectionStyle = {
    marginBottom: "16px"
  };

  return (
    <div>
      <h2>🏠 Keep or Pay Off Mortgage?</h2>

      <div style={sectionStyle}>
        <label>Mortgage Rate (%)</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          style={inputStyle}
        />
      </div>

      <div style={sectionStyle}>
        <label>Expected Investment Return (%)</label>
        <input
          type="number"
          value={returnRate}
          onChange={(e) => setReturnRate(Number(e.target.value))}
          style={inputStyle}
        />
      </div>

      <div style={sectionStyle}>
        <label>Years to Retirement</label>
        <input
          type="number"
          value={yearsToRetirement}
          onChange={(e) => setYearsToRetirement(Number(e.target.value))}
          style={inputStyle}
        />
      </div>

      <div style={sectionStyle}>
        <label>Cash Buffer</label>
        <select
          value={cashBuffer}
          onChange={(e) => setCashBuffer(e.target.value)}
          style={inputStyle}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div style={{
        marginTop: "20px",
        padding: "16px",
        borderRadius: "12px",
        background: "#f9fafb",
        border: "1px solid #eee"
      }}>
        <p style={{ fontSize: "12px" }}>DECISION</p>

        <h2 style={{ color: decision.color, margin: 0 }}>
          {decision.label}
        </h2>

        <p style={{ marginTop: "8px", fontWeight: "bold" }}>
          Confidence: {decision.confidence}
        </p>

        {decision.proximity && (
          <p style={{ color: "#f59e0b", fontWeight: "bold" }}>
            ⚠️ {decision.proximity}
          </p>
        )}

        <p style={{ marginTop: "6px" }}>
          Return vs mortgage gap: {decision.gap}%
        </p>

        <div style={{ marginTop: "10px" }}>
          <p style={{ fontWeight: "600" }}>Why:</p>
          <ul>
            {decision.factors.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>

        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          👉 {decision.action}
        </p>
      </div>

      <div style={{
        marginTop: "24px",
        padding: "16px",
        borderRadius: "12px",
        border: "1px solid #eee"
      }}>
        <h4>How this decision works</h4>
        <p>
          This compares your mortgage interest rate with expected investment returns.
        </p>
        <p>
          • If investments outperform your mortgage → keeping the mortgage may be better  
          • If mortgage costs are higher → paying off reduces risk  
        </p>
        <p>
          Time to retirement and cash reserves also matter — as you get closer to retirement,
          reducing risk becomes more important than maximising returns.
        </p>
      </div>
    </div>
  );
}