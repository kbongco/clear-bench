export interface SelectInterface {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  options: Options[];
  id?: string; // Optional, if you want to use it
}

export interface Options {
  // id?: string;
  value: string;
  label: string;
}