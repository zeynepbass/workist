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
}) {
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
                className={className}
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