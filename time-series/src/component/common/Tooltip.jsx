// src/components/common/Tooltip.js

import React from "react";

/**
 * Tooltip 컴포넌트
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.position - 툴팁의 위치 (기본값: { x: 0, y: 0 })
 * @param {number} props.position.x - 툴팁의 x 좌표
 * @param {number} props.position.y - 툴팁의 y 좌표
 * @param {string} props.text - 툴팁에 표시될 텍스트
 *
 * @example
 * <Tooltip position={{ x: 100, y: 200 }} text="This is a tooltip" />
 */
const Tooltip = ({ position = { x: 0, y: 0 }, text }) => {
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
