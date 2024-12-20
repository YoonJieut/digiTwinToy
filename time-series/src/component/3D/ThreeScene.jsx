// src/components/3D/ThreeScene.jsx

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cube from "./Cube";
import Tooltip from "../common/Tooltip";

const ThreeScene = () => {
  // Tooltip 상태 관리
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  // 큐브 포지션 배열 생성 로직
  const gridSize = 3; // 그리드 크기
  const spacing = 1.4; // 큐브 간 간격

  const cubes = [];
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      cubes.push({
        position: [(x - 1) * spacing, 0, (z - 1) * spacing],
        color: "green",
        temperature: 25, // 초기 온도 값
        regionCode: `68_1${x}${z}`, // 초기 지역 코드
      });
    }
  }

  // 툴팁 업데이트 함수
  // todo : useCallback 사용하여 리렌더링 횟수 최적화
  const handleTooltip = (visible, x, y, text) => {
    // console.log("Tooltip 업데이트 :", visible, x, y, text);
    setTooltip({ visible, x, y, text });
  };

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
            color={cube.color}
            temperature={cube.temperature}
            regionCode={cube.regionCode}
            onHover={handleTooltip} // 콜백 함수 전달
          />
        ))}
      </Canvas>

      {/* 툴팁 표시 */}
      {tooltip.visible && (
        <Tooltip
          position={{ x: tooltip.x, y: tooltip.y }}
          text={tooltip.text}
          visible={tooltip.visible}
        />
      )}
    </div>
  );
};

export default ThreeScene;
