from student_loan import generate_salary_curve, calculate_loan

# ----------------------------------
# TEST INPUTS
# ----------------------------------

salary = 30000
balance = 50000

interest = 6
threshold = 27295
rate = 9
years = 30
overpay = 1000

# ----------------------------------
# TEST 1: Decision output
# ----------------------------------

result = calculate_loan(salary, balance)

print("\n--- DECISION OUTPUT ---")
for key, value in result.items():
    print(f"{key}: {value}")

# ----------------------------------
# TEST 2: Salary curve
# ----------------------------------

curve = generate_salary_curve(
    balance,
    interest,
    threshold,
    rate,
    years,
    overpay
)

print("\n--- SALARY CURVE (first 5 rows) ---")
for row in curve[:5]:
    print(row)