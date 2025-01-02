// src/components/3D/ThreeScene.jsx

import React, { useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cube from "./Cube";
import Tooltip from "../common/Tooltip";
import Slider from "../UI/Slider";
import { parseCSV } from "../../utills/utils";

const ThreeScene = () => {
  // Tooltip 상태 관리
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  // CSV 데이터를 저장할 상태
  const [csvData, setCsvData] = useState([]);

  // CSV 파일 목록 상태 관리
  const [csvFilePaths, setCsvFilePaths] = useState([]);

  // 매니페스트 파일 로드 및 CSV 파일 경로 설정
  useEffect(() => {
    const loadManifest = async () => {
      try {
        const response = await fetch(
          process.env.PUBLIC_URL + "/data/csv/csv_manifest.json"
        );
        if (!response.ok) {
          throw new Error("매니페스트 파일을 로드하는 데 실패했습니다.");
        }
        const fileNames = await response.json();
        const paths = fileNames.map(
          (name) => process.env.PUBLIC_URL + `/data/csv/${name}`
        );
        setCsvFilePaths(paths);
      } catch (error) {
        console.error("매니페스트 파일 로드 오류:", error);
      }
    };

    loadManifest();
  }, []);

  // CSV 파일 로드 및 파싱
  useEffect(() => {
    if (csvFilePaths.length === 0) return;

    const loadAllCSV = async () => {
      try {
        const allData = await Promise.all(
          csvFilePaths.map((path) => parseCSV(path))
        );
        // allData는 배열의 배열 형태
        // 각 CSV 파일의 데이터를 하나의 배열로 병합
        const mergedData = allData.flat();

        // 데이터 가공: 각 행을 객체로 변환
        const processedData = mergedData
          .map((row) => {
            // 각 CSV 행의 내용을 기반으로 데이터 추출
            // 예: ['day:4', 'hour:0200', 'forecast:+6', 'value:3.0', 'location:68_100', 'Start:20241204']
            const dataObj = {};
            row.forEach((item) => {
              const [key, value] = item.split(":");
              if (key && value) {
                dataObj[key.trim().toLowerCase()] = value.trim();
              }
            });
            return {
              day: parseInt(dataObj.day, 10),
              hour: parseInt(dataObj.hour, 10) / 100, // '0200' -> 2
              forecast: dataObj.forecast,
              value: parseFloat(dataObj.value),
              location: dataObj.location,
              start: dataObj.start,
            };
          })
          .filter(
            (row) =>
              !isNaN(row.day) &&
              !isNaN(row.hour) &&
              !isNaN(row.value) &&
              row.location
          );

        setCsvData(processedData);
        console.log("Processed CSV Data:", processedData);
      } catch (error) {
        console.error("CSV 파일 로드 및 파싱 오류:", error);
      }
    };

    loadAllCSV();
  }, [csvFilePaths]);

  // 툴팁 업데이트 함수
  const handleTooltip = useCallback((visible, x, y, text) => {
    setTooltip({ visible, x, y, text });
  }, []);

  // 슬라이드바 변경 핸들러
  const handleSliderChange = (event) => {
    setSelectedHour(parseInt(event.target.value, 10));
  };

  // 큐브 포지션 배열 생성
  const gridSize = 3; // 그리드 크기
  const spacing = 1.4; // 큐브 간 간격

  const cubes = [];
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      cubes.push({
        position: [(x - 1) * spacing, 0, (z - 1) * spacing],
        regionCode: `68_1${x}${z}`, // 지역 코드
      });
    }
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 5, 10], fov: 60 }}
      >
        {/* 카메라 컨트롤 */}
        <OrbitControls />
        {/* 조명 설정 */}
        <ambientLight intensity={1} />
        <pointLight position={[-10, 10, 10]} />
        <directionalLight position={[5, 5, 5]} intensity={3} />

        {/* 큐브 렌더링 */}
        {cubes.map((cube, index) => (
          <Cube
            key={index}
            position={cube.position}
            regionCode={cube.regionCode}
            onHover={handleTooltip}
            selectedHour={selectedHour}
            csvData={csvData}
          />
        ))}
      </Canvas>

      {/* 슬라이드바 추가 */}
      <div style={styles.sliderContainer}>
        <Slider value={selectedHour} onChange={handleSliderChange} />
      </div>

      {/* 툴팁 표시 */}
      {tooltip.visible && (
        <Tooltip
          position={{ x: tooltip.x, y: tooltip.y }}
          text={tooltip.text}
        />
      )}
    </div>
  );
};

const styles = {
  sliderContainer: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "300px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "8px",
    padding: "10px",
  },
};

export default ThreeScene;
