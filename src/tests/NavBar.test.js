import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../components/NavBar";

describe("NavBar", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <Router>
        <NavBar />
      </Router>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
