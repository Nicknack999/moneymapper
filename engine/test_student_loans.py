from student_loan import calculate_loan

PLAN_RULES = {
    "plan1": {
        "threshold": 26065,
        "years": 25,
        "interest": 0.06,
        "rate": 9
    },
    "plan2": {
        "threshold": 27295,
        "years": 30,
        "interest": 0.06,
        "rate": 9
    },
    "plan4": {
        "threshold": 33795,
        "years": 30,
        "interest": 0.032,
        "rate": 9
    },
    "plan5": {
        "threshold": 25000,
        "years": 40,
        "interest": 0.06,
        "rate": 9
    },
    "pg": {
        "threshold": 21000,
        "years": 30,
        "interest": 0.06,
        "rate": 6
    }
}

tests = [
    ("plan5", 30000, 60000, 30),
    ("plan5", 45000, 60000, 30),
    ("plan5", 70000, 60000, 30),

    ("plan4", 29000, 50000, 22),
    ("plan4", 40000, 50000, 22),
    ("plan4", 60000, 50000, 22),

    ("plan2", 30000, 50000, 30),
    ("plan2", 40000, 50000, 30),
    ("plan2", 60000, 50000, 30),
    ("plan2", 80000, 50000, 30),

    ("pg", 35000, 15000, 28),
    ("pg", 50000, 15000, 28),
]

for plan, salary, balance, age in tests:

    rules = PLAN_RULES[plan]

    data = {
        "plan": plan,
        "salary": salary,
        "loan_balance": balance,
        "current_age": age,
        "overpay": 100,
        "threshold": rules["threshold"],
        "write_off_years": rules["years"],
        "loan_interest": rules["interest"],
        "repayment_rate": rules["rate"]
    }

    result = calculate_loan(data)

    headline = result["decision"]["repayment_outcome"]["headline"]
    gs = result["growth_scenarios"]

    print("-" * 75)
    print(
        f"{plan.upper()} | Salary £{salary:,} | Balance £{balance:,} | Age {age}"
    )
    print("Headline:", headline)

    print(
        f"Conservative: £{gs['conservative']['total_repaid']:,}"
        f" | Cleared: {gs['conservative']['cleared']}"
        f" | Years: {gs['conservative']['years_taken']}"
    )

    print(
        f"Typical:      £{gs['typical']['total_repaid']:,}"
        f" | Cleared: {gs['typical']['cleared']}"
        f" | Years: {gs['typical']['years_taken']}"
    )

    print(
        f"Strong:       £{gs['strong']['total_repaid']:,}"
        f" | Cleared: {gs['strong']['cleared']}"
        f" | Years: {gs['strong']['years_taken']}"
    )