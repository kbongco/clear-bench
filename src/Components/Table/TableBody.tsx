export default function TableBody({ data, headers }:any) {
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
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {headers.map((headerKey) => (
            <td className='text-center'key={String(headerKey)}>
              {renderCell(row[headerKey])}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}