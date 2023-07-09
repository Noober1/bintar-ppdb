export interface LayoutComponentProps {
  children: React.ReactNode;
  [key: string]: any;
}
export type LayoutComponent = (props: LayoutComponentProps) => React.ReactNode;
