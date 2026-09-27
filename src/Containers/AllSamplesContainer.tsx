import { useRoleStore } from "../store/useRoleStore";
import ViewAllSamples from "../Views/Dashboard/ViewAllSamples";
import { mockSamples } from "../mockData/sampleData";
import LabTechAllSamples from "../Views/Dashboard/LabTechAllSamples";
import { useEffect, useState } from "react";
import { getAllSamples } from "../services/samples";
import type { SampleWithOwner } from "../types/Samples/sample";

export default function AllSamplesContainer({ user }: { user: string }) {
  const role = useRoleStore((state) => state.role);
  const [labTechSamples, setLabTechSamples] = useState<SampleWithOwner[]>([]);
  
    useEffect(() => {
    const fetchData = async () => {
      try {
        const samplesData = await getAllSamples();
        setLabTechSamples(samplesData.samples)
      } catch (error: any) {
        console.error(error.message);
      }
    }
    fetchData();
  },[])


  if (role === 'labtech') {
    return <LabTechAllSamples samples={labTechSamples}/>
  }

const currentUserTeamSamples = mockSamples.filter(sample =>
  sample.owner.name === user || sample.owner.managerName === user
);
  return <ViewAllSamples user={user} data={currentUserTeamSamples} />;
}