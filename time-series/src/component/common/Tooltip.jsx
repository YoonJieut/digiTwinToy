// src/components/common/Tooltip.js

import React from "react";

const Tooltip = ({ position, text }) => {
  const { x, y } = position;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
        padding: "5px 10px",
        borderRadius: "2px",
        pointerEvents: "none",
        transform: "translate(-50%, -100%)",
        whiteSpace: "nowrap",
        boxShadow: "0 2px 5px 0 rgba(0,0,0,0.26)",
      }}
    >
      {text}
    </div>
  );
};

export default Tooltip;
