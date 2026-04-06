from engine.student_loan import annual_loan_repayment, apply_loan_year


def run_forecast(data):
    """
    Runs a SINGLE scenario forecast.
    Behaviour is entirely driven by input data.
    """

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

    # 🔑 NEW: flag to control realism (defaults TRUE for your app)
    model_opportunity_cost = data.get("model_opportunity_cost", True)

    years = retirement_age - current_age

    # --- STATE (important: don't mutate inputs) ---
    loan_balance = initial_loan_balance
    pot = 0

    ages = []
    net_worth = []
    loan_balances = []

    for year in range(years + 1):
        age = current_age + year

        # --- Salary progression ---
        current_salary = salary * (1 + salary_growth) ** year

        # --- Write-off ---
        if loan_balance > 0 and year >= write_off_years:
            loan_balance = 0

        # --- Investments (FIXED) ---
        if model_opportunity_cost:
            # Real-world: overpay reduces what you can invest
            effective_savings = (monthly_savings * 12) - overpay_annual
            effective_savings = max(0, effective_savings)
        else:
            # Legacy behaviour (no trade-off)
            effective_savings = monthly_savings * 12

        pot += effective_savings
        pot *= (1 + growth_rate)

        # --- Loan ---
        if loan_balance > 0:
            base_repayment = annual_loan_repayment(
                current_salary,
                threshold,
                repayment_rate * 100,
            )

            total_repayment = base_repayment + overpay_annual

            loan_balance, _, _ = apply_loan_year(
                loan_balance,
                loan_interest * 100,
                total_repayment,
            )

        # --- Net worth ---
        current_net_worth = pot - loan_balance

        ages.append(age)
        net_worth.append(round(current_net_worth, 0))
        loan_balances.append(round(loan_balance, 0))

    return {
        "ages": ages,
        "net_worth": net_worth,
        "loan_balance": loan_balances,
    }