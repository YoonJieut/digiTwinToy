// src/components/3D/ThreeScene.js

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const ThreeScene = () => {
  return (
    <Canvas>
      {/* 카메라 컨트롤 (OrbitControls) */}
      <OrbitControls />
      {/* 카메라 위치 설정 */}
      {/* <perspectiveCamera position={[0, 0, 0]} /> */}

      {/* 기본 조명 */}
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, 10, 10]} />

      {/* 추가 조명 */}
      <directionalLight position={[5, 5, 5]} intensity={3} />

      {/* 기본 큐브 */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </Canvas>
  );
};

export default ThreeScene;
