import Card from "../../Components/Card/Card";
import { mockSamples } from "../../mockData/sampleData";
import { faBell, faFlask } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const currentUser = mockSamples[0].owner.name;
  const currentUserSamples = mockSamples.filter(sample => sample.owner.name === currentUser);
  const outOfSpecSamples = currentUserSamples.filter(sample => sample.outOfSpec === true);
  console.log(outOfSpecSamples)
  
  const totalSamples = currentUserSamples.length;
  console.log(currentUserSamples)
  console.log(mockSamples);

  const testDescription = (
    <span className="flex items-center gap-2 justify-center">
      <FontAwesomeIcon className='text-2xl text-white' icon={faFlask}  />
      You have {totalSamples} samples in test
    </span>
  );

  const notifications = (
    <span className="flex items-center gap-2 justify-center">
      <FontAwesomeIcon className='text-2xl text-white' icon={faBell} />
      You have {outOfSpecSamples.length} samples that need your attention.
  </span>
  )

  return ( 
    <>
      <div className='ml-16'>
        <h1 className='text-3xl'>Welcome! {currentUser}</h1>
        <div className="mt-4 flex gap-4">
          <Card title='Overview' description={testDescription} />
          <Card title='Overview' description={notifications} />
        </div>
      </div>
    </>
  )
}