import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";


import '../css/Dashboard.css'


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
    console.log(data);
    if (data.status === "error") {
      console.log("Bad Token");
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      setInvoices(data.invoices);
    }
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
  }, []);

  const invoiceList = invoices.map((invoice) => (
    <li>
      <Link to={`/invoice/${invoice._id}`} >
        {invoice._id}
      </Link>
    </li>
  ));

  return (
    <>
      <Sidebar />
      <main>
        <button onClick={getInvoices}>Get Invoices</button>
        {invoiceList}
        {invoiceList}
        {invoiceList}
        {invoiceList}
        {invoiceList}
        {invoiceList}
        {invoiceList}
        {invoiceList}
        {invoiceList}
        {invoiceList}
        {invoiceList}

      </main>
    </>
  );
}

export default Dashboard;
