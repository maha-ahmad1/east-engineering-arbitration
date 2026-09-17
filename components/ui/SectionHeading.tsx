import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  heading: string;
  sub?: string;
  /** Dark sections invert the text colours. */
  onDark?: boolean;
  align?: "start" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  heading,
  sub,
  onDark = false,
  align = "start",
  className = "",
}: Props) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-start";

  return (
    <Reveal className={`flex flex-col ${alignment} ${className}`}>
      <span
        className={`text-[0.8125rem] font-semibold ${
          onDark ? "text-gold-lt" : "text-gold"
        }`}
      >
        {eyebrow}
      </span>

      {/* The gold rule — the identity signature, repeated at every section. */}
      <span className="mt-3 block h-1 w-[88px] rounded-full bg-gold" />

      <h2
        className={`mt-5 max-w-[22ch] text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        {heading}
      </h2>

      {sub && (
        <p
          className={`mt-4 max-w-[58ch] text-[1.0625rem] ${
            onDark ? "text-white/70" : "text-muted"
          }`}
        >
          {sub}
        </p>
      )}
    </Reveal>
  );
}
