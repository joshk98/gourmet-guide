import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faPlateWheat,
  faClock,
  faCircleExclamation,
  faTrash,
  faPlus,
  faCheck,
  faInfoCircle,
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
  const [addedToCookbook, setAddedToCookbook] = useState(false);
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

  useEffect(() => {
    const checkRecipeInCookbook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/favourites?recipeId=${recipeId}`,
        );

        if (response.data.some((entry) => entry.recipeId._id === recipeId)) {
          setAddedToCookbook(true);
        }
      } catch (error) {
        console.error("Error checking recipe in cookbook:", error);
      }
    };

    checkRecipeInCookbook();
  }, [recipeId]);

  const handleAddToCookbook = async () => {
    try {
      if (addedToCookbook) {
        const response = await axios.get(
          `http://localhost:4000/api/v1/favourites?recipeId=${recipeId}`,
        );

        if (response.data.length === 0) {
          console.error("Recipe not found in cookbook");
          return;
        }

        const cookbookEntryId = response.data[0]._id;
        await axios.delete(
          `http://localhost:4000/api/v1/favourites/${cookbookEntryId}`,
        );
        console.log("Recipe removed from cookbook");
        setAddedToCookbook(false);
      } else {
        const response = await axios.post(
          "http://localhost:4000/api/v1/favourites",
          {
            recipeId,
          },
        );

        console.log("Recipe added to cookbook:", response.data);
        setAddedToCookbook(true);
      }

      localStorage.setItem(
        `addedToCookbook_${recipeId}`,
        addedToCookbook ? "false" : "true",
      );
    } catch (error) {
      console.error("Error modifying recipe in cookbook:", error);
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
        <FontAwesomeIcon icon={faInfoCircle} /> Learn More
      </button>
      <button
        className={`recipe-card__addCookbook ${addedToCookbook ? "added" : ""}`}
        type="button"
        onClick={handleAddToCookbook}
      >
        {addedToCookbook ? (
          <span>
            <FontAwesomeIcon icon={faCheck} /> Added
          </span>
        ) : (
          <span>
            <FontAwesomeIcon icon={faPlus} /> Add to Cookbook
          </span>
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
