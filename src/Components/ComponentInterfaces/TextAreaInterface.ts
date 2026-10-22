export interface TextAreaInterface {
  label?: string;
  value: string;
  placeholder?: string;
  name?: string;
  id?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
