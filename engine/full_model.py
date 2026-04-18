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
    # Loan cleared
    if remaining_balance <= 100:
        return "full_repay"

    repay_ratio = total_repaid / max(original_balance, 1)

    # Likely write-off case
    if repay_ratio < 0.70:
        return "write_off"

    # In-between case
    return "borderline"


def label(key):
    labels = {
        "minimum": "Minimum repayments only",
        "overpay": "Overpay monthly",
        "invest": "Invest monthly"
    }

    return labels.get(key, key)


# -------------------------------------------------
# ESTIMATE SALARY WHERE FULL REPAYMENT BECOMES LIKELY
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


def create_trigger_text(
    current_salary,
    trigger_salary
):
    if trigger_salary is None:
        return (
            "With your current balance and assumptions, "
            "full repayment looks less likely within the selected timeframe."
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
# SMARTER SCORING
# -------------------------------------------------
def adjusted_scores(
    minimum_final,
    overpay_final,
    invest_final,
    repayment_type,
    salary,
    loan_balance,
    overpay,
    monthly_savings
):
    scores = {
        "minimum": minimum_final,
        "overpay": overpay_final,
        "invest": invest_final
    }

    # If loan likely repaid anyway:
    # overpay gains some value, but investing still strong
    if repayment_type == "full_repay":
        scores["overpay"] += loan_balance * 0.08

        if salary >= 80000:
            scores["overpay"] += loan_balance * 0.06

    # If likely write-off:
    # investing usually stronger
    elif repayment_type == "write_off":
        scores["invest"] += loan_balance * 0.10
        scores["overpay"] -= loan_balance * 0.05

    # Borderline case
    else:
        scores["overpay"] += loan_balance * 0.03
        scores["invest"] += loan_balance * 0.03

    # Bigger overpayments deserve credit
    if overpay >= 250:
        scores["overpay"] += overpay * 40

    # Bigger monthly investing deserves credit
    if monthly_savings >= 250:
        scores["invest"] += monthly_savings * 40

    return scores


# -------------------------------------------------
# EXPLANATION TEXT
# -------------------------------------------------
def explanation_text(
    repayment_type,
    winner_key
):
    if winner_key == "overpay":
        return (
            "Clearing the balance sooner may reduce interest costs "
            "and could free up future cashflow earlier."
        )

    if winner_key == "invest":
        return (
            "The same monthly amount has more time to compound, "
            "which can make investing stronger in this scenario."
        )

    if repayment_type == "write_off":
        return (
            "Because full repayment looks less likely before write-off, "
            "keeping flexibility can matter."
        )

    return (
        "This result looks relatively close. Small changes to future "
        "earnings, returns or timing could change the ranking."
    )


# -------------------------------------------------
# MAIN FUNCTION
# -------------------------------------------------
def run_full_model(data):

    # Inputs
    salary = num(data.get("salary"), 40000)
    loan_balance = num(data.get("loan_balance"), 50000)
    current_age = int(num(data.get("current_age"), 30))
    retirement_age = int(num(data.get("retirement_age"), 60))

    monthly_savings = num(
        data.get("monthly_savings",
        data.get("monthly_amount", 100)),
        100
    )

    overpay = num(
        data.get("overpay",
        data.get("monthly_amount", 100)),
        100
    )

    return_rate = num(data.get("return_rate"), 0.05)
    loan_interest = num(data.get("loan_interest"), 0.06)
    threshold = num(data.get("threshold"), 27295)
    write_off_years = int(num(data.get("write_off_years"), 30))

    # -------------------------------------------------
    # RUN MODELS
    # -------------------------------------------------
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

    # -------------------------------------------------
    # RESULTS
    # -------------------------------------------------
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
        loan_balance,
        overpay,
        monthly_savings
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

    # Salary payoff trigger
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

    # -------------------------------------------------
    # RETURN JSON
    # -------------------------------------------------
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