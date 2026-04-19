# full_model.py
# -------------------------------------------------
# WAYLI FULL_MODEL V10
# True unified yearly simulator
# One engine / three strategies
# Proper production rebuild
# -------------------------------------------------

from student_loan import annual_loan_repayment
from student_loan import apply_loan_year


# -------------------------------------------------
# HELPERS
# -------------------------------------------------
def num(value, default=0):
    try:
        return float(value)
    except:
        return default


def label(key):
    labels = {
        "minimum": "Minimum repayments only",
        "overpay": "Overpay monthly",
        "invest": "Invest monthly",
    }
    return labels.get(key, key)


def classify_repayment(
    remaining_balance,
    original_balance
):
    if remaining_balance <= 100:
        return "full_repay"

    if remaining_balance >= (
        original_balance * 0.7
    ):
        return "write_off"

    return "borderline"


# -------------------------------------------------
# CORE UNIFIED SIMULATOR
# -------------------------------------------------
def simulate_strategy(
    salary,
    loan_balance,
    threshold,
    loan_interest,
    current_age,
    retirement_age,
    monthly_amount,
    return_rate,
    strategy,
    repayment_rate=9,
    salary_growth=0.03,
    write_off_years=30
):
    years = max(
        1,
        retirement_age - current_age
    )

    pot = 0.0
    balance = float(loan_balance)

    ages = []
    curve = []

    for year in range(years + 1):

        age = current_age + year

        current_salary = salary * (
            (1 + salary_growth) ** year
        )

        # -------------------------
        # WRITE OFF
        # -------------------------
        if year >= write_off_years:
            balance = 0

        # -------------------------
        # REQUIRED REPAYMENT
        # -------------------------
        if balance > 0:
            repayment = annual_loan_repayment(
                current_salary,
                threshold,
                repayment_rate
            )
        else:
            repayment = 0

        # -------------------------
        # EXTRA MONTHLY MONEY
        # -------------------------
        annual_extra = (
            monthly_amount * 12
        )

        invest_add = 0
        overpay_add = 0

        if strategy == "invest":
            invest_add = annual_extra

        elif strategy == "overpay":
            overpay_add = annual_extra

        # -------------------------
        # INVESTMENTS
        # -------------------------
        pot += invest_add
        pot *= (1 + return_rate)

        # -------------------------
        # LOAN YEAR
        # -------------------------
        if balance > 0:
            scheduled = repayment + overpay_add

            max_possible = (
                balance *
                (1 + loan_interest)
            )

            scheduled = min(
                scheduled,
                max_possible
            )

            balance, _, _ = apply_loan_year(
                balance,
                loan_interest * 100,
                scheduled
            )

        # -------------------------
        # NET POSITION
        # -------------------------
        net = pot - balance

        ages.append(age)
        curve.append(round(net, 0))

    return {
        "ages": ages,
        "curve": curve,
        "final_net": round(net, 2),
        "remaining_balance": round(balance, 2),
    }


# -------------------------------------------------
# MAIN API
# -------------------------------------------------
def run_full_model(data):

    # -------------------------
    # INPUTS
    # -------------------------
    salary = num(
        data.get("salary"),
        40000
    )

    loan_balance = num(
        data.get("loan_balance"),
        50000
    )

    current_age = int(
        num(
            data.get("current_age"),
            30
        )
    )

    retirement_age = int(
        num(
            data.get("retirement_age"),
            60
        )
    )

    monthly_amount = num(
        data.get(
            "monthly_savings",
            data.get(
                "overpay",
                100
            )
        ),
        100
    )

    return_rate = num(
        data.get("return_rate"),
        0.05
    )

    loan_interest = num(
        data.get("loan_interest"),
        0.06
    )

    threshold = num(
        data.get("threshold"),
        27295
    )

    write_off_years = int(
        num(
            data.get(
                "write_off_years",
                30
            )
        )
    )

    # -------------------------
    # RUN 3 ROUTES
    # -------------------------
    minimum = simulate_strategy(
        salary,
        loan_balance,
        threshold,
        loan_interest,
        current_age,
        retirement_age,
        monthly_amount,
        return_rate,
        "minimum",
        write_off_years=write_off_years
    )

    overpay = simulate_strategy(
        salary,
        loan_balance,
        threshold,
        loan_interest,
        current_age,
        retirement_age,
        monthly_amount,
        return_rate,
        "overpay",
        write_off_years=write_off_years
    )

    invest = simulate_strategy(
        salary,
        loan_balance,
        threshold,
        loan_interest,
        current_age,
        retirement_age,
        monthly_amount,
        return_rate,
        "invest",
        write_off_years=write_off_years
    )

    # -------------------------
    # SCORES
    # -------------------------
    scores = {
        "minimum": minimum["final_net"],
        "overpay": overpay["final_net"],
        "invest": invest["final_net"],
    }

    ordered = sorted(
        scores.items(),
        key=lambda x: x[1],
        reverse=True
    )

    ranking = [
        x[0]
        for x in ordered
    ]

    winner_key = ranking[0]

    winner_gap = round(
        ordered[0][1] -
        ordered[1][1],
        2
    )

    close_result = (
        abs(winner_gap) < 10000
    )

    # -------------------------
    # REPAYMENT STATUS
    # -------------------------
    repayment_type = classify_repayment(
        minimum["remaining_balance"],
        loan_balance
    )

    # -------------------------
    # EXPLANATION
    # -------------------------
    if repayment_type == "write_off":
        explanation = (
            "Full repayment looks less likely under these assumptions."
        )

    elif winner_key == "overpay":
        explanation = (
            "Overpaying looks stronger here because clearing debt sooner can help."
        )

    elif winner_key == "invest":
        explanation = (
            "Investing looks stronger here because long-term growth may outweigh overpaying."
        )

    else:
        explanation = (
            "This looks relatively close."
        )

    # -------------------------
    # OUTPUT
    # -------------------------
    return {
        "summary": {
            "winner_label": (
                f"{label(winner_key)} "
                f"(best projected outcome in this model)"
            ),
            "winner_difference": winner_gap,
            "ranking": ranking,
            "minimum_final": minimum["final_net"],
            "overpay_final": overpay["final_net"],
            "invest_final": invest["final_net"],
        },

        "insights": {
            "close_result": close_result,
            "explanation": explanation,
            "salary_trigger_text": ""
        },

        "decision": {
            "repayment_outcome": {
                "type": repayment_type
            }
        },

        "curves": {
            "ages": minimum["ages"],
            "minimum_net_worth": minimum["curve"],
            "overpay_net_worth": overpay["curve"],
            "invest_net_worth": invest["curve"],
        }
    }