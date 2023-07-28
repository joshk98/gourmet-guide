import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../components/Home";

describe("Home", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <Router>
        <Home />
      </Router>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
