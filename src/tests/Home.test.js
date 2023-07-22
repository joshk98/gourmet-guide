import React from "react";
import { render } from "@testing-library/react";
import Home from "../components/Home";

describe("Home", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Home />);

    expect(asFragment()).toMatchSnapshot();
  });
});
