import { useEffect, useState } from "react";
import { Vibration } from "react-native";

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

export type TimerMode = "Work" | "Break";

export const usePomodoro = () => {
  const [mode, setMode] = useState<TimerMode>("Work");
  const [time, setTime] = useState(WORK_MINUTES * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      Vibration.vibrate();
      const newMode: TimerMode = mode === "Work" ? "Break" : "Work";
      setMode(newMode);
      setTime((newMode === "Work" ? WORK_MINUTES : BREAK_MINUTES) * 60);
      setIsActive(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, time, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode("Work");
    setTime(WORK_MINUTES * 60);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return {
    mode,
    time,
    isActive,
    toggleTimer,
    resetTimer,
    formatTime,
  };
};
