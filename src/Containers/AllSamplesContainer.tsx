import { useCurrentUserStore } from "../store/useCurrentUserStore";
import LabTechSamplesContainer from "./LabTechSamplesContainer";
import ScientistSamplesContainer from "./ScientistSamplesContainer";

export default function AllSamplesContainer() {
  const role = useCurrentUserStore((state) => state.role);

  if (role === "labtech") return <LabTechSamplesContainer />;
  return <ScientistSamplesContainer />;
}
