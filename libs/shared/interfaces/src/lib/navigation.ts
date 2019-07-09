export interface ISideNaveLink {
  path: string;
  icon: string;
  label: string;
  children?: {
    path: string;
    label: string;
  }[];
}
