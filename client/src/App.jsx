import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./routes/Register";
import Login from "./routes/Login"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route index element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
