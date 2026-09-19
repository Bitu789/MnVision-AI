import os
import joblib
import numpy as np
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score


# -----------------------------
# 1. Create small demo dataset
# -----------------------------

np.random.seed(42)

N = 60

data = pd.DataFrame({
    "ndvi": np.random.uniform(0.15, 0.75, N),
    "ndmi": np.random.uniform(0.05, 0.60, N),
    "elevation": np.random.uniform(300, 900, N),
    "slope": np.random.uniform(1, 25, N),
    "b4": np.random.uniform(0.05, 0.45, N),
    "b8": np.random.uniform(0.10, 0.70, N),
    "b11": np.random.uniform(0.05, 0.50, N),
    "geology_score": np.random.uniform(0, 1, N)
})


# ----------------------------------------
# 2. Create synthetic prototype labels
# ----------------------------------------

score = (
    0.25 * data["geology_score"]
    + 0.20 * (1 - data["ndvi"])
    + 0.15 * data["ndmi"]
    + 0.15 * data["b11"]
    + 0.10 * (data["slope"] / 25)
    + 0.15 * (data["elevation"] / 900)
)

data["mn_occurrence"] = (score > score.median()).astype(int)


# -----------------------------
# 3. Train Random Forest
# -----------------------------

features = [
    "ndvi",
    "ndmi",
    "elevation",
    "slope",
    "b4",
    "b8",
    "b11",
    "geology_score"
]

X = data[features]
y = data["mn_occurrence"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42,
    max_depth=5
)

model.fit(X_train, y_train)


# -----------------------------
# 4. Test model
# -----------------------------

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("--------------------------------")
print("MnVision-AI Prototype Model")
print("--------------------------------")
print(f"Training samples : {len(X_train)}")
print(f"Testing samples  : {len(X_test)}")
print(f"Accuracy         : {accuracy:.2%}")


# -----------------------------
# 5. Save model
# -----------------------------

os.makedirs("ml", exist_ok=True)

model_path = os.path.join("ml", "prospectivity_model.joblib")

joblib.dump(model, model_path)

print("--------------------------------")
print(f"Model saved to: {model_path}")
print("--------------------------------")
