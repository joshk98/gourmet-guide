import React from "react";

import "../styles/navbar.css";

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/cookbook">CookBook</a>
        </li>
        <li>
          <a href="/create-a-recipe">Create A Recipe</a>
        </li>
        <li>
          {isLoggedIn ? <a href="/">Logout</a> : <a href="/login">Login</a>}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
