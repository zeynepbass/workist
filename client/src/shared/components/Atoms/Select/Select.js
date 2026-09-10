
export function Select({
  value,
  onChange,
  options = [],
  placeholder = "Seçiniz",
  className = "",
  label,
  ...props
}) {
  return (<div>


    <label
    htmlFor="filtre"
    className="block mb-2 font-semibold text-gray-400"
  >
{label}
  </label>
    <select
      value={value}
      onChange={onChange}
      className={`w-full p-3 border-2 border-purple-300 rounded ${className}`}
      {...props}
    >
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>  </div>
  );
};


