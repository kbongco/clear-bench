import Card from "../../Components/Card/Card";
import { mockSamples } from "../../mockData/sampleData";

export default function Home() {
  const currentUser = mockSamples[0].owner.name;
  const currentUserSamples = mockSamples.filter(sample => sample.owner.name === currentUser);
  const totalSamples = currentUserSamples.length;
  const testDescription = `You have ${totalSamples} samples in test`
  console.log(currentUserSamples)
  console.log(mockSamples);
  return ( 
    <>
      <div className='ml-16'>
        <h1 className='text-3xl'>Welcome! {currentUser}</h1>
        <Card title='Overview' description={testDescription} />
      </div>
    </>
  )
}