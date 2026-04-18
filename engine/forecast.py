from student_loan import annual_loan_repayment, apply_loan_year


def num(value, default=0):
    try:
        return float(value)
    except:
        return default


def run_forecast(data):
    """
    Proper comparative forecast model.

    Simulates:
    - student loan repayments each year
    - optional overpayments
    - investing spare monthly money
    - salary growth over time
    - write-off year

    Returns chart curves + summary metrics.
    """

    # ---------------------------------
    # INPUTS
    # ---------------------------------
    current_age = int(num(data.get("current_age"), 30))
    retirement_age = int(num(data.get("retirement_age"), 60))

    salary = num(data.get("salary"), 30000)
    salary_growth = num(data.get("salary_growth"), 0.03)

    monthly_savings = num(data.get("monthly_savings"), 200)
    growth_rate = num(data.get("return_rate"), 0.05)

    initial_loan_balance = num(data.get("loan_balance"), 50000)
    loan_interest = num(data.get("loan_interest"), 0.06)

    threshold = num(data.get("threshold"), 27295)
    repayment_rate = num(data.get("repayment_rate"), 0.09)

    overpay_annual = num(data.get("overpay"), 0) * 12
    write_off_years = int(num(data.get("write_off_years"), 30))

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
    total_paid = 0.0
    loan_cleared_age = None

    ages = []
    net_worth = []
    loan_balances = []

    # ---------------------------------
    # YEAR LOOP
    # ---------------------------------
    for year in range(years + 1):
        age = current_age + year

        # salary rises yearly
        current_salary = salary * ((1 + salary_growth) ** year)

        # ---------------------------------
        # WRITE OFF
        # ---------------------------------
        if year >= write_off_years and loan_balance > 0:
            loan_balance = 0

        # ---------------------------------
        # REQUIRED REPAYMENT
        # ---------------------------------
        if loan_balance > 0:
            base_repayment = annual_loan_repayment(
                current_salary,
                threshold,
                repayment_rate * 100
            )
        else:
            base_repayment = 0

        # ---------------------------------
        # EXTRA OVERPAYMENT
        # ---------------------------------
        extra_overpay = overpay_annual if loan_balance > 0 else 0

        # ---------------------------------
        # INVESTABLE CASH
        # ---------------------------------
        annual_savings = monthly_savings * 12

        if model_opportunity_cost:
            annual_savings -= extra_overpay

        annual_savings = max(0, annual_savings)

        # add money monthly-equivalent yearly
        pot += annual_savings

        # grow investments
        pot *= (1 + growth_rate)

        # ---------------------------------
        # APPLY LOAN YEAR
        # ---------------------------------
        if loan_balance > 0:
            scheduled_payment = base_repayment + extra_overpay

            max_possible = loan_balance * (1 + loan_interest)

            scheduled_payment = min(
                scheduled_payment,
                max_possible
            )

            old_balance = loan_balance

            loan_balance, _, _ = apply_loan_year(
                loan_balance,
                loan_interest * 100,
                scheduled_payment
            )

            actual_paid = old_balance - loan_balance
            actual_paid = max(0, actual_paid)

            total_paid += actual_paid

            if loan_balance <= 0:
                loan_balance = 0

                if loan_cleared_age is None:
                    loan_cleared_age = age

        # ---------------------------------
        # NET WORTH
        # ---------------------------------
        current_net = pot - loan_balance

        ages.append(age)
        net_worth.append(round(current_net, 0))
        loan_balances.append(round(loan_balance, 0))

    # ---------------------------------
    # OUTPUT
    # ---------------------------------
    return {
        "ages": ages,
        "curve": net_worth,
        "net_worth": net_worth,
        "loan_balance": loan_balances,
        "loan_cleared_age": loan_cleared_age,
        "final_investment_value": round(pot, 0),
        "final_remaining_balance": round(loan_balance, 0),
        "total_paid": round(total_paid, 0),
        "net_position": round(pot - loan_balance, 0)
    }