from flask import Blueprint, request, jsonify
from student_loan import calculate_loan
from forecast import run_forecast

full_model_bp = Blueprint("full_model", __name__)


# -------------------------------------------------
# HELPERS
# -------------------------------------------------
def safe_num(v, default=0):
    try:
        return float(v)
    except:
        return default


def classify_repayment(
    total_repaid,
    original_balance,
    remaining_balance
):
    """
    Decide if user likely fully repays,
    writes off, or sits near border.
    """
    repay_ratio = (
        total_repaid /
        max(original_balance, 1)
    )

    if remaining_balance <= 100:
        return "full_repay"

    if repay_ratio < 0.65:
        return "write_off"

    return "borderline"


def estimate_salary_trigger(
    payload
):
    """
    Finds rough salary where full
    repayment becomes more likely.
    """
    start = 25000
    end = 150000
    step = 2500

    for salary in range(
        start,
        end + step,
        step
    ):
        result = calculate_loan(
            salary=salary,
            loan_balance=payload[
                "loan_balance"
            ],
            threshold=payload[
                "threshold"
            ],
            write_off_years=payload[
                "write_off_years"
            ],
            loan_interest=payload[
                "loan_interest"
            ],
            current_age=payload[
                "current_age"
            ],
            retirement_age=payload[
                "retirement_age"
            ],
            overpay=0
        )

        if (
            result.get(
                "remaining_balance",
                0
            )
            <= 100
        ):
            return salary

    return None


def rank_results(
    minimum_final,
    overpay_final,
    invest_final,
    repayment_type,
    salary,
    balance
):
    """
    More balanced ranking logic.
    """

    adjusted = {
        "minimum": minimum_final,
        "overpay": overpay_final,
        "invest": invest_final
    }

    # -----------------------------
    # If full repay likely:
    # reward overpay more
    # -----------------------------
    if repayment_type == "full_repay":
        adjusted["overpay"] += (
            balance * 0.08
        )

        if salary >= 70000:
            adjusted["overpay"] += (
                balance * 0.05
            )

    # -----------------------------
    # If write off likely:
    # invest more attractive
    # -----------------------------
    if repayment_type == "write_off":
        adjusted["invest"] += (
            balance * 0.05
        )

    # -----------------------------
    # Borderline:
    # keep close
    # -----------------------------
    if repayment_type == "borderline":
        adjusted["overpay"] += (
            balance * 0.02
        )

    ordered = sorted(
        adjusted.items(),
        key=lambda x: x[1],
        reverse=True
    )

    ranking = [
        item[0]
        for item in ordered
    ]

    winner = ranking[0]
    gap = (
        ordered[0][1]
        - ordered[1][1]
    )

    return ranking, winner, gap


def winner_label(key):
    labels = {
        "minimum":
            "Minimum repayments only",
        "overpay":
            "Overpay monthly",
        "invest":
            "Invest monthly"
    }
    return labels.get(
        key,
        key
    )


