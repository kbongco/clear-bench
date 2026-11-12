import { useCurrentUser } from "../hooks/useCurrentUser";
import LabTechSamplesContainer from "./LabTechSamplesContainer";
import ScientistSamplesContainer from "./ScientistSamplesContainer";

export default function AllSamplesContainer() {
  const { role } = useCurrentUser();

  if (role === "labtech") return <LabTechSamplesContainer />;
  return <ScientistSamplesContainer />;
}
