import { useEffect, useState, useRef } from "react";

export default function CountdownTimerSetInterval() {
  const defaultTimerState = { remTime: 60, isTimerRunning: false };
  const [timer, setTimer] = useState(defaultTimerState);
  const { remTime, isTimerRunning } = timer;
  const intervalRef = useRef(null);

  const startTimer = () => {
    setTimer((timerState) => ({ ...timerState, isTimerRunning: true }));
    const newIntervalId = setInterval(
      () =>
        setTimer((timerState) => ({
          ...timerState,
          remTime: timerState.remTime - 1
        })),
      1000
    );
    intervalRef.current = newIntervalId;
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

    return () => clearInterval(intervalRef.current);
  }, [remTime]);

  const showTimer = () => {
    const min = `${Math.floor(remTime / 60)}`.padStart(2, "0");
    const sec = `${remTime % 60}`.padStart(2, "0");
    return `${min}:${sec}`;
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
