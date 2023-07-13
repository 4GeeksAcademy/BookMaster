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

    try {
      const response = await fetch(signupUrl, requestNewUser);
      const data = await response.json();
      if (response.ok) {
        const token = data.access_token;
        console.log(`Token: ${token}`);
        navigate("/login");
      } else {
        throw new Error("Error occurred during signup");
      }
    } catch (error) {
      console.log("Error occurred during signup:", error);
    }
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