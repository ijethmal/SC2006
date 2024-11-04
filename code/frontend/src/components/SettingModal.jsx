import React from "react";
import "./SettingModal.css";

function SettingModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Personal Information</h2>
        <form>
          <label>
            Name:
            <input type="text" placeholder="Enter your name" />
          </label>
          <label>
            Email:
            <input type="email" placeholder="Enter your email" />
          </label>
          <label>
            Personal Info:
            <textarea placeholder="Enter personal info"></textarea>
          </label>
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingModal;
