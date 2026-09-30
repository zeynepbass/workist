const TEXTAREA_VARIANTS = {
  default:
    "border-2 border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500",
  error: "border-2 border-red-400 rounded p-2 focus:outline-none focus:ring-2 focus:ring-red-400",
};

export function Textarea({ label, id, name, className, variant, ...textareaProps }) {
  const variantClass = variant ? (TEXTAREA_VARIANTS[variant] ?? "") : "";
  const textareaId = id ?? (name ? `textarea-${name}` : undefined);

  return (
    <div>
      {label && (
        <label htmlFor={textareaId} className="block font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        className={`${variantClass} ${className || ""}`}
        {...textareaProps}
      />
    </div>
  );
}
