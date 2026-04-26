import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import GuidesPage from "./pages/GuidesPage";
import ContactPage from "./pages/ContactPage";
import StudentLoanCalculatorPage from "./pages/StudentLoanCalculatorPage";

import IsOverpayingWorthItPage from "./pages/guides/student-loans/IsOverpayingWorthItPage";
import StudentLoan30kPage from "./pages/guides/student-loans/StudentLoan30kPage";
import WhichStudentLoanPlanAmIOnPage from "./pages/guides/student-loans/WhichStudentLoanPlanAmIOnPage";
import WhyTwoPeopleOnTheSameSalaryRepayDifferentAmounts from "./pages/guides/student-loans/WhyTwoPeopleOnTheSameSalaryRepayDifferentAmounts";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* CORE */}
        <Route path="/" element={<HomePage />} />

        <Route
          path="/student-loan-calculator"
          element={<StudentLoanCalculatorPage />}
        />

        {/* GUIDES */}
        <Route path="/guides" 
        element={<GuidesPage />} />

        <Route
          path="/guides/student-loans/is-overpaying-worth-it"
          element={<IsOverpayingWorthItPage />}
        />

        <Route
          path="/guides/student-loans/student-loan-30k"
          element={<StudentLoan30kPage />}
        />

        <Route
          path="/guides/student-loans/which-student-loan-plan-am-i-on"
          element={<WhichStudentLoanPlanAmIOnPage />}
        />

        <Route
          path="/guides/student-loans/why-two-people-on-the-same-salary-repay-different-amounts"
          element={
            <WhyTwoPeopleOnTheSameSalaryRepayDifferentAmounts />
          }
        />

        {/* CONTACT */}
        <Route path="/contact" 
        element={<ContactPage />
          } 
        />
        
        {/* 404 FALLBACK */}
        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                background: "#f8fafc",
                textAlign: "center"
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: 42,
                    marginBottom: 12
                  }}
                >
                  404
                </h1>

                <p
                  style={{
                    color: "#475569",
                    marginBottom: 20
                  }}
                >
                  Page not found.
                </p>

                <a
                  href="/"
                  style={{
                    color: "#10b981",
                    fontWeight: 700,
                    textDecoration: "none"
                  }}
                >
                  Back to homepage
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}