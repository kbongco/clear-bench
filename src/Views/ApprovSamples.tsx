import Card from "../Components/Card/Card";

export default function ApproveSamples({ data }: any) {
  console.log(data);

  const labTechNotes = (
    <span>
      <ol>
        <li>All samples submitted must have uploaded a file</li>
        <li>If all of the above is selected, then all temperatures will be done</li>
        <li>Do not approve unless all items are there</li>
      </ol>
    </span>
  )
  return ( 
    <>
      <div className='ml-4'>
        <h1>Samples to be approved</h1>
        <Card title='Reference sheet' description={labTechNotes} />

        <div>
          {/* <Table/> */}
        </div>
      </div>
      {/* <h1>Samples to be approved</h1>
      <Card title='Lab Tech reference'/> */}
    </>
  )
}