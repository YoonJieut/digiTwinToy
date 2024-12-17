// src/components/common/Tooltip.js

import React from "react";

const Tooltip = ({ position, text }) => {
  const { x, y } = position;
  const tooltipStyle = {
    position: "absolute",
    top: y,
    left: x,
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    padding: "5px 10px",
    borderRadius: "4px",
    pointerEvents: "none", // 이벤트 전달 방지
    transform: "translate(-50%, -100%)",
    whiteSpace: "nowrap",
    zIndex: 10, // 툴팁이 다른 요소 위에 표시되도록 설정
  };

  return <div style={tooltipStyle}>{text}</div>;
};

export default Tooltip;
