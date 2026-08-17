from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.prediction import router as prediction_router


app = FastAPI(
    title="House Price Prediction API",
    description="API for predicting house prices using Machine Learning",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(prediction_router)


@app.get("/health")
def health_check():
    return {"status": "ok"}