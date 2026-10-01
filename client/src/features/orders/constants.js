export const ORDER_STATUS_LABELS = {
  requested: "Talep edildi",
  offered: "Teklif verildi",
  active: "Aktif",
  delivered: "Teslim edildi",
  revision_requested: "Revizyon istendi",
  completed: "Tamamlandı",
  cancelled: "İptal edildi",
};

export const ORDER_STATUS_STYLES = {
  requested: "bg-gray-100 text-gray-700",
  offered: "bg-blue-100 text-blue-700",
  active: "bg-yellow-100 text-yellow-700",
  delivered: "bg-indigo-100 text-indigo-700",
  revision_requested: "bg-orange-100 text-orange-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export const ORDER_ACTION_LABELS = {
  create: "Sipariş talebi oluşturuldu",
  offer: "Teklif ver",
  accept: "Teklifi kabul et",
  deliver: "Teslim et",
  request_revision: "Revizyon iste",
  complete: "Siparişi onayla",
  cancel: "İptal et",
};

export const ORDER_EVENT_LABELS = {
  create: "Sipariş talebi oluşturuldu",
  offer: "Teklif gönderildi",
  accept: "Teklif kabul edildi",
  deliver: "Teslimat yapıldı",
  request_revision: "Revizyon istendi",
  complete: "Sipariş tamamlandı",
  cancel: "Sipariş iptal edildi",
};

export const STATUS_FILTERS = [
  { value: "", label: "Tümü" },
  ...Object.entries(ORDER_STATUS_LABELS).map(([value, label]) => ({ value, label })),
];

export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("tr-TR", { timeZone: "Europe/Istanbul" }) : "-";

export const formatDateTime = (value) =>
  new Date(value).toLocaleString("tr-TR", {
    timeZone: "Europe/Istanbul",
    dateStyle: "short",
    timeStyle: "short",
  });
