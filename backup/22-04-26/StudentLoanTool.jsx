import { useState } from "react";
import { studentLoanInsights } from "./content/studentLoanInsights";
import { wayliMessages } from "./content/wayliMessages";

export default function StudentLoanTool() {
  const API_URL =
  "http://192.168.0.39:5000";

  // --------------------------------
  // PLAN RULES
  // --------------------------------
  const plans = {
    plan1: {
      name: "Plan 1",
      threshold: 26065,
      years: 25
    },
    plan2: {
      name: "Plan 2",
      threshold: 27295,
      years: 30
    },
    plan5: {
      name: "Plan 5",
      threshold: 25000,
      years: 40
    },
    pg: {
      name: "Postgraduate",
      threshold: 21000,
      years: 30
    }
  };

  // --------------------------------
  // HELPERS
  // --------------------------------
  const money = (v) =>
    `£${Math.round(
      Number(v || 0)
    ).toLocaleString()}`;

  const parseNum = (v) =>
    v === "" ? "" : Number(v);

  // --------------------------------
  // STYLES
  // --------------------------------
  const page = {
    maxWidth: 960,
    margin: "0 auto",
    padding: 16,
    background: "#f8fafc"
  };

  const card = {
    background: "#ecfdf5",
    borderRadius: 20,
    padding: 24,
    border: "1px solid #bbf7d0",
    boxShadow:
      "0 12px 28px rgba(16,185,129,0.08)"
  };

  const whiteCard = {
    background: "#ffffff",
    borderRadius: 20,
    padding: 24,
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 12px 28px rgba(15,23,42,0.04)"
  };

  const input = {
    width: "100%",
    height: 52,
    borderRadius: 14,
    border: "1px solid #d1d5db",
    padding: "0 14px",
    marginTop: 6,
    fontSize: 16
  };

  const button = {
    padding: "14px 18px",
    border: "none",
    borderRadius: 14,
    background: "#10b981",
    color: "white",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    width: "100%"
  };

  const quickBtn = (active) => ({
    padding: "10px 14px",
    borderRadius: 12,
    border: active
      ? "1px solid #10b981"
      : "1px solid #d1d5db",
    background: active
      ? "#d1fae5"
      : "white",
    fontWeight: 700,
    cursor: "pointer"
  });

  const ghostBtn = {
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    background: "white",
    cursor: "pointer",
    width: "100%",
    fontWeight: 600
  };

 // --------------------------------
// STATE
// --------------------------------
const [loading, setLoading] =
  useState(false);

const [error, setError] =
  useState("");

const [result, setResult] =
  useState(null);

const [showMore, setShowMore] =
  useState(false);

const [plan, setPlan] =
  useState("plan2");

const [salary, setSalary] =
  useState(40000);

const [balance, setBalance] =
  useState(50000);

const [monthlyAmount, setMonthlyAmount] =
  useState(100);

const [currentAge, setCurrentAge] =
  useState(30);

const selectedPlan =
  plans[plan];

  // --------------------------------
  // API
  // --------------------------------
  const runModel = async () => {
    setLoading(true);
    setError("");

    try {
      const payload = {
        plan,
        salary: Number(salary),
        loan_balance:
          Number(balance),
        current_age:
          Number(currentAge),
        overpay:
          Number(
            monthlyAmount
          ),
        threshold:
          selectedPlan.threshold,
        write_off_years:
          selectedPlan.years
      };

      const res = await fetch(
        `${API_URL}/student-loan`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify(
            payload
          )
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      const data =
        await res.json();

      setResult(data);
      setShowMore(false);
    } catch {
      setResult(null);

      setError(
        "We couldn't run your comparison right now."
      );
    } finally {
          setLoading(false);
        }
      };

  // --------------------------------
  // QUICK BUTTONS
  // --------------------------------
  const applyQuickAmount = (
    amount
  ) => {
    setMonthlyAmount(amount);

    if (result) {
      setTimeout(() => {
        runModel();
      }, 50);
    }
  };

  // --------------------------------
  // DERIVED
  // --------------------------------
  const repaymentType =
    result?.decision
      ?.repayment_outcome
      ?.type || "";

  const payrollRepayment =
    Math.max(
      0,
      (salary -
        selectedPlan.threshold) *
        0.09
    );

  const writeOffYear =
    new Date().getFullYear() +
    selectedPlan.years;

  const triggerInsight =
  repaymentType ===
  "full_repay"
    ? "At your income level, extra payments may reduce interest and shorten repayment time."

    : repaymentType ===
      "borderline"
    ? "A modest pay rise, lower rates or steady overpayments could change the outcome."

    : `Repayments normally begin above ${money(
        selectedPlan.threshold
      )} on this plan, so future earnings remain important.`;
 // --------------------------------
// RESULT CONTENT
// --------------------------------
const content = {
  title:
    result?.decision
      ?.repayment_outcome
      ?.headline ||
    "Your outlook",

  text:
    result?.decision
      ?.repayment_outcome
      ?.explanation ||
    "",

  bg:
    repaymentType ===
    "full_repay"
      ? "#ecfdf5"
      : repaymentType ===
        "borderline"
      ? "#f0fdf4"
      : "#f8fafc"
};

  return (
    <div style={page}>
      {/* HERO */}
      <div style={card}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#10b981",
            textTransform:
              "uppercase"
          }}
        >
          Wayli
        </div>

        <h1
          style={{
            marginTop: 8,
            fontSize: 34,
            lineHeight: 1.2
          }}
        >
          Should You Overpay
          Your Student Loan?
        </h1>

        <p
          style={{
            color:
              "#475569",
            lineHeight: 1.7,
            fontSize: 17
          }}
        >
          Understand your
          options using UK loan
          plan rules. Compare
          overpaying,
          investing elsewhere,
          or keeping your cash
          flexible.
        </p>
      </div>

      {/* INPUTS */}
      <div
        style={{
          ...whiteCard,
          marginTop: 18
        }}
      >
        <div
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: 16
          }}
        >
          <div>
            <label>
              Loan plan
            </label>

            <select
              value={plan}
              onChange={(e) =>
                setPlan(
                  e.target
                    .value
                )
              }
              style={input}
            >
              <option value="plan1">
                Plan 1
              </option>
              <option value="plan2">
                Plan 2
              </option>
              <option value="plan5">
                Plan 5
              </option>
              <option value="pg">
                Postgraduate
              </option>
            </select>
          </div>

          {[
            [
              "Salary (£)",
              salary,
              setSalary
            ],
            [
              "Loan balance (£)",
              balance,
              setBalance
            ],
            [
              "Age",
              currentAge,
              setCurrentAge
            ],
            [
              "Monthly overpayment (£)",
              monthlyAmount,
              setMonthlyAmount
            ]
          ].map(
            ([a, b, c]) => (
              <div key={a}>
                <label>
                  {a}
                </label>

                <input
                  type="number"
                  value={b}
                  onChange={(
                    e
                  ) =>
                    c(
                      parseNum(
                        e
                          .target
                          .value
                      )
                    )
                  }
                  style={
                    input
                  }
                />
              </div>
            )
          )}
        </div>

        {/* QUICK BUTTONS */}
        <div
          style={{
            marginTop: 18
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: 10
            }}
          >
            Try monthly overpayments
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap"
            }}
          >
            {[0, 50, 100, 150, 200, 300].map(
              (amt) => (
                <button
                  key={amt}
                  onClick={() =>
                    applyQuickAmount(
                      amt
                    )
                  }
                  style={quickBtn(
                    monthlyAmount ===
                      amt
                  )}
                >
                  £{amt}
                </button>
              )
            )}
          </div>
        </div>

        <button
          onClick={runModel}
          disabled={
            loading
          }
          style={{
            ...button,
            marginTop: 20
          }}
        >
          {loading
            ? "Working..."
            : "See My Options"}
        </button>

        {error && (
          <p
            style={{
              color:
                "#dc2626",
              marginTop: 12
            }}
          >
            {error}
          </p>
        )}
      </div>

      {/* RESULTS */}
      {result && (
        <>
          {/* MAIN RESULT */}
          <div
            style={{
              ...card,
              marginTop: 18,
              background:
                content.bg
            }}
          >
            <div
              style={{
                display:
                  "inline-block",
                padding:
                  "6px 10px",
                borderRadius:
                  999,
                background:
                  "#d1fae5",
                color:
                  "#065f46",
                fontSize: 12,
                fontWeight: 800,
                textTransform:
                  "uppercase"
              }}
            >
              Your current outlook
            </div>

            <h2
              style={{
                marginTop: 14,
                marginBottom: 8
              }}
            >
              {
                content.title
              }
            </h2>

            <p
              style={{
                lineHeight: 1.7,
                marginBottom: 0
              }}
            >
              {
                content.text
              }
            </p>
          </div>

          {/* TRIGGER INSIGHT */}
          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <h3>
              Worth knowing
            </h3>

            <p
              style={{
                color:
                  "#475569",
                lineHeight: 1.7
              }}
            >
              {
                triggerInsight
              }
            </p>
          </div>

          {/* CURRENT INPUTS */}
          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <h3>
              At your current inputs
            </h3>

            <ul
              style={{
                paddingLeft: 18,
                color:
                  "#475569",
                lineHeight: 1.8,
                marginBottom: 0
              }}
            >
              <li>
                Automatic
                repayments:
                {" "}
                <strong>
                  {money(
                    payrollRepayment
                  )}
                  /year
                </strong>
              </li>

              <li>
                Loan write-off
                year:
                {" "}
                <strong>
                  {
                    writeOffYear
                  }
                </strong>
              </li>

              <li>
                {money(
                  monthlyAmount
                )}
                /month =
                {" "}
                <strong>
                  {money(
                    monthlyAmount *
                      12
                  )}
                  /year
                </strong>
              </li>
            </ul>
          </div>

          {/* WHAT MATTERS */}
          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <h3>
              What matters
              most here
            </h3>

            <ol
              style={{
                paddingLeft: 18,
                color:
                  "#475569",
                lineHeight: 1.8,
                marginBottom: 0
              }}
            >
              <li>
                Future salary
                growth
              </li>
              <li>
                Loan balance
                size
              </li>
              <li>
                Monthly
                overpayments
              </li>
            </ol>
          </div>

          {/* HOW IT WORKS */}
          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <h3>
              How these
              estimates work
            </h3>

            <p
              style={{
                color:
                  "#475569",
                lineHeight: 1.8
              }}
            >
              We use
              simplified UK
              student loan
              rules including:
              <br />
              • your plan
              threshold
              <br />
              • 9%
              repayments
              above threshold
              <br />
              • current
              balance entered
              <br />
              • estimated
              interest
              <br />
              • assumed
              future earnings
              growth
              <br />
              <br />
              Real
              repayments
              depend on
              changing
              salary,
              official
              rates and
              policy
              updates.
              <br />
              <br />
              For your
              exact balance
              or official
              figures, check
              the Student
              Loans Company.
            </p>
          </div>

          {/* EXTRA */}
          <div
            style={{
              ...whiteCard,
              marginTop: 18
            }}
          >
            <button
              style={
                ghostBtn
              }
              onClick={() =>
                setShowMore(
                  !showMore
                )
              }
            >
              {showMore
                ? "Hide extra insights ▲"
                : "Show extra insights ▼"}
            </button>

            {showMore && (
              <div
                style={{
                  marginTop: 16
                }}
              >
                <p
                  style={{
                    color:
                      "#475569",
                    lineHeight: 1.7
                  }}
                >
                  Rechecking
                  after future
                  pay rises can
                  be worthwhile.
                </p>

                <p
                  style={{
                    color:
                      "#475569",
                    lineHeight: 1.7
                  }}
                >
                  Some users
                  prefer cash
                  flexibility
                  over
                  overpaying.
                </p>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div
            style={{
              ...whiteCard,
              marginTop: 18,
              textAlign:
                "center"
            }}
          >
            <p
              style={{
                color:
                  "#64748b",
                lineHeight: 1.7,
                margin: 0
              }}
            >
              {
                wayliMessages.education.assumptions
              }
              <br />
              {
                wayliMessages.education.notAdvice
              }
            </p>
          </div>
        </>
      )}
    </div>
  );
}