# ----------------------------------
# LEVEL 1: Yearly mechanics
# ----------------------------------

def annual_loan_repayment(salary, threshold, rate_percent):
    if salary <= threshold:
        return 0
    return (salary - threshold) * (rate_percent / 100)


def apply_loan_year(balance, interest_rate_percent, repayment):
    interest = balance * (interest_rate_percent / 100)
    new_balance = balance + interest - repayment

    if new_balance < 0:
        repayment += new_balance
        new_balance = 0

    return new_balance, repayment, interest


# ----------------------------------
# LEVEL 2: Full simulation
# ----------------------------------

def simulate_loan(
    balance,
    salary,
    interest,
    threshold,
    rate,
    years,
    overpay=0,
    return_schedule=False
):
    total_repaid = 0
    schedule = []

    for year in range(1, years + 1):
        if balance <= 0:
            break

        repayment = annual_loan_repayment(
            salary,
            threshold,
            rate
        )

        repayment += overpay

        balance, actual_repayment, interest_paid = apply_loan_year(
            balance,
            interest,
            repayment
        )

        total_repaid += actual_repayment

        if return_schedule:
            schedule.append({
                "year": year,
                "balance": round(balance, 0),
                "repayment": round(actual_repayment, 0),
                "interest": round(interest_paid, 0)
            })

    if return_schedule:
        return total_repaid, schedule

    return total_repaid


# ----------------------------------
# LEVEL 3: Scenario comparison
# ----------------------------------

def repayment_difference(
    salary,
    balance,
    interest,
    threshold,
    rate,
    years,
    overpay
):
    normal = simulate_loan(
        balance,
        salary,
        interest,
        threshold,
        rate,
        years,
        overpay=0
    )

    overpay_case = simulate_loan(
        balance,
        salary,
        interest,
        threshold,
        rate,
        years,
        overpay=overpay
    )

    return overpay_case - normal


# ----------------------------------
# LEVEL 4: Break-even salary
# ----------------------------------

def find_break_even_salary(
    balance,
    interest,
    threshold,
    rate,
    years,
    overpay
):
    low = 20000
    high = 150000
    tolerance = 1

    if repayment_difference(
        low,
        balance,
        interest,
        threshold,
        rate,
        years,
        overpay
    ) > 0:
        return None

    if repayment_difference(
        high,
        balance,
        interest,
        threshold,
        rate,
        years,
        overpay
    ) < 0:
        return None

    mid = low

    while high - low > tolerance:
        mid = (low + high) / 2

        diff = repayment_difference(
            mid,
            balance,
            interest,
            threshold,
            rate,
            years,
            overpay
        )

        if diff > 0:
            high = mid
        else:
            low = mid

    return round(mid, 0)


# ----------------------------------
# LEVEL 5A: Investment comparison
# ----------------------------------

def future_value(
    monthly_amount,
    years,
    return_rate=0.05
):
    months = years * 12
    monthly_rate = return_rate / 12
    value = 0

    for _ in range(months):
        value = value * (1 + monthly_rate) + monthly_amount

    return value


# ----------------------------------
# LEVEL 5B: Break-even return
# ----------------------------------

def find_break_even_return(
    balance,
    salary,
    interest,
    threshold,
    rate,
    years,
    monthly_overpay
):
    annual_overpay = monthly_overpay * 12

    normal = simulate_loan(
        balance,
        salary,
        interest,
        threshold,
        rate,
        years,
        overpay=0
    )

    overpay_case = simulate_loan(
        balance,
        salary,
        interest,
        threshold,
        rate,
        years,
        overpay=annual_overpay
    )

    overpay_benefit = normal - overpay_case

    if overpay_benefit <= 0:
        return None

    low = 0.0
    high = 0.15
    mid = 0

    for _ in range(25):
        mid = (low + high) / 2

        invest_value = future_value(
            monthly_overpay,
            years,
            return_rate=mid
        )

        if invest_value > overpay_benefit:
            high = mid
        else:
            low = mid

    return round(mid * 100, 2)


# ----------------------------------
# LEVEL 6: API WRAPPER
# ----------------------------------

