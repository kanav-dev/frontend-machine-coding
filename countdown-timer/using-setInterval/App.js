// https://codesandbox.io/s/countdown-timer-setinterval-6w4pnf?file=/src/App.js

import { useEffect, useState, useRef } from "react";

export default function CountdownTimerSetInterval() {
  const defaultTimerState = { remTime: 3600, isTimerRunning: false };
  const [timer, setTimer] = useState(defaultTimerState);
  const { remTime, isTimerRunning } = timer;
  const intervalRef = useRef(null);

  const startTimer = () => {
    setTimer((timerState) => ({ ...timerState, isTimerRunning: true }));
    const intervalId = setInterval(
      () =>
        setTimer((timerState) => ({
          ...timerState,
          remTime: timerState.remTime - 1
        })),
      1000
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

  useEffect(() => {
    if (remTime === 0) stopTimer();
  }, [remTime]);

  const showTimer = () => {
    const hours = `${Math.floor(remTime / 3600)}`.padStart(2, "0");
    const mins = `${Math.floor((remTime % 3600) / 60)}`.padStart(2, "0");
    const secs = `${remTime % 60}`.padStart(2, "0");
    return `${hours}:${mins}:${secs}`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Countdown Timer</h1>
      <h3>{showTimer()}</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button onClick={startTimer} disabled={isTimerRunning || !remTime}>
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
