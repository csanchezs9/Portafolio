"use client";

/**
 * Soft, blurred rounded-rect outline that traces a card's edges — a CSS
 * take on the ShapeBlur look. The parent must be `position: relative`,
 * `rounded-xl` and (for the cursor highlight) set `--mx`/`--my` on
 * mousemove. Drop it in as the first child.
 */
export default function CardGlow({
  radius = "0.75rem",
  color = "var(--primary)",
}: {
  radius?: string;
  color?: string;
}) {
  const ringMask =
    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)";

  return (
    <>
      {/* Full soft outline (always faint, brighter on hover) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px z-[2] opacity-40 transition-opacity duration-300 group-hover:opacity-80"
        style={{
          borderRadius: radius,
          border: `1.5px solid hsl(${color} / 0.55)`,
          filter: "blur(3px)",
        }}
      />

      {/* Cursor-following bright segment along the border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          borderRadius: radius,
          background: `radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), hsl(${color} / 0.95), transparent 70%)`,
          padding: "1.5px",
          filter: "blur(1.5px)",
          WebkitMask: ringMask,
          WebkitMaskComposite: "xor",
          mask: ringMask,
          maskComposite: "exclude",
        }}
      />
    </>
  );
}
