// src/utils/utils.js

import Papa from "papaparse";

/**
 * 주어진 CSV 파일 경로를 파싱하여 데이터를 반환함.
 * @param {string} filePath - CSV 파일의 경로
 * @returns {Promise<Array>} - 파싱된 데이터 배열
 */
export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        if (data.length === 0) {
          reject(new Error("CSV 파일이 비어 있습니다."));
          return;
        }

        // 첫 번째 줄을 메타데이터로 추출
        const metadataLine = data[0].join(" ").trim();
        // console.log("metadataLine:", metadataLine);

        // 1. 공백 2개를 기준으로 분리 (formatPart와 locationStartPart)
        const [formatPart, locationStartPart] = metadataLine.split(/  +/);
        // console.log("formatPart:", formatPart);
        // console.log("locationStartPart:", locationStartPart);

        const metadata = {};

        if (locationStartPart) {
          // 2. locationStartPart에서 대문자를 기준으로 분리
          const splitParts = locationStartPart.split(/(?=[A-Z])/);
          // console.log("splitParts:", splitParts);

          // 3. 나온 결과값들을 : 을 기준으로 나눔
          splitParts.forEach((part) => {
            const [key, ...valueParts] = part.split(":");
            if (key && valueParts.length > 0) {
              const value = valueParts.join(":").trim();
              metadata[key.trim().toLowerCase()] = value;
            }
          });
        }

        // console.log("metadata:", metadata);

        // 4. 이후 줄을 데이터로 처리
        const dataRows = data
          .slice(1)
          .map((row, index) => {
            if (row.length < 4) {
              console.warn(`Invalid data row at index ${index + 1}:`, row);
              return null;
            }
            const [day, hour, forecast, value] = row;

            return {
              day: parseInt(day, 10),
              hour: parseInt(hour, 10) / 100, // '0200' -> 2
              forecast: forecast,
              value: parseFloat(value),
              location: metadata.location || "",
              start: metadata.start || "",
            };
          })
          .filter((row) => row !== null);

        // console.log("CSV 파일 파싱 :", dataRows);
        resolve(dataRows);
      },
      error: (error) => {
        console.error("CSV 파일 파싱 오류:", error);
        reject(error);
      },
    });
  });
};

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
