import { Link } from "react-router-dom";

import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function ContactPage() {
  return (
    <>
      <SiteHeader />

      <div className="min-h-screen bg-slate-50 text-slate-900">
        <title>Contact Wayli | Feedback, Support & Ideas</title>

        <meta
          name="description"
          content="Contact Wayli with feedback, support requests, partnership ideas or suggestions for new money tools."
        />

        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-10 sm:py-16 space-y-8">

          {/* BREADCRUMBS */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link
              to="/"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Home
            </Link>

            <span className="text-slate-300">/</span>

            <Link
              to="/guides"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Guides
            </Link>

            <span className="text-slate-300">/</span>

            <Link
              to="/student-loan-calculator"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Tools
            </Link>

            <span className="text-slate-300">/</span>

            <span className="text-slate-500">
              Contact
            </span>
          </div>

          {/* HERO */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10">
            <div className="inline-flex px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
              Contact Wayli
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl font-bold tracking-tight">
              Get in touch
            </h1>

            <p className="mt-5 text-lg text-slate-600 leading-8 max-w-2xl">
              Questions, feedback, partnership ideas,
              calculator requests or bug reports —
              we’d love to hear from you.
            </p>

            <p className="mt-4 text-slate-600 leading-8 max-w-2xl">
              Wayli is building practical UK money tools
              that help people make clearer decisions.
            </p>
          </section>

          {/* FORM */}
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10">
            <h2 className="text-2xl font-bold">
              Send a message
            </h2>

            <p className="mt-3 text-slate-600">
              Usually replies within 1–2 working days.
            </p>

            <form
              action="https://formspree.io/f/xpqkngvd"
              method="POST"
              className="mt-8 space-y-5"
            >
              <input
                type="hidden"
                name="_subject"
                value="Wayli Contact Form"
              />

              <input
                type="text"
                name="_gotcha"
                className="hidden"
                tabIndex="-1"
                autoComplete="off"
              />

              <div>
                <label className="block font-semibold mb-2">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Topic
                </label>

                <select
                  name="topic"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <option>General feedback</option>
                  <option>Bug report</option>
                  <option>Calculator request</option>
                  <option>Partnership</option>
                  <option>Press / media</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  rows="7"
                  required
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
              >
                Send Message
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-500">
              Prefer email? Contact us directly at{" "}
              <a
                href="mailto:wayliteam@gmail.com"
                className="text-emerald-600 font-semibold hover:underline"
              >
                wayliteam@gmail.com
              </a>
            </p>
          </section>

          {/* EXTRA LINKS */}
          <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold">
              Useful links
            </h2>

            <div className="mt-5 grid sm:grid-cols-3 gap-4">
              <Link
                to="/student-loan-calculator"
                className="bg-white rounded-2xl border border-emerald-100 p-5 hover:border-emerald-300 transition block"
              >
                Student Loan Calculator UK
              </Link>

              <Link
                to="/guides"
                className="bg-white rounded-2xl border border-emerald-100 p-5 hover:border-emerald-300 transition block"
              >
                Browse Guides
              </Link>

              <Link
                to="/"
                className="bg-white rounded-2xl border border-emerald-100 p-5 hover:border-emerald-300 transition block"
              >
                Homepage
              </Link>
            </div>
          </section>

        </div>
      </div>

      <SiteFooter />
    </>
  );
}