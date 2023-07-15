import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { actions, store } = useContext(Context);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();
    console.log("send Data");
    console.log(email, password);

    try {
      const response = await actions.login(email, password);
      const user = response.user;

      if (user) {
        if (user.role === "admin") {
          navigate("/vista-admin"); // Redirigir al usuario administrador a la página de libros
        } else {
          navigate("/private"); // Redirigir al usuario normal a la página principal
        }
      } else {
        console.log("Error: User object is missing in the response");
      }
    } catch (error) {
      console.log("Error occurred during login:", error);
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  // Verificar si el usuario está autenticado y redirigirlo

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={sendData}>
        <h2 className="login-title">Log In</h2>
        <div className="form-group">
          <label htmlFor="inputEmail" className="login-label">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control login-input"
            id="inputEmail"
            placeholder="Please insert your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword" className="login-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control login-input"
            id="inputPassword"
            placeholder="Please insert your password"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary login-btn">
            Log In
          </button>
          <Link to="/signup" className="signup-link">
            Don't have an account? Sign up!
          </Link>
        </div>
        <div className="form-group">
          <Link
            to="/forgot-password"
            className="forgot-password-link"
            onClick={handleForgotPasswordClick}
          >
            Forgot your password?
          </Link>
        </div>
      </form>
    </div>
  );
};