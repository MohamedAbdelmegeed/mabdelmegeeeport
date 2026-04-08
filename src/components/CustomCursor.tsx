import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select, [data-cursor-hover]";

const CustomCursor = () => {
  const isMobile = useIsMobile();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  const stateRef = useRef({
    x: -100,
    y: -100,
    ringX: -100,
    ringY: -100,
    visible: false,
    hovering: false,
    pressed: false,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) {
      document.documentElement.removeAttribute("data-custom-cursor");
      return;
    }

    document.documentElement.setAttribute("data-custom-cursor", "enabled");

    const tick = () => {
      const state = stateRef.current;
      state.ringX += (state.x - state.ringX) * 0.2;
      state.ringY += (state.y - state.ringY) * 0.2;

      const dotScale = state.pressed ? 0.78 : state.hovering ? 1.5 : 1;
      const ringScale = state.pressed ? 0.92 : state.hovering ? 1.28 : 1;
      const opacity = state.visible ? "1" : "0";

      if (dotRef.current) {
        dotRef.current.style.opacity = opacity;
        dotRef.current.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      if (ringRef.current) {
        ringRef.current.style.opacity = opacity;
        ringRef.current.style.transform = `translate3d(${state.ringX}px, ${state.ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    const onMove = (event: MouseEvent) => {
      const state = stateRef.current;
      state.x = event.clientX;
      state.y = event.clientY;
      state.visible = true;
      state.hovering = event.target instanceof Element && !!event.target.closest(INTERACTIVE_SELECTOR);
    };

    const onDown = () => {
      stateRef.current.pressed = true;
    };

    const onUp = () => {
      stateRef.current.pressed = false;
    };

    const onLeave = () => {
      stateRef.current.visible = false;
      stateRef.current.hovering = false;
      stateRef.current.pressed = false;
    };

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
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2.5 w-2.5 rounded-full bg-primary opacity-0 md:block"
        style={{ willChange: "transform, opacity" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-8 w-8 rounded-full border border-primary/35 opacity-0 md:block"
        style={{
          boxShadow: "0 0 18px hsl(var(--primary) / 0.16)",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
};

export default CustomCursor;
