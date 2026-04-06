import { useState } from "react";
import MortgageTool from "./MortgageTool";
import CarTool from "./CarTool";
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
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setTool("mortgage")}>🏠 Mortgage</button>
        <button onClick={() => setTool("car")}>🚗 Car</button>
        <button onClick={() => setTool("loan")}>🎓 Student Loan</button>
      </div>

      {/* CONTENT */}
      <div
        style={{
          padding: 20,
          border: "1px solid #eee",
          borderRadius: 10,
        }}
      >
        {tool === "mortgage" && <MortgageTool />}
        {tool === "car" && <CarTool />}
        {tool === "loan" && <StudentLoanTool />}
      </div>
    </div>
  );
}