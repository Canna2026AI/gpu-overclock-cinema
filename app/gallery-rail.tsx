"use client";

import Image from "next/image";
import { useRef } from "react";

type GalleryItem = {
  src: string;
  caption: string;
  alt: string;
  concept?: boolean;
};

type GalleryRailProps = {
  items: GalleryItem[];
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
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

export function GalleryRail({ items }: GalleryRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const move = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({
      left: direction * Math.max(320, rail.clientWidth * 0.78),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="gallery-rail-shell">
      <div className="gallery-controls" aria-label="Gallery controls">
        <button type="button" aria-label="Previous frame" aria-controls="gpu-gallery-rail" onClick={() => move(-1)}>
          <ArrowIcon direction="left" />
        </button>
        <button type="button" aria-label="Next frame" aria-controls="gpu-gallery-rail" onClick={() => move(1)}>
          <ArrowIcon direction="right" />
        </button>
      </div>
      <div
        className="gallery-grid"
        id="gpu-gallery-rail"
        aria-label="GPU visual archive"
        tabIndex={0}
        ref={railRef}
        onKeyDown={(event) => {
          if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }}
      >
        {items.map((item, index) => (
          <figure className={`gallery-card gallery-card-${index + 1}`} key={item.src}>
            <div className="gallery-image">
              <Image src={item.src} alt={item.alt} fill sizes="(max-width: 840px) 88vw, 68vw" />
            </div>
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.caption}
            </figcaption>
            {item.concept ? (
              <p className="concept-label">CONCEPT ART — NOT LIVE MARKET DATA</p>
            ) : null}
          </figure>
        ))}
      </div>
    </div>
  );
}
