import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "../styles/addrecipe.css";
import Alert from "./Alert";

const AddRecipe = () => {
  const initialState = {
    fields: {
      title: "",
      cuisine: "",
      dietaryRequirements: "",
      ingredients: [{ id: uuidv4(), name: "", measurement: "" }],
      instructions: "",
      prepTime: "",
      cookingTime: "",
      servings: "",
    },
    alert: {
      message: "",
      isSuccess: false,
    },
  };

  const [fields, setFields] = useState(initialState.fields);
  const [alert, setAlert] = useState(initialState.alert);

  const handleAddRecipe = (event) => {
    event.preventDefault();
    if (
      fields.title.trim() === "" ||
      fields.ingredients.length === 0 ||
      fields.instructions.trim() === "" ||
      fields.prepTime <= 0 ||
      fields.cookingTime <= 0 ||
      fields.servings <= 0
    ) {
      setAlert({
        message: "Please fill in all required fields.",
        isSuccess: false,
      });
      return;
    }

    setAlert({ message: "", isSuccess: false });

    axios
      .post("http://localhost:4000/api/v1/recipes", fields)
      .then(() =>
        setAlert({
          message: "Recipe Added",
          isSuccess: true,
        }),
      )
      .catch(() =>
        setAlert({
          message: "Server error. Please try again later.",
          isSuccess: false,
        }),
      );
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const handleAddIngredient = () => {
    setFields((prevFields) => ({
      ...prevFields,
      ingredients: [
        ...prevFields.ingredients,
        { id: "", name: "", measurement: "" },
      ],
    }));
  };

  const handleRemoveIngredient = (index) => {
    setFields((prevFields) => {
      const updatedIngredients = [...prevFields.ingredients];
      updatedIngredients.splice(index, 1);
      return { ...prevFields, ingredients: updatedIngredients };
    });
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...fields.ingredients];
    updatedIngredients[index][field] = value;
    setFields({ ...fields, ingredients: updatedIngredients });
  };

  return (
    <div className="add-recipe">
      <form onSubmit={handleAddRecipe}>
        <div>
          <label htmlFor="title">
            Title:
            <input
              type="text"
              id="title"
              name="title"
              value={fields.title}
              onChange={handleFieldChange}
              placeholder="Enter the title"
            />
          </label>
        </div>
        <div>
          <label htmlFor="cuisine">
            Cuisine:
            <select
              id="cuisine"
              name="cuisine"
              value={fields.cuisine}
              onChange={handleFieldChange}
            >
              <option value="" disabled>
                --Select a cuisine--
              </option>
              <option value="Italian">Italian</option>
              <option value="Chinese">Chinese</option>
              <option value="Japanese">Japanese</option>
              <option value="Indian">Indian</option>
              <option value="Mexican">Mexican</option>
              <option value="French">French</option>
              <option value="Thai">Thai</option>
              <option value="Spanish">Spanish</option>
              <option value="Middle Eastern">Middle Eastern</option>
              <option value="Korean">Korean</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="dietaryRequirements">
            Dietary Requirements:
            <select
              id="dietaryRequirements"
              name="dietaryRequirements"
              value={fields.dietaryRequirements}
              onChange={handleFieldChange}
            >
              <option value="" disabled>
                --Select a dietary requirement--
              </option>
              <option value="None">None</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Gluten-Free">Gluten-Free</option>
              <option value="Dairy-Free">Dairy-Free</option>
              <option value="Pescatarian">Pescatarian</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="ingredients">
            Ingredients:
            {fields.ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="ingredient-field">
                <input
                  id={`ingredientName-${index}`}
                  placeholder="Ingredient Name"
                  type="text"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                />
                <input
                  id={`measurement-${index}`}
                  placeholder="Measurement Unit"
                  type="text"
                  value={ingredient.measurement}
                  onChange={(e) =>
                    handleIngredientChange(index, "measurement", e.target.value)
                  }
                />
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient}>
              Add Ingredient
            </button>
          </label>
        </div>

        <div>
          <label htmlFor="instructions">
            Instructions:
            <textarea
              id="instructions"
              name="instructions"
              value={fields.instructions}
              onChange={handleFieldChange}
              placeholder="Enter the instructions"
            />
          </label>
        </div>
        <div>
          <label htmlFor="prepTime">
            Prep Time (minutes):
            <input
              type="number"
              id="prepTime"
              name="prepTime"
              value={fields.prepTime}
              onChange={handleFieldChange}
              placeholder="Enter the prep time"
            />
          </label>
        </div>
        <div>
          <label htmlFor="cookingTime">
            Cooking Time (minutes):
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={fields.cookingTime}
              onChange={handleFieldChange}
              placeholder="Enter the cooking time"
            />
          </label>
        </div>
        <div>
          <label htmlFor="servings">
            Servings:
            <input
              type="number"
              id="servings"
              name="servings"
              value={fields.servings}
              onChange={handleFieldChange}
              placeholder="Enter the number of servings"
            />
          </label>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <Alert message={alert.message} success={alert.isSuccess} />
    </div>
  );
};

export default AddRecipe;
