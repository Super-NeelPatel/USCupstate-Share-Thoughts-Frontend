// WarningModal.js
import React, { useEffect } from "react";
import "./WarningModal.css";

const WarningModal = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Call the function to close the modal after 1 second
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onClose]);
  return (
    <div className="warning-modal">
      <p>{message}</p>
    </div>
  );
};

export default WarningModal;
