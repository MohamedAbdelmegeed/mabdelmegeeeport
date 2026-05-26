import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100, rx: -100, ry: -100 });
  const rafId = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window) return;

    document.documentElement.setAttribute("data-custom-cursor", "enabled");

    const style = document.createElement("style");
    style.textContent = `
      html[data-custom-cursor='enabled'] * { cursor: none !important; }
    `;
    document.head.appendChild(style);

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      const isHover = e.target instanceof Element && !!e.target.closest("a, button, [role='button'], input, textarea, [data-cursor-hover]");
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        dotRef.current.style.opacity = "1";
        dotRef.current.style.width = isHover ? "10px" : "6px";
        dotRef.current.style.height = isHover ? "10px" : "6px";
      }
      if (ringRef.current) {
        ringRef.current.style.width = isHover ? "44px" : "32px";
        ringRef.current.style.height = isHover ? "44px" : "32px";
        ringRef.current.style.opacity = isHover ? "0.7" : "0.35";
      }
    };

    const lerp = () => {
      pos.current.rx += (pos.current.x - pos.current.rx) * 0.18;
      pos.current.ry += (pos.current.y - pos.current.ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.rx}px, ${pos.current.ry}px) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(lerp);
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    rafId.current = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId.current);
      document.documentElement.removeAttribute("data-custom-cursor");
      style.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] rounded-full bg-[hsl(160,60%,45%)] opacity-0"
        style={{
          width: 6,
          height: 6,
          top: 0,
          left: 0,
          transition: "width 0.2s, height 0.2s, opacity 0.3s",
          boxShadow: "0 0 8px hsl(160 60% 45% / 0.8)",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] rounded-full opacity-0"
        style={{
          width: 32,
          height: 32,
          top: 0,
          left: 0,
          border: "1.5px solid hsl(160 60% 45% / 0.7)",
          transition: "width 0.25s, height 0.25s, opacity 0.3s",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default CustomCursor;
