import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  async function sendData(e) {
    e.preventDefault();

    const signupUrl = "https://stalinnarvaez-reimagined-waddle-qjvgj5x9wp7f4jx-3001.preview.app.github.dev/api/signup";
    const requestNewUser = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    const resp = await fetch(signupUrl, requestNewUser).catch(() => false);

    if (!resp) {
      window.alert("There's been a problem with the request");
      return;
    }

    window.alert("User created");
    navigate("/login");
    console.log("send data");
    console.log(email);
    actions.signup(email, password);
    window.alert("User created");
    navigate("/login");
  }

  return (
    <form onSubmit={sendData}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Sign Up</button>
    </form>
  );
};