def calculate_loan(data):

    salary = data.get("salary", 30000)
    loan_balance = data.get("loan_balance", 50000)
    monthly_overpay = data.get("overpay", 100)

    interest = data.get("loan_interest", 0.06) * 100
    threshold = data.get("threshold", 27295)
    rate = data.get("repayment_rate", 9)
    years = data.get("write_off_years", 30)

    return_rate = data.get("return_rate", 0.05)

    annual_overpay = monthly_overpay * 12

    # ----------------------------------
    # BASE SCENARIO
    # ----------------------------------
    total_repaid, schedule = simulate_loan(
        loan_balance,
        salary,
        interest,
        threshold,
        rate,
        years,
        overpay=0,
        return_schedule=True
    )

    # ----------------------------------
    # OVERPAY SCENARIO
    # ----------------------------------
    total_repaid_overpay, overpay_schedule = simulate_loan(
        loan_balance,
        salary,
        interest,
        threshold,
        rate,
        years,
        overpay=annual_overpay,
        return_schedule=True
    )

    # ----------------------------------
    # REMAINING BALANCES
    # ----------------------------------
    remaining_balance = (
        schedule[-1]["balance"]
        if schedule else 0
    )

    remaining_balance_overpay = (
        overpay_schedule[-1]["balance"]
        if overpay_schedule else 0
    )

    # ----------------------------------
    # INVESTMENT
    # ----------------------------------
    invest_value = future_value(
        monthly_overpay,
        years,
        return_rate
    )

    # ----------------------------------
    # NET POSITIONS
    # ----------------------------------
    minimum_net = -remaining_balance

    overpay_net = -remaining_balance_overpay

    invest_net = invest_value - remaining_balance

    wealth_difference = invest_net - overpay_net

    # ----------------------------------
    # REPAYMENT OUTCOME
    # ----------------------------------
    if remaining_balance > 0:
        outcome_type = "write_off"
        explanation = (
            "You are unlikely to fully repay your loan "
            "before it is written off."
        )

    elif total_repaid < loan_balance * 1.1:
        outcome_type = "borderline"
        explanation = (
            "You may repay your loan, but outcomes depend "
            "on future earnings and interest rates."
        )

    else:
        outcome_type = "full_repay"
        explanation = (
            "You are likely to fully repay your loan."
        )

    repayment_outcome = {
        "type": outcome_type,
        "explanation": explanation
    }

    decision = {
        "repayment_outcome": repayment_outcome,
        "strategy": (
            "invest"
            if wealth_difference > 0
            else "overpay"
        )
    }

    insights = {
        "wealth_difference": round(
            wealth_difference,
            0
        )
    }

    # ----------------------------------
    # CURVES
    # ----------------------------------
    minimum_curve = []
    overpay_curve = []

    for row in schedule:
        minimum_curve.append(
            round(-row["balance"], 0)
        )

    for row in overpay_schedule:
        overpay_curve.append(
            round(-row["balance"], 0)
        )

    # ----------------------------------
    # BREAK-EVEN FEATURES
    # ----------------------------------
    break_even_salary = find_break_even_salary(
        loan_balance,
        interest,
        threshold,
        rate,
        years,
        annual_overpay
    )

    break_even_return = find_break_even_return(
        loan_balance,
        salary,
        interest,
        threshold,
        rate,
        years,
        monthly_overpay
    )

    # ----------------------------------
    # FINAL RESPONSE
    # ----------------------------------
    return {
        "decision": decision,
        "insights": insights,

        "total_repaid": round(total_repaid, 0),
        "total_repaid_overpay": round(
            total_repaid_overpay,
            0
        ),

        "invest_future_value": round(
            invest_value,
            0
        ),

        "break_even_salary": break_even_salary,
        "break_even_return": break_even_return,

        "remaining_balance": round(
            remaining_balance,
            0
        ),

        "net_position": round(
            minimum_net,
            0
        ),

        "curve": minimum_curve,

        "invest": {
            "yearly_data": schedule
        },

        "overpay": {
            "remaining_balance": round(
                remaining_balance_overpay,
                0
            ),
            "net_position": round(
                overpay_net,
                0
            ),
            "curve": overpay_curve
        }
    }