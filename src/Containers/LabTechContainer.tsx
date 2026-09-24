import { useEffect, useState } from "react";
import ApproveSamples from "../Views/ApprovSamples";
import { getPendingSamples } from "../services/samples";

export default function LabTechContainer() {
  const [pendingSamples, setPendingSamples] = useState([]);

  useEffect(() => {
    // TODO: replace with the logged-in user once auth is in place
    const scientistID = 1;
    async function getData(scientistID: number) {
      try {
        const pending = await getPendingSamples(scientistID);
        setPendingSamples(pending);
      } catch (err) {
        console.error(err);
      }
    }
    getData(scientistID);
  }, []);

  return (
    <>
      <ApproveSamples data={pendingSamples} />
    </>
  )
}
