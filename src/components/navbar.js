import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/home" activeClassName="active-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/cookbook" activeClassName="active-link">
            CookBook
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/add-recipe" activeClassName="active-link">
            Add A Recipe
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/login" activeClassName="active-link">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
