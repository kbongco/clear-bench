import { useState } from "react";
import Checkbox from "./Checkbox"; // adjust the import path

interface CheckboxGroupProps {
  options: string[];
  labelTitle?: string
  onChange: (selected: string[]) => void;
}

export default function CheckboxGroup({ options, onChange, labelTitle }: CheckboxGroupProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    let updated: string[];

    if (selectedOptions.includes(value)) {
      updated = selectedOptions.filter(option => option !== value);
    } else {
      updated = [...selectedOptions, value];
    }

    setSelectedOptions(updated);
    onChange(updated);
  };

  return (
    <div className='flex flex-col gap-2'>
      <label className='font-bold mb-1'>
        {labelTitle || "Select Options"}
      </label>
      {options.map((option) => (
        <Checkbox
          key={option}
          label={option}
          value={option}
          checked={selectedOptions.includes(option)}
          onChange={handleCheckboxChange}
        />
      ))}
    </div>
  );
}
