import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function AboutPage() {
  const section = {
    maxWidth: 980,
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

  const badge = {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: 999,
    background: "#f8fafc",
    color: "#475569",
    fontWeight: 700,
    fontSize: 14
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
                fontWeight: 600
              }}
            >
              Home
            </Link>

            <span>/</span>
            <span>About Wayli</span>
          </div>
        </div>

        {/* HERO */}
        <div
          style={{
            ...section,
            paddingTop: 28,
            paddingBottom: 36
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                ...badge,
                background: "#ecfdf5",
                color: "#047857"
              }}
            >
              Why Wayli exists
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
              Built by one dad trying to make
              <br />
              money make more sense for his kids
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
              Wayli began with family conversations about student debt,
              budgeting, saving, pensions and how small decisions early in
              life can shape future freedom.
            </p>
          </div>
        </div>

        {/* STORY GRID */}
        <div
          style={{
            ...section,
            paddingBottom: 28
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 18
            }}
          >
            <div style={card}>
              <h3 style={{ marginTop: 0, fontSize: 24, color: "#0f172a" }}>
                The early chats
              </h3>

              <p style={muted}>
                Like many parents, I wanted to help my children learn financial
                independence as they stepped into adult life.
              </p>

              <p style={muted}>
                We started with the basics: budgeting, spending wisely,
                building savings habits and understanding where money goes.
              </p>
            </div>

            <div style={card}>
              <h3 style={{ marginTop: 0, fontSize: 24, color: "#0f172a" }}>
                Then life moved on
              </h3>

              <p style={muted}>
                University ended. Work began. The conversations changed.
              </p>

              <p style={muted}>
                Suddenly it was pensions, ISAs, long-term saving and whether
                your twenties might be the best time to start.
              </p>

              <p style={muted}>
                Convincing a 22-year-old of that can be a challenge.
              </p>
            </div>

            <div style={card}>
              <h3 style={{ marginTop: 0, fontSize: 24, color: "#0f172a" }}>
                Then came student debt
              </h3>

              <p style={muted}>
                After graduating, my daughter’s balance was around £54,000 and
                still rising while repayments came out of salary above the
                Plan 2 threshold.
              </p>

              <p style={muted}>
                Naturally the question was:
              </p>

              <p
                style={{
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: 0
                }}
              >
                “If it’s a debt, shouldn’t I clear it quickly?”
              </p>
            </div>
          </div>
        </div>

        {/* BIG REALISATION */}
        <div
          style={{
            ...section,
            paddingBottom: 28
          }}
        >
          <div style={card}>
            <h2
              style={{
                marginTop: 0,
                fontSize: 34,
                color: "#0f172a"
              }}
            >
              What we learned
            </h2>

            <p style={muted}>
              A UK student loan often doesn’t behave like a mortgage,
              credit card or car loan.
            </p>

            <p style={muted}>
              In many cases it can feel closer to a graduate tax, with
              thresholds, repayment rules and write-off dates that can change
              what makes sense.
            </p>

            <p style={muted}>
              That means the obvious answer is not always the right one.
            </p>
          </div>
        </div>

        {/* TURNING POINT */}
        <div
          style={{
            ...section,
            paddingBottom: 28
          }}
        >
          <div
            style={{
              ...card,
              background:
                "linear-gradient(135deg,#ffffff 0%,#f0fdf4 100%)"
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: 34,
                color: "#0f172a"
              }}
            >
              Why I built Wayli
            </h2>

            <p style={muted}>
              After a heart attack and quadruple bypass surgery, I started
              thinking differently about time.
            </p>

            <p style={muted}>
              I wanted to leave behind something useful: practical tools and
              clearer guidance my family could still use, whether I was there
              to switch into Dad Mode or not.
            </p>

            <div style={{ marginTop: 8, marginBottom: 18 }}>
              <span style={badge}>Dad Mode = serious grown-up chat activated</span>
            </div>

            <p style={muted}>
              We joked about calling the project
              <strong> What Would Dad Say?</strong>
            </p>

            <p style={muted}>
              Instead, it became <strong>Wayli</strong> — a better way forward
              with money decisions, so you can get on with life.
            </p>
          </div>
        </div>

        {/* WHAT WAYLI DOES */}
        <div
          style={{
            ...section,
            paddingBottom: 28
          }}
        >
          <div style={card}>
            <h2
              style={{
                marginTop: 0,
                fontSize: 34,
                color: "#0f172a"
              }}
            >
              What Wayli aims to do
            </h2>

            <p style={muted}>
              Money is not everything.
            </p>

            <p style={muted}>
              But clearer money decisions can make life easier —
              especially when you’re starting out.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                gap: 14,
                marginTop: 18
              }}
            >
              {[
                "Understand student debt properly",
                "Start saving sooner",
                "Use pensions wisely",
                "Build confidence with money",
                "Avoid expensive misunderstandings",
                "Think clearly about trade-offs"
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 18,
                    padding: 16,
                    color: "#475569",
                    lineHeight: 1.6
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <p style={{ ...muted, marginTop: 22 }}>
              Wayli exists to make those decisions clearer.
            </p>

            <div style={{ marginTop: 8 }}>
              <span style={badge}>Dad Mode deactivated</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            ...section,
            paddingBottom: 70
          }}
        >
          <div
            style={{
              ...card,
              textAlign: "center"
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: 34,
                color: "#0f172a"
              }}
            >
              Built for my family.
              <br />
              Shared for yours too.
            </h2>

            <p
              style={{
                ...muted,
                maxWidth: 720,
                margin: "18px auto 0"
              }}
            >
              If Wayli helps you make one clearer decision, feel more confident,
              or avoid one costly mistake, then it’s doing its job.
            </p>

            <div
              style={{
                marginTop: 26,
                display: "flex",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap"
              }}
            >
              <Link to="/student-loan-calculator" style={primaryBtn}>
                Use the Calculator
              </Link>

              <Link to="/guides" style={secondaryBtn}>
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