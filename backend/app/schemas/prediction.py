from pydantic import BaseModel


class PredictionRequest(BaseModel):
    location_grouped: str
    carpet_area_sqft: float
    floor_num: float
    bathroom: float
    balcony: float
    car_parking: float
    Furnishing: str
    Transaction: str
    Ownership: str
    facing: str


class PredictionResponse(BaseModel):
    predicted_price: float