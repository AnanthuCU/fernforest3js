"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

const MicrogreensScene = dynamic(() => import("@/components/three/MicrogreensScene"), { ssr: false });
const ScrollNarrative  = dynamic(() => import("@/components/three/ScrollNarrative"),  { ssr: false });
const ScrollProgress   = dynamic(() => import("@/components/three/ScrollProgress"),   { ssr: false });

export default function HeroScene() {
  return (
    <>
      {/*
        ── 500vh tall scroll container ──────────────────────────────
        This gives us 5 full viewport-heights of scroll distance.
        The sticky child stays pinned for the entire 500vh.
        All scroll-driven logic reads window.scrollY directly via
        the shared subscribeScrollProgress() hook — no GSAP trigger needed.
      */}
      <div id="hero-scroll-container" style={{ position: "relative", height: "500vh", width: "100%" }}>

        {/* Sticky fullscreen panel */}
        <div style={{
          position: "sticky",
          top:      0,
          left:     0,
          width:    "100%",
          height:   "100vh",
          overflow: "hidden",
        }}>

          {/*
            Canvas host — MUST have explicit position+size.
            MicrogreensScene renders its own renderer.domElement inside this div.
          */}
          <div style={{
            position: "absolute",
            top:      0,
            left:     0,
            width:    "100%",
            height:   "100%",
          }}>
            <MicrogreensScene />
          </div>

          {/* Text phases overlay */}
          <ScrollNarrative />

          {/* Top vignette (navbar bleed) */}
          <div style={{
            position:      "absolute",
            top:0, left:0, right:0,
            height:        110,
            background:    "linear-gradient(to bottom,rgba(10,21,5,0.88) 0%,transparent 100%)",
            pointerEvents: "none",
            zIndex:        15,
          }} />

          {/* Bottom vignette (bleeds into next section) */}
          <div style={{
            position:      "absolute",
            bottom:0, left:0, right:0,
            height:        160,
            background:    "linear-gradient(to top,#0a1505 0%,transparent 100%)",
            pointerEvents: "none",
            zIndex:        15,
          }} />

          {/* Brand wordmark — top right */}
          <div style={{
            position:      "absolute",
            top:           76,
            right:         "clamp(24px,4vw,64px)",
            zIndex:        20,
            display:       "flex",
            flexDirection: "column",
            alignItems:    "flex-end",
            gap:           4,
          }}>
            <span style={{
              fontFamily:    "var(--font-dm-serif,Georgia,serif)",
              fontSize:      "clamp(1.3rem,2.2vw,1.9rem)",
              color:         "#fff",
              letterSpacing: "0.02em",
            }}>
              fern forest
            </span>
            <span style={{
              fontFamily:    "var(--font-outfit,sans-serif)",
              fontSize:      9,
              fontWeight:    700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color:         "rgba(184,217,107,0.8)",
            }}>
              fresh microgreens
            </span>
          </div>

          {/* Scroll hint — bottom center */}
          <div style={{
            position:      "absolute",
            bottom:        40,
            left:          "50%",
            transform:     "translateX(-50%)",
            zIndex:        20,
            display:       "flex",
            flexDirection: "column",
            alignItems:    "center",
            gap:           8,
          }}>
            <span style={{
              fontFamily:    "var(--font-outfit,sans-serif)",
              fontSize:      9,
              fontWeight:    700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color:         "rgba(255,255,255,0.3)",
            }}>
              scroll to grow
            </span>
            <ArrowDown
              className="animate-bounce"
              style={{ width:15, height:15, color:"rgba(184,217,107,0.5)" }}
            />
          </div>

          {/* CTA — bottom right */}
          <div style={{
            position:      "absolute",
            bottom:        64,
            right:         "clamp(24px,4vw,64px)",
            zIndex:        20,
            display:       "flex",
            flexDirection: "column",
            alignItems:    "flex-end",
            gap:           12,
          }}>
            <Link
              href="/#varieties"
              onClick={(e) => {
                const el = document.getElementById("varieties");
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", "/#varieties");
                }
              }}
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            8,
                background:     "#b8d96b",
                color:          "#2D5016",
                borderRadius:   9999,
                padding:        "12px 28px",
                fontFamily:     "var(--font-outfit,sans-serif)",
                fontSize:       13,
                fontWeight:     700,
                textDecoration: "none",
              }}
            >
              Shop the harvest →
            </Link>
            <a
              href="https://wa.me/918113998511"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily:     "var(--font-outfit,sans-serif)",
                fontSize:       11,
                letterSpacing:  "0.05em",
                color:          "rgba(255,255,255,0.38)",
                textDecoration: "none",
              }}
            >
              +91 81139 98511 · WhatsApp
            </a>
          </div>

          <ScrollProgress />
        </div>{/* /sticky */}
      </div>{/* /500vh */}

      {/* Transition strip into catalog */}
      <div style={{
        width:           "100%",
        padding:         "40px 0",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        background:      "#0a1505",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <div style={{ width:80, height:1, background:"rgba(255,255,255,0.08)" }} />
          <span style={{
            fontFamily: "var(--font-dm-serif,Georgia,serif)",
            fontSize:   "clamp(0.95rem,1.8vw,1.25rem)",
            color:      "rgba(255,255,255,0.5)",
            fontStyle:  "italic",
          }}>
            Grown for those who demand the best
          </span>
          <div style={{ width:80, height:1, background:"rgba(255,255,255,0.08)" }} />
        </div>
      </div>
    </>
  );
}
