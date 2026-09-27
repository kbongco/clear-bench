import { useRoleStore } from "../store/useRoleStore";
import ViewAllSamples from "../Views/Dashboard/ViewAllSamples";
import { mockSamples } from "../mockData/sampleData";
import LabTechAllSamples from "../Views/Dashboard/LabTechAllSamples";
import { useEffect, useState } from "react";
import { getAllSamples } from "../services/samples";

export default function AllSamplesContainer({ user }: { user: string }) {
  const role = useRoleStore((state) => state.role);
  const [labTechSamples, setLabTechSamples] = useState([]);

  if (role === 'labtech') {
    return <LabTechAllSamples/>
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const samplesData = await getAllSamples();
        setLabTechSamples(samplesData)
      } catch (error: any) {
        console.error(error.mesage);
      }
    }
    fetchData();
  },[])

const currentUserTeamSamples = mockSamples.filter(sample =>
  sample.owner.name === user || sample.owner.managerName === user
);
  return <ViewAllSamples user={user} data={currentUserTeamSamples} />;
}