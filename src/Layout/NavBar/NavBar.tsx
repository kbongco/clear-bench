import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFlask,
  faCheckSquare,
  faFile,
  faBars,
  faXmark,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useCurrentUserStore } from "../../store/useCurrentUserStore";
import { logout } from "../../services/auth";

export default function NavBar() {
  const { role, name } = useCurrentUser();
  const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);

  const [menuOpen, setMenuOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    if (!menuOpen) return;
    closeButtonRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setCurrentUser(null); // clear the user in the store
      navigate("/login", { replace: true });
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-white text-lg font-bold ${isActive ? "underline" : ""}`;

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
                <NavLink onClick={closeMenu} to="/" className={navLinkClass}>
                  Home
                </NavLink>
              </div>
            </li>
            <li className="mx-8 my-4">
              <div className="flex gap-4 items-center">
                <FontAwesomeIcon className="text-2xl text-white" icon={faQuestion} />
                <NavLink onClick={closeMenu} to="/whats-next" className={navLinkClass}>
                  What's next?
                </NavLink>
              </div>
            </li>
            <li className="mx-8 my-4">
              <div className="flex gap-4 items-center">
                <FontAwesomeIcon className="text-2xl text-white" icon={faFile} />
                <NavLink onClick={closeMenu} to="/view-samples" className={navLinkClass}>
                  All Samples
                </NavLink>
              </div>
            </li>
            <li className="mx-8 my-4">
              <div className="flex gap-4 items-center">
                <FontAwesomeIcon className="text-2xl text-white" icon={faFlask} />
                <NavLink onClick={closeMenu} to="/specs" className={navLinkClass}>
                  Specs
                </NavLink>
              </div>
            </li>

            {/* Conditionally render based on role */}
            {role === "scientist" ? (
              <li className="mx-8 my-4">
                <div className="flex gap-4 items-center">
                  <FontAwesomeIcon className="text-2xl text-white" icon={faCheckSquare} />
                  <NavLink onClick={closeMenu} to="/submit-samples" className={navLinkClass}>
                    Submit Samples
                  </NavLink>
                </div>
              </li>
            ) : (
              <li className="mx-8 my-4">
                <div className="flex gap-4 items-center">
                  <FontAwesomeIcon className="text-2xl text-white" icon={faCheckSquare} />
                  <NavLink onClick={closeMenu} to="/approve-samples" className={navLinkClass}>
                    Approve Samples
                  </NavLink>
                </div>
              </li>
            )}
          </ul>
        </div>
        <div className="m-4 border-t border-white/30 pt-4">
          <p className="text-white font-semibold">{name}</p>
          <p className="text-blue-100 text-sm mb-3">
            {role === "labtech" ? "Lab tech" : "Scientist"}
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded border border-white px-3 py-2 text-white font-semibold hover:bg-white/10"
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
}
