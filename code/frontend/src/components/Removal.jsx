import React from "react";
import "./Removal.css";

function Removal({ onClose }) {
  return (
    <div className="rm-modal-overlay">
      <div className="rm-modal-content">
        <h2>Account Removal</h2>
        <form>
          <label>
            Password:
            <input type="password" placeholder="Enter your password" />
          </label>
          <div className="rm-modal-buttons">
            <button type="delete">Delete</button>
            <button type="button" onClick={onClose}>
              Deactivate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Removal;
