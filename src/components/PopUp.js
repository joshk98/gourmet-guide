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
        <p>
          <strong>Cuisine:</strong> {recipe.cuisine}
        </p>
        <p>
          {" "}
          <strong>Dietary Requirements:</strong> {recipe.dietaryRequirements}
        </p>
        <h3>Ingredients:</h3>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.name}>
              {ingredient.measurement && (
                <span>
                  &nbsp;{ingredient.measurement.value}
                  {ingredient.measurement.metric} {ingredient.name}
                </span>
              )}
            </li>
          ))}
        </ul>
        <h3>Instructions:</h3>
        <p className="popup-instructions">{recipe.instructions}</p>
        <p>
          <strong>Prep Time:</strong> {recipe.prepTime} minutes
        </p>
        <p>
          <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
        </p>
        <p>
          <strong>Servings:</strong> {recipe.servings}
        </p>
        <button
          className="popup-closeButton"
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
