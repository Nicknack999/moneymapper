# --------------------------------------------------
# WAYLI - STUDENT LOAN ENGINE (SAFE REFACTOR)
# Keeps legacy output contract + adds UK plan support
# --------------------------------------------------

# --------------------------------------------------
# PLAN CONFIG
# --------------------------------------------------

PLAN_CONFIG = {
    "plan1": {
        "threshold": 26065,
        "write_off_years": 25,
        "rate": 9,
    },
    "plan2": {
        "threshold": 27295,
        "write_off_years": 30,
        "rate": 9,
    },
    "plan4": {
        "threshold": 32745,
        "write_off_years": 30,
        "rate": 9,
    },
    "plan5": {
        "threshold": 25000,
        "write_off_years": 40,
        "rate": 9,
    },
    "postgrad": {
        "threshold": 21000,
        "write_off_years": 30,
        "rate": 6,
    },
}


# --------------------------------------------------
# HELPERS
# --------------------------------------------------

def get_plan(plan_name):
    key = str(plan_name).lower().replace(" ", "")
    return PLAN_CONFIG.get(key, PLAN_CONFIG["plan2"])


def num(value, default=0):
    try:
        return float(value)
    except:
        return default


# --------------------------------------------------
# LEVEL 1: YEARLY MECHANICS
# --------------------------------------------------

def annual_loan_repayment(
    salary,
    threshold,
    rate_percent
):
    if salary <= threshold:
        return 0.0

    return (
        salary - threshold
    ) * (
        rate_percent / 100
    )


def apply_loan_year(
    balance,
    interest_rate_percent,
    repayment
):
    interest = (
        balance *
        (interest_rate_percent / 100)
    )

    new_balance = (
        balance +
        interest -
        repayment
    )

    if new_balance < 0:
        repayment += new_balance
        new_balance = 0

    return (
        new_balance,
        repayment,
        interest
    )


# --------------------------------------------------
# LEVEL 2: FULL SIMULATION
# --------------------------------------------------

def simulate_loan(
    balance,
    salary,
    interest,
    threshold,
    rate,
    years,
    overpay=0,
    salary_growth=0.03,
    return_schedule=False
):
    total_repaid = 0
    schedule = []

    for year in range(1, years + 1):

        if balance <= 0:
            break

        current_salary = salary * (
            (1 + salary_growth) ** (year - 1)
        )

        repayment = annual_loan_repayment(
            current_salary,
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


# --------------------------------------------------
# LEVEL 3: SCENARIO COMPARISON
# --------------------------------------------------

def repayment_difference(
    salary,
    balance,
    interest,
    threshold,
    rate,
    years,
    overpay,
    salary_growth
):
    normal = simulate_loan(
        balance,
        salary,
        interest,
        threshold,
        rate,
        years,
        overpay=0,
        salary_growth=salary_growth
    )

    overpay_case = simulate_loan(
        balance,
        salary,
        interest,
        threshold,
        rate,
        years,
        overpay=overpay,
        salary_growth=salary_growth
    )

    return overpay_case - normal


# --------------------------------------------------
# LEVEL 4: BREAK EVEN SALARY
# --------------------------------------------------

def find_break_even_salary(
    balance,
    interest,
    threshold,
    rate,
    years,
    overpay,
    salary_growth
):
    low = 20000
    high = 150000
    tolerance = 1
    mid = low

    low_diff = repayment_difference(
        low,
        balance,
        interest,
        threshold,
        rate,
        years,
        overpay,
        salary_growth
    )

    high_diff = repayment_difference(
        high,
        balance,
        interest,
        threshold,
        rate,
        years,
        overpay,
        salary_growth
    )

    if low_diff > 0:
        return None

    if high_diff < 0:
        return None

    while high - low > tolerance:
        mid = (low + high) / 2

        diff = repayment_difference(
            mid,
            balance,
            interest,
            threshold,
            rate,
            years,
            overpay,
            salary_growth
        )

        if diff > 0:
            high = mid
        else:
            low = mid

    return round(mid, 0)


# --------------------------------------------------
# LEVEL 5A: INVESTMENT VALUE
# --------------------------------------------------

def future_value(
    monthly_amount,
    years,
    return_rate=0.05
):
    months = years * 12
    monthly_rate = return_rate / 12
    value = 0

    for _ in range(months):
        value = (
            value *
            (1 + monthly_rate)
        ) + monthly_amount

    return value


# --------------------------------------------------
# LEVEL 5B: BREAK EVEN RETURN
# --------------------------------------------------

def find_break_even_return(
    balance,
    salary,
    interest,
    threshold,
    rate,
    years,
    monthly_overpay,
    salary_growth
):
    annual_overpay = monthly_overpay * 12

    normal = simulate_loan(
        balance,
        salary,
        interest,
        threshold,
        rate,
        years,
        overpay=0,
        salary_growth=salary_growth
    )

    overpay_case = simulate_loan(
        balance,
        salary,
        interest,
        threshold,
        rate,
        years,
        overpay=annual_overpay,
        salary_growth=salary_growth
    )

    overpay_benefit = (
        normal - overpay_case
    )

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
            mid
        )

        if invest_value > overpay_benefit:
            high = mid
        else:
            low = mid

    return round(mid * 100, 2)


