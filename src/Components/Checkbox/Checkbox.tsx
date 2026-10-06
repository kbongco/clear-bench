interface CheckboxProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}

export default function Checkbox({ label, value, checked, onChange }: CheckboxProps) {
  const handleChange = () => {
    onChange(value);
  };

  return (
    <div className='flex items-center gap-2'>
      <div>
           <label className='text-md'>
      <input
        type="checkbox"
        value={value}
        checked={checked}
        onChange={handleChange}
          />
             {label}</label>
        </div>

    </div>
  );
}
