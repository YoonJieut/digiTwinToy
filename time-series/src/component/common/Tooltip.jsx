// src/components/common/Tooltip.js

import React from "react";
/**
 * Tooltip 컴포넌트
 *
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.position - 툴팁의 위치 (x, y 좌표)
 * @param {string} props.text - 툴팁에 표시될 텍스트
 * @param {boolean} props.visible - 툴팁의 가시성 (true일 때 보임)
 *
 * @example
 * <Tooltip position={{ x: 100, y: 200 }} text="This is a tooltip" visible={true} />
 */

const Tooltip = ({ position, text, visible }) => {
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
    transform: "translate(-50%, -100%)", // 툴팁 위치 조정
    whiteSpace: "pre-line", // 줄바꿈을 위해
    zIndex: 10, // 툴팁이 다른 요소 위에 표시되도록 설정
    fontSize: "12px",
    maxWidth: "200px",

    // 툴팁 애니메이션 설정
    transition: "opacity 0.3s ease",
    opacity: visible ? 1 : 0,
  };

  return <div style={tooltipStyle}>{text}</div>;
};

export default Tooltip;
