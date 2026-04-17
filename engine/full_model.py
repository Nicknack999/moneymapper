# engine/full_model.py
#
# Wayli Student Loan Strategy Tool V2
# -----------------------------------
# Compares 3 routes:
# 1. Minimum repayments only
# 2. Overpay monthly
# 3. Invest monthly instead
#
# Returns:
# - Curves for charting
# - Ranking / winner
# - Plain-English explanation
# - Cross-over age insight
#
# Designed to remain compatible with existing frontend API usage.

from student_loan import calculate_loan
from forecast import run_forecast


# --------------------------------------------------
# HELPERS
# --------------------------------------------------
def safe_num(value, default=0):
    try:
        if value is None or value == "":
            return default
        return float(value)
    except Exception:
        return default


def round_money(value):
    return round(safe_num(value), 0)


def get_last(values, default=0):
    if values and len(values) > 0:
        return safe_num(values[-1], default)
    return default


# --------------------------------------------------
# BUILD SCENARIOS
# --------------------------------------------------
def build_minimum_data(data):
    d = data.copy()
    d["overpay"] = 0
    d["monthly_savings"] = 0
    return d


def build_overpay_data(data):
    d = data.copy()
    extra = safe_num(data.get("overpay", 0))
    d["overpay"] = extra
    d["monthly_savings"] = 0
    return d


def build_invest_data(data):
    d = data.copy()
    extra = safe_num(data.get("overpay", 0))
    d["overpay"] = 0
    d["monthly_savings"] = extra
    return d


# --------------------------------------------------
# RUN A SINGLE SCENARIO
# --------------------------------------------------
def run_strategy(data):
    """
    Wrap run_forecast safely.
    Expected existing output:
    {
      "ages": [],
      "net_worth": [],
      "loan_balance": []
    }
    """
    try:
        result = run_forecast(data)
        return {
            "ages": result.get("ages", []),
            "net_worth": result.get("net_worth", []),
            "loan_balance": result.get("loan_balance", []),
        }
    except Exception:
        return {
            "ages": [],
            "net_worth": [],
            "loan_balance": [],
        }


# --------------------------------------------------
# RANKING ENGINE
# --------------------------------------------------
def rank_strategies(minimum_final, overpay_final, invest_final):
    scores = [
        ("minimum", minimum_final),
        ("overpay", overpay_final),
        ("invest", invest_final),
    ]

    scores.sort(key=lambda x: x[1], reverse=True)

    ranking = [name for name, _ in scores]
    winner = ranking[0]

    return winner, ranking, scores


# --------------------------------------------------
# CROSSOVER DETECTION
# --------------------------------------------------
def find_crossover_age(ages, series_a, series_b):
    """
    Returns first age where A overtakes B.
    """
    if not ages:
        return None

    prev_diff = None

    for i in range(len(ages)):
        a = safe_num(series_a[i] if i < len(series_a) else 0)
        b = safe_num(series_b[i] if i < len(series_b) else 0)

        diff = a - b

        if prev_diff is not None:
            if prev_diff <= 0 and diff > 0:
                return ages[i]

        prev_diff = diff

    return None


# --------------------------------------------------
# EXPLANATION ENGINE
# --------------------------------------------------
def build_explanation(
    winner,
    winner_gap,
    loan_result,
    ranking,
):
    repayment_type = (
        loan_result.get("decision", {})
        .get("repayment_outcome", {})
        .get("type", "")
    )

    close_result = abs(winner_gap) < 3000

    if close_result:
        return (
            "The projected outcomes are relatively close under these assumptions, "
            "so flexibility and personal preference may matter as much as the numbers."
        )

    if winner == "invest":
        if repayment_type == "write_off":
            return (
                "Because this loan may not be fully repaid, putting extra money into "
                "long-term investing appears stronger than accelerating repayments "
                "under these assumptions."
            )

        return (
            "Long-term investment growth appears stronger than accelerating loan "
            "repayments in this scenario."
        )

    if winner == "overpay":
        return (
            "Reducing interest costs and clearing the balance faster appears more "
            "valuable than investing the same monthly amount in this scenario."
        )

    return (
        "Keeping minimum repayments performs competitively here, suggesting extra "
        "payments may add limited projected benefit under these assumptions."
    )


