import type { SelectInterface } from "../ComponentInterfaces/SelectInterface"

export default function SelectComponent({label,name, onChange, value, options, id}:SelectInterface) {
  return ( 
    <>
      <div>
        <label>{label}</label>
        <select
        id={id}
        name={name}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        onChange={onChange}
          value={value}>
          {options.map((option) => {
            return (
              <option key={option.id} value={option.value}>
                {option.value}
              </option>
            )
          })}
        </select>
      </div>
    </>
  )
}