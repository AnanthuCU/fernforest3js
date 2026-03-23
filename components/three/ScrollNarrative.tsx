"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Each phase: visible between scrollStart and scrollEnd (0-1 of total hero scroll) */
const PHASES = [
  {
    tag: "The seed awakens",
    headline: "Born from\nthe soil.",
    body: "Every microgreen begins with a single seed pressed into rich earth — waiting for its moment.",
    in: 0.00,   /* fade in starts  */
    mid: 0.06,   /* fully visible   */
    out: 0.20,   /* fade out starts */
    end: 0.26,   /* fully gone      */
  },
  {
    tag: "First light",
    headline: "Reaching\nfor light.",
    body: "Within days, pale shoots push upward. The stem strengthens. Life insists on itself.",
    in: 0.24,
    mid: 0.30,
    out: 0.44,
    end: 0.50,
  },
  {
    tag: "Leaves unfurl",
    headline: "Leaves open\nlike palms.",
    body: "Cotyledon leaves spread wide — concentrating nutrients 40× denser than the adult plant.",
    in: 0.48,
    mid: 0.55,
    out: 0.70,
    end: 0.76,
  },
  {
    tag: "Peak harvest",
    headline: "At its\nfinest hour.",
    body: "Hand-harvested at peak nutrition — straight to your door within 24 hours. This is Fern Forest.",
    in: 0.74,
    mid: 0.80,
    out: 0.96,
    end: 1.00,
  },
];

export default function ScrollNarrative() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    PHASES.forEach((ph, i) => {
      const el = refs.current[i];
      if (!el) return;

      const inDuration = ph.mid - ph.in;
      const outDuration = ph.end - ph.out;

      // Animate In
      tl.fromTo(el, 
        { opacity: 0, y: 28 },
        { duration: inDuration, opacity: 1, y: 0, ease: "power2.out" },
        ph.in
      );

      // Animate Out
      tl.to(el, 
        { duration: outDuration, opacity: 0, y: -28, ease: "power2.in" },
        ph.out
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {PHASES.map((ph, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          style={{
            position: "absolute",
            left: "clamp(24px, 5vw, 80px)",
            top: "50%",
            transform: "translateY(calc(-50% + 28px))",
            opacity: 0,
            maxWidth: "min(380px, 44vw)",
            /* no transition — we set styles every frame for crisp scrub */
          }}
        >
          {/* tag */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 28, height: 1, background: "#b8d96b", flexShrink: 0 }} />
            <span style={{
              fontFamily: "var(--font-outfit,sans-serif)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#b8d96b",
              whiteSpace: "nowrap",
            }}>
              {ph.tag}
            </span>
          </div>

          {/* headline */}
          <h2 style={{
            fontFamily: "var(--font-dm-serif,Georgia,serif)",
            fontSize: "clamp(2rem,4.5vw,3.5rem)",
            color: "#fff",
            lineHeight: 1.0,
            marginBottom: 20,
            whiteSpace: "pre-line",
          }}>
            {ph.headline}
          </h2>

          {/* body */}
          <p style={{
            fontFamily: "var(--font-outfit,sans-serif)",
            fontSize: 14,
            color: "rgba(255,255,255,0.58)",
            lineHeight: 1.7,
            maxWidth: 300,
          }}>
            {ph.body}
          </p>
        </div>
      ))}
    </div>
  );
}
