import type { SelectInterface } from "../ComponentInterfaces/SelectInterface";
export default function SelectComponent({
  label,
  name,
  onChange,
  value,
  options,
  id,
  placeholder,
  error,
}: SelectInterface) {
  return (
    <div className="flex flex-col">
      <label className="font-bold">{label}</label>

      <select
        id={id}
        name={name}
        className={`px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        onChange={onChange}
        value={value}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}