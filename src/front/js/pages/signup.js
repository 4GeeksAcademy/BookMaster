import React, { useState, useContext} from "react";
import { Context } from "../store/appContext";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();


    const signupUrl = "https://stalinnarvaez-reimagined-waddle-qjvgj5x9wp7f4jx-3001.preview.app.github.dev/api/signup"

    const requestNewUser = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inputVal.email,
          password: inputVal.password,
        }),
      };

    const resp = await fetch(signupUrl, requestNewUser).catch(() => false);

    if (!resp) return window.alert("There's been a problem with the request");

    window.alert("User created");
    navigate("/login")


    console.log("send data");
    console.log(email);
    actions.signup( email, password);
    window.alert("User created"); 
    navigate("/login"); 

  }

  return (
    <form onSubmit={sendData}>
      <div className="mb-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          placeholder="Please insert your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          placeholder="Please insert your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </form>
  );
};