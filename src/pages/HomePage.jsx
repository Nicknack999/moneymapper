import { Link } from "react-router-dom";
import StudentLoanTool from "../calculators/StudentLoanTool";

import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import GuideCards from "../components/GuideCards";

import { theme } from "../styles/wayliTheme";
import { promoBlocks } from "../core/content/promoBlocks";

export default function HomePage() {
  const section = {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "0 20px"
  };

  const card = {
    background: theme.colours.white,
    border: `1px solid ${theme.colours.neutralBorder}`,
    borderRadius: 24,
    padding: 28,
    boxShadow: theme.shadow.card
  };

  const primaryBtn = {
    padding: "14px 20px",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 16,
    background: theme.colours.primary,
    color: theme.colours.white,
    textDecoration: "none",
    display: "inline-block",
    boxShadow: theme.shadow.button
  };

  const secondaryBtn = {
    ...primaryBtn,
    background: theme.colours.white,
    color: theme.colours.heading,
    border: `1px solid ${theme.colours.inputBorder}`,
    boxShadow: "none"
  };

  const muted = {
    color: theme.colours.body,
    lineHeight: 1.75
  };

  const smallHeading = {
    fontSize: 18,
    fontWeight: 700,
    color: theme.colours.heading,
    marginTop: 0,
    marginBottom: 10
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
            paddingBottom: 56
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                padding: "8px 14px",
                borderRadius: 999,
                background: theme.colours.successBg,
                color: theme.colours.successText,
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
                color: theme.colours.heading,
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
                color: theme.colours.body
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
                color: theme.colours.muted,
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
            paddingBottom: 64
          }}
        >
          <div style={card}>
            <div style={{ marginBottom: 22 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: theme.colours.primary,
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
                  color: theme.colours.heading
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
                borderTop: `1px solid ${theme.colours.neutralBorder}`,
                display: "flex",
                gap: 18,
                flexWrap: "wrap",
                fontSize: 14,
                color: theme.colours.muted
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
            paddingBottom: 64
          }}
        >
          <GuideCards
            category="student-loans"
            title="Explore guides"
            limit={4}
          />
        </div>

        {/* FUTURE */}
        <div
          id="future"
          style={{
            ...section,
            paddingBottom: 64
          }}
        >
          <div
            style={{
              ...card,
              background:
                "linear-gradient(135deg,#ffffff 0%,#f8fafc 100%)"
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: 10,
                fontSize: 30,
                color: theme.colours.heading
              }}
            >
              {promoBlocks.moreTools.title}
            </h2>

            <p
              style={{
                ...muted,
                marginBottom: 24
              }}
            >
              {promoBlocks.moreTools.text}
            </p>

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
                <div
                  key={title}
                  style={{
                    background: theme.colours.white,
                    border: `1px solid ${theme.colours.neutralBorder}`,
                    borderRadius: 18,
                    padding: 22
                  }}
                >
                  <h3 style={smallHeading}>{title}</h3>
                  <p style={muted}>{text}</p>
                </div>
              ))}
            </div>
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
                color: theme.colours.heading
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