import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";

function Dashboard() {
  let navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);

  const getInvoices = async () => {
    const req = await fetch("/api/invoice", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "error") {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      setInvoices(data.invoices);
    }
    // else alert(data.error);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        getInvoices();
      }
    } else {
      navigate("/login");
    }
  });

  const invoiceList = invoices.map((invoice) => <li><a href="#">{invoice.id}</a></li>)

  return (
    <>
      <h1>Invoices</h1>
      <button onClick={getInvoices}>Get Invoices</button>
      {invoiceList}
    </>
  );
}

export default Dashboard;
