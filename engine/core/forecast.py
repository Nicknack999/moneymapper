from core.student_loan import annual_loan_repayment, apply_loan_year


def num(value, default=0):
    try:
        return float(value)
    except:
        return default


def run_forecast(data):

    current_age = int(num(data.get("current_age"), 30))
    retirement_age = int(num(data.get("retirement_age"), 60))

    salary = num(data.get("salary"), 30000)
    salary_growth = num(data.get("salary_growth"), 0.03)

    threshold = num(data.get("threshold"), 27295)
    threshold_growth = num(data.get("threshold_growth"), 0.02)

    monthly_savings = num(data.get("monthly_savings"), 200)
    growth_rate = num(data.get("return_rate"), 0.05)

    loan_balance = num(data.get("loan_balance"), 50000)
    loan_interest = num(data.get("loan_interest"), 0.06)

    repayment_rate = num(data.get("repayment_rate"), 0.09)

    overpay_annual = num(data.get("overpay"), 0) * 12

    write_off_years = int(
        num(data.get("write_off_years"), 30)
    )

    model_opportunity_cost = data.get(
        "model_opportunity_cost",
        True
    )

    years = max(0, retirement_age - current_age)

    pot = 0.0
    total_paid = 0.0
    loan_cleared_age = None

    ages = []
    curve = []
    balances = []

    for year in range(years + 1):

        age = current_age + year

        current_salary = salary * (
            (1 + salary_growth) ** year
        )

        current_threshold = threshold * (
            (1 + threshold_growth) ** year
        )

        # write off
        if year >= write_off_years and loan_balance > 0:
            loan_balance = 0

        # repayments
        if loan_balance > 0:
            base = annual_loan_repayment(
                current_salary,
                current_threshold,
                repayment_rate * 100
            )
        else:
            base = 0

        extra = overpay_annual if loan_balance > 0 else 0

        annual_savings = monthly_savings * 12

        if model_opportunity_cost:
            annual_savings -= extra

        annual_savings = max(0, annual_savings)

        # grow existing investments first
        pot *= (1 + growth_rate)

        # then add this year's savings
        pot += annual_savings

        # apply loan
        if loan_balance > 0:

            scheduled = base + extra

            max_payment = loan_balance * (
                1 + loan_interest
            )

            scheduled = min(
                scheduled,
                max_payment
            )

            old_balance = loan_balance

            loan_balance, _, _ = apply_loan_year(
                loan_balance,
                loan_interest * 100,
                scheduled
            )

            actual_paid = max(
                0,
                old_balance - loan_balance
            )

            total_paid += actual_paid

            if loan_balance <= 0:
                loan_balance = 0

                if loan_cleared_age is None:
                    loan_cleared_age = age

        net = pot - loan_balance

        ages.append(age)
        curve.append(round(net, 0))
        balances.append(round(loan_balance, 0))

    return {
        "ages": ages,
        "curve": curve,
        "net_worth": curve,
        "loan_balance": balances,
        "loan_cleared_age": loan_cleared_age,
        "final_investment_value": round(pot, 0),
        "final_remaining_balance": round(loan_balance, 0),
        "total_paid": round(total_paid, 0),
        "net_position": round(pot - loan_balance, 0)
    }