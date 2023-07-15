import React, { useState, useContext} from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css";
import { useNavigate,Link } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const sendData = (e) => {
    e.preventDefault();

    console.log("send data");
    console.log(email);
    actions.signup(email, password);
    window.alert("User created");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={sendData}>
        <h2 className="signup-title">Registrarme</h2>
        <div className="form-group">
          <label htmlFor="inputEmail" className="signup-label">
            Email
          </label>
          <input
            type="email"
            className="form-control signup-input"
            id="inputEmail"
            placeholder="Please insert your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword" className="signup-label">
            Password
          </label>
          <input
            type="password"
            className="form-control signup-input"
            id="inputPassword"
            placeholder="Please insert your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary signup-btn">
            Registrarme
          </button>
          <Link to="/login" className="login-link">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
