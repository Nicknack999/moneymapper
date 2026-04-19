import { useState } from "react";
import StudentLoanTool from "./StudentLoanTool";
import { wayliMessages } from "./wayliMessages";

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

  const muted = {
    color: "#475569",
    lineHeight: 1.6
  };

  // ---------------------------------
  // TOOL PAGE
  // ---------------------------------
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

          {/* TRUST BANNER */}
          <div
            style={{
              ...cardStyle,
              marginBottom: 18,
              background: "#ecfdf5",
              border: "1px solid #bbf7d0"
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "#065f46",
                marginBottom: 8
              }}
            >
              Before you begin
            </div>

            <div
              style={{
                color: "#065f46",
                lineHeight: 1.7
              }}
            >
              {wayliMessages.education.assumptions}
              <br />
              {wayliMessages.education.notAdvice}
            </div>
          </div>

          <StudentLoanTool />
        </div>
      </div>
    );
  }

  // ---------------------------------
  // HOME PAGE
  // ---------------------------------
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
            paddingTop: 44,
            paddingBottom: 44
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
              fontSize: 30,
              fontWeight: 800,
              color: "#0f172a",
              lineHeight: 1.2
            }}
          >
            Smarter tools for life&apos;s money choices
          </div>

          <div
            style={{
              marginTop: 18,
              fontSize: 18,
              color: "#475569",
              maxWidth: 760,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7
            }}
          >
            Start with our Student Loan Tool — compare
            overpaying, investing, or paying the minimum.
            <br />
            More practical decision tools for mortgages,
            cars and other major money choices coming soon.
          </div>

          {/* CTA */}
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
              Try Student Loan Tool
            </button>

            <button
              style={{
                ...buttonStyle,
                background: "#ffffff",
                color: "#0f172a",
                border: "1px solid #cbd5e1"
              }}
            >
              More Tools Coming Soon
            </button>
          </div>

          {/* TRUST ROW */}
          <div
            style={{
              marginTop: 22,
              fontSize: 15,
              color: "#64748b",
              display: "flex",
              gap: 18,
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <span>✔ UK-focused</span>
            <span>✔ Free to use</span>
            <span>✔ Plain-English results</span>
            <span>✔ Built for real decisions</span>
          </div>
        </div>

        {/* FEATURED TOOL */}
        <div style={{ ...cardStyle, marginBottom: 18 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#10b981",
              textTransform: "uppercase"
            }}
          >
            Start Here
          </div>

          <h2
            style={{
              marginTop: 10,
              marginBottom: 10,
              color: "#0f172a"
            }}
          >
            🎓 Student Loan Tool
          </h2>

          <div style={muted}>
            Should you overpay your student loan,
            invest instead, or keep paying the minimum?
            <br />
            Compare long-term outcomes in minutes.
          </div>

          <div
            style={{
              marginTop: 14,
              color: "#64748b",
              lineHeight: 1.7
            }}
          >
            {wayliMessages.education.taxLike}
          </div>

          <button
            onClick={() => setPage("student-loan")}
            style={{
              ...buttonStyle,
              background: "#10b981",
              color: "white",
              marginTop: 18
            }}
          >
            Use Tool Free
          </button>
        </div>

        {/* HOW IT WORKS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 18,
            marginBottom: 18
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>
              Compare Options
            </h3>

            <div style={muted}>
              See different routes side by side
              instead of relying on guesswork.
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>
              Understand Trade-Offs
            </h3>

            <div style={muted}>
              See what may change outcomes over time.
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>
              Decide Clearly
            </h3>

            <div style={muted}>
              Plain-English outputs built for real life.
            </div>
          </div>
        </div>

        {/* INSIGHTS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
            marginBottom: 18
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>
              Typical Insights
            </h3>

            <div style={muted}>
              • Salary where repayment becomes more likely
              <br />
              • Years earlier debt could clear
              <br />
              • Growth potential of investing instead
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>
              What Matters Most
            </h3>

            <div style={muted}>
              Best maths outcome and best personal
              choice are not always the same thing.
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>
              Stress Test Choices
            </h3>

            <div style={muted}>
              Try higher salary, lower returns,
              bigger overpayments or later ages.
            </div>
          </div>
        </div>

        {/* COMING SOON */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
            marginBottom: 18
          }}
        >
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>
              🏠 Mortgage Tool
            </h3>

            <div style={muted}>
              Should you overpay your mortgage
              or invest instead?
            </div>

            <div
              style={{
                marginTop: 14,
                color: "#10b981",
                fontWeight: 700
              }}
            >
              Coming soon
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>
              🚗 Car Decision Tool
            </h3>

            <div style={muted}>
              Should you repair or replace
              your car?
            </div>

            <div
              style={{
                marginTop: 14,
                color: "#10b981",
                fontWeight: 700
              }}
            >
              Coming soon
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>
              🏡 More Tools
            </h3>

            <div style={muted}>
              Rent vs buy, retirement choices,
              savings decisions and more.
            </div>

            <div
              style={{
                marginTop: 14,
                color: "#10b981",
                fontWeight: 700
              }}
            >
              In development
            </div>
          </div>
        </div>

        {/* GUIDES */}
        <div style={{ ...cardStyle, marginBottom: 18 }}>
          <h3 style={{ marginTop: 0 }}>
            Popular Guides
          </h3>

          <div style={muted}>
            • Should I overpay my student loan in the UK?
            <br />
            • Mortgage overpay vs invest: what matters most
            <br />
            • When is a car repair not worth it?
          </div>
        </div>

        {/* FOOTER */}
        <div
          style={{
            ...cardStyle,
            textAlign: "center"
          }}
        >
          <div style={muted}>
            Wayli helps UK households make clearer
            money decisions through practical tools.
          </div>

          <div
            style={{
              marginTop: 12,
              color: "#0f172a",
              fontWeight: 700
            }}
          >
            Questions or feedback?
          </div>

          <div
            style={{
              marginTop: 6,
              color: "#475569"
            }}
          >
            wayliteam@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}