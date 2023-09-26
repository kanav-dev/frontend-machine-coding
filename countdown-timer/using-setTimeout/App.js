//https://codesandbox.io/s/countdown-timer-settimeout-rc96c7?file=/src/App.js

import { useEffect, useState, useRef } from "react";

export default function CountdownTimerSetTimeout() {
  const defaultTimerState = { remTime: 3600, isTimerRunning: false };
  const [timer, setTimer] = useState(defaultTimerState);
  const { remTime, isTimerRunning } = timer;
  const timeoutRef = useRef(null);

  const startTimer = () => {
    setTimer((timerState) => ({ ...timerState, isTimerRunning: true }));

    const timerFn = () => {
      setTimer((timerState) => ({
        ...timerState,
        remTime: timerState.remTime - 1
      }));
      const timeoutId = setTimeout(timerFn, 1000);
      timeoutRef.current = timeoutId;
    };
    timerFn();
  };

  const stopTimer = () => {
    setTimer((timerState) => ({ ...timerState, isTimerRunning: false }));
    clearTimeout(timeoutRef.current);
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(defaultTimerState);
  };

  useEffect(() => {
    if (remTime === 0) stopTimer();
  }, [remTime]);

  const showTimer = () => {
    const hour = `${Math.floor(remTime / 3600)}`.padStart(2, "0");
    const min = `${Math.floor((remTime % 3600) / 60)}`.padStart(2, "0");
    const sec = `${remTime % 60}`.padStart(2, "0");
    return `${hour}:${min}:${sec}`;
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
