import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AddRecipe from "../components/AddRecipe";

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
  const { getByText, getAllByPlaceholderText } = render(<AddRecipe />);

  const initialIngredientFields = getAllByPlaceholderText("Ingredient Name");
  const initialMeasurementFields = getAllByPlaceholderText("Measurement Unit");
  expect(initialIngredientFields.length).toBe(1);
  expect(initialMeasurementFields.length).toBe(1);

  const addIngredientButton = getByText("Add Ingredient");
  fireEvent.click(addIngredientButton);

  const updatedIngredientFields = getAllByPlaceholderText("Ingredient Name");
  const updatedMeasurementFields = getAllByPlaceholderText("Measurement Unit");
  expect(updatedIngredientFields.length).toBe(2);
  expect(updatedMeasurementFields.length).toBe(2);
});

it("removes ingredient field on button click", () => {
  const { getByText, getByPlaceholderText, queryByText } = render(
    <AddRecipe />
  );

  const initialIngredientField = getByPlaceholderText("Ingredient Name");
  const initialMeasurementField = getByPlaceholderText("Measurement Unit");
  expect(initialIngredientField).toBeInTheDocument();
  expect(initialMeasurementField).toBeInTheDocument();

  const addIngredientButton = getByText("Add Ingredient");
  fireEvent.click(addIngredientButton);

  const removeButton = getByText("Remove");
  expect(removeButton).toBeInTheDocument();

  fireEvent.click(removeButton);

  const updatedIngredientField = queryByText("Ingredient Name");
  const updatedMeasurementField = queryByText("Measurement Unit");
  expect(updatedIngredientField).toBeNull();
  expect(updatedMeasurementField).toBeNull();
});

// it("submits form data correctly", () => {
//   const { getByLabelText, getByText } = render(<AddRecipe />);

//   // Fill out the form
//   const titleInput = getByLabelText("Title:");
//   const cuisineInput = getByLabelText("Cuisine:");
//   const dietaryRequirementsInput = getByLabelText("Dietary Requirements:");
//   const instructionsInput = getByLabelText("Instructions:");
//   const prepTimeInput = getByLabelText("Prep Time (minutes):");
//   const cookingTimeInput = getByLabelText("Cooking Time (minutes):");
//   const servingsInput = getByLabelText("Servings:");

//   fireEvent.change(titleInput, { target: { value: "Delicious Pasta" } });
//   fireEvent.change(cuisineInput, { target: { value: "Italian" } });
//   fireEvent.change(dietaryRequirementsInput, {
//     target: { value: "Vegetarian" },
//   });
//   fireEvent.change(instructionsInput, {
//     target: { value: "Cook pasta and add sauce" },
//   });
//   fireEvent.change(prepTimeInput, { target: { value: "10" } });
//   fireEvent.change(cookingTimeInput, { target: { value: "20" } });
//   fireEvent.change(servingsInput, { target: { value: "2" } });

//   // Add an ingredient
//   const addIngredientButton = getByText("Add Ingredient");
//   fireEvent.click(addIngredientButton);

//   const ingredientNameInput = getByLabelText("Ingredient Name");
//   const measurementInput = getByLabelText("Measurement Unit");
//   fireEvent.change(ingredientNameInput, { target: { value: "Pasta" } });
//   fireEvent.change(measurementInput, { target: { value: "500g" } });

//   // Submit the form
//   const submitButton = getByText("Add");
//   fireEvent.click(submitButton);

//   // Verify the form data is submitted correctly
//   expect(submitButton).not.toBeInTheDocument(); // Form should disappear after submission
//   // You can add more assertions here to check if the submitted data is correct, e.g. by checking if it appears on the page or calling a function that verifies the data was sent to the server.
//   // For this example, let's assume the form data is displayed on the page after submission:
//   const submittedData = getByText("Delicious Pasta");
//   expect(submittedData).toBeInTheDocument();

//   // Check if the form fields are cleared after submission
//   expect(titleInput.value).toBe("");
//   expect(cuisineInput.value).toBe("");
//   expect(dietaryRequirementsInput.value).toBe("");
//   expect(instructionsInput.value).toBe("");
//   expect(prepTimeInput.value).toBe("");
//   expect(cookingTimeInput.value).toBe("");
//   expect(servingsInput.value).toBe("");
//   expect(ingredientNameInput.value).toBe("");
//   expect(measurementInput.value).toBe("");
// });
