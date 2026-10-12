import type { SampleWithOwner } from "../../types/Samples/sample";

export interface ApprovalCardProps {
  sample: SampleWithOwner;
onApprove: (id: number) => Promise<void>;
onReject: (id: number, reason: string) => Promise<void>;
}