# -------------------------------------------------
# ROUTE
# -------------------------------------------------
@full_model_bp.route(
    "/full-model",
    methods=["POST"]
)
def full_model():
    data = request.json or {}

    salary = safe_num(
        data.get("salary"),
        40000
    )

    loan_balance = safe_num(
        data.get("loan_balance"),
        50000
    )

    current_age = int(
        safe_num(
            data.get(
                "current_age"
            ),
            30
        )
    )

    retirement_age = int(
        safe_num(
            data.get(
                "retirement_age"
            ),
            60
        )
    )

    monthly_savings = safe_num(
        data.get(
            "monthly_savings"
        ),
        100
    )

    overpay = safe_num(
        data.get("overpay"),
        100
    )

    return_rate = safe_num(
        data.get(
            "return_rate"
        ),
        0.05
    )

    loan_interest = safe_num(
        data.get(
            "loan_interest"
        ),
        0.06
    )

    threshold = safe_num(
        data.get(
            "threshold"
        ),
        27295
    )

    write_off_years = int(
        safe_num(
            data.get(
                "write_off_years"
            ),
            30
        )
    )

    # --------------------------------
    # RUN LOAN MODELS
    # --------------------------------
    minimum = calculate_loan(
        salary=salary,
        loan_balance=loan_balance,
        threshold=threshold,
        write_off_years=write_off_years,
        loan_interest=loan_interest,
        current_age=current_age,
        retirement_age=retirement_age,
        overpay=0
    )

    overpay_case = calculate_loan(
        salary=salary,
        loan_balance=loan_balance,
        threshold=threshold,
        write_off_years=write_off_years,
        loan_interest=loan_interest,
        current_age=current_age,
        retirement_age=retirement_age,
        overpay=overpay
    )

    invest_case = run_forecast(
        salary=salary,
        loan_balance=loan_balance,
        threshold=threshold,
        write_off_years=write_off_years,
        loan_interest=loan_interest,
        current_age=current_age,
        retirement_age=retirement_age,
        monthly_savings=monthly_savings,
        return_rate=return_rate
    )

    # --------------------------------
    # CLASSIFY REPAYMENT TYPE
    # --------------------------------
    repayment_type = classify_repayment(
        minimum.get(
            "total_repaid",
            0
        ),
        loan_balance,
        minimum.get(
            "remaining_balance",
            0
        )
    )

    # --------------------------------
    # FINAL VALUES
    # --------------------------------
    minimum_final = minimum.get(
        "net_position",
        0
    )

    overpay_final = overpay_case.get(
        "net_position",
        0
    )

    invest_final = invest_case.get(
        "net_position",
        0
    )

    ranking, winner, winner_gap = rank_results(
        minimum_final,
        overpay_final,
        invest_final,
        repayment_type,
        salary,
        loan_balance
    )

    # --------------------------------
    # CLOSE RESULT
    # --------------------------------
    close_result = (
        abs(winner_gap) < 10000
    )

    # --------------------------------
    # SALARY TRIGGER
    # --------------------------------
    trigger_salary = estimate_salary_trigger(
        {
            "loan_balance":
                loan_balance,
            "threshold":
                threshold,
            "write_off_years":
                write_off_years,
            "loan_interest":
                loan_interest,
            "current_age":
                current_age,
            "retirement_age":
                retirement_age
        }
    )

    if trigger_salary:
        trigger_text = (
            f"With your current balance and assumptions, "
            f"full repayment may become more likely from around "
            f"£{int(trigger_salary):,} salary upward."
        )
    else:
        trigger_text = (
            "With your current balance and assumptions, "
            "full repayment looks less likely within the period selected."
        )

    # --------------------------------
    # EXPLANATION
    # --------------------------------
    if repayment_type == "write_off":
        explanation = (
            "This looks more like a case where the loan may not be fully repaid "
            "before write-off, so investing can sometimes come out stronger."
        )

    elif repayment_type == "full_repay":
        explanation = (
            "This looks more like a case where the loan may be fully repaid, "
            "so overpaying becomes more competitive."
        )

    else:
        explanation = (
            "This looks relatively close. Small changes to earnings, rates or timing "
            "could change the result."
        )

    # --------------------------------
    # RESPONSE
    # --------------------------------
    return jsonify({
        "summary": {
            "winner_label":
                winner_label(
                    winner
                ),
            "winner_difference":
                round(
                    winner_gap,
                    2
                ),
            "ranking":
                ranking,
            "minimum_final":
                round(
                    minimum_final,
                    2
                ),
            "overpay_final":
                round(
                    overpay_final,
                    2
                ),
            "invest_final":
                round(
                    invest_final,
                    2
                )
        },

        "insights": {
            "close_result":
                close_result,
            "explanation":
                explanation,
            "salary_trigger_text":
                trigger_text
        },

        "decision": {
            "repayment_outcome": {
                "type":
                    repayment_type
            }
        },

        "curves": {
            "ages":
                invest_case.get(
                    "ages",
                    []
                ),
            "minimum_net_worth":
                minimum.get(
                    "curve",
                    []
                ),
            "overpay_net_worth":
                overpay_case.get(
                    "curve",
                    []
                ),
            "invest_net_worth":
                invest_case.get(
                    "curve",
                    []
                )
        }
    })