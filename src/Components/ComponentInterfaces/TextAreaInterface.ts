export interface TextAreaInterface {
  label?: string;
  value: string;
  placeholder?: string;
  name?: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}