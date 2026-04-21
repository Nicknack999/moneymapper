# Wayli Current Architecture

## Frontend
src/App.jsx = homepage / router shell
src/core/StudentLoanTool.jsx = active tool
src/wayliMessages.js = shared copy/content
src/experimental/ = future tools

## Backend
engine/app.py = Flask API entrypoint
engine/core/student_loan.py = loan logic
engine/core/forecast.py = projections
engine/core/full_model.py = comparison engine

## Local Run

Frontend:
npm run dev

Backend:
python engine/app.py

## Rule

Make one change at a time.
Run locally after each change.
Deploy only when stable.