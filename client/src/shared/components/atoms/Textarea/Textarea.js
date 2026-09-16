

export function Textarea({
  label,
  value,
  onChange,
  className,
  name,
  rows,
  placeholder,
}) {
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
        className={className}
      />
    </div>
  );
}