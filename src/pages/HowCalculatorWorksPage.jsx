import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function HowCalculatorWorksPage() {
  const section = {
    maxWidth: 1020,
    margin: "0 auto",
    padding: "0 20px"
  };

  const card = {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 24,
    padding: 28,
    boxShadow: "0 14px 40px rgba(15,23,42,0.06)"
  };

  const muted = {
    color: "#475569",
    lineHeight: 1.8,
    fontSize: 18
  };

  const heading = {
    fontSize: 34,
    marginTop: 0,
    marginBottom: 14,
    color: "#0f172a"
  };

  const subHeading = {
    fontSize: 24,
    marginTop: 0,
    marginBottom: 12,
    color: "#0f172a"
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 16
  };

  const th = {
    textAlign: "left",
    padding: "12px 10px",
    borderBottom: "1px solid #e5e7eb",
    color: "#0f172a"
  };

  const td = {
    padding: "12px 10px",
    borderBottom: "1px solid #f1f5f9",
    color: "#475569"
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
            "linear-gradient(180deg,#f8fafc 0%,#ffffff 58%,#ecfdf5 100%)"
        }}
      >
        {/* BREADCRUMBS */}
        <div
          style={{
            ...section,
            paddingTop: 22,
            paddingBottom: 10,
            fontSize: 14,
            color: "#64748b"
          }}
        >
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Link
              to="/"
              style={{
                color: "#10b981",
                textDecoration: "none",
                fontWeight: 700
              }}
            >
              Home
            </Link>

            <span>/</span>
            <span>How Our Calculator Works</span>
          </div>
        </div>

        {/* HERO */}
        <div
          style={{
            ...section,
            paddingTop: 26,
            paddingBottom: 34,
            textAlign: "center"
          }}
        >
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
            Behind the curtain
          </div>

          <h1
            style={{
              marginTop: 18,
              marginBottom: 0,
              fontSize: 52,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#0f172a"
            }}
          >
            How our student loan
            <br />
            calculator works
          </h1>

          <p
            style={{
              marginTop: 22,
              maxWidth: 760,
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: 20,
              lineHeight: 1.8,
              color: "#475569"
            }}
          >
            Most calculators give answers. We show the workings.
            Here are the formulas, assumptions and scenarios behind
            your result.
          </p>
        </div>

        {/* INPUTS */}
        <div style={{ ...section, paddingBottom: 28 }}>
          <div style={card}>
            <h2 style={heading}>The numbers you enter</h2>

            <p style={muted}>
              Your estimate starts with the details you give us.
            </p>

            <ul
              style={{
                paddingLeft: 22,
                lineHeight: 2,
                color: "#475569",
                fontSize: 18,
                marginBottom: 0
              }}
            >
              <li>Loan plan</li>
              <li>Current salary</li>
              <li>Current balance</li>
              <li>Age</li>
              <li>Optional monthly overpayment</li>
            </ul>
          </div>
        </div>

        {/* CORE FORMULA */}
        <div style={{ ...section, paddingBottom: 28 }}>
          <div style={card}>
            <h2 style={heading}>How repayments are calculated</h2>

            <p style={muted}>
              For most undergraduate plans, repayments are based on
              earnings above the threshold.
            </p>

            <div
              style={{
                padding: 18,
                borderRadius: 18,
                background: "#f8fafc",
                color: "#0f172a",
                fontWeight: 800,
                fontSize: 24
              }}
            >
              Annual repayment = (Salary − Threshold) × Repayment rate
            </div>

            <p style={{ ...muted, marginTop: 18 }}>
              If salary is below the threshold, repayments are £0.
            </p>
          </div>
        </div>

        {/* PLAN 2 EXAMPLE */}
        <div style={{ ...section, paddingBottom: 28 }}>
          <div
            style={{
              ...card,
              background:
                "linear-gradient(135deg,#ffffff 0%,#f0fdf4 100%)"
            }}
          >
            <h2 style={heading}>Worked example: Plan 2</h2>

            <p style={muted}>
              Salary: £40,000
              <br />
              Threshold: £27,295
            </p>

            <div
              style={{
                display: "grid",
                gap: 12
              }}
            >
              <div style={muted}>
                Repayable income = £40,000 − £27,295 = <strong>£12,705</strong>
              </div>

              <div style={muted}>
                Annual repayment = £12,705 × 9% = <strong>£1,143</strong>
              </div>

              <div style={muted}>
                Approx monthly repayment = <strong>£95</strong>
              </div>
            </div>

            <p style={{ ...muted, marginTop: 18 }}>
              This is why two people on different salaries can repay
              very different amounts, even with similar loan balances.
            </p>
          </div>
        </div>

        {/* INTEREST */}
        <div style={{ ...section, paddingBottom: 28 }}>
          <div style={card}>
            <h2 style={heading}>Why balances can still rise</h2>

            <p style={muted}>
              Repayments and interest are separate.
            </p>

            <p style={muted}>
              If interest added to the balance is higher than the
              amount repaid that year, the balance can increase even
              while repayments are being made.
            </p>

            <p style={muted}>
              Some plans, especially Plan 2, can use variable interest
              rates that may change over time. Our calculator uses a
              representative current assumption and clearly labels
              results as estimates.
            </p>
          </div>
        </div>

        {/* SALARY GROWTH */}
        <div style={{ ...section, paddingBottom: 28 }}>
          <div style={card}>
            <h2 style={heading}>Why future salary matters</h2>

            <p style={muted}>
              Student loan outcomes are often shaped by future income,
              not just today’s salary.
            </p>

            <p style={muted}>
              To make results more realistic, we test more than one
              earnings path:
            </p>

            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Scenario</th>
                  <th style={th}>Annual salary growth</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td style={td}>Flat earnings</td>
                  <td style={td}>0%</td>
                </tr>

                <tr>
                  <td style={td}>Steady progression</td>
                  <td style={td}>2%</td>
                </tr>

                <tr>
                  <td style={td}>Stronger progression</td>
                  <td style={td}>4%</td>
                </tr>
              </tbody>
            </table>

            <p style={{ ...muted, marginTop: 18 }}>
              We do not predict your salary. We test scenarios to see
              how the picture could change.
            </p>
          </div>
        </div>

        {/* PLAN TABLE */}
        <div style={{ ...section, paddingBottom: 28 }}>
          <div style={card}>
            <h2 style={heading}>Plan rules we use</h2>

            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Plan</th>
                  <th style={th}>Threshold</th>
                  <th style={th}>Rate</th>
                  <th style={th}>Write-off</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td style={td}>Plan 1</td>
                  <td style={td}>£26,065</td>
                  <td style={td}>9%</td>
                  <td style={td}>25 years</td>
                </tr>

                <tr>
                  <td style={td}>Plan 2</td>
                  <td style={td}>£27,295</td>
                  <td style={td}>9%</td>
                  <td style={td}>30 years</td>
                </tr>

                <tr>
                  <td style={td}>Plan 4</td>
                  <td style={td}>£33,795</td>
                  <td style={td}>9%</td>
                  <td style={td}>30 years</td>
                </tr>

                <tr>
                  <td style={td}>Plan 5</td>
                  <td style={td}>£25,000</td>
                  <td style={td}>9%</td>
                  <td style={td}>40 years</td>
                </tr>

                <tr>
                  <td style={td}>Postgraduate</td>
                  <td style={td}>£21,000</td>
                  <td style={td}>6%</td>
                  <td style={td}>30 years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* MODEL THINKING */}
        <div style={{ ...section, paddingBottom: 28 }}>
          <div style={card}>
            <h2 style={heading}>How we tried to make it more useful</h2>

            <ul
              style={{
                paddingLeft: 22,
                lineHeight: 2,
                color: "#475569",
                fontSize: 18,
                marginBottom: 0
              }}
            >
              <li>Plan-specific thresholds and repayment rates</li>
              <li>Age-based years remaining before write-off</li>
              <li>Different salary growth scenarios</li>
              <li>Optional overpayments</li>
              <li>Comparing overpaying with saving or investing</li>
            </ul>
          </div>
        </div>

        {/* STRAIGHT ANSWER */}
        <div style={{ ...section, paddingBottom: 28 }}>
          <div style={card}>
            <h2 style={heading}>Straight answer</h2>

            <p style={muted}>
              No calculator can know your exact future.
            </p>

            <p style={muted}>
              But a good calculator can show the forces that matter,
              test sensible scenarios, and help you make a smarter
              next move.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ ...section, paddingBottom: 70 }}>
          <div
            style={{
              ...card,
              textAlign: "center"
            }}
          >
            <h2 style={subHeading}>
              Ready to run your numbers?
            </h2>

            <p style={muted}>
              Try the calculator with your own salary, balance and
              plan.
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
                to="/student-loan-calculator"
                style={primaryBtn}
              >
                Use the Calculator
              </Link>

              <Link
                to="/guides"
                style={secondaryBtn}
              >
                Read Guides
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}