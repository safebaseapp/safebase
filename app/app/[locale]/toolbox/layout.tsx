import type { ReactNode } from "react";
import "./toolbox-visuals.css";

type Props = {
  children: ReactNode;
};

export default function ToolboxLayout({ children }: Props) {
  return <div className="toolbox-visual-scope">{children}</div>;
}
