// MagnifyingGlass.js

import React, { useState } from "react";
import "./MagnifyingGlass.css";

const MagnifyingGlass = ({ imageSrc, alt }) => {
  const [isMagnified, setIsMagnified] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setIsMagnified(true);
  };

  const handleMouseLeave = () => {
    setIsMagnified(false);
  };

  const handleMouseMove = (e) => {
    if (isMagnified) {
      const image = document.getElementById("magnified-image");
      const { left, top, width, height } = image.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      setMousePosition({ x, y });

      const ratioX = x / width;
      const ratioY = y / height;

      image.style.transformOrigin = `${ratioX * 100}% ${ratioY * 100}%`;
    }
  };

  return (
    <div
      className={`magnifying-glass ${isMagnified ? "magnified" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img id="magnified-image" src={imageSrc} alt={alt} />
    </div>
  );
};

export default MagnifyingGlass;
