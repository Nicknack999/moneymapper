import { useState } from "react";
import StudentLoanTool from "./StudentLoanTool";
import { wayliMessages } from "./wayliMessages";

export default function App() {
  const [page] = useState("home");

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
    lineHeight: 1.7
  };

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
            paddingTop: 56,
            paddingBottom: 56
          }}
        >
          <div
            style={{
              fontSize: 44,
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
            Smarter tools for life's money choices
          </div>

          <div
            style={{
              marginTop: 18,
              fontSize: 18,
              color: "#475569",
              maxWidth: 760,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.8
            }}
          >
            We're building Wayli into a simpler,
            clearer decision platform for UK households.
            <br />
            Practical guidance for real money choices —
            without the calculator clutter.
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: 30,
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <button
              style={{
                ...buttonStyle,
                background: "#10b981",
                color: "white",
                cursor: "default"
              }}
            >
              Coming Soon
            </button>

            <button
              style={{
                ...buttonStyle,
                background: "#ffffff",
                color: "#0f172a",
                border: "1px solid #cbd5e1",
                cursor: "default"
              }}
            >
              Free Tools In Development
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
            
            <span>✔ Plain-English guidance</span>
            <span>✔ Built for real decisions</span>
          </div>
        </div>

        {/* REBUILD MESSAGE */}
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
              fontSize: 13,
              fontWeight: 700,
              color: "#065f46",
              textTransform: "uppercase"
            }}
          >
            In Progress
          </div>

          <h2
            style={{
              marginTop: 10,
              marginBottom: 10,
              color: "#065f46"
            }}
          >
            Wayli is evolving
          </h2>

          <div
            style={{
              color: "#065f46",
              lineHeight: 1.8
            }}
          >
            We started by testing calculator tools.
            <br />
            We are now building something better:
            smart decision tools that help people know
            what to do next.
          </div>
        </div>

        {/* WHAT'S COMING */}
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
              🎓 Student Loan Tool
            </h3>

            <div style={muted}>
              Clearer answers on whether to
              overpay, invest or keep it simple.
            </div>

            <div
              style={{
                marginTop: 14,
                color: "#10b981",
                fontWeight: 700
              }}
            >
              Rebuilding now
            </div>
          </div>

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
              Repair or replace?
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
        </div>

        {/* WHY WAYLI */}
        <div style={{ ...cardStyle, marginBottom: 18 }}>
          <h3 style={{ marginTop: 0 }}>
            Why Wayli?
          </h3>

          <div style={muted}>
            Most money sites give number
            <br />
            Wayli aims to help make things clearer
            <br />
            Calm thinking for real life
          </div>
        </div>

        {/* EDUCATION / TRUST */}
        <div style={{ ...cardStyle, marginBottom: 18 }}>
          <h3 style={{ marginTop: 0 }}>
            Our approach
          </h3>

          <div style={muted}>
            {wayliMessages.education.assumptions}
            <br />
            {wayliMessages.education.notAdvice}
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
            Wayli helps households make clearer
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