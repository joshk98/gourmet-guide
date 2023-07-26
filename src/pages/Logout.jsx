import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../config/Firebase";

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  React.useEffect(() => {
    handleLogout();
  }, []);
  return null;
};

export default Logout;
