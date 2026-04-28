import { Link } from "react-router-dom";

import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import GuideCards from "../../../components/GuideCards";

import { theme } from "../../../styles/wayliTheme";
import { promoBlocks } from "../../../core/content/promoBlocks";

export default function StudentLoan30kPage() {
  const pageTitle =
    "Should I overpay my student loan on £30k? | Wayli";

  const pageDescription =
    "Should you overpay your UK student loan on a £30,000 salary? Learn when it may help, when it may not, and compare overpaying vs saving with Wayli.";

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

            <span>Should I overpay on £30k?</span>
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
                color: theme.colours.heading,
                maxWidth: 880,
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              Should I overpay my student loan on £30k?
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
              If you earn £30,000 in the UK, overpaying your
              student loan may help in some cases — but it is
              far from automatic.
            </p>

            <p
              style={{
                marginTop: 14,
                maxWidth: 760,
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 18,
                lineHeight: 1.8,
                color: theme.colours.body
              }}
            >
              For many borrowers, future salary growth,
              flexibility and other priorities matter more
              than modest extra payments today.
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
                Use Student Loan Calculator UK
              </Link>

              <a
                href="#decision"
                style={secondaryBtn}
              >
                Read quick answer
              </a>
            </div>
          </div>

          {/* QUICK ANSWER */}
          <div
            id="decision"
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
              The short-ish answer
            </h2>

            <div style={muted}>
              <p>
                On £30k, many borrowers are making
                automatic repayments already.
              </p>

              <p>
                But depending on your loan plan, balance and
                future earnings, extra payments may or may
                not significantly improve the final outcome.
              </p>

              <p>
                In plain English: £30k can be a useful review
                point, not an automatic “yes, overpay now”
                signal.
              </p>
            </div>
          </div>

          {/* KEY CARDS */}
          <div
            style={{
              marginTop: 56,
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18
            }}
          >
            {[
              [
                "Income is only one factor",
                "The same salary can produce different outcomes depending on plan, balance and career path."
              ],
              [
                "Flexibility has value",
                "Cash savings can solve problems overpayments cannot."
              ],
              [
                "Future earnings matter",
                "Higher earnings later can change the repayment picture."
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

          {/* WHY 30K */}
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
              Why £30k is a common decision point
            </h2>

            <div style={muted}>
              <p>
                At this salary, many borrowers notice their
                repayments and start asking whether paying
                extra is worth it.
              </p>

              <p>
                Fair question. But future income growth can
                sometimes matter more than repaying £50–£100
                extra today.
              </p>

              <p>
                If your salary rises over time, standard
                repayments may rise too — which can change
                whether overpaying looks strong or weak.
              </p>
            </div>
          </div>

          {/* OPTIONS */}
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
              What £100 per month could do
            </h2>

            <div
              style={{
                marginTop: 24,
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 16
              }}
            >
              {[
                [
                  "Overpay loan",
                  "May help more if full repayment already looks realistic."
                ],
                [
                  "Build savings",
                  "Creates resilience for emergencies or career changes."
                ],
                [
                  "Invest long term",
                  "Could build more wealth depending on returns and timeframe."
                ]
              ].map(([title, text]) => (
                <div
                  key={title}
                  style={{
                    background: theme.colours.white,
                    border: `1px solid ${theme.colours.successBorder}`,
                    borderRadius: 18,
                    padding: 18
                  }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      fontSize: 20,
                      color: theme.colours.heading
                    }}
                  >
                    {title}
                  </h3>

                  <p style={muted}>{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* QUESTIONS */}
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
              Questions worth asking first
            </h2>

            <div
              style={{
                marginTop: 24,
                display: "grid",
                gap: 14
              }}
            >
              {[
                "Am I likely to repay the balance in full anyway?",
                "Do I need easier access to this money?",
                "Could this money help elsewhere first?",
                "Is my salary likely to grow?"
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    border: `1px solid ${theme.colours.neutralBorder}`,
                    borderRadius: 16,
                    padding: 16,
                    background: theme.colours.pageBg
                  }}
                >
                  {item}
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
              excludeUrl="/guides/student-loans/student-loan-30k"
            />
          </div>

          {/* CTA */}
          <div
            style={{
              ...card,
              marginTop: 56,
              textAlign: "center",
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
              Want a clearer answer for your numbers?
            </h2>

            <p
              style={{
                ...muted,
                maxWidth: 700,
                margin: "0 auto"
              }}
            >
              Salary alone does not decide this. Use your own
              plan, balance and overpayment amount.
            </p>

            <div style={{ marginTop: 22 }}>
              <Link
                to="/student-loan-calculator"
                style={primaryBtn}
              >
                Use Student Loan Calculator UK
              </Link>
            </div>
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