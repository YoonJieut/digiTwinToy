// src/utills/getColor.js

/**
 * 주어진 값에 따라 색상을 반환합니다.
 * 이 함수는 제공된 온도 값에 따라 색상을 반환합니다.
 *
 * @param {number} value - 온도 값.
 * @returns {string} 온도 값에 해당하는 색상.
 *
 * @example
 * getColor(6); // "red" 반환
 * getColor(3); // "orange" 반환
 * getColor(-1); // "blue" 반환
 */
const getColor = (value) => {
  if (value > 5) return "red";
  if (value > 0) return "orange";
  return "blue";
};

export default getColor;
