import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  console.log(mode)
  console.log(history)
  function transition(value, replace = false) {
    let newHistory = [...history];
    if (replace === true) {
      newHistory.pop();
      newHistory.push(value);
      setHistory(newHistory);
      setMode(value);
    } else {
      setMode(value);
      newHistory.push(value);
      setHistory(newHistory);
    }
  }

  function back() { 
    console.log(mode)
    let newHistory = [...history];
    if (mode !== initial) {
      newHistory.pop();
      setHistory(newHistory);
      let length = newHistory.length - 1;
      setMode(history[length]);
    }
    console.log(mode)
  }

  return { mode, transition, back };
};