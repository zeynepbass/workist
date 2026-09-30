import { useEffect } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function focusableWithin(container) {
  return [...container.querySelectorAll(FOCUSABLE)].filter(
    (element) => !element.hasAttribute("aria-hidden"),
  );
}

export function useFocusTrap(containerRef, active) {
  useEffect(() => {
    const container = containerRef.current;

    if (!active || !container) {
      return undefined;
    }

    const previouslyFocused = document.activeElement;
    const [first] = focusableWithin(container);
    (first ?? container).focus();

    const handleKeyDown = (event) => {
      if (event.key !== "Tab") return;

      const elements = focusableWithin(container);
      if (elements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [containerRef, active]);
}
