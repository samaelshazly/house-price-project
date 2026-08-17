import { useState } from "react";
import "./App.css";
import locations from "./data/locations.json";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const initialForm = {
  location_grouped: "",
  carpet_area_sqft: "",
  floor_num: "",
  bathroom: "",
  balcony: "",
  car_parking: "",
  Furnishing: "",
  Transaction: "",
  Ownership: "",
  facing: "",
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setPrediction(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location_grouped: formData.location_grouped,
          carpet_area_sqft: Number(formData.carpet_area_sqft),
          floor_num: Number(formData.floor_num),
          bathroom: Number(formData.bathroom),
          balcony: Number(formData.balcony),
          car_parking: Number(formData.car_parking),
          Furnishing: formData.Furnishing,
          Transaction: formData.Transaction,
          Ownership: formData.Ownership,
          facing: formData.facing,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Prediction failed");
      }

      setPrediction(data.predicted_price);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setPrediction(null);
    setError("");
  };

  return (
    <div className="page">

      {/* Decorative background */}
      <div className="blob blob-one"></div>
      <div className="blob blob-two"></div>

      <main className="container">

        {/* Header */}
        <header className="header">
          <div className="logo">🏠</div>

          <div>
            <span className="eyebrow">MACHINE LEARNING PROJECT</span>

            <h1>House Price Prediction</h1>

            <p>
              Estimate your property's price using our machine learning model.
            </p>
          </div>
        </header>

        {/* Form */}
        <section className="form-card">

          <div className="section-title">
            <div>
              <h2>Property Details</h2>
              <p>Enter the information below</p>
            </div>

            <span className="step-badge">10 Fields</span>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-grid">

              {/* Location */}
              <div className="field full">
                <label>Location</label>

                <select
                  name="location_grouped"
                  value={formData.location_grouped}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Location</option>

                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Carpet Area */}
              <div className="field">
                <label>Carpet Area</label>

                <div className="input-wrapper">
                  <input
                    name="carpet_area_sqft"
                    type="number"
                    min="1"
                    placeholder="1200"
                    value={formData.carpet_area_sqft}
                    onChange={handleChange}
                    required
                  />
                  <span>sqft</span>
                </div>
              </div>

              {/* Floor */}
              <div className="field">
                <label>Floor Number</label>

                <input
                  name="floor_num"
                  type="number"
                  min="0"
                  placeholder="5"
                  value={formData.floor_num}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Bathroom */}
              <div className="field">
                <label>Bathrooms</label>

                <input
                  name="bathroom"
                  type="number"
                  min="1"
                  placeholder="2"
                  value={formData.bathroom}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Balcony */}
              <div className="field">
                <label>Balconies</label>

                <input
                  name="balcony"
                  type="number"
                  min="0"
                  placeholder="1"
                  value={formData.balcony}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Parking */}
              <div className="field">
                <label>Car Parking</label>

                <input
                  name="car_parking"
                  type="number"
                  min="0"
                  placeholder="1"
                  value={formData.car_parking}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Furnishing */}
              <div className="field">
                <label>Furnishing</label>

                <select
                  name="Furnishing"
                  value={formData.Furnishing}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Furnishing</option>
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              {/* Transaction */}
              <div className="field">
                <label>Transaction</label>

                <select
                  name="Transaction"
                  value={formData.Transaction}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Transaction</option>
                  <option value="New_Property">New Property</option>
                  <option value="Resale">Resale</option>
                </select>
              </div>

              {/* Ownership */}
              <div className="field">
                <label>Ownership</label>

                <select
                  name="Ownership"
                  value={formData.Ownership}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Ownership</option>
                  <option value="Freehold">Freehold</option>
                  <option value="Leasehold">Leasehold</option>
                </select>
              </div>

              {/* Facing */}
              <div className="field">
                <label>Facing</label>

                <select
                  name="facing"
                  value={formData.facing}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Facing</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                </select>
              </div>

            </div>

            {/* Buttons */}
            <div className="buttons">

              <button
                type="submit"
                className="predict-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Predicting...
                  </>
                ) : (
                  <>
                    ✨ Predict Price
                  </>
                )}
              </button>

              <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
              >
                Reset
              </button>

            </div>

          </form>

          {/* Error */}
          {error && (
            <div className="error">
              <span>⚠️</span>
              <div>
                <strong>Prediction Error</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Result */}
          {prediction !== null && (
            <div className="result">

              <div className="result-icon">✓</div>

              <div>
                <span>ESTIMATED PROPERTY PRICE</span>

                <h2>
                  ₹{Number(prediction).toLocaleString()}
                </h2>

                <p>
                  Prediction generated successfully by the ML model.
                </p>
              </div>

            </div>
          )}

        </section>

        <footer>
          <span>Powered by Machine Learning</span>
          <span>•</span>
          <span>House Price Prediction</span>
        </footer>

      </main>
    </div>
  );
}

export default App;