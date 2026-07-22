import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & {
  title?: string;
};

/**
 * KAIRON product mark — circular arrow with upward trajectory.
 * Renders as inline SVG, uses currentColor for styling via parent.
 * Accessible: role="img" with aria-label when title is provided.
 */
export function KaironMark({ title = "KAIRON", ...props }: Props) {
  const labelled = Boolean(title);

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role={labelled ? "img" : undefined}
      aria-label={labelled ? title : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
      {...props}
    >
      <path
        d="M74 52 A26 26 0 1 1 61 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <line
        x1="54"
        y1="44"
        x2="88"
        y2="6"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <polygon points="88,6 85.4,17.1 77.2,9.8" fill="currentColor" />
    </svg>
  );
}
