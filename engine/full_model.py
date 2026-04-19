# -------------------------------------------------
# WAYLI FULL_MODEL V7
# Hybrid UK student loan comparison engine
# Safer, smarter, more varied outcomes
# Drop-in replacement for full_model.py
# -------------------------------------------------

from student_loan import calculate_loan
from forecast import run_forecast


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


def clamp(value, low, high):
    return max(low, min(high, value))


# -------------------------------------------------
# INTERPRET REPAYMENT STATUS
# -------------------------------------------------
def classify_repayment(
    remaining_balance,
    original_balance,
    total_repaid
):
    if remaining_balance <= 100:
        return "full_repay"

    repay_ratio = total_repaid / max(original_balance, 1)

    if repay_ratio < 0.70:
        return "write_off"

    return "borderline"


# -------------------------------------------------
# EXPLANATION
# -------------------------------------------------
def explanation_text(
    repayment_type,
    winner_key
):
    if repayment_type == "write_off":
        if winner_key == "invest":
            return (
                "This looks more like a write-off scenario, "
                "so keeping spare money invested can sometimes "
                "create more value than overpaying."
            )

        return (
            "This looks more like a write-off scenario. "
            "Even so, reducing the balance sooner may still suit "
            "people who value certainty."
        )

    if repayment_type == "full_repay":
        if winner_key == "overpay":
            return (
                "Full repayment looks likely. Overpaying may reduce "
                "interest and clear the loan earlier."
            )

        if winner_key == "invest":
            return (
                "Full repayment looks likely, but investing the same "
                "money may still produce a stronger net outcome."
            )

    return (
        "This looks fairly close. Small changes to earnings, "
        "returns or timing could change the result."
    )


# -------------------------------------------------
# SALARY TRIGGER
# -------------------------------------------------
def create_trigger_text(
    current_salary,
    trigger_salary
):
    if trigger_salary is None:
        return (
            "Full repayment looks less likely under the current assumptions."
        )

    if current_salary >= trigger_salary:
        return (
            "At your current income, full repayment already looks more likely "
            "within the selected timeframe."
        )

    return (
        f"Full repayment may become more likely from around "
        f"£{trigger_salary:,.0f} salary upward."
    )


def estimate_salary_trigger(
    loan_balance,
    threshold,
    write_off_years,
    loan_interest,
    current_age,
    retirement_age,
):
    for salary in range(25000, 150001, 2500):
        result = calculate_loan(
            {
                "salary": salary,
                "loan_balance": loan_balance,
                "threshold": threshold,
                "write_off_years": write_off_years,
                "loan_interest": loan_interest,
                "current_age": current_age,
                "retirement_age": retirement_age,
                "overpay": 0,
            }
        )

        remaining = result.get(
            "remaining_balance",
            loan_balance
        )

        if remaining <= 100:
            return salary

    return None


# -------------------------------------------------
# CURVE HELPERS
# -------------------------------------------------
def build_curve_from_yearly_data(
    yearly_data,
    starting_balance
):
    curve = []
    balance = starting_balance

    for row in yearly_data:
        balance = row.get(
            "balance",
            balance
        )
        curve.append(round(-balance, 0))

    return curve


def extract_result(
    model,
    fallback_balance
):
    yearly_data = model.get(
        "invest",
        {}
    ).get(
        "yearly_data",
        []
    )

    curve = model.get("curve")

    if not curve:
        curve = build_curve_from_yearly_data(
            yearly_data,
            fallback_balance
        )

    remaining_balance = model.get(
        "remaining_balance",
        yearly_data[-1]["balance"]
        if yearly_data
        else fallback_balance
    )

    total_repaid = model.get(
        "total_repaid",
        0
    )

    net_position = model.get(
        "net_position",
        0
    )

    return {
        "curve": curve,
        "remaining_balance": remaining_balance,
        "total_repaid": total_repaid,
        "net_position": net_position,
        "yearly_data": yearly_data,
    }


# -------------------------------------------------
# OVERPAY BONUS ENGINE
# -------------------------------------------------
def overpay_bonus(
    overpay_case,
    minimum_case,
    monthly_amount,
    compare_years,
    loan_interest
):
    bonus = 0

    # -----------------------------
    # 1. Interest certainty bonus
    # -----------------------------
    bonus += monthly_amount * 12 * (
        loan_interest * 0.35
    ) * compare_years

    # -----------------------------
    # 2. Reduced balance bonus
    # -----------------------------
    balance_saved = (
        minimum_case["remaining_balance"]
        - overpay_case["remaining_balance"]
    )

    bonus += balance_saved * 0.25

    # -----------------------------
    # 3. Earlier payoff bonus
    # -----------------------------
    min_clear = minimum_case[
        "remaining_balance"
    ] <= 100

    over_clear = overpay_case[
        "remaining_balance"
    ] <= 100

    if over_clear and not min_clear:
        bonus += monthly_amount * 12 * 6

    # -----------------------------
    # 4. Psychological certainty
    # -----------------------------
    bonus += 3000

    return round(bonus, 0)


