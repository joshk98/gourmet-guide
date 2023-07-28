import React from "react";
import { render } from "@testing-library/react";
import Alert from "../components/Alert";

describe("Alert", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Alert />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("displays an error message", () => {
    const { getByText, asFragment } = render(<Alert message="Error!" />);

    expect(getByText(/Error/).textContent).toBe("Error!");
    expect(asFragment()).toMatchSnapshot();
  });

  it("displays an success message", () => {
    const { getByText, asFragment } = render(
      <Alert message="Success!" success />,
    );

    expect(getByText(/Success/).textContent).toBe("Success!");
    expect(asFragment()).toMatchSnapshot();
  });

  it("does not render an error or a success message if message props is empty", () => {
    const { asFragment } = render(<Alert message="" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
