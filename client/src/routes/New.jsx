import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/New.css";

function New() {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostCode] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");

  let navigate = useNavigate();

  async function submitInvoice(event) {
    event.preventDefault();
    console.log("ASd");
    const response = await fetch("/api/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ street, city, postcode, country, status }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      navigate(`/dashboard`);
    }
  }

  return (
    <div>
      <h1>New</h1>
      <form onSubmit={submitInvoice}>
        <div>
          <h3>Bill From</h3>
          <div>
            <div>
              <label>Street Address</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div>
              <label>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label>Post Code</label>
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostCode(e.target.value)}
              />
            </div>
            <div>
              <label>Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default New;
