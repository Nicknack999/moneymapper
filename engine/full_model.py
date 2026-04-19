# -------------------------------------------------
# WAYLI FULL_MODEL V8.1
# Safe production patch
# Preserves proven structure
# Fixes inflated rankings
# Keeps API contract stable
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


def explanation_text(
    repayment_type,
    winner_key
):
    if repayment_type == "write_off":
        if winner_key == "invest":
            return (
                "Full repayment looks less likely under these assumptions, "
                "so keeping spare money invested may create more value."
            )

        return (
            "Full repayment looks less likely under these assumptions. "
            "Reducing the balance sooner may still suit some people."
        )

    if repayment_type == "full_repay":
        if winner_key == "overpay":
            return (
                "Full repayment looks likely. Overpaying may reduce interest "
                "and clear the balance sooner."
            )

        if winner_key == "invest":
            return (
                "Full repayment looks likely. Investing the same money may still "
                "produce the strongest projected outcome."
            )

    return (
        "This looks fairly close. Small changes to salary, returns or timing "
        "could change the ranking."
    )


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
    retirement_age
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

        if result.get(
            "remaining_balance",
            loan_balance
        ) <= 100:
            return salary

    return None


# -------------------------------------------------
# NORMALISE OUTPUT
# -------------------------------------------------
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

    curve = model.get(
        "curve",
        []
    )

    if not curve and yearly_data:
        curve = [
            round(
                -row.get(
                    "balance",
                    fallback_balance
                ),
                0
            )
            for row in yearly_data
        ]

    return {
        "curve": curve,
        "remaining_balance": model.get(
            "remaining_balance",
            fallback_balance
        ),
        "total_repaid": model.get(
            "total_repaid",
            0
        ),
        "net_position": model.get(
            "net_position",
            0
        ),
    }


# -------------------------------------------------
# SAFE SCORING
# -------------------------------------------------
def safe_invest_score(
    invest_case,
    monthly_amount,
    years
):
    # Cap extreme outputs by using the
    # lower of forecast score or plausible max

    raw = invest_case.get(
        "net_position",
        0
    )

    total_contributed = (
        monthly_amount * 12 * years
    )

    plausible_cap = (
        total_contributed * 2.5
    )

    return min(raw, plausible_cap)


# -------------------------------------------------
# MAIN ENGINE
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

    monthly_amount = num(
        data.get(
            "monthly_savings",
            100
        )
    )

    if monthly_amount == 0:
        monthly_amount = num(
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
            data.get(
                "write_off_years",
                30
            )
        )
    )

    years = max(
        1,
        retirement_age - current_age
    )

    # --------------------------------
    # MINIMUM
    # --------------------------------
    minimum_raw = calculate_loan(
        {
            "salary": salary,
            "loan_balance": loan_balance,
            "threshold": threshold,
            "write_off_years": write_off_years,
            "loan_interest": loan_interest,
            "overpay": 0,
        }
    )

    minimum = extract_result(
        minimum_raw,
        loan_balance
    )

    # --------------------------------
    # OVERPAY
    # --------------------------------
    overpay_raw = calculate_loan(
        {
            "salary": salary,
            "loan_balance": loan_balance,
            "threshold": threshold,
            "write_off_years": write_off_years,
            "loan_interest": loan_interest,
            "overpay": monthly_amount,
        }
    )

    overpay_case = extract_result(
        overpay_raw,
        loan_balance
    )

    # --------------------------------
    # INVEST
    # --------------------------------
    invest_case = run_forecast(
        {
            "salary": salary,
            "loan_balance": loan_balance,
            "threshold": threshold,
            "write_off_years": write_off_years,
            "loan_interest": loan_interest,
            "current_age": current_age,
            "retirement_age": retirement_age,
            "monthly_savings": monthly_amount,
            "return_rate": return_rate,
            "overpay": 0,
            "model_opportunity_cost": True,
        }
    )

    # --------------------------------
    # SCORES
    # --------------------------------
    minimum_final = minimum[
        "net_position"
    ]

    overpay_final = overpay_case[
        "net_position"
    ]

    invest_final = safe_invest_score(
        invest_case,
        monthly_amount,
        years
    )

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
    # STATUS
    # --------------------------------
    repayment_type = classify_repayment(
        minimum["remaining_balance"],
        loan_balance,
        minimum["total_repaid"]
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
        retirement_age
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

    def pad(curve):
        if len(curve) < len(ages):
            filler = (
                curve[-1]
                if curve else 0
            )

            curve = curve + [
                filler
            ] * (
                len(ages) -
                len(curve)
            )

        return curve[:len(ages)]

    minimum_curve = pad(
        minimum["curve"]
    )

    overpay_curve = pad(
        overpay_case["curve"]
    )

    invest_curve = pad(
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
                f"(best projected outcome in this model)"
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