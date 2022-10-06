import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/finance_app.svg";
import "../css/Login.css";
import "../css/components/Inputs.css";
import "../css/components/Buttons.css";
import "../css/components/Links.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      console.log("An Error!");
    }
  }

  return (
      <form className="LoginForm" onSubmit={loginUser}>
        <img src={img} alt="welcome" />
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
          Login
        </button>
        <a className="Medium-Grey" href="/register">
          Register Here!
        </a>
      </form>
  );
}

export default Register;
