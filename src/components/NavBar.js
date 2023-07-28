import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../config/Auth";

import "../styles/navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-links-item" id="navbar-links-item__name">
        Gourmet Guide
      </div>
      <ul className="navbar-links">
        <li className="navbar-links-item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="navbar-links-item">
          <NavLink to="/cookbook">CookBook</NavLink>
        </li>
        <li className="navbar-links-item">
          <NavLink to="/create-a-recipe">Create A Recipe</NavLink>
        </li>
        <li className="navbar-links-item">
          {isLoggedIn ? (
            <NavLink to="/" onClick={handleLogout}>
              Logout
            </NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
