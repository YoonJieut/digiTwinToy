// src/utills/utils.js

import Papa from "papaparse";

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
export const getColor = (value) => {
  if (value > 5) {
    return "red";
  } else if (value > 0) {
    return "orange";
  } else if (value < -5) {
    return "blue";
  } else if (value < 0) {
    return "lightblue";
  } else {
    return "green";
  }
};

/**
 * 주어진 CSV 파일 경로를 파싱하여 데이터를 반환하는 함수
 * @param {string} filePath - CSV 파일의 경로
 * @returns {Promise<Array>} - 파싱된 데이터 배열
 */
export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      header: false, // 제목이 깨져 있으므로 false로 설정
      skipEmptyLines: true,
      complete: (results) => {
        console.log("parseCSV resolve : ", results.data);
        resolve(results.data);
      },
      error: (error) => {
        console.log("parseCSV error : ", error);
        reject(error);
      },
    });
  });
};
