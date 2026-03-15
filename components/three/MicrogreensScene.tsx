"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { subscribeScrollProgress } from "@/lib/scrollProgress";

/* ─── palette ─── */
const BG_COL     = new THREE.Color(0x0a1505);
const SOIL_COL   = new THREE.Color(0x2a1a0e);
const STEM_A     = new THREE.Color(0x2d5a14);
const STEM_B     = new THREE.Color(0x6aaa28);
const LEAF_A     = new THREE.Color(0x3d8c18);
const LEAF_B     = new THREE.Color(0x90c940);
const LIME       = new THREE.Color(0xb8d96b);

function makeStemGeo(h: number, r: number) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const x = Math.sin(t * Math.PI * 1.8) * 0.05 * t;
    pts.push(new THREE.Vector3(x, t * h, x * 0.4));
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 20, r, 6, false);
}

function makeLeafGeo(sz: number) {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo( sz * 0.8,  sz * 0.3,  sz * 0.9,  sz * 1.2,  0,      sz * 1.6);
  s.bezierCurveTo(-sz * 0.9,  sz * 1.2, -sz * 0.8,  sz * 0.3,  0,      0);
  return new THREE.ShapeGeometry(s, 12);
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, v)); }

/* map raw 0-1 scroll progress to a 0-1 range within [lo, hi] */
function phase(p: number, lo: number, hi: number) {
  return clamp((p - lo) / (hi - lo));
}

