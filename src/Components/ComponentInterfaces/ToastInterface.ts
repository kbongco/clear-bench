import type { ReactNode } from "react";

export type ToastType = {
  message: ReactNode;
  type: 'success' | 'error' | 'info';
  duration?: number; 
  onClose: () => void;
}