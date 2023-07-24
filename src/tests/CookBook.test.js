import React from "react";
import { render } from "@testing-library/react";
import CookBook from "../components/CookBook";

describe("CookBook", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<CookBook />);

    expect(asFragment()).toMatchSnapshot();
  });
});
