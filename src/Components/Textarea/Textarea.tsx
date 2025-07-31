export default function TextArea({label, name}: any) {
  return ( 
    <>
      <label>{label}</label>
      <textarea
        name={name}
        className="resize-none w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Enter ${label.toLowerCase()}`}
        rows={4}
        cols={50}
        />
    </>
  )
}