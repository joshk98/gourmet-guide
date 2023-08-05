import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import "../styles/cookbook.css";

const Cookbook = () => {
  const [cookbookRecipes, setCookbookRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    async function fetchCookbookRecipes() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/favourites"
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

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/api/v1/recipes")
  //     .then((response) => setRecipes(response.data))
  //     .catch((error) => console.error("Error fetching recipes:", error));
  // }, []);

  // const handleDelete = () => {
  //   if (selectedRecipe) {
  //     axios
  //       .delete(`/api/recipes/${selectedRecipe.id}`)
  //       .then(() => {
  //         setRecipes(
  //           recipes.filter((recipe) => recipe.id !== selectedRecipe.id),
  //         );
  //         setSelectedRecipe(null);
  //       })
  //       .catch((error) => console.error("Error deleting recipe:", error));
  //   }
  // };

  const handleKeyDown = (event, recipe) => {
    if (event.key === "Enter") {
      setSelectedRecipe(recipe);
      // handleDelete();
    }
  };

  return (
    <div className="cookbook">
      <div className="list">
        <h2>My Recipes</h2>{" "}
        <ul className="vertical-list">
          {cookbookRecipes.map((recipe, index) => (
            <li key={recipe}>
              {" "}
              <button
                type="button"
                className={
                  selectedRecipe && selectedRecipe.id === recipe.id
                    ? "selected"
                    : ""
                }
                onClick={() => setSelectedRecipe(recipe)}
                onKeyDown={(e) => handleKeyDown(e, recipe)}
              >
                {recipe.name}
              </button>
              {recipe}
            </li>
          ))}
        </ul>
        {/* <Button onDelete={handleDelete} /> */}
      </div>
      <Ingredients />
      <Instructions />
    </div>
  );
};

const Ingredients = () => {
  return (
    <div className="ingredients">
      <div className="ingredients-list">
        <h2>Ingredients</h2>
        <ul className="vertical-list">
          <li>Ingredient 1</li>
          <li>Ingredient 2</li>
          <li>Ingredient 3</li>
          <li>Ingredient 4</li>
        </ul>
      </div>
    </div>
  );
};

const Instructions = () => {
  return (
    <div className="instructions">
      <h2>Instructions</h2>
      <ul className="vertical-list">
        <li>Step 1</li>
        <li>Step 2</li>
        <li>Step 3</li>
        <li>Step 4</li>
      </ul>
    </div>
  );
};

export default Cookbook;
