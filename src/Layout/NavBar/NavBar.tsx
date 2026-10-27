import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faFlask, faCheckSquare, faFile } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useCurrentUserStore } from "../../store/useCurrentUserStore";
import { getScientists } from "../../services/scientists";
import { getLabTechs } from "../../services/labtechs";
import parsePersonValue from "../../utils/parsePerson";
import type { ScientistSummary } from "../../types/Samples/sample";
import type { LabTechSummary } from "../../types/Results/results";

export default function NavBar() {
  const { role, id, name } = useCurrentUser();
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);

  // Demo only: "View as" stands in for login until real auth exists.
  const [scientists, setScientists] = useState<ScientistSummary[]>([]);
  const [labTechs, setLabTechs] = useState<LabTechSummary[]>([]);

  useEffect(() => {
    let ignore = false;
    const fetchPeople = async () => {
      try {
        const [scientistList, labTechList] = await Promise.all([getScientists(), getLabTechs()]);
        if (!ignore) {
          setScientists(scientistList);
          setLabTechs(labTechList);
        }
      } catch {
        // Keep showing the current user if the lists can't load.
      }
    };
    fetchPeople();
    return () => {
      ignore = true;
    };
  }, []);

  const handleViewAsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const picked = parsePersonValue(e.target.value);
    if (!picked) return;

    const list = picked.role === "scientist" ? scientists : labTechs;
    const person = list.find((p) => p.id === picked.id);
    if (!person) return;

    setCurrentUser({ role: picked.role, id: picked.id, name: person.name });
  };

  const peopleLoaded = scientists.length > 0 || labTechs.length > 0;

  return (
    <div className="w-64 bg-blue-500 fixed h-full overflow-y-auto flex flex-col justify-between">
      <div>
        <div className="m-8">
          <h1 className="text-2xl text-white font-bold">Clear Bench</h1>
        </div>
        <hr />
        <ul className="m-4 flex flex-col">
          <ul className="m-4 flex flex-col">
            <li className="mx-8 my-4">
              <div className="flex gap-4 items-center">
                <FontAwesomeIcon className="text-2xl text-white" icon={faHouse} />
                <NavLink to="/" className="text-white text-lg font-bold">
                  Home
                </NavLink>
              </div>
            </li>
            <li className="mx-8 my-4">
              <div className="flex gap-4 items-center">
                <FontAwesomeIcon className="text-2xl text-white" icon={faFile} />
                <NavLink to="/view-samples" className="text-white text-lg font-bold">
                  All Samples
                </NavLink>
              </div>
            </li>
            <li className="mx-8 my-4">
              <div className="flex gap-4 items-center">
                <FontAwesomeIcon className="text-2xl text-white" icon={faFlask} />
                <NavLink to="/specs" className="text-white text-lg font-bold">
                  Specs
                </NavLink>
              </div>
            </li>

            {/* Conditionally render based on role */}
            {role === "scientist" ? (
              <li className="mx-8 my-4">
                <div className="flex gap-4 items-center">
                  <FontAwesomeIcon className="text-2xl text-white" icon={faCheckSquare} />
                  <NavLink to="/submit-samples" className="text-white text-lg font-bold">
                    Submit Samples
                  </NavLink>
                </div>
              </li>
            ) : (
              <li className="mx-8 my-4">
                <div className="flex gap-4 items-center">
                  <FontAwesomeIcon className="text-2xl text-white" icon={faCheckSquare} />
                  <NavLink to="/approve-samples" className="text-white text-lg font-bold">
                    Approve Samples
                  </NavLink>
                </div>
              </li>
            )}
          </ul>
        </ul>
      </div>

      {/* View as + logout */}
      <div className="m-4">
        <div className="mb-4">
          <label htmlFor="view-as" className="text-white font-semibold block mb-1">
            View as
          </label>
          <select
            id="view-as"
            value={`${role}:${id}`}
            onChange={handleViewAsChange}
            className="w-full px-2 py-1 rounded text-black"
          >
            {!peopleLoaded && <option value={`${role}:${id}`}>{name}</option>}
            {scientists.length > 0 && (
              <optgroup label="Scientists">
                {scientists.map((s) => (
                  <option key={`scientist:${s.id}`} value={`scientist:${s.id}`}>
                    {s.name}
                  </option>
                ))}
              </optgroup>
            )}
            {labTechs.length > 0 && (
              <optgroup label="Lab techs">
                {labTechs.map((t) => (
                  <option key={`labtech:${t.id}`} value={`labtech:${t.id}`}>
                    {t.name}
                  </option>
                ))}
              </optgroup>
            )}
          </select>
        </div>
        <hr />
      </div>
    </div>
  );
}
