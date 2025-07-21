import type { InputProps } from "../ComponentInterfaces/InputInterface";

export default function Input({label, type, placeholder, value, onChange, name}: InputProps) {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
/>
   </>
  )
}