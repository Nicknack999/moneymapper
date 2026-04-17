# engine/full_model.py

from student_loan import calculate_loan, generate_salary_curve
from forecast import run_forecast
from break_even import find_break_even_overpay


# --------------------------------------------------
# 🔁 CORE MODEL (NO FLIP LOGIC HERE)
# --------------------------------------------------
def run_full_model_core(data):
    """
    Core model logic (used by flip detection to avoid recursion)
    """

    # -------------------------
    # 1. DECISION ENGINE
    # -------------------------
    loan_result = calculate_loan(data)

    # -------------------------
    # 2. FORECAST: WITH OVERPAY
    # -------------------------
    forecast = run_forecast(data)

    # -------------------------
    # 3. FORECAST: BASELINE
    # -------------------------
    baseline_data = data.copy()
    baseline_data["overpay"] = 0

    baseline_forecast = run_forecast(baseline_data)

    # -------------------------
    # 4. EXTRACT CORE DATA
    # -------------------------
    ages = forecast.get("ages", [])

    overpay_net_worth = forecast.get("net_worth", [])
    invest_net_worth = baseline_forecast.get("net_worth", [])

    loan_balance = forecast.get("loan_balance", [])
    loan_balance_baseline = baseline_forecast.get("loan_balance", [])

    current_salary = data.get("salary", 0)
    loan_balance_input = data.get("loan_balance", 0)
    overpay = data.get("overpay", 100)

    # -------------------------
    # 5. WEALTH COMPARISON
    # -------------------------
    if overpay_net_worth and invest_net_worth:
        final_overpay = overpay_net_worth[-1]
        final_invest = invest_net_worth[-1]
        wealth_difference = final_overpay - final_invest
    else:
        wealth_difference = 0

    # -------------------------
    # 6. DERIVED INSIGHTS
    # -------------------------
    positive_age = None
    for i in range(len(overpay_net_worth)):
        if overpay_net_worth[i] > 0:
            positive_age = ages[i]
            break

    loan_cleared_age = None
    for i in range(len(loan_balance)):
        if loan_balance[i] <= 0:
            loan_cleared_age = ages[i]
            break

    write_off_age = data.get("current_age", 30) + data.get("write_off_years", 30)

    break_even_salary = loan_result.get("break_even_salary")
    break_even_salary_display = (
        round(break_even_salary, 0) if break_even_salary is not None else None
    )

    # -------------------------
    # 7. WHAT TO CHANGE
    # -------------------------
    salary_gap = (
        break_even_salary - current_salary
        if break_even_salary is not None
        else None
    )

    what_to_change = {
        "target_salary": break_even_salary_display,
        "salary_gap": round(salary_gap, 0) if salary_gap else None,
    }

    # -------------------------
    # 8. SALARY CURVE
    # -------------------------
    salary_curve = generate_salary_curve(
        loan_balance_input,
        data.get("loan_interest", 0.06) * 100,
        data.get("threshold", 27295),
        data.get("repayment_rate", 9),
        data.get("write_off_years", 30),
        overpay * 12,
    )

    # -------------------------
    # 9. BREAK-EVEN OVERPAY
    # -------------------------
    try:
        break_even_overpay = find_break_even_overpay(data)
    except Exception:
        break_even_overpay = None

    # -------------------------
    # 10. WRITE-OFF DETECTION
    # -------------------------
    loan_written_off = loan_cleared_age is None

    # -------------------------
    # 11. TIPPING POINT DETECTION
    # -------------------------
    is_close_to_tipping = abs(wealth_difference) < 5000

    # -------------------------
    # 12. EXPLANATION ENGINE
    # -------------------------
    if loan_written_off:
        explanation = (
            "This loan is unlikely to be fully repaid. "
            "Any remaining balance is written off, so extra payments do not improve your final outcome."
        )
    elif wealth_difference < 0:
        explanation = (
            "Overpaying reduces your long-term wealth because investment returns outweigh the interest saved."
        )
    elif wealth_difference > 0:
        explanation = (
            "Overpaying improves your outcome by reducing interest faster than your investments would grow."
        )
    else:
        explanation = (
            "There is no meaningful financial difference between overpaying and investing in your situation. "
            "Small changes in assumptions could change the result."
        )

    # -------------------------
    # 13. DECISION
    # -------------------------
    decision = loan_result.get("decision", {})

    if wealth_difference > 0:
        decision["recommended_strategy"] = "overpay"
    elif wealth_difference < 0:
        decision["recommended_strategy"] = "invest"
    else:
        decision["recommended_strategy"] = "neutral"

    if "repayment_outcome" not in decision:
        decision["repayment_outcome"] = {
            "type": "unknown",
            "explanation": "Decision insight unavailable.",
        }

    return {
        "decision": decision,
        "forecast": forecast,
        "insights": {
            "net_worth_positive_age": positive_age,
            "loan_cleared_age": loan_cleared_age,
            "loan_write_off_age": write_off_age,
            "loan_written_off": loan_written_off,
            "break_even_salary": break_even_salary_display,
            "break_even_overpay": break_even_overpay,
            "wealth_difference": round(wealth_difference, 0),
            "what_to_change": what_to_change,
            "explanation": explanation,
            "is_close_to_tipping": is_close_to_tipping,
        },
        "curves": {
            "ages": ages,
            "invest_net_worth": invest_net_worth,
            "overpay_net_worth": overpay_net_worth,
            "loan_balance": loan_balance,
            "loan_balance_baseline": loan_balance_baseline,
            "salary_curve": salary_curve,
        },
    }


# --------------------------------------------------
# 🔍 FLIP DETECTION
# --------------------------------------------------
def find_flip_rate(base_data, low=0.0, high=0.10, tolerance=0.0005):
    """
    Find return rate where wealth_difference = 0
    """

    def get_diff(rate):
        test_data = base_data.copy()
        test_data["return_rate"] = rate
        result = run_full_model_core(test_data)
        return result["insights"]["wealth_difference"]

    try:
        low_diff = get_diff(low)
        high_diff = get_diff(high)

        if low_diff * high_diff > 0:
            return None

        while (high - low) > tolerance:
            mid = (low + high) / 2
            mid_diff = get_diff(mid)

            if abs(mid_diff) < 100:  # tolerance in £
                return round(mid * 100, 2)

            if mid_diff * low_diff < 0:
                high = mid
            else:
                low = mid

        return round(((low + high) / 2) * 100, 2)

    except Exception:
        return None


# --------------------------------------------------
# 🚀 FINAL ENTRY POINT (USED BY API)
# --------------------------------------------------
def run_full_model(data):
    result = run_full_model_core(data)

    flip_rate = find_flip_rate(data)

    result["flip_return_rate"] = flip_rate

    return result