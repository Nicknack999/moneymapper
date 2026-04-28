import { Link } from "react-router-dom";

import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import GuideCards from "../components/GuideCards";

import { theme } from "../styles/wayliTheme";
import { promoBlocks } from "../core/content/promoBlocks";

export default function GuidesPage() {
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
    boxShadow: "0 14px 40px rgba(15,23,42,0.07)"
  };

  const muted = {
    color: theme.colours.body,
    lineHeight: 1.75
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
    display: "inline-block"
  };

  const secondaryBtn = {
    ...primaryBtn,
    background: theme.colours.white,
    color: theme.colours.heading,
    border: `1px solid ${theme.colours.inputBorder}`
  };

  return (
    <>
      <SiteHeader />

      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg,#f8fafc 0%,#ffffff 60%,#ecfdf5 100%)"
        }}
      >
        <div
          style={{
            ...section,
            paddingTop: 28,
            paddingBottom: 60
          }}
        >
          {/* BREADCRUMBS */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              fontSize: 14,
              color: theme.colours.muted,
              marginBottom: 28
            }}
          >
            <Link
              to="/"
              style={{
                color: theme.colours.primary,
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              Home
            </Link>

            <span>/</span>

            <span>Guides</span>
          </div>

          {/* HERO */}
          <div
            style={{
              ...card,
              textAlign: "center",
              padding: "42px 28px"
            }}
          >
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
              Wayli guides
            </div>

            <h1
              style={{
                marginTop: 18,
                marginBottom: 0,
                fontSize: 48,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: theme.colours.heading,
                maxWidth: 760,
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              Practical money guides for real UK decisions
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
              Clear, plain-English guidance to help you make smarter
              financial choices — starting with student loans, with more
              practical tools and topics coming soon.
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
              <Link
                to="/student-loan-calculator"
                style={primaryBtn}
              >
                Use Calculator
              </Link>

              <a
                href="#student-loans"
                style={secondaryBtn}
              >
                Browse Guides
              </a>
            </div>
          </div>

          {/* GUIDES */}
          <div
            id="student-loans"
            style={{
              marginTop: 64
            }}
          >
            <div style={{ marginBottom: 18 }}>
              <h2
                style={{
                  fontSize: 34,
                  marginBottom: 10,
                  color: theme.colours.heading
                }}
              >
                Student loan guides
              </h2>

              <p style={muted}>
                Our current focus area — helping UK borrowers make clearer
                repayment and overpayment decisions.
              </p>
            </div>

            <GuideCards
              category="student-loans"
              title="Helpful guides"
              limit={5}
            />
          </div>

          {/* CTA */}
          <div
            style={{
              ...card,
              marginTop: 56,
              background:
                "linear-gradient(135deg,#ffffff 0%,#f0fdf4 100%)"
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: 32,
                color: theme.colours.heading
              }}
            >
              {promoBlocks.personalisedAnswer.title}
            </h2>

            <p
              style={{
                ...muted,
                maxWidth: 760
              }}
            >
              {promoBlocks.personalisedAnswer.text}
            </p>

            <div
              style={{
                marginTop: 22,
                display: "flex",
                gap: 12,
                flexWrap: "wrap"
              }}
            >
              <Link
                to="/student-loan-calculator"
                style={primaryBtn}
              >
                Get Personalised Answer
              </Link>

              <Link
                to="/contact"
                style={secondaryBtn}
              >
                Contact Wayli
              </Link>
            </div>
          </div>

          {/* MORE TOOLS */}
          <div
            style={{
              ...card,
              marginTop: 48,
              textAlign: "center",
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
                maxWidth: 700,
                margin: "0 auto"
              }}
            >
              {promoBlocks.moreTools.text}
            </p>

            
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}