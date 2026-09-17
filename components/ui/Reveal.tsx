"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

type Props = {
  children: ReactNode;
  /** Stagger index — drives `transition-delay` via the `--i` custom property. */
  index?: number;
  className?: string;
  as?: ElementType;
};

export function Reveal({ children, index = 0, className = "", as }: Props) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={{ "--i": index } as React.CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}
