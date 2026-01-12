import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Episodes = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch("https://thesimpsonsapi.com/api/episodes?page=1"),
          fetch("https://thesimpsonsapi.com/api/episodes?page=2"),
          fetch("https://thesimpsonsapi.com/api/episodes?page=3")
        ]);

        const dataArrays = await Promise.all(responses.map(res => res.json()));

        const allEpisodes = dataArrays.flatMap(data => data.results);

        const validEpisodes = allEpisodes
          .filter(ep => ep.name && ep.name.trim() !== '')
          .slice(0, 60);

        dispatch({ type: "set_episodes", payload: validEpisodes });
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    if (store.episodes.length === 0) {
      fetchData();
    }
  }, []);

  const getEpisodeImage = (episodeId) => {
    return `https://cdn.thesimpsonsapi.com/500/episode/${episodeId}.webp`;
  };

  const handleAddFavorite = (episode, e) => {
    e.preventDefault();
    const isFavorite = store.favorites.some(fav => fav.id === episode.id && fav.type === 'episode');

    if (isFavorite) {
      dispatch({ type: "remove_favorite", payload: { id: episode.id, type: 'episode' } });
    } else {
      dispatch({ type: "add_favorite", payload: { ...episode, type: 'episode' } });
    }
  };

  const isFavorite = (id) => {
    return store.favorites.some(fav => fav.id === id && fav.type === 'episode');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4" style={{
        fontFamily: "'Creepster', cursive",
        fontSize: "3rem",
        color: "#FFD90F",
        textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
      }}>
        The Simpsons Episodes
      </h1>
      <div className="row g-4">
        {store.episodes.map((episode) => (
          <div key={episode.id} className="col-md-6 col-lg-4">
            <div className="card h-100" style={{
              backgroundColor: "#87CEEB",
              border: "3px solid #000",
              borderRadius: "10px",
              transition: "transform 0.2s",
              position: "relative"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
            >
                <img
                  src={getEpisodeImage(episode.id)}
                  className="card-img-top"
                  alt={episode.name}
                  onError={(e) => {
                    const svg = `
                      <svg width="500" height="281" xmlns="http://www.w3.org/2000/svg">
                        <rect width="500" height="281" fill="#FFD90F"/>
                        <text x="250" y="140" font-size="24" text-anchor="middle" fill="#000" font-weight="bold">Episode ${episode.episode_number}</text>
                      </svg>
                    `;
                    e.target.src = `data:image/svg+xml;base64,${btoa(svg)}`;
                  }}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    backgroundColor: "#87CEEB"
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <Link
                    to={`/episode/${episode.id}`}
                    className="text-decoration-none"
                    style={{ flexGrow: 1 }}
                  >
                    <h5 className="card-title" style={{
                      fontWeight: "bold",
                      color: "#000",
                      fontSize: "1.1rem"
                    }}>
                      S{episode.season}E{episode.episode_number}: {episode.name}
                    </h5>
                    <p className="card-text" style={{ color: "#000", fontSize: "0.9rem" }}>
                      📅 Aired: {new Date(episode.airdate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="card-text" style={{
                      color: "#000",
                      fontSize: "0.85rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical"
                    }}>
                      {episode.synopsis}
                    </p>
                  </Link>
                  <div className="mt-auto pt-2 d-flex justify-content-end">
                    <button
                      className="btn btn-sm"
                      onClick={(e) => handleAddFavorite(episode, e)}
                      style={{
                        fontSize: "1.5rem",
                        background: isFavorite(episode.id) ? "#FFD90F" : "transparent",
                        border: "2px solid #000",
                        borderRadius: "50%",
                        width: "45px",
                        height: "45px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                        transition: "all 0.2s ease",
                        color: isFavorite(episode.id) ? "#FF0000" : "#000"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      {isFavorite(episode.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};
