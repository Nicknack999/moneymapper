import { Link } from "react-router-dom";
import StudentLoanTool from "../calculators/StudentLoanTool";

import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

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
    color: "#ffffff",
    textDecoration: "none",
    display: "inline-block"
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

  const navLink = {
    textDecoration: "none",
    color: "#475569",
    fontWeight: 600
  };

  const guideCard = {
    ...card,
    padding: 22
  };

  return (
    <>
      <SiteHeader />

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg,#f8fafc 0%,#ffffff 55%,#ecfdf5 100%)"
        }}
      >
        
        {/* HERO */}
        <div
          style={{
            ...section,
            paddingTop: 70,
            paddingBottom: 50
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
                marginBottom: 0,
                fontSize: 50,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#0f172a",
                maxWidth: 880,
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              Better money decisions start with clearer answers
            </h1>

            <p
              style={{
                marginTop: 22,
                maxWidth: 760,
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 19,
                lineHeight: 1.8,
                color: "#475569"
              }}
            >
              Wayli builds practical tools to help people make more confident
              financial choices — starting with UK student loans.
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
              <a href="#tool" style={primaryBtn}>
                Use Calculator Below
              </a>

              <Link
                to="/student-loan-calculator"
                style={secondaryBtn}
              >
                Full Calculator Page
              </Link>
            </div>

            <div
              style={{
                marginTop: 18,
                color: "#64748b",
                fontSize: 15
              }}
            >
              Plain English • UK-focused • More calculators coming
            </div>
          </div>
        </div>

        {/* TOOL */}
        <div
          id="tool"
          style={{
            ...section,
            paddingBottom: 56
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
                  fontSize: 34,
                  lineHeight: 1.2,
                  color: "#0f172a"
                }}
              >
                Student Loan Overpayment Calculator
              </h2>

              <p
                style={{
                  ...muted,
                  maxWidth: 760
                }}
              >
                Compare overpaying, saving, or keeping flexibility using your own
                numbers and UK student loan assumptions.
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
              <span>Scenario testing</span>
            </div>
          </div>
        </div>

        {/* GUIDES */}
        <div
          id="guides"
          style={{
            ...section,
            paddingBottom: 56
          }}
        >
          <div style={{ marginBottom: 22 }}>
            <h2
              style={{
                fontSize: 34,
                marginBottom: 10,
                color: "#0f172a"
              }}
            >
              Student loan guides
            </h2>

            <p style={muted}>
              Clear practical explainers to help you understand how UK student
              loans work.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18
            }}
          >
            <Link
              to="/guides/student-loans/is-overpaying-worth-it"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={guideCard}>
                <h3 style={{ marginTop: 0 }}>
                  Is overpaying worth it?
                </h3>
                <p style={muted}>
                  When overpaying can help — and when it may not.
                </p>
              </div>
            </Link>

            <Link
              to="/guides/student-loans/student-loan-30k"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={guideCard}>
                <h3 style={{ marginTop: 0 }}>
                  £30k student loan explained
                </h3>
                <p style={muted}>
                  What a £30k balance can mean in practice.
                </p>
              </div>
            </Link>

            <Link
              to="/guides/student-loans/which-student-loan-plan-am-i-on"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={guideCard}>
                <h3 style={{ marginTop: 0 }}>
                  Which plan am I on?
                </h3>
                <p style={muted}>
                  Understand Plan 1, Plan 2, Plan 5 and PG loans.
                </p>
              </div>
            </Link>

            <Link
              to="/guides/student-loans/why-two-people-on-the-same-salary-repay-different-amounts"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={guideCard}>
                <h3 style={{ marginTop: 0 }}>
                  Same salary, different repayments
                </h3>
                <p style={muted}>
                  Why two borrowers can repay very different amounts.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* FUTURE */}
        <div
          id="future"
          style={{
            ...section,
            paddingBottom: 56
          }}
        >
          <h2
            style={{
              fontSize: 32,
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
            {[
              [
                "Mortgage Overpayment Tool",
                "Should you overpay, invest instead, or stay flexible?"
              ],
              [
                "Car Replace vs Repair Tool",
                "Compare costs before making a big decision."
              ],
              [
                "Emergency Fund Planner",
                "Build a buffer that fits your situation."
              ]
            ].map(([title, text]) => (
              <div key={title} style={card}>
                <h3 style={{ marginTop: 0 }}>{title}</h3>
                <p style={muted}>{text}</p>
              </div>
            ))}
          </div>
        </div>

              {/* CONTACT CTA */}
<div
  style={{
    ...section,
    paddingBottom: 60
  }}
>
  <div
    style={{
      ...card,
      textAlign: "center",
      background:
        "linear-gradient(135deg,#ffffff 0%,#f0fdf4 100%)"
    }}
  >
    <p
      style={{
        ...muted,
        marginTop: 0,
        fontSize: 18
      }}
    >
      Wayli helps households make clearer financial decisions through
      practical tools.
    </p>

    <h2
      style={{
        marginTop: 10,
        marginBottom: 8,
        fontSize: 30,
        color: "#0f172a"
      }}
    >
      Questions, ideas or feedback?
    </h2>

    <p
      style={{
        ...muted,
        maxWidth: 700,
        margin: "0 auto"
      }}
    >
      We’d love to hear from you — whether it’s a suggestion for a new
      calculator, feedback on a tool, or a partnership idea.
    </p>

    <div
      style={{
        marginTop: 24,
        display: "flex",
        justifyContent: "center",
        gap: 12,
        flexWrap: "wrap"
      }}
    >
      <Link
        to="/contact"
        style={primaryBtn}
      >
        Contact Wayli
      </Link>

      <Link
        to="/guides"
        style={secondaryBtn}
      >
        Browse Guides
      </Link>
    </div>
  </div>
</div>

</div>

<SiteFooter />
</>
);
}