import React from "react";
import { render } from "@testing-library/react";
import SideBar from "../components/SideBar";

describe("SideBar", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<SideBar />);

    expect(asFragment()).toMatchSnapshot();
  });
});
