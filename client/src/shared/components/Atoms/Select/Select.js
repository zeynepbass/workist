const SELECT_VARIANTS = {
  default: "w-full p-3 border-2 border-purple-300 rounded",
  error: "w-full p-3 border-2 border-red-400 rounded",
};

export function Select({
  value,
  onChange,
  options = [],
  placeholder = "Seçiniz",
  className = "",
  label,
  variant = "default",
  ...props
}) {
  const variantClass =
      SELECT_VARIANTS[variant] ?? SELECT_VARIANTS.default;

  return (
      <div>
          {label && (
              <label
                  htmlFor={props.id}
                  className="block mb-2 font-semibold text-gray-400"
              >
                  {label}
              </label>
          )}

          <select
              value={value}
              onChange={onChange}
              className={`${variantClass} ${className}`}
              {...props}
          >
              <option value="">
                  {placeholder}
              </option>

              {options.map((option) => (
                  <option
                      key={option.value}
                      value={option.value}
                  >
                      {option.label}
                  </option>
              ))}
          </select>
      </div>
  );
}
