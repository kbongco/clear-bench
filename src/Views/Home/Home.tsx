import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import Table from "../../Components/Table/Table";
import { mockSamples } from "../../mockData/sampleData";
import { faBell, faFlask } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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