import { useEffect, useRef, useState } from "react";

export default function ProgressBar() {
  const intitialProgressState = {
    progressValue: 0,
    progressSpeed: 1,
    isBarRunning: false
  };
  const [progressState, setProgressState] = useState(intitialProgressState);
  const intervalRef = useRef(null);
  const { progressValue, progressSpeed, isBarRunning } = progressState;
  const isProgressBarFull = progressValue >= 100;

  const handleStart = () => {
    setProgressState((prevState) => ({
      ...prevState,
      ...(isProgressBarFull && { progressValue: 0 }),
      isBarRunning: true
    }));
    const intervalId = setInterval(
      () =>
        setProgressState((prevState) => ({
          ...prevState,
          progressValue: prevState.progressValue + progressSpeed / 10
        })),
      20
    );
    intervalRef.current = intervalId;
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setProgressState((prevState) => ({ ...prevState, isBarRunning: false }));
  };

  const handleReset = () => {
    handleStop();
    setProgressState(intitialProgressState);
  };

  const handleSpeedChange = (speedVal) => {
    setProgressState((prevState) => ({
      ...prevState,
      progressSpeed: speedVal
    }));
  };

  useEffect(() => {
    if (isProgressBarFull) handleStop();
  }, [isProgressBarFull]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Progress Bar</h1>
      <progress
        value={progressValue}
        max="100"
        style={{ width: "90%", height: "100px" }}
      />
      <div style={{ display: "flex", gap: "20px" }}>
        <button onClick={handleStart} disabled={isBarRunning}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isBarRunning}>
          Stop
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <input
        type="range"
        name="speed"
        min="1"
        max="10"
        value={progressSpeed}
        onChange={(e) => handleSpeedChange(e.target.value)}
        style={{ marginTop: "30px" }}
      />
      <p style={{ marginTop: "5px" }}>{`Speed: ${progressSpeed}`}</p>
    </div>
  );
}
