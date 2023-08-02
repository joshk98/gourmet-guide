import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./PopUp";

const RecipeDetails = ({ recipeId }) => {
  const [recipe, setRecipe] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/recipes/${recipeId}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipe:", error);
      });
  }, [recipeId]);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button
        className="recipe-card__learnMore"
        type="button"
        onClick={handleOpenPopup}
      >
        Learn More
      </button>
      {showPopup && recipe && (
        <Popup recipe={recipe} handleClosePopup={handleClosePopup} />
      )}
    </div>
  );
};

export default RecipeDetails;
