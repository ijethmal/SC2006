import React, { useState } from "react";
import "./Pop_up.css";

export default function Pop_up() {
  const [Pop_up, setPop_up] = useState(false);

  const togglePop_up = () => {
    setPop_up(!Pop_up);
  };

  if(Pop_up) {
    document.body.classList.add('active-popup')
  } else {
    document.body.classList.remove('active-popup')
  }

  return (
    <>
      <button onClick={togglePop_up} className="btn-popup">
      Allow notifications
      </button>

      {Pop_up && (
        <div className="Pop_up">
          <div onClick={togglePop_up} className="overlay"></div>
          <div className="popup-content">
            <p>
                Notifications have been enabled!
            </p>
            <button className="close-popup" onClick={togglePop_up}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}