import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import img from "../assets/register.svg";

import  "../css/Register.css";
import "../css/components/Inputs.css";
import "../css/components/Buttons.css";
import "../css/components/Links.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      navigate("/login");
    }
  }

  return (
      <form className="registerForm" onSubmit={registerUser}>
      <img src={img} alt="register" />
        <div className="textInput">
          <label htmlFor="name">Name</label>
          <input
            placeholder={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="textInput">
          <label htmlFor="email">Email</label>
          <input
            placeholder={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="textInput">
          <label htmlFor="">Password</label>
          <input
            placeholder={password}
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="Button2" type="submit">
          Register
        </button>

        <a className="Medium-Grey" href="/login">
          Login
        </a>
      </form>
  );
}

export default Register;
