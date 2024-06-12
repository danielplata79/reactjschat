import React from "react";
import "./FullScreenImg.css";

const FullScreenImg = ({ src, onClose }) => {

  return (
    <div className="fullscreen-img-overlay" onClick={onClose}>
      <img src={src} className="fullscreen-img" />

    </div>
  )
}

export default FullScreenImg;
