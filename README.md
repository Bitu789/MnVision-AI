# MnVision-AI — Full Stack Prototype

Smart India Hackathon 2026
Problem Statement 26009
"Using AI/ML and Space Technology to Identify Manganese Reserves and Overcome Production Shortfalls."

## Stack

Frontend:
- React
- Vite
- JavaScript
- Recharts
- Lucide React
- CSS

Backend:
- Python
- FastAPI
- Uvicorn
- Pydantic

## 1. Install Node.js

Install the current LTS version from:
https://nodejs.org/

Then verify:
node --version
npm --version

## 2. Run frontend

Open a terminal in `frontend`:

npm install
npm run dev

Open:
http://localhost:5173

## 3. Run backend

Install Python 3.10+ if necessary.

Open another terminal in `backend`:

python -m venv .venv

Windows PowerShell:
.venv\Scripts\Activate.ps1

Windows CMD:
.venv\Scripts\activate

Then:
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

Backend:
http://127.0.0.1:8000

API documentation:
http://127.0.0.1:8000/docs

## Current prototype behavior

The frontend currently uses local demonstration data so it works immediately.

The FastAPI backend provides:
GET /api/health
GET /api/prospectivity
GET /api/prospectivity/A
GET /api/production
POST /api/production/predict
GET /api/action-plan

The backend is intentionally basic. Real GSI/Sentinel-2 processing, ML training, borehole resource estimation and production datasets can be connected later.

## Scientific wording

The prototype does NOT claim that satellites directly see underground manganese.
It describes the output as manganese prospectivity based on satellite-derived surface indicators, known manganese occurrences and geological information.

All displayed numerical results are illustrative prototype data and are not actual MOIL operational results.
