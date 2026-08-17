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

      <div className="container">

        <div className="header">
          <h1>🏠 House Price Prediction</h1>
          <p>
            Enter the property details to estimate its price
          </p>
        </div>

        <form onSubmit={handleSubmit}>

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


          <label>Carpet Area (sqft)</label>

          <input
            name="carpet_area_sqft"
            type="number"
            min="1"
            placeholder="Example: 1200"
            value={formData.carpet_area_sqft}
            onChange={handleChange}
            required
          />


          <label>Floor Number</label>

          <input
            name="floor_num"
            type="number"
            min="0"
            placeholder="Example: 5"
            value={formData.floor_num}
            onChange={handleChange}
            required
          />


          <label>Bathrooms</label>

          <input
            name="bathroom"
            type="number"
            min="1"
            placeholder="Example: 2"
            value={formData.bathroom}
            onChange={handleChange}
            required
          />


          <label>Balconies</label>

          <input
            name="balcony"
            type="number"
            min="0"
            placeholder="Example: 1"
            value={formData.balcony}
            onChange={handleChange}
            required
          />


          <label>Car Parking</label>

          <input
            name="car_parking"
            type="number"
            min="0"
            placeholder="Example: 1"
            value={formData.car_parking}
            onChange={handleChange}
            required
          />


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


          <div className="buttons">

            <button
              type="submit"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Predict Price"}
            </button>

            <button
              type="button"
              className="reset"
              onClick={handleReset}
            >
              Reset
            </button>

          </div>

        </form>


        {error && (
          <div className="error">
            <strong>Error:</strong> {error}
          </div>
        )}


        {prediction !== null && (
          <div className="result">

            <h2>Estimated House Price</h2>

            <div className="price">
              ₹{prediction.toLocaleString()}
            </div>

            <p>
              This is the estimated price generated by the ML model.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;