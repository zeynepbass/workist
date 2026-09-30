export const ORDER_STATUS_LABELS = {
  in_progress: "Devam Ediyor",
  completed: "Tamamlandı",
  cancelled: "İptal",
};

export const ORDER_STATUS_FILTERS = [
  { value: "all", label: "Tümü" },
  { value: "in_progress", label: ORDER_STATUS_LABELS.in_progress },
  { value: "completed", label: ORDER_STATUS_LABELS.completed },
  { value: "cancelled", label: ORDER_STATUS_LABELS.cancelled },
];

export function formatOrderDate(date) {
  return new Date(date).toLocaleDateString("tr-TR");
}
