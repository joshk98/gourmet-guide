import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./PopUp";
import "../styles/cookbook.css";

const Cookbook = () => {
  const [cookbookRecipes, setCookbookRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  useEffect(() => {
    async function fetchCookbookRecipes() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/favourites",
        );
        const favourites = response.data;
        const recipeTitles = favourites.map((fav) => fav.recipeId.title);
        setCookbookRecipes(recipeTitles);
      } catch (error) {
        console.error("Error fetching cookbook recipes:", error);
      }
    }

    fetchCookbookRecipes();
  }, []);

  const handleKeyDown = (event, recipe) => {
    if (event.key === "Enter") {
      setSelectedRecipe(recipe);
    }
  };

  const handleOpenPopUp = (recipe) => {
    setSelectedRecipe(recipe);
    setIsPopUpOpen(true);
  };

  return (
    <div className="cookbook">
      <div className="list">
        <h2>My Recipes</h2>

        <ul className="vertical-list">
          {cookbookRecipes.map((recipe, index) => (
            <li key={recipe}>
              <button
                type="button"
                className={
                  selectedRecipe && selectedRecipe === recipe ? "selected" : ""
                }
                onClick={() => handleOpenPopUp(recipe)}
                onKeyDown={(e) => handleKeyDown(e, recipe)}
              >
                {recipe}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {isPopUpOpen && selectedRecipe && (
        <Popup
          recipe={selectedRecipe}
          handleClose={() => setIsPopUpOpen(false)}
        />
      )}
    </div>
  );
};

export default Cookbook;
