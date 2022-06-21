import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      history.pop()
      setHistory(history);
    }
    setMode(newMode);
    setHistory(prev => [...prev, newMode]);
  }

  const back = () => {
    if (mode !== initial) {
      history.pop();
    }
    setHistory(history);
    setMode(history[history.length - 1]);

  }

  return { mode, transition, back };
};