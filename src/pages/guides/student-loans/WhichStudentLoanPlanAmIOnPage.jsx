import { Link } from "react-router-dom";

import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import GuideCards from "../../../components/GuideCards";

import { theme } from "../../../styles/wayliTheme";
import { promoBlocks } from "../../../core/content/promoBlocks";

export default function WhichStudentLoanPlanAmIOnPage() {
  const pageTitle =
    "Which student loan plan am I on? UK guide | Wayli";

  const pageDescription =
    "Find out which UK student loan plan you are on, how repayments work, compare Plan 1, Plan 2, Plan 4, Plan 5 and postgraduate loans, and check official sources.";

  const cards = [
    [
      "Employed through payroll",
      "For many borrowers, repayments are deducted automatically through PAYE once earnings go above the relevant threshold."
    ],
    [
      "Income changes",
      "If earnings fall below the threshold, deductions may reduce or stop."
    ],
    [
      "Self-employed",
      "Repayments are often handled through Self Assessment rather than payroll deductions."
    ],
    [
      "Why your plan matters",
      "Your plan can affect thresholds, deductions and how long repayments may continue."
    ]
  ];

  const faqs = [
    {
      q: "Do I manually pay my student loan every month?",
      a: "Not if you are employed. Repayments are commonly deducted automatically through your employer's payroll once your earnings go above the relevant threshold."
    },
    {
      q: "Why is money coming off my payslip?",
      a: "Student loan deductions may begin when your income goes above the repayment threshold and your employer's payroll records show repayments are due."
    },
    {
      q: "How do I make sure I am repaying the correct amount?",
      a: "Keep your employment and contact details up to date with the relevant student loan organisation."
    },
    {
      q: "What if I change jobs?",
      a: "Your new employer will usually handle deductions through payroll once the correct information is in place."
    },
    {
      q: "What if I stop working or my income falls?",
      a: "If earnings fall below the relevant threshold, deductions may reduce or stop."
    },
    {
      q: "I am self-employed. How does repayment usually work?",
      a: "Repayments are often handled through Self Assessment rather than PAYE deductions."
    },
    {
      q: "Can two people on the same salary repay different amounts?",
      a: "Yes. Different plans can mean different thresholds and deductions."
    },
    {
      q: "Should I overpay before I know my plan?",
      a: "Usually better to confirm your plan first, then make decisions with clearer numbers."
    }
  ];

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

        <meta
          name="description"
          content={pageDescription}
        />

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
            <Link to="/" style={{ color: theme.colours.primary, textDecoration: "none", fontWeight: 600 }}>
              Home
            </Link>

            <span>/</span>

            <Link to="/guides" style={{ color: theme.colours.primary, textDecoration: "none", fontWeight: 600 }}>
              Guides
            </Link>

            <span>/</span>

            <span>Which student loan plan am I on?</span>
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
              Which student loan plan am I on?
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
              Not sure whether you are on Plan 1, Plan 2,
              Plan 4, Plan 5 or a postgraduate loan?
              You are not alone.
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
                Use calculator
              </Link>

              <a href="#plans" style={secondaryBtn}>
                Compare plans
              </a>
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div style={{ ...card, marginTop: 56 }}>
            <h2 style={{ marginTop: 0, fontSize: 32, color: theme.colours.heading }}>
              How student loan repayments usually work
            </h2>

            <p style={muted}>
              For many borrowers, repayments are linked to income rather than manually paying a monthly bill.
            </p>

            <p style={muted}>
              If you are employed, deductions may be taken through PAYE payroll once earnings go above the threshold.
            </p>

            <p style={muted}>
              If you are self-employed, repayments are often handled through Self Assessment instead.
            </p>
          </div>

          {/* QUICK CARDS */}
          <div
            style={{
              marginTop: 56,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18
            }}
          >
            {cards.map(([title, text]) => (
              <div key={title} style={card}>
                <h3 style={{ marginTop: 0, fontSize: 22, color: theme.colours.heading }}>
                  {title}
                </h3>

                <p style={muted}>{text}</p>
              </div>
            ))}
          </div>

          {/* TABLE */}
          <div
            id="plans"
            style={{
              ...card,
              marginTop: 56
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: 32, color: theme.colours.heading }}>
              Student loan plans compared
            </h2>

            <p style={muted}>
              Updated using official April 2026 thresholds. Figures updated annually.
            </p>

            <div
              style={{
                marginTop: 24,
                overflowX: "auto",
                border: `1px solid ${theme.colours.neutralBorder}`,
                borderRadius: 18
              }}
            >
              <table style={{ width: "100%", minWidth: 900, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: theme.colours.pageBg }}>
                    {[
                      "Plan",
                      "Threshold",
                      "Rate",
                      "Interest",
                      "Write-off",
                      "Often linked to"
                    ].map((item) => (
                      <th
                        key={item}
                        style={{
                          textAlign: "left",
                          padding: 16,
                          borderBottom: `1px solid ${theme.colours.neutralBorder}`
                        }}
                      >
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {[
                    ["Plan 1", "£26,900", "9%", "3.2%", "25 years", "Older borrowers"],
                    ["Plan 2", "£29,385", "9%", "Variable", "30 years", "England / Wales"],
                    ["Plan 4", "£33,795", "9%", "3.2%", "30 years", "Scotland"],
                    ["Plan 5", "£25,000", "9%", "3.2%", "40 years", "Newer England borrowers"],
                    ["Postgraduate", "£21,000", "6%", "6.2%", "30 years", "Masters / Doctoral"]
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell) => (
                        <td
                          key={cell}
                          style={{
                            padding: 16,
                            borderBottom: `1px solid ${theme.colours.neutralBorder}`
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

          {/* WHY IT MATTERS */}
          <div
            style={{
              ...card,
              marginTop: 56,
              background:
                "linear-gradient(135deg,#ffffff 0%,#f0fdf4 100%)"
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: 32, color: theme.colours.heading }}>
              Why knowing your plan matters
            </h2>

            <p style={muted}>
              Two people on the same salary can repay different amounts simply because they are on different plans.
            </p>

            <p style={muted}>
              Thresholds, deductions and long-term outcomes can vary.
            </p>
          </div>

          {/* CTA */}
          <div
            style={{
              ...card,
              marginTop: 56,
              textAlign: "center"
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: 32, color: theme.colours.heading }}>
              Once you know your plan, run your numbers
            </h2>

            <p
              style={{
                ...muted,
                maxWidth: 700,
                margin: "0 auto"
              }}
            >
              Knowing your plan is step one. It helps you understand what it could mean for your money.
            </p>

            <div style={{ marginTop: 22 }}>
              <Link
                to="/student-loan-calculator"
                style={primaryBtn}
              >
                Use calculator
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ ...card, marginTop: 56 }}>
            <h2 style={{ marginTop: 0, fontSize: 32, color: theme.colours.heading }}>
              Frequently asked questions
            </h2>

            <div style={{ marginTop: 24 }}>
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  style={{
                    paddingBottom: 20,
                    marginBottom: 20,
                    borderBottom: `1px solid ${theme.colours.neutralBorder}`
                  }}
                >
                  <h3 style={{ marginTop: 0, marginBottom: 10, fontSize: 20 }}>
                    {faq.q}
                  </h3>

                  <p style={{ ...muted, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RELATED */}
          <div style={{ marginTop: 56 }}>
            <GuideCards
              category="student-loans"
              title="Related guides"
              limit={3}
              excludeUrl="/guides/student-loans/which-student-loan-plan-am-i-on"
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