import LabTechHomeView from "./LabTechHome";
import ScientistHome from "./ScientistHome";
import { useRoleStore } from "../../store/useRoleStore";

export default function Home() {
  const role = useRoleStore((state) => state.role);

  return (
    <>
      {role === "labtech" ? <LabTechHomeView/> : <ScientistHome/>}
    </>
  )
}
