import React from "react";
import { Link } from "react-router-dom";

function FirstPage() {
  return (
    <div>
      <Link to="/login">
        <p style={{ textAlign: "center", margin: "auto" }}>Get Started!</p>
      </Link>
    </div>
  );
}

export default FirstPage;
