import type { TableHeader } from "../ComponentInterfaces/TableInterface";

export default function TableHeader({ header }: TableHeader) {
  return (
    <thead>
      <tr>
        {header.map((key) => (
          <th key={key} className="bg-blue-100 border text-left px-4 py-4">
            {key}
          </th>
        ))}
      </tr>
    </thead>
  )
}