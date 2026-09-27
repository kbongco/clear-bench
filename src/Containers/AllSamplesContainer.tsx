import { useRoleStore } from "../store/useRoleStore";
import { mockSamples } from "../mockData/sampleData";
import LabTechSamplesContainer from "./LabTechSamplesContainer";
import ScientistSamplesContainer from "./ScientistsSamplesContainer";

export default function AllSamplesContainer({ user }: { user: string }) {
  const role = useRoleStore((state) => state.role);




  const currentUserTeamSamples = mockSamples.filter(
    (sample) => sample.owner.name === user || sample.owner.managerName === user,
  );

  if (role === "labtech") return <LabTechSamplesContainer />;
  return <ScientistSamplesContainer/>
}
