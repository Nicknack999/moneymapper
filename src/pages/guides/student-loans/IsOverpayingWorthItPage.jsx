import { Link } from "react-router-dom";

import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import GuideCards from "../../../components/GuideCards";

import { theme } from "../../../styles/wayliTheme";
import { promoBlocks } from "../../../core/content/promoBlocks";

export default function IsOverpayingWorthItPage() {
  const pageTitle =
    "Is overpaying your student loan worth it in the UK? | Wayli";

  const pageDescription =
    "Wondering if overpaying your student loan is worth it? Learn when it may help, when it may not, and compare your own numbers with Wayli.";

  const faqs = [
    {
      q: "Is overpaying a student loan always a good idea?",
      a: "No. For some borrowers it can reduce total repayments or clear the balance sooner. For others, it may make little difference if part of the balance is likely to be written off."
    },
    {
      q: "Should I overpay my student loan or save cash?",
      a: "That depends on your emergency fund, job security and how much flexibility matters to you. Cash savings can solve problems overpayments cannot."
    },
    {
      q: "Does salary matter most?",
      a: "Future earnings often matter more than current salary alone. Pay rises can materially change likely outcomes over time."
    },
    {
      q: "Should I use a calculator first?",
      a: "Usually yes. The same monthly overpayment can look strong in one scenario and weak in another."
    }
  ];

  const cards = [
    [
      "It may be stronger if...",
      [
        "You are likely to clear the balance anyway",
        "Your earnings may rise over time",
        "You already have a solid emergency fund",
        "You value being debt-free sooner"
      ]
    ],
    [
      "It may be weaker if...",
      [
        "Part of the balance may be written off later",
        "You have expensive debt elsewhere",
        "Your savings buffer is thin",
        "You need flexibility right now"
      ]
    ]
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

        {/* WRAP */}
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

            <span>Is overpaying worth it?</span>
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
                fontSize: 48,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: theme.colours.heading,
                maxWidth: 900,
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              Is overpaying your student loan worth it in the UK?
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
              Sometimes yes, sometimes no. For some borrowers,
              overpaying can help. For others, it can be a weak
              use of cash. It usually depends on your plan,
              future earnings, savings position and priorities.
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

              <a
                href="#quick-answer"
                style={secondaryBtn}
              >
                Quick answer
              </a>
            </div>
          </div>

          {/* QUICK ANSWER */}
          <div
            id="quick-answer"
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
              The short-ish version
            </h2>

            <div style={{ ...muted }}>
              <p>
                If you are likely to repay your loan in full anyway,
                overpayments may reduce interest or help you finish sooner.
              </p>

              <p>
                If some of the balance may never be repaid before write-off,
                overpaying can be less rewarding than many assume.
              </p>

              <p>
                In practice, this is rarely a blanket yes-or-no decision.
                It is usually a question of what is most useful for your money.
              </p>

              <p>
                UK student loans often behave differently from traditional debt.
                Repayments depend on earnings above a threshold, and any
                remaining balance may be written off later.
              </p>
            </div>
          </div>

          {/* TWO CARDS */}
          <div
            style={{
              marginTop: 56,
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 18
            }}
          >
            {cards.map(([title, items]) => (
              <div key={title} style={card}>
                <h2
                  style={{
                    marginTop: 0,
                    fontSize: 28,
                    color: theme.colours.heading
                  }}
                >
                  {title}
                </h2>

                <ul
                  style={{
                    marginBottom: 0,
                    paddingLeft: 18,
                    ...muted
                  }}
                >
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* MAIN CONTENT */}
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
              What many people miss
            </h2>

            <p style={muted}>
              Many people focus only on today’s salary.
              Understandable — it is the easiest number to see.
              But future earnings can matter more than a modest
              overpayment made this month.
            </p>

            <p style={muted}>
              If your income rises over time, normal repayments
              may rise too. That can materially change whether
              overpaying now looks strong, average or unnecessary.
            </p>

            <p style={muted}>
              Cash flexibility also has value. Savings can help with
              emergencies or uncertainty. Money sent to a loan is
              harder to access again.
            </p>

            <p style={muted}>
              That does not mean overpaying is wrong. It means your
              money often has competing jobs to do.
            </p>
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
              Want a clearer answer for your own numbers?
            </h2>

            <p
              style={{
                ...muted,
                maxWidth: 760
              }}
            >
              Two people on similar salaries can end up with very
              different outcomes. Run your own scenario with the
              Wayli Student Loan Calculator UK.
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

          {/* RELATED */}
          <div style={{ marginTop: 56 }}>
            <GuideCards
              category="student-loans"
              title="Related guides"
              limit={3}
              excludeUrl="/guides/student-loans/is-overpaying-worth-it"
            />
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
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  style={{
                    paddingBottom: 22,
                    marginBottom: 22,
                    borderBottom:
                      `1px solid ${theme.colours.neutralBorder}`
                  }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      marginBottom: 10,
                      fontSize: 20,
                      color: theme.colours.heading
                    }}
                  >
                    {faq.q}
                  </h3>

                  <p
                    style={{
                      ...muted,
                      margin: 0
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
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