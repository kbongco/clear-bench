export interface ModalInterface {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}