import { useRoleStore } from "../store/useRoleStore";
import ViewAllSamples from "../Views/Dashboard/ViewAllSamples";
import { mockSamples } from "../mockData/sampleData";
import LabTechAllSamples from "../Views/Dashboard/LabTechAllSamples";

export default function AllSamplesContainer({ user }: { user: string }) {
  const role = useRoleStore((state) => state.role);
  const currentUser = mockSamples[0].owner.name;

  if (role === 'labtech') {
    return <LabTechAllSamples/>
  }

const currentUserTeamSamples = mockSamples.filter(sample =>
  sample.owner.name === currentUser || sample.owner.managerName === currentUser
);
  return <ViewAllSamples user={user} data={currentUserTeamSamples} />;
}