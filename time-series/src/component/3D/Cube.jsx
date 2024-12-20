// src/components/3D/Cube.jsx

import React from "react";

const Cube = ({ position, color, temperature, regionCode, onHover }) => {
  // 마우스가 큐브 위에 올라갔을 때 호출되는 함수
  const handlePointerOver = (event) => {
    event.stopPropagation(); // 이벤트 전파 방지
    // 툴팁을 표시하기 위해 부모로 콜백 함수 호출
    onHover(
      true,
      event.clientX,
      event.clientY,
      `지역 코드: ${regionCode}\n온도: ${temperature}°C`
    );
  };

  // 마우스가 큐브 위에서 이동할 때 호출되는 함수
  const handlePointerMove = (event) => {
    event.stopPropagation();
    // 툴팁의 위치를 업데이트하기 위해 부모로 콜백 함수 호출
    onHover(
      true,
      event.clientX,
      event.clientY,
      `지역 코드: ${regionCode}\n온도: ${temperature}°C`
    );
  };

  // 마우스가 큐브를 벗어났을 때 호출되는 함수
  const handlePointerOut = (event) => {
    event.stopPropagation();
    // 툴팁을 숨기기 위해 부모로 콜백 함수 호출
    onHover(false, 0, 0, "");
  };

  return (
    <mesh
      position={position}
      userData={{ temperature, regionCode }}
      onPointerOver={handlePointerOver}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} /> {/* 조명 문제 배제 */}
    </mesh>
  );
};

// todo : memo 사용하여 리렌더링 횟수 최적화
// export default React.memo(Cube);
export default Cube;
