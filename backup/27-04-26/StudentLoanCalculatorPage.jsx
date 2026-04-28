import { Link } from "react-router-dom";
import StudentLoanTool from "../calculators/StudentLoanTool";

import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function StudentLoanCalculatorPage() {
  const section = {
    maxWidth: 1100,
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

  const muted = {
    color: "#475569",
    lineHeight: 1.75
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
        {/* BREADCRUMBS */}
        <div
          style={{
            ...section,
            paddingTop: 22,
            paddingBottom: 6,
            fontSize: 14,
            color: "#64748b"
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap"
            }}
          >
            <Link
              to="/"
              style={{
                color: "#10b981",
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              Home
            </Link>

            <span>/</span>

            <span>Tools</span>

            <span>/</span>

            <span>Student Loan Calculator UK</span>
          </div>
        </div>

        {/* HERO */}
        <div
          style={{
            ...section,
            paddingTop: 42,
            paddingBottom: 40
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
              Free UK calculator
            </div>

            <h1
              style={{
                marginTop: 18,
                marginBottom: 0,
                fontSize: 48,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#0f172a"
              }}
            >
              Student Loan Calculator UK
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
              Compare overpaying, saving or keeping flexibility using UK
              student loan assumptions. Built to help you make clearer money
              decisions.
            </p>

            <div
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap"
              }}
            >
              <span style={{ color: "#64748b", fontSize: 14 }}>
                No signup
              </span>

              <span style={{ color: "#64748b", fontSize: 14 }}>
                UK-focused
              </span>

              <span style={{ color: "#64748b", fontSize: 14 }}>
                Plain English results
              </span>

              <span style={{ color: "#64748b", fontSize: 14 }}>
                Free tool
              </span>
            </div>
          </div>
        </div>

        {/* TOOL */}
        <div
          style={{
            ...section,
            paddingBottom: 44
          }}
        >
          <div style={card}>
            <StudentLoanTool />
          </div>
        </div>

        {/* EXPLAINER */}
        <div
          style={{
            ...section,
            paddingBottom: 44
          }}
        >
          <div style={card}>
            <h2
              style={{
                marginTop: 0,
                fontSize: 32,
                color: "#0f172a"
              }}
            >
              Should you overpay your student loan?
            </h2>

            <p style={muted}>
              It depends on whether you are likely to repay the balance in full,
              your current salary, your loan plan, and what else that money could
              do for you.
            </p>

            <p style={muted}>
              For some borrowers, overpaying may reduce total cost or shorten the
              repayment period. For others, keeping cash flexible or investing
              elsewhere may be stronger.
            </p>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                gap: 12,
                flexWrap: "wrap"
              }}
            >
              <Link
                to="/guides/student-loans/is-overpaying-worth-it"
                style={primaryBtn}
              >
                Read guide
              </Link>

              <Link
                to="/guides"
                style={secondaryBtn}
              >
                Browse guides
              </Link>
            </div>
          </div>
        </div>

        {/* GUIDES */}
        <div
          style={{
            ...section,
            paddingBottom: 44
          }}
        >
          <h2
            style={{
              fontSize: 30,
              color: "#0f172a",
              marginBottom: 18
            }}
          >
            Helpful guides
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18
            }}
          >
            <Link
              to="/guides/student-loans/which-student-loan-plan-am-i-on"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={card}>
                <h3 style={{ marginTop: 0 }}>
                  Which student loan plan am I on?
                </h3>

                <p style={muted}>
                  Understand Plan 1, Plan 2, Plan 5 and postgraduate loans.
                </p>
              </div>
            </Link>

            <Link
              to="/guides/student-loans/is-overpaying-worth-it"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={card}>
                <h3 style={{ marginTop: 0 }}>
                  Is overpaying worth it?
                </h3>

                <p style={muted}>
                  Learn when overpaying can help and when it may not.
                </p>
              </div>
            </Link>

            <Link
              to="/guides/student-loans/why-two-people-on-the-same-salary-repay-different-amounts"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div style={card}>
                <h3 style={{ marginTop: 0 }}>
                  Same salary, different repayments
                </h3>

                <p style={muted}>
                  Why similar earners can repay very different amounts.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* CTA */}
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
            <h2
              style={{
                marginTop: 0,
                color: "#0f172a"
              }}
            >
              Explore more tools soon
            </h2>

            <p style={muted}>
              Mortgage, savings, car ownership and more decision tools are in
              development.
            </p>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap"
              }}
            >
              <Link to="/" style={secondaryBtn}>
                Back to Home
              </Link>

              <Link to="/guides" style={primaryBtn}>
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