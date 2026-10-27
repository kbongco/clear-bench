import LabTechHomeView from "./LabTechHome";
import ScientistHomeContainer from "../../Containers/ScientistHomeContainer";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function Home() {
  const { role } = useCurrentUser();

  return <>{role === "labtech" ? <LabTechHomeView /> : <ScientistHomeContainer />}</>;
}
