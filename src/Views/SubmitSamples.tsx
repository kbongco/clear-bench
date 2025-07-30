import Input from "../Components/Input/Input";

export default function SubmitSamples({user}:any) {
  return (
    <>
      <div className='ml-4'>
        <h1 className='text-3xl'>Submit your samples here</h1>
        <p>You are currently logged in as {user}, if this is not you, please log out and log in to your account</p>
        <div className='mt-4'>
          <p>Please read the following guidelines when submitting samples</p>
          <ol>
            <li>All samples must be labeled properly before submission</li>
            <li>Please submit a paper copy of your testing sheet and upload your sheet so we have a copy of your data</li>
            <li>Testing will not begin unless all required documents and items have been recieved, please account for this on your testing sheets</li>
            <li>Once all required items have been recieved, you will recieve a notification from the lab tech who picks up your samples</li>
          </ol>
        </div>
        <div>
          <p className='text-lg my-4'>To submit your samples, please fill out the form below</p>
          <form className='flex  gap-4'>
            <Input label='Sample Name' type={""} placeholder={""} value={""} onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
              throw new Error("Function not implemented.");
            }} name={""} />
            <Input label='Sample Owner' placeholder={user} type={""} value={""} onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {              throw new Error("Function not implemented.");
            }} name={""} />
            {/* <label htmlFor="sampleName">Sample Name:</label>
            <input type="text" id="sampleName" name="sampleName" placeholder="Enter sample name" className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200' />

            <label htmlFor="sampleType">Sample Type:</label>
            <input type="text" id="sampleType" name="sampleType" placeholder="Enter sample type" className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200' />

            <label htmlFor="testingSheet">Testing Sheet:</label>
            <input type="file" id="testingSheet" name="testingSheet" className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200' /> */}

            <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>Submit Samples</button>
          </form>
        </div>
      </div>
    </>
  )
}