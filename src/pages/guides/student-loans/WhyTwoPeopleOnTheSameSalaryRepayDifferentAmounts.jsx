import { Link } from "react-router-dom";

import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import GuideCards from "../../../components/GuideCards";

import { theme } from "../../../styles/wayliTheme";
import { promoBlocks } from "../../../core/content/promoBlocks";

export default function WhyTwoPeopleSameSalaryRepayDifferentAmountsPage() {
  const pageTitle =
    "Why two people on the same salary can repay different student loan amounts | Wayli";

  const pageDescription =
    "See why two people earning the same salary can repay different UK student loan amounts depending on Plan 1, Plan 2, Plan 4, Plan 5 or postgraduate loans.";

  const section = {
    maxWidth: 1100,
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

  const muted = {
    color: theme.colours.body,
    lineHeight: 1.8
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
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

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

            <Link
              to="/guides"
              style={{
                color: theme.colours.primary,
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              Guides
            </Link>

            <span>/</span>

            <span>Same salary, different repayments</span>
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
              Wayli guide
            </div>

            <h1
              style={{
                marginTop: 18,
                marginBottom: 0,
                fontSize: 46,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: theme.colours.heading
              }}
            >
              Why two people on the same salary can repay different amounts
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
              Two graduates can earn the same salary and still make different
              student loan repayments. Your loan plan, threshold, interest rules
              and write-off timing often matter more than salary alone.
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
                Try the Wayli calculator
              </Link>

              <a
                href="#example"
                style={secondaryBtn}
              >
                See example
              </a>
            </div>
          </div>

          {/* QUICK CARDS */}
          <div
            style={{
              marginTop: 56,
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18
            }}
          >
            {[
              [
                "Thresholds matter",
                "Repayments usually only begin above your plan threshold."
              ],
              [
                "Time matters",
                "Some plans run longer before any remaining balance is written off."
              ],
              [
                "Future income matters",
                "Pay rises can change whether full repayment becomes likely."
              ]
            ].map(([title, text]) => (
              <div key={title} style={card}>
                <h3
                  style={{
                    marginTop: 0,
                    fontSize: 22,
                    color: theme.colours.heading
                  }}
                >
                  {title}
                </h3>

                <p style={muted}>{text}</p>
              </div>
            ))}
          </div>

          {/* WHY */}
          <div
            style={{
              ...card,
              marginTop: 56
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: 32,
                color: theme.colours.heading
              }}
            >
              Why does this happen?
            </h2>

            <p style={muted}>
              UK student loans were introduced at different times with
              different rules. That means borrowers can sit on different
              plans even when earning the same amount today.
            </p>

            <p style={muted}>
              Two people on £40k, £45k or £60k can therefore see different
              deductions simply because thresholds, interest rules or
              write-off dates are not identical.
            </p>
          </div>

          {/* EXAMPLE */}
          <div
            id="example"
            style={{
              ...card,
              marginTop: 56
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: 32,
                color: theme.colours.heading
              }}
            >
              Example: two borrowers earning £45k
            </h2>

            <p style={muted}>
              Imagine two people both earn £45,000 and both owe student loans.
              One is on Plan 1 and the other is on Plan 2.
            </p>

            <p style={muted}>
              Their deductions can differ because each plan uses different
              thresholds. One borrower may repay more each year or reduce the
              balance faster.
            </p>

            <div
              style={{
                marginTop: 24,
                overflowX: "auto",
                border: `1px solid ${theme.colours.neutralBorder}`,
                borderRadius: 18
              }}
            >
              <table
                style={{
                  width: "100%",
                  minWidth: 700,
                  borderCollapse: "collapse"
                }}
              >
                <thead>
                  <tr style={{ background: theme.colours.pageBg }}>
                    {[
                      "Plan",
                      "Threshold",
                      "Approx yearly repayment",
                      "Write-off"
                    ].map((item) => (
                      <th
                        key={item}
                        style={{
                          textAlign: "left",
                          padding: 16,
                          borderBottom:
                            `1px solid ${theme.colours.neutralBorder}`
                        }}
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {[
                    ["Plan 1", "£26,900", "Higher", "25 years / legacy"],
                    ["Plan 2", "£29,385", "Lower", "30 years"],
                    ["Plan 5", "£25,000", "Higher", "40 years"]
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => (
                        <td
                          key={cell}
                          style={{
                            padding: 16,
                            borderBottom:
                              `1px solid ${theme.colours.neutralBorder}`
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* OVERPAYING */}
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
              What this means for overpaying
            </h2>

            <p style={muted}>
              Overpaying can be more useful if you are already likely to clear
              the balance anyway. In those cases, extra payments may reduce
              interest or help you finish sooner.
            </p>

            <p style={muted}>
              For others, keeping flexibility, building savings or investing
              may be stronger.
            </p>
          </div>

          {/* FAQ */}
          <div
            style={{
              ...card,
              marginTop: 56
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: 32,
                color: theme.colours.heading
              }}
            >
              Frequently asked questions
            </h2>

            <div style={{ marginTop: 24 }}>
              {[
                [
                  "Does the same salary always mean the same repayment?",
                  "No. Your student loan plan, threshold and write-off rules can all change what you repay."
                ],
                [
                  "Should I overpay on £45k?",
                  "Possibly. It depends on whether full repayment already looks realistic."
                ],
                [
                  "How do I check my own situation?",
                  "Use a calculator that compares your plan, salary, balance and overpayment options."
                ]
              ].map(([q, a]) => (
                <div
                  key={q}
                  style={{
                    paddingBottom: 20,
                    marginBottom: 20,
                    borderBottom:
                      `1px solid ${theme.colours.neutralBorder}`
                  }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      marginBottom: 10,
                      fontSize: 20
                    }}
                  >
                    {q}
                  </h3>

                  <p style={{ ...muted, margin: 0 }}>
                    {a}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 10 }}>
              <Link
                to="/student-loan-calculator"
                style={primaryBtn}
              >
                Use calculator
              </Link>
            </div>
          </div>

          {/* RELATED */}
          <div style={{ marginTop: 56 }}>
            <GuideCards
              category="student-loans"
              title="Related guides"
              limit={3}
              excludeUrl="/guides/student-loans/why-two-people-on-the-same-salary-repay-different-amounts"
            />
          </div>

          {/* MORE TOOLS */}
          <div
            style={{
              ...card,
              marginTop: 56,
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