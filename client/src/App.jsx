import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./routes/Register";
import Login from "./routes/Login"
import Dashboard from "./routes/Dashboard"
import Invoice from "./routes/Invoice"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="invoice/:id" element={<Invoice />} />
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
