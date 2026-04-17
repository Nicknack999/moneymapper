from student_loan import annual_loan_repayment, apply_loan_year


def run_forecast(data):
    """
    Runs a single scenario forecast.

    Used by Wayli decision tools to compare future outcomes
    under different assumptions.

    Returns yearly curves plus useful summary metrics.
    """

    # ---------------------------------
    # INPUTS
    # ---------------------------------
    current_age = data.get("current_age", 30)
    retirement_age = data.get("retirement_age", 60)

    salary = data.get("salary", 30000)
    salary_growth = data.get("salary_growth", 0.03)

    monthly_savings = data.get("monthly_savings", 200)
    growth_rate = data.get("return_rate", 0.05)

    initial_loan_balance = data.get("loan_balance", 50000)
    loan_interest = data.get("loan_interest", 0.06)

    threshold = data.get("threshold", 27295)
    repayment_rate = data.get("repayment_rate", 0.09)

    overpay_annual = data.get("overpay", 0) * 12
    write_off_years = data.get("write_off_years", 30)

    # If True:
    # extra overpayments reduce what can be invested.
    model_opportunity_cost = data.get(
        "model_opportunity_cost",
        True
    )

    years = max(0, retirement_age - current_age)

    # ---------------------------------
    # STATE
    # ---------------------------------
    loan_balance = float(initial_loan_balance)
    pot = 0.0

    ages = []
    net_worth = []
    loan_balances = []

    loan_cleared_age = None
    total_paid = 0.0

    # ---------------------------------
    # YEAR LOOP
    # ---------------------------------
    for year in range(years + 1):
        age = current_age + year

        # Salary progression
        current_salary = salary * (
            (1 + salary_growth) ** year
        )

        # -----------------------------
        # Write-off rule
        # -----------------------------
        if (
            loan_balance > 0
            and year >= write_off_years
        ):
            loan_balance = 0

        # -----------------------------
        # Investments
        # -----------------------------
        if model_opportunity_cost:
            # Overpaying reduces spare cash available
            annual_savings = (
                monthly_savings * 12
            ) - overpay_annual
        else:
            annual_savings = (
                monthly_savings * 12
            )

        annual_savings = max(
            0,
            annual_savings
        )

        pot += annual_savings
        pot *= (1 + growth_rate)

        # -----------------------------
        # Loan repayment
        # -----------------------------
        if loan_balance > 0:
            base_repayment = annual_loan_repayment(
                current_salary,
                threshold,
                repayment_rate * 100,
            )

            total_repayment = (
                base_repayment
                + overpay_annual
            )

            # Never overpay beyond balance
            total_repayment = min(
                total_repayment,
                loan_balance * (1 + loan_interest),
            )

            previous_balance = loan_balance

            loan_balance, _, _ = apply_loan_year(
                loan_balance,
                loan_interest * 100,
                total_repayment,
            )

            actual_paid = max(
                0,
                previous_balance - loan_balance
            )

            total_paid += actual_paid

            # Detect first year cleared
            if (
                loan_balance <= 0
                and loan_cleared_age
                is None
            ):
                loan_cleared_age = age
                loan_balance = 0

        # -----------------------------
        # Net worth
        # -----------------------------
        current_net_worth = (
            pot - loan_balance
        )

        ages.append(age)
        net_worth.append(
            round(current_net_worth, 0)
        )
        loan_balances.append(
            round(loan_balance, 0)
        )

    # ---------------------------------
    # OUTPUT
    # ---------------------------------
    return {
        "ages": ages,
        "net_worth": net_worth,
        "loan_balance": loan_balances,

        # New useful summary fields
        "loan_cleared_age": loan_cleared_age,
        "final_investment_value": round(
            pot,
            0
        ),
        "final_remaining_balance": round(
            loan_balance,
            0
        ),
        "total_paid": round(
            total_paid,
            0
        ),
    }