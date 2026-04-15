from flask import Flask, request, jsonify
from flask_cors import CORS

from student_loan import calculate_loan
from forecast import run_forecast
from full_model import run_full_model

app = Flask(__name__)

# -----------------------------
# CORS CONFIG (FIXED 🔥)
# -----------------------------
CORS(
    app,
    resources={r"/*": {"origins": "https://moneymapper-zeta.vercel.app"}},
    supports_credentials=True
)

# -----------------------------
# HEALTH CHECK
# -----------------------------
@app.route("/")
def home():
    return "MoneyMapper API v1 🚀"


# -----------------------------
# ROUTES
# -----------------------------
@app.route("/student-loan", methods=["POST"])
def student_loan():
    try:
        data = request.get_json(force=True)
        result = calculate_loan(data)
        return jsonify(result)
    except Exception as e:
        print("Error in /student-loan:", e)
        return jsonify({"error": "Failed to process student loan"}), 500


@app.route("/forecast", methods=["POST"])
def forecast():
    try:
        data = request.get_json(force=True)
        result = run_forecast(data)
        return jsonify(result)
    except Exception as e:
        print("Error in /forecast:", e)
        return jsonify({"error": "Failed to run forecast"}), 500


@app.route("/full-model", methods=["POST"])
def full_model():
    try:
        data = request.get_json(force=True)
        result = run_full_model(data)
        return jsonify(result)
    except Exception as e:
        print("Error in /full-model:", e)
        return jsonify({"error": "Failed to run full model"}), 500


# -----------------------------
# RUN
# -----------------------------
if __name__ == "__main__":
    app.run(debug=True)

