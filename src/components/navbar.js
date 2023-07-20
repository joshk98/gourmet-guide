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
          <NavLink exact to="/Cookbook" activeClassName="active-link">
            CookBook
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/Create-a-recipe" activeClassName="active-link">
            Create A Recipe
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
