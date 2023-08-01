import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../config/Firebase";
import { setLoggedIn } from "../config/Auth";
import "../styles/login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await signIn(email, password);
    if (user) {
      setAlertMessage("Login successful!");
      setIsSuccess(true);

      setEmail("");
      setPassword("");

      setLoggedIn();
      setIsLoggedIn(true);

      setTimeout(() => {
        navigate("/cookbook");
      }, 1500);
    } else {
      setAlertMessage("Incorrect email or password.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {alertMessage && (
        <div className={`alert ${isSuccess ? "success" : "error"}`}>
          {alertMessage}
        </div>
      )}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
