interface CheckboxProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  error?: string;
}

export default function Checkbox({ label, value, checked, onChange, error }: CheckboxProps) {
  const handleChange = () => {
    onChange(value);
  };

  return (
    <div className="flex items-center gap-2">
      <div>
        <label className="text-md flex items-center gap-2">
          <input
            type="checkbox"
            value={value}
            checked={checked}
            className={`h-5 w-5 ${error ? "accent-red-600" : ""}`}
            onChange={handleChange}
          />
          {label}
        </label>
      </div>
    </div>
  );
}
