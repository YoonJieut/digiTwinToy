// src/components/3D/Cube.js

import React from "react";

/**
 * A 3D cube component rendered using Three.js/React-Three-Fiber 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @param {Array<number>} props.position - 큐브의 [x, y, z] 위치 좌표
 * @param {string} props.color - 큐브 재질의 색상
 * @param {number} props.temperature - 이 큐브와 연관된 온도 값
 * @param {string} props.regionCode - 이 큐브의 지역 코드 식b별자
 * @returns {JSX.Element} 3D 큐브를 나타내는 mesh 컴포넌트
 */
const Cube = ({ position, color, temperature, regionCode }) => {
  // * userData: 사용자 정의 데이터를 객체에 첨부할 수 있는 속성
  // * 객체와 관련된 추가 정보를 저장하는 데 유용
  return (
    <mesh position={position} userData={{ temperature, regionCode }}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Cube;