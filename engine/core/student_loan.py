
# --------------------------------------------------
# WAYLI student_loan.py v2
# Lean, clearer, trustworthy engine
# Annual simulation model
# --------------------------------------------------

# --------------------------------------------------
# PLAN CONFIG
# --------------------------------------------------

PLAN_CONFIG = {
    "plan1": {
        "name": "Plan 1",
        "threshold": 26065,
        "years": 25,
        "repayment_rate": 0.09,
        "interest": 0.045,
    },
    "plan2": {
        "name": "Plan 2",
        "threshold": 27295,
        "years": 30,
        "repayment_rate": 0.09,
        "interest": 0.06,
    },
    "plan4": {
        "name": "Plan 4",
        "threshold": 32745,
        "years": 30,
        "repayment_rate": 0.09,
        "interest": 0.045,
    },
    "plan5": {
        "name": "Plan 5",
        "threshold": 25000,
        "years": 40,
        "repayment_rate": 0.09,
        "interest": 0.055,
    },
    "postgrad": {
        "name": "Postgraduate",
        "threshold": 21000,
        "years": 30,
        "repayment_rate": 0.06,
        "interest": 0.06,
    },
}

# --------------------------------------------------
# HELPERS
# --------------------------------------------------


def num(value, default=0):
    try:
        return float(value)
    except:
        return default


def clamp(value, low, high):
    return max(low, min(high, value))


def money(value):
    return round(float(value), 0)


def get_plan(plan_name):
    key = str(plan_name).lower().replace(" ", "")
    return PLAN_CONFIG.get(
        key,
        PLAN_CONFIG["plan2"]
    )

# --------------------------------------------------
# CORE MATHS
# --------------------------------------------------


def annual_repayment(
    salary,
    threshold,
    repayment_rate
):
    above = max(
        0,
        salary - threshold
    )

    return above * repayment_rate


def simulate_loan(
    balance,
    salary,
    age,
    threshold,
    years,
    repayment_rate,
    interest,
    overpay_yearly=0,
    salary_growth=0.03,
    threshold_growth=0.02
):
    current_balance = float(balance)
    current_salary = float(salary)
    current_threshold = float(threshold)

    total_repaid = 0
    total_interest = 0
    cleared_year = None

    schedule = []

    for year in range(1, years + 1):

        if current_balance <= 0:
            break

        # interest added
        interest_paid = (
            current_balance *
            interest
        )

        current_balance += interest_paid
        total_interest += interest_paid

        # repayments
        payroll = annual_repayment(
            current_salary,
            current_threshold,
            repayment_rate
        )

        repayment = (
            payroll +
            overpay_yearly
        )

        repayment = min(
            repayment,
            current_balance
        )

        current_balance -= repayment
        total_repaid += repayment

        if (
            current_balance <= 0
            and cleared_year is None
        ):
            cleared_year = year

        schedule.append({
            "year": year,
            "age": age + year,
            "salary": money(
                current_salary
            ),
            "threshold": money(
                current_threshold
            ),
            "interest": money(
                interest_paid
            ),
            "repayment": money(
                repayment
            ),
            "balance": money(
                max(
                    0,
                    current_balance
                )
            ),
        })

        current_salary *= (
            1 + salary_growth
        )

        current_threshold *= (
            1 + threshold_growth
        )

    cleared = (
        current_balance <= 0
    )

    return {
        "cleared": cleared,
        "cleared_year": cleared_year,
        "write_off_year": years,
        "remaining_balance": money(
            max(
                0,
                current_balance
            )
        ),
        "total_repaid": money(
            total_repaid
        ),
        "total_interest": money(
            total_interest
        ),
        "schedule": schedule,
    }

# --------------------------------------------------
# SALARY BENCHMARK
# --------------------------------------------------


