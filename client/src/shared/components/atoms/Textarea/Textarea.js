const TEXTAREA_VARIANTS = {
  default:
      "border-2 border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500",
  error:
      "border-2 border-red-400 rounded p-2 focus:outline-none focus:ring-2 focus:ring-red-400",
};

export function Textarea({
  label,
  value,
  onChange,
  className,
  name,
  rows,
  placeholder,
  variant,
}) {
  const variantClass = variant
      ? TEXTAREA_VARIANTS[variant] ?? ""
      : "";

  return (
    <div>
      <label className="block font-semibold text-gray-700 mb-1">
        {label}
      </label>

      <textarea
      name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`${variantClass} ${className || ""}`}
      />
    </div>
  );
}
