import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const navigate = useNavigate()

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
    if (data.status === 'ok') {
        localStorage.setItem(
            'token', data.token
        )
        navigate('/dashboard')
    } else {
        console.log('An Error!');
    }
}

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            placeholder={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Register;
