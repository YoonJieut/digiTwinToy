import React, { useEffect, useRef } from "react";

export default function ThreeScene() {
  const mountRef = React.useRef(null);

  useEffect(() => {
    console.log(" mountRef :", mountRef.current);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "gray",
      }}
    >
      relative div
      <div
        ref={mountRef}
        style={{ width: "100%", height: "100vh", outline: "1px solid black" }}
      >
        내부 div
      </div>
    </div>
  );
}
