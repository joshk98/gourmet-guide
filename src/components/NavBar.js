import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../config/Auth";

import "../styles/navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cookbook">CookBook</Link>
        </li>
        <li>
          <Link to="/create-a-recipe">Create A Recipe</Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
