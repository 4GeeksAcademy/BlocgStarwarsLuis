import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCharacterDescription, getCharacterImage } from "../utils/simpsonsData";

export const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    fetch(`https://thesimpsonsapi.com/api/characters/${id}`)
      .then(res => res.json())
      .then(data => {
        setCharacter(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching character:", error);
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

  if (!character) {
    return (
      <div className="container mt-5 text-center">
        <h2 style={{ color: "#FFD90F" }}>Character not found!</h2>
        <p>D'oh!</p>
      </div>
    );
  }

  const handleImageError = (e) => {
    if (!imgError) {
      setImgError(true);
      const svg = `
        <svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="600" fill="#FFD90F"/>
          <text x="300" y="300" font-size="48" text-anchor="middle" fill="#000" font-weight="bold">${character.name}</text>
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
              src={getCharacterImage(character.id)}
              className="img-fluid"
              alt={character.name}
              onError={handleImageError}
              style={{
                maxHeight: "500px",
                objectFit: "contain",
                width: "100%"
              }}
            />
          </div>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h1 className="display-3 mb-4" style={{
            fontFamily: "'Creepster', cursive",
            color: "#FFD90F",
            textShadow: "4px 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000"
          }}>
            {character.name}
          </h1>
          <p className="lead" style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            color: "#000",
            backgroundColor: "#fff",
            padding: "20px",
            border: "3px solid #000",
            borderRadius: "10px"
          }}>
            {character.description || getCharacterDescription(character.name)}
          </p>
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
        Character Info
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
              {character.name}
            </p>
          </div>
        </div>

        {character.normalized_name && (
          <div className="col-md-4">
            <div style={{
              backgroundColor: "#87CEEB",
              border: "3px solid #000",
              borderRadius: "10px",
              padding: "20px"
            }}>
              <strong style={{ color: "#000", fontSize: "1.2rem" }}>Normalized Name</strong>
              <p style={{ color: "#000", fontSize: "1.1rem", marginTop: "10px", marginBottom: 0 }}>
                {character.normalized_name}
              </p>
            </div>
          </div>
        )}

        {character.gender && (
          <div className="col-md-4">
            <div style={{
              backgroundColor: "#87CEEB",
              border: "3px solid #000",
              borderRadius: "10px",
              padding: "20px"
            }}>
              <strong style={{ color: "#000", fontSize: "1.2rem" }}>Gender</strong>
              <p style={{ color: "#000", fontSize: "1.1rem", marginTop: "10px", marginBottom: 0 }}>
                {character.gender === 'Male' || character.gender === 'm' ? '👨 Male' : character.gender === 'Female' || character.gender === 'f' ? '👩 Female' : 'Unknown'}
              </p>
            </div>
          </div>
        )}

        {character.age && (
          <div className="col-md-4">
            <div style={{
              backgroundColor: "#87CEEB",
              border: "3px solid #000",
              borderRadius: "10px",
              padding: "20px"
            }}>
              <strong style={{ color: "#000", fontSize: "1.2rem" }}>Age</strong>
              <p style={{ color: "#000", fontSize: "1.1rem", marginTop: "10px", marginBottom: 0 }}>
                {character.age} years old
              </p>
            </div>
          </div>
        )}

        {character.occupation && (
          <div className="col-md-4">
            <div style={{
              backgroundColor: "#87CEEB",
              border: "3px solid #000",
              borderRadius: "10px",
              padding: "20px"
            }}>
              <strong style={{ color: "#000", fontSize: "1.2rem" }}>Occupation</strong>
              <p style={{ color: "#000", fontSize: "1.1rem", marginTop: "10px", marginBottom: 0 }}>
                {character.occupation}
              </p>
            </div>
          </div>
        )}

        {character.status && (
          <div className="col-md-4">
            <div style={{
              backgroundColor: "#87CEEB",
              border: "3px solid #000",
              borderRadius: "10px",
              padding: "20px"
            }}>
              <strong style={{ color: "#000", fontSize: "1.2rem" }}>Status</strong>
              <p style={{ color: "#000", fontSize: "1.1rem", marginTop: "10px", marginBottom: 0 }}>
                {character.status === 'Alive' ? '✅ Alive' : character.status === 'Deceased' ? '💀 Deceased' : character.status}
              </p>
            </div>
          </div>
        )}
      </div>

      <Link
        to="/"
        className="btn btn-lg mb-5"
        style={{
          backgroundColor: "#FFD90F",
          color: "#000",
          border: "3px solid #000",
          fontWeight: "bold",
          fontSize: "1.2rem"
        }}
      >
        ← Back to Springfield
      </Link>
    </div>
  );
};
