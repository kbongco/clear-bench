import { Outlet } from "react-router-dom";
import { useCurrentUserStore } from "../../store/useCurrentUserStore";
import NavBar from "./NavBar";

export default function AppLayout() {
  const user = useCurrentUserStore((state) => state.user);
  return (
    <>
      {user && <NavBar />}
      <div className={user ? "md:ml-64" : ""}>
        <Outlet />
      </div>
    </>
  );
}
