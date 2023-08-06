import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faPlateWheat,
  faClock,
  faCircleExclamation,
  faTrash,
  faCheck,
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
  handleDelete,
  setRefresh,
}) => {
  const [addedToCookbook, setAddedToCookbook] = useState(() => {
    const localStorageValue = localStorage.getItem(
      `addedToCookbook_${recipeId}`,
    );
    return localStorageValue === "true";
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    console.log("Opening popup");
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    console.log("Closing popup");
    setIsPopupOpen(false);
  };

  const onDeleteClick = async () => {
    try {
      await handleDelete(recipeId);
      setRefresh(true);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleAddToCookbook = async () => {
    try {
      if (addedToCookbook) {
        await axios.delete(
          `http://localhost:4000/api/v1/favourites/${recipeId}`,
        );
        console.log("Recipe removed from cookbook");
      } else {
        await axios.post("http://localhost:4000/api/v1/favourites", {
          recipeId,
        });
        console.log("Recipe added to cookbook");
      }
      setAddedToCookbook(!addedToCookbook);
      localStorage.setItem(
        `addedToCookbook_${recipeId}`,
        !addedToCookbook ? "true" : "false",
      );
    } catch (error) {
      console.error("Error adding/removing recipe from cookbook:", error);
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
      <button
        className="recipe-card__addCookbook"
        type="button"
        onClick={handleAddToCookbook}
        disabled={!addedToCookbook}
      >
        {addedToCookbook ? (
          <span>
            Added <FontAwesomeIcon icon={faCheck} />
          </span>
        ) : (
          <span>Add to Cookbook</span>
        )}
      </button>
      <button
        className="recipe-card__delete"
        type="button"
        onClick={onDeleteClick}
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
