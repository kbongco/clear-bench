export type RoadmapItem = {
  title: string;
  description: string;
  stage: "next" | "later";
};

export const ROADMAP: RoadmapItem[] = [
  {
    title: "Real login",
    description:
      'Sign in as yourself instead of using the "View as" picker, so every approval and result is tied to a real account.',
    stage: "next",
  },
  {
    title: "Certificate of analysis reports",
    description:
      "Generate a printable report of a sample's results against its specs, ready to send to a customer or auditor.",
    stage: "next",
  },
  {
    title: "Editable specs",
    description: "Lab staff can add and update spec limits per product and test, right in the app.",
    stage: "next",
  },
  {
    title: "Notifications",
    description:
      "Scientists get notified when a sample is approved, rejected, or finished testing, and when one is overdue.",
    stage: "later",
  },
  {
    title: "Manager dashboards",
    description: "Team-level views of workload, turnaround times, and out-of-spec trends.",
    stage: "later",
  },
  {
    title: "Self-hosting for small labs",
    description:
      "Run ClearBench on your own server with one command, so your lab keeps its own data.",
    stage: "later",
  },
];
