import type { TextAreaInterface } from "../ComponentInterfaces/TextAreaInterface";

export default function TextArea({label,  name}: TextAreaInterface) {
  return ( 
    <>
      <div className='flex flex-col'>
      <label className='font-bold'>{label}</label>
      <textarea
        name={name}
        className="resize-none w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        cols={50}
        />
        </div>
    </>
  )
}