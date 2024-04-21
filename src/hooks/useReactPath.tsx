import { useState, useEffect } from "react";
const useReactPath = () => {
  const [_path, setPath] = useState(window.location.pathname);
  const [_historystate, setHistoryState] = useState(window.location.pathname);
  const listenToPopstate = () => {
    const winPath = window.location.pathname;
    setPath(winPath);
    setHistoryState(window.history.state);
  };
  useEffect(() => {
    window.addEventListener("popstate", listenToPopstate);
    return () => {
      window.removeEventListener("popstate", listenToPopstate);
    };
  }, []);
  return { path: _path, historystate: _historystate };
};

export { useReactPath };
