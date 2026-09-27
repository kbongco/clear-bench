import { useRoleStore } from "../store/useRoleStore";
import ViewAllSamples from "../Views/Dashboard/ViewAllSamples";
import { mockSamples } from "../mockData/sampleData";
import LabTechAllSamples from "../Views/Dashboard/LabTechAllSamples";
import { useEffect } from "react";

export default function AllSamplesContainer({ user }: { user: string }) {
  const role = useRoleStore((state) => state.role);

  if (role === 'labtech') {
    return <LabTechAllSamples/>
  }

  useEffect(() => {
    
  },[])

const currentUserTeamSamples = mockSamples.filter(sample =>
  sample.owner.name === user || sample.owner.managerName === user
);
  return <ViewAllSamples user={user} data={currentUserTeamSamples} />;
}