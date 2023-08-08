import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import "../styles/cookbook.css";

const Cookbook = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = () => {
    axios
      .get("http://localhost:4000/api/v1/favourites")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favourite recipes:", error);
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleRemove = (recipeId) => {
    axios
      .delete(`http://localhost:4000/api/v1/favourites/${recipeId}`)
      .then(() => {
        fetchRecipes();
      })
      .catch((error) => {
        console.error("Error removing recipe:", error);
      });
  };

  const [expandedGroceryList, setExpandedGroceryList] = useState({});
  const toggleGroceryList = (recipeId) => {
    setExpandedGroceryList((prevState) => ({
      ...prevState,
      [recipeId]: !prevState[recipeId],
    }));
  };

  return (
    <div className="cookbook-container">
      {recipes.map((recipe) => (
        <div key={uuidv4()} className="recipe">
          <div className="recipe-row">
            <h2 className="recipe-title">{recipe.recipeId.title}</h2>
            <div className="cookbook-button">
              <button
                type="button"
                className="list-button"
                onClick={() => toggleGroceryList(recipe._id)}
              >
                {expandedGroceryList[recipe._id] ? "Hide List" : "Show List"}
              </button>
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemove(recipe._id)}
              >
                Remove
              </button>
            </div>
          </div>
          <div className="grocery-list">
            <ul>
              {expandedGroceryList[recipe._id]
                ? recipe.recipeId.ingredients
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((ingredient) => (
                      <li key={uuidv4()}>
                        {ingredient.measurement.value}{" "}
                        {ingredient.measurement.metric} {ingredient.name}
                      </li>
                    ))
                : null}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cookbook;