# --------------------------------------------------
# MAIN API WRAPPER
# --------------------------------------------------

def calculate_loan(data):

    plan = get_plan(
        data.get("plan", "plan2")
    )

    salary = num(
        data.get("salary"),
        30000
    )

    loan_balance = num(
        data.get("loan_balance"),
        50000
    )

    monthly_overpay = num(
        data.get("overpay"),
        100
    )

    interest = num(
        data.get("loan_interest"),
        0.06
    ) * 100

    threshold = num(
        data.get(
            "threshold",
            plan["threshold"]
        )
    )

    rate = num(
        data.get(
            "repayment_rate",
            plan["rate"]
        )
    )

    years = int(
        num(
            data.get(
                "write_off_years",
                plan["write_off_years"]
            )
        )
    )

    salary_growth = num(
        data.get(
            "salary_growth",
            0.03
        )
    )

    return_rate = num(
        data.get(
            "return_rate",
            0.05
        )
    )

    annual_overpay = (
        monthly_overpay * 12
    )

    # ----------------------------
    # BASE SCENARIO
    # ----------------------------
    total_repaid, schedule = simulate_loan(
        loan_balance,
        salary,
        interest,
        threshold,
        rate,
        years,
        overpay=0,
        salary_growth=salary_growth,
        return_schedule=True
    )

    # ----------------------------
    # OVERPAY SCENARIO
    # ----------------------------
    total_repaid_overpay, overpay_schedule = simulate_loan(
        loan_balance,
        salary,
        interest,
        threshold,
        rate,
        years,
        overpay=annual_overpay,
        salary_growth=salary_growth,
        return_schedule=True
    )

    remaining_balance = (
        schedule[-1]["balance"]
        if schedule else 0
    )

    remaining_balance_overpay = (
        overpay_schedule[-1]["balance"]
        if overpay_schedule else 0
    )

    # ----------------------------
    # INVESTMENT
    # ----------------------------
    invest_value = future_value(
        monthly_overpay,
        years,
        return_rate
    )

    # ----------------------------
    # NET POSITIONS
    # ----------------------------
    minimum_net = -remaining_balance
    overpay_net = -remaining_balance_overpay
    invest_net = (
        invest_value -
        remaining_balance
    )

    wealth_difference = (
        invest_net -
        overpay_net
    )

    # ----------------------------
    # OUTCOME TYPE
    # ----------------------------
    if remaining_balance > 0:
        outcome_type = "write_off"
        explanation = (
            "You are unlikely to fully repay your loan before it is written off."
        )

    elif total_repaid < loan_balance * 1.1:
        outcome_type = "borderline"
        explanation = (
            "You may repay your loan, but outcomes depend on future earnings and interest rates."
        )

    else:
        outcome_type = "full_repay"
        explanation = (
            "You are likely to fully repay your loan."
        )

    decision = {
        "repayment_outcome": {
            "type": outcome_type,
            "explanation": explanation
        },
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

    minimum_curve = [
        round(-row["balance"], 0)
        for row in schedule
    ]

    overpay_curve = [
        round(-row["balance"], 0)
        for row in overpay_schedule
    ]

    break_even_salary = find_break_even_salary(
        loan_balance,
        interest,
        threshold,
        rate,
        years,
        annual_overpay,
        salary_growth
    )

    break_even_return = find_break_even_return(
        loan_balance,
        salary,
        interest,
        threshold,
        rate,
        years,
        monthly_overpay,
        salary_growth
    )

    return {
        "decision": decision,
        "insights": insights,

        "total_repaid": round(
            total_repaid,
            0
        ),

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