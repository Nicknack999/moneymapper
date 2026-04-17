import { useState } from "react";
import StudentLoanTool from "./StudentLoanTool";

export default function App() {
  const [page, setPage] = useState("home");

  const buttonStyle = {
    padding: "14px 18px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16
  };

  const cardStyle = {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 18,
    padding: 24,
    boxShadow: "0 8px 24px rgba(15,23,42,0.06)"
  };

  if (page === "student-loan") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: 20
        }}
      >
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <button
            onClick={() => setPage("home")}
            style={{
              ...buttonStyle,
              background: "#0f172a",
              color: "white",
              marginBottom: 18
            }}
          >
            ← Back to Wayli
          </button>

          <StudentLoanTool />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fafc 0%, #ffffff 55%, #ecfdf5 100%)",
        padding: 20
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* HERO */}
        <div
          style={{
            textAlign: "center",
            paddingTop: 40,
            paddingBottom: 40
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: "#0f172a"
            }}
          >
            Wayli
          </div>

          <div
            style={{
              marginTop: 14,
              fontSize: 28,
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.25
            }}
          >
            Smarter tools for life’s money choices.
          </div>

          <div
            style={{
              marginTop: 16,
              fontSize: 18,
              color: "#475569",
              maxWidth: 760,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6
            }}
          >
            Helping you to make informed decisions about your finances. 
            Is it better to overpay your student loan or invest spare cash? 
            The same applies for overpaying a mortgage or investing.
            Or how about replacing or repairing your car. 
            Oh, and how much do you need to save for retirement?
        
          </div>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <button
              onClick={() => setPage("student-loan")}
              style={{
                ...buttonStyle,
                background: "#10b981",
                color: "white"
              }}
            >
              Explore Tools
            </button>

            <button
              onClick={() => setPage("student-loan")}
              style={{
                ...buttonStyle,
                background: "#0f172a",
                color: "white"
              }}
            >
              Student Loan Tool
            </button>
          </div>

          <div
            style={{
              marginTop: 22,
              color: "#64748b",
              fontSize: 15
            }}
          >
            Smart tools for UK consumers with money on their minds.
          </div>
        </div>

        {/* TOOL CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
            marginTop: 10
          }}
        >
          <div style={cardStyle}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: "#0f172a"
              }}
            >
              🎓 Student Loan Tool
            </div>

            <div
              style={{
                marginTop: 10,
                color: "#475569",
                lineHeight: 1.6
              }}
            >
              Should you overpay your student loan or invest instead?
              Compare both routes using UK loan plans.
            </div>

            <button
              onClick={() => setPage("student-loan")}
              style={{
                ...buttonStyle,
                background: "#10b981",
                color: "white",
                marginTop: 18,
                width: "100%"
              }}
            >
              Open Tool
            </button>
          </div>

          <div style={cardStyle}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: "#0f172a"
              }}
            >
              🏠 Mortgage Tool
            </div>

            <div
              style={{
                marginTop: 10,
                color: "#475569",
                lineHeight: 1.6
              }}
            >
              Should you overpay your mortgage or invest instead?
              High-value decisions made clearer.
            </div>

            <div
              style={{
                marginTop: 18,
                color: "#10b981",
                fontWeight: 700
              }}
            >
              Coming soon
            </div>
          </div>

          <div style={cardStyle}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: "#0f172a"
              }}
            >
              🚗 Car Decision Tool
            </div>

            <div
              style={{
                marginTop: 10,
                color: "#475569",
                lineHeight: 1.6
              }}
            >
              Should you repair your car or replace it? Compare the real
              costs and trade-offs.
            </div>

            <div
              style={{
                marginTop: 18,
                color: "#10b981",
                fontWeight: 700
              }}
            >
              Coming soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}