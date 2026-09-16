const INPUT_VARIANTS = {
    default:
        "border-2 border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500",
    error:
        "border-2 border-red-400 rounded p-2 focus:outline-none focus:ring-2 focus:ring-red-400",
};

export function Input({
    label,
    type,
    name,
    value,
    accept,
    min,
    max,
    className,
    onChange,
    checked,
    placeholder,
    required,
    autoComplete,
    variant,
}) {
    const variantClass = variant
        ? INPUT_VARIANTS[variant] ?? ""
        : "";

    return (
        <>
            {label && (
                <label className="block font-semibold text-gray-700 mb-1">
                    {label}
                </label>
            )}

            <input
                name={name}
                min={min}
                max={max}
                value={value}
                checked={checked}
                className={`${variantClass} ${className || ""}`}
                type={type}
                accept={accept}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
            />
        </>
    );
}
