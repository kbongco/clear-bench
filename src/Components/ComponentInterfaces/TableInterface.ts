export interface TableHeader {
  header:any[]
}

export interface TableBody {
  body: string[];
  tableHeader: TableHeader;
}

export interface Table {
  tableTitle: string;
  data?: string[];
  tableHeader?: any[];
  tableBody?: TableBody;
}