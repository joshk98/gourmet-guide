import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/cookbook.css";

const Cookbook = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/recipes")
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("Error fetching recipes:", error));
  });
  return (
    <div className="cookbook">
      <div className="list">
        <h2>My Recipes</h2>
        <ul className="vertical-list">
          {recipes.map((recipe) => (
            <li key={recipe.id}>{recipe.name}</li>
          ))}
        </ul>
        <Button />
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

const Button = () => {
  return (
    <div className="button">
      <button type="button">Delete Selected Recipe</button>
    </div>
  );
};

export default Cookbook;
