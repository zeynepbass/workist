
export function Input({
label,
type,
value,
accept,
min,max,className,
onChange,
checked
}) {
    return (
        <>

        <label className="block font-semibold text-gray-700 mb-1">
        {label}
    </label>

    <input
    min={min}
    max={max}
    value={value}
    checked={checked}
    className={className}
        type={type}
        accept={accept}
        onChange={onChange}
    />
            </>
    );
};
