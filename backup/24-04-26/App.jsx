import StudentLoanTool from "./core/StudentLoanTool";

export default function App() {
  const section = {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "0 20px"
  };

  const card = {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 20,
    padding: 28,
    boxShadow: "0 14px 40px rgba(15,23,42,0.08)"
  };

  const primaryBtn = {
    padding: "14px 20px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
    background: "#10b981",
    color: "#ffffff"
  };

  const secondaryBtn = {
    ...primaryBtn,
    background: "#ffffff",
    color: "#0f172a",
    border: "1px solid #cbd5e1"
  };

  const muted = {
    color: "#475569",
    lineHeight: 1.75
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#475569",
    fontWeight: 600
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fafc 0%, #ffffff 52%, #ecfdf5 100%)"
      }}
    >
      {/* NAV */}
      <div
        style={{
          borderBottom: "1px solid #e5e7eb",
          background: "rgba(255,255,255,0.92)",
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(10px)"
        }}
      >
        <div
          style={{
            ...section,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 14,
            paddingBottom: 14
          }}
        >
          <div
            style={{
              fontWeight: 800,
              fontSize: 22,
              color: "#0f172a"
            }}
          >
            Wayli
          </div>

          <div
            style={{
              display: "flex",
              gap: 18,
              flexWrap: "wrap",
              fontSize: 15
            }}
          >
            <a href="#tool" style={linkStyle}>
              Tool
            </a>

            <a href="#guide" style={linkStyle}>
              Guide
            </a>

            <a href="#future" style={linkStyle}>
              More tools
            </a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div
        style={{
          ...section,
          paddingTop: 64,
          paddingBottom: 48
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              padding: "8px 14px",
              borderRadius: 999,
              background: "#ecfdf5",
              color: "#047857",
              fontWeight: 700,
              fontSize: 14
            }}
          >
            Free UK money decision tools
          </div>

          <h1
            style={{
              marginTop: 18,
              fontSize: 44,
              lineHeight: 1.18,
              letterSpacing: "-0.02em",
              color: "#0f172a",
              maxWidth: 860,
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            Smarter tools for life’s money choices
          </h1>

          <p
            style={{
              marginTop: 18,
              maxWidth: 760,
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: 19,
              lineHeight: 1.8,
              color: "#475569"
            }}
          >
            Clearer answers for real UK money decisions —
            starting with student loans.
          </p>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap"
            }}
          >
            <a href="#tool">
              <button style={primaryBtn}>
                Try Student Loan Tool
              </button>
            </a>

            <a href="#guide">
              <button style={secondaryBtn}>
                Should I overpay?
              </button>
            </a>
          </div>

          <div
            style={{
              marginTop: 18,
              color: "#64748b",
              fontSize: 15
            }}
          >
            UK-focused • Plain English • Free to use
          </div>
        </div>
      </div>

      {/* TOOL */}
      <div
        id="tool"
        style={{
          ...section,
          paddingBottom: 46
        }}
      >
        <div style={card}>
          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#10b981",
                textTransform: "uppercase",
                letterSpacing: "0.06em"
              }}
            >
              Flagship tool
            </div>

            <h2
              style={{
                marginTop: 8,
                marginBottom: 8,
                fontSize: 30,
                lineHeight: 1.25,
                color: "#0f172a"
              }}
            >
              Student loan overpayment checker
            </h2>

            <p style={muted}>
              Compare overpaying, saving or investing the
              same monthly amount based on your UK loan
              plan, salary and balance.
            </p>
          </div>

          <StudentLoanTool />

          <div
            style={{
              marginTop: 18,
              paddingTop: 18,
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              gap: 18,
              flexWrap: "wrap",
              fontSize: 14,
              color: "#64748b"
            }}
          >
            <span>Educational estimates</span>
            <span>UK student loan plans</span>
            <span>Built to improve over time</span>
          </div>
        </div>
      </div>

      {/* GUIDE */}
      <div
        id="guide"
        style={{
          ...section,
          paddingBottom: 46
        }}
      >
        <div
          style={{
            ...card,
            background:
              "linear-gradient(135deg,#ffffff 0%,#f0fdf4 100%)"
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#10b981",
              textTransform: "uppercase",
              letterSpacing: "0.06em"
            }}
          >
            Featured guide
          </div>

          <h2
            style={{
              marginTop: 10,
              fontSize: 34,
              lineHeight: 1.22,
              color: "#0f172a"
            }}
          >
            Should I overpay my student loan?
          </h2>

          <p
            style={{
              ...muted,
              marginTop: 12,
              maxWidth: 860
            }}
          >
            Overpaying can be worthwhile for some borrowers
            and unnecessary for others. It often depends on
            whether you are likely to clear the balance,
            your loan plan, expected future income and how
            much flexibility you want with cash.
          </p>

          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16
            }}
          >
            <div style={card}>
              <h3>Often worth considering</h3>
              <p style={muted}>
                If full repayment already looks realistic,
                overpayments may reduce interest and shorten
                the repayment term.
              </p>
            </div>

            <div style={card}>
              <h3>Often less urgent</h3>
              <p style={muted}>
                If full repayment looks unlikely, keeping
                savings or using spare cash elsewhere may
                be stronger.
              </p>
            </div>

            <div style={card}>
              <h3>What matters most</h3>
              <p style={muted}>
                Your plan type, salary path, balance size
                and how valuable cash flexibility feels to
                you.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: 22,
              display: "flex",
              gap: 12,
              flexWrap: "wrap"
            }}
          >
            <a href="#tool">
              <button style={primaryBtn}>
                Check your scenario
              </button>
            </a>

            <button style={secondaryBtn}>
              Full guide coming soon
            </button>
          </div>
        </div>
      </div>

      {/* FUTURE TOOLS */}
      <div
        id="future"
        style={{
          ...section,
          paddingBottom: 46
        }}
      >
        <h2
          style={{
            fontSize: 28,
            marginBottom: 18,
            color: "#0f172a"
          }}
        >
          More tools coming soon
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18
          }}
        >
          <div style={card}>
            <h3>🏠 Mortgage tool</h3>
            <p style={muted}>
              Should you overpay your mortgage or invest
              instead?
            </p>
          </div>

          <div style={card}>
            <h3>🚗 Car decision tool</h3>
            <p style={muted}>
              Repair or replace? Compare likely costs and
              trade-offs.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          ...section,
          paddingBottom: 60
        }}
      >
        <div
          style={{
            ...card,
            textAlign: "center"
          }}
        >
          <p style={muted}>
            Wayli helps UK households make clearer money
            decisions through practical tools.
          </p>

          <p
            style={{
              marginTop: 12,
              fontWeight: 700,
              color: "#0f172a"
            }}
          >
            Questions or feedback?
          </p>

          <p style={{ color: "#475569" }}>
            wayliteam@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}