import React from "react";
import "./Loader.css"; // Import CSS file

const Loader = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <div className="loader-overlay">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
