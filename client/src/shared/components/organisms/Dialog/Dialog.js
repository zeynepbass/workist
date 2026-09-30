import { useId, useRef } from "react";
import { createPortal } from "react-dom";

import { useEscapeKey } from "@/shared/hooks/useEscapeKey";
import { useFocusTrap } from "@/shared/hooks/useFocusTrap";

const SIZES = { md: "max-w-md", lg: "max-w-2xl" };

export function Dialog({ open, onClose, title, size = "lg", children }) {
  const panelRef = useRef(null);
  const titleId = useId();

  useFocusTrap(panelRef, open);
  useEscapeKey(onClose, open);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div role="presentation" className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative w-full ${SIZES[size]} max-h-[90vh] overflow-y-auto rounded-md bg-white p-6 shadow-lg`}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-xl font-semibold text-gray-700">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="text-2xl leading-none text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
