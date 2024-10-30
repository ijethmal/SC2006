import React, { useState } from "react";
import PropTypes from "prop-types";
import "./LocationChanger.css";

const LocationChanger = ({ className = "" }) => {
  const [selectedOption, setSelectedOption] = useState("Bukit Batok");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={`location-changer custom-dropdown ${className}`}>
      <span className="dropdown-icon">📍</span>
      <select value={selectedOption} onChange={handleChange}>
        <option value="Bukit Batok">Bukit Batok</option>
        <option value="Clementi">Clementi</option>
        <option value="Jurong">Jurong</option>
      </select>
      {/* <span className="arrow-icon">▼</span> Dropdown arrow */}
    </div>
  );
};

LocationChanger.propTypes = {
  className: PropTypes.string,
};

export default LocationChanger;
