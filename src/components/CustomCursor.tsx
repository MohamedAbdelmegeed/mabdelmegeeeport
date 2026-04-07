import { useEffect, useCallback, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomCursor = () => {
  const isMobile = useIsMobile();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const hovering = useRef(false);
  const rafId = useRef(0);

  const tick = useCallback(() => {
    // Lerp ring toward cursor
    ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
    ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      dotRef.current.style.width = dotRef.current.style.height = hovering.current ? "48px" : "10px";
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      ringRef.current.style.width = ringRef.current.style.height = hovering.current ? "64px" : "36px";
    }
    if (glowRef.current) {
      glowRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
    }

    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]")) {
        hovering.current = true;
      }
    };
    const onOut = () => { hovering.current = false; };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [isMobile, tick]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference rounded-full bg-white transition-[width,height] duration-200 ease-out"
        style={{ width: 10, height: 10, willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full transition-[width,height] duration-300 ease-out"
        style={{
          width: 36, height: 36,
          border: "1px solid hsl(160 60% 45% / 0.4)",
          willChange: "transform",
        }}
      />
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] w-[250px] h-[250px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, hsl(160 60% 45%), transparent 70%)",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default CustomCursor;