# -------------------------------------------------
# MAIN FUNCTION
# -------------------------------------------------
def run_full_model(data):

    # --------------------------------
    # INPUTS
    # --------------------------------
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

    monthly_savings = num(
        data.get("monthly_savings"),
        100
    )

    overpay = num(
        data.get("overpay"),
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
            data.get("write_off_years"),
            30
        )
    )

    model_opportunity_cost = data.get(
        "model_opportunity_cost",
        True
    )

    compare_years = max(
        1,
        retirement_age - current_age
    )

    # --------------------------------
    # RUN MODELS
    # --------------------------------
    minimum_raw = calculate_loan(
        {
            "salary": salary,
            "loan_balance": loan_balance,
            "threshold": threshold,
            "write_off_years": write_off_years,
            "loan_interest": loan_interest,
            "current_age": current_age,
            "retirement_age": retirement_age,
            "overpay": 0,
        }
    )

    overpay_raw = calculate_loan(
        {
            "salary": salary,
            "loan_balance": loan_balance,
            "threshold": threshold,
            "write_off_years": write_off_years,
            "loan_interest": loan_interest,
            "current_age": current_age,
            "retirement_age": retirement_age,
            "overpay": overpay,
        }
    )

    invest_case = run_forecast(
        {
            "salary": salary,
            "loan_balance": loan_balance,
            "threshold": threshold,
            "write_off_years": write_off_years,
            "loan_interest": loan_interest,
            "current_age": current_age,
            "retirement_age": retirement_age,
            "monthly_savings": monthly_savings,
            "return_rate": return_rate,
            "overpay": 0,
            "model_opportunity_cost": model_opportunity_cost,
        }
    )

    minimum = extract_result(
        minimum_raw,
        loan_balance
    )

    overpay_case = extract_result(
        overpay_raw,
        loan_balance
    )

    # --------------------------------
    # BASE SCORES
    # --------------------------------
    minimum_final = minimum[
        "net_position"
    ]

    invest_final = invest_case.get(
        "net_position",
        0
    )

    overpay_final = overpay_case[
        "net_position"
    ]

    # --------------------------------
    # APPLY OVERPAY BONUS
    # --------------------------------
    overpay_final += overpay_bonus(
        overpay_case,
        minimum,
        overpay,
        compare_years,
        loan_interest
    )

    # --------------------------------
    # SCORE MAP
    # --------------------------------
    scores = {
        "minimum": minimum_final,
        "overpay": overpay_final,
        "invest": invest_final,
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
        ordered[0][1] - ordered[1][1],
        2
    )

    close_result = (
        abs(winner_gap) < 10000
    )

    # --------------------------------
    # LOAN STATUS
    # --------------------------------
    repayment_type = classify_repayment(
        minimum["remaining_balance"],
        loan_balance,
        minimum["total_repaid"],
    )

    explanation = explanation_text(
        repayment_type,
        winner_key
    )

    trigger_salary = estimate_salary_trigger(
        loan_balance,
        threshold,
        write_off_years,
        loan_interest,
        current_age,
        retirement_age,
    )

    trigger_text = create_trigger_text(
        salary,
        trigger_salary
    )

    # --------------------------------
    # CURVES
    # --------------------------------
    ages = invest_case.get(
        "ages",
        []
    )

    def pad_curve(curve):
        if len(curve) < len(ages):
            curve = curve + [
                curve[-1]
                if curve else 0
            ] * (
                len(ages) - len(curve)
            )

        return curve[:len(ages)]

    minimum_curve = pad_curve(
        minimum["curve"]
    )

    overpay_curve = pad_curve(
        overpay_case["curve"]
    )

    invest_curve = pad_curve(
        invest_case.get(
            "curve",
            []
        )
    )

    # --------------------------------
    # OUTPUT
    # --------------------------------
    return {
        "summary": {
            "winner_label": (
                f"{label(winner_key)} "
                f"(best financial outcome in this model)"
            ),
            "winner_difference": winner_gap,
            "ranking": ranking,
            "minimum_final": round(
                minimum_final,
                2
            ),
            "overpay_final": round(
                overpay_final,
                2
            ),
            "invest_final": round(
                invest_final,
                2
            ),
        },

        "insights": {
            "close_result": close_result,
            "explanation": explanation,
            "salary_trigger_text": trigger_text,
        },

        "decision": {
            "repayment_outcome": {
                "type": repayment_type
            }
        },

        "curves": {
            "ages": ages,
            "minimum_net_worth": minimum_curve,
            "overpay_net_worth": overpay_curve,
            "invest_net_worth": invest_curve,
        }
    }