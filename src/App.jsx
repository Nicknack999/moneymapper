import { useState } from "react";
import StudentLoanTool from "./StudentLoanTool";

export default function App() {
  const [page, setPage] = useState("home");

  const buttonStyle = {
    padding: "14px 18px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
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
            ← Back to MoneyMapper
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
            MoneyMapper
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
            Life’s a journey. Map your money wisely.
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
            Simple tools to explore your options and plan ahead clearly.
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
              Student Loan: Should I Overpay?
            </button>
          </div>

          <div
            style={{
              marginTop: 22,
              color: "#64748b",
              fontSize: 15
            }}
          >
            We’re building more tools to help you navigate life’s big money
            decisions.
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
              🎓 Student Loan
            </div>

            <div
              style={{
                marginTop: 10,
                color: "#475569",
                lineHeight: 1.6
              }}
            >
              Compare overpaying your loan with investing the same money.
              Built for UK student loan plans.
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
              🏠 Mortgage Tools
            </div>

            <div
              style={{
                marginTop: 10,
                color: "#475569",
                lineHeight: 1.6
              }}
            >
              Overpayments, term reduction and smarter repayment scenarios.
            </div>

            <div
              style={{
                marginTop: 18,
                color: "#10b981",
                fontWeight: 600
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
              💰 Savings & Investing
            </div>

            <div
              style={{
                marginTop: 10,
                color: "#475569",
                lineHeight: 1.6
              }}
            >
              Explore growth scenarios, trade-offs and future value planning.
            </div>

            <div
              style={{
                marginTop: 18,
                color: "#10b981",
                fontWeight: 600
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