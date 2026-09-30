import { useCallback, useState } from "react";

export function useExpandedIds() {
  const [expandedIds, setExpandedIds] = useState({});

  const toggleExpanded = useCallback((id) => {
    setExpandedIds((previous) => ({ ...previous, [id]: !previous[id] }));
  }, []);

  return { expandedIds, toggleExpanded };
}
