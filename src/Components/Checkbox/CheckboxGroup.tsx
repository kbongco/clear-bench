import Checkbox from "./Checkbox"; // adjust the import path

interface CheckboxGroupProps {
  options: string[];
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
        <div key={option}>
        <Checkbox
          label={option}
          value={option}
          checked={selected.includes(option)}
          onChange={handleCheckboxChange}
          />
          </div>
      ))}
    </div>
  );
}