def estimate_salary_needed(
    balance,
    age,
    threshold,
    years,
    repayment_rate,
    interest,
    salary_growth=0.03,
    threshold_growth=0.02
):
    low = threshold
    high = 200000

    while high - low > 250:
        mid = (
            low + high
        ) / 2

        result = simulate_loan(
            balance=balance,
            salary=mid,
            age=age,
            threshold=threshold,
            years=years,
            repayment_rate=repayment_rate,
            interest=interest,
            salary_growth=salary_growth,
            threshold_growth=threshold_growth,
        )

        if result["cleared"]:
            high = mid
        else:
            low = mid

    return money(high)

# --------------------------------------------------
# OVERPAYMENT COMPARISON
# --------------------------------------------------


def compare_overpay(
    balance,
    salary,
    age,
    threshold,
    years,
    repayment_rate,
    interest,
    monthly_overpay,
    salary_growth=0.03,
    threshold_growth=0.02
):
    base = simulate_loan(
        balance,
        salary,
        age,
        threshold,
        years,
        repayment_rate,
        interest,
        0,
        salary_growth,
        threshold_growth,
    )

    boosted = simulate_loan(
        balance,
        salary,
        age,
        threshold,
        years,
        repayment_rate,
        interest,
        monthly_overpay * 12,
        salary_growth,
        threshold_growth,
    )

    base_year = (
        base["cleared_year"]
        or years
    )

    boosted_year = (
        boosted["cleared_year"]
        or years
    )

    years_saved = max(
        0,
        base_year - boosted_year
    )

    total_saved = max(
        0,
        base["total_repaid"] -
        boosted["total_repaid"]
    )

    return {
        "years_saved": years_saved,
        "total_saved": money(
            total_saved
        ),
        "monthly_overpay": money(
            monthly_overpay
        ),
    }

# --------------------------------------------------
# MAIN ENTRY
# --------------------------------------------------


def calculate_loan(data):
    plan = get_plan(
        data.get(
            "plan",
            "plan2"
        )
    )

    salary = num(
        data.get(
            "salary",
            42000
        )
    )

    balance = num(
        data.get(
            "loan_balance",
            48000
        )
    )

    age = int(
        num(
            data.get(
                "current_age",
                30
            )
        )
    )

    monthly_overpay = num(
        data.get(
            "overpay",
            100
        )
    )

    salary_growth = clamp(
        num(
            data.get(
                "salary_growth",
                0.03
            )
        ),
        -0.05,
        0.10
    )

    threshold_growth = clamp(
        num(
            data.get(
                "threshold_growth",
                0.02
            )
        ),
        0,
        0.10
    )

    summary = simulate_loan(
        balance=balance,
        salary=salary,
        age=age,
        threshold=plan["threshold"],
        years=plan["years"],
        repayment_rate=plan["repayment_rate"],
        interest=plan["interest"],
        overpay_yearly=0,
        salary_growth=salary_growth,
        threshold_growth=threshold_growth,
    )

    salary_needed = estimate_salary_needed(
        balance=balance,
        age=age,
        threshold=plan["threshold"],
        years=plan["years"],
        repayment_rate=plan["repayment_rate"],
        interest=plan["interest"],
        salary_growth=salary_growth,
        threshold_growth=threshold_growth,
    )

    overpayment = compare_overpay(
        balance=balance,
        salary=salary,
        age=age,
        threshold=plan["threshold"],
        years=plan["years"],
        repayment_rate=plan["repayment_rate"],
        interest=plan["interest"],
        monthly_overpay=monthly_overpay,
        salary_growth=salary_growth,
        threshold_growth=threshold_growth,
    )

    return {
        "plan_used":
            plan["name"],

        "summary":
            summary,

        "benchmark": {
            "salary_needed":
                salary_needed
        },

        "overpayment":
            overpayment,

        "assumptions": {
            "salary_growth":
                salary_growth,
            "threshold_growth":
                threshold_growth,
            "interest":
                plan["interest"],
            "repayment_rate":
                plan["repayment_rate"],
        }
    }


if __name__ == "__main__":
    test = calculate_loan({
        "plan": "plan2",
        "salary": 42000,
        "loan_balance": 48000,
        "current_age": 30,
        "overpay": 100
    })

    print(test)