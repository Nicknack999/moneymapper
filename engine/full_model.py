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
        "invest": "Invest monthly"
    }
    return labels.get(key, key)


def classify_repayment(remaining_balance, original_balance, total_repaid):
    if remaining_balance <= 100:
        return "full_repay"

    repay_ratio = total_repaid / max(original_balance, 1)

    if repay_ratio < 0.70:
        return "write_off"

    return "borderline"


# -------------------------------------------------
# SALARY TRIGGER
# -------------------------------------------------
def estimate_salary_trigger(
    loan_balance,
    threshold,
    write_off_years,
    loan_interest,
    current_age,
    retirement_age
):
    for salary in range(25000, 150001, 2500):

        result = calculate_loan({
            "salary": salary,
            "loan_balance": loan_balance,
            "threshold": threshold,
            "write_off_years": write_off_years,
            "loan_interest": loan_interest,
            "current_age": current_age,
            "retirement_age": retirement_age,
            "overpay": 0
        })

        if result.get("remaining_balance", 0) <= 100:
            return salary

    return None


def create_trigger_text(current_salary, trigger_salary):

    if trigger_salary is None:
        return (
            "With your current balance and assumptions, "
            "full repayment looks less likely within the selected period."
        )

    if current_salary >= trigger_salary:
        return (
            "At your current income, full repayment already looks "
            "more likely within the selected timeframe."
        )

    return (
        f"With your current balance and assumptions, "
        f"full repayment may become more likely from around "
        f"£{trigger_salary:,.0f} salary upward."
    )


# -------------------------------------------------
# EXPLANATION TEXT
# -------------------------------------------------
def explanation_text(repayment_type, winner_key):

    if winner_key == "invest":
        return (
            "This looks stronger here because the same monthly amount "
            "has more time to grow."
        )

    if winner_key == "overpay":
        if repayment_type == "full_repay":
            return (
                "Because full repayment looks likely, reducing the balance "
                "earlier and limiting interest can become more valuable."
            )

        return (
            "Some people still prefer reducing the balance for certainty "
            "or peace of mind."
        )

    return (
        "You may keep more monthly flexibility, but build less extra value "
        "in this example."
    )


# -------------------------------------------------
# VALUE EXTRACTORS
# -------------------------------------------------
def get_minimum_value(result):
    if "net_position" in result:
        return result["net_position"]

    return -result.get("remaining_balance", 0)


def get_invest_value(result):
    if "net_position" in result:
        return result["net_position"]

    if "final_investment_value" in result:
        return result["final_investment_value"]

    if "net_worth" in result and len(result["net_worth"]) > 0:
        return result["net_worth"][-1]

    return 0


def get_curve(result, years):
    if "curve" in result:
        return result["curve"]

    if "net_worth" in result:
        return result["net_worth"]

    return [0] * len(years)


# -------------------------------------------------
# MAIN FUNCTION
# -------------------------------------------------
def run_full_model(data):

    # --------------------------------
    # INPUTS
    # --------------------------------
    salary = num(data.get("salary"), 40000)
    loan_balance = num(data.get("loan_balance"), 50000)
    current_age = int(num(data.get("current_age"), 30))
    retirement_age = int(num(data.get("retirement_age"), 60))
    monthly_savings = num(data.get("monthly_savings"), 100)
    overpay = num(data.get("overpay"), monthly_savings)
    return_rate = num(data.get("return_rate"), 0.05)
    loan_interest = num(data.get("loan_interest"), 0.06)
    threshold = num(data.get("threshold"), 27295)
    write_off_years = int(num(data.get("write_off_years"), 30))
    model_opportunity_cost = data.get("model_opportunity_cost", True)

    # --------------------------------
    # RUN MODELS
    # --------------------------------
    minimum = calculate_loan({
        "salary": salary,
        "loan_balance": loan_balance,
        "threshold": threshold,
        "write_off_years": write_off_years,
        "loan_interest": loan_interest,
        "current_age": current_age,
        "retirement_age": retirement_age,
        "overpay": 0
    })

    overpay_case = calculate_loan({
        "salary": salary,
        "loan_balance": loan_balance,
        "threshold": threshold,
        "write_off_years": write_off_years,
        "loan_interest": loan_interest,
        "current_age": current_age,
        "retirement_age": retirement_age,
        "overpay": overpay
    })

    invest_case = run_forecast({
        "salary": salary,
        "loan_balance": loan_balance,
        "threshold": threshold,
        "write_off_years": write_off_years,
        "loan_interest": loan_interest,
        "current_age": current_age,
        "retirement_age": retirement_age,
        "monthly_savings": monthly_savings,
        "return_rate": return_rate,
        "model_opportunity_cost": model_opportunity_cost
    })

    # --------------------------------
    # EXTRACT VALUES
    # --------------------------------
    minimum_final = get_minimum_value(minimum)
    overpay_final = get_minimum_value(overpay_case)
    invest_final = get_invest_value(invest_case)

    scores = {
        "minimum": minimum_final,
        "overpay": overpay_final,
        "invest": invest_final
    }

    ordered = sorted(
        scores.items(),
        key=lambda x: x[1],
        reverse=True
    )

    ranking = [x[0] for x in ordered]

    winner_key = ranking[0]
    second_key = ranking[1]

    winner_gap = ordered[0][1] - ordered[1][1]
    close_result = abs(winner_gap) < 10000

    # --------------------------------
    # LOAN STATUS
    # --------------------------------
    repayment_type = classify_repayment(
        minimum.get("remaining_balance", 0),
        loan_balance,
        minimum.get("total_repaid", 0)
    )

    # --------------------------------
    # SALARY PAYOFF TRIGGER
    # --------------------------------
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

    explanation = explanation_text(
        repayment_type,
        winner_key
    )

    # --------------------------------
    # CURVES
    # --------------------------------
    years = list(range(current_age, retirement_age + 1))

    minimum_curve = get_curve(minimum, years)
    overpay_curve = get_curve(overpay_case, years)
    invest_curve = get_curve(invest_case, years)

    # --------------------------------
    # OUTPUT
    # --------------------------------
    return {
        "summary": {
            "winner_label": label(winner_key),
            "winner_difference": round(winner_gap, 2),
            "ranking": ranking,
            "minimum_final": round(minimum_final, 2),
            "overpay_final": round(overpay_final, 2),
            "invest_final": round(invest_final, 2)
        },

        "insights": {
            "close_result": close_result,
            "explanation": explanation,
            "salary_trigger_text": trigger_text
        },

        "decision": {
            "repayment_outcome": {
                "type": repayment_type
            }
        },

        "curves": {
            "ages": years,
            "minimum_net_worth": minimum_curve,
            "overpay_net_worth": overpay_curve,
            "invest_net_worth": invest_curve
        }
    }