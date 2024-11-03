import "./Search.css";
import React from "react";


function Search() {
  return (
    <div className="box">
      <input type="text" placeholder="Search..." />
      <a href="#">
        <img src="/risearchline.svg" alt="Search Icon" className="search-icon" />
      </a>
    </div>
  );
}

export default Search;
