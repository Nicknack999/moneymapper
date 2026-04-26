import { useState } from "react";

export default function CarTool() {
  const [repairCost, setRepairCost] = useState(500);
  const [carValue, setCarValue] = useState(3000);
  const [runningCost, setRunningCost] = useState(1200);
  const [reliability, setReliability] = useState("average");

  const getDecision = () => {
    const repairRatio = repairCost / carValue;
    const threshold = 0.6;
    const distance = threshold - repairRatio;

    let factors = [];
    let confidence = "Medium";
    let proximityNote = "";

    if (Math.abs(distance) < 0.1) {
      proximityNote = "You are close to the replace threshold";
    }

    if (repairRatio > threshold) {
      factors.push("Repair cost is very high relative to car value");

      return {
        label: "REPLACE",
        color: "red",
        confidence: "High",
        factors,
        proximity: proximityNote,
        repairRatio: Math.round(repairRatio * 100),
        action: "Start looking for a replacement car. Avoid further major repairs."
      };
    }

    if (repairRatio > 0.4) {
      factors.push("Repair cost is moderately high relative to value");
    } else {
      factors.push("Repair cost is reasonable relative to value");
    }

    if (runningCost > 2000) {
      factors.push("Running costs are high");
    } else {
      factors.push("Running costs are acceptable");
    }

    if (reliability === "poor") {
      factors.push("Car reliability is poor");
      confidence = "High";
    } else {
      factors.push(`Reliability is ${reliability}`);
    }

    if (repairRatio < 0.3 && reliability !== "poor") {
      return {
        label: "REPAIR",
        color: "orange",
        confidence,
        factors,
        proximity: proximityNote,
        repairRatio: Math.round(repairRatio * 100),
        action: "Fix it and continue running the car."
      };
    }

    return {
      label: "KEEP",
      color: "green",
      confidence,
      factors,
      proximity: proximityNote,
      repairRatio: Math.round(repairRatio * 100),
      action: proximityNote
        ? "Proceed with caution — only repair if no further issues expected."
        : "Keep running it — no immediate action needed."
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
      <h2>🚗 Repair or Replace?</h2>

      <div style={sectionStyle}>
        <label>Repair Cost (£)</label>
        <input
          type="number"
          value={repairCost}
          onChange={(e) => setRepairCost(Number(e.target.value))}
          style={inputStyle}
        />
      </div>

      <div style={sectionStyle}>
        <label>Car Value (£)</label>
        <input
          type="number"
          value={carValue}
          onChange={(e) => setCarValue(Number(e.target.value))}
          style={inputStyle}
        />
      </div>

      <div style={sectionStyle}>
        <label>Annual Running Cost (£)</label>
        <input
          type="number"
          value={runningCost}
          onChange={(e) => setRunningCost(Number(e.target.value))}
          style={inputStyle}
        />
      </div>

      <div style={sectionStyle}>
        <label>Reliability</label>
        <select
          value={reliability}
          onChange={(e) => setReliability(e.target.value)}
          style={inputStyle}
        >
          <option value="good">Good</option>
          <option value="average">Average</option>
          <option value="poor">Poor</option>
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
          Repair/value ratio: {decision.repairRatio}% (threshold ~60%)
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

      {/* NEW: Explanation section */}
      <div style={{
        marginTop: "24px",
        padding: "16px",
        borderRadius: "12px",
        background: "#ffffff",
        border: "1px solid #eee"
      }}>
        <h4>How this decision works</h4>
        <p>
          This tool compares your repair cost to your car’s value to assess whether it’s worth fixing.
        </p>
        <p>
          As a rule of thumb:
          <br />• Under ~30% → usually worth repairing
          <br />• 30–60% → depends on reliability and running costs
          <br />• Over ~60% → often better to replace
        </p>
        <p>
          We also factor in:
          <br />• Reliability — unreliable cars are riskier to keep
          <br />• Running costs — high ongoing costs reduce value
        </p>
        <p>
          If you're close to the threshold, small changes (like higher repair costs or lower car value) can shift the decision.
        </p>
      </div>
    </div>
  );
}