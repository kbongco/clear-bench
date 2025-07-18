export interface TableHeader {
  header:string[]
}

export interface TableBody {
  body: string[];
  tableHeader: TableHeader;
}

export interface Table {
  header: string;
  data: string[];
  tableHeader: TableHeader;
  tableBody: TableBody;
}