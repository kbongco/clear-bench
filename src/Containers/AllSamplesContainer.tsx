import { useRoleStore } from "../store/useRoleStore";
import ViewAllSamples from "../Views/Dashboard/ViewAllSamples";

export default function AllSamplesContainer({ user }: { user: string }) {
  const role = useRoleStore((state) => state.role);

  if (role === 'labtech') {
    return <h1>All Samples Here</h1>;
  }

  // const teamSamples = /* the currentUserTeamSamples filter, moved here, using `user` */;
  return <ViewAllSamples user={user} data={teamSamples} />;
}