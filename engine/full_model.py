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


def winner_label(key):
    return f"{label(key)} (best financial outcome in this model)"


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
    if repayment_type == "full_repay":
        if winner_key == "overpay":
            return (
                "Because full repayment looks likely, clearing "
                "the balance sooner can reduce interest and free "
                "up future cash earlier."
            )

        if winner_key == "invest":
            return (
                "Investing still looks strongest here, but "
                "overpaying may still appeal if you prefer "
                "certainty or faster debt clearance."
            )

    if repayment_type == "write_off":
        return (
            "This looks more like a case where the loan may "
            "not be fully repaid before write-off, so keeping "
            "extra money elsewhere can sometimes work better."
        )

    return (
        "This looks fairly close. Small changes to earnings, "
        "returns or timing could change the result."
    )


def create_trigger_text(
    current_salary,
    trigger_salary
):
    if trigger_salary is None:
        return (
            "With your current balance and assumptions, "
            "full repayment looks less likely within the "
            "selected period."
        )

    if current_salary >= trigger_salary:
        return (
            "At your current income, full repayment already "
            "looks more likely within the selected timeframe."
        )

    return (
        f"With your current balance and assumptions, "
        f"full repayment may become more likely from around "
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
# CURVE HELPERS
# -------------------------------------------------
def debt_curve_from_result(
    result,
    fallback_balance
):
    yearly = result.get(
        "invest",
        {}
    ).get(
        "yearly_data",
        []
    )

    curve = []

    if yearly:
        for row in yearly:
            curve.append(
                round(-row.get("balance", 0), 0)
            )
        return curve

    return [round(-fallback_balance, 0)]


def pad_curve(curve, target_len):
    if len(curve) < target_len:
        filler = curve[-1] if curve else 0
        curve = curve + [filler] * (
            target_len - len(curve)
        )

    return curve[:target_len]


# -------------------------------------------------
# MAIN
# -------------------------------------------------
def run_full_model(data):

    # --------------------------------
    # INPUTS
    # --------------------------------
    salary = num(data.get("salary"), 40000)
    loan_balance = num(data.get("loan_balance"), 50000)
    current_age = int(num(data.get("current_age"), 30))
    retirement_age = int(num(data.get("retirement_age"), 60))
    monthly_amount = num(data.get("monthly_savings"), 100)

    overpay = num(
        data.get("overpay"),
        monthly_amount
    )

    return_rate = num(data.get("return_rate"), 0.05)
    loan_interest = num(data.get("loan_interest"), 0.06)
    threshold = num(data.get("threshold"), 27295)

    write_off_years = int(
        num(data.get("write_off_years"), 30)
    )

    model_opportunity_cost = data.get(
        "model_opportunity_cost",
        True
    )

    years = max(
        0,
        retirement_age - current_age
    )

    # --------------------------------
    # ROUTE 1: MINIMUM
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

    minimum_remaining = minimum_raw.get(
        "remaining_balance",
        loan_balance
    )

    minimum_final = -minimum_remaining

    minimum_curve = debt_curve_from_result(
        minimum_raw,
        loan_balance
    )

    # --------------------------------
    # ROUTE 2: OVERPAY NOW
    # Then invest after loan cleared
    # --------------------------------
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

    overpay_remaining = overpay_raw.get(
        "remaining_balance",
        loan_balance
    )

    overpay_curve = debt_curve_from_result(
        overpay_raw,
        loan_balance
    )

    loan_cleared_age = None

    yearly = overpay_raw.get(
        "invest",
        {}
    ).get(
        "yearly_data",
        []
    )

    for i, row in enumerate(yearly):
        if row.get("balance", 1) <= 0:
            loan_cleared_age = current_age + i + 1
            break

    invest_after_clear = 0

    if loan_cleared_age is not None:
        invest_years = max(
            0,
            retirement_age - loan_cleared_age
        )

        invest_after_clear = run_forecast(
            {
                "salary": salary,
                "loan_balance": 0,
                "current_age": loan_cleared_age,
                "retirement_age": retirement_age,
                "monthly_savings": monthly_amount,
                "return_rate": return_rate,
                "overpay": 0,
                "model_opportunity_cost": False,
            }
        ).get(
            "final_investment_value",
            0
        )

    overpay_final = (
        invest_after_clear - overpay_remaining
    )

    # --------------------------------
    # ROUTE 3: INVEST NOW
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
            "model_opportunity_cost": model_opportunity_cost,
        }
    )

    invest_final = invest_case.get(
        "net_position",
        0
    )

    invest_curve = invest_case.get(
        "curve",
        []
    )

    # --------------------------------
    # REPAYMENT TYPE
    # --------------------------------
    repayment_type = classify_repayment(
        minimum_remaining,
        loan_balance,
        minimum_raw.get(
            "total_repaid",
            0
        )
    )

    # --------------------------------
    # RANKING = REAL VALUES ONLY
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

    ranking = [x[0] for x in ordered]
    winner_key = ranking[0]

    winner_gap = (
        ordered[0][1] - ordered[1][1]
    )

    close_result = abs(winner_gap) < 10000

    # --------------------------------
    # INSIGHTS
    # --------------------------------
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
    # ALIGN CURVES
    # --------------------------------
    ages = invest_case.get("ages", [])

    minimum_curve = pad_curve(
        minimum_curve,
        len(ages)
    )

    overpay_curve = pad_curve(
        overpay_curve,
        len(ages)
    )

    invest_curve = pad_curve(
        invest_curve,
        len(ages)
    )

    # --------------------------------
    # RESPONSE
    # --------------------------------
    return {
        "summary": {
            "winner_label": winner_label(winner_key),
            "winner_difference": round(
                winner_gap,
                2
            ),
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