import { useRoleStore } from "../store/useRoleStore";
import LabTechSamplesContainer from "./LabTechSamplesContainer";
import ScientistSamplesContainer from "./ScientistSamplesContainer";

export default function AllSamplesContainer() {
  const role = useRoleStore((state) => state.role);

  if (role === "labtech") return <LabTechSamplesContainer />;
  return <ScientistSamplesContainer />;
}
