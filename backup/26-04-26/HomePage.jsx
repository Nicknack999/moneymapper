import StudentLoanTool from "../calculators/StudentLoanTool";

export default function HomePage() {
  const section = {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "0 20px"
  };

  const card = {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 24,
    padding: 28,
    boxShadow: "0 14px 40px rgba(15,23,42,0.07)"
  };

  const primaryBtn = {
    padding: "14px 20px",
    borderRadius: 14,
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
          "linear-gradient(180deg,#f8fafc 0%,#ffffff 50%,#ecfdf5 100%)"
      }}
    >
      {/* NAV */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.92)",
          borderBottom: "1px solid #e5e7eb"
        }}
      >
        <div
          style={{
            ...section,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 14,
            paddingBottom: 14,
            flexWrap: "wrap",
            gap: 14
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
          paddingTop: 70,
          paddingBottom: 54
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
            Free money decision tools
          </div>

          <h1
            style={{
              marginTop: 18,
              marginBottom: 0,
              fontSize: 48,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: "#0f172a",
              maxWidth: 860,
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            Better money decisions start
            with clearer answers
          </h1>

          <p
            style={{
              marginTop: 20,
              maxWidth: 760,
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: 19,
              lineHeight: 1.8,
              color: "#475569"
            }}
          >
            Wayli builds practical tools to help
            you make confident financial decisions
            — starting with UK student loan plans.
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
                How it works
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
            Plain English • UK-focused • More calculators on the way
          </div>
        </div>
      </div>

      {/* TOOL */}
      <div
        id="tool"
        style={{
          ...section,
          paddingBottom: 54
        }}
      >
        <div style={card}>
          <div style={{ marginBottom: 22 }}>
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
                fontSize: 32,
                lineHeight: 1.2,
                color: "#0f172a"
              }}
            >
              Student Loan Overpayment Calculator
            </h2>

            <p
              style={{
                ...muted,
                maxWidth: 760,
                marginBottom: 0
              }}
            >
              Enter your details to see whether
              overpaying looks worthwhile, how salary can
              change the picture, and other ways that money
              could be used to improve your financial future.
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
            <span>Personalised estimates</span>
            <span>UK student loan plans</span>
            <span>Plain English explanations</span>
          </div>
        </div>
      </div>

      {/* GUIDE */}
      <div
        id="guide"
        style={{
          ...section,
          paddingBottom: 54
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
            Why use this tool
          </div>

          <h2
            style={{
              marginTop: 10,
              marginBottom: 0,
              fontSize: 36,
              lineHeight: 1.2,
              color: "#0f172a"
            }}
          >
            Student loan decisions are rarely
            one-size-fits-all
          </h2>

          <p
            style={{
              ...muted,
              marginTop: 14,
              maxWidth: 860
            }}
          >
            For some, overpaying can save
            money and reduce the loan term.
            For others, it may make little
            difference as student loans are
            more like a tax than other loans.
            That means the right move often
            depends on earnings, loan plan,
            outstanding balance or how
            valuable spare cash feels now.
          </p>
        </div>
      </div>

      {/* FUTURE */}
      <div
        id="future"
        style={{
          ...section,
          paddingBottom: 54
        }}
      >
        <h2
          style={{
            fontSize: 30,
            marginTop: 0,
            marginBottom: 18,
            color: "#0f172a"
          }}
        >
          More decision tools coming soon
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18
          }}
        >
          {[
            [
              "Mortgage Overpayment Tool",
              "Should you overpay your mortgage, invest instead, or keep cash flexible?"
            ],
            [
              "Car Replace vs Repair Tool",
              "Compare likely costs, timing and trade-offs before making a decision."
            ],
            [
              "Emergency Fund Planner",
              "Build a cash buffer based on your bills, income and comfort level."
            ]
          ].map(([title, text]) => (
            <div key={title} style={card}>
              <h3 style={{ marginTop: 0 }}>
                {title}
              </h3>
              <p style={muted}>{text}</p>
            </div>
          ))}
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
          <p
            style={{
              ...muted,
              marginTop: 0
            }}
          >
            Wayli helps households make clearer
            financial decisions through practical tools.
          </p>

          <p
            style={{
              marginTop: 12,
              marginBottom: 8,
              fontWeight: 700,
              color: "#0f172a"
            }}
          >
            Questions or feedback?
          </p>

          <p
            style={{
              color: "#475569",
              margin: 0
            }}
          >
            wayliteam@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}