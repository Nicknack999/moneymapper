import { Link } from "react-router-dom";

import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

import { theme } from "../styles/wayliTheme";
import { promoBlocks } from "../core/content/promoBlocks";

export default function ContactPage() {
  const section = {
    maxWidth: 900,
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

  const input = {
    width: "100%",
    borderRadius: 16,
    border: `1px solid ${theme.colours.inputBorder}`,
    padding: "14px 16px",
    fontSize: 16,
    boxSizing: "border-box",
    outline: "none"
  };

  const label = {
    display: "block",
    fontWeight: 700,
    marginBottom: 8,
    color: theme.colours.heading
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

            <span>Contact</span>
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
              Contact Wayli
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
              Get in touch
            </h1>

            <p
              style={{
                ...muted,
                fontSize: 19,
                maxWidth: 720,
                margin: "22px auto 0 auto"
              }}
            >
              Questions, feedback, partnership ideas,
              calculator requests or bug reports —
              we’d love to hear from you.
            </p>

            <p
              style={{
                ...muted,
                maxWidth: 720,
                margin: "14px auto 0 auto"
              }}
            >
              Wayli is building practical UK money tools
              that help people make clearer decisions.
            </p>
          </div>

          {/* FORM */}
          <div
            style={{
              ...card,
              marginTop: 32
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: 30,
                color: theme.colours.heading
              }}
            >
              Send a message
            </h2>

            <p style={muted}>
              Usually replies within 1–2 working days.
            </p>

            <form
              action="https://formspree.io/f/xpqkngvd"
              method="POST"
              style={{
                marginTop: 28,
                display: "grid",
                gap: 18
              }}
            >
              <input
                type="hidden"
                name="_subject"
                value="Wayli Contact Form"
              />

              <input
                type="text"
                name="_gotcha"
                tabIndex="-1"
                autoComplete="off"
                style={{ display: "none" }}
              />

              <div>
                <label style={label}>
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  style={input}
                />
              </div>

              <div>
                <label style={label}>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  style={input}
                />
              </div>

              <div>
                <label style={label}>
                  Topic
                </label>

                <select
                  name="topic"
                  style={input}
                >
                  <option>
                    General feedback
                  </option>
                  <option>
                    Bug report
                  </option>
                  <option>
                    Calculator request
                  </option>
                  <option>
                    Partnership
                  </option>
                  <option>
                    Press / media
                  </option>
                </select>
              </div>

              <div>
                <label style={label}>
                  Message
                </label>

                <textarea
                  name="message"
                  rows="7"
                  required
                  placeholder="How can we help?"
                  style={{
                    ...input,
                    resize: "vertical"
                  }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  style={primaryBtn}
                >
                  Send Message
                </button>
              </div>
            </form>

            <p
              style={{
                marginTop: 22,
                fontSize: 14,
                color: theme.colours.muted
              }}
            >
              Prefer email? Contact us directly at{" "}
              <a
                href="mailto:wayliteam@gmail.com"
                style={{
                  color: theme.colours.primary,
                  fontWeight: 700,
                  textDecoration: "none"
                }}
              >
                wayliteam@gmail.com
              </a>
            </p>
          </div>

          {/* USEFUL LINKS */}
          <div
            style={{
              ...card,
              marginTop: 32,
              background:
                "linear-gradient(135deg,#ffffff 0%,#f0fdf4 100%)"
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: 28,
                color: theme.colours.heading
              }}
            >
              Useful links
            </h2>

            <div
              style={{
                marginTop: 18,
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 16
              }}
            >
              <Link
                to="/student-loan-calculator"
                style={secondaryBtn}
              >
                Student Loan Calculator UK
              </Link>

              <Link
                to="/guides"
                style={secondaryBtn}
              >
                Browse Guides
              </Link>

              <Link
                to="/"
                style={secondaryBtn}
              >
                Homepage
              </Link>
            </div>
          </div>

          {/* MORE TOOLS */}
          <div
            style={{
              ...card,
              marginTop: 32,
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