export default function MicrogreensScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── size ── */
    const W = mount.clientWidth  || window.innerWidth;
    const H = mount.clientHeight || window.innerHeight;

    /* ── renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    mount.appendChild(renderer.domElement);

    /* ── scene / fog ── */
    const scene = new THREE.Scene();
    scene.background = BG_COL;
    scene.fog = new THREE.FogExp2(0x0a1505, 0.2);

    /* ── camera ── */
    const cam = new THREE.PerspectiveCamera(42, W / H, 0.01, 60);
    cam.position.set(0, 0.5, 3.2);

    /* ── lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const sun = new THREE.DirectionalLight(0xfff8e7, 1.8);
    sun.position.set(3, 5, 2);
    sun.castShadow = true;
    sun.shadow.mapSize.setScalar(1024);
    sun.shadow.camera.left = sun.shadow.camera.bottom = -2.5;
    sun.shadow.camera.right = sun.shadow.camera.top = 2.5;
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x78c832, 0.5);
    rim.position.set(-3, 1, -2);
    scene.add(rim);
    const glow = new THREE.PointLight(0xb8d96b, 0, 5);
    glow.position.set(0, 1.5, 0.5);
    scene.add(glow);

    /* ── soil tray ── */
    const soil = new THREE.Mesh(
      new THREE.CylinderGeometry(1.1, 1.3, 0.16, 56),
      new THREE.MeshStandardMaterial({ color: SOIL_COL, roughness: 1 })
    );
    soil.position.y = -0.08;
    soil.receiveShadow = true;
    scene.add(soil);
    const trayRim = new THREE.Mesh(
      new THREE.TorusGeometry(1.12, 0.04, 8, 56),
      new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.5, metalness: 0.5 })
    );
    trayRim.rotation.x = Math.PI / 2;
    trayRim.position.y = 0.04;
    scene.add(trayRim);

    /* ── seeds ── */
    const seedGeo = new THREE.SphereGeometry(0.022, 6, 5);
    const seedMat = new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.95 });
    for (let i = 0; i < 80; i++) {
      const a = Math.random() * Math.PI * 2, r = Math.random() * 0.98;
      const s = new THREE.Mesh(seedGeo, seedMat);
      s.position.set(Math.cos(a) * r, 0.002, Math.sin(a) * r);
      s.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      scene.add(s);
    }

    /* ── stems ── */
    interface StemInfo { mesh: THREE.Mesh; height: number; px: number; pz: number; }
    const stems: StemInfo[] = [];
    for (let i = 0; i < 32; i++) {
      const a = (i / 32) * Math.PI * 2 + Math.random() * 0.25;
      const d = 0.12 + Math.random() * 0.88;
      const h = 0.5  + Math.random() * 0.6;
      const r = 0.013 + Math.random() * 0.007;
      const mesh = new THREE.Mesh(
        makeStemGeo(h, r),
        new THREE.MeshStandardMaterial({ color: STEM_A.clone().lerp(STEM_B, Math.random()), roughness: 0.65 })
      );
      mesh.position.set(Math.cos(a) * d, 0, Math.sin(a) * d);
      mesh.scale.y = 0;
      mesh.castShadow = true;
      scene.add(mesh);
      stems.push({ mesh, height: h, px: Math.cos(a) * d, pz: Math.sin(a) * d });
    }

    /* ── leaves ── */
    interface LeafInfo { mesh: THREE.Mesh; si: number; ry: number; tilt: number; }
    const leaves: LeafInfo[] = [];
    const leafGeo = makeLeafGeo(0.12);
    stems.forEach((sd, i) => {
      const count = i % 3 === 0 ? 2 : 1;
      for (let j = 0; j < count; j++) {
        const mat = new THREE.MeshStandardMaterial({
          color: LEAF_A.clone().lerp(LEAF_B, Math.random()),
          side: THREE.DoubleSide, roughness: 0.7,
          transparent: true, opacity: 0,
        });
        const mesh = new THREE.Mesh(leafGeo, mat);
        mesh.castShadow = true;
        scene.add(mesh);
        leaves.push({ mesh, si: i, ry: Math.random() * Math.PI * 2 + j * Math.PI, tilt: 0.3 + Math.random() * 0.4 });
      }
    });

    /* ── particles ── */
    const NP = 320;
    const pBuf = new Float32Array(NP * 3);
    for (let i = 0; i < NP; i++) {
      pBuf[i*3]   = (Math.random()-0.5)*3.5;
      pBuf[i*3+1] = Math.random()*3.2 - 0.3;
      pBuf[i*3+2] = (Math.random()-0.5)*3.5;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pBuf, 3));
    const pMat = new THREE.PointsMaterial({
      color: LIME, size: 0.022, transparent: true, opacity: 0,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    /* ── scroll state (driven by subscribeScrollProgress) ── */
    let scrollP = 0;
    const unsubscribe = subscribeScrollProgress((p) => { scrollP = p; });

    /* ── render loop ── */
    let rafId: number;
    const clock = new THREE.Clock();

    function tick() {
      rafId = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      const p = scrollP;

      /* derive per-phase values directly from raw scroll 0-1 */
      const stemScale   = lerp(0,    1,    clamp(p / 0.6));         // grows 0→60%
      const leafOp      = phase(p, 0.50, 0.80);                     // leaves 50→80%
      const particleOp  = phase(p, 0.35, 0.70);                     // spores 35→70%
      const camY        = lerp(0.5,  1.3,  p);
      const camZ        = lerp(3.2,  2.0,  clamp(p / 0.8));
      const glowInt     = lerp(0,    1.6,  phase(p, 0.5, 0.85));
      const sunInt      = lerp(1.8,  3.5,  phase(p, 0.4, 0.9));

      /* stems */
      stems.forEach((sd) => { sd.mesh.scale.y = stemScale; });

      /* leaves */
      leaves.forEach((ld) => {
        const sd = stems[ld.si];
        ld.mesh.position.set(sd.px, sd.height * stemScale, sd.pz);
        ld.mesh.rotation.y = ld.ry + Math.sin(t * 0.7 + ld.si) * 0.06;
        ld.mesh.rotation.z = ld.tilt;
        const s = leafOp * (0.75 + Math.sin(ld.si * 1.3) * 0.25);
        ld.mesh.scale.setScalar(Math.max(0, s));
        (ld.mesh.material as THREE.MeshStandardMaterial).opacity = leafOp;
      });

      /* particles */
      const pa = pGeo.attributes.position as THREE.BufferAttribute;
      const arr = pa.array as Float32Array;
      for (let i = 0; i < NP; i++) {
        arr[i*3+1] += 0.0007;
        if (arr[i*3+1] > 2.8) arr[i*3+1] = -0.3;
      }
      pa.needsUpdate = true;
      pMat.opacity = particleOp * 0.45;

      /* lights */
      glow.intensity = glowInt;
      sun.intensity  = sunInt;

      /* camera */
      cam.position.x = Math.sin(t * 0.15) * 0.18;
      cam.position.y = camY;
      cam.position.z = camZ;
      cam.lookAt(0, stemScale * 0.55, 0);

      renderer.render(scene, cam);
    }
    tick();

    /* ── resize ── */
    function onResize() {
      const w = mount.clientWidth  || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      unsubscribe();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
}
