import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../config/Auth";

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleLogout() {
      await logout();
      setIsLoggedIn(false);
      navigate("/");
    }

    handleLogout();
  }, [setIsLoggedIn, navigate]);

  return null;
};

export default Logout;
