# ----------------------------------
# LEVEL 1: Yearly mechanics
# ----------------------------------

def annual_loan_repayment(
    salary,
    threshold,
    rate_percent
):
    if salary <= threshold:
        return 0

    return (
        salary - threshold
    ) * (
        rate_percent / 100
    )


def apply_loan_year(
    balance,
    interest_rate_percent,
    repayment
):
    interest = (
        balance *
        (interest_rate_percent / 100)
    )

    new_balance = (
        balance +
        interest -
        repayment
    )

    if new_balance < 0:
        repayment += new_balance
        new_balance = 0

    return (
        new_balance,
        repayment,
        interest
    )


# ----------------------------------
# LEVEL 2: Full simulation
# ----------------------------------

def simulate_loan(
    balance,
    salary,
    interest,
    threshold,
    rate,
    years,
    overpay=0,
    return_schedule=False,
    growth_rate=0
):
    total_repaid = 0
    schedule = []
    cleared_year = None

    for year in range(
        1,
        years + 1
    ):
        if balance <= 0:
            cleared_year = year - 1
            break

        repayment = annual_loan_repayment(
            salary,
            threshold,
            rate
        )

        repayment += overpay

        (
            balance,
            actual_repayment,
            interest_paid
        ) = apply_loan_year(
            balance,
            interest,
            repayment
        )

        total_repaid += actual_repayment

        if balance <= 0 and cleared_year is None:
            cleared_year = year

        if return_schedule:
            schedule.append({
                "year": year,
                "balance": round(
                    balance, 0
                ),
                "repayment": round(
                    actual_repayment, 0
                ),
                "interest": round(
                    interest_paid, 0
                )
            })

        salary = salary * (1 + growth_rate)

    cleared = balance <= 0

    result = {
        "total_repaid": total_repaid,
        "cleared": cleared,
        "years_taken": cleared_year
    }

    if return_schedule:
        result["schedule"] = schedule

    return result

# ----------------------------------
# LEVEL 3: Extra helpers
# ----------------------------------

def future_value(
    monthly_amount,
    years,
    return_rate=0.05
):
    months = years * 12
    monthly_rate = (
        return_rate / 12
    )

    value = 0

    for _ in range(months):
        value = (
            value *
            (1 + monthly_rate)
        ) + monthly_amount

    return value


def classify_outcome(
    loan_balance,
    conservative_result,
    typical_result,
    strong_result,
    years_remaining
):

    conservative_clear = conservative_result[
        "cleared"
    ]

    typical_clear = typical_result[
        "cleared"
    ]

    strong_clear = strong_result[
        "cleared"
    ]

    # ----------------------------------
    # Clears even with flat salary
    # ----------------------------------
    if conservative_clear:
        return (
            "full_repay",
            "You already look on track to clear it"
        )

    # ----------------------------------
    # Clears with normal growth
    # ----------------------------------
    if typical_clear:
        return (
            "borderline",
            "You look in a strong position if earnings keep rising"
        )

    # ----------------------------------
    # Clears only with strong growth
    # ----------------------------------
    if strong_clear:
        return (
            "borderline",
            "This could improve a lot if your income grows over time"
        )

    # ----------------------------------
    # None clear, but still time left
    # ----------------------------------
    if years_remaining >= 20:
        return (
            "write_off",
            "Right now, full repayment looks a stretch"
        )

    # ----------------------------------
    # Mid stage
    # ----------------------------------
    if years_remaining >= 10:
        return (
            "write_off",
            "From here, clearing it looks less likely"
        )

    # ----------------------------------
    # Later stage
    # ----------------------------------
    return (
        "write_off",
        "At this stage, full repayment looks unlikely"
    )

# ----------------------------------
# LEVEL 5: API WRAPPER
# ----------------------------------
def find_salary_needed(
    loan_balance,
    current_salary,
    interest,
    threshold,
    rate,
    years,
    plan
):
    start_salary = max(
        int(current_salary),
        int(threshold)
    )

    max_salary = 200000

    for salary in range(
        start_salary,
        max_salary + 1000,
        1000
    ):
        result = simulate_loan(
            loan_balance,
            salary,
            interest,
            threshold,
            rate,
            years
        )

        if result["cleared"]:
            return salary

    return None

