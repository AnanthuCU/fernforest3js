"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DOTS = [
  { label: "Seed", from: 0.00, to: 0.25 },
  { label: "Sprout", from: 0.25, to: 0.50 },
  { label: "Leaves", from: 0.50, to: 0.75 },
  { label: "Harvest", from: 0.75, to: 1.00 },
];


export default function ScrollProgress() {
  /* Use DOM refs instead of React state — avoids re-render on every scroll tick */
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: "#hero-scroll-container",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = self.progress;

        const active = DOTS.findIndex((d) => p >= d.from && p < d.to);
        const realActive = p >= 1 ? DOTS.length - 1 : active;

        DOTS.forEach((_, i) => {
          const dot = dotRefs.current[i];
          const txt = textRefs.current[i];
          const isActive = i === realActive;
          const isPast = i < realActive;

          if (dot) {
            dot.style.width = isActive ? "10px" : "6px";
            dot.style.height = isActive ? "10px" : "6px";
            dot.style.background = isActive
              ? "#b8d96b"
              : isPast ? "rgba(122,171,58,0.55)" : "rgba(255,255,255,0.18)";
            dot.style.boxShadow = isActive ? "0 0 8px #b8d96b88" : "none";
          }
          if (txt) {
            txt.style.color = isActive
              ? "rgba(184,217,107,0.9)" : "rgba(255,255,255,0.22)";
          }
        });

        if (trackRef.current) {
          trackRef.current.style.height = `${p * 100}%`;
        }
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        right: 24,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 20,
      }}
    >
      {DOTS.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            ref={(el) => { textRefs.current[i] = el; }}
            style={{
              fontFamily: "var(--font-outfit,sans-serif)",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.22)",
              transition: "color 0.3s",
              whiteSpace: "nowrap",
            }}
          >
            {d.label}
          </span>
          <div
            ref={(el) => { dotRefs.current[i] = el; }}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              transition: "all 0.3s",
              flexShrink: 0,
            }}
          />
        </div>
      ))}

      {/* vertical track */}
      <div style={{
        position: "absolute",
        right: 4,
        top: 0,
        bottom: 0,
        width: 1,
        background: "rgba(255,255,255,0.06)",
        zIndex: -1,
        overflow: "hidden",
      }}>
        <div
          ref={trackRef}
          style={{ width: "100%", height: "0%", background: "rgba(122,171,58,0.45)" }}
        />
      </div>
    </div>
  );
}
