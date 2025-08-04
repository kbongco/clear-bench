export default function TableBody({ data, headers, renderRow }: any) {
  const renderCell = (value: any) => {
    if (value instanceof Date) return value.toLocaleDateString();
    if (typeof value === "object" && value !== null) {
      if ("name" in value) return value.name;
      if ("typeOfTest" in value) return value.typeOfTest;
      return JSON.stringify(value);
    }
    return String(value);
  };

  return (
    <tbody>
      {data.map((row: any, rowIndex: number) => {
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
