// src/components/3D/ThreeScene.jsx

import React, { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three"; // Raycaster를 직접 사용하려면 필요
import Cube from "./Cube";
import Tooltip from "../common/Tooltip";

const ThreeScene = () => {
  // tooltip 상태 관리
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

  const handlePointerMove = (event) => {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log("mouse:", mouse); // {x: -1~1, y: -1~1}

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, event.camera);
    const intersects = raycaster.intersectObjects(event.scene.children, true);

    console.log("intersects:", intersects);

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      if (intersectedObject.userData.temperature !== undefined) {
        setTooltip({
          visible: true,
          x: event.clientX,
          y: event.clientY,
          text: `온도: 섭씨 ${intersectedObject.userData.temperature}도`,
        });
      }
    } else {
      setTooltip({
        visible: false,
        x: 0,
        y: 0,
        text: "",
      });
    }
  };

  // useEffect(() => {
  //   console.log("툴팁 상태 변경:", tooltip);
  // }, [tooltip]);

  return (
    <>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 5, 10], fov: 60 }}
        onPointerMove={handlePointerMove}
      >
        {/* 카메라 컨트롤 (OrbitControls) */}
        <OrbitControls />
        {/* 헬퍼 추가 */}
        {/* <AxesHelper args={[5]} />
        <GridHelper args={[10, 10]} /> */}
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
          />
        ))}
      </Canvas>

      {tooltip.visible && (
        <Tooltip
          position={{ x: tooltip.x, y: tooltip.y }}
          text={tooltip.text}
        />
      )}
    </>
  );
};

export default ThreeScene;
