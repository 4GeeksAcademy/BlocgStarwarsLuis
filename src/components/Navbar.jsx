import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store.js";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-dark mb-0 px-4 py-3" style={{ backgroundColor: "#111111", borderBottom: "1px solid #333" }}>
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                   
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/500px-Star_Wars_Logo.svg.png"
                        alt="Star Wars"
                        height="40"
                    />
                </Link>

                <div className="ml-auto">
                    <div className="dropdown">
                        <button
                            className="btn btn-warning dropdown-toggle d-flex align-items-center gap-2"
                            type="button"
                            id="favoritesDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <span>Favorites</span>
                            <span className="badge bg-secondary text-light rounded-pill">
                                {store.favorites ? store.favorites.length : 0}
                            </span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="favoritesDropdown">
                            {!store.favorites || store.favorites.length === 0 ? (
                                <li className="dropdown-item text-center text-muted">Empty</li>
                            ) : (
                                store.favorites.map((fav, index) => (
                                    <li key={index} className="dropdown-item d-flex justify-content-between align-items-center gap-3">
                                        <Link to={`/detail/${fav.type}/${fav.uid}`} className="text-light text-decoration-none text-uppercase" style={{ fontSize: "14px" }}>
                                            {fav.name}
                                        </Link>
                                        <i
                                            className="fa-solid fa-trash text-danger"
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                actions.toggleFavorite(fav); 
                                            }}
                                        ></i>
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