# --------------------------------------------------
# LABEL HELPERS
# --------------------------------------------------
def pretty_strategy(name):
    mapping = {
        "minimum": "Minimum repayments only",
        "overpay": "Overpay monthly",
        "invest": "Invest monthly",
    }
    return mapping.get(name, name)


# --------------------------------------------------
# MAIN ENTRY POINT
# --------------------------------------------------
def run_full_model(data):
    """
    Public API entry point.
    """

    # --------------------------------
    # Core decision context
    # --------------------------------
    loan_result = calculate_loan(data)

    # --------------------------------
    # Build scenarios
    # --------------------------------
    minimum_data = build_minimum_data(data)
    overpay_data = build_overpay_data(data)
    invest_data = build_invest_data(data)

    # --------------------------------
    # Run forecasts
    # --------------------------------
    minimum_result = run_strategy(minimum_data)
    overpay_result = run_strategy(overpay_data)
    invest_result = run_strategy(invest_data)

    # --------------------------------
    # Shared ages
    # --------------------------------
    ages = (
        invest_result["ages"]
        or overpay_result["ages"]
        or minimum_result["ages"]
    )

    # --------------------------------
    # Curves
    # --------------------------------
    minimum_curve = minimum_result["net_worth"]
    overpay_curve = overpay_result["net_worth"]
    invest_curve = invest_result["net_worth"]

    # --------------------------------
    # Final values
    # --------------------------------
    minimum_final = get_last(minimum_curve)
    overpay_final = get_last(overpay_curve)
    invest_final = get_last(invest_curve)

    # --------------------------------
    # Ranking
    # --------------------------------
    winner, ranking, scores = rank_strategies(
        minimum_final,
        overpay_final,
        invest_final,
    )

    winner_value = scores[0][1]
    second_value = scores[1][1]
    third_value = scores[2][1]

    winner_gap = winner_value - second_value
    runner_gap = second_value - third_value

    # --------------------------------
    # Cross-over insight
    # Winner vs second place
    # --------------------------------
    series_lookup = {
        "minimum": minimum_curve,
        "overpay": overpay_curve,
        "invest": invest_curve,
    }

    crossover_age = find_crossover_age(
        ages,
        series_lookup[ranking[0]],
        series_lookup[ranking[1]],
    )

    # --------------------------------
    # Explanation
    # --------------------------------
    explanation = build_explanation(
        winner,
        winner_gap,
        loan_result,
        ranking,
    )

    # --------------------------------
    # Legacy compatibility
    # (old frontend expected invest vs overpay)
    # --------------------------------
    wealth_difference = round_money(
        overpay_final - invest_final
    )

    # --------------------------------
    # Output
    # --------------------------------
    return {
        "decision": loan_result.get("decision", {}),

        "summary": {
            "winner": winner,
            "winner_label": pretty_strategy(winner),

            "ranking": ranking,
            "ranking_labels": [
                pretty_strategy(x) for x in ranking
            ],

            "winner_difference": round_money(winner_gap),
            "runner_up_difference": round_money(runner_gap),

            "minimum_final": round_money(minimum_final),
            "overpay_final": round_money(overpay_final),
            "invest_final": round_money(invest_final),
        },

        "insights": {
            "crossover_age": crossover_age,
            "wealth_difference": wealth_difference,
            "explanation": explanation,
            "close_result": abs(winner_gap) < 3000,
        },

        "curves": {
            "ages": ages,

            "minimum_net_worth": minimum_curve,
            "overpay_net_worth": overpay_curve,
            "invest_net_worth": invest_curve,

            # Backward compatibility
            "loan_balance": overpay_result["loan_balance"],
            "loan_balance_baseline": minimum_result["loan_balance"],
        },
    }