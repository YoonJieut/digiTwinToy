// src/components/UI/Slider.jsx

/**
 * 슬라이더 컴포넌트의 스타일 객체입니다.
 *
 * @type {Object}
 * @property {Object} container - 슬라이더 컨테이너의 스타일.
 * @property {string} container.width - 컨테이너의 너비.
 * @property {string} container.margin - 컨테이너의 마진.
 * @property {string} container.textAlign - 컨테이너의 텍스트 정렬.
 * @property {Object} slider - 슬라이더의 스타일.
 * @property {string} slider.width - 슬라이더의 너비.
 * @property {Object} label - 슬라이더 레이블의 스타일.
 * @property {string} label.marginTop - 레이블의 상단 마진.
 * @property {string} label.fontSize - 레이블의 글꼴 크기.
 * @property {string} label.fontWeight - 레이블의 글꼴 두께.
 *
 * @example
 * <div style={styles.container}>
 *   <input type="range" style={styles.slider} />
 *   <label style={styles.label}>Slider Label</label>
 * </div>
 */

import React from "react";

const Slider = ({ value, onChange }) => {
  const styles = {
    container: {
      position: "absolute",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "300px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: "8px",
      padding: "10px",
      margin: "0 auto",
      textAlign: "center",
    },
    slider: {
      width: "70%",
    },
    label: {
      marginTop: "10px",
      fontSize: "16px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <input
        type="range"
        min="1"
        max="24"
        value={value}
        onChange={onChange}
        style={styles.slider}
      />
      <div style={styles.label}>{value}h</div>
    </div>
  );
};

export default Slider;
