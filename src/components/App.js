import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddRecipe from "./AddRecipe";
import NavBar from "./NavBar";
import CookBook from "./CookBook";
import CreateAccount from "../pages/CreateAccount";
import Login from "../pages/Login";

import "../styles/app.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="app">
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/cookbook" element={<CookBook />} />
          <Route path="/create-a-recipe" element={<AddRecipe />} />
          <Route
            path="/login"
            element={
              <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            }
          />
          <Route path="/sign-up" element={<CreateAccount />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
