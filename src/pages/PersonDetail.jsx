import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDescription } from "../utils/starwarsDescriptions";
import { getCharacterImage } from "../utils/imageUrls";

export const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${id}`)
      .then(res => res.json())
      .then(data => {
        setPerson(data.result.properties);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching person:", error);
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

  if (!person) {
    return <div className="container mt-5 text-center text-warning">Character not found</div>;
  }

  const handleImageError = (e) => {
    if (!imageError) {
      setImageError(true);
      e.target.src = "https://via.placeholder.com/800x600/000000/feda4a?text=" + encodeURIComponent(person.name);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div className="col-md-6">
          <img
            src={getCharacterImage(id)}
            className="img-fluid rounded shadow-lg"
            alt={person.name}
            onError={handleImageError}
            style={{ maxHeight: "600px", objectFit: "cover", width: "100%" }}
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="display-3 text-warning mb-4">{person.name}</h1>
          <p className="lead text-light" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
            {getDescription('people', id)}
          </p>
        </div>
      </div>

      <hr className="my-5" style={{ borderColor: "#feda4a", borderWidth: "2px" }} />

      <h3 className="text-warning mb-4">Character Details</h3>
      <div className="row g-4">
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Name</strong>
            <p className="text-light mb-0">{person.name}</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Birth Year</strong>
            <p className="text-light mb-0">{person.birth_year}</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Gender</strong>
            <p className="text-light mb-0">{person.gender}</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Height</strong>
            <p className="text-light mb-0">{person.height} cm</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Mass</strong>
            <p className="text-light mb-0">{person.mass} kg</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Hair Color</strong>
            <p className="text-light mb-0">{person.hair_color}</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Skin Color</strong>
            <p className="text-light mb-0">{person.skin_color}</p>
          </div>
        </div>
        <div className="col-md-2 col-sm-4 col-6">
          <div className="detail-card p-3 rounded" style={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }}>
            <strong className="text-danger d-block mb-2">Eye Color</strong>
            <p className="text-light mb-0">{person.eye_color}</p>
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
