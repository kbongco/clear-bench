export type ToastType {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number; 
  onClose: () => void;
}