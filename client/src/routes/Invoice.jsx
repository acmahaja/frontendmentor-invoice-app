import React from "react";
import { useParams, Link } from "react-router-dom";

function Invoice() {
  const invoiceID = useParams().id;

  return (
    <div>
    <Link to={"/dashboard"}>Dashboard</Link>
      <h1>Invoice #{invoiceID}</h1>
    </div>
  );
}

export default Invoice;
