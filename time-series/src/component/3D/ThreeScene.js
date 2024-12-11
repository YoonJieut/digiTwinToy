// src/components/3D/ThreeScene.js

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const ThreeScene = () => {
  return (
    <Canvas>
      {/* 카메라 컨트롤 (OrbitControls) */}
      <OrbitControls />

      {/* 기본 조명 */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      {/* 기본 큐브 */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </Canvas>
  );
};

export default ThreeScene;