def calculate_loan(data):

    salary = data.get(
        "salary",
        30000
    )

    loan_balance = data.get(
        "loan_balance",
        50000
    )

    current_age = data.get(
    "current_age",
    30

    )
    
    monthly_overpay = data.get(
        "overpay",
        100
    )

    interest = data.get(
        "loan_interest",
        0.06
    ) * 100

    threshold = data.get(
        "threshold",
        27295
    )

    rate = data.get(
        "repayment_rate",
        9
    )

    years = data.get(
        "write_off_years",
        30
    )

    # -----------------------------
    # Estimate years remaining
    # -----------------------------
    plan = data.get("plan", "plan2")

    if plan == "pg":
        assumed_start_age = 25
    else:
        assumed_start_age = 22

    years_elapsed = max(
        0,
        current_age - assumed_start_age
    )

    years_remaining = max(
        0,
        years - years_elapsed
    )

    return_rate = data.get(
        "return_rate",
        0.05
    )

    annual_overpay = (
        monthly_overpay * 12
    )
    
    # -----------------------------
    # Base scenario
    # -----------------------------
    base_result = simulate_loan(
        loan_balance,
        salary,
        interest,
        threshold,
        rate,
        years_remaining,
        return_schedule=True
    )

    total_repaid = base_result[
        "total_repaid"
    ]

    schedule = base_result[
        "schedule"
    ]

    base_cleared = base_result[
        "cleared"
    ]

    base_years_taken = base_result[
        "years_taken"
    ]

    # -----------------------------
    # Overpay scenario
    # -----------------------------
    overpay_result = simulate_loan(
        loan_balance,
        salary,
        interest,
        threshold,
        rate,
        years_remaining,
        overpay=annual_overpay
    )

    total_repaid_overpay = overpay_result[
        "total_repaid"
    ]

    overpay_cleared = overpay_result[
        "cleared"
    ]

    overpay_years_taken = overpay_result[
        "years_taken"
    ]

    # -----------------------------
    # Salary growth scenarios
    # -----------------------------
    growth_conservative = simulate_loan(
        loan_balance,
        salary,
        interest,
        threshold,
        rate,
        years_remaining,
        growth_rate=0.00
    )

    growth_typical = simulate_loan(
        loan_balance,
        salary,
        interest,
        threshold,
        rate,
        years_remaining,
        growth_rate=0.02
    )

    growth_strong = simulate_loan(
        loan_balance,
        salary,
        interest,
        threshold,
        rate,
        years_remaining,
        growth_rate=0.04
    )

    # -----------------------------
    # Investment scenario
    # -----------------------------
    invest_value = future_value(
        monthly_overpay,
        years_remaining,
        return_rate
    )

    # -----------------------------
    # Remaining balances
    # -----------------------------
    remaining_balance = max(
        0,
        loan_balance -
        total_repaid
    )

    remaining_balance_overpay = max(
        0,
        loan_balance -
        total_repaid_overpay
    )

    # -----------------------------
    # Wealth comparison
    # -----------------------------
    invest_net_worth = (
        invest_value -
        remaining_balance
    )

    overpay_net_worth = (
        -remaining_balance_overpay
    )

    wealth_difference = (
        invest_net_worth -
        overpay_net_worth
    )


    
    # -----------------------------
    # Outcome classification
    # -----------------------------
    salary_needed = find_salary_needed(
        loan_balance,
        salary,
        interest,
        threshold,
        rate,
        years_remaining,
        data.get("plan", "plan2")
    )
    
    (
        outcome_type,
        headline
    ) = classify_outcome(
        loan_balance,
        growth_conservative,
        growth_typical,
        growth_strong,
        years_remaining
    )

    if outcome_type == "full_repay":
        explanation = (
            "At your current income, full repayment looks more likely under these assumptions."
        )

    elif outcome_type == "borderline":
        explanation = (
            "You appear near the line where future pay rises, interest rates or overpayments could change the outcome."
        )

    else:
        explanation = (
            "At current earnings, full repayment looks less likely under these assumptions."
        )

    repayment_outcome = {
        "type": outcome_type,
        "headline": headline,
        "explanation": explanation
    }

    print("------ DEBUG ------")
    print("plan:", plan)
    print("salary:", salary)
    print("loan_balance:", loan_balance)
    print("monthly_overpay:", monthly_overpay)
    print("interest:", interest)
    print("threshold:", threshold)
    print("rate:", rate)
    print("years:", years)
    print("current_age:", current_age)
    print("years_remaining:", years_remaining)
    print("salary_needed:", salary_needed)

    print(
        "growth_conservative:",
        round(
            growth_conservative["total_repaid"],
            0
        )
    )

    print(
        "growth_typical:",
        round(
            growth_typical["total_repaid"],
            0
        )
    )

    print(
        "growth_strong:",
        round(
            growth_strong["total_repaid"],
            0
        )
    )

    print(
        "conservative_cleared:",
        growth_conservative["cleared"]
    )

    print(
        "typical_cleared:",
        growth_typical["cleared"]
    )

    print(
        "strong_cleared:",
        growth_strong["cleared"]
    )

    print("outcome_type:", outcome_type)
    print("headline:", headline)
    print("-------------------")

    # -----------------------------
    # Decision object
    # -----------------------------
    decision = {
        "repayment_outcome":
            repayment_outcome,
        "strategy":
            "invest"
            if wealth_difference > 0
            else "overpay"
    }

    # -----------------------------
    # Insights
    # -----------------------------
    payroll_repayment = max(
        0,
        (salary - threshold) * 0.09
    )

    insights = {
        "wealth_difference":
            round(
                wealth_difference, 0
            ),
        "annual_auto_repayment":
            round(
                payroll_repayment, 0
            ),
        "annual_overpay":
            round(
                annual_overpay, 0
            )
    }

    # -----------------------------
    # Final response
    # -----------------------------
    return {
        "decision": decision,
        "insights": insights,
        "salary_needed": salary_needed,

        "growth_scenarios": {
            "conservative": {
                "total_repaid": round(
                    growth_conservative[
                        "total_repaid"
                    ],
                    0
                ),
                "cleared":
                    growth_conservative[
                        "cleared"
                    ],
                "years_taken":
                    growth_conservative[
                        "years_taken"
                    ]
            },

            "typical": {
                "total_repaid": round(
                    growth_typical[
                        "total_repaid"
                    ],
                    0
                ),
                "cleared":
                    growth_typical[
                        "cleared"
                    ],
                "years_taken":
                    growth_typical[
                        "years_taken"
                    ]
            },

            "strong": {
                "total_repaid": round(
                    growth_strong[
                        "total_repaid"
                    ],
                    0
                ),
                "cleared":
                    growth_strong[
                        "cleared"
                    ],
                "years_taken":
                    growth_strong[
                        "years_taken"
                    ]
            }
        },

        "total_repaid":
            round(
                total_repaid, 0
            ),

        "total_repaid_overpay":
            round(
                total_repaid_overpay,
                0
            ),

        "invest_future_value":
            round(
                invest_value, 0
            ),

        "invest": {
            "yearly_data":
                schedule
        }
    }