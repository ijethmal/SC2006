import React from "react";
import "./pwModal.css";

function PwModal({ onClose }) {
  return (
    <div className="pw-modal-overlay">
      <div className="pw-modal-content">
        <h2>Change Password</h2>
        <form>
          <label>
            Current Password:
            <input type="password" placeholder="Enter your current password" />
          </label>
          <label>
            New Password:
            <input type="password" placeholder="Enter your new password" />
          </label>
          <label>
            Confirm Password:
            <input type="password" placeholder="Confirm your new password" />
          </label>
          <div className="pw-modal-buttons">
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

export default PwModal;
