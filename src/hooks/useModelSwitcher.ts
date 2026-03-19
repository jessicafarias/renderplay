import { useState, useEffect, useCallback } from "react";
import { MODELS, ModelConfig } from "@/config/models";

interface UseModelSwitcherReturn {
  current: ModelConfig;
  currentIndex: number;
  next: () => void;
}

export function useModelSwitcher(): UseModelSwitcherReturn {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % MODELS.length);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "e" || e.key === "E") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next]);

  return { current: MODELS[currentIndex], currentIndex, next };
}