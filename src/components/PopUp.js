import React from "react";
import { Link } from "react-router-dom";
import "../styles/popup.css";

const Popup = ({ recipe, handleClosePopup }) => {
  if (!recipe) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>{recipe.title}</h2>
        <p>Cuisine: {recipe.cuisine}</p>
        <p>Dietary Requirements: {recipe.dietaryRequirements}</p>
        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name} - {ingredient.measurement.value}{" "}
              {ingredient.measurement.metric}
            </li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <p>{recipe.instructions}</p>
        <p>Prep Time: {recipe.prepTime} minutes</p>
        <p>Cooking Time: {recipe.cookingTime} minutes</p>
        <p>Servings: {recipe.servings}</p>
        <button
          className="popup__closeButton"
          type="button"
          onClick={handleClosePopup}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
