from dataclasses import dataclass
from typing import Optional


@dataclass
class User:
    age: int
    retirement_age: int
    income: float
    monthly_savings: float
    current_savings: float


@dataclass
class Assumptions:
    growth_rate: float = 0.05
    inflation: float = 0.02


@dataclass
class StudentLoan:
    balance: float
    interest_rate: float
    threshold: float
    repayment_rate: float
    write_off_years: int = 30


@dataclass
class Scenario:
    user: User
    assumptions: Assumptions
    student_loan: Optional[StudentLoan] = None
    loan_overpayment: float = 0