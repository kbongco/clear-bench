import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFlask,
  faCheckSquare,
  faFile,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

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

  useEffect(() => {
    if (!menuOpen) return;
    closeButtonRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

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
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center gap-3 bg-blue-500 px-4 py-3 md:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          ref={menuButtonRef}
          aria-expanded={menuOpen}
          aria-controls="sidebar"
          className="text-white text-2xl"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <span className="text-white font-bold text-lg">Clear Bench</span>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0  z-[35] bg-black/50 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar: a drawer below md, always shown from md up */}
      <div
        id="sidebar"
        className={`w-64 bg-blue-500 fixed inset-y-0 left-0 z-40 overflow-y-auto flex flex-col justify-between md:translate-x-0 ${
          menuOpen
            ? "translate-x-0 transition-transform"
            : "-translate-x-full invisible md:visible transition-[transform,visibility]"
        }`}
      >
        <div>
          <div className="m-8 flex items-center justify-between">
            <h1 className="text-2xl text-white font-bold">Clear Bench</h1>
            <button
              type="button"
              ref={closeButtonRef}
              onClick={closeMenu}
              aria-label="Close menu"
              className="text-white text-2xl md:hidden"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <hr />
          <ul className="m-4 flex flex-col">
            <li className="mx-8 my-4">
              <div className="flex gap-4 items-center">
                <FontAwesomeIcon className="text-2xl text-white" icon={faHouse} />
                <NavLink onClick={closeMenu} to="/" className="text-white text-lg font-bold">
                  Home
                </NavLink>
              </div>
            </li>
            <li className="mx-8 my-4">
              <div className="flex gap-4 items-center">
                <FontAwesomeIcon className="text-2xl text-white" icon={faFile} />
                <NavLink
                  onClick={closeMenu}
                  to="/view-samples"
                  className="text-white text-lg font-bold"
                >
                  All Samples
                </NavLink>
              </div>
            </li>
            <li className="mx-8 my-4">
              <div className="flex gap-4 items-center">
                <FontAwesomeIcon className="text-2xl text-white" icon={faFlask} />
                <NavLink
                  onClick={closeMenu}
                  to="/specs"
                  className="text-white text-lg font-bold"
                >
                  Specs
                </NavLink>
              </div>
            </li>

            {/* Conditionally render based on role */}
            {role === "scientist" ? (
              <li className="mx-8 my-4">
                <div className="flex gap-4 items-center">
                  <FontAwesomeIcon className="text-2xl text-white" icon={faCheckSquare} />
                  <NavLink
                    onClick={closeMenu}
                    to="/submit-samples"
                    className="text-white text-lg font-bold"
                  >
                    Submit Samples
                  </NavLink>
                </div>
              </li>
            ) : (
              <li className="mx-8 my-4">
                <div className="flex gap-4 items-center">
                  <FontAwesomeIcon className="text-2xl text-white" icon={faCheckSquare} />
                  <NavLink
                    onClick={closeMenu}
                    to="/approve-samples"
                    className="text-white text-lg font-bold"
                  >
                    Approve Samples
                  </NavLink>
                </div>
              </li>
            )}
          </ul>
        </div>

        {/* View as */}
        <div className="m-4">
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
      </div>
    </>
  );
}
