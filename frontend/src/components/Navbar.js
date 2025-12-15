import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      padding: "20px",
      background: "#007bff",
      color: "white",
      fontSize: "25px",
      textAlign: "center",
    }}>
      <h1>Lost And Found Item</h1>
      <Link to="/" style={{ color: "white", marginRight: "20px" }}>User Image</Link>
      <Link to="/cctv" style={{ color: "white", marginRight: "20px" }}>CCTV Image</Link>
    </div>
  );
}

export default Navbar;