export interface TableHeader {
  header:any[]
}

export interface TableBody {
  body: string[];
  tableHeader: TableHeader;
}

export interface Table {
  tableTitle: string;
  data?: any[];
  tableHeader?: any[];
  tableBody?: TableBody;
  renderRow?: (row: any, rowIndex: number) => JSX.Element;
}