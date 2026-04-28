from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import traceback

from student_loan import calculate_loan
from forecast import run_forecast
from full_model import run_full_model

# -------------------------------------------------
# APP
# -------------------------------------------------
app = Flask(__name__)

# -------------------------------------------------
# CORS
# -------------------------------------------------
allowed_origins = [
    "https://wayli.uk",
    "https://www.wayli.uk",
    "https://wayli.app",
    "https://moneymapper-zeta.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://192.168.0.39:5175",
    "http://192.168.0.39:5173",
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
# HELPERS
# -------------------------------------------------
def get_json():
    """
    Safe JSON parser.
    Returns {} if no body or invalid JSON.
    """
    try:
        return request.get_json(silent=True) or {}
    except:
        return {}


def success(payload):
    return jsonify(payload), 200


def fail(message, err):
    print(message)
    print(str(err))
    traceback.print_exc()

    return jsonify({
        "success": False,
        "error": message,
        "details": str(err)
    }), 500


# -------------------------------------------------
# HEALTH / ROOT
# -------------------------------------------------
@app.route("/", methods=["GET"])
def home():
    return success({
        "success": True,
        "status": "ok",
        "service": "Wayli API",
        "message": "Wayli backend live 🚀"
    })


@app.route("/health", methods=["GET"])
def health():
    return success({
        "success": True,
        "status": "healthy"
    })


# -------------------------------------------------
# STUDENT LOAN
# -------------------------------------------------
@app.route("/student-loan", methods=["POST"])
def student_loan():
    try:
        data = get_json()

        print("Incoming /student-loan")
        print(data)

        result = calculate_loan(data)

        return success(result)

    except Exception as e:
        return fail(
            "Failed to process student loan comparison.",
            e
        )


# -------------------------------------------------
# FORECAST
# -------------------------------------------------
@app.route("/forecast", methods=["POST"])
def forecast():
    try:
        data = get_json()

        print("Incoming /forecast")
        print(data)

        result = run_forecast(data)

        return success(result)

    except Exception as e:
        return fail(
            "Failed to run forecast.",
            e
        )


# -------------------------------------------------
# FULL MODEL
# -------------------------------------------------
@app.route("/full-model", methods=["POST"])
def full_model():
    try:
        data = get_json()

        print("Incoming /full-model")
        print(data)

        result = run_full_model(data)

        print("Full model success")

        return success(result)

    except Exception as e:
        return fail(
            "Failed to run comparison model.",
            e
        )


# -------------------------------------------------
# 404
# -------------------------------------------------
@app.errorhandler(404)
def not_found(_):
    return jsonify({
        "success": False,
        "error": "Route not found"
    }), 404


# -------------------------------------------------
# 500
# -------------------------------------------------
@app.errorhandler(500)
def server_error(_):
    return jsonify({
        "success": False,
        "error": "Internal server error"
    }), 500


# -------------------------------------------------
# RUN LOCAL
# -------------------------------------------------
if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=True
    )