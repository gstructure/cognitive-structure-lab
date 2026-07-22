import type { ReactNode } from "react";
import "@/styles/corporate.css";

type CorporateLayoutProps = {
  children: ReactNode;
};

/**
 * G-Structure corporate surface layout.
 * Applies the light palette via data-brand="corporate".
 * This matches the current default site appearance.
 */
export function CorporateLayout({ children }: CorporateLayoutProps) {
  return (
    <div
      data-brand="corporate"
      className="corporate-layout"
      style={{ backgroundColor: "#FAFAF7", color: "#193550" }}
    >
      {children}
    </div>
  );
}
