import { useState } from "react";

export default function Checkbox({ label }: any) {
  const [checked, setChecked] = useState(false);

  const handleOnChange = () => {
    setChecked(!checked);
  }

  return (
    <>
      <div className='flex gap-2'>
        <label className='text-lg'>
          <input
            type='checkbox'
            checked={checked}
            onChange={handleOnChange}
          />
          {label}</label>
      </div>
    </>
  )
}