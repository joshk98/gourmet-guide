import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faPlateWheat,
  faClock,
  faCircleExclamation,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "./PopUp";

import "../styles/recipe-card.css";

const RecipeCard = ({
  recipeId,
  title,
  cuisine,
  dietaryRequirements,
  prepTime,
  cookingTime,
  servings,
  ingredients,
  instructions,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    console.log("Opening popup");
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    console.log("Closing popup");
    setIsPopupOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/v1/recipes/${recipeId}`);
      // Handle success or update the state accordingly
    } catch (error) {
      console.error("Error deleting recipe:", error);
      // Handle error or show an error message
    }
  };

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
      <button
        className="recipe-card__learnMore"
        type="button"
        onClick={handleOpenPopup}
      >
        Learn More
      </button>
      <button className="recipe-card__addCookbook" type="button">
        Add to Cookbook
      </button>
      <button
        className="recipe-card__delete"
        type="button"
        onClick={handleDelete}
      >
        <FontAwesomeIcon icon={faTrash} /> Delete
      </button>

      {isPopupOpen && (
        <Popup
          recipe={{
            title,
            cuisine,
            dietaryRequirements,
            prepTime,
            cookingTime,
            servings,
            ingredients,
            instructions,
          }}
          handleClosePopup={handleClosePopup}
        />
      )}
    </div>
  );
};

export default RecipeCard;
