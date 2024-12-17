// src/components/3D/Cube.jsx

import React from "react";

const Cube = ({ position, color, temperature, regionCode }) => {
  return (
    <mesh
      position={position}
      userData={{ temperature, regionCode }}
      onPointerOver={(e) => {
        e.stopPropagation(); // 이벤트 전파 방지
        console.log(
          `Pointer over cube ${regionCode} with temperature ${temperature}`
        );
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        console.log(`Pointer out cube ${regionCode}`);
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} /> {/* 조명 배제용 Material */}
    </mesh>
  );
};

export default Cube;
