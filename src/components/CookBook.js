import React from "react";
import grocerylist from "./GroceryList.js";
import "../styles/cookbook.css";

const Cookbook = () => {
  return (
    <div className="cookbook">
      <div className="list">
        <h2>My Recipes</h2>
        <ul className="vertical-list">
          <li>Recipe 1</li>
          <li>Recipe 2</li>
          <li>Recipe 3</li>
          <li>Recipe 4</li>
        </ul>
      </div>
      <Ingredients />
      <Instructions />
    </div>
  );
};

const Ingredients = () => {
  return (
    <div className="ingredients">
      <div className="ingredients-list">
        <h2>Ingredients</h2>
        <ul className="vertical-list">
          <li>Ingredient 1</li>
          <li>Ingredient 2</li>
          <li>Ingredient 3</li>
          <li>Ingredient 4</li>
        </ul>
      </div>
    </div>
  );
};

const Instructions = () => {
  return (
    <div className="instructions">
      <h2>Instructions</h2>
      <ul className="vertical-list">
        <li>Step 1</li>
        <li>Step 2</li>
        <li>Step 3</li>
        <li>Step 4</li>
      </ul>
    </div>
  );
};

export default Cookbook;
