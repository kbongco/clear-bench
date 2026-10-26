import LabTechHomeView from "./LabTechHome";
import ScientistHome from "./ScientistHome";
import { useCurrentUserStore } from "../../store/useCurrentUserStore";

export default function Home() {
  const role = useCurrentUserStore((state) => state.user.role);

  return <>{role === "labtech" ? <LabTechHomeView /> : <ScientistHome />}</>;
}
