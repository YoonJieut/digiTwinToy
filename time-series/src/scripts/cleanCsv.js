// src/scripts/cleanCsv.js

const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

/**
 * 원본 CSV 파일을 정제하여 하나의 시간별 예측 온도가 포함된 CSV 파일을 생성함.
 * 정제된 CSV 파일은 public/data/csv/cleanCsv.csv에 저장됨.
 */

/**
 * 매니페스트 파일 경로
 */
const manifestPath = path.join(
  __dirname,
  "../../public/data/csv/csv_manifest.json"
);

/**
 * 원본 CSV 파일들이 위치한 디렉토리 경로
 */
const inputDir = path.join(__dirname, "../data/csv");

/**
 * 정제된 CSV 파일 경로
 */
const outputFilePath = path.join(inputDir, "cleanCsv.csv");

/**
 * 예측 값을 활용하여 실제 시간을 계산하는 함수
 */
const calculateActualHour = () => {
  return 0;
};

/**
 * 정제된 데이터를 CSV 형식으로 작성하는 함수
 */
const writeCleanData = () => {
  return 0;
};

/**
 * 개별 CSV 파일을 정제하는 함수
 */
const cleanCsvFile = () => {
  return 0;
};

/**
 * 모든 CSV 파일을 처리하여 cleanCsv.csv 파일을 생성하는 함수
 */
const processAllFiles = () => {
  try {
    const manifestContent = fs.readFileSync(manifestPath, "utf8");
    const fileNames = JSON.parse(manifestContent);

    // 추가하기 위해 FLAG는 Add 모드로 작성
    const stream = fs.createWriteStream(outputFilePath, { flags: "a" });

    fileNames.forEach((file) => {
      if (path.extname(file) === ".csv") {
        cleanCsvFile(file, stream);
      }
    });

    stream.end();
    console.log("cleanCsv.csv 파일이 생성되었습니다.");
  } catch (error) {
    console.error("파일 처리 중 오류 발생:", error);
  }
};

processAllFiles();
