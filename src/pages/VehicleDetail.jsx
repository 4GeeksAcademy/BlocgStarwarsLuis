import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDescription } from "../utils/starwarsDescriptions";
import { getVehicleImage } from "../utils/imageUrls";

export const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/vehicles/${id}`)
      .then(res => res.json())
      .then(data => {
        setVehicle(data.result.properties);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching vehicle:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return <div className="container mt-5 text-center text-warning">Vehicle not found</div>;
  }

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true);
      e.target.src = "https://via.placeholder.com/800x600/1a1a1a/feda4a?text=" + encodeURIComponent(vehicle.name);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div className="col-md-6">
          <img
            src={getVehicleImage(id)}
            className="img-fluid rounded shadow-lg"
            alt={vehicle.name}
            onError={handleImageError}
            style={{ maxHeight: "600px", objectFit: "cover", width: "100%" }}
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="display-3 text-warning mb-4">{vehicle.name}</h1>
          <p className="lead text-light" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            {getDescription('vehicles', id)}
          </p>
        </div>
      </div>

      <hr className="my-5" style={{ borderColor: "#feda4a", borderWidth: "2px" }} />

      <h3 className="text-warning mb-4">Vehicle Details</h3>
      <div className="row g-4">
        <div className="col-md-3 col-sm-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Name</strong>
            <p className="text-light mb-0">{vehicle.name}</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Model</strong>
            <p className="text-light mb-0">{vehicle.model}</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Vehicle Class</strong>
            <p className="text-light mb-0">{vehicle.vehicle_class}</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Manufacturer</strong>
            <p className="text-light mb-0">{vehicle.manufacturer}</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Cost</strong>
            <p className="text-light mb-0">{vehicle.cost_in_credits} credits</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Length</strong>
            <p className="text-light mb-0">{vehicle.length} m</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Max Speed</strong>
            <p className="text-light mb-0">{vehicle.max_atmosphering_speed} km/h</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Crew</strong>
            <p className="text-light mb-0">{vehicle.crew}</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Passengers</strong>
            <p className="text-light mb-0">{vehicle.passengers}</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Cargo Capacity</strong>
            <p className="text-light mb-0">{vehicle.cargo_capacity} kg</p>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Consumables</strong>
            <p className="text-light mb-0">{vehicle.consumables}</p>
          </div>
        </div>
      </div>

      <Link to="/" className="btn btn-warning mt-5 mb-5 px-4 py-2">
        <i className="fas fa-arrow-left me-2"></i>
        Back to Home
      </Link>
    </div>
  );
};
