import joblib
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="MnVision-AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ZONES = [
    {"id":"A","name":"Zone A","score":91,"confidence":82,"classification":"High Potential"},
    {"id":"B","name":"Zone B","score":76,"confidence":78,"classification":"High Potential"},
    {"id":"C","name":"Zone C","score":58,"confidence":71,"classification":"Moderate"},
    {"id":"D","name":"Zone D","score":29,"confidence":67,"classification":"Low Potential"},
]

class ProductionInput(BaseModel):
    target_tonnes: float = 100000
    equipment_downtime: float = 42
    blast_delay: float = 27
    rainfall: float = 16
    working_hours_loss: float = 10

@app.get("/")
def root():
    return {"project":"MnVision-AI","status":"online","mode":"prototype"}

@app.get("/api/health")
def health():
    return {"status":"healthy","service":"mnvision-api"}

@app.get("/api/prospectivity")
def prospectivity():
    return {"prototype":True,"zones":ZONES}

@app.get("/api/prospectivity/{zone_id}")
def zone(zone_id: str):
    zone = next((z for z in ZONES if z["id"] == zone_id.upper()), None)
    if not zone:
        return {"error":"Zone not found"}
    return {"prototype":True,"zone":zone}

@app.get("/api/production")
def production():
    return {
        "prototype":True,
        "target_tonnes":100000,
        "expected_tonnes":87500,
        "shortfall_tonnes":12500,
        "risk_percent":84,
        "factors":{
            "equipment_downtime":42,
            "blast_delay":27,
            "rainfall":16,
            "working_hours":10,
            "other":5
        }
    }

@app.post("/api/production/predict")
def production_predict(data: ProductionInput):
    risk = min(99, round(
        data.equipment_downtime * 0.55 +
        data.blast_delay * 0.25 +
        data.rainfall * 0.12 +
        data.working_hours_loss * 0.08
    ))
    expected = round(data.target_tonnes * (1 - risk / 100), 2)
    return {
        "prototype": True,
        "target_tonnes": data.target_tonnes,
        "risk_percent": risk,
        "expected_tonnes": expected,
        "shortfall_tonnes": round(data.target_tonnes - expected, 2)
    }

@app.get("/api/action-plan")
def action_plan():
    return {
        "prototype":True,
        "recommendations":[
            "Deploy available equipment to the highest-priority production face.",
            "Review and reschedule delayed blasting activity.",
            "Reconsider mining sequence using ore and equipment availability.",
            "Prioritize resources where they can reduce predicted shortfall."
        ]
    }
# ==============================
# MnVision-AI ML Prediction API
# ==============================

MODEL_PATH = Path(__file__).parent / "ml" / "prospectivity_model.joblib"

prospectivity_model = joblib.load(MODEL_PATH)


class ProspectivityInput(BaseModel):
    ndvi: float
    ndmi: float
    elevation: float
    slope: float
    b4: float
    b8: float
    b11: float
    geology_score: float


@app.post("/api/prospectivity/predict")
def predict_prospectivity(data: ProspectivityInput):

    values = [[
        data.ndvi,
        data.ndmi,
        data.elevation,
        data.slope,
        data.b4,
        data.b8,
        data.b11,
        data.geology_score
    ]]

    probability = prospectivity_model.predict_proba(values)[0][1]

    score = round(probability * 100, 2)

    if score >= 70:
        classification = "High"
    elif score >= 40:
        classification = "Medium"
    else:
        classification = "Low"

    return {
        "prospectivity_score": score,
        "classification": classification,
        "model": "Random Forest Prototype",
        "data_type": "Synthetic demonstration data"
    }