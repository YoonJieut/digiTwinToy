// src/components/3D/ThreeScene.jsx

import React, { useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cube from "./Cube";
import Tooltip from "../common/Tooltip";
import Slider from "../UI/Slider";
import { parseCSV } from "../../utils/utils";

/**
 * ThreeScene 컴포넌트는 3D 씬을 렌더링하며, CSV 데이터를 파싱하여 큐브에 적용합니다.
 */
const ThreeScene = () => {
  // 툴팁 상태 관리
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  // 슬라이드바에서 선택된 시간을 관리 (1시간 ~ 24시간)
  const [selectedHour, setSelectedHour] = useState(1);

  // CSV 데이터를 저장할 상태
  const [csvData, setCsvData] = useState([]);

  // CSV 파일 경로 목록을 저장할 상태
  const [csvFilePaths, setCsvFilePaths] = useState([]);

  // 매니페스트 파일을 로드하여 CSV 파일 경로를 설정
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
        console.log("CSV 파일 경로 로드 완료:", paths);
      } catch (error) {
        console.error("매니페스트 파일 로드 오류:", error);
      }
    };

    loadManifest();
  }, []);

  // 모든 CSV 파일을 로드하고 파싱하여 csvData 상태에 저장
  useEffect(() => {
    if (csvFilePaths.length === 0) return;

    const loadAllCSV = async () => {
      try {
        const allData = await Promise.all(
          csvFilePaths.map((path) => parseCSV(path))
        );
        const mergedData = allData.flat();
        setCsvData(mergedData);
        console.log("모든 CSV 데이터 로드 완료:", mergedData);
      } catch (error) {
        console.error("CSV 파일 로드 및 파싱 오류:", error);
      }
    };

    loadAllCSV();
  }, [csvFilePaths]);

  // 툴팁 상태를 업데이트하는 함수
  const handleTooltip = useCallback(
    (visible, x, y, text) => {
      setTooltip({ visible, x, y, text });
      console.log(
        `툴팁 상태 업데이트: visible=${visible}, x=${x}, y=${y}, text=${text}`
      );
    },
    [tooltip]
  );

  // 슬라이드바 값이 변경될 때 호출되는 핸들러
  const handleSliderChange = (event) => {
    const newHour = parseInt(event.target.value, 10);
    setSelectedHour(newHour);
    console.log("선택된 시간 변경:", newHour);
  };

  // 3x3 그리드의 큐브 위치를 생성
  const gridSize = 3; // 그리드 크기
  const spacing = 1.4; // 큐브 간 간격

  const cubes = [];
  let regionCode = 68100; // 초기 지역 코드
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      cubes.push({
        position: [(x - 1) * spacing, 0, (z - 1) * spacing],
        regionCode: `68_${regionCode.toString().slice(-3)}`, // 지역 코드 설정
      });
      regionCode++; // 지역 코드 증가
    }
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* 3D 캔버스 설정 */}
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 5, 10], fov: 60 }}
      >
        {/* 카메라 컨트롤 추가 */}
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
      <Slider value={selectedHour} onChange={handleSliderChange} />

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

export default ThreeScene;
