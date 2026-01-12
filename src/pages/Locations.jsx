import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Locations = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch("https://thesimpsonsapi.com/api/locations?page=1"),
          fetch("https://thesimpsonsapi.com/api/locations?page=2"),
          fetch("https://thesimpsonsapi.com/api/locations?page=3")
        ]);

        const dataArrays = await Promise.all(responses.map(res => res.json()));

        const allLocations = dataArrays.flatMap(data => data.results);

        const validLocations = allLocations
          .filter(loc => loc.name && loc.name.trim() !== '')
          .slice(0, 60);

        dispatch({ type: "set_locations", payload: validLocations });
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    if (store.locations.length === 0) {
      fetchData();
    }
  }, []);

  const getLocationImage = (locationId) => {
    return `https://cdn.thesimpsonsapi.com/500/location/${locationId}.webp`;
  };

  const handleAddFavorite = (location, e) => {
    e.preventDefault();
    const isFavorite = store.favorites.some(fav => fav.id === location.id && fav.type === 'location');

    if (isFavorite) {
      dispatch({ type: "remove_favorite", payload: { id: location.id, type: 'location' } });
    } else {
      dispatch({ type: "add_favorite", payload: { ...location, type: 'location' } });
    }
  };

  const isFavorite = (id) => {
    return store.favorites.some(fav => fav.id === id && fav.type === 'location');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4" style={{
        fontFamily: "'Creepster', cursive",
        fontSize: "3rem",
        color: "#FFD90F",
        textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
      }}>
        Springfield Locations
      </h1>
      <div className="row g-4">
        {store.locations.map((location) => (
          <div key={location.id} className="col-md-6 col-lg-4">
            <div className="card h-100" style={{
              backgroundColor: "#87CEEB",
              border: "3px solid #000",
              borderRadius: "10px",
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
                  src={getLocationImage(location.id)}
                  className="card-img-top"
                  alt={location.name}
                  onError={(e) => {
                    const svg = `
                      <svg width="500" height="281" xmlns="http://www.w3.org/2000/svg">
                        <rect width="500" height="281" fill="#FFD90F"/>
                        <text x="250" y="140" font-size="24" text-anchor="middle" fill="#000" font-weight="bold">${location.name}</text>
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
                    to={`/location/${location.id}`}
                    className="text-decoration-none"
                    style={{ flexGrow: 1 }}
                  >
                    <h5 className="card-title" style={{
                      fontWeight: "bold",
                      color: "#000",
                      fontSize: "1.1rem",
                      marginBottom: "10px"
                    }}>
                      {location.name}
                    </h5>
                    {location.town && (
                      <p className="card-text mb-2" style={{ color: "#000", fontSize: "0.9rem" }}>
                        📍 {location.town}
                      </p>
                    )}
                    {location.use && (
                      <p className="card-text" style={{
                        color: "#000",
                        fontSize: "0.85rem",
                        backgroundColor: "#FFD90F",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        border: "2px solid #000",
                        display: "inline-block"
                      }}>
                        {location.use}
                      </p>
                    )}
                  </Link>
                  <div className="mt-auto pt-2 d-flex justify-content-end">
                    <button
                      className="btn btn-sm"
                      onClick={(e) => handleAddFavorite(location, e)}
                      style={{
                        fontSize: "1.5rem",
                        background: isFavorite(location.id) ? "#FFD90F" : "transparent",
                        border: "2px solid #000",
                        borderRadius: "50%",
                        width: "45px",
                        height: "45px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                        transition: "all 0.2s ease",
                        color: isFavorite(location.id) ? "#FF0000" : "#000"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      {isFavorite(location.id) ? '❤️' : '🤍'}
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
