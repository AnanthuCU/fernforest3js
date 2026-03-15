/**
 * Shared scroll progress store for the hero section.
 * Maps window.scrollY over the 500vh hero container to 0..1.
 * Any component can subscribe and get updated on every scroll tick.
 */

type Listener = (progress: number) => void;
const listeners = new Set<Listener>();
let _progress = 0;

function getHeroHeight(): number {
  // 500vh hero section
  return window.innerHeight * 5;
}

function onScroll() {
  const p = Math.min(1, Math.max(0, window.scrollY / getHeroHeight()));
  if (p === _progress) return;
  _progress = p;
  listeners.forEach((fn) => fn(p));
}

export function subscribeScrollProgress(fn: Listener): () => void {
  if (typeof window === "undefined") return () => {};
  if (listeners.size === 0) {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  listeners.add(fn);
  fn(_progress); // immediate call
  return () => {
    listeners.delete(fn);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", onScroll);
    }
  };
}

export function getProgress() { return _progress; }
