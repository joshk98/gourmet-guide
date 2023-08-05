import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AddRecipe from "../components/AddRecipe";
import axios from "axios";

describe("AddRecipe", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<AddRecipe />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("updates form input correctly - Title", () => {
    const { getByLabelText } = render(<AddRecipe />);
    const titleInput = getByLabelText("Title:");
    fireEvent.change(titleInput, { target: { value: "Pizza Margherita" } });

    expect(titleInput.value).toBe("Pizza Margherita");
  });

  it("updates form input correctly - Cuisine", () => {
    const { getByLabelText } = render(<AddRecipe />);
    const cuisineSelect = getByLabelText("Cuisine:");
    fireEvent.change(cuisineSelect, { target: { value: "Italian" } });

    expect(cuisineSelect.value).toBe("Italian");
  });

  it("updates form input correctly - Dietary Requirements", () => {
    const { getByLabelText } = render(<AddRecipe />);
    const dietaryRequirementsSelect = getByLabelText("Dietary Requirements:");
    fireEvent.change(dietaryRequirementsSelect, { target: { value: "None" } });

    expect(dietaryRequirementsSelect.value).toBe("None");
  });

  it("populates ingredient fields correctly", async () => {
    const { getByText, getAllByRole } = render(<AddRecipe />);

    const addIngredientButton = getByText("Add Ingredient");
    fireEvent.click(addIngredientButton);

    const ingredientNameInput = getAllByRole("textbox")[0];
    const measurementValueInput = getAllByRole("spinbutton")[0];
    const measurementMetricSelect = document.getElementById("metric-0");

    fireEvent.change(ingredientNameInput, { target: { value: "Tomatoes" } });
    fireEvent.change(measurementValueInput, { target: { value: "200" } });
    fireEvent.change(measurementMetricSelect, { target: { value: "g" } });

    await waitFor(() => {
      expect(ingredientNameInput.value).toBe("Tomatoes");
      expect(measurementValueInput.value).toBe("200");
      expect(measurementMetricSelect.value).toBe("g");
    });
  });

  it("updates form input correctly - Instructions", () => {
    const { getByLabelText } = render(<AddRecipe />);
    const instructionsTextarea = getByLabelText("Instructions:");
    fireEvent.change(instructionsTextarea, {
      target: {
        value:
          "1. Preheat the oven to 220°C.\n2. Roll out the pizza dough.\n3. Spread tomato sauce on the dough.\n4. Add slices of mozzarella cheese and fresh basil leaves.\n5. Bake in the oven for 12-15 minutes or until the crust is golden and the cheese is bubbly and slightly browned.",
      },
    });

    expect(instructionsTextarea.value).toBe(
      "1. Preheat the oven to 220°C.\n2. Roll out the pizza dough.\n3. Spread tomato sauce on the dough.\n4. Add slices of mozzarella cheese and fresh basil leaves.\n5. Bake in the oven for 12-15 minutes or until the crust is golden and the cheese is bubbly and slightly browned."
    );
  });

  it("updates form input correctly - Prep Time", () => {
    const { getByLabelText } = render(<AddRecipe />);
    const prepTimeInput = getByLabelText("Prep Time (minutes):");
    fireEvent.change(prepTimeInput, { target: { value: "20" } });

    expect(prepTimeInput.value).toBe("20");
  });

  it("updates form input correctly - Cooking Time", () => {
    const { getByLabelText } = render(<AddRecipe />);
    const cookingTimeInput = getByLabelText("Cooking Time (minutes):");
    fireEvent.change(cookingTimeInput, { target: { value: "15" } });

    expect(cookingTimeInput.value).toBe("15");
  });

  it("updates form input correctly - Servings", () => {
    const { getByLabelText } = render(<AddRecipe />);
    const servingsInput = getByLabelText("Servings:");
    fireEvent.change(servingsInput, { target: { value: "2" } });

    expect(servingsInput.value).toBe("2");
  });
});

it("adds new ingredient field on button click", () => {
  const { getByText, getAllByRole } = render(<AddRecipe />);

  const addIngredientButton = getByText("Add Ingredient");
  fireEvent.click(addIngredientButton);

  const updatedIngredientFields = getAllByRole("textbox", { name: "" });
  expect(updatedIngredientFields.length).toBe(2);
});

it("removes ingredient field on button click", () => {
  const { getByText, queryByLabelText } = render(<AddRecipe />);

  const addIngredientButton = getByText("Add Ingredient");
  fireEvent.click(addIngredientButton);

  const removeButton = getByText("Remove");
  expect(removeButton).toBeInTheDocument();

  fireEvent.click(removeButton);

  const updatedIngredientField = queryByLabelText("Ingredient Name:");
  expect(updatedIngredientField).toBeNull();
});

it("submits the form and shows success alert", async () => {
  const { getByLabelText, getByText } = render(<AddRecipe />);

  const titleInput = getByLabelText("Title:");
  fireEvent.change(titleInput, { target: { value: "Pizza Margherita" } });
  const cuisineSelect = getByLabelText("Cuisine:");
  fireEvent.change(cuisineSelect, { target: { value: "Italian" } });
  const dietaryRequirementsSelect = getByLabelText("Dietary Requirements:");
  fireEvent.change(dietaryRequirementsSelect, { target: { value: "None" } });
  const instructionsTextarea = getByLabelText("Instructions:");
  fireEvent.change(instructionsTextarea, {
    target: {
      value:
        "1. Preheat the oven to 220°C.\n2. Roll out the pizza dough.\n3. Spread tomato sauce on the dough.\n4. Add slices of mozzarella cheese and fresh basil leaves.\n5. Bake in the oven for 12-15 minutes or until the crust is golden and the cheese is bubbly and slightly browned.",
    },
  });
  const prepTimeInput = getByLabelText("Prep Time (minutes):");
  fireEvent.change(prepTimeInput, { target: { value: "20" } });
  const cookingTimeInput = getByLabelText("Cooking Time (minutes):");
  fireEvent.change(cookingTimeInput, { target: { value: "15" } });
  const servingsInput = getByLabelText("Servings:");
  fireEvent.change(servingsInput, { target: { value: "2" } });

  const addButton = getByText("Add");
  jest.spyOn(axios, "post").mockResolvedValue({});
  fireEvent.click(addButton);

  await waitFor(() => {
    const successAlert = getByText("Recipe Added", {
      exact: false,
    });
    expect(successAlert).toBeInTheDocument();
  });
  axios.post.mockRestore();
});

it("shows server error alert when submission fails", async () => {
  const { getByText } = render(<AddRecipe />);

  jest.spyOn(axios, "post").mockRejectedValue(new Error("Server error"));

  const addButton = getByText("Add");
  fireEvent.click(addButton);

  await waitFor(() => {
    const errorAlert = getByText("Server error. Please try again later.", {
      exact: false,
    });
    expect(errorAlert).toBeInTheDocument();
  });

  axios.post.mockRestore();
});
