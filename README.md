# House Price Prediction

## Overview

This project predicts house prices using Machine Learning regression models.

The project covers data cleaning, exploratory data analysis, feature engineering, preprocessing, model training, evaluation, and prediction.

## Features

The dataset contains information about:

- Carpet Area
- Floor Number
- Bathroom
- Balcony
- Car Parking
- Location
- Furnishing
- Transaction
- Ownership
- Facing

## Machine Learning Models

The following models were tested:

- Linear Regression
- Random Forest Regressor
- Gradient Boosting Regressor
- Gradient Boosting with Log Target
- Gradient Boosting with Clipped Target

## Preprocessing

### Numerical Features

- Missing values were handled using median imputation.
- Features were standardized using StandardScaler.

### Categorical Features

- Missing values were handled using most frequent imputation.
- Categorical variables were encoded using OneHotEncoder.

A ColumnTransformer and Pipeline were used to organize the preprocessing process.

## Best Model

The best performing model was:

**Gradient Boosting Regressor with Target Clipping**

The target was clipped at the 99.9th percentile to reduce the effect of extreme price outliers.

## Final Results

| Metric | Result |
|---|---:|
| MAE | 3,630,687 |
| RMSE | 6,439,264 |
| R² | 0.7363 |

## Feature Importance

The most important features were:

1. Bathroom
2. Carpet Area
3. Car Parking
4. Location
5. Floor Number

## Technologies

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Scikit-learn
- Joblib
- Jupyter Notebook

## Project Files

- `house_price_prediction.ipynb` — Complete Machine Learning notebook
- `final_house_price_model.pkl` — Trained final model
- `requirements.txt` — Required Python libraries
- `README.md` — Project documentation
- `.gitignore` — Git ignored files