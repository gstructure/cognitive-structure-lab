import type { ReactNode } from "react";
import "@/styles/kairon.css";

type ProductLayoutProps = {
  children: ReactNode;
};

/**
 * KAIRON product surface layout.
 * Applies the dark obsidian/gold palette via data-brand="kairon".
 * Renders #110C08 background immediately — no flash.
 */
export function ProductLayout({ children }: ProductLayoutProps) {
  return (
    <div
      data-brand="kairon"
      className="kairon-layout"
      style={{ backgroundColor: "#110C08", color: "#F8F1E8" }}
    >
      {children}
    </div>
  );
}
