import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../config/Firebase";
import "../styles/createaccount.css";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const user = await signUp(email, password);
    if (user) {
      setAlertMessage("Account created successfully!");
      setIsSuccess(true);

      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      setAlertMessage("An account with this email already exists.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="create-account-container">
      <h2>Sign Up</h2>
      {alertMessage && (
        <div className={`alert ${isSuccess ? "success" : "error"}`}>
          {alertMessage}
        </div>
      )}
      <form onSubmit={handleCreateAccount}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default CreateAccount;
