import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select, [data-cursor-hover]";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const rafId = useRef(0);
  const trail = useRef<{ x: number; y: number }[]>(Array.from({ length: 6 }, () => ({ x: -100, y: -100 })));
  const stateRef = useRef({
    x: -100, y: -100,
    ringX: -100, ringY: -100,
    visible: false, hovering: false, pressed: false,
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isTouch = "ontouchstart" in window;

    const style = document.createElement("style");
    style.textContent = `
      @media (hover: hover) and (pointer: fine) {
        html[data-custom-cursor='enabled'] * { cursor: none !important; }
        html[data-custom-cursor='enabled'] a:hover svg,
        html[data-custom-cursor='enabled'] button:hover svg,
        html[data-custom-cursor='enabled'] [role='button']:hover svg,
        html[data-custom-cursor='enabled'] [data-cursor-hover]:hover svg {
          filter: drop-shadow(0 0 8px hsl(var(--primary) / 0.7)) drop-shadow(0 0 20px hsl(var(--primary) / 0.3));
          color: hsl(var(--primary)) !important;
          transition: filter 0.3s ease, color 0.3s ease;
        }
        html[data-custom-cursor='enabled'] a:hover,
        html[data-custom-cursor='enabled'] button:hover,
        html[data-custom-cursor='enabled'] [role='button']:hover {
          filter: drop-shadow(0 0 6px hsl(var(--primary) / 0.15));
        }
      }
    `;
    document.head.appendChild(style);

    if (!isTouch) {
      document.documentElement.setAttribute("data-custom-cursor", "enabled");
    }

    const tick = () => {
      const s = stateRef.current;
      // Ring follows with zero delay — instant positioning
      s.ringX += (s.x - s.ringX) * 0.45;
      s.ringY += (s.y - s.ringY) * 0.45;

      // Trail: each point follows the previous with slight easing
      const t = trail.current;
      t[0].x += (s.x - t[0].x) * 0.5;
      t[0].y += (s.y - t[0].y) * 0.5;
      for (let i = 1; i < t.length; i++) {
        t[i].x += (t[i - 1].x - t[i].x) * (0.35 - i * 0.04);
        t[i].y += (t[i - 1].y - t[i].y) * (0.35 - i * 0.04);
      }

      const dotScale = s.pressed ? 0.5 : s.hovering ? 1.8 : 1;
      const ringScale = s.pressed ? 0.8 : s.hovering ? 1.5 : 1;
      const opacity = s.visible ? "1" : "0";

      if (dotRef.current) {
        dotRef.current.style.opacity = opacity;
        dotRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        dotRef.current.style.boxShadow = s.hovering
          ? "0 0 16px hsl(var(--primary) / 0.8), 0 0 32px hsl(var(--primary) / 0.4)"
          : "0 0 8px hsl(var(--primary) / 0.5)";
      }

      if (ringRef.current) {
        ringRef.current.style.opacity = opacity;
        ringRef.current.style.transform = `translate3d(${s.ringX}px, ${s.ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        ringRef.current.style.borderColor = s.hovering
          ? "hsl(var(--primary) / 0.7)"
          : "hsl(var(--primary) / 0.3)";
      }

      if (glowRef.current) {
        glowRef.current.style.opacity = s.visible ? (s.hovering ? "0.2" : "0.06") : "0";
        glowRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      }

      // Trail dots
      for (let i = 0; i < trailRefs.current.length; i++) {
        const el = trailRefs.current[i];
        if (el) {
          const fade = 1 - (i + 1) / (t.length + 1);
          el.style.opacity = s.visible ? String(fade * 0.5) : "0";
          el.style.transform = `translate3d(${t[i].x}px, ${t[i].y}px, 0) translate(-50%, -50%) scale(${fade * 0.8})`;
        }
      }

      rafId.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const s = stateRef.current;
      s.x = e.clientX;
      s.y = e.clientY;
      s.visible = true;
      s.hovering = e.target instanceof Element && !!e.target.closest(INTERACTIVE_SELECTOR);
    };
    const onDown = () => { stateRef.current.pressed = true; };
    const onUp = () => { stateRef.current.pressed = false; };
    const onLeave = () => { const s = stateRef.current; s.visible = false; s.hovering = false; s.pressed = false; };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const s = stateRef.current;
      s.x = touch.clientX; s.y = touch.clientY;
      s.ringX = touch.clientX; s.ringY = touch.clientY;
      s.visible = true; s.pressed = true;
      s.hovering = e.target instanceof Element && !!e.target.closest(INTERACTIVE_SELECTOR);
      trail.current.forEach(p => { p.x = touch.clientX; p.y = touch.clientY; });
    };
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      stateRef.current.x = touch.clientX;
      stateRef.current.y = touch.clientY;
    };
    const onTouchEnd = () => {
      stateRef.current.pressed = false;
      setTimeout(() => { stateRef.current.visible = false; stateRef.current.hovering = false; }, 600);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    if (isTouch) {
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(rafId.current);
      document.documentElement.removeAttribute("data-custom-cursor");
      style.remove();
    };
  }, []);

  return (
    <>
      {/* Dot — instant, no delay */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 rounded-full opacity-0"
        style={{ willChange: "transform, opacity", background: "hsl(var(--primary))", transition: "box-shadow 0.2s, transform 0.08s linear" }}
      />
      {/* Ring — near-instant follow */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 rounded-full border-[1.5px] opacity-0"
        style={{ willChange: "transform, opacity", borderColor: "hsl(var(--primary) / 0.3)", transition: "border-color 0.2s, transform 0.06s linear" }}
      />
      {/* Glow — instant position */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-28 w-28 rounded-full opacity-0"
        style={{ willChange: "transform, opacity", background: "radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 70%)", transition: "opacity 0.3s" }}
      />
      {/* Trail dots */}
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailRefs.current[i] = el; }}
          className="pointer-events-none fixed left-0 top-0 z-[9996] rounded-full opacity-0"
          style={{
            willChange: "transform, opacity",
            width: `${6 - i}px`,
            height: `${6 - i}px`,
            background: "hsl(var(--primary))",
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
