# engine/break_even.py

from engine.forecast import run_forecast


def find_break_even_overpay(data, max_overpay=1000, step=50):
    """
    Finds the overpay where strategy flips (invest vs overpay).
    Uses sign change, not closest match.
    """

    def get_diff(overpay):
        test_data = data.copy()
        test_data["overpay"] = overpay

        result = run_forecast(test_data)
        final = result["net_worth"][-1]

        baseline_data = data.copy()
        baseline_data["overpay"] = 0
        baseline = run_forecast(baseline_data)
        baseline_final = baseline["net_worth"][-1]

        return final - baseline_final

    prev_diff = get_diff(0)

    for overpay in range(step, max_overpay + step, step):
        current_diff = get_diff(overpay)

        # SIGN CHANGE = crossover
        if (prev_diff <= 0 and current_diff > 0) or (
            prev_diff >= 0 and current_diff < 0
        ):
            return overpay

        prev_diff = current_diff

    return None