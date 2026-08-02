"use client";

import Image from "next/image";
import { useRef } from "react";

type Signal = {
  date: string;
  type: string;
  title: string;
  copy: string;
  href: string;
  image: string;
  alt: string;
};

type SignalTimelineProps = {
  items: Signal[];
};

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
      <path
        d={direction === "left" ? "M19 12H5m6-6-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function SignalTimeline({ items }: SignalTimelineProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({
      left: direction * Math.max(300, rail.clientWidth * 0.68),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="timeline-shell">
      <div className="timeline-controls" aria-label="Signal timeline controls">
        <button type="button" aria-label="Previous signal" aria-controls="signal-timeline" onClick={() => move(-1)}>
          <Arrow direction="left" />
        </button>
        <button type="button" aria-label="Next signal" aria-controls="signal-timeline" onClick={() => move(1)}>
          <Arrow direction="right" />
        </button>
      </div>
      <div
        className="timeline-rail"
        id="signal-timeline"
        aria-label="GPU official updates"
        tabIndex={0}
        ref={railRef}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }}
      >
        {items.map((item, index) => (
          <a
            className="timeline-card"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            key={`${item.href}-${item.title}`}
          >
            <div className="timeline-image">
              <Image src={item.image} alt={item.alt} fill sizes="(max-width: 840px) 86vw, 48vw" />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <div className="timeline-copy">
              <div>
                <p>{item.date}</p>
                <span>{item.type}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <strong>Open on X <span aria-hidden="true">↗</span></strong>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
