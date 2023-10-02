// https://codesandbox.io/s/stopwatch-setinterval-rdwl4z?file=/src/App.js

import { useState, useRef } from "react";

export default function StopWatchSetInterval() {
  const defaultTimerState = { time: 0, isTimerRunning: false };
  const [timer, setTimer] = useState(defaultTimerState);
  const { time, isTimerRunning } = timer;
  const intervalRef = useRef(null);

  const startTimer = () => {
    setTimer((timerState) => ({ ...timerState, isTimerRunning: true }));
    const intervalId = setInterval(
      () =>
        setTimer((timerState) => ({
          ...timerState,
          time: timerState.time + 10
        })),
      10
    );
    intervalRef.current = intervalId;
  };

  const stopTimer = () => {
    setTimer((timerState) => ({ ...timerState, isTimerRunning: false }));
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(defaultTimerState);
  };

  const showTimer = () => {
    const mins = `${Math.floor(time / (60 * 1000))}`.padStart(2, "0");
    const secs = `${Math.floor((time / 1000) % 60)}`.padStart(2, "0");
    const milSecs = `${(time / 10) % 100}`.padStart(2, "0");
    return `${mins}:${secs}:${milSecs}`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>StopWatch</h1>
      <h3>{showTimer()}</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button onClick={startTimer} disabled={isTimerRunning}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isTimerRunning}>
          Stop
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
