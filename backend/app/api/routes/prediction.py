from fastapi import APIRouter, HTTPException
import pandas as pd

from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.inference import predict_price


router = APIRouter()


@router.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):

    try:
        data = pd.DataFrame([request.model_dump()])

        predicted_price = predict_price(data)

        return {
            "predicted_price": predicted_price
        }

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )