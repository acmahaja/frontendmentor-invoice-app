import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import Invoice from "./routes/Invoice";
import New from "./routes/New";
import "./css/App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(()=>{setLoggedIn(localStorage.getItem("token") === null)}, [loggedIn])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/invoice/:id" element={<Invoice />} />
            <Route path="/new" element={<New />} />
            <Route path="/login" element={<Login />} />
            <Route index path="/" element={loggedIn ? <Login />: <Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
