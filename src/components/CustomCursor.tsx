import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select, [data-cursor-hover]";

const CustomCursor = () => {
  const isMobile = useIsMobile();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  const stateRef = useRef({
    x: -100, y: -100,
    ringX: -100, ringY: -100,
    glowX: -100, glowY: -100,
    visible: false, hovering: false, pressed: false,
  });

  useEffect(() => {
    if (isMobile || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.removeAttribute("data-custom-cursor");
      return;
    }

    document.documentElement.setAttribute("data-custom-cursor", "enabled");

    // Inject hover glow effect via CSS
    const style = document.createElement("style");
    style.textContent = `
      @media (hover: hover) and (pointer: fine) {
        html[data-custom-cursor='enabled'] a:hover svg,
        html[data-custom-cursor='enabled'] button:hover svg,
        html[data-custom-cursor='enabled'] [role='button']:hover svg,
        html[data-custom-cursor='enabled'] [data-cursor-hover]:hover svg {
          filter: drop-shadow(0 0 8px hsl(160 60% 45% / 0.7)) drop-shadow(0 0 20px hsl(160 60% 45% / 0.3));
          color: hsl(160 60% 45%) !important;
          transition: filter 0.3s ease, color 0.3s ease;
        }
        html[data-custom-cursor='enabled'] a:hover,
        html[data-custom-cursor='enabled'] button:hover,
        html[data-custom-cursor='enabled'] [role='button']:hover {
          filter: drop-shadow(0 0 6px hsl(160 60% 45% / 0.15));
        }
      }
    `;
    document.head.appendChild(style);

    const tick = () => {
      const s = stateRef.current;
      s.ringX += (s.x - s.ringX) * 0.18;
      s.ringY += (s.y - s.ringY) * 0.18;
      s.glowX += (s.x - s.glowX) * 0.08;
      s.glowY += (s.y - s.glowY) * 0.08;

      const dotScale = s.pressed ? 0.6 : s.hovering ? 2 : 1;
      const ringScale = s.pressed ? 0.85 : s.hovering ? 1.6 : 1;
      const opacity = s.visible ? "1" : "0";

      if (dotRef.current) {
        dotRef.current.style.opacity = opacity;
        dotRef.current.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        dotRef.current.style.background = s.hovering
          ? "hsl(160 60% 45%)"
          : "hsl(160 60% 45%)";
        dotRef.current.style.boxShadow = s.hovering
          ? "0 0 20px hsl(160 60% 45% / 0.8), 0 0 40px hsl(160 60% 45% / 0.3)"
          : "0 0 6px hsl(160 60% 45% / 0.4)";
      }

      if (ringRef.current) {
        ringRef.current.style.opacity = opacity;
        ringRef.current.style.transform = `translate3d(${s.ringX}px, ${s.ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        ringRef.current.style.borderColor = s.hovering
          ? "hsl(160 60% 45% / 0.6)"
          : "hsl(160 60% 45% / 0.25)";
      }

      if (glowRef.current) {
        glowRef.current.style.opacity = s.visible ? (s.hovering ? "0.15" : "0.05") : "0";
        glowRef.current.style.transform = `translate3d(${s.glowX}px, ${s.glowY}px, 0) translate(-50%, -50%)`;
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

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId.current);
      document.documentElement.removeAttribute("data-custom-cursor");
      style.remove();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-3 w-3 rounded-full opacity-0 md:block"
        style={{ willChange: "transform, opacity", background: "hsl(160 60% 45%)", transition: "box-shadow 0.3s, background 0.3s" }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-10 w-10 rounded-full border-2 opacity-0 md:block"
        style={{
          willChange: "transform, opacity",
          borderColor: "hsl(160 60% 45% / 0.25)",
          transition: "border-color 0.3s, transform 0.15s",
        }}
      />
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] hidden h-32 w-32 rounded-full opacity-0 md:block"
        style={{
          willChange: "transform, opacity",
          background: "radial-gradient(circle, hsl(160 60% 45% / 0.4), transparent 70%)",
          transition: "opacity 0.4s",
        }}
      />
    </>
  );
};

export default CustomCursor;
