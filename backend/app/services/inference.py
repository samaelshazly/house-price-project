from pathlib import Path
import joblib


BASE_DIR = Path(__file__).resolve().parents[2]
MODEL_PATH = BASE_DIR / "models" / "house_price.pkl"


model = joblib.load(MODEL_PATH)


def predict_price(features):
    prediction = model.predict(features)

    return float(prediction[0])