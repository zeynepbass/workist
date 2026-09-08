
export function Button ({
    icon,
    onClick,
    disabled = false,
    className = "",
    type = "button",
    ariaLabel,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={`text-gray-500 hover:text-white disabled:opacity-50 ${className}`}
        >
            {icon}
        </button>
    );
};
