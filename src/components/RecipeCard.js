import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faPlateWheat,
  faClock,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/recipe-card.css";

const RecipeCard = ({
  title,
  cuisine,
  dietaryRequirements,
  prepTime,
  cookingTime,
  servings,
}) => {
  return (
    <div className="recipe-card" data-testid="recipe-card">
      <div className="recipe-card__title">{title}</div>
      <div className="recipe-card__cuisine">
        <FontAwesomeIcon icon={faGlobe} /> {cuisine}
      </div>
      <div className="recipe-card__dietaryRequirements">
        <FontAwesomeIcon icon={faCircleExclamation} /> {dietaryRequirements}
      </div>
      <div className="recipe-card__servings">
        <FontAwesomeIcon icon={faPlateWheat} /> {servings} servings
      </div>
      <div className="recipe-card__totalTime">
        <FontAwesomeIcon icon={faClock} /> {+prepTime + +cookingTime} mins
      </div>
      <button className="recipe-card__learnMore" type="button">
        Learn More
      </button>
      <button className="recipe-card__addCookbook" type="button">
        Add to CookBook
      </button>
    </div>
  );
};

export default RecipeCard;
