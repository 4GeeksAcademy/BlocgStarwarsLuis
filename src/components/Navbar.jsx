import React from "react";
import { Link } from "react-router-dom";
import starWarsLogo from "../assets/img/iconosw.png";
import { Favorites } from "./Favorites";

// ... el resto del componente

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <img
            src={starWarsLogo}
            alt="Star Wars Logo"
            style={{ height: "100px", marginRight: "10px" }}
          />
        </Link>
        <div className="ml-auto">
          <Link to="/demo">
            <Favorites />
          </Link>
        </div>
      </div>
    </nav>
  );
};
