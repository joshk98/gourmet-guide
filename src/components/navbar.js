import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/cookbook">CookBook</a>
        </li>
        <li>
          <a href="/create-a-recipe">Create A Recipe</a>
        </li>
        <li>
          <a href="/Login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
