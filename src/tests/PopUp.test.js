import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Popup from "../components/PopUp";

describe("Popup Component", () => {
  const mockRecipe = {
    title: "Delicious Recipe",
    cuisine: "Italian",
    dietaryRequirements: "Vegetarian",
    ingredients: [
      { name: "Tomatoe Sauce", measurement: { value: 200, metric: "ml" } },
    ],
    instructions: "Step 1: Do this\nStep 2: Do that",
    prepTime: 15,
    cookingTime: 30,
    servings: 4,
  };

  const handleClosePopup = jest.fn();

  test("Renders the Popup with recipe details", () => {
    const { container } = render(
      <Popup recipe={mockRecipe} handleClosePopup={handleClosePopup} />
    );

    expect(container.querySelector(".popup-title")).toHaveTextContent(
      "Delicious Recipe"
    );
    const cuisineElement = container.querySelector(".popup-cuisine");
    expect(cuisineElement).toHaveTextContent("Cuisine:");
    expect(cuisineElement).toHaveTextContent("Italian");

    const dietaryRequirementsElement =
      container.querySelector(".popup-dietary");
    expect(dietaryRequirementsElement).toHaveTextContent(
      "Dietary Requirements:"
    );
    expect(dietaryRequirementsElement).toHaveTextContent("Vegetarian");

    const ingredientsList = container.querySelectorAll(
      ".popup-ingredient span"
    );
    expect(ingredientsList[0]).toHaveTextContent("200mlTomatoe Sauce");

    const instructionsElement = container.querySelector(".popup-instructions");
    expect(instructionsElement).toHaveTextContent("Step 1: Do this");
    expect(instructionsElement).toHaveTextContent("Step 2: Do that");

    const prepTimeElement = container.querySelector(".popup-preptime");
    expect(prepTimeElement).toHaveTextContent("Prep Time:");
    expect(prepTimeElement).toHaveTextContent("15 minutes");

    const cookingTimeElement = container.querySelector(".popup-cookingtime");
    expect(cookingTimeElement).toHaveTextContent("Cooking Time:");
    expect(cookingTimeElement).toHaveTextContent("30 minutes");

    const servingsElement = container.querySelector(".popup-servings");
    expect(servingsElement).toHaveTextContent("Servings:");
    expect(servingsElement).toHaveTextContent("4");
  });

  test("Closes the Popup when close button is clicked", () => {
    render(<Popup recipe={mockRecipe} handleClosePopup={handleClosePopup} />);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(handleClosePopup).toHaveBeenCalled();
  });

  test("Does not render when recipe is null", () => {
    render(<Popup recipe={null} handleClosePopup={() => {}} />);

    expect(screen.queryByText("Delicious Recipe")).not.toBeInTheDocument();
  });
});
