import React, { useState } from "react";
import axios from "axios";
import "../styles/addrecipe.css";
import Alert from "./Alert";

const AddRecipe = () => {
  const initialState = {
    fields: {
      title: "",
      cuisine: "",
      dietaryRequirements: "",
      ingredients: [{ name: "", measurement: { value: "", metric: "" } }],
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
        { name: "", measurement: { value: "", metric: "" } },
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
    if (field === "measurement") {
      if (/^\d*\.?\d*$/.test(value) || value === "") {
        updatedIngredients[index].measurement.value = value;
      }
    } else if (field === "metric") {
      updatedIngredients[index].measurement.metric = value;
    } else {
      updatedIngredients[index][field] = value;
    }

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
              maxLength={32}
              required
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
              required
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
              required
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
              <div key={ingredient} className="ingredient-field">
                <input
                  id={`ingredientName-${index}`}
                  type="text"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  required
                />
                <div className="measurement-metric-container">
                  <input
                    id={`measurement-${index}`}
                    placeholder="#"
                    type="number"
                    value={ingredient.measurement.value}
                    onChange={(e) =>
                      handleIngredientChange(
                        index,
                        "measurement",
                        e.target.value,
                      )
                    }
                    required
                    className="measurement-input"
                  />
                  <select
                    id={`metric-${index}`}
                    value={ingredient.measurement.metric}
                    onChange={(e) =>
                      handleIngredientChange(index, "metric", e.target.value)
                    }
                    required
                    className="metric-dropdown"
                  >
                    <option value="" disabled>
                      --Select a metric--
                    </option>
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="tbsp">tbsp</option>
                    <option value="tsp">tsp</option>
                  </select>
                </div>
                <div>
                  {index !== 0 && (
                    <button
                      className="form-button"
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              className="form-button"
              type="button"
              onClick={handleAddIngredient}
            >
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
              required
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
              max={9999}
              required
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
              max={9999}
              required
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
              max={9999}
              required
            />
          </label>
        </div>
        <div>
          <button className="form-button" type="submit">
            Add
          </button>
        </div>
      </form>
      <Alert message={alert.message} success={alert.isSuccess} />
    </div>
  );
};

export default AddRecipe;
