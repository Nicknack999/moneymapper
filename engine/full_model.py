from student_loan import annual_loan_repayment


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

    if total_repaid < original_balance * 0.70:
        return "write_off"

    return "borderline"


def explanation_text(
    repayment_type,
    winner_key
):
    if repayment_type == "full_repay":
        if winner_key == "overpay":
            return (
                "Because full repayment looks likely, overpaying can "
                "reduce interest and clear the balance sooner."
            )

        if winner_key == "invest":
            return (
                "You may repay the loan anyway through normal deductions, "
                "so investing extra money can sometimes come out strongest."
            )

    if repayment_type == "write_off":
        return (
            "If full repayment looks less likely before write-off, paying "
            "extra into the loan may create less benefit than keeping "
            "that money elsewhere."
        )

    return (
        "This looks close. Small changes to earnings, returns or timing "
        "could change the result."
    )


def create_trigger_text(
    current_salary,
    trigger_salary
):
    if trigger_salary is None:
        return (
            "With your current balance and assumptions, full repayment "
            "looks less likely within the selected period."
        )

    if current_salary >= trigger_salary:
        return (
            "At your current income, full repayment already looks more "
            "likely within the selected timeframe."
        )

    return (
        f"With your current balance and assumptions, full repayment may "
        f"become more likely from around £{trigger_salary:,.0f} salary upward."
    )


# -------------------------------------------------
# YEARLY MODEL
# -------------------------------------------------
def run_strategy(
    strategy,
    salary,
    loan_balance,
    current_age,
    retirement_age,
    monthly_amount,
    salary_growth,
    return_rate,
    loan_interest,
    threshold,
    repayment_rate,
    write_off_years,
):
    years = max(0, retirement_age - current_age)

    debt = float(loan_balance)
    pot = 0.0
    total_paid = 0.0

    ages = []
    curve = []

    for year in range(years + 1):
        age = current_age + year

        # ----------------------------
        # salary growth
        # ----------------------------
        current_salary = salary * (
            (1 + salary_growth) ** year
        )

        # ----------------------------
        # write-off
        # ----------------------------
        if year >= write_off_years:
            debt = 0

        # ----------------------------
        # required repayment
        # ----------------------------
        if debt > 0:
            mandatory = annual_loan_repayment(
                current_salary,
                threshold,
                repayment_rate * 100
            )
        else:
            mandatory = 0

        # ----------------------------
        # strategy cash use
        # ----------------------------
        invest_monthly = 0
        extra_overpay = 0

        if strategy == "minimum":
            pass

        elif strategy == "invest":
            invest_monthly = monthly_amount

        elif strategy == "overpay":
            if debt > 0:
                extra_overpay = monthly_amount * 12
            else:
                invest_monthly = monthly_amount

        # ----------------------------
        # investment growth monthly
        # ----------------------------
        monthly_rate = return_rate / 12

        for _ in range(12):
            pot = pot * (1 + monthly_rate)
            pot += invest_monthly

        # ----------------------------
        # loan update
        # ----------------------------
        if debt > 0:
            interest = debt * loan_interest

            due = mandatory + extra_overpay
            actual = min(due, debt + interest)

            debt = debt + interest - actual
            total_paid += actual

            if debt < 0:
                debt = 0

        # ----------------------------
        # temporary displayed net line
        # ----------------------------
        display_net = pot - debt

        ages.append(age)
        curve.append(round(display_net, 0))

    return {
        "ages": ages,
        "curve": curve,
        "pot": pot,
        "remaining_balance": debt,
        "total_paid": total_paid,
    }


# -------------------------------------------------
# UK REALISTIC SCORING
# -------------------------------------------------
def final_score(
    result,
    repayment_type
):
    pot = result["pot"]
    debt = result["remaining_balance"]
    paid = result["total_paid"]

    # --------------------------------
    # If likely write-off:
    # remaining statement balance is
    # less economically meaningful
    # --------------------------------
    if repayment_type == "write_off":
        return round(pot - paid, 0)

    # --------------------------------
    # Full repay:
    # use real net worth
    # --------------------------------
    if repayment_type == "full_repay":
        return round(pot - debt, 0)

    # --------------------------------
    # Borderline blend
    # --------------------------------
    return round(
        pot - paid - (debt * 0.35),
        0
    )


