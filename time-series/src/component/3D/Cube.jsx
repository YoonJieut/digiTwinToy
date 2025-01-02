// src/components/3D/Cube.jsx

import React, { useMemo } from "react";
import { getColor } from "../../utils/utils";

/**
 * Cube 컴포넌트는 개별 큐브를 렌더링하며, 데이터에 따라 색상을 변경합니다.
 * @param {Array} position - 큐브의 위치 [x, y, z]
 * @param {string} regionCode - 지역 코드
 * @param {Function} onHover - 마우스 호버 시 호출되는 함수
 * @param {number} selectedHour - 선택된 시간
 * @param {Array} csvData - 파싱된 CSV 데이터
 */
const Cube = ({ position, regionCode, onHover, selectedHour, csvData }) => {
  // 해당 큐브의 데이터를 필터링
  const cubeData = useMemo(() => {
    const filtered = csvData.filter(
      (row) => row.location === regionCode && row.hour === selectedHour
    );
    console.log(`Cube ${regionCode} - 선택된 시간: ${selectedHour}`, filtered);
    return filtered;
  }, [csvData, regionCode, selectedHour]);

  // 현재 값 설정 (데이터가 없으면 0)
  const currentValue = cubeData.length > 0 ? cubeData[0].value : 0;
  console.log(`Cube ${regionCode} - 현재 값: ${currentValue}`);

  // 값에 따른 색상 결정
  const adjustedColor = useMemo(() => {
    const color = getColor(currentValue);
    console.log(`Cube ${regionCode} - 조정된 색상: ${color}`);
    return color;
  }, [currentValue]);

  // 마우스가 큐브 위로 올라갔을 때 호출되는 핸들러
  const handlePointerOver = (event) => {
    event.stopPropagation();
    console.log(`Cube ${regionCode}에 마우스 오버됨.`);
    onHover(
      true,
      event.clientX,
      event.clientY,
      `지역 코드: ${regionCode}\n온도: ${currentValue}°C`
    );
  };

  // 마우스가 큐브 위에서 움직일 때 호출되는 핸들러
  const handlePointerMove = (event) => {
    event.stopPropagation();
    console.log(`Cube ${regionCode}에서 마우스 이동.`);
    onHover(
      true,
      event.clientX,
      event.clientY,
      `지역 코드: ${regionCode}\n온도: ${currentValue}°C`
    );
  };

  // 마우스가 큐브를 벗어났을 때 호출되는 핸들러
  const handlePointerOut = (event) => {
    event.stopPropagation();
    console.log(`Cube ${regionCode}에서 마우스 아웃.`);
    onHover(false, 0, 0, "");
  };

  return (
    <mesh
      position={position}
      userData={{ currentValue, regionCode }}
      onPointerOver={handlePointerOver}
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
    >
      {/* 큐브의 기하학적 형태 설정 */}
      <boxGeometry args={[1, 1, 1]} />
      {/* 큐브의 재질과 색상 설정 */}
      <meshStandardMaterial color={adjustedColor} />
    </mesh>
  );
};

export default React.memo(Cube);
