import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import Table from "../../Components/Table/Table";
import { mockSamples } from "../../mockData/sampleData";
import { faBell, faFlask } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LabTechHomeView from "./LabTechHome";
import ScientistHome from "./ScientistHome";
import { useRoleStore } from "../../store/useRoleStore";

export default function Home() {
  const role = useRoleStore((state) => state.role);

  // return role === "labtech" ? <LabTechHomeView /> : <ScientistHomeView />;
  // const [allSamples, setAllSamples] = useState<Array<{
  //   id: string;
  //   name: string;
  //   totalSamples: string | number;
  //   typeOfTest: string;
  //   testStatus: string;
  //   dueDate: string;
  // }>>([]);

  // const currentUser = mockSamples[0].owner.name;
  // const currentUserSamples = mockSamples.filter(sample => sample.owner.name === currentUser);
  // const outOfSpecSamples = currentUserSamples.filter(sample => sample.outOfSpec === true);
  // const currentCompletedSamples = currentUserSamples.filter(sample => sample.testStatus === 'completed');
  // const currentTableTitle = 'Your samples currently in test';
  // console.log(outOfSpecSamples)
  // const currentSamplesArr = currentUserSamples.map(sample => {
  //   return {
  //     id: sample.id,
  //     name: sample.name,
  //     totalSamples: sample.totalSamples,
  //     typeOfTest: sample.typeOfTest,
  //     testStatus: sample.testStatus,
  //     dueDate: sample.dueDate
  //   }
  // })
  // const titles = Object.keys(currentSamplesArr[0]);

  // console.log(currentSamplesArr, 'arr');

  // const totalSamples = currentUserSamples.length;
  // console.log(currentUserSamples)
  // console.log(mockSamples);

  // const testDescription = (
  //   <span className="flex items-center gap-2 justify-center">
  //     <FontAwesomeIcon className='text-2xl text-white' icon={faFlask} />
  //     You have {totalSamples} samples in test
  //   </span>
  // );

  // const notifications = (
  //   <span className="flex items-center gap-2 justify-center">
  //     {outOfSpecSamples.length > 0 ? (
  //       <>
  //         <FontAwesomeIcon className='text-2xl text-white' icon={faBell} />
  //         You have {outOfSpecSamples.length} samples that need your attention.
  //       </>
  //     ) : 'You have no samples that require your attention'}
  //   </span>
  // )

  // useEffect(() => {
  //   const currentSamplesArr = currentUserSamples.map(sample => ({
  //     id: sample.id,
  //     name: sample.name,
  //     totalSamples: sample.totalSamples,
  //     typeOfTest: sample.typeOfTest,
  //     testStatus: sample.testStatus,
  //     dueDate: sample.dueDate
  //   }));

  //   // 2. Get submissions from localStorage
  //   const storedSamples = JSON.parse(localStorage.getItem('submittedSamples') || '[]');

  //   // 3. Map stored samples to same shape (if needed)
  //   const formattedStoredSamples = storedSamples.map((sample: any, index: number) => ({
  //     id: `local-${index}`, // unique id
  //     name: sample.sampleName,
  //     totalSamples: sample.totalSamples || 'N/A',
  //     typeOfTest: sample.testType,
  //     testStatus: 'Pending',
  //     dueDate: 'TBD'
  //   }));

  //   // 4. Combine
  //   const allSamples = [...currentSamplesArr, ...formattedStoredSamples];
  //   setAllSamples(allSamples);
  // },[])

  return (
    <>
      {role === "labtech" ? <LabTechHomeView/> : <ScientistHome/>}
      {/* <div className='ml-16'>
        <h1 className='text-3xl'>Welcome! {currentUser}</h1>
        <div className="mt-4 flex gap-4">
          <Card title='Overview' description={testDescription} />
          <Card title='Notifications' description={notifications} />
        </div>
        <div>
          <h2 className='text-2xl mt-8'>Your Samples</h2>
          <Table tableTitle={currentTableTitle} tableHeader={titles} data={allSamples} />
        </div>
        <div>
          <h2 className='text-2xl mt-8'>Completed Samples</h2>
          {currentCompletedSamples.length > 0 ? <Table tableTitle='Your completed samples' tableHeader={titles} data={currentCompletedSamples} /> : <p className='text-gray-500'>You have no completed samples.</p>}
        </div>
      </div> */}
    </>
  )
}