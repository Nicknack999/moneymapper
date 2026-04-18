from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import traceback

from student_loan import calculate_loan
from forecast import run_forecast
from full_model import run_full_model

app = Flask(__name__)

# -------------------------------------------------
# CORS CONFIG
# -------------------------------------------------
allowed_origins = [
    "https://wayli.uk",
    "https://www.wayli.uk",
    "https://moneymapper-zeta.vercel.app",
    "http://localhost:5173",
    "https://wayli.app",
]

frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)

CORS(
    app,
    resources={r"/*": {"origins": allowed_origins}},
    supports_credentials=True
)

# -------------------------------------------------
# HEALTH CHECK
# -------------------------------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "ok",
        "service": "Wayli API",
        "message": "Wayli backend live 🚀"
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy"
    })


# -------------------------------------------------
# ROUTES
# -------------------------------------------------
@app.route("/student-loan", methods=["POST"])
def student_loan():
    try:
        data = request.get_json(force=True) or {}

        print("Incoming /student-loan data:")
        print(data)

        result = calculate_loan(data)

        return jsonify(result)

    except Exception as e:
        print("Error in /student-loan:")
        print(str(e))
        traceback.print_exc()

        return jsonify({
            "error": "Failed to process student loan comparison.",
            "details": str(e)
        }), 500


@app.route("/forecast", methods=["POST"])
def forecast():
    try:
        data = request.get_json(force=True) or {}

        print("Incoming /forecast data:")
        print(data)

        result = run_forecast(data)

        return jsonify(result)

    except Exception as e:
        print("Error in /forecast:")
        print(str(e))
        traceback.print_exc()

        return jsonify({
            "error": "Failed to run forecast.",
            "details": str(e)
        }), 500


@app.route("/full-model", methods=["POST"])
def full_model():
    try:
        data = request.get_json(force=True) or {}

        print("Incoming /full-model data:")
        print(data)

        result = run_full_model(data)

        print("Full model success")

        return jsonify(result)

    except Exception as e:
        print("Error in /full-model:")
        print(str(e))
        traceback.print_exc()

        return jsonify({
            "error": "Failed to run comparison model.",
            "details": str(e)
        }), 500


# -------------------------------------------------
# RUN
# -------------------------------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=True
    )