# -------------------------------------------------
# SALARY TRIGGER
# -------------------------------------------------
def estimate_salary_trigger(
    loan_balance,
    current_age,
    retirement_age,
    monthly_amount,
    salary_growth,
    return_rate,
    loan_interest,
    threshold,
    repayment_rate,
    write_off_years,
):
    for s in range(25000, 150001, 2500):

        r = run_strategy(
            "minimum",
            s,
            loan_balance,
            current_age,
            retirement_age,
            monthly_amount,
            salary_growth,
            return_rate,
            loan_interest,
            threshold,
            repayment_rate,
            write_off_years,
        )

        if r["remaining_balance"] <= 100:
            return s

    return None


# -------------------------------------------------
# MAIN
# -------------------------------------------------
def run_full_model(data):

    salary = num(data.get("salary"), 40000)
    loan_balance = num(data.get("loan_balance"), 50000)

    current_age = int(
        num(data.get("current_age"), 30)
    )

    retirement_age = int(
        num(data.get("retirement_age"), 60)
    )

    monthly_amount = num(
        data.get("monthly_savings"),
        100
    )

    salary_growth = num(
        data.get("salary_growth"),
        0.03
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

    repayment_rate = num(
        data.get("repayment_rate"),
        0.09
    )

    write_off_years = int(
        num(data.get("write_off_years"), 30)
    )

    # --------------------------------
    # Run base first
    # --------------------------------
    minimum = run_strategy(
        "minimum",
        salary,
        loan_balance,
        current_age,
        retirement_age,
        monthly_amount,
        salary_growth,
        return_rate,
        loan_interest,
        threshold,
        repayment_rate,
        write_off_years,
    )

    repayment_type = classify_repayment(
        minimum["remaining_balance"],
        loan_balance,
        minimum["total_paid"]
    )

    overpay = run_strategy(
        "overpay",
        salary,
        loan_balance,
        current_age,
        retirement_age,
        monthly_amount,
        salary_growth,
        return_rate,
        loan_interest,
        threshold,
        repayment_rate,
        write_off_years,
    )

    invest = run_strategy(
        "invest",
        salary,
        loan_balance,
        current_age,
        retirement_age,
        monthly_amount,
        salary_growth,
        return_rate,
        loan_interest,
        threshold,
        repayment_rate,
        write_off_years,
    )

    # --------------------------------
    # Final comparable scores
    # --------------------------------
    minimum_final = final_score(
        minimum,
        repayment_type
    )

    overpay_final = final_score(
        overpay,
        repayment_type
    )

    invest_final = final_score(
        invest,
        repayment_type
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

    ranking = [x[0] for x in ordered]
    winner_key = ranking[0]

    winner_gap = (
        ordered[0][1] -
        ordered[1][1]
    )

    explanation = explanation_text(
        repayment_type,
        winner_key
    )

    trigger_salary = estimate_salary_trigger(
        loan_balance,
        current_age,
        retirement_age,
        monthly_amount,
        salary_growth,
        return_rate,
        loan_interest,
        threshold,
        repayment_rate,
        write_off_years,
    )

    trigger_text = create_trigger_text(
        salary,
        trigger_salary
    )

    return {
        "summary": {
            "winner_label": winner_label(
                winner_key
            ),
            "winner_difference": round(
                winner_gap,
                2
            ),
            "ranking": ranking,

            "minimum_final": minimum_final,
            "overpay_final": overpay_final,
            "invest_final": invest_final,
        },

        "insights": {
            "close_result":
                abs(winner_gap) < 10000,
            "explanation":
                explanation,
            "salary_trigger_text":
                trigger_text,
        },

        "decision": {
            "repayment_outcome": {
                "type":
                    repayment_type
            }
        },

        "curves": {
            "ages": minimum["ages"],
            "minimum_net_worth":
                minimum["curve"],
            "overpay_net_worth":
                overpay["curve"],
            "invest_net_worth":
                invest["curve"],
        }
    }