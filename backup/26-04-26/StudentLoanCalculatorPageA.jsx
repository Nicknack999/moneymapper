import StudentLoanTool from "../calculators/StudentLoanTool";

export default function StudentLoanCalculatorPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px 20px"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "12px"
          }}
        >
          Student Loan Overpayment Calculator
        </h1>

        <p
          style={{
            color: "#475569",
            fontSize: "18px",
            marginBottom: "28px"
          }}
        >
          Compare overpaying, saving, or keeping flexibility using UK student loan rules.
        </p>

        <StudentLoanTool />
      </div>
    </div>
  );
}