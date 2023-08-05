import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import Navbar from "../components/NavBar";
import App from "../components/App";

describe("Navbar", () => {
  test("shows 'Logout' when user is logged in", () => {
    const isLoggedIn = true;

    const { getByText } = render(
      <MemoryRouter>
        <Navbar isLoggedIn={isLoggedIn} />
      </MemoryRouter>
    );

    const logoutLink = getByText("Logout");

    expect(logoutLink).toBeInTheDocument();
  });

  test("shows 'Logout' button and redirects to homepage on click", () => {
    const isLoggedIn = true;

    const setIsLoggedInMock = jest.fn();

    const history = createMemoryHistory();

    const { getByText } = render(
      <MemoryRouter>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedInMock} />
      </MemoryRouter>
    );

    const logoutButton = getByText("Logout");

    fireEvent.click(logoutButton);

    expect(history.location.pathname).toBe("/");
  });
});
