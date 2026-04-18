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


def classify_repayment(remaining_balance, original_balance, total_repaid):
    if remaining_balance <= 100:
        return "full_repay"

    repay_ratio = total_repaid / max(original_balance, 1)

    if repay_ratio < 0.70:
        return "write_off"

    return "borderline"


def explanation_text(repayment_type, winner_key):
    if repayment_type == "full_repay":
        if winner_key == "invest":
            return (
                "Your income suggests the loan may already be repaid through "
                "normal payroll deductions over time. That can make investing "
                "extra monthly money more attractive than overpaying."
            )

        if winner_key == "overpay":
            return (
                "Because full repayment looks likely, clearing the balance "
                "sooner and reducing interest can make overpaying attractive."
            )

    if repayment_type == "write_off":
        return (
            "This looks more like a case where the loan may not be fully "
            "repaid before write-off, so investing extra money can sometimes "
            "come out stronger."
        )

    return (
        "This looks relatively close. Small changes to future earnings, "
        "returns or timing could change the ranking."
    )


def create_trigger_text(current_salary, trigger_salary):
    if trigger_salary is None:
        return (
            "With your current balance and assumptions, full repayment looks "
            "less likely within the selected period."
        )

    if current_salary >= trigger_salary:
        return (
            "At your current income, full repayment already looks more likely "
            "within the selected timeframe."
        )

    return (
        f"With your current balance and assumptions, full repayment may become "
        f"more likely from around £{trigger_salary:,.0f} salary upward."
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

        remaining = result.get("remaining_balance", loan_balance)

        if remaining <= 100:
            return salary

    return None


def build_curve_from_yearly_data(yearly_data, starting_balance):
    """
    Convert calculate_loan yearly_data into graph line.
    Negative values represent debt remaining.
    """
    curve = []
    balance = starting_balance

    for row in yearly_data:
        balance = row.get("balance", balance)
        curve.append(round(-balance, 0))

    return curve


def extract_result(model, fallback_balance):
    """
    Normalise calculate_loan output into consistent fields.
    """
    yearly_data = model.get("invest", {}).get("yearly_data", [])

    curve = model.get("curve")

    if not curve:
        curve = build_curve_from_yearly_data(
            yearly_data,
            fallback_balance
        )

    remaining_balance = model.get(
        "remaining_balance",
        yearly_data[-1]["balance"] if yearly_data else fallback_balance
    )

    total_repaid = model.get(
        "total_repaid",
        0
    )

    net_position = model.get(
        "net_position",
        model.get("insights", {}).get("wealth_difference", 0)
    )

    return {
        "curve": curve,
        "remaining_balance": remaining_balance,
        "total_repaid": total_repaid,
        "net_position": net_position,
    }


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
    overpay = num(data.get("overpay"), 100)
    return_rate = num(data.get("return_rate"), 0.05)
    loan_interest = num(data.get("loan_interest"), 0.06)
    threshold = num(data.get("threshold"), 27295)
    write_off_years = int(num(data.get("write_off_years"), 30))
    model_opportunity_cost = data.get("model_opportunity_cost", True)

    # --------------------------------
    # RUN SCENARIOS
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

    minimum = extract_result(minimum_raw, loan_balance)
    overpay_case = extract_result(overpay_raw, loan_balance)

    # --------------------------------
    # VALUES
    # --------------------------------
    minimum_final = minimum["net_position"]
    overpay_final = overpay_case["net_position"]
    invest_final = invest_case.get("net_position", 0)

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

    winner_gap = ordered[0][1] - ordered[1][1]
    close_result = abs(winner_gap) < 10000

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
    # CURVES ALIGNMENT
    # --------------------------------
    ages = invest_case.get("ages", [])

    def pad_curve(curve):
        if len(curve) < len(ages):
            curve = curve + [curve[-1] if curve else 0] * (len(ages) - len(curve))
        return curve[:len(ages)]

    minimum_curve = pad_curve(minimum["curve"])
    overpay_curve = pad_curve(overpay_case["curve"])
    invest_curve = pad_curve(invest_case.get("curve", []))

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
            "invest_final": round(invest_final, 2),
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