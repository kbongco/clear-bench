export interface SelectInterface {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  options: Options[];
  placeholder?: string;
  id: string;
  error?: string;
}

export interface Options {
  value: string;
  label: string;
}
