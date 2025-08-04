import Card from "../../Components/Card/Card";
import { mockLabTechs } from "../../mockData/sampleData"

export default function LabTechHomeView() {

  const currentLabTech = mockLabTechs[0].name;

  const samplesAssigned = (
    <span className="flex items-center gap-2 justify-center">
      You have samples assigned to you.
    </span>
  )

  const notifications = ( 
    <span className="flex items-center gap-2 justify-center">
      You have no notifications.
    </span>
  )

  return (
    <>
      <div className='ml-16'>
        <h1 className='text-3xl'>Welcome! {currentLabTech}</h1>
        <div className='mt-4 flex gap-4'>
          <Card title='Overview' description={samplesAssigned} />
          <Card title='Notifications' description={notifications}/>
        </div>
        </div>
    </>
  )
}