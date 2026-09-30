const STYLES = {
  loading: "text-gray-500",
  empty: "text-gray-500 italic",
  error: "text-red-700",
  info: "text-gray-500",
};

export function StatusMessage({ type = "loading", message }) {
  return (
    <div
      className="flex items-center justify-center p-8 text-center"
      role={type === "error" ? "alert" : "status"}
      aria-live="polite"
    >
      <p className={STYLES[type] ?? STYLES.info}>{message}</p>
    </div>
  );
}
