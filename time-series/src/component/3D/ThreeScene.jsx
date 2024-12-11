// src/components/3D/ThreeScene.js

import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cube from "./Cube";

const ThreeScene = () => {
  // * 큐브 포지션 배열 생성 로직
  // fiber, 동적으로 큐브 위치 계산
  const gridSize = 3; // 큐브 크기
  const spacing = 1.4; // 큐브 간 간격

  const cubes = [];
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      cubes.push({
        position: [(x - 1) * spacing, 0, (z - 1) * spacing],
        color: "green",
        temperature: 25, // 초기 온도 값 (가데이터 사용 예정)
        regionCode: "68_10X", // 초기 지역 코드 값 (가데이터 사용 예정)
      });
    }
  }

  useEffect(() => {
    console.log("큐브 : ", cubes);
  });

  return (
    <Canvas>
      {/* 카메라 컨트롤 (OrbitControls) */}
      <OrbitControls />
      {/* 카메라 위치 설정 */}
      {/* <perspectiveCamera position={[0, 0, 0]} /> */}

      {/* 기본 조명 */}
      <ambientLight intensity={1} />
      <pointLight position={[-10, 10, 10]} />
      {/* 추가 조명 */}
      <directionalLight position={[5, 5, 5]} intensity={3} />

      {/* 기본 큐브 */}
      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="green" />
      </mesh> */}

      {cubes.map((cube, index) => (
        <Cube
          key={index}
          position={cube.position}
          color="green"
          temperature={25} // 초기 온도 값 (가데이터 사용 예정)
          regionCode={cube.regionCode} // 초기 지역 코드 값 (가데이터 사용 예정)
        />
      ))}
    </Canvas>
  );
};

export default ThreeScene;
