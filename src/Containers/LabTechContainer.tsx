import { useEffect, useState } from "react";
import ApproveSamples from "../Views/ApprovSamples";
import { getPendingSamples, getSamples } from "../services/samples";

export default function LabTechContainer() {
  const [pendingSamples, setPendingSamples] = useState([]);
  const [allSamples, setAllSamples] = useState([])
  const labTechID = 1;
  const scientistID = 1;

  useEffect(() => {
    const scientistID = 1;
    async function getData(scientistID: any) {
      try {
        const all = await getSamples(scientistID);
        const pending = await getPendingSamples(scientistID);
        setPendingSamples(all);
        setAllSamples(pending);

        
      } catch (err) {
        console.error(err);
      }
    }
    getData(scientistID);
  }, []);

  console.log(pendingSamples, 'pend');
  console.log(allSamples, 'all');
  return (
    <>
      <ApproveSamples data={pendingSamples} />
    </>
  )
}