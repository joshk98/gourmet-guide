import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddRecipe from "./AddRecipe";
import "../styles/app.css";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/create-a-recipe" element={<AddRecipe />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
