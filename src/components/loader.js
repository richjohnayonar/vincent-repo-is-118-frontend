import React from "react";
import "./loader.css";

function Loader() {
  return (
    <div className="loaderContainer">
      <div class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
  );
}

export default Loader;
