import React from "react";

import "../styles/recipe-card.css";

const RecipeCard = ({ title, cuisine, prepTime, cookingTime, servings }) => {
  return (
    <div className="recipe-card" data-testid="recipe-card">
      <div className="recipe-card__title">{title}</div>
      <div className="recipe-card__cuisine">{cuisine}</div>
      <div className="recipe-card__totalTime">
        {prepTime + cookingTime} mins
      </div>
      <div className="recipe-card__servings">{servings} servings</div>
      <button className="property-card__learnMore" type="button">
        Learn More
      </button>
      <button className="property-card__addCookbook" type="button">
        Add to Cookbook
      </button>
    </div>
  );
};

export default RecipeCard;
