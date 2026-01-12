import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const EpisodeDetail = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    fetch(`https://thesimpsonsapi.com/api/episodes/${id}`)
      .then(res => res.json())
      .then(data => {
        setEpisode(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching episode:", error);
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

  if (!episode) {
    return (
      <div className="container mt-5 text-center">
        <h2 style={{ color: "#FFD90F" }}>Episode not found!</h2>
        <p>D'oh!</p>
      </div>
    );
  }

  const getEpisodeImage = (episodeId) => {
    return `https://cdn.thesimpsonsapi.com/500/episode/${episodeId}.webp`;
  };

  const handleImageError = (e) => {
    if (!imgError) {
      setImgError(true);
      const svg = `
        <svg width="600" height="338" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="338" fill="#FFD90F"/>
          <text x="300" y="169" font-size="48" text-anchor="middle" fill="#000" font-weight="bold">Episode ${episode.episode_number}</text>
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
              src={getEpisodeImage(episode.id)}
              className="img-fluid"
              alt={episode.name}
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
            {episode.name}
          </h1>
          <div className="mb-3" style={{
            backgroundColor: "#FFD90F",
            padding: "15px",
            border: "3px solid #000",
            borderRadius: "10px"
          }}>
            <h3 style={{ color: "#000", fontSize: "1.5rem", marginBottom: "10px" }}>
              Season {episode.season}, Episode {episode.episode_number}
            </h3>
            <p style={{ color: "#000", fontSize: "1.2rem", marginBottom: 0 }}>
              📅 Aired: {new Date(episode.airdate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div style={{
            backgroundColor: "#fff",
            padding: "20px",
            border: "3px solid #000",
            borderRadius: "10px"
          }}>
            <h4 style={{ color: "#000", marginBottom: "15px" }}>Synopsis</h4>
            <p style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
              color: "#000",
              marginBottom: 0
            }}>
              {episode.synopsis}
            </p>
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
        Episode Info
      </h3>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div style={{
            backgroundColor: "#87CEEB",
            border: "3px solid #000",
            borderRadius: "10px",
            padding: "20px"
          }}>
            <strong style={{ color: "#000", fontSize: "1.2rem" }}>Episode Number</strong>
            <p style={{ color: "#000", fontSize: "1.1rem", marginTop: "10px", marginBottom: 0 }}>
              #{episode.episode_number}
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div style={{
            backgroundColor: "#87CEEB",
            border: "3px solid #000",
            borderRadius: "10px",
            padding: "20px"
          }}>
            <strong style={{ color: "#000", fontSize: "1.2rem" }}>Season</strong>
            <p style={{ color: "#000", fontSize: "1.1rem", marginTop: "10px", marginBottom: 0 }}>
              Season {episode.season}
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div style={{
            backgroundColor: "#87CEEB",
            border: "3px solid #000",
            borderRadius: "10px",
            padding: "20px"
          }}>
            <strong style={{ color: "#000", fontSize: "1.2rem" }}>Air Date</strong>
            <p style={{ color: "#000", fontSize: "1.1rem", marginTop: "10px", marginBottom: 0 }}>
              {new Date(episode.airdate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="d-flex gap-3 mb-5">
        <Link
          to="/episodes"
          className="btn btn-lg"
          style={{
            backgroundColor: "#FFD90F",
            color: "#000",
            border: "3px solid #000",
            fontWeight: "bold",
            fontSize: "1.2rem"
          }}
        >
          ← Back to Episodes
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
