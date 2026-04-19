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
    lineHeight: 1.7
  };

  // ---------------------------------
  // TOOL PAGE (TEMPORARY BETA ACCESS)
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
              Beta preview
            </div>

            <div
              style={{
                color: "#065f46",
                lineHeight: 1.7
              }}
            >
              We are rebuilding Wayli into a clearer
              decision platform. This tool remains
              available while we improve the next version.
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
            paddingTop: 52,
            paddingBottom: 52
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
              lineHeight: 1.8
            }}
          >
            We&apos;re rebuilding Wayli into a simpler,
            more trusted decision platform for UK households.
            <br />
            Clear answers. Plain English. Real-life money choices.
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
              onClick={() => setPage("student-loan")}
              style={{
                ...buttonStyle,
                background: "#10b981",
                color: "white"
              }}
            >
              Use Current Student Loan Beta
            </button>

            <button
              style={{
                ...buttonStyle,
                background: "#ffffff",
                color: "#0f172a",
                border: "1px solid #cbd5e1"
              }}
            >
              New Version Coming Soon
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
            <span>✔ Plain-English guidance</span>
            <span>✔ Built for real decisions</span>
          </div>
        </div>

        {/* REBUILD MESSAGE */}
        <div
          style={{
            ...cardStyle,
            marginBottom: 18,
            background: "#f8fafc"
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#10b981",
              textTransform: "uppercase"
            }}
          >
            In Progress
          </div>

          <h2
            style={{
              marginTop: 10,
              marginBottom: 10,
              color: "#0f172a"
            }}
          >
            Wayli is evolving
          </h2>

          <div style={muted}>
            We started with calculators.
            <br />
            We are now building something better:
            decision tools that help people know
            what to do next.
          </div>
        </div>

        {/* CURRENT TOOL */}
        <div style={{ ...cardStyle, marginBottom: 18 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#10b981",
              textTransform: "uppercase"
            }}
          >
            Available Now
          </div>

          <h2
            style={{
              marginTop: 10,
              marginBottom: 10,
              color: "#0f172a"
            }}
          >
            🎓 Student Loan Tool (Beta)
          </h2>

          <div style={muted}>
            Compare whether overpaying,
            investing or paying the minimum
            may suit you best.
          </div>

          <div
            style={{
              marginTop: 14,
              color: "#64748b",
              lineHeight: 1.7
            }}
          >
            {wayliMessages.education.assumptions}
            <br />
            {wayliMessages.education.notAdvice}
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
            Try Beta Tool
          </button>
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
              🎓 Student Loan V2
            </h3>

            <div style={muted}>
              Clearer recommendations,
              simpler outputs,
              smarter guidance.
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>
              🏠 Mortgage Tool
            </h3>

            <div style={muted}>
              Should you overpay
              your mortgage or invest instead?
            </div>
          </div>

          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>
              🚗 Car Decision Tool
            </h3>

            <div style={muted}>
              Repair, replace,
              finance or keep driving?
            </div>
          </div>
        </div>

        {/* WHY WAYLI */}
        <div style={{ ...cardStyle, marginBottom: 18 }}>
          <h3 style={{ marginTop: 0 }}>
            Why Wayli?
          </h3>

          <div style={muted}>
            Most money sites give numbers.
            <br />
            Wayli aims to give decisions.
            <br />
            Clear thinking for real life.
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