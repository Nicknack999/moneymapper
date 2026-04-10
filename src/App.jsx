import { useState } from "react";
import StudentLoanTool from "./StudentLoanTool";

export default function App() {
  const [tool, setTool] = useState("loan");

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        fontFamily: "system-ui",
      }}
    >
      <h1 style={{ marginBottom: 10 }}>MoneyMapper</h1>

      <p style={{ marginBottom: 20, color: "#555" }}>
        Make smarter financial decisions with real projections
      </p>

      {/* NAV */}
      <div className="tool-selector">
        <button
          className={`tool ${tool === "loan" ? "active" : ""}`}
          onClick={() => setTool("loan")}
        >
          🎓 Student Loan
          <small>Invest vs overpay</small>
        </button>

        <button className="tool coming-soon">
          🏠 Mortgage
          <small>Overpay vs invest</small>
          <span>Coming next</span>
        </button>

        <button className="tool coming-soon">
          🚗 Car Finance
          <small>Loan vs cash decision</small>
          <span>Coming next</span>
        </button>

        <button className="tool coming-soon">
          🧓 Retirement
          <small>Can I retire early?</small>
          <span>Coming next</span>
        </button>
      </div>

      {/* CONTENT */}
      <div
        style={{
          padding: 20,
          border: "1px solid #eee",
          borderRadius: 10,
        }}
      >
        {tool === "loan" && <StudentLoanTool />}
      </div>
    </div>
  );
}