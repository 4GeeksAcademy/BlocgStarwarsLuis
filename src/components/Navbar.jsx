import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store.js";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-dark bg-dark mb-4 px-5">
            <Link to="/">
                <img 
                    src="https://pngimg.com/uploads/star_wars/star_wars_PNG34.png" 
                    alt="Star Wars Logo" 
                    style={{ width: "70px", filter: "invert(1)" }} 
                />
            </Link>
            <div className="dropdown">
                <button 
                    className="btn btn-warning dropdown-toggle position-relative" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                >
                    Favorites
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {store.favorites.length}
                    </span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end bg-dark border-secondary" aria-labelledby="dropdownMenuButton" style={{ width: "240px" }}>
                    {store.favorites.length === 0 ? (
                        <li className="dropdown-item text-center text-muted py-2">(Empty)</li>
                    ) : (
                        store.favorites.map((fav, index) => (
                            <li key={index} className="dropdown-item d-flex justify-content-between align-items-center text-light py-2">
                                <Link 
                                    to={`/detail/${fav.type}/${fav.uid}`} 
                                    className="text-decoration-none text-light text-truncate me-2" 
                                    style={{ maxWidth: "160px" }}
                                >
                                    {fav.name}
                                </Link>
                                <i 
                                    className="fas fa-trash-alt text-danger" 
                                    style={{ cursor: "pointer" }}
                                    onClick={() => actions.toggleFavorite(fav)}
                                ></i>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    );
};