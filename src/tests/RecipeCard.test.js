import React from "react";
import { render } from "@testing-library/react";
import RecipeCard from "../components/RecipeCard";

describe("RecipeCard", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<RecipeCard />);

    expect(asFragment()).toMatchSnapshot();
  });
});
