import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const LocationDetail = () => {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    fetch(`https://thesimpsonsapi.com/api/locations/${id}`)
      .then(res => res.json())
      .then(data => {
        setLocation(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching location:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" style={{ color: "#FFD90F" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="container mt-5 text-center">
        <h2 style={{ color: "#FFD90F" }}>Location not found!</h2>
        <p>D'oh!</p>
      </div>
    );
  }

  const getLocationImage = (locationId) => {
    return `https://cdn.thesimpsonsapi.com/500/location/${locationId}.webp`;
  };

  const handleImageError = (e) => {
    if (!imgError) {
      setImgError(true);
      const svg = `
        <svg width="600" height="338" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="338" fill="#FFD90F"/>
          <text x="300" y="169" font-size="36" text-anchor="middle" fill="#000" font-weight="bold">${location.name}</text>
        </svg>
      `;
      e.target.src = `data:image/svg+xml;base64,${btoa(svg)}`;
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div className="col-md-6">
          <div style={{
            backgroundColor: "#87CEEB",
            border: "4px solid #000",
            borderRadius: "15px",
            padding: "20px"
          }}>
            <img
              src={getLocationImage(location.id)}
              className="img-fluid"
              alt={location.name}
              onError={handleImageError}
              style={{
                width: "100%",
                borderRadius: "10px"
              }}
            />
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="display-4 mb-4" style={{
            fontFamily: "'Creepster', cursive",
            color: "#FFD90F",
            textShadow: "4px 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000"
          }}>
            {location.name}
          </h1>
          <div className="d-flex flex-column gap-3">
            {location.town && (
              <div style={{
                backgroundColor: "#FFD90F",
                padding: "20px",
                border: "3px solid #000",
                borderRadius: "10px"
              }}>
                <h4 style={{ color: "#000", marginBottom: "10px" }}>📍 Town</h4>
                <p style={{ color: "#000", fontSize: "1.3rem", marginBottom: 0, fontWeight: "bold" }}>
                  {location.town}
                </p>
              </div>
            )}
            {location.use && (
              <div style={{
                backgroundColor: "#87CEEB",
                padding: "20px",
                border: "3px solid #000",
                borderRadius: "10px"
              }}>
                <h4 style={{ color: "#000", marginBottom: "10px" }}>🏢 Use</h4>
                <p style={{ color: "#000", fontSize: "1.3rem", marginBottom: 0, fontWeight: "bold" }}>
                  {location.use}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr style={{
        borderTop: "4px solid #FFD90F",
        opacity: 1
      }} />

      <h3 className="mb-4" style={{
        color: "#FFD90F",
        textShadow: "2px 2px 0 #000"
      }}>
        Location Info
      </h3>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div style={{
            backgroundColor: "#87CEEB",
            border: "3px solid #000",
            borderRadius: "10px",
            padding: "20px"
          }}>
            <strong style={{ color: "#000", fontSize: "1.2rem" }}>Name</strong>
            <p style={{ color: "#000", fontSize: "1.1rem", marginTop: "10px", marginBottom: 0 }}>
              {location.name}
            </p>
          </div>
        </div>

        {location.town && (
          <div className="col-md-4">
            <div style={{
              backgroundColor: "#87CEEB",
              border: "3px solid #000",
              borderRadius: "10px",
              padding: "20px"
            }}>
              <strong style={{ color: "#000", fontSize: "1.2rem" }}>Town</strong>
              <p style={{ color: "#000", fontSize: "1.1rem", marginTop: "10px", marginBottom: 0 }}>
                {location.town}
              </p>
            </div>
          </div>
        )}

        {location.use && (
          <div className="col-md-4">
            <div style={{
              backgroundColor: "#87CEEB",
              border: "3px solid #000",
              borderRadius: "10px",
              padding: "20px"
            }}>
              <strong style={{ color: "#000", fontSize: "1.2rem" }}>Type</strong>
              <p style={{ color: "#000", fontSize: "1.1rem", marginTop: "10px", marginBottom: 0 }}>
                {location.use}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="d-flex gap-3 mb-5">
        <Link
          to="/locations"
          className="btn btn-lg"
          style={{
            backgroundColor: "#FFD90F",
            color: "#000",
            border: "3px solid #000",
            fontWeight: "bold",
            fontSize: "1.2rem"
          }}
        >
          ← Back to Locations
        </Link>
        <Link
          to="/"
          className="btn btn-lg"
          style={{
            backgroundColor: "#87CEEB",
            color: "#000",
            border: "3px solid #000",
            fontWeight: "bold",
            fontSize: "1.2rem"
          }}
        >
          🏠 Home
        </Link>
      </div>
    </div>
  );
};
