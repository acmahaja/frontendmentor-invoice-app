import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./routes/Register";
import Login from "./routes/Login"
import Dashboard from "./routes/Dashboard"
import Invoice from "./routes/Invoice"
import New from "./routes/New"
import './css/App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/invoice/:id" element={<Invoice />} />
          <Route path="/new" element={<New />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route index element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
