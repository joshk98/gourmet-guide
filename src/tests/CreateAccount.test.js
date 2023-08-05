import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateAccount from "../pages/CreateAccount";
import { signUp } from "../config/Firebase";

jest.mock("../config/Firebase", () => ({
  signUp: jest.fn(),
}));

describe("CreateAccount Component", () => {
  it("renders the sign-up form", () => {
    render(<CreateAccount />, { wrapper: MemoryRouter });

    const signUpHeader = screen.queryByText((content, element) => {
      return element.tagName.toLowerCase() === "h2" && content === "Sign Up";
    });

    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    expect(signUpHeader).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("creates an account successfully", async () => {
    signUp.mockResolvedValue(true);

    render(<CreateAccount />, { wrapper: MemoryRouter });

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(signUpButton);

    await screen.findByText("Account created successfully!");
    expect(signUp).toHaveBeenCalledWith("test@example.com", "testpassword");
  });

  it("displays an error message for existing account", async () => {
    signUp.mockResolvedValue(false);

    render(<CreateAccount />, { wrapper: MemoryRouter });

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(signUpButton);

    await screen.findByText("An account with this email already exists.");
    expect(signUp).toHaveBeenCalledWith("test@example.com", "testpassword");
  });
});
