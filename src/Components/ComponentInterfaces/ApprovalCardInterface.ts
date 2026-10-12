import type { SampleWithOwner } from "../../types/Samples/sample";

export interface ApprovalCardProps {
  sample: SampleWithOwner;
  onApprove: (id: number) => void;
  onReject: (id: number, reason: string) => void;
}
