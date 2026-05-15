import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const ratio = (h.scrollTop + window.innerHeight) / h.scrollHeight;
      setVisible(ratio > 0.5 && h.scrollTop > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      type="button"
      aria-label="Volver arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="md:hidden fixed bottom-5 left-5 z-[55] inline-flex h-10 w-10 items-center justify-center border border-border bg-[color:var(--color-surface)] text-foreground shadow-[0_12px_28px_-12px_rgba(5,50,90,0.4)]"
    >
      <ArrowUp size={16} />
    </button>
  );
}
