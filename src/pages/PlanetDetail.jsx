import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDescription } from "../utils/starwarsDescriptions";
import { getPlanetImage } from "../utils/imageUrls";

export const PlanetDetail = () => {
  const { id } = useParams();
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/planets/${id}`)
      .then(res => res.json())
      .then(data => {
        setPlanet(data.result.properties);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching planet:", error);
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

  if (!planet) {
    return <div className="container mt-5 text-center text-warning">Planet not found</div>;
  }

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true);
      e.target.src = "https://via.placeholder.com/800x600/1a1a1a/feda4a?text=" + encodeURIComponent(planet.name);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div className="col-md-6">
          <img
            src={getPlanetImage(id)}
            className="img-fluid rounded shadow-lg"
            alt={planet.name}
            onError={handleImageError}
            style={{ maxHeight: "600px", objectFit: "cover", width: "100%" }}
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="display-3 text-warning mb-4">{planet.name}</h1>
          <p className="lead text-light" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            {getDescription('planets', id)}
          </p>
        </div>
      </div>

      <hr className="my-5" style={{ borderColor: "#feda4a", borderWidth: "2px" }} />

      <h3 className="text-warning mb-4">Planet Details</h3>
      <div className="row g-4">
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Name</strong>
            <p className="text-light mb-0">{planet.name}</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Climate</strong>
            <p className="text-light mb-0">{planet.climate}</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Population</strong>
            <p className="text-light mb-0">{planet.population}</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Diameter</strong>
            <p className="text-light mb-0">{planet.diameter} km</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Terrain</strong>
            <p className="text-light mb-0">{planet.terrain}</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Gravity</strong>
            <p className="text-light mb-0">{planet.gravity}</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Orbital Period</strong>
            <p className="text-light mb-0">{planet.orbital_period} days</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Rotation Period</strong>
            <p className="text-light mb-0">{planet.rotation_period} hours</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Surface Water</strong>
            <p className="text-light mb-0">{planet.surface_water}%</p>
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
