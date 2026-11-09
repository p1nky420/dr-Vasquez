import type { ReactNode } from "react";
import "./academia.css";

export default function AcademiaLayout({ children }: { children: ReactNode }) {
  return <div className="ed-page academy">{children}</div>;
}
