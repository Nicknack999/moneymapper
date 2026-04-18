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


def label(key):
    labels = {
        "minimum": "Minimum repayments only",
        "overpay": "Overpay monthly",
        "invest": "Invest monthly"
    }

    return labels.get(key, key)


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


def create_trigger_text(
    current_salary,
    trigger_salary
):
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
        f"£{trigger_salary:,} salary upward."
    )


def adjusted_scores(
    minimum_final,
    overpay_final,
    invest_final,
    repayment_type,
    salary,
    loan_balance
):
    scores = {
        "minimum": minimum_final,
        "overpay": overpay_final,
        "invest": invest_final
    }

    if repayment_type == "full_repay":
        scores["overpay"] += loan_balance * 0.10

        if salary >= 70000:
            scores["overpay"] += loan_balance * 0.05

    if repayment_type == "write_off":
        scores["invest"] += loan_balance * 0.05

    if repayment_type == "borderline":
        scores["overpay"] += loan_balance * 0.03

    return scores


def explanation_text(
    repayment_type,
    winner_key
):
    if repayment_type == "full_repay":
        if winner_key == "invest":
            return (
                "Your income suggests the loan may already be repaid "
                "through normal deductions over time, which can make "
                "investing extra monthly money more attractive."
            )

        if winner_key == "overpay":
            return (
                "Because full repayment looks likely, reducing the balance "
                "earlier and limiting interest can become more valuable."
            )

    if repayment_type == "write_off":
        return (
            "This looks more like a case where the loan may not be fully "
            "repaid before write-off, so investing can sometimes come out stronger."
        )

    return (
        "This result looks relatively close. Small changes to future "
        "earnings, returns or timing could change the ranking."
    )


# -------------------------------------------------
# MAIN FUNCTION
# -------------------------------------------------
def run_full_model(data):

    salary = num(data.get("salary"), 40000)
    loan_balance = num(data.get("loan_balance"), 50000)
    current_age = int(num(data.get("current_age"), 30))
    retirement_age = int(num(data.get("retirement_age"), 60))
    monthly_savings = num(data.get("monthly_savings"), 100)
    overpay = num(data.get("overpay"), 100)
    return_rate = num(data.get("return_rate"), 0.05)
    loan_interest = num(data.get("loan_interest"), 0.06)
    threshold = num(data.get("threshold"), 27295)
    write_off_years = int(num(data.get("write_off_years"), 30))

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
        "return_rate": return_rate
    })

    minimum_final = minimum.get("net_position", 0)
    overpay_final = overpay_case.get("net_position", 0)
    invest_final = invest_case.get("net_position", 0)

    repayment_type = classify_repayment(
        minimum.get("remaining_balance", 0),
        loan_balance,
        minimum.get("total_repaid", 0)
    )

    scores = adjusted_scores(
        minimum_final,
        overpay_final,
        invest_final,
        repayment_type,
        salary,
        loan_balance
    )

    ordered = sorted(
        scores.items(),
        key=lambda x: x[1],
        reverse=True
    )

    ranking = [item[0] for item in ordered]

    winner_key = ranking[0]

    winner_gap = ordered[0][1] - ordered[1][1]

    close_result = abs(winner_gap) < 10000

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
            "ages": invest_case.get("ages", []),
            "minimum_net_worth": minimum.get("curve", []),
            "overpay_net_worth": overpay_case.get("curve", []),
            "invest_net_worth": invest_case.get("curve", [])
        }
    }