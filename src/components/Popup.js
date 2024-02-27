import React from "react";
import styles from "@/styles/PopupStyles.css";

const Popup = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>
          x
        </button>
        <div className="popup-content">
          {/* Your popup content goes here */}
          This is the popup content
        </div>
      </div>
    </div>
  );
};

export default Popup;
