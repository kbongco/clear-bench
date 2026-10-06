import type { Options } from "../ComponentInterfaces/SelectInterface";
import Checkbox from "./Checkbox"; // adjust the import path

interface CheckboxGroupProps {
  options: Options[];
  selected: string[];
  labelTitle?: string
  onChange: (selected: string[]) => void;
}

export default function CheckboxGroup({ options, onChange, labelTitle, selected }: CheckboxGroupProps) {
  

  const handleCheckboxChange = (value: string) => {
    let updated: string[];

    if (selected.includes(value)) {
      updated = selected.filter(option => option !== value);
    } else {
      updated = [...selected, value];
    }

    onChange(updated);
  };

  return (
    <div className='flex flex-col gap-2'>
      <label className='font-bold mb-1'>
        {labelTitle || "Select Options"}
      </label>
{options.map((option) => (
  <div key={option.value}>
    <Checkbox
      label={option.label}
      value={option.value}
      checked={selected.includes(option.value)}
      onChange={handleCheckboxChange}
    />
  </div>
))}
    </div>
  );
}
