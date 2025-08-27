export interface TabButton {
  title: string;
  setSelectedTab: (index: number) => void;
  isActive?: boolean;
  index: number;
}