import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { ForgotPassword } from "./forgotPassword.js";

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
          navigate("/"); // Redirigir al usuario normal a la página principal
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
    <>
      <form className="row g-3" onSubmit={sendData}>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="inputEmail4"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="inputPassword4"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </div>
        <div className="col-12">
          <Link to="#" onClick={handleForgotPasswordClick}>
            Forgot your password?
          </Link>
        </div>
      </form>
      {showForgotPassword && (
        <ForgotPassword handleClose={() => setShowForgotPassword(false)} />
      )}
    </>
  );
};