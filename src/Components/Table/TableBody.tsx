import { isValidElement, type JSX, type ReactNode } from "react";
import type { TableRow } from "../ComponentInterfaces/TableInterface";

export default function TableBody({
  data,
  headers,
  renderRow,
}: {
  data: TableRow[];
  headers: string[];
  renderRow: (row: TableRow, rowIndex: number) => JSX.Element;
}) {
  const renderCell = (value: unknown): ReactNode => {
    if (isValidElement(value)) return value;
    if (value instanceof Date) return value.toLocaleDateString();
    if (typeof value === "object" && value !== null) {
      if ("name" in value) return String(value.name);
      if ("typeOfTest" in value) return String(value.typeOfTest);
      return JSON.stringify(value);
    }
    return String(value);
  };

  return (
    <tbody>
      {data.map((row, rowIndex: number) => {
        if (renderRow) return renderRow(row, rowIndex);
        return (
          <tr key={rowIndex}>
            {headers.map((headerKey: string) => (
              <td key={headerKey} className="text-center py-2 border border-gray-200">
                {renderCell(row[headerKey])}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}
