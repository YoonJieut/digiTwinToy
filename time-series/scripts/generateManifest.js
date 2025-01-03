// scripts/generateManifest.js

const fs = require("fs");
const path = require("path");

const csvDir = path.join(__dirname, "../public/data/csv");
const manifestPath = path.join(csvDir, "csv_manifest.json");

fs.readdir(csvDir, (err, files) => {
  if (err) {
    console.error("CSV 디렉토리 읽기 오류:", err);
    return;
  }
  const csvFiles = files.filter((file) => file.endsWith(".csv"));
  fs.writeFile(manifestPath, JSON.stringify(csvFiles, null, 2), (err) => {
    if (err) {
      console.error("매니페스트 파일 작성 오류:", err);
    } else {
      console.log("매니페스트 파일이 성공적으로 생성됨:", manifestPath);
    }
  });
});
