import React from "react";
import "../styles/cookbook.css";

const Cookbook = () => {
  return (
    <div className="cookbook">
      <div className="list">
        <h2>My Recipes</h2>
        <ul className="vertical-list">
          <li>Recipe 1</li>
          <li>Recipe 3</li>
          <li>Recipe 3</li>
        </ul>
      </div>
    </div>
  );
};

const Ingredients = () => {
  return (
    <div className="ingredients-list">
      <div className="list">
        <li>Ingredient 2</li>
        <li>Ingredient 2</li>
        <li>Ingredient 2</li>
      </div>
    </div>
  );
};

export default Cookbook;
