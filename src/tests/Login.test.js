import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Login";
import * as firebaseMock from "firebase-mock";

describe("Login", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<Login />, { wrapper: MemoryRouter });
    expect(asFragment()).toMatchSnapshot();
  });

  it("allows inputting username and password", () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <Login setIsLoggedIn={() => {}} />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("test123");
  });

  it("displays success message after successful login", async () => {
    const mockAuth = new firebaseMock.MockAuthentication();
    const mockAuthClient = new firebaseMock.MockFirebaseSdk(
      null,
      () => mockAuth,
      null,
      null,
      null
    );

    jest.mock("firebase/app", () => ({
      initializeApp: jest.fn(() => mockAuthClient),
      auth: jest.fn(() => mockAuth),
    }));

    const { getByPlaceholderText, getByText, getByRole } = render(
      <MemoryRouter>
        <Login setIsLoggedIn={() => {}} />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const submitButton = getByRole("button", { name: "Login" });

    mockAuth.changeAuthState({
      uid: "testUid",
      email: "test1@test.com",
    });

    fireEvent.change(emailInput, { target: { value: "test1@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = getByText("Login successful!");
      expect(successMessage).toBeInTheDocument();
    });
  });

  it("displays 'Incorrect email or password.' message after failed login", async () => {
    const mockAuth = new firebaseMock.MockAuthentication();
    const mockAuthClient = new firebaseMock.MockFirebaseSdk(
      null,
      () => mockAuth,
      null,
      null,
      null
    );

    jest.mock("firebase/app", () => ({
      initializeApp: jest.fn(() => mockAuthClient),
      auth: jest.fn(() => mockAuth),
    }));

    const { getByPlaceholderText, getByText, getByRole } = render(
      <MemoryRouter>
        <Login setIsLoggedIn={() => {}} />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");
    const submitButton = getByRole("button", { name: "Login" });

    mockAuth.changeAuthState(null);

    fireEvent.change(emailInput, { target: { value: "invalid@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "invalidpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = getByText("Incorrect email or password.");
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
