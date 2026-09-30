import { useEffect } from "react";

export function useEscapeKey(onEscape, active = true) {
  useEffect(() => {
    if (!active) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onEscape();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onEscape, active]);
}
