import { useEffect, useRef, useState } from "react";

export default function Timer({ initialSeconds, onTimeUp, isPaused }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const intervalRef = useRef(null);

  // Sync when initialSeconds changes (e.g., on restore)
  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (isPaused) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isPaused, onTimeUp]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const timerClass =
    seconds <= 30
      ? "timer-danger"
      : seconds <= 60
        ? "timer-warning"
        : "timer-normal";

  return (
    <div className={`flex items-center gap-2 font-mono text-lg font-bold ${timerClass}`}>
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>
        {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </span>
    </div>
  );
}

/**
 * Get remaining seconds from the Timer component.
 * This is used externally by passing the timer value through state.
 */
export function getTimerSeconds(initialSeconds, startTime) {
  if (!startTime) return initialSeconds;
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  return Math.max(0, initialSeconds - elapsed);
}
