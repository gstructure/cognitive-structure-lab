"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

/**
 * Kinetic Kai avatar — SVG-only, cursor-reactive, pointer-interactive.
 * Uses CSS animations + a lightweight rAF spring loop. No external
 * motion library required.
 *
 * Cursor proximity: Kai tilts toward the pointer within its bounding
 * region using a critically-damped spring (no jitter, no linear snap).
 * A soft radial glow follows the same target, offset behind the SVG,
 * simulating "cognitive activity" without ever fully lighting up.
 *
 * Honors prefers-reduced-motion: disables ambient float, tilt, and
 * morph, preserving the static final SVG.
 *
 * Decorative: aria-hidden="true", not announced to screen readers.
 */

const BODY_IDLE =
  "M30 55 C20 75,22 102,40 116 C46 120,54 120,60 116 C78 102,80 75,70 55 C63 63,37 63,30 55 Z";
const BODY_ACTIVE =
  "M30 53 C16 74,22 104,39 117 C46 122,55 120,61 115 C81 100,84 73,70 53 C62 65,38 65,30 53 Z";

const NODE_IDLE = "M50 58 L46 72 L54 84 L48 100 L52 115";
const NODE_ACTIVE = "M50 58 L43 70 L57 84 L45 98 L53 115";

// Critically-damped spring constants — tuned to feel alive, never jittery.
const SPRING_STIFFNESS = 0.085;
const SPRING_DAMPING = 0.82;

type KaiAvatarProps = {
  className?: string;
};

export function KaiAvatar({ className }: KaiAvatarProps) {
  const [active, setActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const figureRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const svgGroupRef = useRef<SVGGElement>(null);

  // Spring state — target set by pointer, position eased toward it each frame.
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    function tick() {
      // Critically-damped spring step toward target.
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      vel.current.x = (vel.current.x + dx * SPRING_STIFFNESS) * SPRING_DAMPING;
      vel.current.y = (vel.current.y + dy * SPRING_STIFFNESS) * SPRING_DAMPING;
      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      const tiltX = pos.current.y * -6; // rotateX responds to vertical offset
      const tiltY = pos.current.x * 8; // rotateY responds to horizontal offset

      if (svgGroupRef.current) {
        svgGroupRef.current.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate(${pos.current.x * 6}px, ${pos.current.y * 4}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${50 + pos.current.x * 22}%, ${50 + pos.current.y * 22}%)`;
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reduceMotion]);

  function handlePointerMove(e: ReactPointerEvent<HTMLElement>) {
    if (reduceMotion || !figureRef.current) return;
    const rect = figureRef.current.getBoundingClientRect();
    // Normalize to -1..1 range relative to the figure's center.
    target.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    target.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }

  function handlePointerLeave() {
    setActive(false);
    target.current.x = 0;
    target.current.y = 0;
  }

  return (
    <figure
      ref={figureRef}
      className={className}
      aria-hidden="true"
      onPointerEnter={() => setActive(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        position: "relative",
        margin: 0,
        contain: "layout paint",
        animation: reduceMotion ? "none" : "kai-ambient-float 5.2s ease-in-out infinite",
      }}
    >
      {/* Ambient glow — follows cursor with a soft lag, sits behind the SVG */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: active ? 0.55 : 0.28,
          transition: "opacity 0.5s ease",
          background:
            "radial-gradient(220px 220px at 50% 50%, rgb(239 168 49 / 32%), rgb(58 46 140 / 14%) 45%, transparent 72%)",
          filter: "blur(10px)",
          transform: "translate(50%, 50%)",
          willChange: "transform",
        }}
      />

      <svg
        viewBox="0 0 100 125"
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="125"
        focusable="false"
        style={{ position: "relative", zIndex: 1, display: "block", width: "100%", height: "auto" }}
      >
        <g
          ref={svgGroupRef}
          style={{
            transformOrigin: "50px 62px",
            willChange: reduceMotion ? undefined : "transform",
          }}
        >
          {/* Head group — the circular-arrow mark */}
          <g
            style={{
              transformOrigin: "50px 35px",
              transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <path
              d="M68 35 A18 18 0 1 1 59 19.4"
              fill="none"
              stroke="#EFA831"
              strokeWidth="5"
              strokeLinecap="round"
              style={{
                strokeDasharray: 120,
                strokeDashoffset: reduceMotion ? 0 : undefined,
                animation: reduceMotion ? "none" : "kai-head-draw 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
              }}
            />
            <line
              x1="59"
              y1="19.4"
              x2="70"
              y2="0.4"
              stroke="#EFA831"
              strokeWidth="5"
              strokeLinecap="round"
              style={{
                opacity: active ? 1 : undefined,
                animation: reduceMotion ? "none" : (active ? "none" : "kai-arrow-pulse 1.8s ease-in-out infinite"),
              }}
            />
            <polygon points="70,0.4 69.5,9.3 62.5,5.3" fill="#EFA831" />
          </g>

          {/* Body — purple mass with morph on hover */}
          <path
            d={active ? BODY_ACTIVE : BODY_IDLE}
            fill="#3A2E8C"
            style={{
              transition: reduceMotion ? "none" : "d 0.72s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {/* Internal neural path — orange nodes */}
          <path
            d={active ? NODE_ACTIVE : NODE_IDLE}
            fill="none"
            stroke="#F0A046"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transition: reduceMotion ? "none" : "d 0.62s cubic-bezier(0.22, 1, 0.36, 1)",
              strokeDasharray: reduceMotion ? "none" : 200,
              strokeDashoffset: reduceMotion ? 0 : undefined,
              animation: reduceMotion ? "none" : "kai-node-reveal 1.2s 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            }}
          />
        </g>
      </svg>

      <style>{`
        @keyframes kai-ambient-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes kai-head-draw {
          from { stroke-dashoffset: 120; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes kai-arrow-pulse {
          0%, 100% { opacity: 0.72; }
          50% { opacity: 1; }
        }

        @keyframes kai-node-reveal {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes kai-ambient-float { 0%, 100% { transform: none; } }
          @keyframes kai-head-draw { from, to { stroke-dashoffset: 0; opacity: 1; } }
          @keyframes kai-arrow-pulse { from, to { opacity: 1; } }
          @keyframes kai-node-reveal { from, to { stroke-dashoffset: 0; } }
        }
      `}</style>
    </figure>
  );
}
