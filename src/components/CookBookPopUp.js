import React from "react";
import "../styles/popup.css";

const CookBookPopUp = ({ recipe, handleClosePopup }) => {
  if (!recipe) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2 className="popup-title">{recipe.title}</h2>
        <div className="popup-details">
          <p className="popup-cuisine">
            <strong>Cuisine:</strong> {recipe.cuisine}
          </p>
          <p className="popup-dietary">
            <strong>Dietary Requirements:</strong> {recipe.dietaryRequirements}
          </p>
        </div>
        <h3 className="popup-subtitle">Ingredients:</h3>
        <ul className="popup-ingredients">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.name} className="popup-ingredient">
              <span className="popup-ingredient-details">
                {ingredient.measurement && (
                  <span className="popup-ingredient-measurement">
                    {ingredient.measurement.value}
                    {ingredient.measurement.metric}{" "}
                  </span>
                )}
                {ingredient.name}
              </span>
            </li>
          ))}
        </ul>
        <h3 className="popup-subtitle">Instructions:</h3>
        <p className="popup-instructions">{recipe.instructions}</p>
        <p className="popup-preptime">
          <strong>Prep Time:</strong> {recipe.prepTime} minutes
        </p>
        <p className="popup-cookingtime">
          <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
        </p>
        <p className="popup-servings">
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

export default CookBookPopUp;
