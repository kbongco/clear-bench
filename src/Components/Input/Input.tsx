import type { InputProps } from "../ComponentInterfaces/InputInterface";

export default function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
  disabled,
  required,
  error,
}: InputProps) {
  return (
    <>
      <div className="flex flex-col gap-2 mb-4">
        <label className="font-bold">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          required={required}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    </>
  );
}
