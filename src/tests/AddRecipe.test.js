import React from "react";
import { render } from "@testing-library/react";
import AddRecipe from "../components/AddRecipe";

describe("AddRecipe", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<AddRecipe />);

    expect(asFragment()).toMatchSnapshot();
  });
});
