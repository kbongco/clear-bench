import type { TableHeader } from "../ComponentInterfaces/TableInterface";

export default function TableHeader({ header }: TableHeader) {
  return (
    <thead>
      <tr>
        {header.map((key) => (
          <th key={key}>
            {key}
          </th>
        ))}
      </tr>
    </thead>
  )
}