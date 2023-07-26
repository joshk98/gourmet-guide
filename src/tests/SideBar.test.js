import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "../components/SideBar";

describe("SideBar", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <Router>
        <SideBar />
      </Router>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
