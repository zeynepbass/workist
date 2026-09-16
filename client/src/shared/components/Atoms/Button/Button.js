
const BUTTON_VARIANTS = {
    ghost: "text-gray-500 hover:text-white disabled:opacity-50",
    primary:
        "bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 rounded transition-colors",
    secondary:
        "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 rounded transition-colors",
    danger:
        "bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 rounded transition-colors",
};

export function Button ({
    icon,
    onClick,
    disabled,
    className = "",
    type = "button",
    children,
    ariaLabel,
    variant = "ghost",
}) {
    const variantClass =
        BUTTON_VARIANTS[variant] ?? BUTTON_VARIANTS.ghost;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            className={`${variantClass} ${className}`}
        >
         {children}   {icon}
        </button>
    );
};
