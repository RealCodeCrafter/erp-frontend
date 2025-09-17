import React from "react";
import "./lazy.scss";

const Lazy = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Lazy;
