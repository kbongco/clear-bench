import LabTechHomeView from "./LabTechHome";
import { useCurrentUserStore } from "../../store/useCurrentUserStore";
import ScientistHomeContainer from "../../Containers/ScientistHomeContainer";

export default function Home() {
  const role = useCurrentUserStore((state) => state.user.role);

  return <>{role === "labtech" ? <LabTechHomeView /> : <ScientistHomeContainer />}</>;
}
