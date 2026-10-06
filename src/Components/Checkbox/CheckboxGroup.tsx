import { useState } from "react";
import Checkbox from "./Checkbox"; // adjust the import path

interface CheckboxGroupProps {
  options: string[];
  select: string[];
  labelTitle?: string
  onChange: (selected: string[]) => void;
}

export default function CheckboxGroup({ options, onChange, labelTitle, select }: CheckboxGroupProps) {
  

  const handleCheckboxChange = (value: string) => {
    let updated: string[];

    if (select.includes(value)) {
      updated = select.filter(option => option !== value);
    } else {
      updated = [...select, value];
    }

    onChange(updated);
  };

  return (
    <div className='flex flex-col gap-2'>
      <label className='font-bold mb-1'>
        {labelTitle || "Select Options"}
      </label>
      {options.map((option) => (
        <div key={option}>
        <Checkbox
          label={option}
          value={option}
          checked={select.includes(option)}
          onChange={handleCheckboxChange}
          />
          </div>
      ))}
    </div>
  );
}
