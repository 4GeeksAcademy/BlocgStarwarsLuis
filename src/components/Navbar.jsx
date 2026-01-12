import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemoveFavorite = (item) => {
    dispatch({ type: "remove_favorite", payload: item });
  };

  return (
    <nav className="navbar mb-3" style={{
      backgroundColor: "#87CEEB",
      borderBottom: "4px solid #000"
    }}>
      <div className="container">
        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none">
            <span className="navbar-brand mb-0 h1" style={{
              fontFamily: "'Creepster', cursive",
              fontSize: "2rem",
              color: "#FFD90F",
              textShadow: "3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
            }}>
              The Simpsons
            </span>
          </Link>
          <Link
            to="/"
            className="btn btn-sm"
            style={{
              backgroundColor: "#FFD90F",
              color: "#000",
              border: "3px solid #000",
              fontWeight: "bold"
            }}
          >
            👥 Characters
          </Link>
          <Link
            to="/episodes"
            className="btn btn-sm"
            style={{
              backgroundColor: "#FFD90F",
              color: "#000",
              border: "3px solid #000",
              fontWeight: "bold"
            }}
          >
            📺 Episodes
          </Link>
          <Link
            to="/locations"
            className="btn btn-sm"
            style={{
              backgroundColor: "#FFD90F",
              color: "#000",
              border: "3px solid #000",
              fontWeight: "bold"
            }}
          >
            📍 Locations
          </Link>
        </div>
        <div className="ml-auto">
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="favoritesDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                backgroundColor: "#FFD90F",
                color: "#000",
                border: "3px solid #000",
                fontWeight: "bold"
              }}
            >
              ❤️ Favorites <span className="badge" style={{
                backgroundColor: "#FF0000",
                color: "#fff"
              }}>{store.favorites.length}</span>
            </button>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="favoritesDropdown"
              style={{
                minWidth: "300px",
                backgroundColor: "#87CEEB",
                border: "3px solid #000"
              }}
            >
              {store.favorites.length === 0 ? (
                <li className="dropdown-item text-center" style={{ color: "#000" }}>
                  No favorites yet!
                </li>
              ) : (
                store.favorites.map((fav) => (
                  <li
                    key={fav.id}
                    className="dropdown-item d-flex justify-content-between align-items-center"
                    style={{
                      borderBottom: "2px solid #000",
                      padding: "10px"
                    }}
                  >
                    <Link
                      to={`/character/${fav.id}`}
                      className="text-decoration-none flex-grow-1"
                      style={{ color: "#000", fontWeight: "bold" }}
                    >
                      {fav.name}
                    </Link>
                    <button
                      className="btn btn-sm ms-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(fav);
                      }}
                      style={{
                        backgroundColor: "#FFD90F",
                        border: "2px solid #000",
                        color: "#000"
                      }}
                    >
                      🗑️
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};