const INPUT_VARIANTS = {
  default:
    "border-2 border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500",
  error: "border-2 border-red-400 rounded p-2 focus:outline-none focus:ring-2 focus:ring-red-400",
};

export function Input({ label, id, name, className, variant, ...inputProps }) {
  const variantClass = variant ? (INPUT_VARIANTS[variant] ?? "") : "";
  const inputId = id ?? (label && name ? `input-${name}` : undefined);

  return (
    <>
      {label && (
        <label htmlFor={inputId} className="block font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        className={`${variantClass} ${className || ""}`}
        {...inputProps}
      />
    </>
  );
}
