from flask import Flask, request, jsonify
from flask_cors import CORS

from engine.student_loan import calculate_loan
from engine.forecast import run_forecast
from engine.full_model import run_full_model

app = Flask(__name__)
CORS(app)


@app.route("/student-loan", methods=["POST"])
def student_loan():
    data = request.json
    result = calculate_loan(data)
    return jsonify(result)


@app.route("/forecast", methods=["POST"])
def forecast():
    data = request.json
    result = run_forecast(data)
    return jsonify(result)


@app.route("/full-model", methods=["POST"])
def full_model():
    data = request.json
    result = run_full_model(data)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)