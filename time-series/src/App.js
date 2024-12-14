// import './App.css';

import ThreeScene from "./component/3D/ThreeScene";

function App() {
  return (
    <div
      className="App"
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        pointerEvents: "auto",
      }}
    >
      <ThreeScene />
    </div>
  );
}

export default App;
